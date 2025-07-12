document.addEventListener("input", async function (e) {
    if (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT") {
        const originalText = e.target.value;

        const response = await fetch("http://localhost:5000/spellcheck", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: originalText })
        });

        const data = await response.json();
        const correctedText = data.corrected;

        if (correctedText !== originalText) {
            console.log("Correction:", correctedText);
            // e.target.value = correctedText; ← optional auto-replace
        }
    }
});
