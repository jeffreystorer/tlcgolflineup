export default function getCourseName(course) {
  let courseName
  switch (course) {
    case "dc":
      courseName = "Deer Creek"
      break
    case "mg":
      courseName = "Magnolia"
      break
    case "mw":
      courseName = "Marshwood"
      break
    case "or":
      courseName = "Oakridge"
      break
    case "pa":
      courseName = "Palmetto"
      break
    case "tp":
      courseName = "Terrapin Point"
      break
    default:
      break
  }
  return courseName
}
