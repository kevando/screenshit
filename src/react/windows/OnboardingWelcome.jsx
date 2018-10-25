import React from 'react';
import {remote} from 'electron';
import Window from '../components/Window';

export default class OnboardingWelcome extends React.Component {

  componentDidMount() {

    // ipcRenderer.on('first-screen-shot-detected', (event, arg) => {
    //   console.log('FIRST SCREEN SHOT!');
    //
    //   // For now, just close this window no matter what
    //   // might actually want to hide it
    //   var window = remote.getCurrentWindow();
    //   window.close();
    // })
  }

  _onCancel() {
    var window = remote.getCurrentWindow();
    window.close();
  }


  render() {

    return (
      <Window.Container>
        <Window.Header title='Welcome' />
        <Window.Content>
          <div className='left'>
            <img src= '../app/icon/96x96.png' />
          </div>
          <div className='right'>
            <h3>Do More With Screen Shots</h3>
            <p>Take a screen shot right now to continue.</p>
            <p>If you have Mojave, this may take a second.</p>
          </div>
        </Window.Content>
        <Window.Divider />
        <Window.Footer>
          <button className='btn' onClick={this._onCancel}>Cancel</button>
        </Window.Footer>
      </Window.Container>
    );
  }
}
