import React from 'react';
import createLineupTableHeaderRow from '../functions/createLineupTableHeaderRow';
import { v4 as uuidv4 } from 'uuid';
 

const LineupTableHeader = (teesSelected) => {
  console.log("teesSelected");
  console.table(teesSelected);
  let cols = createLineupTableHeaderRow(teesSelected);
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