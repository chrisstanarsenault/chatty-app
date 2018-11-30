# Chatty-App
=====================

Chatty App is a simple single page chat app built with React and Websockets.

Users can choose a username (and modify anytime, which will alert all users) and write messages. All messages created will publish to all the connected users the screen on pressing ENTER. Users will also be issued a random username color upon first joining the page. Additionally a counter will update in realtime when a user joins or leaves the chat to let everyone know how many people are currently online.

## Dependencies

* React : 15.4.2
* React-Dom : 15.4.2
* UUID : ^3.3.2
* Express : 4.16.4
* WS : 6.1.2

### Dev-Dependencies
* babel-core: 6.23.1
* babel-loader : 6.3.1
* babel-preset-es2015 : 6.22.0
* babel-preset-react : 6.23.0
* babel-preset-stage-0 : 6.22.0
* css-loader : 0.26.1
* eslint : 3.15.0
* eslint-plugin-react : 6.9.0
* node-sass : 4.5.0
* sass-loader : 6.0.0
* sockjs-client : ^1.1.2
* style-loader : 0.13.1
* webpack : 2.2.1
* webpack-dev-server : 2.3.0

## Getting Started
- Install all dependencies
- Make your way to the chatty_server directory and run: node server.js
- Once thats running, open a second console, navigate to the root directory and run: npm start.
- Now, open as many mulitple browser windows as you want (each simulates a 'new user') and in your address bar type: localhost:3000
- Feel free to choose new usernames for each user (window). Make sure press enter to register the change. You should see a notification in each user window of the change!
- Also note the 'Users Online' counter that increases and decreases with each new user that connects or disconnects.
- Hope you enjoy Chatty!

## Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

## Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint

```
## Snapshots
### Main chatscreen
!["Main chat screen"](https://github.com/chrisstanarsenault/chatty-app/blob/master/docs/Chatty-App-SS-1.png?raw=true)

### Multi-user Screens 1
!["Multi-user Screens 1"](https://github.com/chrisstanarsenault/chatty-app/blob/master/docs/Chatty-App-SS-2.png?raw=true)

### Multi-user Screens 2
!["Multi-user Screens 2"](https://github.com/chrisstanarsenault/chatty-app/blob/master/docs/Chatty-App-SS-3.png?raw=true)

### Updated User Counter
!["Updated User Counter"](https://github.com/chrisstanarsenault/chatty-app/blob/master/docs/User-Counter-SS.png?raw=true)

