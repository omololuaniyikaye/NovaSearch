import { useState, useEffect, useRef } from 'react';
import { SearchEngine } from '../core/engine';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [totalHits, setTotalHits] = useState(0);
  const debounceRef = useRef(null);

  // ── Local Autocomplete suggestions ───────────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    // Debounce for smoothness, even though local search is instant
    debounceRef.current = setTimeout(() => {
      const sugs = SearchEngine.getSuggestions(query);
      setSuggestions(sugs);
    }, 150);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  // ── Local Search logic ───────────────────────────────────────
  async function search(q) {
    const term = (q || query).trim();
    if (!term) return;

    // Cancel any pending suggestion fetches
    if (debounceRef.current) clearTimeout(debounceRef.current);

    setLoading(true);
    setSearched(true);
    setSuggestions([]);

    // Local search is synchronous, but we use setTimeout to mimic a real 
    // network request feel and allow the loading state to show briefly.
    setTimeout(() => {
      const hits = SearchEngine.search(term);
      setResults(hits);
      setTotalHits(hits.length);
      setLoading(false);
    }, 300);
  }

  function clearSearch() {
    setQuery('');
    setResults([]);
    setSuggestions([]);
    setSearched(false);
    setTotalHits(0);
  }

  return {
    query, setQuery,
    results, suggestions, setSuggestions,
    loading, searched, totalHits,
    search, clearSearch,
  };
}

