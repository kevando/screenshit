import React from 'react';
import {ipcRenderer, remote} from 'electron';
import Window from '../components/Window';

export default class OnboardingConfig extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      copyImage: false,
      // keepFile: true,
    }
    this._onDone = this._onDone.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('image-process-complete', (event, imageProcessResponse) => {

      // For now, just close this window no matter what. later on, show a success window
      var window = remote.getCurrentWindow();
      window.close();
    })
  }

  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  _onDone() {
    ipcRenderer.send('first-screen-shot-saved', this.state);
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
            <h3>What do you want to do?</h3>

            <br />
            <div className="checkbox">
              <label htmlFor="copy_image">
                  <input type="checkbox" id="copy_image" name="copyImage" checked={this.state.copyImage} onChange={this._handleInputChange } />
                  Copy Image
                  <div className="sub">This is very helpful because you can paste images into most websites and applications</div>
              </label>
            </div>

          </div>
        </Window.Content>
        <Window.Divider />
        <Window.Footer>
          <button className='btn' onClick={this._onDone}>Done</button>
        </Window.Footer>

  </Window.Container>

);

  }
}
