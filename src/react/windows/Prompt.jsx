import React from 'react';
import {ipcRenderer, remote} from 'electron';
import Window from '../components/Window';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      copyImage: remote.getCurrentWindow().copyImageByDefault,
      // keepFile: true,
    }
    this._onDone = this._onDone.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  componentDidMount() {
    ipcRenderer.on('image-process-complete', (event, imageProcessResponse) => {
      var window = remote.getCurrentWindow();
      window.close();
    });
  }

  _handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value });
  }

  _onDone() {
    ipcRenderer.send('done-with-screen-shot', this.state);
  }

  render() {

    var screenShotPath = remote.getCurrentWindow().screenShotPath;

    return (
      <Window.Container>

        <Window.Header title='ScreenShit'  />

        <Window.Content>
          <h3>What do you want to do?</h3>

            <div className="checkbox">
              <label htmlFor="copy_image">
                  <input type="checkbox" id="copy_image" name="copyImage" checked={this.state.copyImage} onChange={this._handleInputChange } />
                  Copy Image
              </label>
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
