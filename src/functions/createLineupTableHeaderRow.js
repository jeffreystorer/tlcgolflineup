import getTeesSelectedArray from '../functions/getTeesSelectedArray';

export default function createLineupTableHeaderRow(teesSelected) {
  let teesSelectedArray = getTeesSelectedArray(teesSelected)
  teesSelectedArray.unshift("");
  return teesSelectedArray;
}