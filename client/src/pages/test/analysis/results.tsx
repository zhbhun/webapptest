import React from 'react';
import { Col, Card, Form, Icon, Input, Row } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const Search = Input.Search;

interface AnalysisProps {
}

const Analysis: React.FC<AnalysisProps> = ({ ...props }) => {
  console.log(props);
  return (
    <PageHeaderWrapper content="TODO">
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

export default Analysis;
