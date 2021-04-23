import React, { Component } from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import apiConfig from "base/apiConfig";

const WAIT_INTERVAL = 1000;

const getSuggestionValue = (suggestion) => suggestion.userName;

class AutoCompleteUserSelect extends Component {
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
      apiConfig.learnersGeneral +
      "?search=" +
      encodeURIComponent(this.state.value);
    // fetch(requestUrl, { credentials: "same-origin" })
    //   .then((response) => response.json())
    //   .then((json) =>
    //     this.setState({
    //       suggestions: json["results"],
    //     })
    //   );

      const json = {"count":23,"next":null,"previous":null,"results":[{"id":1,"username":"ecommerce_worker","email":"ecommerce_worker@fake.email","fullname":null,"country":null,"is_active":true,"year_of_birth":null,"gender":null,"date_joined":"2021-04-04","level_of_education":null,"language_proficiencies":[],"courses":[]},{"id":2,"username":"login_service_user","email":"login_service_user@fake.email","fullname":null,"country":null,"is_active":true,"year_of_birth":null,"gender":null,"date_joined":"2021-04-04","level_of_education":null,"language_proficiencies":[],"courses":[]},{"id":3,"username":"notes","email":"notes@openedx","fullname":"","country":"","is_active":true,"year_of_birth":null,"gender":null,"date_joined":"2021-04-04","level_of_education":null,"language_proficiencies":[],"courses":[]},{"id":4,"username":"discovery","email":"discovery@openedx.groovetechnology.co","fullname":"","country":"","is_active":true,"year_of_birth":null,"gender":null,"date_joined":"2021-04-04","level_of_education":null,"language_proficiencies":[],"courses":[]},{"id":5,"username":"lms_catalog_service_user","email":"lms_catalog_service_user@openedx.groovetechnology.co","fullname":"","country":"","is_active":true,"year_of_birth":null,"gender":null,"date_joined":"2021-04-04","level_of_education":null,"language_proficiencies":[],"courses":[]},{"id":6,"username":"credentials","email":"credentials@openedx.groovetechnology.co","fullname":"","country":"","is_active":true,"year_of_birth":null,"gender":null,"date_joined":"2021-04-05","level_of_education":null,"language_proficiencies":[],"courses":[]},{"id":7,"username":"credentials_service_user","email":"credentials_service_user@openedx.groovetechnology.co","fullname":"","country":"","is_active":true,"year_of_birth":null,"gender":null,"date_joined":"2021-04-05","level_of_education":null,"language_proficiencies":[],"courses":[]},{"id":8,"username":"openedx","email":"openedx@openedx.com","fullname":"openedx","country":"","is_active":true,"year_of_birth":null,"gender":null,"date_joined":"2021-04-05","level_of_education":null,"language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00015+2021_00015","display_name":"COURSE 15","org":"Groove"},{"id":"course-v1:Groove+00016+2021_00016","display_name":"COURSE 16","org":"Groove"}]},{"id":9,"username":"insights","email":"insights@openedx.groovetechnology.co","fullname":"","country":"","is_active":true,"year_of_birth":null,"gender":null,"date_joined":"2021-04-05","level_of_education":null,"language_proficiencies":[],"courses":[]},{"id":10,"username":"admin","email":"products@groovetechnology.com","fullname":"admin","country":"","is_active":true,"year_of_birth":null,"gender":null,"date_joined":"2021-04-06","level_of_education":null,"language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00014+2021_00014","display_name":"COURSE 14","org":"Groove"},{"id":"course-v1:Groove+0009+2021_0009","display_name":"COURSE 09","org":"Groove"}]},{"id":11,"username":"quynhho","email":"quynh@gmail.com","fullname":"quynhho","country":"","is_active":true,"year_of_birth":null,"gender":"","date_joined":"2021-04-06","level_of_education":"","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00012+2021_00012","display_name":"COURSE 12","org":"Groove"},{"id":"course-v1:Groove+00014+2021_00014","display_name":"COURSE 14","org":"Groove"},{"id":"course-v1:Groove+00015+2021_00015","display_name":"COURSE 15","org":"Groove"},{"id":"course-v1:Groove+00016+2021_00016","display_name":"COURSE 16","org":"Groove"},{"id":"course-v1:Groove+00017+2021_00017","display_name":"COURSE 17","org":"Groove"},{"id":"course-v1:GrooveTechnology+00007+2021_00007","display_name":"COURSE 15","org":"GrooveTechnology"}]},{"id":12,"username":"cy","email":"cy@gmail.com","fullname":"cy","country":"US","is_active":true,"year_of_birth":2000,"gender":"m","date_joined":"2021-04-07","level_of_education":"p","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00015+2021_00015","display_name":"COURSE 15","org":"Groove"},{"id":"course-v1:Groove+00016+2021_00016","display_name":"COURSE 16","org":"Groove"},{"id":"course-v1:Groove+00017+2021_00017","display_name":"COURSE 17","org":"Groove"}]},{"id":14,"username":"cy2","email":"cy2@gmail.com","fullname":"cy2","country":"US","is_active":true,"year_of_birth":2000,"gender":"m","date_joined":"2021-04-07","level_of_education":"p","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00017+2021_00017","display_name":"COURSE 17","org":"Groove"}]},{"id":15,"username":"cy3","email":"cy3@gmail.com","fullname":"cy3","country":"US","is_active":true,"year_of_birth":2000,"gender":"f","date_joined":"2021-04-07","level_of_education":"hs","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00015+2021_00015","display_name":"COURSE 15","org":"Groove"},{"id":"course-v1:Groove+00017+2021_00017","display_name":"COURSE 17","org":"Groove"}]},{"id":16,"username":"cy4","email":"cy4@gmail.com","fullname":"cy4","country":"US","is_active":true,"year_of_birth":2000,"gender":"f","date_joined":"2021-04-07","level_of_education":"p","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00015+2021_00015","display_name":"COURSE 15","org":"Groove"},{"id":"course-v1:Groove+00017+2021_00017","display_name":"COURSE 17","org":"Groove"}]},{"id":17,"username":"cy5","email":"cy5@gmail.com","fullname":"cy5","country":"VN","is_active":true,"year_of_birth":2000,"gender":"m","date_joined":"2021-04-07","level_of_education":"p","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00015+2021_00015","display_name":"COURSE 15","org":"Groove"},{"id":"course-v1:Groove+00016+2021_00016","display_name":"COURSE 16","org":"Groove"},{"id":"course-v1:Groove+00017+2021_00017","display_name":"COURSE 17","org":"Groove"}]},{"id":18,"username":"cy6","email":"cy6@gmail.com","fullname":"cy6","country":"US","is_active":true,"year_of_birth":1991,"gender":"m","date_joined":"2021-04-07","level_of_education":"p","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00015+2021_00015","display_name":"COURSE 15","org":"Groove"},{"id":"course-v1:Groove+00016+2021_00016","display_name":"COURSE 16","org":"Groove"},{"id":"course-v1:Groove+00017+2021_00017","display_name":"COURSE 17","org":"Groove"}]},{"id":19,"username":"cy7","email":"cy7@gmail.com","fullname":"cy7","country":"US","is_active":true,"year_of_birth":1991,"gender":"m","date_joined":"2021-04-07","level_of_education":"p","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00015+2021_00015","display_name":"COURSE 15","org":"Groove"},{"id":"course-v1:Groove+00016+2021_00016","display_name":"COURSE 16","org":"Groove"},{"id":"course-v1:Groove+00017+2021_00017","display_name":"COURSE 17","org":"Groove"}]},{"id":20,"username":"cy8","email":"cy8@gmail.com","fullname":"cy8","country":"US","is_active":true,"year_of_birth":1991,"gender":"m","date_joined":"2021-04-07","level_of_education":"p","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00015+2021_00015","display_name":"COURSE 15","org":"Groove"},{"id":"course-v1:Groove+00017+2021_00017","display_name":"COURSE 17","org":"Groove"}]},{"id":21,"username":"cy9","email":"cy9@gmail.com","fullname":"cy9","country":"US","is_active":true,"year_of_birth":1991,"gender":"m","date_joined":"2021-04-07","level_of_education":"p","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00017+2021_00017","display_name":"COURSE 17","org":"Groove"}]},{"id":22,"username":"cy10","email":"cy10@gmail.com","fullname":"cy10","country":"","is_active":true,"year_of_birth":1991,"gender":"m","date_joined":"2021-04-07","level_of_education":"b","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00017+2021_00017","display_name":"COURSE 17","org":"Groove"}]},{"id":23,"username":"huynk","email":"huynk@openedx.com","fullname":"Huy Nguyen","country":"","is_active":true,"year_of_birth":null,"gender":"","date_joined":"2021-04-07","level_of_education":"","language_proficiencies":[],"courses":[{"id":"course-v1:Groove+00015+2021_00015","display_name":"COURSE 15","org":"Groove"},{"id":"course-v1:Groove+00016+2021_00016","display_name":"COURSE 16","org":"Groove"}]},{"id":24,"username":"ecommerce","email":"ecommerce@openedx","fullname":"","country":"","is_active":true,"year_of_birth":null,"gender":null,"date_joined":"2021-04-07","level_of_education":null,"language_proficiencies":[],"courses":[]}]};
      this.setState({
        suggestions: json["results"],
      }) //MOCKDATA
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
        className="suggestion-link"
        to={"/figures/user/" + suggestion["id"]}
        onClick={this.modalTrigger}
      >
        <div className="suggestion-link__user-username">
          {suggestion["username"]}
        </div>
        <div className="suggestion-link__user-name">
          {suggestion["fullname"] ? suggestion["fullname"] : '-'}
        </div>
      </Link>
    );

    return (
      <div className="ac-user-selector">
        <button
          onClick={this.modalTrigger}
          className={"ignore selector-trigger-button" + (!this.props.negativeStyleButton ? ' positive' : ' negative')
          }
        >
          {this.props.buttonText}
        </button>
        {this.state.modalActive && (
          <div className="selector-modal">
            <div>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                alwaysRenderSuggestions
                ref={this.storeInputReference}
              />
              {this.state.modalActive && (
                <div className="selector-modal">
                  <div>
                    <Autosuggest
                      suggestions={suggestions}
                      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={inputProps}
                      alwaysRenderSuggestions
                      ref={this.storeInputReference}
                    />
                    {this.state.value ?
                    (<button className="dismiss-btn" onClick={this.onClearSearch}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path fill="#cbcbcb" d="M11.375,3.375a8,8,0,1,0,8,8A8,8,0,0,0,11.375,3.375Zm2.027,10.9-2.027-2.027L9.348,14.271a.615.615,0,1,1-.869-.869l2.027-2.027L8.479,9.348a.615.615,0,0,1,.869-.869l2.027,2.027L13.4,8.479a.615.615,0,0,1,.869.869l-2.027,2.027L14.271,13.4a.618.618,0,0,1,0,.869A.611.611,0,0,1,13.4,14.271Z" transform="translate(-3.375 -3.375)"/>
                        </svg>
                    </button>) :
                    (<span className="search-btn">
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
            </div>
          </div>
        )}
        {this.state.modalActive && (
          <div
            className="selector-backdrop"
            onClick={this.modalTrigger}
          ></div>
        )}
      </div>
    );
  }
}

AutoCompleteUserSelect.defaultProps = {
  negativeStyleButton: false,
  buttonText: "Select a user",
  inputPlaceholder: "Start typing to search...",
};

AutoCompleteUserSelect.propTypes = {
  negativeStyleButton: PropTypes.bool,
  buttonText: PropTypes.string,
  inputPlaceholder: PropTypes.string,
};

export default AutoCompleteUserSelect;