import React, { useState } from 'react';
import '../App.css';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult } from '../Types';

interface Props {
  text: string; //hva det blir spurt om
  maxPoints: number; //1
  measures: string; //kartleggingsmål
  buttonValues: [string]; //eksternt ?
  correctAlt: string; //riktig alternativ
  
  getResult: (result: QuestionResult) => void; //??
}
/*
props: string title
func create question (content, correctAns, ) eksternt
  createseveralbuttons([a,b,c,d], b)
  func: set riktig alternativ [b] - riktig svar
array: content for buttons (eksternt) [a, b, c, d] 

func: velg et alternativ (internt)
func: sjekk om det er riktig alternativ (internt)

chosenButton = 0
onClick: chosen button = this.

*/


const SeveralButton: React.FC<Props> = props => {
  const [input, setInput] = useState('');
  const [points, setPoints] = useState(props.maxPoints);
  const [buttonValues, setButtonValues] = useState(props.buttonValues);

  
  
  
  const checkInput = (value: string) => {
    if (value === props.text) {
      //setColor('green');
      props.getResult({
        maxPoints: props.maxPoints,
        measures: props.measures,
        pointsAchieved: points
      });
    } else {
      const newPoints = points > 0 ? points - 1 : 0;
      setPoints(newPoints);
      setColor('red');
    }
  };

  const storeInput = (e: React.FormEvent<HTMLInputElement>) => {
    setColor('black');
    setInput(e.currentTarget.value);
  };

  /*
  this.state.data.map(function(item, i){
  console.log('test');
  return <li key={i}>Test</li>
})
  */

  return (
    <div>
      <h1 className='h1'>{props.text}</h1>
      <div>
        <ul>
        {props.buttonValues.map((item, i) =>  
          <li key={i}>
          <Button onClick = {() => console.log("nada")} >
            hello 
          </Button>
          </li>
        )}
        </ul>



      </div>
      <form
        className='textAndBtns'
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
        <input
          id='name'
          className={`inputField ${color}`}
          type='text'
          onKeyUp={e => storeInput(e)}
          placeholder={props.text}
        />
        <Button classNames='next' onClick={() => checkInput(input)}>
          Neste
        </Button>
      </form>
      
    </div>
  );
};

export default SeveralButton;
