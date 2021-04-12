import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import styles from './_mau-details-content.scss';
import HeaderAreaLayout from 'base/components/layout/HeaderAreaLayout';
import HeaderContentMaus from 'base/components/header-views/header-content-maus/HeaderContentMaus';

let cx = classNames.bind(styles);


class MauDetailsContent extends Component {

  render() {
    let previousValue = undefined;
    // const mockData = [{"period":"2021/01","value":7},{"period":"2021/02","value":8},{"period":"2021/03","value":33},{"period":"2021/04","value":9}]; // MOCKDATA
    // const mausRender = mockData.map((period, index) => {
    const mausRender = this.props.mauHistory.map((period, index) => {
      const difference = (previousValue || (previousValue === 0)) ? (period.value - previousValue) : 'N/A';
      previousValue = period.value;
      return (
        <tr key={index} className={styles['content-row']}>
          <td className={styles['period']}>{period.period}</td>
          <td className={styles['mau-count']}>{period.value}</td>
          <td className={cx({ 'difference': true, 'positive': ((difference > 0) || (difference === undefined)), 'negative': (difference < 0)})}>{(difference > 0) ? "+" : ""}{difference}</td>
        </tr>
      )
    });

    return (
      <div className="ef--layout-root">
        <HeaderAreaLayout>
          <HeaderContentMaus />
        </HeaderAreaLayout>
        <div className={cx({ 'container': true, 'base-grid-layout': true, 'mau-details-content': true})}>
          <section className={styles['mau-history-list']}>
            <div className={styles['header']}>
              <div className={styles['header-title']}>
                Monthly Active Users history
              </div>
            </div>
            <div className={cx({ 'stat-card': true, 'span-2': false, 'span-3': false, 'span-4': true, 'mau-table-container': true})}>
              <table className={styles['mau-table']}>
                <thead>
                  <tr key="header" className={styles['header-row']}>
                    <th className={styles['period']}>Period</th>
                    <th className={styles['mau-count']}>Monthly active users</th>
                    <th className={styles['difference']}>Difference vs. previous period</th>
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
