import React, { useState, useEffect} from 'react';
import TeamTable from './TeamTable';
import { v4 as uuidv4 } from 'uuid';
import {useRecoilValue, useRecoilState} from 'recoil';
import * as state from '../state';
import createLineupTablePlayersArray from '../functions/createLineupTablePlayersArray';
import LineupsList from './LineupsList';
//import { get, set } from '../functions/localStorage';
import { useList } from "react-firebase-hooks/database";
import LineupDataService from "../services/LineupService";
import ButtonDownloadScreenShot from './ButtonDownloadScreenshot';

export default function LineupTableAll({ratings, slopes, pars}) {
  //eslint-disable-next-line
  const ghinNumber = useRecoilValue(state.ghinNumberState);
 const [course, setCourse] = useRecoilState(state.courseState);
  const [game, setGame] = useRecoilState(state.gameState);
  const games = useRecoilValue(state.gamesState);
  const teesSelected = useRecoilValue(state.teesSelectedState);
  const teamTablesObj = {
    times: [],
    team0:[],
    team1:[],
    team2:[],
    team3:[],
    team4:[],
    team5:[],
    team6:[],
    team7:[],
    team8:[],
    team9:[],
  }
  let teamHcpAndProgs =
  {
    team0:[0,0],
    team1:[0,0],
    team2:[0,0],
    team3:[0,0],
    team4:[0,0],
    team5:[0,0],
    team6:[0,0],
    team7:[0,0],
    team8:[0,0],
    team9:[0,0],
  }
  let teamMembers = [];
  const [teamTables, setTeamTables] = useState(teamTablesObj);
  const [linkTime, setLinkTime] = useState("Time");
  const [teeTimeCount, setTeeTimeCount] = useState("");
  const [playingDate, setPlayingDate] = useState("Date");
  const [textAreaValue, setTextAreaValue] = useState("[Bets, Entry, Prize, Rules]");
  const [progs069, setProgs069] = useState("0");
  const [progAdj, setProgAdj] = useState("0");
  //trick the component into rerendering with tee choice changes
  //eslint-disable-next-line
  const [teeChoiceChangedId, setTeeChoiceChangedId] = useState(0);
  //eslint-disable-next-line
  const [overrideCHChoiceChangedId, setOverrideCHChoiceChangedId] = useState(0);

  useEffect(() => {
    setEachTeamsHcpAndProgs();
    return () => {
    setEachTeamsHcpAndProgs();
    }
  }, )

  
  let playersArray = createLineupTablePlayersArray(course, game, games, teesSelected, ratings, slopes, pars, teamTables, teeTimeCount, randomTeams);
  //eslint-disable-next-line
  const [players, setPlayers] = useState(playersArray);

  

  function setEachTeamsHcpAndProgs(){
    for (let i = 0; i < teeTimeCount; i++){
      let teamName = "team" + i;
      setTeamHcpAndProgs(teamName);
    }
  }

  function setTeamHcpAndProgs(teamName){    
    let teamMembers = teamTables[teamName];
    let aTeamHcp = 0;
    let aTeamProgs = 0;
    try {
      
    let playerCount = teamMembers.length;
    teamMembers.forEach(computeHcpAndProgs);
    switch (Number(progAdj)) {
        case 0:
          switch (Number(progs069)) {
            case 6:
              aTeamProgs = aTeamProgs/3
              break;
            case 9:
              aTeamProgs = aTeamProgs/2
              break;
            default:
              aTeamProgs = 0;
              break;
          }
          break;
        default:
          break;
      case 3:
        switch (Number(progs069)) {
          case 6:
            if (playerCount === 3) {
              aTeamProgs = aTeamProgs/3 + 1
            } else {
              aTeamProgs = aTeamProgs/3
            }
            break;
          case 9:
            if (playerCount === 3) {
              aTeamProgs = aTeamProgs/2 + 1.5
            } else {
              aTeamProgs = aTeamProgs/2
            }
            break;
          default:
            aTeamProgs = 0;
            break;
        }
        break;
        case 4:
          switch (Number(progs069)) {
            case 6:
              if (playerCount === 4) {
                aTeamProgs = aTeamProgs/3 - 1
              } else {
                aTeamProgs = aTeamProgs/3
              }
              break;
            case 9:
              if (playerCount === 4) {
                aTeamProgs = aTeamProgs/2 - 1.5
              } else {
                aTeamProgs = aTeamProgs/2
              }
              break;
            default:
              aTeamProgs = 0;
              break;
          }
          break;
      };
    let teamProgs = aTeamProgs.toFixed(1);
    aTeamProgs = teamProgs;
    teamHcpAndProgs[teamName][0] = aTeamHcp;
    teamHcpAndProgs[teamName][1] = aTeamProgs;
    //set('savedTeamHcpAndProgs', teamHcpAndProgs);
    } catch (error) {
      console.log("error setting TeamHcpAndProgs")
    }

    function computeHcpAndProgs(item){
      let teeChoice = item.teeChoice;
      let teesSelectedArray = teesSelected.map(a => a.value)
      let teeNo = teesSelectedArray.indexOf(teeChoice);
      aTeamHcp = aTeamHcp + Number(item.courseHandicaps[teeNo]);
      aTeamProgs = aTeamProgs + (36 - Number(item.courseHandicaps[teeNo]));
    }
  }
  

  function setTeeChoice(aTeamNumber, anId, aTeeChoice){
    let teamName = "team" + aTeamNumber;
    const playerIndex = teamTables[teamName].findIndex(player => player.id === Number(anId));
    teamTables[teamName][playerIndex].teeChoice = aTeeChoice;
    //set('savedTeamTables', teamTables);
  }

  function setManualCHCourseHandicaps(teamMembers){
    //iterate through teamMembers
    try {
      for (let i = 0; i < teamMembers.length; i++){
        let aTeeChoice = teamMembers[i].teeChoice;
        let aManualCH = teamMembers[i].manualCH;
        if (aManualCH !== "Auto") {
          let teesSelectedArray = teesSelected.map(a => a.value);
          let aChosenTeeIndex = teesSelectedArray.indexOf(aTeeChoice);
          for (let j = 0; j < teesSelectedArray.length; j++){
            teamMembers[i].courseHandicaps[j]="*"
          }
          teamMembers[i].courseHandicaps[aChosenTeeIndex] = aManualCH;
          teamMembers[i].playerName = teamMembers[i].playerName + "*"
        }
      }

    } catch (error) {
          console.log("error setting ManualCourseHandicaps")
    }
  }

  function setTeeChoice(aTeamNumber, anId, aTeeChoice){
    let teamName = "team" + aTeamNumber;
    const playerIndex = teamTables[teamName].findIndex(player => player.id === Number(anId));
    teamTables[teamName][playerIndex].teeChoice = aTeeChoice;
    //set('savedTeamTables', teamTables);
  }
  let manualCHList =[];
  manualCHList.push("*");
  manualCHList.push("Auto");
  for (let i = -10; i < 61; i++) manualCHList.push(i);
  const manualCHOptionItems = manualCHList.map((manualCH) =>
    <option key ={uuidv4()} value={manualCH}>{manualCH}</option>);

  const playerNameList = getPlayersNotInTeeTime(players, teamTables);
  let TeamTables = [];
  function generateTeamTables (){
    for (var i = 0; i < teeTimeCount; i++){
      let teamName = "team" + i;
      teamMembers = teamTables[teamName];
      setManualCHCourseHandicaps(teamMembers);
      setEachTeamsHcpAndProgs();
      //teamHcpAndProgs = get('savedTeamHcpAndProgs');
      let teamHcp = teamHcpAndProgs[teamName][0];
      let teamProgs = teamHcpAndProgs[teamName][1];
      TeamTables[i] = (
      <TeamTable 
        key={uuidv4()}
        teamNumber={i}
        teamName={teamName}
        teamTables={teamTables}
        teamMembers={teamMembers}
        playerNameList={playerNameList}
        progs069={progs069}
        teamHcp={teamHcp}
        teamProgs={teamProgs}
      />
      )
    }
    return TeamTables;
  }
  function loadLineupFromFirebase({
    players,
    course, 
    game, 
    linkTime, 
    playingDate, 
    progs069, 
    progAdj,
    teamTables, 
    teeTimeCount, 
    textAreaValue
    }){
        setPlayers(players);
        setCourse(course);
        setGame(game);
        setLinkTime(linkTime);
        setPlayingDate(playingDate);
        setProgs069(progs069);
        setProgAdj(progAdj)
        if (teamTables) {
          setTeamTables(teamTables)
          } else {
          setTeamTables(teamTablesObj)
        };
        setTeeTimeCount(teeTimeCount);
        setTextAreaValue(textAreaValue);
    }
    
  
  //const [Lineups] = useList(LineupDataService.getAll());
 
  return (
  <>
  <div id='lineup-page' className='center'>
  <table id="lineup-table">
  <div id='lineup-table-div'>
    <thead className='lineup-table-head'>
      <tr>
        <td>
          {"Lineup for " + game + ", " + playingDate + " at " + linkTime + " at " + course.toUpperCase()}
        </td>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
        {generateTeamTables()}
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td className='center text-area-cell'>
          <textarea 
          id='lineup-textarea'
          rows="8" cols="39"
          value={textAreaValue}
          onFocus={event => event.target.value = textAreaValue}
          >
          </textarea>
        </td>
      </tr>
    </tfoot>
  </div>
  </table>
    <br></br><br></br>
    <ButtonDownloadScreenShot game={game} course={course} element='lineup-table-div' format="PNG" page="Lineup" />
    </div>
  </>
  )
}

export const getPlayersNotInTeeTime = (playersList, teamTables) => {
  const{ team0 = [], team1 = [], team2 = [], team3 = [], team4 = [], team5 = [], team6 = [], team7 = [], team8 = [], team9 = []} = teamTables;
  return playersList.filter(player => {
      return !(team0.find(p => p.id === player.id) ||
      team1.find(p => p.id === player.id) ||
      team2.find(p => p.id === player.id) ||
      team3.find(p => p.id === player.id) ||
      team4.find(p => p.id === player.id) ||
      team5.find(p => p.id === player.id) ||
      team6.find(p => p.id === player.id) ||
      team7.find(p => p.id === player.id) ||
      team8.find(p => p.id === player.id) ||
      team9.find(p => p.id === player.id));
  });
}






