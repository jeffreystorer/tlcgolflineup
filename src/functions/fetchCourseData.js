function fetchCourseData() {
  const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID;
  const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
  const sheet = 'Course_Data';
  const sheetValues = 'https://sheets.googleapis.com/v4/spreadsheets/' +
    sheetId +
    '/values/' +
    sheet +
    "?key=" +
    apiKey;
  let values;

  var request = new XMLHttpRequest();
  request.open('GET', sheetValues, false); // `false` makes the request synchronous
  request.send(null);

  if (request.status === 200) {
    const data = JSON.parse(request.response);
    try {
      values = data.values;
    } catch (error) {
      console.log('error: ' + error)
    }
  }
  let mratings=[];
  let mslopes=[];
  let mpars=[];
  let wratings=[];
  let wslopes=[];
  let wpars=[];
  let i;
  for (i = 0; i < 6; i++) {
    //console.log("values: " + values[i+1]);
    let data = [];
    values[i+1].splice(0,1);
    data = values[i+1];
    //console.log("data: " + data);
    mratings.push(data);
  }
  for (i = 6; i < 12; i++) {
    //console.log("values: " + values[i+1]);
    let data = [];
    values[i+1].splice(0,1);
    data = values[i+1];
    //console.log("data: " + data);
    mslopes.push(data);
  }
  for (i = 12; i < 18; i++) {
    //console.log("values: " + values[i+1]);
    let data = [];
    values[i+1].splice(0,1);
    data = values[i+1];
    //console.log("data: " + data);
    mpars.push(data);
  }
  for (i = 18; i < 24; i++) {
    //console.log("values: " + values[i+1]);
    let data = [];
    values[i+1].splice(0,1);
    data = values[i+1];
    //console.log("data: " + data);
    wratings.push(data);
  }
  for (i = 24; i < 30; i++) {
    //console.log("values: " + values[i+1]);
    let data = [];
    values[i+1].splice(0,1);
    data = values[i+1];
    //console.log("data: " + data);
    wslopes.push(data);
  }
  for (i = 30; i < 36; i++) {
    //console.log("values: " + values[i+1]);
    let data = [];
    values[i+1].splice(0,1);
    data = values[i+1];
    //console.log("data: " + data);
    wpars.push(data);
  }
  const ratings = [mratings, wratings];
  const slopes = [mslopes, wslopes];
  const pars = [mpars, wpars];
  return [ratings, slopes, pars];
}

export default fetchCourseData;