import { Col, Row } from 'antd';
import './BackgroundCustom.css';
import { BlockPicker } from 'react-color';
import { useEffect } from 'react';

const BackgroundCustom = ({
  others,
  compPicker,
  setCompPicker,
  color,
  setColor,
}: myProps) => {
  useEffect(() => {
    const handleEscape = (event: any) => {
      if (event.repeat) return;
      if (event.key === 'Escape') setCompPicker(false);
    };
    window.addEventListener('keyup', handleEscape);
    return () => {
      window.removeEventListener('keyup', handleEscape);
    };
  }, [compPicker]);

  function handleColorChange(color: any, event: any) {
    setColor(color.hex);
  }
  function updatePicker() {
    if (others === true) {
      setCompPicker(!compPicker);
    }
  }
  return (
    <Row justify="center" align="middle" className="background-row">
      <Col className="background" span={12}>
        Background
      </Col>
      <Col className="background" span={12}>
        <button
          style={{ backgroundColor: color }}
          onClick={() => updatePicker()}
          className="my-background"></button>
        <div className="picker-div">
          {compPicker && (
            <BlockPicker
              className="my-picker"
              onChangeComplete={handleColorChange}
              color={color}
            />
          )}
        </div>
      </Col>
    </Row>
  );
};

type myProps = {
  others: boolean;
  compPicker: boolean;
  setCompPicker: any;
  color: string;
  setColor: any;
};
export default BackgroundCustom;
