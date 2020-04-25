import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult, QuestionResultType, UserInformation } from '../Types';

interface Props {
  maxPoints: number;
  resultTitle: string;
  userInformation: UserInformation;
  updateResult: (result: QuestionResult) => void;
}

const TextInput: React.FC<Props> = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [points, setPoints] = useState(props.maxPoints);
  const [feedback, setFeedback] = useState('');
  const [color, setColor] = useState('black');
  const [clickedWhileCorrect, setClickedWhileCorrect] = useState(false);

  const checkInput = () => {
    console.log(password === props.userInformation.password);
    console.log(username);
    if (clickedWhileCorrect) {
      props.updateResult({
        mastered: true,
        type: QuestionResultType.Mastery,
        answerValues: [],
        maxPoints: props.maxPoints,
        resultTitle: props.resultTitle,
        pointsAchieved: points
      });
    } else {
      if (
        password === props.userInformation.password &&
        username === props.userInformation.username
      ) {
        setColor('green');
        setFeedback('Gratulerer, du er nå logget inn!');
        setClickedWhileCorrect(true);
      } else {
        const newPoints = points - 1;
        setPoints(newPoints >= 0 ? newPoints : 0);
        setColor('red');
        setFeedback('Feil passord eller brukernavn');
      }
    }
  };

  return (
    <div>
      <h1 className='h1'>Logg inn med informasjonen under</h1>
      <h2 className='h2'>Brukernavn: "{props.userInformation.username}"</h2>
      <h2 className='h2'>Passord: "{props.userInformation.password}"</h2>
      <form
        className='text-and-btn'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='username'
          className={`input-field ${color}`}
          type='text'
          onChange={e => setUsername(e.currentTarget.value)}
          placeholder='Username'
        />
        <input
          id='password'
          className={`input-field ${color}`}
          type='text'
          onChange={e => setPassword(e.currentTarget.value)}
          placeholder='Password'
        />
        <h2 className={`feedback ${color}`}>{feedback}</h2>
        <Button classNames='next' onClick={checkInput}>
          Neste
        </Button>
      </form>
    </div>
  );
};

export default TextInput;
