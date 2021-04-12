import React, { Component } from 'react';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import apiConfig from 'base/apiConfig';
import { trackPromise } from 'react-promise-tracker';
import styles from './_progress-overview-content.scss';
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

import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

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

    // const json = {"count":10,"next":null,"previous":null,"results":[{"id":"course-v1:Groove+00011+2021_00011","name":"COURSE 11","org":"Groove","number":"00011"},{"id":"course-v1:Groove+00012+2021_00012","name":"COURSE 12","org":"Groove","number":"00012"},{"id":"course-v1:Groove+00014+2021_00014","name":"COURSE 14","org":"Groove","number":"00014"},{"id":"course-v1:Groove+00015+2021_00015","name":"COURSE 15","org":"Groove","number":"00015"},{"id":"course-v1:Groove+00016+2021_00016","name":"COURSE 16","org":"Groove","number":"00016"},{"id":"course-v1:Groove+00017+2021_00017","name":"COURSE 17","org":"Groove","number":"00017"},{"id":"course-v1:Groove+0008+2021_0008","name":"COURSE 08","org":"Groove","number":"0008"},{"id":"course-v1:Groove+0009+2021_0009","name":"COURSE 09","org":"Groove","number":"0009"},{"id":"course-v1:GrooveTechnology+00006+2021_00006","name":"COURSE 06","org":"GrooveTechnology","number":"00006"},{"id":"course-v1:GrooveTechnology+00007+2021_00007","name":"COURSE 15","org":"GrooveTechnology","number":"00007"}]};
    // this.setState({
    //   allCourses: json['results'],
    // });
    // this.setCoursesIndex(json['results']); //MOCKDATA
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

    // const json = {"count":33,"next":"https://openedx.groovetechnology.co/figures/api/learner-metrics/?limit=20&offset=20&ordering=profile__name&search=c","previous":null,"results":[{"id":10,"username":"admin","email":"products@groovetechnology.com","fullname":"admin","is_active":true,"date_joined":"2021-04-06T02:27:23.060097Z","enrollments":[{"id":6,"course_id":"course-v1:Groove+00014+2021_00014","date_enrolled":"2021-04-06","is_enrolled":true,"progress_percent":0.0,"progress_details":null},{"id":4,"course_id":"course-v1:Groove+0009+2021_0009","date_enrolled":"2021-04-06","is_enrolled":true,"progress_percent":0.0,"progress_details":{"sections_worked":0,"points_possible":3.0,"sections_possible":2,"points_earned":0.0}}]},{"id":10,"username":"admin","email":"products@groovetechnology.com","fullname":"admin","is_active":true,"date_joined":"2021-04-06T02:27:23.060097Z","enrollments":[{"id":6,"course_id":"course-v1:Groove+00014+2021_00014","date_enrolled":"2021-04-06","is_enrolled":true,"progress_percent":0.0,"progress_details":null},{"id":4,"course_id":"course-v1:Groove+0009+2021_0009","date_enrolled":"2021-04-06","is_enrolled":true,"progress_percent":0.0,"progress_details":{"sections_worked":0,"points_possible":3.0,"sections_possible":2,"points_earned":0.0}}]},{"id":12,"username":"cy","email":"cy@gmail.com","fullname":"cy","is_active":true,"date_joined":"2021-04-07T01:51:03Z","enrollments":[{"id":11,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":false,"progress_percent":0.0,"progress_details":null},{"id":8,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":false,"progress_percent":0.0,"progress_details":null},{"id":20,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]},{"id":12,"username":"cy","email":"cy@gmail.com","fullname":"cy","is_active":true,"date_joined":"2021-04-07T01:51:03Z","enrollments":[{"id":11,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":false,"progress_percent":0.0,"progress_details":null},{"id":8,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":false,"progress_percent":0.0,"progress_details":null},{"id":20,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]},{"id":12,"username":"cy","email":"cy@gmail.com","fullname":"cy","is_active":true,"date_joined":"2021-04-07T01:51:03Z","enrollments":[{"id":11,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":false,"progress_percent":0.0,"progress_details":null},{"id":8,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":false,"progress_percent":0.0,"progress_details":null},{"id":20,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]},{"id":22,"username":"cy10","email":"cy10@gmail.com","fullname":"cy10","is_active":true,"date_joined":"2021-04-07T02:01:34Z","enrollments":[{"id":19,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0}}]},{"id":14,"username":"cy2","email":"cy2@gmail.com","fullname":"cy2","is_active":true,"date_joined":"2021-04-07T01:52:39Z","enrollments":[{"id":21,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]},{"id":15,"username":"cy3","email":"cy3@gmail.com","fullname":"cy3","is_active":true,"date_joined":"2021-04-07T01:53:04Z","enrollments":[{"id":30,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}},{"id":22,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]},{"id":15,"username":"cy3","email":"cy3@gmail.com","fullname":"cy3","is_active":true,"date_joined":"2021-04-07T01:53:04Z","enrollments":[{"id":30,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}},{"id":22,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]},{"id":16,"username":"cy4","email":"cy4@gmail.com","fullname":"cy4","is_active":true,"date_joined":"2021-04-07T01:57:17Z","enrollments":[{"id":31,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}},{"id":23,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":1.0}}]},{"id":16,"username":"cy4","email":"cy4@gmail.com","fullname":"cy4","is_active":true,"date_joined":"2021-04-07T01:57:17Z","enrollments":[{"id":31,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}},{"id":23,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":1.0}}]},{"id":17,"username":"cy5","email":"cy5@gmail.com","fullname":"cy5","is_active":true,"date_joined":"2021-04-07T01:59:12Z","enrollments":[{"id":26,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.0,"progress_details":{"sections_worked":0,"points_possible":3.0,"sections_possible":2,"points_earned":0.0}},{"id":25,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":1.0}},{"id":24,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]},{"id":17,"username":"cy5","email":"cy5@gmail.com","fullname":"cy5","is_active":true,"date_joined":"2021-04-07T01:59:12Z","enrollments":[{"id":26,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.0,"progress_details":{"sections_worked":0,"points_possible":3.0,"sections_possible":2,"points_earned":0.0}},{"id":25,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":1.0}},{"id":24,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]},{"id":17,"username":"cy5","email":"cy5@gmail.com","fullname":"cy5","is_active":true,"date_joined":"2021-04-07T01:59:12Z","enrollments":[{"id":26,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.0,"progress_details":{"sections_worked":0,"points_possible":3.0,"sections_possible":2,"points_earned":0.0}},{"id":25,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":1.0}},{"id":24,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]},{"id":18,"username":"cy6","email":"cy6@gmail.com","fullname":"cy6","is_active":true,"date_joined":"2021-04-07T01:59:46Z","enrollments":[{"id":32,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0}},{"id":27,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}},{"id":15,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0}}]},{"id":18,"username":"cy6","email":"cy6@gmail.com","fullname":"cy6","is_active":true,"date_joined":"2021-04-07T01:59:46Z","enrollments":[{"id":32,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0}},{"id":27,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}},{"id":15,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0}}]},{"id":18,"username":"cy6","email":"cy6@gmail.com","fullname":"cy6","is_active":true,"date_joined":"2021-04-07T01:59:46Z","enrollments":[{"id":32,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0}},{"id":27,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}},{"id":15,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0}}]},{"id":19,"username":"cy7","email":"cy7@gmail.com","fullname":"cy7","is_active":true,"date_joined":"2021-04-07T02:00:16Z","enrollments":[{"id":33,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":1.0}},{"id":28,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0}},{"id":16,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]},{"id":19,"username":"cy7","email":"cy7@gmail.com","fullname":"cy7","is_active":true,"date_joined":"2021-04-07T02:00:16Z","enrollments":[{"id":33,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":1.0}},{"id":28,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0}},{"id":16,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]},{"id":19,"username":"cy7","email":"cy7@gmail.com","fullname":"cy7","is_active":true,"date_joined":"2021-04-07T02:00:16Z","enrollments":[{"id":33,"course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":0.5,"progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":1.0}},{"id":28,"course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0}},{"id":16,"course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","is_enrolled":true,"progress_percent":1.0,"progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0}}]}]};
    // this.setState({
    //   learnersList: json['results'],
    //   count: json['count'],
    //   pages: Math.ceil(json['count'] / this.state.perPage),
    //   currentPage: page,
    // }) //MOCKDATA
  }

  setPerPage = (newValue) => {
    this.setState({
      perPage: newValue,
    }, () => {
      (this.state.selectedCourses.length || this.state.searchQuery) && this.getUsers();
    })
  }

  setSearchQuery = (newValue) => {
    this.setState({
      searchQuery: newValue
    }, () => {
      (this.state.selectedCourses.length || this.state.searchQuery) && this.getUsers();
    })
  }

  setOrdering = (newValue) => {
    this.setState({
      ordering: newValue
    }, () => {
      (this.state.selectedCourses.length || this.state.searchQuery) && this.getUsers();
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
      (this.state.selectedCourses.length || this.state.searchQuery) && this.getUsers();
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

          singleRecord[course.id] = `Progress: ${progressPercent}/1 | Sections: ${sectionsWorked}/${sectionsPossible} | Points: ${pointsEarned}/${pointsPossible}`;
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
        <div key={`chip-${course.id}`} className={styles['chip']}>
          <div className={styles['chip-container']}>
            <div className={styles['course-label']}>{`${course.name} | ${course.number} | ${course.id}`}</div>
            <button className={styles["dismiss-btn"]} onClick={() => this.onRemoveSelectedCourse(course.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16">
                <path fill="#999" d="M11.375,3.375a8,8,0,1,0,8,8A8,8,0,0,0,11.375,3.375Zm2.027,10.9-2.027-2.027L9.348,14.271a.615.615,0,1,1-.869-.869l2.027-2.027L8.479,9.348a.615.615,0,0,1,.869-.869l2.027,2.027L13.4,8.479a.615.615,0,0,1,.869.869l-2.027,2.027L14.271,13.4a.618.618,0,0,1,0,.869A.611.611,0,0,1,13.4,14.271Z" transform="translate(-3.375 -3.375)"/>
              </svg>
            </button>
          </div>
        </div>
      )
    })

    const formatOptionLabel = ({ id, name, number }) => (
      <div className={styles['custom-label']}>
        <div className={styles['number']}>{number}</div>
        <div className={styles['name']}>{name}</div>
        <div className={styles['id']}>{id}</div>
      </div>
    );

    const coursesFilter = this.state.selectedCourses.length ? this.state.selectedCourses : this.state.coursesFilterOptions;

    const headerCourseColumns = coursesFilter.map((course, index) => {
      return(
        <th key={`header-${index}`} className={styles['course-info-column-header']} colSpan="3">
          <div>
            <span>
              {course['name']}
            </span>
            <span data-tip data-for={`course-${index}`} className={styles['course-id']}>
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
              <td key={`course-section-${i}`} className={styles['data-group']}>
                <span className={styles['data-label']}>Sections</span>
                <span className={styles['data']}>{userProgress.getIn(['progress_details', 'sections_worked']) ? userProgress.getIn(['progress_details', 'sections_worked']).toFixed(1) : '-'}/{userProgress.getIn(['progress_details', 'sections_possible']) ? userProgress.getIn(['progress_details', 'sections_possible']).toFixed(1) : '-'}</span>
              </td>,
              <td key={`course-points-${i}`} className={styles['data-group']}>
                <span className={styles['data-label']}>Points</span>
                <span className={styles['data']}>{userProgress.getIn(['progress_details', 'points_earned']) ? userProgress.getIn(['progress_details', 'points_earned']).toFixed(1) : '-'}/{userProgress.getIn(['progress_details', 'points_possible']) ? userProgress.getIn(['progress_details', 'points_possible']).toFixed(1) : '-'}</span>
              </td>,
              <td key={`course-progress-${i}`} className={styles['data-group']}>
                <span className={styles['data-label']}>Progress</span>
                <span className={styles['data']}>{(userProgress.getIn(['progress_percent'])*100).toFixed(0)}%</span>
              </td>
            ] : (
              <td colSpan="3" key={`course-${i}`} className={styles['no-data']}>-</td>
            )
        )
      })

      return (
        <tr key={`user-${index}`} className={styles['user-list-item']}>
          <td className={styles['user-fullname']}>
            <Link
              className={styles['user-fullname-link']}
              to={'/figures/user/' + user['id']}
            >
              <span className={styles['user-info-value']}>
                {user['fullname']}
              </span>
            </Link>
          </td>
          <td className={styles['username']}>
            <span className={styles['user-info-value']}>
              {user['username']}
            </span>
          </td>
          <td className={styles['email']}>
            <span className={styles['user-info-value']}>
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
          <div className={cx({ 'container': true, 'csv-export-content': true})}>
            {(this.state.csvExportProgress < 1) ? [
              <h2>Exporting your CSV data...</h2>,
              <p>Please don't close this browser tab.</p>
            ] : [
              <h2>Export successful!</h2>,
              <p>Depending on your browser settings, you will either be prompted with a prompt to save the generated file, or the file will be automatically downloaded into your default Downloads folder.</p>,
              <p>It is now safe to close the exporter.</p>,
            ]}
            <div className={styles['progress-bar']}>
              <div>
                <div className={styles['progress-bar-inner']} style={{ width: this.state.csvExportProgress * 100 + '%'}}></div>
              </div>
            </div>
            {(this.state.csvExportProgress < 1) ? (
              <span className={styles['percentage']}>
                {(this.state.csvExportProgress * 100).toFixed(0)}%
              </span>
            ) : (
              <button
                className={styles['close-csv-button']}
                onClick = {() => this.setState({ csvExportProgress: 0 })}
              >
                Close the exporter
              </button>
            )}
          </div>
        ) : (
          <div className={cx({ 'container-max': this.state.wideView, 'container': !this.state.wideView, 'users-content': true})}>
            <div className={styles['refining-container']}>
              <div className={styles['refining-container__filters']}>
                <ListSearch
                  valueChangeFunction={this.setSearchQuery}
                  inputPlaceholder='Search by users name, username or email...'
                />
                <div className={styles['multiselect-container']}>
                  <Select
                    ref={ref => {
                      this.selectRef = ref;
                    }}
                    options={this.state.coursesFilterOptions}
                    formatOptionLabel={formatOptionLabel}
                    onChange = {this.onSelectCourses}
                    styles={{
                      control: (base, state) => ({
                        ...base,
                        background: state.isFocused ? '#FFF' : '#F3F3F4',
                        border: '0.0625rem solid transparent',
                        borderColor: state.isFocused ? '#E60978 !important' : '#F3F3F4',
                        boxShadow: state.isFocused ? '0 0 0 0.25rem rgba(230, 9, 120, 0.25)' : 'none',
                        width: '25rem',
                        marginLeft: 'auto',
                        marginRight: '0',

                        '&:hover': {
                          borderColor: state.isFocused ? '#E60978' : '#F3F3F4',
                        }
                      }),

                      dropdownIndicator: (base) => ({
                        ...base,
                        color: '#666',
                        fontSize: '0.75rem'
                      }),

                      option: (base, state) => ({
                        ...base,
                        color: '#333',
                        backgroundColor: state.isFocused ? '#FBFBFB !important' : '#fff !important',
                      })
                    }}
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
                    <div className={styles['chips']}>
                      {listChips}
                    </div>
                    : ''
                  }
                </div>
              </div>
            </div>
            {(this.state.selectedCourses.length || this.state.searchQuery) && this.state.pages ? (
              <div className={styles['view-controls-container']}>
                <button
                  className={styles['export-the-csv-button']}
                  onClick = {() => this.startCsvExport()}
                >
                  Generate a CSV from Current View
                </button>
                <div>
                  <div className={styles['toggle-wide-view-button']}>
                    <label className={styles['toggle-label']} htmlFor="toggle-wide-view-button">{this.state.wideView ? 'On wide view' : 'Off wide view'}</label>
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
            {(this.state.selectedCourses.length || this.state.searchQuery) ? (
              <div className={styles['users-overview-list-wrapper']}>
                <table className={styles['users-overview-list']}>
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
                      <th className={styles['email']}>
                        <button
                          className={styles['sorting-header-button']}
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
              <div className={styles['no-data-message']}>
                <img src={learnersProgressOverviewArrow} alt="Gender" />
                Enter a search term and/or select course(s) to <br/> display the data.
              </div>
            )}
            {(this.state.selectedCourses.length || this.state.searchQuery) && this.state.pages ? (
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
        )}
      </div>
    );
  }
}

export default ProgressOverview
