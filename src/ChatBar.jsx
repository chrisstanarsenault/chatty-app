import React, { Component } from "react";

class ChatBar extends Component {
  handleKeyPress = e => {
    if (e.key === "Enter") {
      const contentInput = e.target.value;
      this.props.addNewMessageItem(contentInput);
      e.target.value = "";
    }
  };

  render() {
    // const onSubmit = evt => {
    //   evt.preventDefault();
    //   const newMessageInput = evt.target.elements.messageContent;
    //   //console.log(newMessageInput.value)
    //   const userInput = evt.target.elements.user;
    //   //console.log(userInput.value)
    //   addnewMessageItem(userInput.value, newMessageInput.value);

    //   newMessageInput.value = "";
    // }

    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          name="user"
          defaultValue={this.props.user}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          name="messageContent"
          onKeyPress={this.handleKeyPress}
        />
      </footer>
    );
  }
}

export default ChatBar;