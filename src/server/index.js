const express = require("express");
const path = require("path");
const api = require("./api");
const open = require("open");

const app = express();

app.use("/api", api);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", function (req, res) {
	res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.listen(4000, () => {
	open("http://localhost:4000");
});
