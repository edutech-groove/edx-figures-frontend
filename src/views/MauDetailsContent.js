import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderAreaLayout from 'base/components/layout/HeaderAreaLayout';
import HeaderContentMaus from 'base/components/header-views/header-content-maus/HeaderContentMaus';

class MauDetailsContent extends Component {

  render() {
    let previousValue = undefined;
    const mausRender = this.props.mauHistory.map((period, index) => {
      const difference = (previousValue || (previousValue === 0)) ? (period.value - previousValue) : 'N/A';
      previousValue = period.value;
      return (
        <tr key={index} className='content-row'>
          <td className='period'>{period.period}</td>
          <td className='mau-count'>{period.value}</td>
          <td className={'difference' + ((difference > 0) || (difference === undefined) ? ' positive' : '') + (difference < 0 ? ' negative' : '')}>{(difference > 0) ? "+" : ""}{difference}</td>
        </tr>
      )
    });

    return (
      <div className="ef--layout-root">
        <HeaderAreaLayout>
          <HeaderContentMaus />
        </HeaderAreaLayout>
        <div className='container base-grid-layout mau-details-content'>
          <section className='mau-history-list'>
            <div className='header'>
              <div className='header-title'>
                Monthly Active Users history
              </div>
            </div>
            <div className='stat-card span-4 mau-table-container'>
              <table className='mau-table'>
                <thead>
                  <tr key="header" className='header-row'>
                    <th className='period'>Period</th>
                    <th className='mau-count'>Monthly active users</th>
                    <th className='difference'>Difference vs. previous period</th>
                  </tr>
                </thead>
                <tbody>
                {mausRender.reverse()}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  mauHistory: state.generalData.activeUsers['history']
})

export default connect(
  mapStateToProps,
)(MauDetailsContent)