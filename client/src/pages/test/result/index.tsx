import React, { useEffect } from 'react';
import { Col, Card, Descriptions, Row, Skeleton } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import PageLoading from '@/components/PageLoading';
import Dashboard from './components/Dashboard';
import VisualMetrics from './components/VisualMetrics';
import Waterfall from './components/Waterfall';
import { TestInfo, ResultData } from './data.d';
import styles from './style.less';

const PageHeaderContent: React.FC<{ testInfo: TestInfo | undefined }> = ({ testInfo }) => {
  const loading = testInfo && Object.keys(testInfo).length;
  if (!loading) {
    return <Skeleton paragraph={{ rows: 2 }} active />;
  }
  const { url = '', timestamp = '', browser = '', network = '', localtion = '' } = testInfo || {};
  return (
    <Descriptions title="质量和性能报告">
      <Descriptions.Item label="URL">{url}</Descriptions.Item>
      <Descriptions.Item label="时间">{timestamp}</Descriptions.Item>
      <Descriptions.Item label="浏览器">{browser}</Descriptions.Item>
      <Descriptions.Item label="网络">{network}</Descriptions.Item>
      <Descriptions.Item label="位置">{localtion}</Descriptions.Item>
    </Descriptions>
  );
};

interface ResultProps {
  match: {
    params: {
      id: string;
    };
  };
  dispatch: Function;
  testResult: ResultData;
}

const Result: React.FC<ResultProps> = ({
  match: {
    params: { id },
  },
  dispatch,
  testResult,
}) => {
  useEffect(() => {
    return () => {
      dispatch({
        type: 'testResult/clear',
        payload: id,
      });
    };
  }, []);
  useEffect(() => {
    dispatch({
      type: 'testResult/fetch',
      payload: id,
    });
  }, [id]);
  const { stage, info, browsertime, har } = testResult;
  return (
    <PageHeaderWrapper content={<PageHeaderContent testInfo={info} />} title={false}>
      {stage === 0 ? (
        <>
          <Dashboard browsertime={browsertime} />
          <VisualMetrics browsertime={browsertime} />
          <Waterfall har={har} />
        </>
      ) : (
        <PageLoading />
      )}
    </PageHeaderWrapper>
  );
};

export default connect(
  ({
    testResult,
    loading,
  }: {
    testResult: ResultData;
    loading: { effects: { [key: string]: boolean } };
  }) => ({
    testResult,
    submitting: loading.effects['testResult/fetch'] || false,
  }),
)(Result);
