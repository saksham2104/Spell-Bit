import Levenshtein

class SpellChecker:
    def __init__(self):

        with open("words_alpha.txt", "r") as file:
            self.dictionary = set(word.strip().lower() for word in file)

        self.word_frequency = {}
        try:
            with open("word_freq.txt", "r") as file:
                for line in file:
                    word, freq = line.strip().split()
                    self.word_frequency[word.lower()] = int(freq)
        except FileNotFoundError:
            print("⚠️  word_freq.txt not found — suggestions may be lower quality")

    def get_top_matches(self, word, top_n=3):
        word = word.lower()
        candidates = []
        for dict_word in self.dictionary:
            if abs(len(dict_word) - len(word)) > 2:
                continue
            if len(dict_word) < 3:
                continue
            dist = Levenshtein.distance(word, dict_word)
            freq = self.word_frequency.get(dict_word, 0)
            candidates.append((dict_word, dist, freq))

        candidates.sort(key=lambda x: (x[1], -x[2]))
        return [w for w, _, _ in candidates[:top_n]]

    def correct_text(self, text):
        words = text.split()
        corrected_words = []
        for word in words:
            clean_word = ''.join(filter(str.isalpha, word))
            if clean_word.lower() in self.dictionary:
                corrected_words.append(word)
            else:
                suggestions = self.get_top_matches(clean_word)
                corrected = suggestions[0] if suggestions else word
                # Preserve punctuation, capitalization
                corrected = corrected.capitalize() if word.istitle() else corrected
                corrected = corrected.upper() if word.isupper() else corrected
                corrected_words.append(corrected)
        return ' '.join(corrected_words)
