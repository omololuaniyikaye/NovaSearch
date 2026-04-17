import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSearch } from './hooks/useSearch';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  // Single source of truth for all search state — shared across pages
  const {
    query, setQuery,
    results, suggestions, setSuggestions,
    loading, searched, totalHits,
    search, clearSearch,
  } = useSearch();

  const sharedProps = {
    query, setQuery,
    suggestions, setSuggestions,
    search, clearSearch,
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage {...sharedProps} />}
        />
        <Route
          path="/results"
          element={
            <ResultsPage
              {...sharedProps}
              results={results}
              loading={loading}
              searched={searched}
              totalHits={totalHits}
            />
          }
        />
        {/* Catch-all → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
