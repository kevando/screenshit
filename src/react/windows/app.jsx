import React from 'react';

const {ipcRenderer, remote} = require('electron');

export default class App extends React.Component {

  _onClose() {
    // alert('onclose');
    ipcRenderer.send('start-screen-shot-watcher', 'DUUUDE')
    var window = remote.getCurrentWindow();
    window.hide();
  }

  render() {

    var desktopPath = remote.app.getPath('desktop');

    return (
      <div>
        <h2>app.jsx to React!!!</h2>
        <p>{desktopPath}</p>

        <button onClick={this._onClose}>Close</button>

    </div>);



    // return (
    //   <div>
    //     <h2>Welcome to React!!!</h2>
    //
    // </div>);


  }
}
