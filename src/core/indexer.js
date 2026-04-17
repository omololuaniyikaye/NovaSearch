import { DOCUMENTS } from './dataset';
import { processText } from './processor';

/**
 * The Inverted Index is the heart of the search engine.
 * It's a map where:
 *   Key = A unique word (Token)
 *   Value = A list of document IDs that contain that word (Posting List)
 * 
 * Example: { "react": [2, 8], "planet": [9] }
 */

export function buildIndex() {
  const index = {};

  DOCUMENTS.forEach((doc) => {
    // We index both the Title and the Content for better results
    const combinedText = `${doc.title} ${doc.content}`;
    const tokens = processText(combinedText);

    // Filter to unique tokens for this doc (we only need to know it EXISTS in the doc once)
    const uniqueTokens = [...new Set(tokens)];

    uniqueTokens.forEach((token) => {
      if (!index[token]) {
        index[token] = [];
      }
      index[token].push(doc.id);
    });
  });

  return index;
}

// Pre-build the index once when the app starts
export const invertedIndex = buildIndex();

/**
 * Helper to get document by ID
 */
export function getDocumentById(id) {
  return DOCUMENTS.find(d => d.id === id);
}
