/* eslint-disable import/no-anonymous-default-export */
import firebase from "../firebase";

const getAll = (firebaseRef) => {
  const db = firebase.ref("/mondaylineup");
  return db;
};

const getLineup = (key, firebaseRef) => {
  const db = firebase.ref("/mondaylineup");
  return db.child(key);
};

export default {
  getAll,
  getLineup
};
