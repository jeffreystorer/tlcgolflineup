import * as React from "react"
import { ReactPhotoCollage } from "react-photo-collage"
import ButtonDownloadPDF from "./ButtonDownloadPDF"
import "../styles/App.css"

const LineupPDF = ({ title, dataUrl }) => {
  //eslint-disable-next-line
  const [image, setImage] = React.useState(dataUrl)
  const img = new Image()
  img.src = image
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
      { src: dataUrl },
      { src: dataUrl },
      { src: dataUrl },
      { src: dataUrl },
    ],
    showNumOfRemainingPhotos: false,
  }
  let styleWidth = imgDimensions.width + "px"
  let styleHeight = imgDimensions.height + "px"

  return (
    <>
      <div className="center">
        <ButtonDownloadPDF dimensions={imgDimensions} title={title} />
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
