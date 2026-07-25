const http = require("http");
const WebSocket = require("ws");

const port = process.env.PORT || 8080;

const server = http.createServer();

const wss = new WebSocket.Server({ server });

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

server.listen(port, () => {
    console.log("Chat server running on port", port);
});
