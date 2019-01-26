import React from 'react';
import {remote} from 'electron';

import Window from '../../components/Window';

export default class OnboardingWelcome extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      enablePreview: false,
    }
    this._handleInputChange = this._handleInputChange.bind(this);
  }


  _handleInputChange(event) {
    // const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    // this.setState({ [name]: value });


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
        <div className="content">
         <h1>Do More With Screen Shots</h1>
          <span className="icon">🖥</span>
          <p>Press <b>CMD + Shift + 4</b> to begin exploring.</p>

      </div>
        </Window.Content>

      </Window.Container>
    );
  }
}
