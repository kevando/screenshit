import React from 'react';
import {ipcRenderer, remote} from 'electron';
import Window from '../components/Window';

export default class App extends React.Component {

  _onOKClick() {
    // TODO, add copy to clipboard checkbox
    // ipcRenderer.send('copy-image', screenShotPath);
    var window = remote.getCurrentWindow();
    window.close();


  }

  render() {

    var screenShotPath = remote.getCurrentWindow().screenShotPath;

    return (
      <Window.Container>

        <Window.Header title='New Screenshot' />

        <Window.Content>
          <p>{screenShotPath}</p>
          <br />

        </Window.Content>

        <Window.Footer>
          <button className='btn' onClick={this._onOKClick}>OK</button>
        </Window.Footer>

  </Window.Container>

);

  }
}
