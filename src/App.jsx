import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //loading: true,
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        // {
        //   id: "4f46b23",
        //   username: "Bob",
        //   content: "Has anyone seen my marbles?",
        // },
        // {
        //   id: "h73b9f8",
        //   username: "Anonymous",
        //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        // }
      ] // meesages coming from the server will be stored here as they arrive
    };
    this.socket = new WebSocket("ws://localhost:3001");

    this.addNewMessageItem = this.addNewMessageItem.bind(this);
  }


  componentDidMount() {
    this.socket.onopen = function (e) {
      console.log('Connected to: ' + e.currentTarget.url);
    };
    this.socket.onmessage = (newMessage) => {
      console.log(newMessage.data)
      const oldMessageItems = this.state.messages;
      const newMessageItems = JSON.parse(event.data)
      const actualMessage = [...oldMessageItems, newMessageItems]
      this.setState({messages: actualMessage})

    }
  }

  // generateRandomId() {
  //   const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  //   const alphabetLength = alphabet.length;
  //   const randoIter = (key, n) => {
  //     if (n === 0) {
  //       return key;
  //     }
  //     const randoIndex = Math.floor(Math.random() * alphabetLength);
  //     const randoLetter = alphabet[randoIndex];
  //     return randoIter(key + randoLetter, n - 1);
  //   };
  //   return randoIter("", 10);
  // };

  addNewMessageItem(content) {
    const newMessage = {
      //id: Math.floor(Math.random() * 100),
      username: this.state.currentUser.name,
      content
    };
    //  const oldMessageItems = this.state.messages;
    //  const newMessageItems = [...oldMessageItems, newMessage]
    //  this.setState({messages: newMessageItems});
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    // if (this.state.loading) {
    //   return <h1>Loading messages....</h1>
    //   } else {
      return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser.name} addNewMessageItem={this.addNewMessageItem} />
      </div>
      );
    }
  }
//}
export default App;
