import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateReportName, fetchReport } from 'base/redux/actions/Actions';
import { Link } from 'react-router-dom';
import ContentEditable from 'base/components/inputs/ContentEditable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faTrashAlt, faFilePdf, faPrint, faAngleRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

class HeaderReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportName: this.props.reportName,
      controlsExpanded: false,
    };

    this.editReportData = this.editReportData.bind(this);
  }

  editReportData = (evt) => {
    this.setState({
      reportName: evt.target.value,
    });
  }

  expandControls = () => {
    this.setState({
      controlsExpanded: !this.state.controlsExpanded,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        reportName: nextProps.reportName,
      })
    }
  }

  componentDidMount() {
    this.props.fetchReport(this.props.reportId)
  }

  render() {

    return (
      <section className='header-content-report'>
        <div className='main-content container'>
          <div className='content-top'>
            <Link
              to='/figures/reports'
              className='back-link'
            >
              Back to reports list
            </Link>
            <ContentEditable
              className='report-title'
              html={this.state.reportName}
              dataLabel={'reportTitle'}
              onChange={this.editReportData}
              onBlur={() => this.props.updateReportName(this.state.reportName)}
            />
          </div>
          <div className='content-bottom'>
            <span className='title-underline'></span>
            <div className='controls-container'>
              <button key="save-button" className='button-main'>Save report</button>
              {this.state.controlsExpanded && [
                <span key="separator-1" className='controls-separator'></span>,
                <button key="duplicate-button" className='button-secondary'>
                  <FontAwesomeIcon icon={faCopy} className='button-icon' />
                </button>,
                <button key="trash-button" className='button-secondary'>
                  <FontAwesomeIcon icon={faTrashAlt} className='button-icon' />
                </button>,
                <button key="pdf-button" className='button-secondary'>
                  <FontAwesomeIcon icon={faFilePdf} className='button-icon' />
                </button>,
                <button key="print-button" className='button-secondary'>
                  <FontAwesomeIcon icon={faPrint} className='button-icon' />
                </button>,
                <span key="separator-2" className='controls-separator'></span>,
              ]}
              <button onClick={() => this.expandControls()} key="expand-button" className='button-secondary button-more'>
                {this.stateControlsExpanded ? (
                  <FontAwesomeIcon icon={faAngleRight} className='button-icon' />
                ) : (
                  <FontAwesomeIcon icon={faEllipsisH} className='button-icon' />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

HeaderReport.defaultProps = {

}

const mapStateToProps = (state, ownProps) => ({
  reportName: state.report.reportName,
})

const mapDispatchToProps = dispatch => ({
  updateReportName: newName => dispatch(updateReportName(newName)),
  fetchReport: reportId => dispatch(fetchReport(reportId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderReport)
