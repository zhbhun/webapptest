import { Axis, Chart, Geom, Tooltip } from 'bizcharts';

import React from 'react';

export interface MiniAreaProps {
  scale?: {
    x?: {
      tickCount: number;
    };
    y?: {
      tickCount: number;
    };
  };
  data: {
    x: number | string;
    y: number;
  }[];
}

const VisualProgress: React.FC<MiniAreaProps> = props => {
  const { data = [], scale = { x: {}, y: {} } } = props;

  const scaleProps = {
    x: {
      ...scale.x,
    },
    y: {
      min: 0,
      range: [0, 1],
      ...scale.y,
    },
  };

  const tooltip: [string, (...args: any[]) => { name?: string; value: string }] = [
    'x*y',
    (x: string, y: string) => ({
      name: x,
      value: y,
    }),
  ];

  return (
    <Chart height={200} data={data} scale={scaleProps} forceFit>
      <Axis
        name="x"
        label={{
          formatter: val => {
            return (val / 1000).toFixed(1) + 's';
          },
        }}
      />
      <Axis
        name="y"
        label={{
          formatter: val => {
            return (val * 100).toFixed(1) + '%';
          },
        }}
      />
      <Tooltip
        crosshairs={{
          type: 'line',
        }}
      />
      <Geom type="area" position="x*y" />
      <Geom type="line" position="x*y" size={2} />
    </Chart>
  );
};

export default VisualProgress;
