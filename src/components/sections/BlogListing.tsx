import { useContext, useMemo } from "react";
import { SearchContext } from "../search/SearchEngine";
import { LangContext } from "../language";
import { BlogPost, BlogCategory } from "../../assets/dataTypes";
import { UNIVERSAL_LANG } from "../../utils/assetsUtils";
import { BlogCard } from "../blog";
import { blogSortingOptions, noDataMessages, placeholderMessages } from "../../assets/constants";
import { ScrollReveal } from "../animations";
import styles from "../../style";

type BlogListingProps = {
    posts: BlogPost[];
}

/** All BlogCategory values, used to detect category filters vs text search. */
const BLOG_CATEGORIES = Object.values(BlogCategory) as string[];

/**
 * @component BlogListing
 * @description Blog post listing that consumes SearchContext to filter and sort posts.
 * Handles category filtering, date sorting, and text search — mirroring the logic
 * used by ProjectsListing for projects.
 * @param posts - Array of all blog posts to filter and display.
 */
const BlogListing = ({ posts }: BlogListingProps) => {
    const { toMatch } = useContext(SearchContext);
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

    // Shorthand to look up a message by context in noDataMessages.
    const msg = (context: string) =>
        noDataMessages.find((m) => m.context === context)!.content[currentLang];

    // Shorthand to look up a message by context in placeholderMessages.
    const ph = (context: string) =>
        placeholderMessages.find((m) => m.context === context)!.content[currentLang];

    return (
        <>
            {posts.length > 0 && (
                <ScrollReveal direction="up" delay={0.3}>
                    <p className="text-center text-2xs text-(--color-quaternary) opacity-40">
                        {filteredPosts.length}{' '}
                        {filteredPosts.length === 1 ? ph("blogResultSingular") : ph("blogResultPlural")}
                    </p>
                </ScrollReveal>
            )}

            <ScrollReveal direction="up" delay={0.4}>
                {filteredPosts.length > 0 ? (
                    <div className={`${styles.sizeFull} grid md:grid-cols-2 xl:grid-cols-3 gap-8`}>
                        {filteredPosts.map((post, index) => (
                            <BlogCard key={post.slug} post={post} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className={`
                            ${styles.sizeFull}
                            text-center 
                            py-30
                            space-y-4
                        `}
                    >
                        <h2 className={`
                                font-primary
                                text-sm
                                text-(--color-quaternary) 
                                opacity-70
                            `}
                        > {posts.length === 0 ? msg("blogEmpty") : msg("blog")} </h2>
                    </div>
                )}
            </ScrollReveal>
        </>
    );
};

export default BlogListing;
