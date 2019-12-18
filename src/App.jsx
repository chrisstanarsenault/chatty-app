import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import NavBar from "./NavBar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], // messages coming from the server will be stored here as they arrive
      users: 0,
      color: "black"
    };
    // this.socket = new WebSocket("ws://localhost:3001");
    this.socket = new WebSocket("wss://chris-chatty-app.herokuapp.com/");
  }

  componentDidMount() {
    this.socket.onopen = function(event) {
      console.log("Connected to: " + event.currentTarget.url);
    };

    this.socket.onmessage = event => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      // updates user state when server notifies a new user has logged in, and updates counter
      if (data.type === "numOfUsers") {
        this.setState({ users: data.numOfUsers });
      }
      // updates color state for new user when they log in
      if (data.type === "userColor") {
        this.setState({ color: data.userColor });
        console.log(data.type);
      }

      const oldMessageItems = this.state.messages;
      const newMessageItems = data;
      const actualMessage = [...oldMessageItems, newMessageItems];
      this.setState({ messages: actualMessage });
    };
  }

  addNewMessageItem = content => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content,
      color: this.state.color
    };
    this.socket.send(JSON.stringify(newMessage));
  };
  // function for modifying the username, and notifying everyone who is logged in.
  // nameA is current username, and nameB is the new username after state change
  addNewUserItem = username => {
    const newUser = {
      type: "postNotification",
      nameA: this.state.currentUser.name,
      nameB: username
    };
    this.setState({ currentUser: { name: username } });
    this.socket.send(JSON.stringify(newUser));
  };

  render() {
    return (
      <div>
        <NavBar users={this.state.users} />
        <MessageList messages={this.state.messages} color={this.state.color} />
        <ChatBar
          user={this.state.currentUser.name}
          addNewMessageItem={this.addNewMessageItem}
          addNewUserItem={this.addNewUserItem}
        />
      </div>
    );
  }
}
export default App;
