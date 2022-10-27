import { Row, Col, Select } from 'antd';
import { useState } from 'react';
import './gamesettings.css';
const { Option } = Select;

const GameSettings = (props: any) => {
  const [set, setSet] = useState(false);

  function handleLimit(value: string) {
    const newObj = props.settings;
    newObj.point_limit = value;
    setSet(!set);
    props.setSettings(newObj);
  }

  function handleSpeed(value: string) {
    const newObj = props.settings;
    newObj.ball_speed = value;
    setSet(!set);
    props.setSettings(newObj);
  }

  function powerupClick() {
    const newObj = props.settings;
    newObj.powerup = !props.settings.powerup;
    setSet(!set);
    props.setSettings(newObj);
  }
  let res = props.settings.powerup ? 'true' : 'false';
  res += ' powerup-button';
  return (
    <div className="settings-table">
      <Row className="settings-raw">
        <Col className="settings-title" span={24}>
          Global game settings
        </Col>
      </Row>
      <Row className="settings-raw">
        <Col span={12}>Powerups</Col>
        <Col span={12} className="powerup-box">
          <button onClick={() => powerupClick()} className={res}></button>
        </Col>
      </Row>
      <Row className="settings-raw">
        <Col span={12}>Point limit</Col>
        <Col span={12}>
          <Select
            className="select-1"
            onChange={handleLimit}
            defaultValue={'20'}>
            <Option className="option-1" value="1">
              1
            </Option>
            <Option className="option-1" value="10">
              10
            </Option>
            <Option className="option-1" value="20">
              20
            </Option>
            <Option className="option-1" value="50">
              50
            </Option>
            <Option className="option-1" value="100">
              100
            </Option>
          </Select>
        </Col>
      </Row>
      <Row className="settings-raw">
        <Col span={12}>Ball speed</Col>
        <Col span={12}>
          <Select
            className="select-2"
            onChange={handleSpeed}
            defaultValue={'100'}>
            <Option className="option-1" value="50">
              50 %
            </Option>
            <Option className="option-1" value="75">
              75 %
            </Option>
            <Option className="option-1" value="100">
              100 %
            </Option>
            <Option className="option-1" value="125">
              125 %
            </Option>
            <Option className="option-1" value="150">
              150 %
            </Option>
          </Select>
        </Col>
      </Row>
    </div>
  );
};

export default GameSettings;
