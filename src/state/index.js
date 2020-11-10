import { atom, selector } from "recoil";

export const dataModeState = atom({
  key: 'dataModeState',
  default: "ghin"
})

export const ghinNumberState = atom({
  key: "ghinNumberState",
  default: "585871",
})

export const lastNameState = atom({
  key: "lastNameState",
  default: "",
})
export const courseState = atom({
  key: "courseState",
  default: "",
});

export const gameState = atom({
  key: "gameState",
  default: "",
});

export const ratingsState = atom({
  key: "ratingsState",
  default: [],
})
export const slopesState = atom({
  key: "slopesState",
  default: [],
})
export const parsState = atom({
  key: "parsState",
  default: [],
})

export const indexState = atom({
  key: "indexState",
  default: "0.0",
})

export const firstNameState = atom({
  key: "firstNameState",
  default: "First"
})

export const genderState = atom({
  key: "genderState",
  default: "M"
})

export const playersState = atom({
  key: "playersState",
  default: [],
})

export const gamesState = atom({
  key: "gamesState",
  default: [],
})

export const sheetURLState = atom ({
  key: "sheetURLState",
  default: []
})

export const hasGoogleSheetState = atom ({
  key: "hasGoogleSheetState",
  default: "false",
})

export const teesSelectedState = atom ({
  key: "teesSelectedState",
  default: [],
})

export const loadDeleteSaveLineupsState = atom({
  key: "loadDeleteSavedLineupsState",
  default: false,
})

export const golferStateSelector = selector({
  key: "golferStateSelector",
  get:  ({ get }) => {
    const golfer = 
      get(firstNameState)+ " " + 
      get(lastNameState) +
      " (" + 
      get(indexState) +
       ")";
  return golfer;
  }
})

export const teamHcpAndProgsArrayState = atom ({
  key: "teamHcpAndProgsArrayState",
  default: {
    team0:[0,0],
    team1:[0,0],
    team2:[0,0],
    team3:[0,0],
    team4:[0,0],
    team5:[0,0],
    team6:[0,0],
    team7:[0,0],
    team8:[0,0],
    team9:[0,0],
  }
})