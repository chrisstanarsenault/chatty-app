const express = require('express')
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebStockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(ws) {
    ws.send(JSON.stringify(data));
  });
};

const clients = []

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');

  clients.push(ws)
  const numOfUsers = {type: "numOfUsers", numOfUsers: wss.clients.size}
  wss.broadcast(numOfUsers)

  // Array with some colors
  var colors = ['red', 'green', 'blue', 'purple'];


  console.log(colors)

  ws.on('message', function incoming(message) {

    const data = JSON.parse(message);
    console.log(data)
    switch (data.type) {
      case "postMessage":
        // handle incoming message
        data.id = uuidv1()
        data.type = "incomingMessage"
        console.log(JSON.stringify(message));
        break;
      case "postNotification":
        // handle incoming notification
        //const newUserString = JSON.parse(message);
        data.id = uuidv1();
        data.type = "incomingNotification";
        data.content = `${data.nameA} has changed their name to ${data.nameB}`
        console.log(JSON.stringify(data.content))
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + message.type);
    }

      wss.broadcast(data)



    // clients.forEach(client => {
    //   if (client.readyState === WebSocket.OPEN && client !== ws) {
    //     client.send(message)
    //   }




  })
  //console.log()
  //ws.send(JSON.stringify(newMessageString));
  ws.on('close', () => {
      console.log('Client disconnected')
      const numOfUsers = {
        type: "numOfUsers",
        numOfUsers: wss.clients.size
      }
      wss.broadcast(numOfUsers  )
      console.log(numOfUsers)
  })

})



  // newMessageString.JSON.stringify(newMessage)

  // Set up a callback for when a client closes the socket.  This usually means they closed their browser.

