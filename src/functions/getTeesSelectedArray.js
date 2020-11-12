  
export default function getTeesSelectedArray(teesSelected) {
  let teesSelectedArray = teesSelected.teesSelected.map(a => a.value);
  console.table(teesSelectedArray)
  return teesSelectedArray;
}