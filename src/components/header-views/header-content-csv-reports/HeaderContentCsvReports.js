
import React, { Component } from 'react';

class HeaderContentCsvReports extends Component {
  render() {

    return (
      <section className='header-content-reports-list container'>
        <div className='title-container'>
          <div className='title-text'>CSV Downloadable Reports</div>
          <div className='subtitle-text'>Download sets of your site data in CSV format.</div>
          <span className='title-decoration' />
        </div>
      </section>
    );
  }
}

HeaderContentCsvReports.defaultProps = {

}

export default HeaderContentCsvReports;
