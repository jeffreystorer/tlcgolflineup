import React, { useState, useEffect } from "react"
import TeamTable from "./TeamTable"
import { v4 as uuidv4 } from "uuid"
import ButtonDownloadScreenShot from "./ButtonDownloadScreenshot"
import getTeesSelectedArray from "../functions/getTeesSelectedArray"
import createLineupTablePlayersArray from "../functions/createLineupTablePlayersArray"
import fetchGamesGHIN from "../functions/fetchGamesGHIN"
import { set } from "../functions/localStorage"

export default function LineupTable({ lineup }) {
  const [refreshed, setRefreshed] = useState(false)
  set("teesSelected", lineup.teesSelected)
  const dataMode = "ghin"
  fetchGamesGHIN(dataMode, lineup.allPlayers)

  useEffect(() => {
    if (!refreshed) setRefreshed(true)
  }, [refreshed])

  let playersArray = createLineupTablePlayersArray(
    lineup.course,
    lineup.game,
    lineup.games,
    lineup.teesSelected,
    lineup.ratings,
    lineup.slopes,
    lineup.pars,
    lineup.teamTables,
    lineup.teeTimeCount
  )
  let teamTables = updateTeamTables()
  let teamHcpAndProgs = {
    team0: [0, 0],
    team1: [0, 0],
    team2: [0, 0],
    team3: [0, 0],
    team4: [0, 0],
    team5: [0, 0],
    team6: [0, 0],
    team7: [0, 0],
    team8: [0, 0],
    team9: [0, 0],
  }
  let teamMembers = []

  function updateTeamTables() {
    let teamTables = lineup.teamTables
    for (let i = 0; i < lineup.teeTimeCount; i++) {
      let aTeamName = "team" + i
      try {
        let aPlayerCount = teamTables[aTeamName].length
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = teamTables[aTeamName][j].id
          let aPlayerObj = playersArray.find((obj) => obj.id === aTeamMemberId)
          teamTables[aTeamName][j].playerName = aPlayerObj.playerName
          teamTables[aTeamName][j].courseHandicaps = aPlayerObj.courseHandicaps
        }
      } catch (error) {
        console.log("error updating Team Tables")
      }
    }
    return teamTables
  }

  function setEachTeamsHcpAndProgs() {
    for (let i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = "team" + i
      setTeamHcpAndProgs(teamName)
    }
  }

  function setTeamHcpAndProgs(teamName) {
    let teamMembers = teamTables[teamName]
    let aTeamHcp = 0
    let aTeamProgs = 0
    try {
      let playerCount = teamMembers.length
      teamMembers.forEach(computeHcpAndProgs)
      switch (Number(lineup.progAdj)) {
        case 0:
          switch (Number(lineup.progs069)) {
            case 6:
              aTeamProgs = aTeamProgs / 3
              break
            case 9:
              aTeamProgs = aTeamProgs / 2
              break
            default:
              aTeamProgs = 0
              break
          }
          break
        default:
          break
        case 3:
          switch (Number(lineup.progs069)) {
            case 6:
              if (playerCount === 3) {
                aTeamProgs = aTeamProgs / 3 + 1
              } else {
                aTeamProgs = aTeamProgs / 3
              }
              break
            case 9:
              if (playerCount === 3) {
                aTeamProgs = aTeamProgs / 2 + 1.5
              } else {
                aTeamProgs = aTeamProgs / 2
              }
              break
            default:
              aTeamProgs = 0
              break
          }
          break
        case 4:
          switch (Number(lineup.progs069)) {
            case 6:
              if (playerCount === 4) {
                aTeamProgs = aTeamProgs / 3 - 1
              } else {
                aTeamProgs = aTeamProgs / 3
              }
              break
            case 9:
              if (playerCount === 4) {
                aTeamProgs = aTeamProgs / 2 - 1.5
              } else {
                aTeamProgs = aTeamProgs / 2
              }
              break
            default:
              aTeamProgs = 0
              break
          }
          break
      }
      let teamProgs = aTeamProgs.toFixed(1)
      // @ts-ignore
      aTeamProgs = teamProgs
      teamHcpAndProgs[teamName][0] = aTeamHcp
      teamHcpAndProgs[teamName][1] = aTeamProgs
    } catch (error) {
      console.log("error setting TeamHcpAndProgs")
    }

    function computeHcpAndProgs(item) {
      let teeChoice = item.teeChoice
      let teesSelectedArray = getTeesSelectedArray(lineup.teesSelected)
      let teeNo = teesSelectedArray.indexOf(teeChoice)
      aTeamHcp = aTeamHcp + Number(item.courseHandicaps[teeNo])
      aTeamProgs = aTeamProgs + (36 - Number(item.courseHandicaps[teeNo]))
    }
  }

  let TeamTables = []
  function generateTeamTables() {
    for (var i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = "team" + i
      teamMembers = teamTables[teamName]
      setEachTeamsHcpAndProgs()
      let teamHcp = teamHcpAndProgs[teamName][0]
      let teamProgs = teamHcpAndProgs[teamName][1]
      TeamTables[i] = (
        <TeamTable
          key={uuidv4()}
          teamNumber={i}
          teamTables={teamTables}
          teamMembers={teamMembers}
          progs069={lineup.progs069}
          teamHcp={teamHcp}
          teamProgs={teamProgs}
          teesSelected={lineup.teesSelected}
        />
      )
    }
    return TeamTables
  }

  return (
    <>
      <br></br>
      <br></br>
      <div id="lineup-page" className="center background-white">
        <table id="lineup-table" className="background-white">
          <div id="lineup-table-div" className="background-white">
            <thead className="lineup-table-head background-white">
              <tr className="lineup-table-head background-white">
                <td className="lineup-table-head background-white">
                  {lineup.game +
                    ", " +
                    lineup.playingDate +
                    " at " +
                    lineup.course.toUpperCase()}
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="background-white">{generateTeamTables()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="center text-area-cell background-white">
                  <textarea
                    id="lineup-textarea"
                    // @ts-ignore
                    rows="8"
                    cols="39"
                    value={lineup.textAreaValue}
                  ></textarea>
                </td>
              </tr>
            </tfoot>
          </div>
        </table>
        <br></br>
        <br></br>
        <ButtonDownloadScreenShot
          game={lineup.game}
          course={lineup.course.toUpperCase()}
          element="lineup-table-div"
          format="JPEG"
          page="Lineup"
        />
      </div>
    </>
  )
}
