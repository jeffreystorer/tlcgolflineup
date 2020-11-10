//set rating, slope, and par
export default function setRatingSlopePar(ratings, slopes, pars, course, tee, gender){
    let rating, slope, par;
    switch(gender) {
        case 'F':
          rating = Number(ratings[1][course][tee]);
          slope = Number(slopes[1][course][tee]);
          par = Number(pars[1][course][tee]);
          break;
        default:
          rating = Number(ratings[0][course][tee]);
          slope = Number(slopes[0][course][tee]);
          par = Number(pars[0][course][tee]);
    }

    return [rating, slope, par]
  
    }