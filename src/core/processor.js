/**
 * This module handles the "Normalization" phase of the search engine.
 * Every piece of text must pass through here before being indexed or searched.
 */

// A simple list of "stop words" — common words that don't add much meaning to search
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'for', 'if', 'in', 'into', 
  'is', 'it', 'no', 'not', 'of', 'on', 'or', 'such', 'that', 'the', 'their', 'then', 
  'there', 'these', 'they', 'this', 'to', 'was', 'will', 'with'
]);

/**
 * Reductive Stemming logic:
 * Chops off common English suffixes to find the "root" word.
 */
function stemWord(word) {
  if (word.length <= 3) return word; // Don't stem very short words

  return word
    .replace(/ies$/, 'y')      // skies -> sky
    .replace(/sses$/, 'ss')    // kisses -> kiss
    .replace(/s$/, '')         // atoms -> atom
    .replace(/ing$/, '')       // walking -> walk
    .replace(/ed$/, '')        // walked -> walk
    .replace(/ly$/, '')        // quickly -> quick
    .replace(/tional$/, 'tion') // operational -> operation
    .replace(/ment$/, '');     // movement -> move
}

/**
 * Normalizes a string by:
 * 1. Converting to lowercase
 * 2. Removing punctuation
 * 3. Splitting into individual words (Tokenization)
 * 4. Filtering out "stop words"
 * 5. Stemming words to their root (NEW)
 */
/**
 * Normalizes a string by:
 * 1. Converting to lowercase
 * 2. Removing punctuation
 * 3. Splitting into individual words (Tokenization)
 * 4. Filtering out "stop words"
 * 5. Stemming words to their root
 */
export function processText(text) {
  if (!text) return [];

  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)            // Tokenize
    .filter(word => word.length > 0 && !STOP_WORDS.has(word))
    .map(word => stemWord(word)); // Stem each word
}

/**
 * Highlighting logic:
 * Takes a string of text and a set of search tokens.
 * Wraps matched words in <mark class="search-match">.
 */
export function highlightText(text, queryTokens = []) {
  if (!text || queryTokens.length === 0) return text;

  // 1. Get the stems of all query words + their fuzzy relatives
  const queryStems = new Set(queryTokens.map(t => stemWord(t.toLowerCase())));

  // 2. Use a regex with a callback to replace words without losing punctuation/case
  return text.replace(/\b(\w+)\b/g, (match) => {
    const wordStem = stemWord(match.toLowerCase());
    
    if (queryStems.has(wordStem)) {
      return `<mark class="search-match">${match}</mark>`;
    }
    return match;
  });
}

