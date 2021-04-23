import React, { Component } from 'react';

class HeaderContentUser extends Component {
  render() {

    return (
      <section className='header-content-user'>
        <img src={this.props.image} alt={this.props.name} role="presentation" className='user-image' />
      </section>
    );
  }
}

export default HeaderContentUser
