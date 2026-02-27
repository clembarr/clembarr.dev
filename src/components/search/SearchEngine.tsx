import { createContext, useState, ReactNode, useEffect, useContext, useCallback } from "react";
import { LangContext } from "../language";

interface SearchContextType {
  toMatch: string[];
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  updateSearch: (terms: string[]) => void;
}

const SearchContext = createContext<SearchContextType>({
  toMatch: ["ALL"],
  searchInput: "",
  setSearchInput: () => {},
  updateSearch: () => {},
});

/**
 * @function normalizeTerms Deduplicates terms, removes "ALL" entries, and
 * returns `["ALL"]` when the resulting array would be empty.
 * @param terms raw search terms
 * @returns cleaned search terms, never empty
 */
const normalizeTerms = (terms: string[]): string[] => {
  const unique = terms
    .filter((v, i) => terms.indexOf(v) === i)
    .filter((v) => v !== "ALL" && v !== "");
  return unique.length === 0 ? ["ALL"] : unique;
};

/**
 * @description Provides the search/filter state consumed by Searchbar,
 * SortingBar, DropdownSort, and the project listing. Exposes `updateSearch`
 * which normalises terms before committing them to state, replacing the
 * previous `youCanWork` ref mechanism.
 */
const SearchEngine = ({ children }: { children: ReactNode }) => {
  const [toMatch, setToMatch] = useState<string[]>(["ALL"]);
  const [searchInput, setSearchInput] = useState<string>("");
  const { currentLang } = useContext(LangContext);

  /** Reset search state when the language changes. */
  useEffect(() => {
    setToMatch(["ALL"]);
    setSearchInput("");
  }, [currentLang]);

  /**
   * @function updateSearch Normalises the given terms and updates `toMatch`.
   * All consumers should call this instead of `setToMatch` directly.
   */
  const updateSearch = useCallback((terms: string[]) => {
    setToMatch(normalizeTerms(terms));
  }, []);

  return (
    <SearchContext.Provider value={{ toMatch, searchInput, setSearchInput, updateSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export { SearchContext, SearchEngine }
