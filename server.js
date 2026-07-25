const http = require("http");
const WebSocket = require("ws");

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
    res.writeHead(200);
    res.end("MEPO Chat Server is running!");
});

const wss = new WebSocket.Server({ server });

console.log("Starting chat server...");

wss.on("connection", socket => {
    console.log("Someone connected!");

    socket.on("message", message => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });

    socket.on("close", () => {
        console.log("Someone disconnected");
    });
});

server.listen(PORT, () => {
    console.log(`Chat server running on port ${PORT}`);
});
