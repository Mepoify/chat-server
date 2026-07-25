const WebSocket = require("ws");

const port = process.env.PORT || 8080;

const server = new WebSocket.Server({
    port: port
});

console.log("Chat server running on port", port);

server.on("connection", socket => {

    console.log("Someone connected!");

    socket.on("message", message => {

        // Send the message to everyone
        server.clients.forEach(client => {

            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }

        });

    });

    socket.on("close", () => {
        console.log("Someone disconnected");
    });

});
