import React from 'react';
import {remote, ipcRenderer} from 'electron';

import Window from '../../components/Window';

export default class OnboardingWelcome extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   enablePreview: false,
    // }
    this._copyImage = this._copyImage.bind(this);
  }


  _copyImage() {

    ipcRenderer.send('copy-image');

    setTimeout(()=> {
      // alert('image copied!');
      var window = remote.getCurrentWindow();
      window.close();
    },300);


  }

  _onCancel() {
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
                      <button className="btn">📠</button>
                      <p>Upload</p>
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
