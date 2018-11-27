import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      userName: "Chris"
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
        <MessageList />
        <ChatBar user={this.state.userName} />
      </div>
    );
    }
  }
}
export default App;
