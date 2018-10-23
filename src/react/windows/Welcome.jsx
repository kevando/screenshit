import React from 'react';
import {ipcRenderer, remote} from 'electron';
import Window from '../components/Window';

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
      <Window.Container>

        <Window.Header title='Welcome' />

        <Window.Content>
          <p>screenshit runs in the background and helps you manage your screen shots better.</p>
          <br />
          <p>{desktopPath}</p>
        </Window.Content>

        <Window.Divider />

        <Window.Footer>
          <button className='btn'>OK</button>
        </Window.Footer>

  </Window.Container>

);

  }
}
