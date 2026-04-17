import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchIcon = () => (
  <svg
    className="text-slate-500 shrink-0 transition-colors group-focus-within:text-blue-400"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClearIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SuggestIcon = () => (
  <svg
    className="text-blue-400 shrink-0"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    className="ml-auto text-slate-600"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function SearchBar({
  query,
  setQuery,
  suggestions,
  setSuggestions,
  search,
  clearSearch,
  hero = false,
  autoFocus = false,
}) {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setSuggestions]);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === "Escape") setSuggestions([]);
  }

  function handleSearch(term) {
    const q = (term || query).trim();
    if (!q) return;
    setQuery(q);
    setSuggestions([]);
    navigate(`/results?q=${encodeURIComponent(q)}`);
    search(q);
  }

  function handleSuggestionClick(s) {
    setQuery(s);
    setSuggestions([]);
    navigate(`/results?q=${encodeURIComponent(s)}`);
    search(s);
  }

  const barBase = `
    group flex items-center gap-2.5
    bg-white/5 border border-white/10 rounded-full
    transition-all duration-200
    focus-within:border-blue-500 focus-within:bg-white/[0.07]
    focus-within:shadow-[0_0_0_3px_rgba(79,142,247,0.18)]
  `;
  const barHero = "sm:px-6 sm:py-4 px-4 py-3";
  const barCompact = "sm:px-4 sm:py-3 px-3 py-2";

  const inputBase =
    "flex-1 bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-600";
  const inputHero = "sm:text-lg text-base";
  const inputSmall = "sm:text-sm text-xs";

  const btnBase = `
    shrink-0 bg-blue-500 text-white font-semibold rounded-full
    transition-all duration-200
    hover:bg-blue-400 hover:-translate-y-px
    hover:shadow-[0_4px_14px_rgba(79,142,247,0.35)]
  `;
  const btnHero = "sm:px-6 sm:py-2.5 px-4 py-2 sm:text-base text-sm";
  const btnSmall = "sm:px-4 sm:py-1.5 px-3 py-1 sm:text-sm text-[10px]";

  return (
    <div className="relative w-full" ref={wrapRef}>
      <div className={`${barBase} ${hero ? barHero : barCompact}`}>
        <SearchIcon />

        <input
          id="search-input"
          ref={inputRef}
          type="search"
          className={`${inputBase} ${hero ? inputHero : inputSmall}`}
          placeholder="Search anything…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          aria-label="Search"
        />

        <button
          id="search-submit-btn"
          className={`${btnBase} ${hero ? btnHero : btnSmall}`}
          onClick={() => handleSearch()}
          aria-label="Submit search"
        >
          <span className="hidden sm:inline">Search</span>
          <span className="sm:hidden">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </span>
        </button>
      </div>

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul
          className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 w-full bg-[#14171f] border border-white/10 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.55)] animate-fade-up"
          role="listbox"
          aria-label="Search suggestions"
        >
          {suggestions.map((s, i) => (
            <li
              key={s}
              id={`suggestion-${i}`}
              role="option"
              className="flex items-center gap-3 px-5 py-3 cursor-pointer text-slate-400 text-sm border-b border-white/[0.06] last:border-0 hover:bg-blue-500/10 hover:text-slate-100 transition-colors duration-150"
              onClick={() => handleSuggestionClick(s)}
            >
              <SuggestIcon />
              <span className="flex-1">{s}</span>
              <ChevronIcon />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
