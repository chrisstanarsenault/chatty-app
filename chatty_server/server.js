const express = require("express");
const SocketServer = require("ws").Server;
const uuidv1 = require("uuid/v1");

// Set the port to 3001
const PORT = process.env.PORT || 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static("public"))
  .listen(PORT, "0.0.0.0", "https://chris-chatty-app.herokuapp.com/", () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebStockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(ws) {
    ws.send(JSON.stringify(data));
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on("connection", ws => {
  console.log("Client connected");

  // Keeps tracks of amount of users logging into site,
  // and sends this information to client to update user count state and add 1 to 'Users Online' counter
  const numOfUsers = {
    type: "numOfUsers",
    numOfUsers: wss.clients.size
  };
  wss.broadcast(numOfUsers);

  const colors = ["red", "green", "blue", "purple"];
  const randomColor = colors[Math.floor(Math.random() * 4)];

  //  Assigns each new user a randomly generated color from color array above
  const userColor = {
    type: "userColor",
    userColor: randomColor
  };
  ws.send(JSON.stringify(userColor));

  ws.on("message", function incoming(message) {
    const data = JSON.parse(message);

    switch (data.type) {
      case "postMessage":
        // handle incoming message
        data.id = uuidv1();
        data.type = "incomingMessage";
        break;
      case "postNotification":
        // handle incoming notification
        data.id = uuidv1();
        data.type = "incomingNotification";
        data.content = `${data.nameA} has changed their name to ${data.nameB}`;
        console.log(JSON.stringify(data.content));
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + message.type);
    }

    wss.broadcast(data);
  });
  // Logs when a user logs off site, to subtract from 'users online' message in navbar
  ws.on("close", () => {
    console.log("Client disconnected");
    const numOfUsers = {
      type: "numOfUsers",
      numOfUsers: wss.clients.size
    };
    wss.broadcast(numOfUsers);
  });
});

// Set up a callback for when a client closes the socket.  This usually means they closed their browser.
