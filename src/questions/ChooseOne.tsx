import React, { useState } from 'react';
import './Question.css';
import Button from '../components/Button';
import { QuestionResult } from '../Types';
import FlowButtons from 'components/FlowButtons';
import { makeOtherResult, imageAnswer } from 'helpers/makeResult';

interface Props {
  subjectColor: string;
  text: string;
  resultTitle: string;
  illustration?: string;
  isImage: boolean;
  answerValues: string[];
  updateResult: (result: QuestionResult) => void;
  skipQuestion: () => void;
}

const ChooseOne: React.FC<Props> = props => {
  const [selectedButton, setSelectedButton] = useState<number>();

  const returnResult = (result: number | undefined) => {
    setSelectedButton(undefined);
    if (result === undefined) {
      props.updateResult(makeOtherResult(props, ['Jeg får ikke dette til']));
    } else {
      props.updateResult(
        makeOtherResult(
          props,
          props.isImage
            ? [imageAnswer(props.answerValues[result])]
            : [props.answerValues[result]]
        )
      );
    }
  };

  return (
    <div className='content'>
      <div className={`question-text-container ${props.subjectColor}`}>
        <p className='h2 white normal-font'>{props.text}</p>
      </div>

      <div className='input-container white-background'>
        {props.illustration === undefined ? (
          ''
        ) : (
          <div className='image-container'>
            <img
              className='illustration-image'
              src={props.illustration}
              alt={'Illustration'}
            />
          </div>
        )}
        <div className='multiple-button-container'>
          {props.answerValues.map((item, i) => (
            <Button
              key={i}
              classNames={`multi-btn answer-btn  regular-btn ${
                selectedButton === i ? 'selected' : ''
              }`}
              onClick={() => setSelectedButton(i)}>
              {props.isImage ? (
                <div className='image-container'>
                  <img
                    className='illustration-image'
                    src={item}
                    alt={`Button ${i}`}
                  />
                </div>
              ) : (
                item
              )}
            </Button>
          ))}
        </div>
      </div>
      <FlowButtons
        skip={() => {
          returnResult(undefined);
        }}
        update={() => {
          if (selectedButton !== undefined) returnResult(selectedButton);
        }}
      />
    </div>
  );
};

export default ChooseOne;
