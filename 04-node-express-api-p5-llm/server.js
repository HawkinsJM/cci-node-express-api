const express = require("express");

// loads the .env file if present, fails silently if it's not
try {
  process.loadEnvFile(".env");
} catch {}

const app = express();
const port = Number(process.env.PORT || 3000);
const server = app.listen(port);

//app.use() is run on every incoming request
//express.static serves the files in the specified folder when they are requested
//e.x. when client.js is requested, express.static sends public/client.js
app.use(express.static("public"));
app.use(express.json());

app.get("/api/cat", async (req, res) => {
  const response = await fetch("https://api.thecatapi.com/v1/images/search?mime_types=jpg,png", {
    headers: { "x-api-key": process.env.CAT_API_KEY }
  });
  const [cat] = await response.json();
  const imgResponse = await fetch(cat.url);
  res.set("Content-Type", imgResponse.headers.get("content-type"));
  res.send(Buffer.from(await imgResponse.arrayBuffer()));
});

app.post("/api/ask", async (req, res) => {
  const response = await fetch(
    "https://integrate.api.nvidia.com/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-ai/deepseek-v3.2",
        messages: [
          {
            role: "system",
            content: "You are a cat who has strong opinions about cats."
          },
          { role: "user", content: req.body.message }
        ],
        temperature: 1,
        top_p: 0.95,
        max_tokens: 8192,
        chat_template_kwargs: { thinking: true }
      })
    }
  );
  const data = await response.json();
  res.json({ text: data.choices[0].message.content });
});

console.log(`Server is listening on port ${port}`);
