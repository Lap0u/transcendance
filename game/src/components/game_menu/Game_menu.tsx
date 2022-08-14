import {useState, useEffect} from 'react'
import { Button, Space, version } from "antd";
import { useNavigate } from 'react-router-dom';

const GameMenu = () => {
  
  const [inMatchmaking, setMatchmaking] = useState(false);
  
	const navigate = useNavigate();
  const joinMatchmaking = () =>{
    setMatchmaking(!inMatchmaking)
  }
  useEffect(() => {
    let timerId : any;
  
    if (inMatchmaking) {
      timerId = setTimeout(() => {
        navigate('/home');
      }, 1500);
    }
    return () => clearTimeout(timerId);
  }, [inMatchmaking, navigate]);

	var matchmakingButton = inMatchmaking ? "Exit Matchmaking" : "Join Matchmaking"
  return (
    <div>
      <h1>antd version: {version}</h1>
      <Space>
        <Button onClick={joinMatchmaking} type="primary">{matchmakingButton}</Button>
      </Space>
    </div>
  );
};

export default GameMenu;