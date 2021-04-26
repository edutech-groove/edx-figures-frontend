import React, { Component } from 'react';

class StatHorizontalBarGraph extends Component {

  render() {
    let maxValue = 0;

    if (this.props.dataType !== 'percentage') {
      this.props.data.forEach((dataSingle, index) => {
        if (dataSingle[this.props.valueLabel] > maxValue) {
          maxValue = dataSingle[this.props.valueLabel];
        }
      });
    };

    const graphRender = this.props.data.map((dataSingle, index) => {
      const barWidth = (this.props.dataType === 'percentage') ? (dataSingle[this.props.valueLabel]*100 + '%') : (dataSingle[this.props.valueLabel]/maxValue*100 + '%');

      return (
        <tr key={dataSingle[this.props.labelLabel]} className='horizontal-bar-wrapper'>
          <td className='label-container'>
            <span className='label-text'>{dataSingle[this.props.labelLabel]}</span>
          </td>
          <td className='label-container'>
            <span className='label-value'>{(this.props.dataType === 'percentage') ? (dataSingle[this.props.valueLabel]*100 + '%') : dataSingle[this.props.valueLabel]}</span>
          </td>
          <td className='bar-container'>
            <div className="line-wrapper">
              <span className='bar-line' style={{width: barWidth}} />
            </div>
          </td>
        </tr>
      );
    });

    return (
      <table className='horizontal-bar-chart'>
        {graphRender}
      </table>
    );
  }
}

StatHorizontalBarGraph.defaultProps = {
  graphHeight: 140,
  dataType: 'number',
  valueLabel: 'value',
  labelLabel: 'label',
}

export default StatHorizontalBarGraph;
