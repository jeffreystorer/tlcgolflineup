import {tees, courses} from '../data';
import setRatingSlopePar from './setRatingSlopePar';


export default function createLineupTablePlayersArrray (
  allPlayers, 
  course, 
  game, 
  games, 
  teesSelected, 
  ratings, 
  slopes, 
  pars, 
  teamTables,
  teeTimeCount) {

  //declare some variables
  let players = allPlayers;
  var playersArray = [];
  let strHcpIndex;
  let hcpIndex;
  let gender;

  //next, we build an array of tees
  let teesSelectedArray = buildTeeArray();

  //filter players, then add them
  function addRow(item, index){
    let gameNumber = games.indexOf(game);
    switch(gameNumber) {
      case 0:
        doAdd(item, index)
        break;
      default:
        let gameIndex = gameNumber + 5;
        if ((item[gameIndex] === "Yes")|| (item[gameIndex] === "YES") || (item[gameIndex] === 'yes')){
          doAdd(item, index);
        }
    }
  }

  //construct the row
  function compute(aPlayer, index) {
    strHcpIndex = aPlayer[3];
    hcpIndex = parseFloat(strHcpIndex);
    let firstName = aPlayer[2];
    let lastName = aPlayer[1];
    gender = aPlayer[4];
    let player = firstName + ' ' + lastName + " (" + strHcpIndex + ")";
    let playerReturn = {
      id: Number(aPlayer[0]),
      playerName: player,
      courseHandicaps: [],
      teeChoice: "",
      manualCH: "Auto"
    };
    let i;
    for (i=0; i < teesSelectedArray.length; i++){
      //here is where we compute the course handicap of the golfer for each of the selected tees
      let courseNumber = courses.indexOf(course);
      let teeNumber = tees.indexOf(teesSelectedArray[i]);
      const [rating, slope, par] = setRatingSlopePar(ratings, slopes, pars, courseNumber, teeNumber, gender);
      playerReturn.courseHandicaps.push(doMath(rating, slope, par))
    };
    playerReturn.teeChoice = teesSelectedArray[0];
    return playerReturn;
  }

  //compute the course handicap
  function doMath(rating, slope, par){
    if (rating === 0) {
      return "-"
    } else {
        if (strHcpIndex === 'guest'){
          return 0
        } else {
          return Math.round((hcpIndex * (slope / 113)) + (rating - par)); 
        }
    }
}

  //build array of tees
  function buildTeeArray() {
    let teesSelectedArray = teesSelected.map(a => a.value);
    return teesSelectedArray;
  }

  //add a row for each player
  function doAdd(item, index) {
    let aPlayer = item;
    var newRow = compute(aPlayer, index);
    playersArray.push(newRow);
  }

  function updateTeamTables(){
    for (let i = 0; i < teeTimeCount; i++) {
      let aTeamName = "team" + i;
      try {
      let aPlayerCount = teamTables[aTeamName].length;
      for (let j = 0; j < aPlayerCount; j++){
        let aTeamMemberId = teamTables[aTeamName][j].id;
        let aPlayerObj = playersArray.find(obj => 
          obj.id === aTeamMemberId
        )
        teamTables[aTeamName][j].playerName = aPlayerObj.playerName;
        teamTables[aTeamName][j].courseHandicaps = aPlayerObj.courseHandicaps;
      }
      } catch (error) {
        console.log("error updating Team Tables");
      }

    }
  }
  players.forEach(addRow);
  updateTeamTables();
}