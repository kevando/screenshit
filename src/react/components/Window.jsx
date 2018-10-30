import React from 'react';
// import {ipcRenderer, remote} from 'electron';

class Container extends React.Component {

  render() {

    return (
      <div className='window'>
        {this.props.children}
      </div>
  );

  }
}

// --------------------------------
// Header
// --------------------------------

const Header = ({title, closeButton}) => {
    return (
      <div className='header'>
        <div className='title'>
          <h1>{title}</h1>
        </div>
        <div className='buttons'>
        {closeButton === true &&
          <div className="icon">
            <a className="btn close" href="#">
              <i className="fas fa-times"></i>
            </a>
          </div>
        }
        </div>
    </div>
  );
}

const Content = ({children}) => {
    return (
      <div className='content'>
        {children}
    </div>
  );
}

const Footer = ({children}) => {
    return (
      <div className='footer'>
        {children}
    </div>
  );
}


const Divider = () => {
    return (
      <div className='divider'>
    </div>
  );
}



export default {
  Container,
  Header,
  Content,
  Footer,
  Divider,
}
