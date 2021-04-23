import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AutoCompleteCourseSelect from 'base/components/inputs/AutoCompleteCourseSelect';
import AutoCompleteUserSelect from 'base/components/inputs/AutoCompleteUserSelect';

class HeaderNav extends Component {

  render() {
    return (
      <div className='header-nav'>
        <div>
          <NavLink
            to="/figures"
            className='header-nav__link'
            exact
          >
            Overview
          </NavLink>
          <NavLink
            to="/figures/mau-history"
            className='header-nav__link'
          >
            MAU History
          </NavLink>
          <NavLink
            to="/figures/users"
            className='header-nav__link'
          >
            Users
          </NavLink>
          <NavLink
            to="/figures/courses"
            className='header-nav__link'
          >
            Courses
          </NavLink>
          <NavLink
            to="/figures/learners-progress-overview"
            className='header-nav__link'
          >
            Learners Progress Overview
          </NavLink>
          {(process.env.ENABLE_CSV_REPORTS === "enabled") && (
            <NavLink
              to="/figures/csv-reports"
              className='header-nav__link'
            >
              CSV Reports
            </NavLink>
          )}
        </div>
        <div>
          <AutoCompleteCourseSelect
            negativeStyleButton
            buttonText='Jump to a course'
          />
          <AutoCompleteUserSelect
            negativeStyleButton
            buttonText='Select a user'
          />
        </div>
      </div>
    );
  }
}

export default HeaderNav
