import getTeesSelectedArray from './getTeesSelectedArray';

export default function createTeamTableHeaderRow(teesSelected) {
  let teesSelectedArray = getTeesSelectedArray(teesSelected)
  teesSelectedArray.unshift("");
  return teesSelectedArray;
}