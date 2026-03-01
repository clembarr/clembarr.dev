import { useContext, useMemo } from "react";
import { SearchContext } from "../search/SearchEngine";
import { LangContext } from "../language";
import { BlogPost, BlogCategory } from "../../assets/dataTypes";
import { UNIVERSAL_LANG } from "../../assets/i18n";
import { BlogCard } from "../blog";
import { blogSortingOptions, noDataMessages, placeholderMessages } from "../../assets/constants";
import { ScrollReveal } from "../animations";

type BlogListingProps = {
    posts: BlogPost[];
}

/** All BlogCategory values, used to detect category filters vs text search. */
const BLOG_CATEGORIES = Object.values(BlogCategory) as string[];

/**
 * @description Blog post listing that consumes SearchContext to filter and sort posts.
 * Handles category filtering, date sorting, and text search — mirroring the logic
 * used by ProjectsListing for projects.
 */
const BlogListing = ({ posts }: BlogListingProps) => {
    const { toMatch, updateSearch, setSearchInput } = useContext(SearchContext);
    const { currentLang } = useContext(LangContext);

    const filteredPosts = useMemo(() => {
        let filtered = [...posts];
        const filter = toMatch[0];

        if (filter === "NEWEST") {
            filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
        } else if (filter === "OLDEST") {
            filtered.sort((a, b) => a.date.getTime() - b.date.getTime());
        } else if (BLOG_CATEGORIES.includes(filter)) {
            filtered = filtered.filter((p) => p.category === filter);
            filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
        } else if (filter !== "ALL") {
            /** Text search: check if any of the toMatch terms appear in title or description.
             * Also check if the filter matches a blogSortingOptions label (pill/dropdown selection). */
            const isOptionLabel = toMatch.length === 1 && blogSortingOptions.some(
                (opt) => opt.content[currentLang]?.toUpperCase() === filter
                    || opt.abreviation?.content[currentLang]?.toUpperCase() === filter
            );

            if (!isOptionLabel) {
                filtered = filtered.filter((post) => {
                    const title = (post.title[currentLang] || post.title[UNIVERSAL_LANG] || "").toUpperCase();
                    const description = (post.description[currentLang] || post.description[UNIVERSAL_LANG] || "").toUpperCase();
                    return toMatch.some((term) =>
                        term.length > 1 && (title.includes(term) || description.includes(term))
                    );
                });
            }
            filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
        } else {
            filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
        }

        return filtered;
    }, [posts, toMatch, currentLang]);

    const hasActiveFilter = toMatch[0] !== "ALL";

    /** @function msg Shorthand to look up a message by context in noDataMessages. */
    const msg = (context: string) =>
        noDataMessages.find((m) => m.context === context)!.content[currentLang];

    /** @function ph Shorthand to look up a message by context in placeholderMessages. */
    const ph = (context: string) =>
        placeholderMessages.find((m) => m.context === context)!.content[currentLang];

    return (
        <>
            {/* Results count */}
            {posts.length > 0 && (
                <ScrollReveal direction="up" delay={0.3}>
                    <p className="text-center text-2xs text-(--color-quaternary) opacity-70">
                        {filteredPosts.length}{' '}
                        {filteredPosts.length === 1 ? ph("blogResultSingular") : ph("blogResultPlural")}
                    </p>
                </ScrollReveal>
            )}

            {/* Blog posts grid */}
            <ScrollReveal direction="up" delay={0.4}>
                {filteredPosts.length > 0 ? (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <BlogCard key={post.slug} post={post} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 space-y-4">
                        <h2 className="font-primary-semibold text-xl text-(--color-quaternary) opacity-70">
                            {posts.length === 0 ? msg("blogEmpty") : msg("blog")}
                        </h2>
                        <p className="text-2xs text-(--color-quaternary) opacity-50">
                            {posts.length === 0 ? msg("blogEmptyHint") : msg("blogNoResultsHint")}
                        </p>
                        {hasActiveFilter && (
                            <button
                                onClick={() => {
                                    setSearchInput('');
                                    updateSearch(["ALL"]);
                                }}
                                className="
                                    mt-4
                                    px-6
                                    py-3
                                    bg-(--color-tertiary)
                                    text-(--color-primary)
                                    rounded-lg
                                    font-primary-semibold
                                    hover:scale-105
                                    active:scale-95
                                    transition-transform
                                    duration-200
                                    cursor-pointer
                                "
                            >
                                {ph("blogClearFilters")}
                            </button>
                        )}
                    </div>
                )}
            </ScrollReveal>
        </>
    );
};

export default BlogListing;
