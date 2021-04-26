import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';

class UserCoursesList extends Component {

  render() {

    const coursesRender = this.props.enrolledCoursesData.map((course, index) => {
      const progressBarWidth = (course.getIn(['progress_data', 'course_progress'], 0)*100).toFixed(0) + '%';

      return (
        <div key={index} className='stat-card course-item'>
          <div className='course-info'>
            <span className='course-code'>{course['course_code']}</span>
            <Link className='course-name' to={"/figures/course/" + course.getIn(['course_id'], "")}>{course.getIn(['course_name'], "")}</Link>
          </div>
          <ul className='user-stats'>
            <li className='stat'>
              <span className='stat-label'>
                Date enrolled:
              </span>
              <span className='stat-value'>
                {course.getIn(['date_enrolled'])}
              </span>
            </li>
            <li className='stat'>
              <span className='stat-label'>
                Course completed:
              </span>
              <span className='stat-value'>
                {course.getIn(['progress_data', 'course_completed']) ? <FontAwesomeIcon icon={faCheck} className='completed-icon' /> : '-'}
              </span>
            </li>
            <li className='stat'>
              <span className='stat-label'>
                Points earned:
              </span>
              <span className='stat-value'>
                {course.getIn(['progress_data', 'course_progress_details', 'points_earned'], 0)} (of {course.getIn(['progress_data', 'course_progress_details', 'points_possible'], 0)})
              </span>
            </li>
            <li className='stat'>
              <span className='stat-label'>
                Overall progress:
              </span>
              <span className='stat-value'>
                {(course.getIn(['progress_data', 'course_progress'], 0)*100).toFixed(2)}%
              </span>
            </li>
          </ul>
          <div className='progress-bar'>
            <span className={'bar' + (course.getIn(['progress_data', 'course_completed']) ? ' finished' : '')} style={{width: progressBarWidth}}></span>
          </div>
        </div>
      )
    })

    return (
      <section className='user-courses-list'>
        {coursesRender}
      </section>
    )
  }
}

export default UserCoursesList;
