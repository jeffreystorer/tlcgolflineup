import React from 'react';
import TeamTable from './TeamTable';
import { v4 as uuidv4 } from 'uuid';
import ButtonDownloadScreenShot from './ButtonDownloadScreenshot'
import { useList} from "react-firebase-hooks/database";
import LineupDataService from "../services/LineupService";

export default function LineupTableAll({ratings, slopes, pars}) {
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
  let 
    teamMembers = [],
    //savedPlayers = [],
    savedCourse, 
    savedGame, 
    savedLinkTime, 
    savedPlayingDate, 
    savedProgs069, 
    savedProgAdj,
    savedTeamTables = [], 
    savedTeeTimeCount, 
    savedTextAreaValue,
    savedTeesSelected = [];

  function setEachTeamsHcpAndProgs(){
    for (let i = 0; i < savedTeeTimeCount; i++){
      let teamName = "team" + i;
      setTeamHcpAndProgs(teamName);
    }
  }

  function setTeamHcpAndProgs(teamName){    
    let teamMembers = savedTeamTables[teamName];
    let aTeamHcp = 0;
    let aTeamProgs = 0;
    try {
      
    let playerCount = teamMembers.length;
    teamMembers.forEach(computeHcpAndProgs);
    switch (Number(savedProgAdj)) {
        case 0:
          switch (Number(savedProgs069)) {
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
        switch (Number(savedProgs069)) {
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
          switch (Number(savedProgs069)) {
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
      let teeNo = savedTeesSelected.indexOf(teeChoice);
      aTeamHcp = aTeamHcp + Number(item.courseHandicaps[teeNo]);
      aTeamProgs = aTeamProgs + (36 - Number(item.courseHandicaps[teeNo]));
    }
  }
  

  function setManualCHCourseHandicaps(teamMembers){
    //iterate through teamMembers
    try {
      for (let i = 0; i < teamMembers.length; i++){
        let aTeeChoice = teamMembers[i].teeChoice;
        let aManualCH = teamMembers[i].manualCH;
        if (aManualCH !== "Auto") {
          let aChosenTeeIndex = savedTeesSelected.indexOf(aTeeChoice);
          for (let j = 0; j < savedTeesSelected.length; j++){
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


  let TeamTables = [];
  function generateTeamTables (){
    for (var i = 0; i < savedTeeTimeCount; i++){
      let teamName = "team" + i;
      teamMembers = savedTeamTables[teamName];
      setManualCHCourseHandicaps(teamMembers);
      //setEachTeamsHcpAndProgs();
      let teamHcp = teamHcpAndProgs[teamName][0];
      let teamProgs = teamHcpAndProgs[teamName][1];
      TeamTables[i] = (
      <TeamTable 
        key={uuidv4()}
        teamNumber={i}
        teamName={teamName}
        teamTables={savedTeamTables}
        teamMembers={teamMembers}
        progs069={savedProgs069}
        teamHcp={teamHcp}
        teamProgs={teamProgs}
        teesSelected={savedTeesSelected}
      />
      )
    }
    return TeamTables;
  }
  
  const LoadLineupFromFirebase = (props) => {
      //savedPlayers = props.players;
      savedCourse = props.course;
      savedGame = props.game; 
      savedLinkTime = props.linkTime; 
      savedPlayingDate = props.playingDate; 
      savedProgs069 = props.progs069; 
      savedProgAdj = props.progAdj;
      savedTeamTables = props.teamTables;
      savedTeeTimeCount = props.teeTimeCount; 
      savedTextAreaValue = props.textAreaValue;
      savedTeesSelected = props.teesSelected;
      return (
          <>
          <br></br><br></br>
          <div id='lineup-page' className='center'>
          <table id="lineup-table">
          <div id='lineup-table-div'>
            <thead className='lineup-table-head'>
              <tr>
                <td>
                  {"Lineup for " + savedGame + ", " + savedPlayingDate + " at " + savedLinkTime + " at " + savedCourse.toUpperCase()}
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
                  value={savedTextAreaValue}
                  >
                  </textarea>
                </td>
              </tr>
            </tfoot>
          </div>
          </table>
            <br></br><br></br>
            <ButtonDownloadScreenShot game={savedGame} course={savedCourse} element='lineup-table-div' format="PNG" page="Lineup" />
            </div>
          </>
        )
      }
    
  const [Lineups, loading, error] = useList(LineupDataService.getAll());
  let savedLineup;
  if (!loading && !error){
    let mondayLineup = Lineups[0];
    savedLineup = mondayLineup.val();
  }

  return(
    <>
    <LoadLineupFromFirebase props={savedLineup.lineup} />
    </>
  )
  
}






