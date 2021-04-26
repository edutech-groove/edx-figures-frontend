import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
      <div className='list-search'>
        <div className={'inner-container' + (this.state.value !== '' ? ' active' : '')}>
          <input
            type="text"
            className='list-search-input'
            value={this.state.value}
            onChange={(e) => this.onChange(e.target.value)}
            placeholder={this.props.inputPlaceholder}
          />
          {this.state.value ?
          (<button className="dismiss-btn" onClick={this.clearInput}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
              <path fill="#cbcbcb" d="M11.375,3.375a8,8,0,1,0,8,8A8,8,0,0,0,11.375,3.375Zm2.027,10.9-2.027-2.027L9.348,14.271a.615.615,0,1,1-.869-.869l2.027-2.027L8.479,9.348a.615.615,0,0,1,.869-.869l2.027,2.027L13.4,8.479a.615.615,0,0,1,.869.869l-2.027,2.027L14.271,13.4a.618.618,0,0,1,0,.869A.611.611,0,0,1,13.4,14.271Z" transform="translate(-3.375 -3.375)"/>
              </svg>
          </button>) :
          (<span className="search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.414 18.414">
              <g transform="translate(-3.5 -3.5)">
                <path d="M18.722,11.611A7.111,7.111,0,1,1,11.611,4.5a7.111,7.111,0,0,1,7.111,7.111Z" transform="translate(0)"/>
                <path d="M28.842,28.842l-3.867-3.867" transform="translate(-8.342 -8.342)"/>
              </g>
            </svg>
          </span>)}
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