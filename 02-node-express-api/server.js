const express = require("express");

// loads the .env file if present, fails silently if it's not
try {
  process.loadEnvFile(".env");
} catch {}

const app = express();
const port = Number(process.env.PORT || 3000);
const server = app.listen(port);

app.use(express.static("public"));

app.get("/api/cat", async (req, res) => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search", {
    headers: { "x-api-key": process.env.CAT_API_KEY }
  });
  const data = await response.json();
  res.json(data[0]);
});

console.log(`Server is listening on port ${port}`);
