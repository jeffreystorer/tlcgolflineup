import { get, set } from "../functions/localStorage"

import {
  fetchRoster,
  aLocalNumber,
  aFirstName,
  anIndex,
  aGender,
} from "../functions/fetchRoster"

export default function fetchGamesGHIN(dataMode) {
  let players = get("players")
  if (dataMode === "ghin") {
    let requests = []
    players.forEach(buildRequests)

    Promise.all(requests)
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json()
          })
        )
      })
      .then((data) => addGHINDataToPlayers(data))

    function addGHINDataToPlayers(data) {
      players.forEach(addData)
      function addData(item, index) {
        try {
          let firstName = data[index].golfers[0].FirstName
          let rawName = firstName.toLowerCase()
          firstName = capitalize(rawName)
          if (firstName.indexOf(".") > 0) firstName = firstName.toUpperCase()
          item[2] = firstName
        } catch (error) {
          item[2] = ""
          item[3] = "guest"
          item[5] = "00000"
          return
        }
        item[3] = data[index].golfers[0].Value
        item[4] = data[index].golfers[0].Gender
        item[5] = localNumber(data[index])
      }

      set("players", players)
    }

    const localNumber = (golfer) => {
      const targetIndex = golfer.golfers.findIndex(
        (item) => item.ClubId === "13961"
      )
      if (targetIndex > -1) {
        return golfer.golfers[targetIndex].Local
      } else {
        return "00000"
      }
    }

    function buildRequests(item, index) {
      let ghinNumber = item[0]
      let lastName = item[1]
      let ghinRequest =
        "https://api2.ghin.com/api/v1/golfermethods.asmx/FindGolfer.json?activeOnly=true&username=GHIN2020&password=GHIN2020&club=0&association=0&ghinNumber=" +
        ghinNumber +
        "&lastName=" +
        lastName +
        "&incllsudeLowHandicapIndex=true"
      requests = [...requests, fetch(ghinRequest)]
    }
  } else {
    fetchRoster()
    let roster = get("roster")
    players.forEach(addData)

    function addData(item, index) {
      let ghinNumber = item[0]
      try {
        let firstName = aFirstName(roster, ghinNumber)
        if (firstName.indexOf(".") > 0) firstName = firstName.toUpperCase()
        item[2] = firstName
      } catch (error) {
        item[2] = ""
        item[3] = "guest"
        item[5] = "00000"
        return
      }
      item[3] = anIndex(roster, ghinNumber)
      item[4] = aGender(roster, ghinNumber)
      item[5] = aLocalNumber(roster, ghinNumber)
    }
    set("players", players)
  }

  const capitalize = (s) => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
}
