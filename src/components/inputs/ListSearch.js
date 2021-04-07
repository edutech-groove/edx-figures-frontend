import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './_list-search.scss';
import classNames from 'classnames/bind';

let cx = classNames.bind(styles);


class ListSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.passValue = this.passValue.bind(this);
  }

  onChange = (newValue) => {
    clearTimeout(this.timer);
    this.setState({
      value: newValue
    });
    this.timer = setTimeout(this.passValue, this.props.waitInterval);
  };

  clearInput = () => {
    this.setState({
      value: ''
    }, () => this.props.valueChangeFunction(''))
  }

  passValue = () => {
    this.props.valueChangeFunction(this.state.value);
  }

  componentWillMount() {
    this.timer = null;
  }



  render() {

    return (
      <div className={styles['list-search']}>
        <div className={cx({ 'inner-container': true, 'active': (this.state.value !== '')})}>
          <input
            type="text"
            className={styles['list-search-input']}
            value={this.state.value}
            onChange={(e) => this.onChange(e.target.value)}
            placeholder={this.props.inputPlaceholder}
          />
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.414 18.414">
              <g transform="translate(-3.5 -3.5)">
                <path d="M18.722,11.611A7.111,7.111,0,1,1,11.611,4.5a7.111,7.111,0,0,1,7.111,7.111Z" transform="translate(0)"/>
                <path d="M28.842,28.842l-3.867-3.867" transform="translate(-8.342 -8.342)"/>
              </g>
            </svg>
          </span>
        </div>
      </div>
    )
  }
}

ListSearch.defaultProps = {
  waitInterval: 1000,
  inputPlaceholder: 'Start typing...',
}

ListSearch.propTypes = {
  negativeStyleButton: PropTypes.bool,
  buttonText: PropTypes.string,
  inputPlaceholder: PropTypes.string
};

export default ListSearch
