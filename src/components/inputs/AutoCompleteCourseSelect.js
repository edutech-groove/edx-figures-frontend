import React, { Component } from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import styles from "./_autocomplete-course-select.scss";
import stylesHeader from "../layout/_header-nav.scss";
import classNames from "classnames/bind";
import apiConfig from "base/apiConfig";

let cx = classNames.bind({
  ...styles,
  ...stylesHeader,
});

const WAIT_INTERVAL = 1000;

const getSuggestionValue = (suggestion) => suggestion.courseName;

class AutoCompleteCourseSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      suggestions: [],
      modalActive: false,
    };

    this.onChange = this.onChange.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.modalTrigger = this.modalTrigger.bind(this);
    this.storeInputReference = this.storeInputReference.bind(this);
  }

  onClearSearch = () => {
    this.setState(
      {
        value: "",
      },
      () => {
        this.input.focus();
      }
    );
  };

  modalTrigger = () => {
    this.setState(
      {
        modalActive: !this.state.modalActive,
        value: "",
      },
      () => {
        this.state.modalActive && this.input.focus();
      }
    );
  };

  onChange = (event, { newValue }) => {
    clearTimeout(this.timer);

    this.setState({
      value: newValue,
    });

    this.timer = setTimeout(this.doSearch, WAIT_INTERVAL);
  };

  doSearch = () => {
    const requestUrl =
      apiConfig.coursesGeneral +
      "?search=" +
      encodeURIComponent(this.state.value);
    fetch(requestUrl, { credentials: "same-origin" })
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          suggestions: json["results"],
        })
      );

      // const json = {"count":10,"next":null,"previous":null,"results":[{"course_id":"course-v1:Groove+00011+2021_00011","course_name":"COURSE 11","course_code":"00011","org":"Groove","start_date":"2021-01-01T00:00:00Z","end_date":"2022-01-01T00:00:00Z","self_paced":false,"staff":[],"metrics":{"id":9,"average_progress":"0.00","created":"2021-04-07T06:00:00.125602Z","modified":"2021-04-07T06:00:00.126312Z","date_for":"2021-04-06","course_id":"course-v1:Groove+00011+2021_00011","enrollment_count":0,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:Groove+00012+2021_00012","course_name":"COURSE 12","course_code":"00012","org":"Groove","start_date":"2021-01-01T00:00:00Z","end_date":"2022-01-01T00:00:00Z","self_paced":false,"staff":[],"metrics":{"id":10,"average_progress":"0.00","created":"2021-04-07T06:00:00.473060Z","modified":"2021-04-07T06:00:00.473319Z","date_for":"2021-04-06","course_id":"course-v1:Groove+00012+2021_00012","enrollment_count":1,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:Groove+00014+2021_00014","course_name":"COURSE 14","course_code":"00014","org":"Groove","start_date":"2020-01-01T00:00:00Z","end_date":"2021-01-01T12:00:00Z","self_paced":false,"staff":[{"user_id":11,"username":"quynhho","fullname":"quynhho","role":"instructor"},{"user_id":11,"username":"quynhho","fullname":"quynhho","role":"staff"}],"metrics":{"id":11,"average_progress":"0.00","created":"2021-04-07T06:00:01.057640Z","modified":"2021-04-07T06:00:01.057884Z","date_for":"2021-04-06","course_id":"course-v1:Groove+00014+2021_00014","enrollment_count":1,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:Groove+00015+2021_00015","course_name":"COURSE 15","course_code":"00015","org":"Groove","start_date":"2020-01-01T00:00:00Z","end_date":"2022-01-01T00:00:00Z","self_paced":false,"staff":[{"user_id":11,"username":"quynhho","fullname":"quynhho","role":"instructor"},{"user_id":11,"username":"quynhho","fullname":"quynhho","role":"staff"}],"metrics":{"id":12,"average_progress":"0.25","created":"2021-04-07T06:00:01.179960Z","modified":"2021-04-07T06:00:01.180197Z","date_for":"2021-04-06","course_id":"course-v1:Groove+00015+2021_00015","enrollment_count":3,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:Groove+00016+2021_00016","course_name":"COURSE 16","course_code":"00016","org":"Groove","start_date":"2020-01-01T00:00:00Z","end_date":"2022-01-01T00:00:00Z","self_paced":false,"staff":[{"user_id":11,"username":"quynhho","fullname":"quynhho","role":"instructor"},{"user_id":11,"username":"quynhho","fullname":"quynhho","role":"staff"}],"metrics":{"id":13,"average_progress":"0.00","created":"2021-04-07T06:00:01.278425Z","modified":"2021-04-07T06:00:01.278674Z","date_for":"2021-04-06","course_id":"course-v1:Groove+00016+2021_00016","enrollment_count":3,"active_learners_today":1,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:Groove+00017+2021_00017","course_name":"COURSE 17","course_code":"00017","org":"Groove","start_date":"2020-01-01T00:00:00Z","end_date":"2022-01-01T00:00:00Z","self_paced":false,"staff":[{"user_id":11,"username":"quynhho","fullname":"quynhho","role":"instructor"},{"user_id":11,"username":"quynhho","fullname":"quynhho","role":"staff"}],"metrics":null},{"course_id":"course-v1:Groove+0008+2021_0008","course_name":"COURSE 08","course_code":"0008","org":"Groove","start_date":"2021-01-01T00:00:00Z","end_date":"2022-01-01T00:00:00Z","self_paced":false,"staff":[],"metrics":{"id":14,"average_progress":"0.00","created":"2021-04-07T06:00:01.299375Z","modified":"2021-04-07T06:00:01.299644Z","date_for":"2021-04-06","course_id":"course-v1:Groove+0008+2021_0008","enrollment_count":0,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:Groove+0009+2021_0009","course_name":"COURSE 09","course_code":"0009","org":"Groove","start_date":"2021-01-01T00:00:00Z","end_date":"2022-01-01T00:00:00Z","self_paced":false,"staff":[],"metrics":{"id":15,"average_progress":"0.00","created":"2021-04-07T06:00:01.429460Z","modified":"2021-04-07T06:00:01.429707Z","date_for":"2021-04-06","course_id":"course-v1:Groove+0009+2021_0009","enrollment_count":1,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:GrooveTechnology+00006+2021_00006","course_name":"COURSE 06","course_code":"00006","org":"GrooveTechnology","start_date":"2020-01-01T00:00:00Z","end_date":"2022-01-01T00:00:00Z","self_paced":false,"staff":[],"metrics":{"id":16,"average_progress":"0.00","created":"2021-04-07T06:00:01.449539Z","modified":"2021-04-07T06:00:01.449785Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+00006+2021_00006","enrollment_count":0,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}},{"course_id":"course-v1:GrooveTechnology+00007+2021_00007","course_name":"COURSE 15","course_code":"00007","org":"GrooveTechnology","start_date":"2020-01-01T00:00:00Z","end_date":"2022-01-01T00:00:00Z","self_paced":false,"staff":[],"metrics":{"id":17,"average_progress":"0.00","created":"2021-04-07T06:00:01.584386Z","modified":"2021-04-07T06:00:01.584626Z","date_for":"2021-04-06","course_id":"course-v1:GrooveTechnology+00007+2021_00007","enrollment_count":1,"active_learners_today":0,"average_days_to_complete":0,"num_learners_completed":0,"site":1}}]};
      // this.setState({
      //   suggestions: json["results"],
      // }) //MOCKDATA
  };

  onSuggestionsClearRequested = () => {};

  onSuggestionSelected = () => {
    this.setState({
      modalActive: false,
      value: "",
      suggestions: [],
    });
  };

  onSuggestionsFetchRequested = () => {};

  storeInputReference = (autosuggest) => {
    if (autosuggest !== null) {
      this.input = autosuggest.input;
    }
  };

  componentWillMount() {
    this.timer = null;
  }

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: this.props.inputPlaceholder,
      value,
      onChange: this.onChange,
    };

    const renderSuggestion = (suggestion) => (
      <Link
        className={styles["suggestion-link"]}
        to={"/figures/course/" + suggestion["course_id"]}
        onClick={this.modalTrigger}
      >
        <div className={styles["suggestion-link__course-number"]}>
          {suggestion["course_code"]}
        </div>
        <div className={styles["suggestion-link__course-name"]}>
          {suggestion["course_name"]}
        </div>
        <div className={styles["suggestion-link__course-id"]}>
          {suggestion["course_id"]}
        </div>
      </Link>
    );

    return (
      <div className={cx(styles["ac-course-selector"], "ac-course-button")}>
        <button
          onClick={this.modalTrigger}
          className={cx("ignore", {
            "selector-trigger-button": true,
            positive: !this.props.negativeStyleButton,
            negative: this.props.negativeStyleButton,
          })}
        >
          {this.props.buttonText}
        </button>
        {this.state.modalActive && (
          <div className={styles["selector-modal"]}>
            <div>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                theme={styles}
                alwaysRenderSuggestions
                ref={this.storeInputReference}
              />
              {this.state.value ?
              (<button className={styles["dismiss-btn"]} onClick={this.onClearSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <path fill="#cbcbcb" d="M11.375,3.375a8,8,0,1,0,8,8A8,8,0,0,0,11.375,3.375Zm2.027,10.9-2.027-2.027L9.348,14.271a.615.615,0,1,1-.869-.869l2.027-2.027L8.479,9.348a.615.615,0,0,1,.869-.869l2.027,2.027L13.4,8.479a.615.615,0,0,1,.869.869l-2.027,2.027L14.271,13.4a.618.618,0,0,1,0,.869A.611.611,0,0,1,13.4,14.271Z" transform="translate(-3.375 -3.375)"/>
                  </svg>
              </button>) :
              (<span className={styles["search-btn"]}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.414 18.414">
                  <g transform="translate(-3.5 -3.5)">
                    <path d="M18.722,11.611A7.111,7.111,0,1,1,11.611,4.5a7.111,7.111,0,0,1,7.111,7.111Z" transform="translate(0)"/>
                    <path d="M28.842,28.842l-3.867-3.867" transform="translate(-8.342 -8.342)"/>
                  </g>
                </svg>
              </span>)}
            </div>
          </div>
        )}
        {this.state.modalActive && (
          <div
            className={styles["selector-backdrop"]}
            onClick={this.modalTrigger}
          ></div>
        )}
      </div>
    );
  }
}

AutoCompleteCourseSelect.defaultProps = {
  negativeStyleButton: false,
  buttonText: "Select a course",
  inputPlaceholder: "Start typing to search...",
  coursesList: [
    {
      courseId: "A101",
      courseName: "This is the name of the course",
    },
    {
      courseId: "A102",
      courseName: "This is another name of the course",
    },
    {
      courseId: "A103",
      courseName: "My introduction to EdX Figures",
    },
    {
      courseId: "A101",
      courseName: "This is the name of the course",
    },
    {
      courseId: "A102",
      courseName: "This is another name of the course",
    },
    {
      courseId: "A103",
      courseName: "My introduction to EdX Figures",
    },
    {
      courseId: "A101",
      courseName: "This is the name of the course",
    },
    {
      courseId: "A102",
      courseName: "This is another name of the course",
    },
    {
      courseId: "A103",
      courseName: "My introduction to EdX Figures",
    },
  ],
};

AutoCompleteCourseSelect.propTypes = {
  negativeStyleButton: PropTypes.bool,
  buttonText: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  coursesList: PropTypes.array,
};

export default AutoCompleteCourseSelect;
