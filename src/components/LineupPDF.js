import * as React from "react"
import { ReactPhotoCollage } from "react-photo-collage"
import ButtonDownloadPDF from "./ButtonDownloadPDF"
import "../styles/App.css"

const LineupPDF = ({ lineupTitle, lineupElement }) => {
  const img = new Image()
  img.src = lineupImg
  let factor = 2.0
  let width = img.width * 2 * factor
  let widthPx = width.toString() + "px"
  let height = img.height * factor
  let heightPx = height.toString() + "px"
  let imgDimensions = { width: width, height: height * 2 }
  const setting = {
    width: widthPx,
    height: [heightPx, heightPx],
    layout: [2, 2],
    photos: [
      { src: lineup },
      { src: lineup },
      { src: lineup },
      { src: lineup },
    ],
    showNumOfRemainingPhotos: false,
  }
  let styleWidth = imgDimensions.width + "px"
  let styleHeight = imgDimensions.height + "px"

  return (
    <>
      <div className="center">
        <ButtonDownloadPDF
          dimensions={imgDimensions}
          title={lineupTitle}
          pdfElement="div-collage"
        />
      </div>
      <br></br>
      <div
        id="div-collage"
        className="background-white center"
        style={{
          width: { styleWidth },
          height: { styleHeight },
        }}
      >
        <ReactPhotoCollage {...setting} />
      </div>
    </>
  )
}
export default LineupPDF
