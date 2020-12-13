import { tees, courses } from "../data"
import { get } from "./localStorage"
import setRatingSlopePar from "./setRatingSlopePar"

export default function createLineupTablePlayersArrray(
  course,
  game,
  games,
  teesSelected,
  ratings,
  slopes,
  pars,
  teamTables,
  teeTimeCount
) {
  const players = get("players")

  //declare some variables
  var playersArray = []
  let strHcpIndex
  let hcpIndex
  let gender

  //next, we build an array of tees
  let teesSelectedArray = buildTeeArray()

  //filter players, then add them
  function addRow(item, index) {
    let gameNumber = games.indexOf(game)
    switch (gameNumber) {
      case 0:
        doAdd(item, index)
        break
      default:
        let gameIndex = gameNumber + 5
        if (
          item[gameIndex] === "Yes" ||
          item[gameIndex] === "YES" ||
          item[gameIndex] === "yes"
        ) {
          doAdd(item, index)
        }
    }
  }

  //construct the row
  function compute(aPlayer, index) {
    strHcpIndex = aPlayer[3]
    hcpIndex = parseFloat(strHcpIndex)
    let anIndex = hcpIndex.toFixed(1)
    let firstName = aPlayer[2]
    let lastName = aPlayer[1]
    gender = aPlayer[4]
    let player = firstName + " " + lastName + " (" + anIndex + ")"
    let playerReturn = {
      id: Number(aPlayer[0]),
      playerName: player,
      courseHandicaps: [],
      teeChoice: "",
      manualCH: "Auto",
    }
    let i
    for (i = 0; i < teesSelectedArray.length; i++) {
      //here is where we compute the course handicap of the golfer for each of the selected tees
      let courseNumber = courses.indexOf(course)
      let teeNumber = tees.indexOf(teesSelectedArray[i])
      const [rating, slope, par] = setRatingSlopePar(
        ratings,
        slopes,
        pars,
        courseNumber,
        teeNumber,
        gender
      )
      playerReturn.courseHandicaps.push(doMath(rating, slope, par))
    }
    playerReturn.teeChoice = teesSelectedArray[0]
    return playerReturn
  }

  //compute the course handicap
  function doMath(rating, slope, par) {
    if (rating === 0) {
      return "-"
    } else {
      if (strHcpIndex === "guest") {
        return 0
      } else {
        return Math.round(hcpIndex * (slope / 113) + (rating - par))
      }
    }
  }

  //build array of tees
  function buildTeeArray() {
    let teesSelectedArray = teesSelected.map((a) => a.value)
    return teesSelectedArray
  }

  //add a row for each player
  function doAdd(item, index) {
    let aPlayer = item
    var newRow = compute(aPlayer, index)
    playersArray.push(newRow)
  }

  players.forEach(addRow)
  return playersArray
}
