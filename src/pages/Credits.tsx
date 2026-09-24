import styles from "../style";
import { useContext } from "react";
import { PageTransition, ScrollReveal } from "../components/animations";
import { MetaTags } from "../components/seo";
import { LangContext } from "../components/language";
import { ThemeContext } from "../components/theme/ThemeEngine";
import { ExternalLinkIcon } from "../components/Footer";
import { creditsLink, creditsMentions, CreditsSEOConstants } from "../assets/constants";
import { CreditMention } from "../assets/dataTypes";
import { getLinkFromTypedLink } from "../utils/utils";

/**
 * @component Credits
 * @description Credits page. Lists every entry of `creditsMentions` on one line: the name of
 * the resource, then the site it comes from as an external link.
 */
const Credits = () => {
    const { currentLang } = useContext(LangContext);
    const { currentTheme } = useContext(ThemeContext);

    /**
     * @function getCreditHref Resolve the link of a credit, falling back on its first asset.
     * @param credit - The credit to resolve
     * @returns the url the credit points at
     */
    const getCreditHref = (credit: CreditMention) => {
        if (credit.link) return getLinkFromTypedLink(credit.link, currentLang);
        const asset = [credit.contentRef ?? []].flat()[0];
        return asset ? getLinkFromTypedLink(asset.content[currentTheme], currentLang) : "#";
    };

    return (
        <PageTransition>
            <MetaTags
                title={CreditsSEOConstants.title}
                description={CreditsSEOConstants.description}
                keywords={CreditsSEOConstants.keywords}
                ogUrl={CreditsSEOConstants.ogUrl}
                canonical={CreditsSEOConstants.canonical}
            />

            <section id="credits"
                className={`
                    ${styles.page}
                    ${styles.flexCol}
                    ${styles.sectionContainer}
                    md:space-y-10 space-y-6
                    md:mt-25 mt-15
                    pb-20
                `}
            >
                <div className={`${styles.flexCol} w-fit space-y-2`}>
                    <h1 className={`${styles.heading2}`}> {creditsLink.content[currentLang]} </h1>
                    <span className={`${styles.line}`} />
                </div>

                <ScrollReveal direction="up" delay={0.2}>
                    <ul id="credits-list"
                        className={`
                            ${styles.flexCol}
                            space-y-3
                            text-sm
                        `}
                    >
                        {creditsMentions.map((credit, index) => {
                            const href = getCreditHref(credit);

                            return (
                                <li key={`credit-${index}`}>
                                    <span className="font-primary-semibold"> {credit.content[currentLang]} </span>
                                    {" : "}
                                    <a id={`credit-${index}`}
                                        href={href}
                                        className={`
                                            inline-flex items-center gap-1
                                            text-(--color-muted)
                                            hover:text-(--color-tertiary)
                                            ${styles.defaultTransition}
                                        `}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {new URL(href, window.location.href).hostname.replace(/^www\./, "")}
                                        <ExternalLinkIcon />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </ScrollReveal>
            </section>
        </PageTransition>
    );
};

export default Credits;
