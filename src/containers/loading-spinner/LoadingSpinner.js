import React from 'react';
import { HashLoader } from 'react-spinners';
import { usePromiseTracker } from "react-promise-tracker";

const appsemblerBlue = '#E60978';

const LoadingSpinner = props => {

  const { promiseInProgress } = usePromiseTracker();

  return (
    <section className='loading-spinner-root-container'>
      {promiseInProgress && (
        <div className='spinner-container'>
          <div className='spinner-container__content'>
            <HashLoader
              color={appsemblerBlue}
            />
            <span>Loading your data...</span>
          </div>
        </div>
      )}
      <div className={'main-content' + (promiseInProgress ? ' blurred' : '')}>
        {props.children}
      </div>
    </section>
  )
}

export default LoadingSpinner;
