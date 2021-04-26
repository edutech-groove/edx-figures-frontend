import React, { Component } from "react";
import PropTypes from "prop-types";
import HeaderNav from "base/components/layout/HeaderNav";
// import { NavLink } from "react-router-dom";
// import figuresLogo from "base/images/logo/figures--logo--negative.svg";

class HeaderAreaLayout extends Component {
  render() {
    return (
      <div
        className="grv-theme--header-area header-area"
      >
        <div className="header-top container">
          {/* <NavLink to="/figures" className="header-logo-container">
            <img src={figuresLogo} alt="Figures" role="presentation" />
          </NavLink> */}
          <HeaderNav />
        </div>
        {this.props.children}
      </div>
    );
  }
}

HeaderAreaLayout.propTypes = {
  children: PropTypes.node,
};

export default HeaderAreaLayout;
