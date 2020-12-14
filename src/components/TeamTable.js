import React from "react"
import "../styles/App.css"
import TeamTableHeader from "./TeamTableHeader"
import { v4 as uuidv4 } from "uuid"

const TeamTable = ({
  teamNumber,
  teamMembers,
  teamTables,
  progs069,
  teamHcp,
  teamProgs,
  teesSelected,
  showTeamHcp,
}) => {
  let rows = teamMembers
  let rowsTD = []
  let teeCount = teesSelected.length
  let playerCount
  if (teamMembers) {
    playerCount = teamMembers.length
  } else {
    playerCount = 0
  }

  function generateRows() {
    for (let i = 0; i < playerCount; i++) {
      rowsTD[i] = (
        <tr key={rows[i].id}>
          <td className="lineup-left-row-cell">{rows[i].playerName}</td>
          {generateCols(i)}
        </tr>
      )
    }
    return rowsTD
  }

  function generateCols(i) {
    let tds = []
    for (var j = 0; j < teeCount; j++) {
      tds[j] = (
        <td className="lineup-other-row-cell" key={uuidv4()}>
          {rows[i].courseHandicaps[j]}
        </td>
      )
    }

    if (showTeamHcp) tds.push(<td key={uuidv4()}>{rows[i].teeChoice}</td>)
    return tds
  }

  return (
    <table className="team-table">
      <thead>
        <TeamTableHeader
          teesSelected={teesSelected}
          teamTables={teamTables}
          teamNumber={teamNumber}
        />
      </thead>
      <tbody>{generateRows()}</tbody>
      <tfoot className="team-table-footer">
        <tr>
          <td colSpan={teeCount + 2}>
            {showTeamHcp ? <span>Team Hcp: {teamHcp}</span> : <></>}
            {progs069 > 0 ? (
              <span>
                &nbsp;&nbsp;Team progs per {progs069}: {teamProgs}
              </span>
            ) : (
              <></>
            )}
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

export default TeamTable
