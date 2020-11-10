import {set} from './localStorage';

function fetchPlayersAndGames (ghinNumber) {
  const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY

  const sheetValues =  'https://sheets.googleapis.com/v4/spreadsheets/' +
               sheetId + 
               '/values/' + 
               ghinNumber + 
               "?key=" + 
               apiKey;

    var request = new XMLHttpRequest();
    request.open('GET', sheetValues, false);  // `false` makes the request synchronous
    request.send(null);
  
    if (request.status === 200) {
      const data =JSON.parse(request.response);
      console.log('data');
      try {
        createPlayersAndGames(data.values);
      } catch (error){
        console.log('error: ' + error)
      };
    }

}

function createPlayersAndGames (values) {

  function createAndSavePlayerTable(){
    let rowCount = values.length;
    
    let playerTable = [];
    let i;
    for (i = 0; i < rowCount; i++){
      playerTable.push(values[i]);
    }
    //set('playerTable', JSON.stringify(playerTable));
    setGamesAndPlayers(playerTable);
  }
  function setGamesAndPlayers(playerTable){    
    playerTable[0].splice(0,2);
    playerTable[0].unshift('All');
    set('games', playerTable[0]);
    playerTable.splice(0,1);
    addFirstNameIndexGenderLocalCols(playerTable);
    set('players', playerTable);
  }

  function addFirstNameIndexGenderLocalCols(playerTable){
    let i;
    for (i = 0; i < playerTable.length; i++) {
      playerTable[i].splice(2,0, "", "", "", "");
    }
  }
  createAndSavePlayerTable();
}

export default fetchPlayersAndGames;