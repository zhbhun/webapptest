import React, { useCallback, useState } from 'react';
import { connect } from 'dva';
import { Col, Card, Form, Icon, Input, Row } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi-plugin-react/locale';

const Search = Input.Search;

interface AnalysisProps {
  submitting: boolean;
  dispatch: Function;
}

const Analysis: React.FC<AnalysisProps> = ({ submitting, dispatch }) => {
  const [url, setUrl] = useState('');
  const handleURLChange = useCallback(event => {
    setUrl(event.target.value);
  }, []);
  const handleSubmit = useCallback(() => {
    if (!submitting) {
      dispatch({
        type: 'testAnalysis/submit',
        payload: url,
      });
    }
  }, [submitting, url]);
  return (
    <PageHeaderWrapper content={<FormattedMessage id="test-analysis.introduce" />}>
      <Card>
        <Row type="flex" justify="center">
          <Col xs={24} sm={22} md={20} lg={18} xl={16} xxl={14}>
            <Form layout="vertical">
              <Form.Item label="请输入待分析应用的 URL 地址">
                <Search
                  addonBefore={<Icon type="zoom-in" />}
                  placeholder="ex: https://www.example.org/"
                  enterButton="分析我的应用"
                  size="large"
                  onChange={handleURLChange}
                  onSearch={handleSubmit}
                  type="url"
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['testAnalysis/submit'] || false,
}))(Analysis);
