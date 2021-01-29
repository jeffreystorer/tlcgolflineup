import React from "react"
import LineupPDF from "./LineupPDF"

const ButtonDownLoadScreenshot = ({ title, dataUrl }) => {
  function handleClick() {
    var link = document.createElement("a")
    link.download = title + ".jpeg"
    link.href = dataUrl
    link.click()
  }
  return (
    <>
      <button className="center" onClick={handleClick}>
        Download Screenshot
      </button>
      <LineupPDF title={title} dataUrl={dataUrl} />
    </>
  )
}
export default ButtonDownLoadScreenshot
