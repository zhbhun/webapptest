import React from 'react';
import { Col, Icon, Row, Tooltip } from 'antd';
import { Browsertime } from '../../data.d';
import ChartCard from '../ChartCard';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

/**
 * TODO 添加图表
 */
const Dashboard: React.FC<{ browsertime: Browsertime }> = ({ browsertime }) => {
  const {
    browserScripts: [browserScripts],
    visualMetrics: [visualMetrics],
  } = browsertime;
  return (
    <Row gutter={24} type="flex">
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="First Byte"
          action={
            <Tooltip title="首字节时间：Google 建议服务端响应时间应小于 200 ms">
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={`${browserScripts.timings.navigationTiming.responseStart}ms`}
          footer={
            <div>
              <span>建议时间</span>
              <span>200 ms</span>
            </div>
          }
          contentHeight={46}
        ></ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="Start Render"
          action={
            <Tooltip title="首次渲染时间">
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={`${visualMetrics.FirstVisualChange}ms`}
          footer={
            <div>
              <span>建议时间</span>
              <span>1s</span>
            </div>
          }
          contentHeight={46}
        ></ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="Speed Index"
          action={
            <Tooltip title="速度指数">
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={`${visualMetrics.SpeedIndex}ms`}
          footer={
            <div>
              <span>建议时间</span>
              <span>2.5s</span>
            </div>
          }
          contentHeight={46}
        ></ChartCard>
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="Fully Load"
          action={
            <Tooltip title="完全加载时间">
              <Icon type="info-circle-o" />
            </Tooltip>
          }
          total={`${browserScripts.timings.loadEventEnd}ms`}
          footer={
            <div>
              <span>建议时间</span>
              <span>4s</span>
            </div>
          }
          contentHeight={46}
        ></ChartCard>
      </Col>
    </Row>
  );
};

export default Dashboard;
