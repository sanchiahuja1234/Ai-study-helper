function summarize() {
  const notes = document.getElementById("notes").value;
  const output = document.getElementById("output");

  if (notes.trim() === "") {
    output.innerHTML = "Please enter your study notes first.";
    return;
  }

  const sentences = notes.split(".");
  output.innerHTML =
    "📚 AI Summary:<br><br>" +
    sentences.slice(0, 3).join(".") +
    ".";
}
