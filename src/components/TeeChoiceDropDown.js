import React from 'react';

const TeeChoiceDropDown = ({
  teeChoice,
  teeChoiceOptionItems,
  playerId,
  teamNumber,
  baseTee
}) => {

  return(
    <td className='select-dropdown-container'>
    <label className='embedded-selector'>
      <select id={teamNumber} name={playerId} defaultValue={baseTee} value={teeChoice}>
        {teeChoiceOptionItems}
      </select>
    </label>
    </td>
  )
}
export default TeeChoiceDropDown;
