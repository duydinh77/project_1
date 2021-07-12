import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import { Row, Col, Typography } from 'antd';
import Card from './modules/Card/Card';
const { Text } = Typography;

function App() {
  return (
    <div className="App">
      <Row gutter={16}>
        <Col span={8} className="gutter-row">
          <Text strong>Backlog</Text>
          <Card></Card>
        </Col>
        <Col span={8} className="gutter-row">
          <Text strong>Processing</Text>
        </Col>
        <Col span={8} className="gutter-row">
          <Text strong>Done</Text>
        </Col>
      </Row>
    </div>
  );
}

export default App;
