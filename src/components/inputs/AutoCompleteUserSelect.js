import React, { Component } from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import { Link } from "react-router-dom";
import styles from "./_autocomplete-user-select.scss";
import classNames from "classnames/bind";
import apiConfig from "base/apiConfig";

let cx = classNames.bind(styles);

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
    fetch(requestUrl, { credentials: "same-origin" })
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          suggestions: json["results"],
        })
      );
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
        to={"/figures/user/" + suggestion["id"]}
        onClick={this.modalTrigger}
      >
        <span className={styles["suggestion-link__user-username"]}>
          {suggestion["username"]}
        </span>
        <span className={styles["suggestion-link__user-name"]}>
          {suggestion["fullname"]}
        </span>
      </Link>
    );

    return (
      <div className={styles["ac-user-selector"]}>
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
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.414 18.414">
                  <g transform="translate(-3.5 -3.5)">
                    <path d="M18.722,11.611A7.111,7.111,0,1,1,11.611,4.5a7.111,7.111,0,0,1,7.111,7.111Z" transform="translate(0)"/>
                    <path d="M28.842,28.842l-3.867-3.867" transform="translate(-8.342 -8.342)"/>
                  </g>
                </svg>
              </span>
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
