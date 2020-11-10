/* import React from 'react';
import html2canvas from 'html2canvas';
import LineupTableAll from './LineupTableAll';

export default function ScreenShot(){
  html2canvas($('#lineup-table'), {  
    onrendered: function (canvas) {
        var canvasImg = canvas.toDataURL("image/jpg");
        $('#canvasImg').html('<img src="'+canvasImg+'" alt="">');
    }
});
  return(
    <>
    <div id='canvasImg'></div>
    </>
  )

} */