import axios from 'axios';
import { useEffect, useState } from 'react';
import { UserPopover } from '../utils/UserPopover';
import handleErrors from '../RequestErrors/handleErrors';
import './ScoresHistory.css';
import { BACK_URL } from '../../global';
import UserDto from '../utils/UserDto';
import { useNavigate } from 'react-router-dom';

const ScoresDto = [
  {
    key: '',
    idWinner: '',
    idLoser: '',
    winner: { ...UserDto },
    loser: { ...UserDto },
    ScorePlayer1: 0,
    ScorePlayer2: 0,
    PointsWon: 0,
    PointsLost: 0,
    date: undefined,
  },
];

export function ScoreTab(props: any) {
  const [scores, getScores] = useState(ScoresDto);
  const [scoreLen, getScoreLen] = useState(0);
  const [ok, setOk] = useState(false);
  const currentUser = props.currentUser;
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACK_URL}/scores/history/${props.id}`, { withCredentials: true })
      .then((response) => {
        getScores(response.data);
        getScoreLen(response.data.length);
        setOk(true);
      })
      .catch((error) => {
        handleErrors(error, nav);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getDate(date: any) {
    const newdate = new Date(date);
    const dateString = newdate.toLocaleDateString('fr');
    const hourString = newdate.toString();
    return dateString + hourString.substring(15, hourString.indexOf('GMT') - 4);
  }

  return ok && scoreLen ? (
    <div className="tab">
      <ul className="score-tab">
        <li className="raw">
          {' '}
          Winner
          {scores.map((score) => (
            <i key={score.key} className="data">
              {score.idWinner !== currentUser.account_id ? (
                <UserPopover
                  currentUser={currentUser}
                  user={score.winner}
                  avatarOrUsername={'username'}
                />
              ) : (
                <i style={{ color: '#610b43' }}>
                  {currentUser.accountUsername}
                </i>
              )}
              <br />
              <i
                style={{
                  color: 'green',
                  fontSize: 10,
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                }}>
                +{score.PointsWon} points
              </i>
            </i>
          ))}
        </li>
        <li className="raw">
          {' '}
          Loser
          {scores.map((score) => (
            <i key={score.key} className="data">
              {score.idLoser !== currentUser.account_id ? (
                <UserPopover
                  currentUser={currentUser}
                  user={score.loser}
                  avatarOrUsername={'username'}
                />
              ) : (
                <i style={{ color: '#610b43' }}>
                  {' '}
                  {currentUser.accountUsername}
                </i>
              )}
              <br />
              <i
                style={{
                  color: 'red',
                  fontSize: 10,
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                }}>
                -{score.PointsLost} points
              </i>
            </i>
          ))}
        </li>
        <li className="raw">
          {' '}
          Score
          {scores.map((score) => (
            <i key={score.key} className="data">
              <div className="res-score">
                <i className="score">
                  {score.ScorePlayer1 > score.ScorePlayer2
                    ? score.ScorePlayer1
                    : score.ScorePlayer2}
                </i>
                <i className="vl" />
                <i className="score">
                  {score.ScorePlayer1 <= score.ScorePlayer2
                    ? score.ScorePlayer1
                    : score.ScorePlayer2}
                </i>
              </div>
            </i>
          ))}
        </li>
        <li className="raw">
          {' '}
          Date
          {scores.map((score) => (
            <i key={score.key} className="data">
              {getDate(score.date)}
            </i>
          ))}
        </li>
      </ul>
    </div>
  ) : (
    <div style={{ color: '#5700DE' }}>No scores yet</div>
  );
}
