async function init() {
  const response = await fetch('/api/cat');
  const data = await response.json();
  document.getElementById('cat-image').src = data.url;
}

init();