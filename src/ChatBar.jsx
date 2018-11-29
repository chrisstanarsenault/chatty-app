import React, { Component } from "react";

class ChatBar extends Component {
  handleKeyPressForMessage = event => {
    if (event.key === "Enter") {
      const contentInput = event.target.value;
      this.props.addNewMessageItem(contentInput);
      event.target.value = "";
    }
  };

  handleKeyPressForUser = event => {
    if (event.key === "Enter") {
      const userInput = event.target.value;
      this.props.addNewUserItem(userInput);
    }
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          name="user"
          onKeyPress={this.handleKeyPressForUser}
          defaultValue={this.props.user}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          name="messageContent"
          onKeyPress={this.handleKeyPressForMessage}
        />
      </footer>
    );
  }
}

export default ChatBar;