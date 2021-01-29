import * as React from "react"
import { ReactPhotoCollage } from "react-photo-collage"
import ButtonDownloadPDF from "./ButtonDownloadPDF"
import domtoimage from "dom-to-image"
import "../styles/App.css"

const LineupPDF = ({ title }) => {
  const [loading, setLoading] = React.useState(true)
  const [screenShotURL, setScreenShotURL] = React.useState()
  const img = new Image()
  img.src = screenShotURL
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
      { src: screenShotURL },
      { src: screenShotURL },
      { src: screenShotURL },
      { src: screenShotURL },
    ],
    showNumOfRemainingPhotos: false,
  }
  let styleWidth = imgDimensions.width + "px"
  let styleHeight = imgDimensions.height + "px"
  React.useEffect(() => {
    domtoimage
      .toJpeg(document.getElementById("lineup-table-div"), { quality: 0.95 })
      .then(function (screenShotURL) {
        setScreenShotURL(screenShotURL)
        setLoading(false)
      })
  }, [])

  return (
    <>
      {loading ? (
        <p> Loading . . .</p>
      ) : (
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
      )}
    </>
  )
}
export default LineupPDF
