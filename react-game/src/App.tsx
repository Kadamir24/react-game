import React, { useEffect, useState } from "react";
import "./App.css";
import Game from "./Components/game/Game";

export default function App() {
  localStorage.removeItem('Start');
  return (
    <>
      <Game />
    </>
  )
}
