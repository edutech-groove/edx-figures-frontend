import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import apiConfig from 'base/apiConfig';
import { trackPromise } from 'react-promise-tracker';
import styles from './_users-list-content.scss';
import HeaderAreaLayout from 'base/components/layout/HeaderAreaLayout';
import HeaderContentStatic from 'base/components/header-views/header-content-static/HeaderContentStatic';
import Paginator from 'base/components/layout/Paginator';
import ListSearch from 'base/components/inputs/ListSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
let cx = classNames.bind(styles);


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

  constructApiUrl(rootUrl, searchQuery, orderingType, perPageLimit, resultsOffset) {
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

    // const json = {"count":58,"next":"https://learning.groovetechnology.com/figures/api/users/general/?limit=20&offset=20&ordering=-profile__name&search=","previous":null,"results":[{"id":30,"username":"vynguyen","email":"vy.nguyennt@groovetechnology.com","fullname":"Vy Nguyen","country":"","is_active":true,"year_of_birth":null,"gender":"","date_joined":"2021-03-02","level_of_education":"","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","display_name":"Hướng dẫn quyết toán thuế 2020","org":"GrooveTechnology"}]},{"id":23,"username":"duongtanvu096","email":"duongtanvu096@gmail.com","fullname":"Vu Duong","country":"","is_active":false,"year_of_birth":null,"gender":"","date_joined":"2020-11-04","level_of_education":"","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","display_name":"Hướng dẫn quyết toán thuế 2020","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVT-101+2020-101","display_name":"EVCargoTech 101","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVTl-SE-01+2020-SE01","display_name":"EVCargoTech-Software Engineer-Training Course","org":"GrooveTechnology"}]},{"id":20,"username":"vuduong","email":"vu.duong@groovetechnology.com","fullname":"Vu Duong","country":"","is_active":true,"year_of_birth":null,"gender":"","date_joined":"2020-11-02","level_of_education":"","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","display_name":"Hướng dẫn quyết toán thuế 2020","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVT-101+2020-101","display_name":"EVCargoTech 101","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVTl-SE-01+2020-SE01","display_name":"EVCargoTech-Software Engineer-Training Course","org":"GrooveTechnology"}]},{"id":22,"username":"trungnqit2012","email":"trung.nguyen@groovetechnology.com","fullname":"Trung Nguyen","country":"","is_active":false,"year_of_birth":null,"gender":"","date_joined":"2020-11-03","level_of_education":"","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+EVT-101+2020-101","display_name":"EVCargoTech 101","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVTl-SE-01+2020-SE01","display_name":"EVCargoTech-Software Engineer-Training Course","org":"GrooveTechnology"}]},{"id":58,"username":"ldtri0209","email":"tri.leduc@groovetechnology.com","fullname":"Tri Le","country":"","is_active":true,"year_of_birth":null,"gender":"","date_joined":"2021-03-22","level_of_education":"","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","display_name":"Hướng dẫn quyết toán thuế 2020","org":"GrooveTechnology"}]},{"id":26,"username":"ThuyNguyen","email":"thuy.nguyenlm@groovetechnology.com","fullname":"Thuy Nguyen","country":"","is_active":true,"year_of_birth":null,"gender":"","date_joined":"2021-01-07","level_of_education":"","language_proficiencies":[],"courses":[]},{"id":4,"username":"thuantest","email":"yh2ts3curity@gmail.com","fullname":"Thuan Test","country":"","is_active":true,"year_of_birth":null,"gender":"","date_joined":"2020-10-05","level_of_education":"","language_proficiencies":[],"courses":[]},{"id":9,"username":"thuantest01","email":"thuan.ha@amblique.com","fullname":"Thuan Test","country":"","is_active":false,"year_of_birth":null,"gender":"","date_joined":"2020-10-08","level_of_education":"","language_proficiencies":[],"courses":[]},{"id":10,"username":"thuanoutlook","email":"outlook_82AD6F0558F3397A@outlook.com","fullname":"Thuan Outlook","country":"","is_active":false,"year_of_birth":null,"gender":"","date_joined":"2020-10-08","level_of_education":"","language_proficiencies":[],"courses":[]},{"id":3,"username":"ThuanHa","email":"thuan.ha@groovetechnology.com","fullname":"Thuan Ha","country":"","is_active":true,"year_of_birth":1990,"gender":"m","date_joined":"2020-10-05","level_of_education":"","language_proficiencies":[],"courses":[]},{"id":13,"username":"thuangmail1","email":"hdtteam.leader@gmail.com","fullname":"Thuan - Gmail1","country":"","is_active":true,"year_of_birth":1990,"gender":"","date_joined":"2020-10-15","level_of_education":"","language_proficiencies":[],"courses":[]},{"id":59,"username":"ThinNguyen","email":"thin.nguyen@groovetechnology.com","fullname":"Thin Nguyen","country":"","is_active":true,"year_of_birth":null,"gender":"","date_joined":"2021-03-27","level_of_education":"","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","display_name":"Hướng dẫn quyết toán thuế 2020","org":"GrooveTechnology"}]},{"id":53,"username":"ngotanloc1007","email":"ngotanloc1007@gmail.com","fullname":"Tấn Lộc Ngô","country":"","is_active":false,"year_of_birth":1992,"gender":"m","date_joined":"2021-03-19","level_of_education":"b","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","display_name":"Hướng dẫn quyết toán thuế 2020","org":"GrooveTechnology"}]},{"id":35,"username":"soraho2612","email":"soraho2612@gmail.com","fullname":"Sora HỒ","country":"","is_active":false,"year_of_birth":null,"gender":"","date_joined":"2021-03-11","level_of_education":"","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","display_name":"Hướng dẫn quyết toán thuế 2020","org":"GrooveTechnology"}]},{"id":14,"username":"nhuquynh_hodiep","email":"nhuquynh.hodiep@gmail.com","fullname":"Quỳnh Hồ Diệp Như","country":"","is_active":true,"year_of_birth":1995,"gender":"","date_joined":"2020-10-15","level_of_education":"","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","display_name":"Hướng dẫn quyết toán thuế 2020","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+DemoGrooveedX+2021-Feb","display_name":"Demonstration Course","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+DemoX+Demo_Course","display_name":"Demonstration Course","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVT-101+2021-101","display_name":"EVCargoTech 101","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVTI-TE-01+2020-TE01","display_name":"EVCargoTech-Test Engineer-Training Course","org":"GrooveTechnology"}]},{"id":6,"username":"QuynhHo","email":"quynh.ho@evcargotech.com","fullname":"Quynh Ho","country":"","is_active":false,"year_of_birth":null,"gender":"","date_joined":"2020-10-08","level_of_education":"","language_proficiencies":[],"courses":[]},{"id":7,"username":"Quynh_Ho","email":"quynh.ho@groovetechnology.com","fullname":"Quynh Ho","country":"VN","is_active":true,"year_of_birth":1995,"gender":"f","date_joined":"2020-10-08","level_of_education":"b","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+2020-HR-PIT.01+2020-12-08","display_name":"PIT 8 Dec","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","display_name":"Hướng dẫn quyết toán thuế 2020","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+2020-HR-PITSI.01+2020-11-20","display_name":"PIT & SI","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+DemoGrooveedX+2021-Feb","display_name":"Demonstration Course","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+DemoX+Demo_Course","display_name":"Demonstration Course","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVT-101+2020-101","display_name":"EVCargoTech 101","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVTI-PL-01+2020-PL01","display_name":"EVCargoTech-Packing List Training Course","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVTI-TE-01+2020-TE01","display_name":"EVCargoTech-Test Engineer-Training Course","org":"GrooveTechnology"}]},{"id":33,"username":"quynh","email":"quynh@gmail.com","fullname":"quynh","country":"","is_active":true,"year_of_birth":null,"gender":"","date_joined":"2021-03-09","level_of_education":"","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+DemoGrooveedX+2021-Feb","display_name":"Demonstration Course","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+DemoX+Demo_Course","display_name":"Demonstration Course","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVT-101+2021-101","display_name":"EVCargoTech 101","org":"GrooveTechnology"}]},{"id":11,"username":"phuongnguyenthu","email":"thuphuong.nguyen@gmail.com","fullname":"Phuong Nguyen Thu","country":"","is_active":false,"year_of_birth":null,"gender":"","date_joined":"2020-10-08","level_of_education":"","language_proficiencies":[],"courses":[]},{"id":8,"username":"phuongnguyen","email":"phuong.nguyen@groovetechnology.com","fullname":"Phuong Nguyen","country":"","is_active":true,"year_of_birth":1983,"gender":"f","date_joined":"2020-10-08","level_of_education":"b","language_proficiencies":[],"courses":[{"id":"course-v1:GrooveTechnology+2020-HR-PIT.01+2020-12-08","display_name":"PIT 8 Dec","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","display_name":"Hướng dẫn quyết toán thuế 2020","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+2020-HR-PITSI.01+2020-11-20","display_name":"PIT & SI","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+DemoGrooveedX+2021-Feb","display_name":"Demonstration Course","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+DemoX+Demo_Course","display_name":"Demonstration Course","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVT-101+2021-101","display_name":"EVCargoTech 101","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVTI-TE-01+2020-TE01","display_name":"EVCargoTech-Test Engineer-Training Course","org":"GrooveTechnology"},{"id":"course-v1:GrooveTechnology+EVTl-SE-01+2021-SE01","display_name":"EVCargoTech-Software Engineer-Training Course","org":"GrooveTechnology"}]}]};
    // this.setState({
    //   usersList: json['results'],
    //   count: json['count'],
    //   pages: Math.ceil(json['count'] / this.state.perPage),
    //   currentPage: page,
    // }) //MOCKDATA
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
        <tr key={user['id']} className={styles['user-list-item']}>
          <td className={styles['user-fullname']}>
            <div className={styles['in-cell-label-value']}>
              {/* <div className={styles['mobile-label']}>
                Full name:
              </div> */}
              <div className={styles['mobile-value']}>
                <Link
                  className={styles['user-fullname-link']}
                  to={'/figures/user/' + user['id']}
                >
                  {user['fullname']}
                </Link>
              </div>
            </div>
          </td>
          <td className={styles['username']}>
            <div className={styles['in-cell-label-value']}>
              {/* <div className={styles['mobile-label']}>
                Username:
              </div> */}
              <div className={styles['mobile-value']}>
                {user['username']}
              </div>
            </div>
          </td>
          <td className={styles['is-active']}>
            <div className={styles['in-cell-label-value']}>
              {/* <div className={styles['mobile-label']}>
                Is activated:
              </div> */}
              <div className={styles['mobile-value']}>
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
          <td className={styles['date-joined']}>
            <div className={styles['in-cell-label-value']}>
              {/* <div className={styles['mobile-label']}>
                Date joined:
              </div> */}
              <div className={styles['mobile-value']}>
                {user['date_joined']}
              </div>
            </div>
          </td>
          <td className={styles['number-of-courses']}>
            <div className={styles['in-cell-label-value']}>
              {/* <div className={styles['mobile-label']}>
                No. of courses:
              </div> */}
              <div className={styles['mobile-value']}>
                {user['courses'].length}
              </div>
            </div>
          </td>
          <td className={styles['action-container']}>
            <Link
              className={styles['user-action']}
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
        <div className={cx({ 'container': true, 'users-content': true})}>
          <div className={styles['page-header']}>
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
          <table className={styles['users-list']}>
            <thead>
              <tr key='list-header' className={cx(styles['user-list-item'], styles['list-header'])}>
                <th className={styles['user-fullname']}>
                  <button
                    className={styles['sorting-header-button']}
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
                <th className={styles['username']}>
                  <button
                    className={styles['sorting-header-button']}
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
                <th className={styles['is-active']}>
                  <button
                    className={styles['sorting-header-button']}
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
                <th className={styles['date-joined']}>
                  <button
                    className={styles['sorting-header-button']}
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
                <th className={styles['number-of-courses']}>
                  Courses enroled in
                </th>
                <th className={styles['action-container']}>

                </th>
              </tr>
            </thead>
            <tbody>{listItems}</tbody>
          </table>
          {this.state.pages ? (
            <div className={styles['page-footer']}>
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
