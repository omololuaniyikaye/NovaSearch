/**
 * Calculates the Levenshtein Distance between two strings.
 * This represents the minimum number of single-character edits 
 * (insertions, deletions, substitutions) required to change one string into another.
 */
export function getLevenshteinDistance(s1, s2) {
  const len1 = s1.length;
  const len2 = s2.length;

  const matrix = [];

  // Initialize first row and column
  for (let i = 0; i <= len1; i++) matrix[i] = [i];
  for (let j = 0; j <= len2; j++) matrix[0][j] = j;

  // Fill the matrix
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = (s1[i - 1] === s2[j - 1]) ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,      // Deletion
        matrix[i][j - 1] + 1,      // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return matrix[len1][len2];
}

/**
 * Checks if two words are "close enough" based on a threshold.
 * We allow 1 edit for short words (4-6 chars) and 2 edits for longer words.
 */
export function isFuzzyMatch(word1, word2) {
  const dist = getLevenshteinDistance(word1, word2);
  
  if (word1.length <= 3) return dist === 0; // No typos for tiny words
  if (word1.length <= 6) return dist <= 1; // 1 typo max
  return dist <= 2; // 2 typos max for long words
}
