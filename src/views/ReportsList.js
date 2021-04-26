import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchReportsList } from 'base/redux/actions/Actions';
import HeaderAreaLayout from 'base/components/layout/HeaderAreaLayout';
import HeaderContentReportsList from 'base/components/header-views/header-content-reports-list/HeaderContentReportsList';

class ReportsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportsList: this.props.reportsList,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        reportsList: nextProps.reportsList,
      })
    }
  }

  componentDidMount() {
    this.props.fetchReportsList(this.props.userId)
  }

  render() {
    const listItems = this.state.reportsList.map((report, index) => {
      return (
        <li key={index} className='report'>
          <div className='report-name'>
            <Link
              to={'/figures/report/' + report.reportId}
              className='view-report-button'
            >
              {report.reportName}
            </Link>
          </div>
          <div className='report-description'>
            {report.reportDescription}
          </div>
          <div className='report-timestamp'>
            {report.dateCreated}
          </div>
          <div className='report-buttons'>
            <Link
              to={'/figures/report/' + report.reportId}
              className='view-report-button'
            >
              View report
            </Link>
          </div>
        </li>
      )
    })

    return (
      <div className="ef--layout-root">
        <HeaderAreaLayout>
          <HeaderContentReportsList />
        </HeaderAreaLayout>
        <ul className='container reports-list'>
          <li key='list-header' className='report list-header'>
            <div className='report-name'>
              Report name:
            </div>
            <div className='report-description'>
              Report description:
            </div>
            <div className='report-timestamp'>
              Time created:
            </div>
            <div className='report-buttons'>
            </div>
          </li>
          {listItems}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  userId: state.userData.userId,
  reportsList: state.reportsList.reportsData,
})

const mapDispatchToProps = dispatch => ({
  fetchReportsList: userId => dispatch(fetchReportsList(userId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsList)
