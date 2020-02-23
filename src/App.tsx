import React, { useState } from 'react';
import './App.css';
import FrontPage from 'frontpage/FrontPage';
import Examination from 'examination/Examination';
import { roundToInt } from './Helpers';

export enum Page {
  Examination,
  FrontPage
}

interface State {
  currentPage: Page;
}

const App: React.FC<{}> = props => {
  const [currentPage, setCurrentPage] = useState(Page.FrontPage);

  const changePage = (page: Page) => {
    setCurrentPage(page);
  };

  const fpExample = [
    { name: 'Lvl 1', username: '', avatar: 'jadda', status: 'new' },
    { name: 'Lvl 2', username: '', avatar: 'avatar', status: 'new' },
    { name: 'Lvl 2', username: 'Gerd', avatar: 'jadda', status: 'paused' },
    { name: 'Lvl 2', username: 'Peder', avatar: 'avatar', status: 'paused' },
    { name: 'Lvl 2', username: 'Ali', avatar: 'jadda', status: 'paused' },
    { name: 'Lvl 2', username: 'Ole', avatar: 'avatar', status: 'paused' }
  ];

  const examExample = {
    currentQuestion: roundToInt(0),
    questions: ['start', 'username', 'end']
  };

  switch (currentPage) {
    case Page.FrontPage:
      /* fetch available examinations from local storage (or backend API) and pass
         them to FrontPage */
      return (
        <FrontPage availableExaminations={fpExample} changePage={changePage} />
      );

    /* fetch questions and question props from local storage (or backend API)
       and pass them to Examination */
    case Page.Examination:
      return <Examination {...examExample} />;
  }
};

export default App;
