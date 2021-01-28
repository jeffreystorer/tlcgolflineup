import React from "react"
import domtoimage from "dom-to-image"

const ButtonDownLoadScreenshot = ({ title, lineupElement }) => {
  function handleClick() {
    domtoimage
      .toJpeg(document.getElementById(lineupElement), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a")
        link.download = title + ".jpeg"
        link.href = dataUrl
        link.click()
      })
  }
  return (
    <button className="center" onClick={handleClick}>
      Download Screenshot
    </button>
  )
}
export default ButtonDownLoadScreenshot
