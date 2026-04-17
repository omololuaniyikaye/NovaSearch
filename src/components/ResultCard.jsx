import { highlightText, processText } from '../core/processor';

function WikiBadge() {
  return (
    <div className="w-4 h-4 rounded-[3px] bg-blue-500/15 flex items-center justify-center text-[9px] font-bold text-blue-400">
      W
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2.2"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ResultCard({ result, index, query }) {
  // Since we are using local dummy data, we'll prefix with Wikipedia as an example "source"
  const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title)}`;

  // Process the query to get the individual tokens for highlighting
  const queryTokens = processText(query);

  const highlightedTitle = highlightText(result.title, queryTokens);
  const highlightedContent = highlightText(result.content, queryTokens);

  return (
    <div
      id={`result-card-${index}`}
      className="group block bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 sm:px-6 py-4 sm:py-5 transition-all duration-200 animate-fade-up
        hover:bg-white/[0.07] hover:border-blue-500/40 hover:-translate-y-0.5
        hover:shadow-[0_6px_28px_rgba(0,0,0,0.45)]"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Source & Metadata row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500">
          <WikiBadge />
          <span className="font-semibold text-blue-400/80 uppercase tracking-wider">{result.category || 'General'}</span>
        </div>
        
        {/* Match Score Badge */}
        <div className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
          Match Score: {result.score}
        </div>
      </div>

      {/* Title */}
      <h2 
        className="text-xs sm:text-[1.05rem] font-semibold text-slate-100 mb-1 leading-snug transition-colors duration-200 group-hover:text-blue-400"
        dangerouslySetInnerHTML={{ __html: highlightedTitle }}
      />

      {/* Snippet */}
      <p
        className="text-[10px] sm:text-sm text-slate-400 leading-normal line-clamp-2 sm:line-clamp-none"
        dangerouslySetInnerHTML={{ __html: highlightedContent }}
      />

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs">
        <a href={wikiUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-400 font-medium hover:underline">
          Read article <ArrowRightIcon />
        </a>
        <span className="text-slate-600">ID: #{result.id}</span>
      </div>
    </div>
  );
}

