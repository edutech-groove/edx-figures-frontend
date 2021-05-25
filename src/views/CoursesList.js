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
      var metrics_enrollment_count = 'N/A';
      var metrics_num_learners_completed = 'N/A';
      if (course.hasOwnProperty('metrics') && course['metrics'] ) {
        if (course['metrics'].hasOwnProperty('enrollment_count')) {
          metrics_enrollment_count = course['metrics']['enrollment_count'];
        }
        if (course['metrics'].hasOwnProperty('num_learners_completed')) {
          metrics_num_learners_completed = course['metrics']['num_learners_completed'];
        }
      }
      
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
                {metrics_enrollment_count}
              </div>
            </div>
          </td>
          <td className='completions'>
            <div className='in-cell-label-value'>
              {/* <div className='mobile-label'>
                Completions:
              </div> */}
              <div className='mobile-value'>
                {metrics_num_learners_completed}
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
