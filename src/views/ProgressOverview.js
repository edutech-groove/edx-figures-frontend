import React, { Component } from 'react';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import apiConfig from 'base/apiConfig';
import { trackPromise } from 'react-promise-tracker';
import HeaderAreaLayout from 'base/components/layout/HeaderAreaLayout';
import HeaderContentStatic from 'base/components/header-views/header-content-static/HeaderContentStatic';
import Paginator from 'base/components/layout/Paginator';
import ListSearch from 'base/components/inputs/ListSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faInfoCircle, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ExportToCsv } from 'export-to-csv';
import learnersProgressOverviewArrow from 'base/images/learners-progress-overview-arrow.svg';
import ReactTooltip from 'react-tooltip';
import Select, { components } from 'react-select';

class ProgressOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      learnersList: [],
      selectedCourses: [],
      coursesFilterOptions: [],
      allCourses: [],
      perPage: 20,
      count: 0,
      pages: 0,
      currentPage: 1,
      searchQuery: '',
      ordering: 'profile__name',
      selectedCourseIds: '',
      csvExportProgress: 0,
      wideView: false,
    };
    this.fetchFullViewData = this.fetchFullViewData.bind(this);
    this.getUsersForCsv = this.getUsersForCsv.bind(this);
  }
  selectRef = null;

  constructApiUrl = (rootUrl, searchQuery, selectedCourseIds, orderingType, perPageLimit, resultsOffset) => {
    let requestUrl = rootUrl;
    // add search term
    requestUrl += '?search=' + searchQuery;
    // optionally add course filtering
    if (selectedCourseIds) {
      requestUrl += '&course=' + selectedCourseIds;
    }
    // add ordering
    requestUrl += '&ordering=' + orderingType;
    // add results per page limit
    requestUrl += '&limit=' + perPageLimit;
    // add results offset
    requestUrl += '&offset=' + resultsOffset;
    // return
    return requestUrl;
  }

  getCourses = () => {
    const requestUrl = apiConfig.coursesIndex + '?limit=1000';
    trackPromise(
      fetch((requestUrl), { credentials: "same-origin" })
        .then(response => response.json())
        .then(json => {
          this.setState({
            allCourses: json['results'],
          });
          this.setCoursesIndex(json['results']);
        })
    )
  }

  setCoursesIndex = (courses = null) => {
    const selectedCourses = this.state.selectedCourses;
    const allCourse = courses ? courses : this.state.allCourses;
    const coursesFilterOptions = [];
    
    allCourse.forEach(course => {
      if (!selectedCourses.some(c => c.id === course.id)) {
        const entry = {
          id: course.id,
          name: course.name,
          number: course.number
        }
        coursesFilterOptions.push(entry);
      }
    })
    this.setState({
      coursesFilterOptions: coursesFilterOptions,
    })
  }

  getUsers = (page = 1) => {
    const offset = (page-1) * this.state.perPage;
    const requestUrl = this.constructApiUrl(apiConfig.learnerMetrics, this.state.searchQuery, this.state.selectedCourseIds, this.state.ordering, this.state.perPage, offset);
    trackPromise(
      fetch((requestUrl), { credentials: "same-origin" })
        .then(response => response.json())
        .then(json => this.setState({
          learnersList: json['results'],
          count: json['count'],
          pages: Math.ceil(json['count'] / this.state.perPage),
          currentPage: page,
        })
      )
    )
  }

  setPerPage = (newValue) => {
    this.setState({
      perPage: newValue,
    }, () => {
      (this.state.selectedCourses.length || this.state.searchQuery) && this.getUsers();
    })
  }

  setSearchQuery = (newValue) => {
    this.setState({
      searchQuery: newValue
    }, () => {
      (this.state.selectedCourses.length || this.state.searchQuery) && this.getUsers();
    })
  }

  setOrdering = (newValue) => {
    this.setState({
      ordering: newValue
    }, () => {
      (this.state.selectedCourses.length || this.state.searchQuery) && this.getUsers();
    })
  }

  onRemoveSelectedCourse = (id) => {
    const selectedCourses = this.state.selectedCourses;
    const index = selectedCourses.findIndex(c => c.id === id);
    if (index > -1) {
      selectedCourses.splice(index, 1);
      this.onChangeSelectedCourse(selectedCourses);
    }
  }

  onSelectCourses = (selected) => {
    if (selected) {
      const selectedCourses = this.state.selectedCourses;
      if (!selectedCourses.some(c => c.id === selected.id)) {
        selectedCourses.push(selected);
        this.onChangeSelectedCourse(selectedCourses);
      }
      setTimeout(() => {
        this.selectRef.select.clearValue();
      });
    }
  }

  onChangeSelectedCourse = (selectedCourses) => {
    const selectedIdsList = selectedCourses.map((course, index) => {
      return course.id;
    });
    const selectedCourseIds = selectedIdsList.join('&course=');
    this.setState({
      selectedCourses: selectedCourses,
      selectedCourseIds: selectedCourseIds,
    }, () => {
      (this.state.selectedCourses.length || this.state.searchQuery) && this.getUsers();
    });

    this.setCoursesIndex();
  }

  startCsvExport = () => {
    this.setState({
      csvExportProgress: 0.01,
    }, async () => {
      const allData = await this.fetchFullViewData();
      this.exportViewToCsv(allData);
    })
  }

  async fetchFullViewData(page = 1) {
    const results = await this.getUsersForCsv(page);
    this.setState({
      csvExportProgress: (100 * (page - 1) / this.state.count) + 0.01,
    })
    console.log("Retreiving data from API for page : " + page);
    if (results.length > 0) {
      return results.concat(await this.fetchFullViewData(page+1));
    } else {
      return results;
    }
  }

  async getUsersForCsv(page = 1) {
    const offset = (page-1) * 100;
    const requestUrl = this.constructApiUrl(apiConfig.learnerMetrics, this.state.searchQuery, this.state.selectedCourseIds, this.state.ordering, 100, offset);
    var apiResults = await fetch((requestUrl), { credentials: "same-origin" })
      .then(response => response.json())
      .then(json => {return json['results']})
    return apiResults;
  }

  exportViewToCsv = (data) => {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Learners progress overview',
      filename: 'CSV Export',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);
    const schemaData = this.convertJsonToCsvSchema(data);
    csvExporter.generateCsv(schemaData);
  }

  convertJsonToCsvSchema = (jsonData) => {
    const csvTestVar = jsonData.map((user, index) => {
      const singleRecord = {};
      singleRecord['name'] = user['fullname'];
      singleRecord['email'] = user['email'];
      singleRecord['username'] = user['username'];
      singleRecord['date_joined'] = user['date_joined'];

      const coursesFilter = this.state.selectedCourses.length ? this.state.selectedCourses : this.state.coursesFilterOptions;
      const userCoursesImmutable = Immutable.fromJS(user['enrollments']);
      coursesFilter.forEach((course, i) => {
        const userProgress = userCoursesImmutable.find(singleCourse => singleCourse.get('course_id') === course.id);
        if (userProgress) {

          const progressPercent = (userProgress.getIn(['progress_percent'])) ? userProgress.getIn(['progress_percent']).toFixed(2) : '-';
          const sectionsWorked = (userProgress.getIn(['progress_details', 'sections_worked'])) ? userProgress.getIn(['progress_details', 'sections_worked']).toFixed(1) : '-';
          const sectionsPossible = (userProgress.getIn(['progress_details', 'sections_possible'])) ? userProgress.getIn(['progress_details', 'sections_possible']).toFixed(1) : '-';
          const pointsEarned = (userProgress.getIn(['progress_details', 'points_earned'])) ? userProgress.getIn(['progress_details', 'points_earned']).toFixed(1) : '-';
          const pointsPossible = (userProgress.getIn(['progress_details', 'points_possible'])) ? userProgress.getIn(['progress_details', 'points_possible']).toFixed(1) : '-';

          singleRecord[course.id] = `Progress: ${progressPercent}/1 | Sections: ${sectionsWorked}/${sectionsPossible} | Points: ${pointsEarned}/${pointsPossible}`;
        } else {
          singleRecord[course.id] = '-';
        };
      })
      return singleRecord;
    })
    return csvTestVar;
  }

  toggleWideView = () => {
    this.setState({
      wideView: !this.state.wideView
    })
  }

  componentDidMount() {
    this.getCourses();
  }

  render() {
    const listChips = this.state.selectedCourses.map((course) => {
      return (
        <div key={`chip-${course.id}`} className='chip'>
          <div className='chip-container'>
            <div className='course-label'>{`${course.name} | ${course.number} | ${course.id}`}</div>
            <button className="dismiss-btn" onClick={() => this.onRemoveSelectedCourse(course.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16">
                <path fill="#999" d="M11.375,3.375a8,8,0,1,0,8,8A8,8,0,0,0,11.375,3.375Zm2.027,10.9-2.027-2.027L9.348,14.271a.615.615,0,1,1-.869-.869l2.027-2.027L8.479,9.348a.615.615,0,0,1,.869-.869l2.027,2.027L13.4,8.479a.615.615,0,0,1,.869.869l-2.027,2.027L14.271,13.4a.618.618,0,0,1,0,.869A.611.611,0,0,1,13.4,14.271Z" transform="translate(-3.375 -3.375)"/>
              </svg>
            </button>
          </div>
        </div>
      )
    })

    const formatOptionLabel = ({ id, name, number }) => (
      <div className='custom-label'>
        <div className='number'>{number}</div>
        <div className='name'>{name}</div>
        <div className='id'>{id}</div>
      </div>
    );

    const coursesFilter = this.state.selectedCourses.length ? this.state.selectedCourses : this.state.coursesFilterOptions;

    const headerCourseColumns = coursesFilter.map((course, index) => {
      return(
        <th key={`header-${index}`} className='course-info-column-header' colSpan="3">
          <div>
            <span>
              {course['name']}
            </span>
            <span data-tip data-for={`course-${index}`} className='course-id'>
              <FontAwesomeIcon icon={faInfoCircle} />
            </span>
          </div>
          <ReactTooltip id={`course-${index}`} type="light" effect='solid'>
            <span>{course['id']}</span>
          </ReactTooltip>
        </th>
      )
    })

    const listItems = this.state.learnersList.map((user, index) => {

      const userCoursesImmutable = Immutable.fromJS(user['enrollments']);
      const userCoursesRender = coursesFilter.map((course, i) => {
        const userProgress = userCoursesImmutable.find(singleCourse => singleCourse.get('course_id') === course.id);
        return (
            userProgress ? [
              <td key={`course-section-${i}`} className='data-group'>
                <span className='data-label'>Sections</span>
                <span className='data'>{userProgress.getIn(['progress_details', 'sections_worked']) ? userProgress.getIn(['progress_details', 'sections_worked']).toFixed(1) : '-'}/{userProgress.getIn(['progress_details', 'sections_possible']) ? userProgress.getIn(['progress_details', 'sections_possible']).toFixed(1) : '-'}</span>
              </td>,
              <td key={`course-points-${i}`} className='data-group'>
                <span className='data-label'>Points</span>
                <span className='data'>{userProgress.getIn(['progress_details', 'points_earned']) ? userProgress.getIn(['progress_details', 'points_earned']).toFixed(1) : '-'}/{userProgress.getIn(['progress_details', 'points_possible']) ? userProgress.getIn(['progress_details', 'points_possible']).toFixed(1) : '-'}</span>
              </td>,
              <td key={`course-progress-${i}`} className='data-group'>
                <span className='data-label'>Progress</span>
                <span className='data'>{(userProgress.getIn(['progress_percent'])*100).toFixed(0)}%</span>
              </td>
            ] : (
              <td colSpan="3" key={`course-${i}`} className='no-data'>-</td>
            )
        )
      })

      return (
        <tr key={`user-${index}`} className='user-list-item'>
          <td className='user-fullname'>
            <Link
              className='user-fullname-link'
              to={'/figures/user/' + user['id']}
            >
              <span className='user-info-value'>
                {user['fullname']}
              </span>
            </Link>
          </td>
          <td className='username'>
            <span className='user-info-value'>
              {user['username']}
            </span>
          </td>
          <td className='email'>
            <span className='user-info-value'>
              {user['email']}
            </span>
          </td>
          {userCoursesRender}
        </tr>
      )
    })

    return (
      <div className="ef--layout-root">
        <HeaderAreaLayout>
          <HeaderContentStatic
            title='Learners progress overview'
          >
            <React.Fragment>
              This view allows you to view a snapshot of your sites learners progress. Total number of results in current view is <span>{this.state.count}</span><br />You can also filter down the results in the view, then export the data in the view as a CSV file on-the-fly.
            </React.Fragment>
          </HeaderContentStatic>
        </HeaderAreaLayout>
        {this.state.csvExportProgress ? (
          <div className='container csv-export-content'>
            {(this.state.csvExportProgress < 1) ? [
              <h2>Exporting your CSV data...</h2>,
              <p>Please don't close this browser tab.</p>
            ] : [
              <h2>Export successful!</h2>,
              <p>Depending on your browser settings, you will either be prompted with a prompt to save the generated file, or the file will be automatically downloaded into your default Downloads folder.</p>,
              <p>It is now safe to close the exporter.</p>,
            ]}
            <div className='progress-bar'>
              <div>
                <div className='progress-bar-inner' style={{ width: this.state.csvExportProgress * 100 + '%'}}></div>
              </div>
            </div>
            {(this.state.csvExportProgress < 1) ? (
              <span className='percentage'>
                {(this.state.csvExportProgress * 100).toFixed(0)}%
              </span>
            ) : (
              <button
                className='close-csv-button'
                onClick = {() => this.setState({ csvExportProgress: 0 })}
              >
                Close the exporter
              </button>
            )}
          </div>
        ) : (
          <div className={(this.state.wideView ? 'container-max ' : 'container ') + 'users-content'}>
            <div className='refining-container'>
              <div className='refining-container__filters'>
                <ListSearch
                  valueChangeFunction={this.setSearchQuery}
                  inputPlaceholder='Search by users name, username or email...'
                />
                <div className='multiselect-container'>
                  <Select className='react-select-container' classNamePrefix="react-select"
                    ref={ref => {
                      this.selectRef = ref;
                    }}
                    options={this.state.coursesFilterOptions}
                    formatOptionLabel={formatOptionLabel}
                    onChange = {this.onSelectCourses}
                    placeholder="Filter by course..."
                    components={{
                      IndicatorSeparator: () => null,
                      DropdownIndicator: (props) => {
                        return (<components.DropdownIndicator {...props}>
                          <FontAwesomeIcon icon={faFilter}/>
                        </components.DropdownIndicator>);
                      }
                    }}
                  />

                  {
                    this.state.selectedCourses.length ?
                    <div className='chips'>
                      {listChips}
                    </div>
                    : ''
                  }
                </div>
              </div>
            </div>
            {(this.state.selectedCourses.length || this.state.searchQuery) && this.state.pages ? (
              <div className='view-controls-container'>
                <button
                  className='export-the-csv-button'
                  onClick = {() => this.startCsvExport()}
                >
                  Generate a CSV from Current View
                </button>
                <div>
                  <div className='toggle-wide-view-button'>
                    <label className='toggle-label' htmlFor="toggle-wide-view-button">{this.state.wideView ? 'On wide view' : 'Off wide view'}</label>
                    <input type="checkbox" id="toggle-wide-view-button" name="toggle" checked={this.state.wideView} onChange = {() => this.toggleWideView()}/>
                    <label htmlFor="toggle-wide-view-button"></label>
                  </div>
                  <Paginator
                    pageSwitchFunction={this.getUsers}
                    currentPage={this.state.currentPage}
                    perPage={this.state.perPage}
                    pages={this.state.pages}
                    changePerPageFunction={this.setPerPage}
                  />
                </div>
              </div>
            ) : ''}
            {(this.state.selectedCourses.length || this.state.searchQuery) ? (
              <div className='users-overview-list-wrapper'>
                <table className='users-overview-list'>
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
                      <th className='email'>
                        <button
                          className='sorting-header-button'
                          onClick={() => (this.state.ordering !== 'email') ? this.setOrdering('email') : this.setOrdering('-email')}
                        >
                          <span>
                            Email
                          </span>
                          {(this.state.ordering === 'email') ? (
                            <FontAwesomeIcon icon={faCaretUp} />
                          ) : (this.state.ordering === '-email') ? (
                            <FontAwesomeIcon icon={faCaretDown} />
                          ) : ''}
                        </button>
                      </th>
                      {headerCourseColumns}
                    </tr>
                    </thead>
                    <tbody>
                      {listItems}
                    </tbody>
                </table>
              </div>
            ) : (
              <div className='no-data-message'>
                <img src={learnersProgressOverviewArrow} alt="Gender" />
                Enter a search term and/or select course(s) to <br/> display the data.
              </div>
            )}
            {(this.state.selectedCourses.length || this.state.searchQuery) && this.state.pages ? (
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
        )}
      </div>
    );
  }
}

export default ProgressOverview