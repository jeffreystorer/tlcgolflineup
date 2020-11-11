import React from 'react';
import '../styles/App.css';
import LineupTableAll from './LineupTableAll';

export default function LineupTable({ratings, slopes, pars}) { 

      return(
        <>
          <LineupTableAll ratings={ratings} slopes={slopes} pars={pars} />
        </>
      )
}
