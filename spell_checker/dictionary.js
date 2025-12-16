// word : frequency
const DICTIONARY = {
  "the": 50000,
  "receive": 12000,
  "recede": 3000,
  "reprieve": 1000,
  "example": 8000,
  "spelling": 9000,
  "correction": 7000,
  "real": 10000,
  "time": 11000
};

// Pre-group words by prefix (1–3 chars)
const PREFIX_MAP = {};

for (const word in DICTIONARY) {
  for (let len = 1; len <= 3 && len <= word.length; len++) {
    const prefix = word.substring(0, len);
    if (!PREFIX_MAP[prefix]) PREFIX_MAP[prefix] = [];
    PREFIX_MAP[prefix].push(word);
  }
}
