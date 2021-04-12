import React from 'react';
import PropTypes from 'prop-types';
import Select, { components } from 'react-select';
import { List } from 'immutable';
import styles from './_paginator.scss';
import cx from "classnames";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDoubleRight, faAngleLeft, faAngleDoubleLeft, faCaretDown  } from '@fortawesome/free-solid-svg-icons';

const perPageDropdownOptions = List([
  { value: 20, label: '20' },
  { value: 50, label: '50' },
  { value: 100, label: '100' },
])

class Paginator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.currentPage,
      perPage: this.props.perPage,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        currentPage: nextProps.currentPage,
        perPage: nextProps.perPage,
      });
    }
  }

  render() {

    const pageNumbers = [];

    const numbersToRender = [];
    if (this.props.pages > this.props.ellipsisPageLimit) {
      if ((this.state.currentPage === 1) || (this.state.currentPage === 2)) {
        numbersToRender.push(0, 1, 2, 3, 4, this.props.pages -1, this.props.pages);
      } else if ((this.state.currentPage === this.props.pages - 1) || (this.state.currentPage === this.props.pages)) {
        numbersToRender.push(0, 1, this.props.pages -4, this.props.pages -3, this.props.pages -2, this.props.pages -1, this.props.pages);
      } else {
        numbersToRender.push(0, 1, this.state.currentPage - 1, this.state.currentPage, this.state.currentPage + 1, this.props.pages -1, this.props.pages);
      }
    }
    var renderEllipsis = true;
    for (let i = 0; i < this.props.pages; i++) {
      const page = i + 1;
      const buttonClass = cx({
        'ignore': true,
        [styles['number-item']]: Boolean(page !== this.state.currentPage),
        [styles['number-item-active']]: Boolean(page === this.state.currentPage),
      })

      if (this.props.pages > this.props.ellipsisPageLimit) {
        if (numbersToRender.includes(i)) {
          pageNumbers.push(
            <button
              className={buttonClass}
              onClick={() => this.props.pageSwitchFunction(page)}
            >
              {page}
            </button>
          )
          renderEllipsis = true;
        } else {
          if (renderEllipsis) {
            pageNumbers.push(
              <span className={styles['ellipsis-item']}>...</span>
            )
            renderEllipsis = false;
          }
        }
      } else {
        pageNumbers.push(
          <button
            className={buttonClass}
            onClick={() => this.props.pageSwitchFunction(i+1)}
          >
            {i+1}
          </button>
        )
      }
    }

    return (
      <div className={styles['paginator']}>
        <div className={styles['number-controls-container']}>
          {(this.state.currentPage !== 1) ? (
            <button
              className={cx({
                [styles['text-item']]: true,
                'ignore': true
              })}
              onClick={() => this.props.pageSwitchFunction(1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9">
                <g transform="translate(3 9) rotate(-90)">
                  <path d="M4.5,0a.5.5,0,0,0-.354.147l-4,4a.5.5,0,0,0,.707.707L4.5,1.207,8.146,4.854a.5.5,0,0,0,.707-.707l-4-4A.5.5,0,0,0,4.5,0Z"/>
                </g>
                <g transform="translate(0 9) rotate(-90)">
                  <path d="M4.5,0a.5.5,0,0,0-.354.147l-4,4a.5.5,0,0,0,.707.707L4.5,1.207,8.146,4.854a.5.5,0,0,0,.707-.707l-4-4A.5.5,0,0,0,4.5,0Z"/>
                </g>
              </svg>
            </button>
          ) : (
            <span
              className={styles['text-item-dummy']}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9">
                <g transform="translate(3 9) rotate(-90)">
                  <path d="M4.5,0a.5.5,0,0,0-.354.147l-4,4a.5.5,0,0,0,.707.707L4.5,1.207,8.146,4.854a.5.5,0,0,0,.707-.707l-4-4A.5.5,0,0,0,4.5,0Z"/>
                </g>
                <g transform="translate(0 9) rotate(-90)">
                  <path d="M4.5,0a.5.5,0,0,0-.354.147l-4,4a.5.5,0,0,0,.707.707L4.5,1.207,8.146,4.854a.5.5,0,0,0,.707-.707l-4-4A.5.5,0,0,0,4.5,0Z"/>
                </g>
              </svg>
            </span>
          )}
          {(this.state.currentPage !== 1) ? (
            <button
              className={cx({
                [styles['text-item']]: true,
                'ignore': true
              })}
              onClick={() => this.props.pageSwitchFunction(this.props.currentPage-1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9">
                <g transform="translate(0 9) rotate(-90)">
                  <path d="M4.5,0a.5.5,0,0,0-.354.147l-4,4a.5.5,0,0,0,.707.707L4.5,1.207,8.146,4.854a.5.5,0,0,0,.707-.707l-4-4A.5.5,0,0,0,4.5,0Z"/>
                </g>
              </svg>
            </button>
          ) : (
            <span
              className={styles['text-item-dummy']}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9">
                <g transform="translate(0 9) rotate(-90)">
                  <path d="M4.5,0a.5.5,0,0,0-.354.147l-4,4a.5.5,0,0,0,.707.707L4.5,1.207,8.146,4.854a.5.5,0,0,0,.707-.707l-4-4A.5.5,0,0,0,4.5,0Z"/>
                </g>
              </svg>
            </span>
          )}
          {pageNumbers}
          {(this.state.currentPage !== this.props.pages) ? (
            <button
              className={cx({
                [styles['text-item']]: true,
                'ignore': true
              })}
              onClick={() => this.props.pageSwitchFunction(this.props.currentPage+1)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9">
                <g transform="translate(-390.547 424.663) rotate(-90)">
                  <path d="M420.164,395.547a.5.5,0,0,1-.354-.147l-4-4a.5.5,0,1,1,.707-.707l3.647,3.647,3.646-3.647a.5.5,0,0,1,.707.707l-4,4A.5.5,0,0,1,420.164,395.547Z"/>
                </g>
              </svg>
            </button>
          ) : (
            <span
              className={styles['text-item-dummy']}
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 5 9">
              <g transform="translate(-390.547 424.663) rotate(-90)">
                <path d="M420.164,395.547a.5.5,0,0,1-.354-.147l-4-4a.5.5,0,1,1,.707-.707l3.647,3.647,3.646-3.647a.5.5,0,0,1,.707.707l-4,4A.5.5,0,0,1,420.164,395.547Z"/>
              </g>
            </svg>
            </span>
          )}
          {(this.state.currentPage !== this.props.pages) ? (
            <button
              className={cx({
                [styles['text-item']]: true,
                'ignore': true
              })}
              onClick={() => this.props.pageSwitchFunction(this.props.pages)}
            >
              
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9">
                <g transform="translate(-563 -755)">
                  <g transform="translate(172.453 1179.663) rotate(-90)">
                    <path d="M420.164,395.547a.5.5,0,0,1-.354-.147l-4-4a.5.5,0,1,1,.707-.707l3.647,3.647,3.646-3.647a.5.5,0,0,1,.707.707l-4,4A.5.5,0,0,1,420.164,395.547Z"/>
                  </g>
                  <g transform="translate(175.453 1179.663) rotate(-90)">
                    <path d="M420.164,395.547a.5.5,0,0,1-.354-.147l-4-4a.5.5,0,1,1,.707-.707l3.647,3.647,3.646-3.647a.5.5,0,0,1,.707.707l-4,4A.5.5,0,0,1,420.164,395.547Z"/>
                  </g>
                </g>
              </svg>
            </button>
          ) : (
            <span
              className={styles['text-item-dummy']}
            >
              
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9">
                <g transform="translate(-563 -755)">
                  <g transform="translate(172.453 1179.663) rotate(-90)">
                    <path d="M420.164,395.547a.5.5,0,0,1-.354-.147l-4-4a.5.5,0,1,1,.707-.707l3.647,3.647,3.646-3.647a.5.5,0,0,1,.707.707l-4,4A.5.5,0,0,1,420.164,395.547Z"/>
                  </g>
                  <g transform="translate(175.453 1179.663) rotate(-90)">
                    <path d="M420.164,395.547a.5.5,0,0,1-.354-.147l-4-4a.5.5,0,1,1,.707-.707l3.647,3.647,3.646-3.647a.5.5,0,0,1,.707.707l-4,4A.5.5,0,0,1,420.164,395.547Z"/>
                  </g>
                </g>
              </svg>
            </span>
          )}
        </div>
        <div className={styles['dropdown-controls-container']}>
          <span className={styles['paginator-dropdown-label']}>
            Per page
          </span>
          <div className={styles['dropdown-inner-container']}>
            <Select
              options={perPageDropdownOptions.toArray()}
              onChange = {(payload) => this.props.changePerPageFunction(payload.value)}
              value={perPageDropdownOptions.get(perPageDropdownOptions.findIndex(item => (item.value === this.state.perPage)))}
              styles={{
                control: (base, state) => ({
                  ...base,
                  background: state.isFocused ? '#FFF' : '#F3F3F4',
                  border: '1px solid transparent',
                  borderColor: state.isFocused ? '#E60978 !important' : '#F3F3F4',
                  boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(230, 9, 120, 0.25)' : 'none',

                  '&:hover': {
                    borderColor: state.isFocused ? '#E60978' : '#F3F3F4',
                  }
                }),

                option: (base, state) => ({
                  ...base,
                  color: '#333',
                  backgroundColor: state.isFocused ? '#FBFBFB' : '#fff',
                })
              }}
              components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: (props) => {
                  return (<components.DropdownIndicator {...props}>
                    <FontAwesomeIcon icon={faCaretDown}/>
                  </components.DropdownIndicator>);
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

Paginator.defaultProps = {
  perPage: 20,
  ellipsisPageLimit: 9,
};

Paginator.propTypes = {
  pages: PropTypes.number,
  pageSwitchFunction: PropTypes.func,
  changePerPageFunction: PropTypes.func,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
};

export default Paginator;
