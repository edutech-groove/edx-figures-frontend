import React, { Component } from 'react';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

class CustomTooltip extends Component {

  render() {
    const { active } = this.props;

    if (active) {
      const { payload } = this.props;
      return (
        <div className='bar-tooltip'>
          <span className='tooltip-value'>{payload[0].value}</span>
          <p>active users in {payload[0].payload.period}</p>
        </div>
      );
    }

    return null;
  }
}

class HeaderContentMaus extends Component {
  render() {
    let currentPeriodValue = this.props.mauDataCurrent;
    let previousPeriodValue = this.props.mauDataHistory.getIn([this.props.mauDataHistory.size-2, 'value'], 0);
    // let comparisonIcon;
    let comparisonValue;
    if (currentPeriodValue >= previousPeriodValue) {
      // comparisonIcon = <FontAwesomeIcon icon={faCaretUp} />;
      comparisonValue = currentPeriodValue - previousPeriodValue;
    } else {
      // comparisonIcon = <FontAwesomeIcon icon={faCaretDown} />;
      comparisonValue = previousPeriodValue - currentPeriodValue;
    }

    return (
      <section className='header-content-maus'>
        <div className='main-content container'>
          <div className='users-count'>
            <span className='number'>{currentPeriodValue}</span>
            <span className='text'>active users (MAUs) this month</span>
          </div>
          <span className='text-separator' />
          <div className='comparison-box'>
            <div className='comparison-box__upper'>
              <span className='comparison-box__text'>
                {(currentPeriodValue >= previousPeriodValue) ? 'up' : 'down'} {comparisonValue} compared to last month
              </span>
            </div>
            {this.props.showHistoryButton ? (
              <div className='comparison-box__lower'>
                <Link to='/figures/mau-history' className='mau-history-link'>See details</Link>
              </div>
            ) : ''}
          </div>
        </div>
        <div className='graph-container'>
          <ResponsiveContainer width="100%" height={110}>
            {this.props.mauDataHistory.size ? (
              <AreaChart
                data={this.props.mauDataHistory.toJS()}
                margin={{top: 0, bottom: 0, left: 0, right: 0}}
              >
                <Area type='linear' dataKey='value' stroke='none' fill='#ffffff' fillOpacity={0.1} />
                <Tooltip
                  content={<CustomTooltip/>}
                  cursor={{ fill: 'rgba(255, 255, 255, 0.15)'}}
                  offset={0}
                />
              </AreaChart>
            ) : (
              <span className='no-data-label'>Active Users historic data unavailable</span>
            )}
          </ResponsiveContainer>
        </div>
      </section>
    );
  }
}

HeaderContentMaus.defaultProps = {
  showHistoryButton: false
}

const mapStateToProps = (state, ownProps) => ({
  mauDataCurrent: Immutable.fromJS(state.generalData.activeUsers['current_month']),
  mauDataHistory: Immutable.fromJS(state.generalData.activeUsers['history']),
})

export default connect(
  mapStateToProps,
)(HeaderContentMaus)