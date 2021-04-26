import React, { Component } from 'react';
import PropTypes from 'prop-types';

class HeaderContentStatic extends Component {
  render() {

    return (
      <section className='header-content-static container'>
        <h1 className='title'>{this.props.title}</h1>
        <p className='subtitle'>
          {this.props.children || this.props.subtitle}</p>
      </section>
    );
  }
}

HeaderContentStatic.defaultProps = {
  title: 'Static page header',
  subtitle: 'Static page header subtitle.'
}

HeaderContentStatic.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string
};

export default HeaderContentStatic
