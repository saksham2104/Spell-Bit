const MAX_DISTANCE = 2;

function levenshtein(a, b) {
  if (Math.abs(a.length - b.length) > MAX_DISTANCE) return Infinity;

  const dp = Array(b.length + 1).fill(0).map((_, j) => j);

  for (let i = 1; i <= a.length; i++) {
    let prev = dp[0];
    dp[0] = i;
    let minInRow = dp[0];

    for (let j = 1; j <= b.length; j++) {
      const temp = dp[j];
      dp[j] = Math.min(
        dp[j] + 1,
        dp[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      prev = temp;
      minInRow = Math.min(minInRow, dp[j]);
    }

    if (minInRow > MAX_DISTANCE) return Infinity;
  }
  return dp[b.length];
}

function getCandidates(word) {
  const prefix = word.substring(0, Math.min(3, word.length));
  return PREFIX_MAP[prefix] || [];
}

function suggestCorrections(word) {
  const candidates = getCandidates(word);
  const results = [];

  for (const candidate of candidates) {
    const dist = levenshtein(word, candidate);
    if (dist <= MAX_DISTANCE) {
      results.push({
        word: candidate,
        dist,
        freq: DICTIONARY[candidate] || 0
      });
    }
  }

  results.sort((a, b) =>
    a.dist !== b.dist ? a.dist - b.dist : b.freq - a.freq
  );

  return results.slice(0, 5).map(r => r.word);
}
