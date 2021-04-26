
import React, { Component } from 'react';

class HeaderContentReportsList extends Component {
  render() {

    return (
      <section className='header-content-reports-list container'>
        <div className='title-container'>
          <div className='title-text'>Reports list</div>
          <span className='title-decoration' />
        </div>
        <div className='options-container'>
          <button className='header-option-button'>Create a new report</button>
        </div>
      </section>
    );
  }
}

HeaderContentReportsList.defaultProps = {

}

export default HeaderContentReportsList;
