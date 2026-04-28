async function init() {
  const catResponse = await fetch("/api/cat");
  const catData = await catResponse.json();
  document.getElementById("cat-image").src = catData.url;
}

init();
