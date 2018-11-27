import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      currentUser: { name: "Bob" }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: "4f46b23",
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: "h73b9f8",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({loading: false});
    }, 3000)
   }

  render() {
    if (this.state.loading) {
      return <h1>Loading messages....</h1>
    } else {
    return (
      <div>
        <MessageList messages={this.state.messages} />
        <ChatBar user={this.state.currentUser.name} />
      </div>
    );
    }
  }
}
export default App;
