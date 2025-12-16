let suggestionBox = null;

document.addEventListener("input", (e) => {
  const target = e.target;
  if (!target || !target.value) return;

  const words = target.value.split(/\s+/);
  const lastWord = words[words.length - 1].toLowerCase();

  if (DICTIONARY[lastWord]) {
    removeBox();
    return;
  }

  const suggestions = suggestCorrections(lastWord);
  if (suggestions.length === 0) {
    removeBox();
    return;
  }

  showSuggestions(target, suggestions);
});

function showSuggestions(input, suggestions) {
  removeBox();

  suggestionBox = document.createElement("div");
  suggestionBox.className = "spell-suggestions";

  suggestions.forEach(word => {
    const item = document.createElement("div");
    item.textContent = word;
    item.onclick = () => replaceLastWord(input, word);
    suggestionBox.appendChild(item);
  });

  document.body.appendChild(suggestionBox);
  const rect = input.getBoundingClientRect();
  suggestionBox.style.top = rect.bottom + window.scrollY + "px";
  suggestionBox.style.left = rect.left + "px";
}

function replaceLastWord(input, word) {
  const words = input.value.split(/\s+/);
  words[words.length - 1] = word;
  input.value = words.join(" ");
  removeBox();
}

function removeBox() {
  if (suggestionBox) {
    suggestionBox.remove();
    suggestionBox = null;
  }
}
