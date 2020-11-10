import React from 'react';
import '../styles/App.css';
import LineupTable from './LineupTable';
import fetchCourseData from '../functions/fetchCourseData';

export default function LineupPage() {  
  const [ratings, slopes, pars] = fetchCourseData();

  return (
    <>
      <LineupTable ratings={ratings} slopes={slopes} pars={pars}/>
    </>
  );
}

