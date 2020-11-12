  
export default function getTeesSelectedArray(teesSelected) {
  let teesSelectedArray = teesSelected.map(a => a.value);
  return teesSelectedArray;
}