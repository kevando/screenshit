import React from 'react';
import {remote, ipcRenderer} from 'electron';

import Window from '../../components/Window';

export default class OnboardingWelcome extends React.Component {

  _copyImage() {
    ipcRenderer.send('copy-image');
    // short pause before closing the window.
    // ideally this becomes a fun moment
    setTimeout(()=> {
      var window = remote.getCurrentWindow();
      window.close();
    },200);
  }

  _close() {
    var window = remote.getCurrentWindow();
    window.close();
  }

  render() {
    return (
      <Window.Container>
        <Window.Header/>
        <Window.Content>
          <div className="prompt">
            <div className="buttons">
              <div className="button icon">
                <button className="btn" onClick={this._close}>💾</button>
                <p>Save</p>
              </div>
              <div className="button icon">
                <button className="btn" onClick={this._copyImage}>📮</button>
                <p>Copy</p>
              </div>
            </div>
          </div>
        </Window.Content>
      </Window.Container>
    );
  }
}
