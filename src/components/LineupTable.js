import React from 'react';
import TeamTable from './TeamTable';
import { v4 as uuidv4 } from 'uuid';
import ButtonDownloadScreenShot from './ButtonDownloadScreenshot';
import getTeesSelectedArray from '../functions/getTeesSelectedArray';

export default function LineupTable({lineup}){
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

  function setEachTeamsHcpAndProgs(){
    for (let i = 0; i < lineup.teeTimeCount; i++){
      let teamName = "team" + i;
      setTeamHcpAndProgs(teamName);
    }
  }

  function setTeamHcpAndProgs(teamName){
    let teamMembers = lineup.teamTables[teamName];
    let aTeamHcp = 0;
    let aTeamProgs = 0;
    try {      
    let playerCount = teamMembers.length;
    teamMembers.forEach(computeHcpAndProgs);
    switch (Number(lineup.progAdj)) {
        case 0:
          switch (Number(lineup.progs069)) {
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
        switch (Number(lineup.progs069)) {
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
          switch (Number(lineup.progs069)) {
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
    } catch (error) {
      console.log("error setting TeamHcpAndProgs")
    }

    function computeHcpAndProgs(item){
      let teeChoice = item.teeChoice;
      let teesSelectedArray = getTeesSelectedArray(lineup.teesSelected);
      let teeNo = teesSelectedArray.indexOf(teeChoice);
      aTeamHcp = aTeamHcp + Number(item.courseHandicaps[teeNo]);
      aTeamProgs = aTeamProgs + (36 - Number(item.courseHandicaps[teeNo]));
    }
  }
  
  let TeamTables = [];
  function generateTeamTables (){
    for (var i = 0; i < lineup.teeTimeCount; i++){
      let teamName = "team" + i;
      teamMembers = lineup.teamTables[teamName];
      setEachTeamsHcpAndProgs();
      let teamHcp = teamHcpAndProgs[teamName][0];
      let teamProgs = teamHcpAndProgs[teamName][1];
      TeamTables[i] = (
      <TeamTable 
        key={uuidv4()}
        teamNumber={i}
        teamTables={lineup.teamTables}
        teamMembers={teamMembers}
        progs069={lineup.progs069}
        teamHcp={teamHcp}
        teamProgs={teamProgs}
        teesSelected={lineup.teesSelected}
      />
      )
    }
    return TeamTables;
  }
  
   return (
    <>
    <br></br><br></br>
    <div id='lineup-page' className='center'>
    <table id="lineup-table">
    <div id='lineup-table-div'>
      <thead className='lineup-table-head'>
        <tr className='lineup-table-head'>
          <td className='lineup-table-head'>
            {lineup.game + 
            ", " + 
            lineup.playingDate + 
            " at " +
            lineup.course.toUpperCase()}
          </td>
        </tr>
        <tr>
          <td></td>
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
            value={lineup.textAreaValue}
            >
            </textarea>
          </td>
        </tr>
      </tfoot>
    </div>
    </table>
      <br></br><br></br>
      <ButtonDownloadScreenShot game={lineup.game} course={lineup.course.toUpperCase()} element='lineup-table-div' format="PNG" page="Lineup" />
      </div>
    </>
  )
}






