const express = require('express');

const app = express();
const port = Number(process.env.PORT || 3000);
const server = app.listen(port);

//app.use() is run on every incoming request
//express.static serves the files in the specified folder when they are requested
//e.x. when client.js is requested, express.static sends public/client.js
app.use(express.static('public'));

console.log(`Server is listening on port ${port}`);