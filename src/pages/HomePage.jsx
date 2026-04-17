import SearchBar from "../components/SearchBar";

const HINT_QUERIES = [
  "Black holes",
  "Artificial intelligence",
  "The Renaissance",
  "Climate change",
  "Quantum physics",
  "The Roman Empire",
];

const STATS = [
  { number: "6.8M+", label: "Articles indexed" },
  { number: "~50M", label: "Unique terms" },
  { number: "<200ms", label: "Search speed" },
];

export default function HomePage({
  query,
  setQuery,
  suggestions,
  setSuggestions,
  search,
  clearSearch,
}) {
  return (
    <main
      id="home-page"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-10 overflow-hidden bg-[#0a0c12]"
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 bg-home-radial pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-9 max-w-2xl w-full">
        {/* Logo */}
        <h1 className="text-[clamp(1.5rem,8vw,4.5rem)] font-extrabold tracking-tight leading-none animate-fade-up">
          <span className="text-blue-400">Nova</span>
          <span className="text-slate-100">Search</span>
        </h1>

        {/* Tagline */}
        <p className="text-base text-slate-400 text-center leading-relaxed animate-fade-up [animation-delay:0.1s]">
          Search the world's largest free encyclopedia.
          <br />
          Powered by Wikipedia's full-text search index.
        </p>

        {/* Hero search bar */}
        <div className="w-full animate-fade-up [animation-delay:0.2s]">
          <SearchBar
            query={query}
            setQuery={setQuery}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            search={search}
            clearSearch={clearSearch}
            hero={true}
            autoFocus={true}
          />
        </div>

        {/* Quick-search hint pills */}
        <div
          className="flex flex-wrap justify-center gap-2.5 animate-fade-up [animation-delay:0.3s]"
          role="list"
          aria-label="Example searches"
        ></div>
      </div>
    </main>
  );
}
