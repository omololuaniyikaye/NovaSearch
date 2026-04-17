import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar({
  query,
  setQuery,
  suggestions,
  setSuggestions,
  search,
  clearSearch,
}) {
  const navigate = useNavigate();

  function goHome() {
    clearSearch();
    navigate("/");
  }

  return (
    <nav
      className="sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-[#0a0c12]/85 backdrop-blur-xl border-b border-white/[0.07]"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo */}
      <button
        id="navbar-logo-btn"
        className="text-xl font-extrabold tracking-tight whitespace-nowrap shrink-0 cursor-pointer transition-opacity hover:opacity-80"
        onClick={goHome}
        aria-label="Go to home page"
      >
        <span className="text-blue-400">Nova</span>
        <span className="text-slate-100">Search</span>
      </button>

      {/* Compact search bar */}
      <div className="flex-1 max-w-2xl">
        <SearchBar
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          search={search}
          clearSearch={clearSearch}
          hero={false}
          autoFocus={false}
        />
      </div>
    </nav>
  );
}
