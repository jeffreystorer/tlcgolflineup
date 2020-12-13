import { set } from "./localStorage"

export function fetchRoster() {
  //const sheetId = '1iZd64cB_Uih-F1rblddCjRjdzW_VgHCo0ff0F0KMG9Y';
  const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID
  const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY

  const sheetValues =
    "https://sheets.googleapis.com/v4/spreadsheets/" +
    sheetId +
    "/values/GHIN_Numbers" +
    "?key=" +
    apiKey

  var request = new XMLHttpRequest()
  request.open("GET", sheetValues, false) // `false` makes the request synchronous
  request.send(null)

  if (request.status === 200) {
    const data = JSON.parse(request.response)
    let roster = data.values

    try {
      set("roster", roster)
    } catch (error) {
      console.log("error setting roster: " + error)
    }
  }
}

export const indexOfGolfer = (roster, ghinNumber) => {
  var i = 1
  var golferFound = false
  do {
    golferFound = roster[i].includes(ghinNumber)
    i++
  } while (!golferFound)
  return i - 1
}

export const aLocalNumber = (roster, ghinNumber) => {
  return roster[indexOfGolfer(roster, ghinNumber)][1]
}

export const aFirstName = (roster, ghinNumber) => {
  let rawName = roster[indexOfGolfer(roster, ghinNumber)][2]
  let fixedName = rawName.toLowerCase()
  return capitalize(fixedName)
}
const capitalize = (s) => {
  if (typeof s !== "string") return ""
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const anIndex = (roster, ghinNumber) => {
  let rawIndex = roster[indexOfGolfer(roster, ghinNumber)][4]
  let index = Number(rawIndex.replace("+", "-")).toFixed(1)
  return index
}

export const aGender = (roster, ghinNumber) => {
  return roster[indexOfGolfer(roster, ghinNumber)][5]
}
