import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx'



class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //loading: true,
      currentUser: { name: "Anonymous" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [], // messages coming from the server will be stored here as they arrive
      users: 0,
      colors: []
    };
    this.socket = new WebSocket("ws://localhost:3001");

    //this.addNewMessageItem = this.addNewMessageItem.bind(this);
  }


  componentDidMount() {
    this.socket.onopen = function (event) {
      console.log('Connected to: ' + event.currentTarget.url);
    };

    this.socket.onmessage = (event) => {
      console.log(event.data)
      const data = JSON.parse(event.data)
      if ( data.type === 'numOfUsers') {
        this.setState({users: data.numOfUsers})
        console.log("Hello there::::", this.state.users)
      } else {
      const oldMessageItems = this.state.messages;
      const newMessageItems = data
      const actualMessage = [...oldMessageItems, newMessageItems]
      this.setState({messages: actualMessage})
      }
    }
  }

  addNewMessageItem = (content) => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  addNewUserItem = (username) => {
    const newUser = {
      type: "postNotification",
      nameA: this.state.currentUser.name,
      nameB: username
    };
    this.setState({currentUser: {name: username}})
    this.socket.send(JSON.stringify(newUser))
  }

  render() {
    // if (this.state.loading) {
    //   return <h1>Loading messages....</h1>
    //   } else {
      return (
      <div>
        <NavBar users={this.state.users}/>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser.name} addNewMessageItem={this.addNewMessageItem} addNewUserItem={this.addNewUserItem} />
      </div>
      );
    }
  }
//}
export default App;
