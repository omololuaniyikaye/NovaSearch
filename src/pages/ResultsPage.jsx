import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ResultCard from '../components/ResultCard';

/* ── Loading skeleton card ─────────────────────────────────── */
function SkeletonCard({ i }) {
  return (
    <div
      className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-3 animate-fade-up"
      style={{ animationDelay: `${i * 0.06}s` }}
    >
      <div className="skeleton-line w-2/5" />
      <div className="skeleton-line w-3/5 h-4" />
      <div className="skeleton-line w-full" />
      <div className="skeleton-line w-4/5" />
    </div>
  );
}

/* ── Empty state ───────────────────────────────────────────── */
function EmptyState({ query }) {
  return (
    <div id="empty-state" className="text-center py-24 px-6 animate-fade-up">
      <div className="text-5xl mb-5">🔍</div>
      <h2 className="text-xl font-semibold text-slate-100 mb-2">
        No results for &ldquo;{query}&rdquo;
      </h2>
      <p className="text-slate-400 text-sm leading-relaxed">
        Try different keywords, check your spelling, or search something broader.
      </p>
    </div>
  );
}

/* ── Results page ──────────────────────────────────────────── */
export default function ResultsPage({
  query, setQuery,
  suggestions, setSuggestions,
  search, clearSearch,
  results, loading, searched, totalHits,
}) {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q !== query) {
      setQuery(q);
      search(q);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayQuery = searchParams.get('q') || query;

  return (
    <div id="results-page" className="min-h-screen bg-[#0a0c12]">
      <Navbar
        query={query}
        setQuery={setQuery}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        search={search}
        clearSearch={clearSearch}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Results meta */}
        {!loading && searched && results.length > 0 && (
          <p className="text-xs text-slate-500 mb-6 animate-fade-in">
            About{' '}
            <span className="text-blue-400 font-semibold">{totalHits.toLocaleString()}</span>
            {' '}results for{' '}
            <span className="text-slate-200 font-semibold">&ldquo;{displayQuery}&rdquo;</span>
          </p>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="flex flex-col gap-3.5" aria-live="polite" aria-label="Loading results">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} i={i} />
            ))}
          </div>
        )}

        {/* Result cards */}
        {!loading && results.length > 0 && (
          <ul className="flex flex-col gap-3.5" role="list" aria-label="Search results">
            {results.map((result, i) => (
              <li key={result.pageid} role="listitem">
                <ResultCard result={result} index={i} query={displayQuery} />
              </li>
            ))}
          </ul>
        )}

        {/* Empty state */}
        {!loading && searched && results.length === 0 && (
          <EmptyState query={displayQuery} />
        )}

      </div>
    </div>
  );
}
