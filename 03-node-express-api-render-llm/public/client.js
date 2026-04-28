async function init() {
  const catResponse = await fetch('/api/cat');
  const catData = await catResponse.json();
  document.getElementById('cat-image').src = catData.url;

  const llmResponse = await fetch('/api/ask');
  const llmData = await llmResponse.json();
  document.getElementById('llm-response').textContent = llmData.text;
}

init();