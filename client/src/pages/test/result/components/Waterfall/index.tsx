import React, { useEffect, useRef } from 'react';
import { Card } from 'antd';
import 'video-react/dist/video-react.css';
import StaticContainer from 'react-static-container';
import { fromHar } from 'perf-cascade';
import 'perf-cascade/dist/perf-cascade.css';

const perfCascadeOptions = {
  rowHeight: 23,
  showAlignmentHelpers: true,
  showMimeTypeIcon: true,
  showIndicatorIcons: false,
  leftColumnWidth: 25,
  showUserTiming: true,
  showUserTimingEndMarker: true,
};

interface VisualMetrics {
  har: object;
}

const VisualMetrics: React.FC<VisualMetrics> = ({ har }) => {
  const container = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      const perfCascadeSvg = fromHar(har, perfCascadeOptions);
      container.current.innerHTML = '';
      container.current.appendChild(perfCascadeSvg);
    }, 0);
  }, [har]);

  return (
    <Card title="Waterfall">
      <StaticContainer>
        <div ref={container} />
      </StaticContainer>
    </Card>
  );
};

export default VisualMetrics;
