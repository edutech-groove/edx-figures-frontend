import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import moment from 'moment';
import countriesWithCodes from 'base/data/countriesData';
import styles from './_course-learners-list.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';

let cx = classNames.bind(styles);

class CourseLearnersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allLearnersLoaded: this.props.allLearnersLoaded
    };
    this.paginationLoadMore = this.paginationLoadMore.bind(this);
    this.isCurrentCourse = this.isCurrentCourse.bind(this);
  }

  isCurrentCourse = (course) => {
    return course.get('course_id') === this.props.courseId
  }

  paginationLoadMore = () => {
    this.props.apiFetchMoreLearnersFunction()
  }

  componentDidMount() {
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props !== nextProps) {
      this.setState({
        allLearnersLoaded: nextProps.allLearnersLoaded
      })
    }
  }

  render() {

    const learnersRender = this.props.learnersData.map((user, index) => {
      const courseSpecificData = user.getIn(['courses']).find(this.isCurrentCourse) ? user.getIn(['courses']).find(this.isCurrentCourse) : Immutable.List();

      return (
        <tr key={index} className={styles['learner-row']}>
          <td className={styles['name']}><Link to={'/figures/user/' + user.getIn(['id'])}>{user.getIn(['name'])}</Link></td>
          <td className={styles['country']}>{countriesWithCodes[user.getIn(['country'], 'ND')]}</td>
          <td className={styles['date-enrolled']}>{moment(courseSpecificData.getIn(['date_enrolled'])).format('LL')}</td>
          <td className={styles['course-progress']}>{(courseSpecificData.getIn(['progress_data', 'course_progress'], 0)*100).toFixed(2)}%</td>
          <td className={styles['course-completed']}>{courseSpecificData.getIn(['progress_data', 'course_completed'], false) && 
            <svg xmlns="http://www.w3.org/2000/svg" width="14.235" height="10.237" viewBox="0 0 14.235 10.237" className={styles['completed-icon']}>
              <g transform="translate(0 0)">
                <path d="M548.55,398.508l-4.9-4.729.882-.913,4,3.86,8.455-8.454.9.9Z" transform="translate(-543.653 -388.271)"/>
              </g>
            </svg>
          }</td>
          <td className={styles['date-completed']}>{courseSpecificData.getIn(['progress_data', 'course_completed'], false) ? moment(courseSpecificData.getIn(['progress_data', 'date_completed'])).format('LL') : '-'}</td>
        </tr>
      )
    })

    return (
      <section className={styles['course-learners-list']}>
        <div className={styles['header']}>
          <div className={styles['header-title']}>
            {this.props.listTitle}
          </div>
        </div>
        <div className={cx({ 'stat-card': true, 'span-2': false, 'span-3': false, 'span-4': true, 'learners-table-container': true})}>
          <table className={styles['learners-table']}>
            <thead>
              <tr key="header" className={styles['header-row']}>
                <th className={styles['name']}>Learner</th>
                <th className={styles['country']}>Country</th>
                <th className={styles['date-enrolled']}>Date enrolled</th>
                <th className={styles['course-progress']}>Course progress</th>
                <th className={styles['course-completed']}>Course completed</th>
                <th className={styles['date-completed']}>Date completed</th>
              </tr>
            </thead>
            <tbody>
              {learnersRender}
            </tbody>
          </table>
          {!this.state.allLearnersLoaded && <div className={styles["load-more-wrapper"]}>
            <button className={styles["load-more-button"]} onClick={() => this.paginationLoadMore()}>
              <div className={styles['btn-content']}>
                Load more
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8.148" viewBox="0 0 8 8.148">
                  <g transform="translate(471 -1213) rotate(90)">
                    <path d="M14.442,10.195,11.414,7.17a.569.569,0,0,1,0-.807.577.577,0,0,1,.81,0l3.43,3.427a.571.571,0,0,1,.017.788L12.227,14.03a.572.572,0,1,1-.81-.807Z" transform="translate(1201.754 456.804)"/>
                    <path d="M14.442,10.195,11.414,7.17a.569.569,0,0,1,0-.807.577.577,0,0,1,.81,0l3.43,3.427a.571.571,0,0,1,.017.788L12.227,14.03a.572.572,0,1,1-.81-.807Z" transform="translate(1205.328 456.804)"/>
                  </g>
                </svg>
              </div>
            </button>
          </div>}
        </div>
      </section>
    )
  }
}

CourseLearnersList.defaultProps = {
  listTitle: 'Per learner info:',
}

CourseLearnersList.propTypes = {
  listTitle: PropTypes.string,
  courseId: PropTypes.string,
};

export default CourseLearnersList;
