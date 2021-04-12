import React, { Component } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import classNames from 'classnames/bind';
import styles from './_single-course-content.scss';
import HeaderAreaLayout from 'base/components/layout/HeaderAreaLayout';
import HeaderContentCourse from 'base/components/header-views/header-content-course/HeaderContentCourse';
import BaseStatCard from 'base/components/stat-cards/BaseStatCard';
import LearnerStatistics from 'base/components/learner-statistics/LearnerStatistics';
import CourseLearnersList from 'base/components/course-learners-list/CourseLearnersList';
import apiConfig from 'base/apiConfig';
import courseMonthlyMetrics from 'base/apiServices/courseMonthlyMetrics';

let cx = classNames.bind(styles);

class SingleCourseContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseData: Immutable.Map(),
      allLearnersLoaded: true,
      learnersList: Immutable.List(),
      apiFetchMoreLearnersUrl: null
    };
  }

  fetchCourseData = () => {
    // trackPromise(
    //   fetch((apiConfig.coursesGeneral + this.props.courseId + '/'), { credentials: "same-origin" })
    //     .then(response => response.json())
    //     .then(json => this.setState({
    //       courseData: Immutable.fromJS(json)
    //     })
    //   )
    // )

    const json = {"course_id":"course-v1:Groove+00015+2021_00015","course_name":"COURSE 15","course_code":"00015","org":"Groove","start_date":"2020-01-01T00:00:00Z","end_date":"2022-01-01T00:00:00Z","self_paced":false,"staff":[{"user_id":11,"username":"quynhho","fullname":"quynhho","role":"instructor"},{"user_id":11,"username":"quynhho","fullname":"quynhho","role":"staff"}],"metrics":{"id":21,"average_progress":"0.56","created":"2021-04-08T06:00:01.451227Z","modified":"2021-04-08T06:00:01.451459Z","date_for":"2021-04-07","course_id":"course-v1:Groove+00015+2021_00015","enrollment_count":8,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":3,"site":1}};
    this.setState({
      courseData: Immutable.fromJS(json)
    }); //MOCKDATA
  }

  fetchLearnersData = () => {
    // trackPromise(
    //   fetch((this.state.apiFetchMoreLearnersUrl === null) ? (apiConfig.learnersDetailed + '?enrolled_in_course_id=' + this.props.courseId) : this.state.apiFetchMoreLearnersUrl, { credentials: "same-origin" })
    //     .then(response => response.json())
    //     .then(json => this.setLearnersData(json['results'], json['next']))
    // )

    const json = {"count":8,"next":null,"previous":null,"results":[{"id":23,"username":"huynk","name":"Huy Nguyen","email":"huynk@openedx.com","country":"","is_active":true,"year_of_birth":null,"level_of_education":"","gender":"","date_joined":"2021-04-07T02:27:21Z","bio":null,"courses":[{"course_name":"COURSE 15","course_code":"00015","course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":null,"course_progress":0.0,"course_completed":false},"enrollment_id":9},{"course_name":"COURSE 16","course_code":"00016","course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":null,"course_progress":0.0,"course_completed":false},"enrollment_id":12}],"language_proficiencies":[],"profile_image":{"image_url_full":"/static/images/profiles/default_500.4215dbe8010f.png","image_url_large":"/static/grvlms-groove-theme/images/profiles/default_120.54ffc814ab4d.png","image_url_medium":"/static/grvlms-groove-theme/images/profiles/default_50.8b7ac1aa288a.png","image_url_small":"/static/grvlms-groove-theme/images/profiles/default_30.dd7ef10c3914.png","has_image":false}},{"id":8,"username":"openedx","name":"openedx","email":"openedx@openedx.com","country":"","is_active":true,"year_of_birth":null,"level_of_education":null,"gender":null,"date_joined":"2021-04-05T07:06:10.021559Z","bio":null,"courses":[{"course_name":"COURSE 15","course_code":"00015","course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":0,"points_possible":3.0,"sections_possible":2,"points_earned":0.0},"course_progress":0.0,"course_completed":false},"enrollment_id":10},{"course_name":"COURSE 16","course_code":"00016","course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":null,"course_progress":0.0,"course_completed":false},"enrollment_id":13}],"language_proficiencies":[],"profile_image":{"image_url_full":"/static/images/profiles/default_500.4215dbe8010f.png","image_url_large":"/static/grvlms-groove-theme/images/profiles/default_120.54ffc814ab4d.png","image_url_medium":"/static/grvlms-groove-theme/images/profiles/default_50.8b7ac1aa288a.png","image_url_small":"/static/grvlms-groove-theme/images/profiles/default_30.dd7ef10c3914.png","has_image":false}},{"id":17,"username":"cy5","name":"cy5","email":"cy5@gmail.com","country":"VN","is_active":true,"year_of_birth":2000,"level_of_education":"p","gender":"m","date_joined":"2021-04-07T01:59:12Z","bio":null,"courses":[{"course_name":"COURSE 15","course_code":"00015","course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":0,"points_possible":3.0,"sections_possible":2,"points_earned":0.0},"course_progress":0.0,"course_completed":false},"enrollment_id":26},{"course_name":"COURSE 16","course_code":"00016","course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":1.0},"course_progress":0.5,"course_completed":"2021-04-08T02:46:46.802688Z"},"enrollment_id":25},{"course_name":"COURSE 17","course_code":"00017","course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0},"course_progress":1.0,"course_completed":"2021-04-08T02:47:31.414059Z"},"enrollment_id":24}],"language_proficiencies":[],"profile_image":{"image_url_full":"/static/images/profiles/default_500.4215dbe8010f.png","image_url_large":"/static/grvlms-groove-theme/images/profiles/default_120.54ffc814ab4d.png","image_url_medium":"/static/grvlms-groove-theme/images/profiles/default_50.8b7ac1aa288a.png","image_url_small":"/static/grvlms-groove-theme/images/profiles/default_30.dd7ef10c3914.png","has_image":false}},{"id":20,"username":"cy8","name":"cy8","email":"cy8@gmail.com","country":"US","is_active":true,"year_of_birth":1991,"level_of_education":"p","gender":"m","date_joined":"2021-04-07T02:00:44Z","bio":null,"courses":[{"course_name":"COURSE 15","course_code":"00015","course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0},"course_progress":1.0,"course_completed":false},"enrollment_id":29},{"course_name":"COURSE 17","course_code":"00017","course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":2.0},"course_progress":0.5,"course_completed":false},"enrollment_id":17}],"language_proficiencies":[],"profile_image":{"image_url_full":"/static/images/profiles/default_500.4215dbe8010f.png","image_url_large":"/static/grvlms-groove-theme/images/profiles/default_120.54ffc814ab4d.png","image_url_medium":"/static/grvlms-groove-theme/images/profiles/default_50.8b7ac1aa288a.png","image_url_small":"/static/grvlms-groove-theme/images/profiles/default_30.dd7ef10c3914.png","has_image":false}},{"id":15,"username":"cy3","name":"cy3","email":"cy3@gmail.com","country":"US","is_active":true,"year_of_birth":2000,"level_of_education":"hs","gender":"f","date_joined":"2021-04-07T01:53:04Z","bio":null,"courses":[{"course_name":"COURSE 15","course_code":"00015","course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0},"course_progress":1.0,"course_completed":"2021-04-08T02:20:49.425190Z"},"enrollment_id":30},{"course_name":"COURSE 17","course_code":"00017","course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0},"course_progress":1.0,"course_completed":"2021-04-08T02:13:08.488234Z"},"enrollment_id":22}],"language_proficiencies":[],"profile_image":{"image_url_full":"/static/images/profiles/default_500.4215dbe8010f.png","image_url_large":"/static/grvlms-groove-theme/images/profiles/default_120.54ffc814ab4d.png","image_url_medium":"/static/grvlms-groove-theme/images/profiles/default_50.8b7ac1aa288a.png","image_url_small":"/static/grvlms-groove-theme/images/profiles/default_30.dd7ef10c3914.png","has_image":false}},{"id":16,"username":"cy4","name":"cy4","email":"cy4@gmail.com","country":"US","is_active":true,"year_of_birth":2000,"level_of_education":"p","gender":"f","date_joined":"2021-04-07T01:57:17Z","bio":null,"courses":[{"course_name":"COURSE 15","course_code":"00015","course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":2.0},"course_progress":0.5,"course_completed":"2021-04-08T02:17:53.292021Z"},"enrollment_id":31},{"course_name":"COURSE 17","course_code":"00017","course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":1.0},"course_progress":0.5,"course_completed":"2021-04-08T02:19:25.207681Z"},"enrollment_id":23}],"language_proficiencies":[],"profile_image":{"image_url_full":"/static/images/profiles/default_500.4215dbe8010f.png","image_url_large":"/static/grvlms-groove-theme/images/profiles/default_120.54ffc814ab4d.png","image_url_medium":"/static/grvlms-groove-theme/images/profiles/default_50.8b7ac1aa288a.png","image_url_small":"/static/grvlms-groove-theme/images/profiles/default_30.dd7ef10c3914.png","has_image":false}},{"id":18,"username":"cy6","name":"cy6","email":"cy6@gmail.com","country":"US","is_active":true,"year_of_birth":1991,"level_of_education":"p","gender":"m","date_joined":"2021-04-07T01:59:46Z","bio":null,"courses":[{"course_name":"COURSE 15","course_code":"00015","course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0},"course_progress":1.0,"course_completed":"2021-04-08T02:44:04.892873Z"},"enrollment_id":32},{"course_name":"COURSE 16","course_code":"00016","course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0},"course_progress":1.0,"course_completed":"2021-04-08T02:41:56.909747Z"},"enrollment_id":27},{"course_name":"COURSE 17","course_code":"00017","course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0},"course_progress":1.0,"course_completed":false},"enrollment_id":15}],"language_proficiencies":[],"profile_image":{"image_url_full":"/static/images/profiles/default_500.4215dbe8010f.png","image_url_large":"/static/grvlms-groove-theme/images/profiles/default_120.54ffc814ab4d.png","image_url_medium":"/static/grvlms-groove-theme/images/profiles/default_50.8b7ac1aa288a.png","image_url_small":"/static/grvlms-groove-theme/images/profiles/default_30.dd7ef10c3914.png","has_image":false}},{"id":19,"username":"cy7","name":"cy7","email":"cy7@gmail.com","country":"US","is_active":true,"year_of_birth":1991,"level_of_education":"p","gender":"m","date_joined":"2021-04-07T02:00:16Z","bio":null,"courses":[{"course_name":"COURSE 15","course_code":"00015","course_id":"course-v1:Groove+00015+2021_00015","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":1,"points_possible":3.0,"sections_possible":2,"points_earned":1.0},"course_progress":0.5,"course_completed":false},"enrollment_id":33},{"course_name":"COURSE 16","course_code":"00016","course_id":"course-v1:Groove+00016+2021_00016","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":3.0},"course_progress":1.0,"course_completed":"2021-04-08T02:51:33.736457Z"},"enrollment_id":28},{"course_name":"COURSE 17","course_code":"00017","course_id":"course-v1:Groove+00017+2021_00017","date_enrolled":"2021-04-07","progress_data":{"course_progress_history":[],"course_progress_details":{"sections_worked":2,"points_possible":3.0,"sections_possible":2,"points_earned":2.0},"course_progress":1.0,"course_completed":false},"enrollment_id":16}],"language_proficiencies":[],"profile_image":{"image_url_full":"/static/images/profiles/default_500.4215dbe8010f.png","image_url_large":"/static/grvlms-groove-theme/images/profiles/default_120.54ffc814ab4d.png","image_url_medium":"/static/grvlms-groove-theme/images/profiles/default_50.8b7ac1aa288a.png","image_url_small":"/static/grvlms-groove-theme/images/profiles/default_30.dd7ef10c3914.png","has_image":false}}]};
    this.setLearnersData(json['results'], json['next']); //MOCKDATA
  }

  setLearnersData = (results, paginationNext) => {
    const tempLearners = this.state.learnersList.concat(Immutable.fromJS(results));
    this.setState ({
      allLearnersLoaded: paginationNext === null,
      learnersList: tempLearners,
      apiFetchMoreLearnersUrl: paginationNext
    })
  }

  componentDidMount() {
    this.fetchCourseData();
    this.fetchLearnersData();
  }

  render() {
    return (
      <div className="ef--layout-root">
        <HeaderAreaLayout>
          <HeaderContentCourse
            startDate = {this.state.courseData.getIn(['start_date'])}
            endDate = {this.state.courseData.getIn(['end_date'])}
            courseName = {this.state.courseData.getIn(['course_name'])}
            courseCode = {this.state.courseData.getIn(['course_code'])}
            isSelfPaced = {this.state.courseData.getIn(['self_paced'])}
            learnersEnrolled = {this.state.courseData.getIn(['learners_enrolled'])}
          />
        </HeaderAreaLayout>
        <div className={cx({ 'container': true, 'course-quick-links': true})}>
          <a href={"/courses/" + this.props.courseId} target="_blank" className={styles['course-quick-links__link']}>Open this course in LMS</a>
        </div>
        <div className={cx({ 'container': true, 'base-grid-layout': true, 'dashboard-content': true})}>
          <BaseStatCard
            cardTitle='Active users'
            fetchDataKey={'active_users'}
            fetchValueFunction={(dataKey) => courseMonthlyMetrics.getSpecificWithHistory(this.props.courseId, dataKey)}
            fetchHistoryFunction={(dataKey) => courseMonthlyMetrics.getSpecificWithHistory(this.props.courseId, dataKey)}
          />
          <BaseStatCard
            cardTitle='Number of enrolled learners'
            fetchDataKey={'course_enrollments'}
            fetchValueFunction={(dataKey) => courseMonthlyMetrics.getSpecificWithHistory(this.props.courseId, dataKey)}
            fetchHistoryFunction={(dataKey) => courseMonthlyMetrics.getSpecificWithHistory(this.props.courseId, dataKey)}
          />
          <BaseStatCard
            cardTitle='Average course progress'
            fetchDataKey={'avg_progress'}
            fetchValueFunction={(dataKey) => courseMonthlyMetrics.getSpecificWithHistory(this.props.courseId, dataKey)}
            fetchHistoryFunction={(dataKey) => courseMonthlyMetrics.getSpecificWithHistory(this.props.courseId, dataKey)}
            dataType='percentage'
          />
          <BaseStatCard
            cardTitle='Average days to complete'
            fetchDataKey={'avg_days_to_complete'}
            fetchValueFunction={(dataKey) => courseMonthlyMetrics.getSpecificWithHistory(this.props.courseId, dataKey)}
            fetchHistoryFunction={(dataKey) => courseMonthlyMetrics.getSpecificWithHistory(this.props.courseId, dataKey)}
          />
          <BaseStatCard
            cardTitle='User course completions'
            fetchDataKey={'num_learners_completed'}
            fetchValueFunction={(dataKey) => courseMonthlyMetrics.getSpecificWithHistory(this.props.courseId, dataKey)}
            fetchHistoryFunction={(dataKey) => courseMonthlyMetrics.getSpecificWithHistory(this.props.courseId, dataKey)}
          />
          <LearnerStatistics
            learnersData = {this.state.learnersList}
          />
          <CourseLearnersList
            courseId = {this.props.courseId}
            allLearnersLoaded = {this.state.allLearnersLoaded}
            apiFetchMoreLearnersFunction = {this.fetchLearnersData}
            learnersData = {this.state.learnersList}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({

})

const mapDispatchToProps = dispatch => ({

})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCourseContent)
