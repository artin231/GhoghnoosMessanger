require("dotenv").config();

const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const setupChatSocket = require("./routes/socket/chat");

const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(
	cors({
		origin: "http://127.0.0.1:5173",
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true
	})
);

app.use("/api/account", require("./routes/api/acount"));

app.use((err, req, res, next) => {
	console.error(err);

	res.status(500).json({
		error: "Internal server error."
	});
});


const server = http.createServer(app);

const io = new Server(server);
setupChatSocket(io);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
