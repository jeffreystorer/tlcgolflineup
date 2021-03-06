import React, { useState, useEffect } from "react"
import { ReactPhotoCollage } from "react-photo-collage"
import ButtonDownloadPDF from "./ButtonDownloadPDF"
import "../styles/App.css"

const LineupPDF = ({ title, dataUrl }) => {
  const [loading, setLoading] = useState(true)
  const [setting, setSetting] = useState()
  const img = new Image()
  img.src = dataUrl
  let factor = 2.0
  let width = img.width * 2 * factor
  let widthPx = width.toString() + "px"
  let height = img.height * factor
  let heightPx = height.toString() + "px"
  let imgDimensions = { width: width, height: height * 2 }
  let styleWidth = imgDimensions.width + "px"
  let styleHeight = imgDimensions.height + "px"
  const Collage = () => <ReactPhotoCollage {...setting} />

  useEffect(() => {
    setSetting({
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
    })
    setLoading(false)
  }, [widthPx, heightPx, dataUrl])

  return (
    <>
      {loading ? (
        <p> Loading . . .</p>
      ) : (
        <>
          <div className="center">
            <br></br>
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
            <Collage />
          </div>
        </>
      )}
    </>
  )
}
export default LineupPDF
