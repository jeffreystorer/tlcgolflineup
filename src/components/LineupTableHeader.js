import React from 'react';
import createGamesAndLineupTableHeaderRow from '../functions/createGamesAndLineupTableHeaderRow';
import { v4 as uuidv4 } from 'uuid';
 

const LineupTableHeader = (teesSelected) => {
  let cols = createGamesAndLineupTableHeaderRow(teesSelected);
  const getHeader = () => {
    cols.shift();
    var keys = cols;
    return keys.map((key, index)=>{
    return (
      <th className='lineup-other-header-cell' key={uuidv4()}>
        {key}
      </th>
    )})
  }

    return (
        <>
          <tr>
          <th className="lineup-left-header-cell">
            </th>
            {getHeader()}
          </tr>
        </>
    );
  }

  export default LineupTableHeader;