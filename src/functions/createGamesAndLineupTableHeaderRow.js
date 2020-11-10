  
export default function createGamesAndLineupTableHeaderRow(teesSelected) {
  let teesSelectedArray = teesSelected.map(a => a.value);
  //add a blank column over the player
  teesSelectedArray.unshift("");
  return teesSelectedArray;
}