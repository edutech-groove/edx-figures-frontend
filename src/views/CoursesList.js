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

const parseCourseDate = (fetchedDate) => {
  if (fetchedDate === null) {
    return "-";
  } else if (Date.parse(fetchedDate)) {
    const tempDate = new Date(fetchedDate);
    return tempDate.toUTCString();
  } else {
    return fetchedDate;
  }
}


class CoursesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coursesList: [],
      perPage: 20,
      count: 0,
      pages: 0,
      currentPage: 1,
      searchQuery: '',
      ordering: 'display_name',
    };

    this.getCourses = this.getCourses.bind(this);
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

  getCourses(page = 1) {
    const offset = (page-1) * this.state.perPage;
    const requestUrl = this.constructApiUrl(apiConfig.coursesGeneral, this.state.searchQuery, this.state.ordering, this.state.perPage, offset);
    trackPromise(
      fetch((requestUrl), { credentials: "same-origin" })
        .then(response => response.json())
        .then(json => this.setState({
          coursesList: json['results'],
          count: json['count'],
          pages: Math.ceil(json['count'] / this.state.perPage),
          currentPage: page,
        })
      )
    )

    // const json = {"count":11,"next":null,"previous":null,"results":[{"course_id":"course-v1:GrooveTechnology+DemoX+Demo_Course","course_name":"Demonstration Course","course_code":"000123","org":"GrooveTechnology","start_date":"2020-01-01T00:00:00Z","end_date":"2021-01-01T12:00:00Z","self_paced":false,"staff":[{"user_id":5,"username":"groove","fullname":"","role":"instructor"},{"user_id":5,"username":"groove","fullname":"","role":"staff"},{"user_id":7,"username":"Quynh_Ho","fullname":"Quynh Ho","role":"instructor"}],"metrics":{"id":557,"average_progress":"0.26","created":"2021-03-08T07:00:01.361216Z","modified":"2021-03-08T07:00:01.361482Z","date_for":"2021-03-07","course_id":"course-v1:GrooveTechnology+DemoX+Demo_Course","enrollment_count":3,"active_learners_today":1,"average_days_to_complete":0,"num_learners_completed":1,"site":1}},{"course_id":"course-v1:GrooveTechnology+DemoGrooveedX+2021-Feb","course_name":"Demonstration Course","course_code":"DemoGrooveedX","org":"GrooveTechnology","start_date":"2021-01-01T00:00:00Z","end_date":"2025-10-31T12:00:00Z","self_paced":false,"staff":[{"user_id":27,"username":"nancy","fullname":"","role":"instructor"},{"user_id":27,"username":"nancy","fullname":"","role":"staff"}],"metrics":{"id":853,"average_progress":"0.04","created":"2021-04-07T06:00:01.025890Z","modified":"2021-04-07T06:00:01.026166Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+DemoGrooveedX+2021-Feb","enrollment_count":5,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":2,"site":1}},{"course_id":"course-v1:GrooveTechnology+EVT-101+2020-101","course_name":"EVCargoTech 101","course_code":"EVT-101","org":"GrooveTechnology","start_date":"2020-01-01T00:00:00Z","end_date":"2021-01-01T00:00:00Z","self_paced":false,"staff":[{"user_id":5,"username":"groove","fullname":"","role":"instructor"}],"metrics":{"id":854,"average_progress":"0.38","created":"2021-04-07T06:00:01.253270Z","modified":"2021-04-07T06:00:01.253529Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+EVT-101+2020-101","enrollment_count":5,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:GrooveTechnology+EVT-101+2021-101","course_name":"EVCargoTech 101","course_code":"EVT-101","org":"GrooveTechnology","start_date":"2020-09-25T00:00:00Z","end_date":"2025-10-31T00:00:00Z","self_paced":false,"staff":[{"user_id":5,"username":"groove","fullname":"","role":"instructor"},{"user_id":5,"username":"groove","fullname":"","role":"staff"}],"metrics":{"id":855,"average_progress":"0.00","created":"2021-04-07T06:00:01.310029Z","modified":"2021-04-07T06:00:01.310283Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+EVT-101+2021-101","enrollment_count":4,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:GrooveTechnology+EVTI-PL-01+2020-PL01","course_name":"EVCargoTech-Packing List Training Course","course_code":"EVTI-PL-01","org":"GrooveTechnology","start_date":"2020-01-12T00:00:00Z","end_date":"2022-01-12T00:00:00Z","self_paced":true,"staff":[{"user_id":7,"username":"Quynh_Ho","fullname":"Quynh Ho","role":"instructor"},{"user_id":7,"username":"Quynh_Ho","fullname":"Quynh Ho","role":"staff"}],"metrics":{"id":856,"average_progress":"0.00","created":"2021-04-07T06:00:01.338899Z","modified":"2021-04-07T06:00:01.339178Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+EVTI-PL-01+2020-PL01","enrollment_count":0,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:GrooveTechnology+EVTl-SE-01+2020-SE01","course_name":"EVCargoTech-Software Engineer-Training Course","course_code":"EVTl-SE-01","org":"GrooveTechnology","start_date":"2020-01-01T00:00:00Z","end_date":"2021-01-01T00:00:00Z","self_paced":true,"staff":[{"user_id":5,"username":"groove","fullname":"","role":"instructor"},{"user_id":5,"username":"groove","fullname":"","role":"staff"}],"metrics":{"id":858,"average_progress":"0.00","created":"2021-04-07T06:00:01.450650Z","modified":"2021-04-07T06:00:01.450994Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+EVTl-SE-01+2020-SE01","enrollment_count":5,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:GrooveTechnology+EVTl-SE-01+2021-SE01","course_name":"EVCargoTech-Software Engineer-Training Course","course_code":"EVTl-SE-01","org":"GrooveTechnology","start_date":"2020-09-15T00:00:00Z","end_date":"2025-10-31T00:00:00Z","self_paced":true,"staff":[{"user_id":5,"username":"groove","fullname":"","role":"instructor"},{"user_id":5,"username":"groove","fullname":"","role":"staff"}],"metrics":{"id":859,"average_progress":"0.00","created":"2021-04-07T06:00:01.483507Z","modified":"2021-04-07T06:00:01.483774Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+EVTl-SE-01+2021-SE01","enrollment_count":1,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:GrooveTechnology+EVTI-TE-01+2020-TE01","course_name":"EVCargoTech-Test Engineer-Training Course","course_code":"EVTI-TE-01","org":"GrooveTechnology","start_date":"2020-09-23T00:00:00Z","end_date":"2025-10-31T00:00:00Z","self_paced":true,"staff":[{"user_id":5,"username":"groove","fullname":"","role":"instructor"},{"user_id":5,"username":"groove","fullname":"","role":"staff"}],"metrics":{"id":857,"average_progress":"0.00","created":"2021-04-07T06:00:01.397504Z","modified":"2021-04-07T06:00:01.397769Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+EVTI-TE-01+2020-TE01","enrollment_count":2,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","course_name":"Hướng dẫn quyết toán thuế 2020","course_code":"2020-HR-PITFinal","org":"GrooveTechnology","start_date":"2021-02-01T00:00:00Z","end_date":null,"self_paced":true,"staff":[{"user_id":29,"username":"Mai-Duong","fullname":"Duong Thi Ngoc Mai","role":"instructor"},{"user_id":29,"username":"Mai-Duong","fullname":"Duong Thi Ngoc Mai","role":"staff"}],"metrics":{"id":851,"average_progress":"0.00","created":"2021-04-07T06:00:00.923526Z","modified":"2021-04-07T06:00:00.923781Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+2020-HR-PITFinal+2021-Mar-31","enrollment_count":34,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:GrooveTechnology+2020-HR-PITSI.01+2020-11-20","course_name":"PIT & SI","course_code":"2020-HR-PITSI.01","org":"GrooveTechnology","start_date":"2021-01-01T00:00:00Z","end_date":null,"self_paced":true,"staff":[{"user_id":7,"username":"Quynh_Ho","fullname":"Quynh Ho","role":"instructor"},{"user_id":7,"username":"Quynh_Ho","fullname":"Quynh Ho","role":"staff"}],"metrics":{"id":852,"average_progress":"0.00","created":"2021-04-07T06:00:00.963168Z","modified":"2021-04-07T06:00:00.963438Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+2020-HR-PITSI.01+2020-11-20","enrollment_count":2,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:GrooveTechnology+2020-HR-PIT.01+2020-12-08","course_name":"PIT 8 Dec","course_code":"2020-HR-PIT.01","org":"GrooveTechnology","start_date":"2021-01-01T00:00:00Z","end_date":null,"self_paced":true,"staff":[{"user_id":7,"username":"Quynh_Ho","fullname":"Quynh Ho","role":"instructor"},{"user_id":7,"username":"Quynh_Ho","fullname":"Quynh Ho","role":"staff"}],"metrics":{"id":850,"average_progress":"0.00","created":"2021-04-07T06:00:00.132081Z","modified":"2021-04-07T06:00:00.132349Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+2020-HR-PIT.01+2020-12-08","enrollment_count":1,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}}]};
    // this.setState({
    //   coursesList: json['results'],
    //   count: json['count'],
    //   pages: Math.ceil(json['count'] / this.state.perPage),
    //   currentPage: page,
    // }) //MOCKDATA
  }

  setCurrentPage(newValue) {
    this.setState({
      currentPage: newValue,
    })
  }

  setPerPage(newValue) {
    this.setState({
      perPage: newValue
    }, () => {
      this.getCourses();
    })
  }

  setSearchQuery(newValue) {
    this.setState({
      searchQuery: newValue
    }, () => {
      this.getCourses();
    })
  }

  setOrdering(newValue) {
    this.setState({
      ordering: newValue
    }, () => {
      this.getCourses();
    })
  }

  componentDidMount() {
    this.getCourses();
  }

  render() {

    const listItems = this.state.coursesList.map((course, index) => {
      return (
        <tr key={`course-${index}`} className='course-list-item'>
          <td className='course-name'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                Course name:
              </div> */}
              <div className='mobile-value'>
                <Link
                  className='course-name-link'
                  to={'/figures/course/' + course['course_id']}
                >
                  {course['course_name']}
                </Link>
              </div>
            </div>
          </td>
          <td className='course-id'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                Course ID:
              </div> */}
              <div className='mobile-value'>
                {course['course_id']}
              </div>
            </div>
          </td>
          <td className='start-date'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                Course start:
              </div> */}
              <div className='mobile-value'>
                {parseCourseDate(course['start_date'])}
              </div>
            </div>
          </td>
          <td className='self-paced'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                Self paced:
              </div> */}
              <div className='mobile-value'>
                {course['self_paced'] ? 
                <svg xmlns="http://www.w3.org/2000/svg" width="14.235" height="10.237" viewBox="0 0 14.235 10.237">
                  <g transform="translate(0 0)">
                    <path d="M548.55,398.508l-4.9-4.729.882-.913,4,3.86,8.455-8.454.9.9Z" transform="translate(-543.653 -388.271)"/>
                  </g>
                </svg>
                : '-'}
              </div>
            </div>
          </td>
          <td className='enrolments'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                Enrolments:
              </div> */}
              <div className='mobile-value'>
                {course['metrics']['enrollment_count']}
              </div>
            </div>
          </td>
          <td className='completions'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                Completions:
              </div> */}
              <div className='mobile-value'>
                {course['metrics']['num_learners_completed']}
              </div>
            </div>
          </td>
          <td className='action-container'>
            <Link
              className='course-action'
              to={'/figures/course/' + course['course_id']}
            >
              Details
            </Link>
          </td>
        </tr>
      )
    })

    return (
      <div className="ef--layout-root">
        <HeaderAreaLayout>
          <HeaderContentStatic
            title='Courses list'
          >
            <React.Fragment>
              This view allows you to browse your sites courses. Total number of results <span>{this.state.count}</span>
            </React.Fragment>
          </HeaderContentStatic>
        </HeaderAreaLayout>
        <div className='container courses-content'>
          <div className='page-header'>
            <ListSearch
              valueChangeFunction={this.setSearchQuery}
              inputPlaceholder='Search by course name, code or ID...'
            />
            {this.state.pages ? (
              <Paginator
                pageSwitchFunction={this.getCourses}
                currentPage={this.state.currentPage}
                perPage={this.state.perPage}
                pages={this.state.pages}
                changePerPageFunction={this.setPerPage}
              />
            ) : ''}
          </div>
          <table className='courses-list'>
            <thead>
              <tr key='list-header' className='course-list-item list-header'>
                <th className='course-name'>
                  <button
                    className='sorting-header-button'
                    onClick={() => (this.state.ordering !== 'display_name') ? this.setOrdering('display_name') : this.setOrdering('-display_name')}
                  >
                    <span>
                      Course name
                    </span>
                    {(this.state.ordering === 'display_name') ? (
                      <FontAwesomeIcon icon={faCaretUp} />
                    ) : (this.state.ordering === '-display_name') ? (
                      <FontAwesomeIcon icon={faCaretDown} />
                    ) : ''}
                  </button>
                </th>
                <th className='course-id'>
                  Course ID
                </th>
                <th className='start-date'>
                  Course start
                </th>
                <th className='self-paced'>
                  <button
                    className='sorting-header-button'
                    onClick={() => (this.state.ordering !== 'self_paced') ? this.setOrdering('self_paced') : this.setOrdering('-self_paced')}
                  >
                    <span>
                      Self paced
                    </span>
                    {(this.state.ordering === 'self_paced') ? (
                      <FontAwesomeIcon icon={faCaretUp} />
                    ) : (this.state.ordering === '-self_paced') ? (
                      <FontAwesomeIcon icon={faCaretDown} />
                    ) : ''}
                  </button>
                </th>
                <th className='enrolments'>
                  Enrolments
                </th>
                <th className='completions'>
                  Completions
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
                pageSwitchFunction={this.getCourses}
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

export default CoursesList