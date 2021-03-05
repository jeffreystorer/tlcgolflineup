import React, { useState, useEffect } from "react"
import TeamTable from "./TeamTable"
import { v4 as uuidv4 } from "uuid"
import ButtonDownloadScreenShot from "./ButtonDownloadScreenshot"
import getCourseName from "../functions/getCourseName"
import getTeesSelectedArray from "../functions/getTeesSelectedArray"
import createLineupTablePlayersArray from "../functions/createLineupTablePlayersArray"
import fetchGamesGHIN from "../functions/fetchGamesGHIN"
import domtoimage from "dom-to-image"

export default function LineupTable({ lineupTitle, lineup }) {
  const [loading, setLoading] = useState(true)
  const [screenShotURL, setScreenShotURL] = useState()
  const [showFirstName, setShowFirstName] = useState(false)
  const [refreshed, setRefreshed] = useState(false)
  let teesSelected = lineup.teesSelected
  let courseName = getCourseName(lineup.course)
  const [showTeamHcp, setShowTeamHcp] = useState(false)
  fetchGamesGHIN(setLoading, lineup.allPlayers)

  useEffect(() => {
    if (!refreshed) setRefreshed(true)
  }, [refreshed])

  useEffect(() => {
    domtoimage
      .toJpeg(document.getElementById("lineup-table-div"), { quality: 0.95 })
      .then(function (dataUrl) {
        //eslint-disable-next-line
        setScreenShotURL(dataUrl)
      })
  })

  function handleShowTeamHcpChange() {
    setShowTeamHcp((prevState) => !prevState)
  }
  function handleShowFirstNameChange() {
    setShowFirstName((prevState) => !prevState)
  }

  let playersArray = createLineupTablePlayersArray(
    showFirstName,
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

  let progAdjMessage = ""
  function setTeamHcpAndProgs(teamName) {
    let teamMembers = teamTables[teamName]
    let aTeamHcp = 0
    let aTeamProgs = 0
    try {
      let playerCount = teamMembers.length
      teamMembers.forEach(computeHcpAndProgs)
      switch (Number(lineup.progAdj)) {
        case 0:
          progAdjMessage = "**No threesome/foursome prog adjustment**"
          switch (Number(lineup.progs069)) {
            case 6:
              aTeamProgs = aTeamProgs / 3
              break
            case 9:
              aTeamProgs = aTeamProgs / 2
              break
            default:
              aTeamProgs = 0
          }
          break
        case 3:
          switch (Number(lineup.progs069)) {
            case 6:
              progAdjMessage = "**Threesome progs include +1 per 6**"
              if (playerCount === 3) {
                aTeamProgs = aTeamProgs / 3 + 1
              } else {
                aTeamProgs = aTeamProgs / 3
              }
              break
            case 9:
              progAdjMessage = "**Threesome progs include +1.5 per 9**"
              if (playerCount === 3) {
                aTeamProgs = aTeamProgs / 2 + 1.5
              } else {
                aTeamProgs = aTeamProgs / 2
              }
              break
            default:
              aTeamProgs = 0
          }
          break
        case 4:
          switch (Number(lineup.progs069)) {
            case 6:
              progAdjMessage = "**Foursome progs include -1 per 6**"
              if (playerCount === 4) {
                aTeamProgs = aTeamProgs / 3 - 1
              } else {
                aTeamProgs = aTeamProgs / 3
              }
              break
            case 9:
              progAdjMessage = "**Foursome progs include -1.5 per 9**"
              if (playerCount === 4) {
                aTeamProgs = aTeamProgs / 2 - 1.5
              } else {
                aTeamProgs = aTeamProgs / 2
              }
              break
            default:
              aTeamProgs = 0
          }
          break
        default:
      }
      let teamProgs = aTeamProgs.toFixed(1)
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

  function setManualCHCourseHandicaps(teamMembers) {
    //iterate through teamMembers
    try {
      for (let i = 0; i < teamMembers.length; i++) {
        let aTeeChoice = teamMembers[i].teeChoice
        let aManualCH = teamMembers[i].manualCH
        if (aManualCH !== "Auto") {
          let teesSelectedArray = teesSelected.map((a) => a.value)
          let aChosenTeeIndex = teesSelectedArray.indexOf(aTeeChoice)
          for (let j = 0; j < teesSelectedArray.length; j++) {
            teamMembers[i].courseHandicaps[j] = "*"
          }
          teamMembers[i].courseHandicaps[aChosenTeeIndex] = aManualCH
          teamMembers[i].playerName = teamMembers[i].playerName + "*"
        }
      }
    } catch (error) {
      console.log("error setting ManualCourseHandicaps")
    }
  }

  let TeamTables = []
  function generateTeamTables() {
    for (var i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = "team" + i
      teamMembers = teamTables[teamName]
      setManualCHCourseHandicaps(teamMembers)
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
          showTeamHcp={showTeamHcp}
        />
      )
    }
    return TeamTables
  }
  if (loading) return "Loading . . ."
  return (
    <>
      <div id="lineup-page" className="center background-white">
        <input
          type="checkbox"
          id="showFirstName"
          onChange={handleShowFirstNameChange}
          defaultChecked={showFirstName}
        ></input>
        <label htmlFor="showFirstName">Show First Name</label>
        <br></br>
        {lineup.progs069 < 1 && (
          <>
            <input
              type="checkbox"
              id="showTeamHcp"
              onChange={handleShowTeamHcpChange}
              defaultChecked={showTeamHcp}
            ></input>
            <label htmlFor="showTeamHcp">Show Team Hcp</label>
          </>
        )}
        <br></br>
        <table id="lineup-table" className="background-white">
          <div id="lineup-table-div" className="background-white">
            <thead className="lineup-table-head background-white">
              <tr className="lineup-table-head background-white">
                <td className="lineup-table-head background-white">
                  {lineup.playingDate + " at " + courseName}
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
              {lineup.progs069 > 0 && (
                <>
                  <tr>
                    <td className="team-table-footer background-white"></td>
                  </tr>
                  <tr>
                    <td className="team-table-footer background-white">
                      {progAdjMessage}
                    </td>
                  </tr>
                </>
              )}
              <tr>
                <td className="center text-area-cell background-white">
                  <textarea
                    id="lineup-textarea"
                    // @ts-ignore
                    rows="10"
                    cols="41"
                    value={lineup.textAreaValue}
                  ></textarea>
                </td>
              </tr>
            </tfoot>
          </div>
        </table>
        <br></br>
        <br></br>
        <ButtonDownloadScreenShot title={lineupTitle} dataUrl={screenShotURL} />
      </div>
    </>
  )
}
