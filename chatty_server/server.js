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

const clients = []

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');

  clients.push(ws)

  ws.on('message', function incoming(newMessage) {
    const newMessageString = JSON.parse(newMessage)
    newMessageString.id = uuidv1()
    console.log(JSON.stringify(newMessage));

    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN && client !== ws) {
        client.send(newMessage)
      }




  })
  //console.log()
  ws.send(JSON.stringify(newMessageString));
})



  // newMessageString.JSON.stringify(newMessage)

  // Set up a callback for when a client closes the socket.  This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'))
})