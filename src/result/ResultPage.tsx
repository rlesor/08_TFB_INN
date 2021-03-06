import React from 'react';
import './ResultPage.css';

import { RootState } from 'redux/reducers';
import { connect } from 'react-redux';
import { joinAndCapitalize } from '../Util';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResultsDocument from '../result/ResultsDocument';
import Button from '../components/Button';

const ResultPage: React.FC<PropsFromRedux> = props => {
  return (
    <div className='content'>
      <div className='choice-content white-background'>
        <p className='choice-title'>Resultat for {props.username}</p>
        <PDFDownloadLink
          document={
            <ResultsDocument
              username={props.username}
              subjectResultsList={props.results}
              devices={props.units}
            />
          }
          fileName={'Digiklar-resultat ' + props.username + '.pdf'}>
          {({ blob, url, loading, error }) =>
            loading ? (
              <Button
                classNames='regular-btn download white bluegrey-background'
                onClick={() => {
                  return;
                }}>
                Gjør klart resultat...
              </Button>
            ) : (
              <Button
                classNames='regular-btn download white teal-background'
                onClick={() => {
                  return;
                }}>
                Last ned resultat
              </Button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

// Redux related:

const mapStateToProps = (store: RootState) => ({
  username: store.username,
  units: joinAndCapitalize(store.units),
  results: store.subjectResultList
});

type PropsFromRedux = ReturnType<typeof mapStateToProps>;

const connector = connect(mapStateToProps);

export default connector(ResultPage);
