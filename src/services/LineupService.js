/* eslint-disable import/no-anonymous-default-export */
import firebase from "../firebase";

const getAll = () => {
  const db = firebase.ref("/mondaylineup");
  return db;
};

const getLineup = (key) => {
  const db = firebase.ref("/mondaylineup");
  return db.child(key);
};

export default {
  getAll,
  getLineup
};
