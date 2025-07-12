from flask import Flask, request, jsonify
from trie_spell_checker import SpellChecker

app = Flask(__name__)
checker = SpellChecker()

@app.route("/spellcheck", methods=["POST"])
def spellcheck():
    data = request.json
    text = data["text"]
    corrected = checker.correct_text(text)
    return jsonify({"corrected": corrected})

if __name__ == "__main__":
    app.run(port=5000)
