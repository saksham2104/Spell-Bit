document.getElementById("checkBtn").addEventListener("click", async () => {
    const text = document.getElementById("inputText").value;

    const response = await fetch("http://localhost:5000/spellcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    const data = await response.json();
    const corrected = data.corrected;

    document.getElementById("output").innerText = "Corrected: " + corrected;
});
