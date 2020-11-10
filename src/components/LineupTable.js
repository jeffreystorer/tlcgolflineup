import React, {useEffect} from 'react';
import '../styles/App.css';
import LineupTableAll from './LineupTableAll';
import {get, set} from '../functions/localStorage'
import {useRecoilState} from 'recoil';
import * as state from '../state';
import fetchGamesGHIN from '../functions/fetchGamesGHIN';

export default function LineupTable({ratings, slopes, pars}) { 
  const dataMode = 'ghin';
  //eslint-disable-next-line
  const [games, setGames] = useRecoilState(state.gamesState)
  //eslint-disable-next-line
  const [teesSelected, setTeesSelected] = useRecoilState(state.teesSelectedState);
  //eslint-disable-next-line
  const [ghinNumber, setGHINNumber] = useRecoilState(state.ghinNumberState);
 

  useEffect(() => {
    setGHINNumber(get('ghinNumber'));
    setGames(get('games'));
    setTeesSelected(get('teesSelected'));
  //eslint-disable-next-line
  }, [])

  fetchGamesGHIN(dataMode);

      return(
        <>
          <LineupTableAll ratings={ratings} slopes={slopes} pars={pars} />
        </>
      )
}
