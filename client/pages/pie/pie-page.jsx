import React from 'react';
import PieChart from 'react-simple-pie-chart';

export default class PiePage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <PieChart className = "pie"
      slices={[
        {
          color: '#f00',
          value: 10
        },
        {
          color: '#0f0',
          value: 20
        }
      ]}
    />;
  }
}
