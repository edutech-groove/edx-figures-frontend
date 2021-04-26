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