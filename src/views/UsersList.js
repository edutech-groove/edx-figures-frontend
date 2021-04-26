import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiConfig from 'base/apiConfig';
import { trackPromise } from 'react-promise-tracker';
import HeaderAreaLayout from 'base/components/layout/HeaderAreaLayout';
import HeaderContentStatic from 'base/components/header-views/header-content-static/HeaderContentStatic';
import Paginator from 'base/components/layout/Paginator';
import ListSearch from 'base/components/inputs/ListSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersList: [],
      perPage: 20,
      count: 0,
      pages: 0,
      currentPage: 1,
      searchQuery: '',
      ordering: 'profile__name',
    };

    this.getUsers = this.getUsers.bind(this);
    this.setPerPage = this.setPerPage.bind(this);
    this.setSearchQuery = this.setSearchQuery.bind(this);
    this.setOrdering = this.setOrdering.bind(this);
    this.constructApiUrl = this.constructApiUrl.bind(this);
  }

  constructApiUrl(rootUrl, searchQuery, orderingType, perPageLimit, resultsOffset) {
    let requestUrl = rootUrl;
    // add search term
    requestUrl += '?search=' + searchQuery;
    // add ordering
    requestUrl += '&ordering=' + orderingType;
    // add results per page limit
    requestUrl += '&limit=' + perPageLimit;
    // add results offset
    requestUrl += '&offset=' + resultsOffset;
    // return
    return requestUrl;
  }

  getUsers(page = 1) {
    const offset = (page-1) * this.state.perPage;
    const requestUrl = this.constructApiUrl(apiConfig.learnersGeneral, this.state.searchQuery, this.state.ordering, this.state.perPage, offset);
    trackPromise(
      fetch((requestUrl), { credentials: "same-origin" })
        .then(response => response.json())
        .then(json => this.setState({
          usersList: json['results'],
          count: json['count'],
          pages: Math.ceil(json['count'] / this.state.perPage),
          currentPage: page,
        })
      )
    )
  }

  setPerPage(newValue) {
    this.setState({
      perPage: newValue,
    }, () => {
      this.getUsers();
    })
  }

  setSearchQuery(newValue) {
    this.setState({
      searchQuery: newValue
    }, () => {
      this.getUsers();
    })
  }

  setOrdering(newValue) {
    this.setState({
      ordering: newValue
    }, () => {
      this.getUsers();
    })
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {

    const listItems = this.state.usersList.map((user, index) => {
      return (
        <tr key={user['id']} className='user-list-item'>
          <td className='user-fullname'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                Full name:
              </div> */}
              <div className='mobile-value'>
                <Link
                  className='user-fullname-link'
                  to={'/figures/user/' + user['id']}
                >
                  {user['fullname']}
                </Link>
              </div>
            </div>
          </td>
          <td className='username'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                Username:
              </div> */}
              <div className='mobile-value'>
                {user['username']}
              </div>
            </div>
          </td>
          <td className='is-active'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                Is activated:
              </div> */}
              <div className='mobile-value'>
                {user['is_active'] ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="14.235" height="10.237" viewBox="0 0 14.235 10.237">
                  <g transform="translate(0 0)">
                    <path d="M548.55,398.508l-4.9-4.729.882-.913,4,3.86,8.455-8.454.9.9Z" transform="translate(-543.653 -388.271)"/>
                  </g>
                </svg>
                : '-'}
              </div>
            </div>
          </td>
          <td className='date-joined'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                Date joined:
              </div> */}
              <div className='mobile-value'>
                {user['date_joined']}
              </div>
            </div>
          </td>
          <td className='number-of-courses'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                No. of courses:
              </div> */}
              <div className='mobile-value'>
                {user['courses'].length}
              </div>
            </div>
          </td>
          <td className='action-container'>
            <Link
              className='user-action'
              to={'/figures/user/' + user['id']}
            >
              User details
            </Link>
          </td>
        </tr>
      )
    })

    return (
      <div className="ef--layout-root">
        <HeaderAreaLayout>
          <HeaderContentStatic
            title='Users list'
          >
            This view allows you to browse your sites users. Total number of results <span>{this.state.count}</span>
          </HeaderContentStatic>
        </HeaderAreaLayout>
        <div className='container users-content'>
          <div className='page-header'>
          <ListSearch
            valueChangeFunction={this.setSearchQuery}
            inputPlaceholder='Search by users name, username or email...'
          />
          {this.state.pages ? (
            <Paginator
              pageSwitchFunction={this.getUsers}
              currentPage={this.state.currentPage}
              perPage={this.state.perPage}
              pages={this.state.pages}
              changePerPageFunction={this.setPerPage}
            />
          ) : ''}
          </div>
          <table className='users-list'>
            <thead>
              <tr key='list-header' className='user-list-item list-header'>
                <th className='user-fullname'>
                  <button
                    className='sorting-header-button'
                    onClick={() => (this.state.ordering !== 'profile__name') ? this.setOrdering('profile__name') : this.setOrdering('-profile__name')}
                  >
                    <span>
                      User full name
                    </span>
                    {(this.state.ordering === 'profile__name') ? (
                      <FontAwesomeIcon icon={faCaretUp} />
                    ) : (this.state.ordering === '-profile__name') ? (
                      <FontAwesomeIcon icon={faCaretDown} />
                    ) : ''}
                  </button>
                </th>
                <th className='username'>
                  <button
                    className='sorting-header-button'
                    onClick={() => (this.state.ordering !== 'username') ? this.setOrdering('username') : this.setOrdering('-username')}
                  >
                    <span>
                      Username
                    </span>
                    {(this.state.ordering === 'username') ? (
                      <FontAwesomeIcon icon={faCaretUp} />
                    ) : (this.state.ordering === '-username') ? (
                      <FontAwesomeIcon icon={faCaretDown} />
                    ) : ''}
                  </button>
                </th>
                <th className='is-active'>
                  <button
                    className='sorting-header-button'
                    onClick={() => (this.state.ordering !== 'is_active') ? this.setOrdering('is_active') : this.setOrdering('-is_active')}
                  >
                    <span>
                      Is activated
                    </span>
                    {(this.state.ordering === 'is_active') ? (
                      <FontAwesomeIcon icon={faCaretUp} />
                    ) : (this.state.ordering === '-is_active') ? (
                      <FontAwesomeIcon icon={faCaretDown} />
                    ) : ''}
                  </button>
                </th>
                <th className='date-joined'>
                  <button
                    className='sorting-header-button'
                    onClick={() => (this.state.ordering !== 'date_joined') ? this.setOrdering('date_joined') : this.setOrdering('-date_joined')}
                  >
                    <span>
                      Date joined
                    </span>
                    {(this.state.ordering === 'date_joined') ? (
                      <FontAwesomeIcon icon={faCaretUp} />
                    ) : (this.state.ordering === '-date_joined') ? (
                      <FontAwesomeIcon icon={faCaretDown} />
                    ) : ''}
                  </button>
                </th>
                <th className='number-of-courses'>
                  Courses enroled in
                </th>
                <th className='action-container'>

                </th>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </table>
          {this.state.pages ? (
            <div className='page-footer'>
              <Paginator
                pageSwitchFunction={this.getUsers}
                currentPage={this.state.currentPage}
                perPage={this.state.perPage}
                pages={this.state.pages}
                changePerPageFunction={this.setPerPage}
              />
            </div>
          ) : ''}
        </div>
      </div>
    );
  }
}

export default UsersList