import React from 'react';
import '../styles/App.css';
import Header from './Header';
import LineupPage from './LineupPage';
import {
  RecoilRoot
} from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <Header />
      <LineupPage />
    </RecoilRoot>
  )
}

