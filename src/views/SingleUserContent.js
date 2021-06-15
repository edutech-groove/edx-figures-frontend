import React, { Component } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';
import HeaderAreaLayout from 'base/components/layout/HeaderAreaLayout';
import HeaderContentUser from 'base/components/header-views/header-content-user/HeaderContentUser';
import UserCoursesList from 'base/components/user-courses-list/UserCoursesList';
import apiConfig from 'base/apiConfig';

import iconUsername from 'base/images/icon-username.svg';
import iconActivated from 'base/images/icon-activated.svg';
import iconBirthday from 'base/images/icon-birthday.svg';
import iconCountry from 'base/images/icon-country.svg';
import iconCourse from 'base/images/icon-course.svg';
import iconDateStart from 'base/images/icon-date-start.svg';
import iconEducation from 'base/images/icon-education.svg';
import iconEmail from 'base/images/icon-email.svg';
import iconGender from 'base/images/icon-gender.svg';

var countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const educationLevelsDict = {
  "p": "PhD or Doctorate",
  "m": "Master's or professional degree",
  "b": "Bachelor's degree",
  "a": "Associate's degree",
  "hs": "Secondary/high school",
  "jhs": "Junior secondary/junior high/middle school",
  "none": "None",
  "o": "Other",
  "n-a": "Not available"
}

const genderDict = {
  "m": "Male",
  "f": "Female",
  "o": "Other / Prefer not to say"
}

class SingleUserContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: Immutable.Map()
    };

    this.fetchUserData = this.fetchUserData.bind(this);
  }

  fetchUserData = () => {
    trackPromise(
      fetch((apiConfig.learnersDetailed + this.props.userId + '/'), { credentials: "same-origin" })
        .then(response => response.json())
        .then(json => this.setState({
          userData: Immutable.fromJS(json)
        }))
    )
  }

  componentDidMount() {
    this.fetchUserData();
  }

  render() {
    const dateJoined = new Date(this.state.userData.getIn(['date_joined']));

    return (
      <div className="ef--layout-root">
        <HeaderAreaLayout>
          <HeaderContentUser
            image = {this.state.userData.getIn(['profile_image', 'image_url_large'])}
            name = {this.state.userData.getIn(['name'])}
          />
        </HeaderAreaLayout>
        <div className='container base-grid-layout user-content'>
          <div className="user-container">
            <div className='user-information'>
              {this.state.userData['name'] && (
                <div className='name'>
                  {this.state.userData['name']}
                </div>
              )}
              <ul className='user-details'>
                <li>
                  <span className='label'>
                    <img src={iconUsername} alt="Username" />
                    Username
                  </span>
                  <span className='value'>{this.state.userData.getIn(['username'])}</span>
                </li>
                <li>
                  <span className='label'>
                    <img src={iconBirthday} alt="Year of birth" />
                    Year of birth
                  </span>
                  <span className='value'>{this.state.userData.getIn(['year_of_birth'])}</span>
                </li>
                <li>
                  <span className='label'>
                    <img src={iconGender} alt="Gender" />
                    Gender
                  </span>
                  <span className='value'>{genderDict[this.state.userData.getIn(['gender'])]}</span>
                </li>
                <li>
                  <span className='label'>
                    <img src={iconDateStart} alt="Date joined" />
                    Date joined
                  </span>
                  <span className='value'>{dateJoined.toUTCString()}</span>
                </li>
                <li>
                  <span className='label'>
                    <img src={iconActivated} alt="Account Activated" />
                    Account activated
                  </span>
                  <span className='value'>{this.state.userData.getIn(['is_active'], false) ? 'Account activated' : 'Not activated'}</span>
                </li>
                <li>
                  <span className='label'>
                    <img src={iconCourse} alt="Courses enrolled" />
                    Courses enrolled
                  </span>
                  <span className='value'>{this.state.userData.getIn(['courses']) ? this.state.userData.getIn(['courses']).size : ""}</span>
                </li>
                <li>
                  <span className='label'>
                    <img src={iconCountry} alt="Country" />
                    Country
                  </span>
                  <span className='value'>{this.state.userData.getIn(['country']) ? countries.getName(this.state.userData.getIn(['country']), "en") : "Not Available"}</span>
                </li>
                <li>
                  <span className='label'>
                    <img src={iconEducation} alt="Level of Education" />
                    Level of education
                  </span>
                  <span className='value'>{this.state.userData.getIn(['level_of_education']) ? educationLevelsDict[this.state.userData.getIn(['level_of_education'])] : 'Not Available'}</span>
                </li>
                <li>
                  <span className='label'>
                    <img src={iconEmail} alt="Email address" />
                    Email address
                  </span>
                  <span className='value'><a href={"mailto:" + this.state.userData.getIn(['email'])}>{this.state.userData.getIn(['email'])}</a></span>
                </li>
              </ul>
            </div>
            <UserCoursesList
              enrolledCoursesData={this.state.userData.getIn(['courses'], [])}
            />
          </div>
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
)(SingleUserContent)