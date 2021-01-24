import React from "react"
import domtoimage from "dom-to-image"
import { saveAs } from "../functions/fileSaver.js"

const ButtonDownLoadScreenshot = ({
  title,
  game,
  course,
  element,
  format,
  page,
}) => {
  function handleClick() {
    let fileName
    if (page === "Lineup") {
      fileName = title
    } else {
      fileName = "Course Handicaps for " + game + " at " + course
    }
    if (format === "PNG") {
      domtoimage.toBlob(document.getElementById(element)).then(function (blob) {
        saveAs(blob, fileName + ".png")
      })
    }
    if (format === "JPEG") {
      domtoimage
        .toJpeg(document.getElementById(element), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement("a")
          link.download = fileName + ".jpeg"
          link.href = dataUrl
          link.click()
        })
    }
  }
  return (
    <button className="center" onClick={handleClick}>
      Download Screenshot
    </button>
  )
}
export default ButtonDownLoadScreenshot
