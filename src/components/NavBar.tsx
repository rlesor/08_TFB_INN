import React from 'react';
import './Bar.css';
import Button from './Button';
import exit from './exit-black.svg';
import { connect } from 'react-redux';
import { RootState } from 'redux/reducers';
import { ExamPage } from 'Types';

interface Props extends PropsFromRedux {
  showChoice: () => void;
}

const NavBar: React.FC<Props> = props => {
  return (
    <div className='navbar'>
      <div className='button-container'>
        <Button classNames='nav-btn exit' onClick={props.showChoice}>
          <img className='nav-img' src={exit} alt='Exit' />
        </Button>
      </div>
      <div className='subject-name-container'>
        <p className='subject-name h2 black navbar-subject'>
          {props.subjectTitle}
        </p>
      </div>
    </div>
  );
};
// Redux related:
const mapStateToProps = (store: RootState) => ({
  subjectTitle: store.examPage === ExamPage.Subject ? store.currentSubject : ''
});

type PropsFromRedux = ReturnType<typeof mapStateToProps>;

const connector = connect(mapStateToProps);

export default connector(NavBar);
