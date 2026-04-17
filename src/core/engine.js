import { invertedIndex, getDocumentById } from './indexer';
import { processText } from './processor';
import { isFuzzyMatch } from './fuzzy';

/**
 * The Search Engine Logic
 */

export const SearchEngine = {
  /**
   * search() function:
   * 1. Normalizes the search query
   * 2. Finds doc matches (Exact & Fuzzy)
   * 3. Calculates a Weighted Match Score
   */
  search(query) {
    const tokens = processText(query);
    if (tokens.length === 0) return [];

    const docScores = {};
    const lexicon = Object.keys(invertedIndex);

    tokens.forEach((token) => {
      // 1. Check for Exact Match (Highest Priority)
      const exactHits = invertedIndex[token] || [];
      exactHits.forEach(id => {
        docScores[id] = (docScores[id] || 0) + 2; // Exact match = 2 points
      });

      // 2. Check for Fuzzy Matches (Typos)
      // We only do this if the word is long enough to have potential typos
      if (token.length > 3) {
        lexicon.forEach((word) => {
          // If it's a fuzzy match but NOT the exact word (which we already handled)
          if (word !== token && isFuzzyMatch(token, word)) {
            const fuzzyHits = invertedIndex[word] || [];
            fuzzyHits.forEach(id => {
              docScores[id] = (docScores[id] || 0) + 1; // Fuzzy match = 1 point
            });
          }
        });
      }
    });

    // Convert scores map to an array of ranked results
    const results = Object.keys(docScores)
      .map((id) => {
        const docId = parseInt(id);
        const doc = getDocumentById(docId);
        return {
          ...doc,
          score: docScores[id],
          pageid: doc.id,
          snippet: doc.content
        };
      })
      .sort((a, b) => b.score - a.score);

    return results;
  },

  /**
   * getSuggestions() function:
   * Returns keys from the inverted index that start with the query
   */
  getSuggestions(query) {
    const q = query.toLowerCase().trim();
    if (q.length < 1) return [];

    const lexicon = Object.keys(invertedIndex);
    return lexicon
      .filter(word => word.startsWith(q))
      .slice(0, 6); // Limit to top 6
  }
};
