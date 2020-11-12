import React from 'react';
import { useList} from "react-firebase-hooks/database";
import LineupDataService from "../services/LineupService";
import LineupTable from './LineupTable';

export default function LineupPage() {
  const [Lineups, loading, error] = useList(LineupDataService.getAll());
  let lineup;

  if (!loading && !error){
    let mondayLineup = Lineups[0];
    let savedLineup = mondayLineup.val();
    lineup = savedLineup.lineup;
  }
  
  if (!loading && !error){
    return(
      <>
      <LineupTable lineup={lineup} />
      </>
    )
  } else {
    return null
  }  
}






