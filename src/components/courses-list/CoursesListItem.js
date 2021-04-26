import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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

class CoursesListItem extends Component {

  render() {
    const courseStaff = this.props.courseStaff.map((item, index) => {
      return (
        <span key={index} className='value'>{item.get('fullname')}</span>
      )
    });

    return (
      <Link to={'/figures/course/' + this.props.courseId} className='course-list-item' key={this.props.courseId}>
        <div className='general-info-section'>
          <span className='course-id'>{this.props.courseCode}</span>
          <span className='course-name'>{this.props.courseName}</span>
          {this.props.courseIsSelfPaced ? (
            <div className='label-value'>
              <span className='label'>Course dates:</span>
              <span className='value'>This course is self-paced</span>
            </div>
          ) : [
            <div key='startDate' className='label-value'>
              <span className='label'>Start date:</span>
              <span className='value'>{parseCourseDate(this.props.startDate)}</span>
            </div>,
            <div key='endDate' className='label-value'>
              <span className='label'>End date:</span>
              <span className='value'>{parseCourseDate(this.props.startDate)}</span>
            </div>
          ]}
          <div className='label-value'>
            <span className='label'>Course staff:</span>
            {courseStaff}
          </div>
        </div>
        <span className='sections-separator' />
        <div className='stats-section'>
          <div className='stats-section-inner'>
            <div className='single-stat'>
              <span className='stat-label'>
                Learners enrolled:
              </span>
              <span className='stat-value'>
                {this.props.learnersEnrolled}
              </span>
            </div>
            <div className='single-stat'>
              <span className='stat-label'>
                Average progress:
              </span>
              <span className='stat-value'>
                {(this.props.averageProgress*100).toFixed(2)}%
              </span>
            </div>
            <div className='single-stat'>
              <span className='stat-label'>
                Average days to complete:
              </span>
              <span className='stat-value'>
                {this.props.averageCompletionTime ? this.props.averageCompletionTime : 'n/a'}
              </span>
            </div>
            <div className='single-stat'>
              <span className='stat-label'>
                No. of learners to complete:
              </span>
              <span className='stat-value'>
                {this.props.numberLearnersCompleted}
              </span>
            </div>
          </div>
        </div>
        <span className='sections-separator' />
        <div className='button-section'>
          <Link to={'/figures/course/' + this.props.courseId} className='course-button'>Course details</Link>
        </div>
      </Link>
    )
  }
}

CoursesListItem.defaultProps = {

}

CoursesListItem.propTypes = {
  courseStaff: PropTypes.array,
  courseId: PropTypes.string,
  courseName: PropTypes.string,
  courseIsSelfPaced: PropTypes.bool,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  learnersEnrolled: PropTypes.number,
  averageProgress: PropTypes.number,
  averageCompletionTime: PropTypes.number,
  numberLearnersCompleted: PropTypes.number,
};

export default CoursesListItem;
