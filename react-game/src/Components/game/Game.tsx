import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Characters } from "../../shared/types";
import Button from "../Button/Button";
import { characters, charactersEva } from "../cards/cards";
import pairOfCharacters from "./../cards/cards";
import "./Game.css";

let isGameEnd = false;

function Game() {
  const [openedCard, setOpenedCard] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [flip, setFlipped] = useState<boolean>(true);
  function flipCard(index: any) {
    if (openedCard.length > 1) return;
    setOpenedCard((opened) => {
      return [...opened, index];
    });
  }

  useEffect(() => {
    if (openedCard.length < 2) return;

    const first = pairOfCharacters[openedCard[0]];
    const second = pairOfCharacters[openedCard[1]];

    if (second && first.id === second.id) {
      setMatched([...matched, first.id]);
    }

    if (openedCard.length === 2) {
      setTimeout(() => setOpenedCard([]), 1000);
    }
  }, [openedCard]);

  if (matched.length === (pairOfCharacters.length / 2)) {
    isGameEnd = true;
  }

  let isFlipped:boolean = true;
  useEffect(() => {
    setTimeout(() => {
      if (!localStorage.getItem('Start')) {
        setTimeout(() => {
          localStorage.setItem('Start', 'Flipped');
          setFlipped(false);
        }, 2000);
      }
    }, 2000)

  }, [flip])
 
  return (
    <div className="App">
      <div className="Menu">
        <Link to="/">
          <Button title="Choose fandom"/>
        </Link>
        <div className="Mode">
          <Button title="Easy" onClick={() =>
           { localStorage.setItem('Mode', 'Easy')
            window.location.reload(false) }
          }/>
          <Button title="Normal" onClick={() =>
           { localStorage.setItem('Mode', 'Normal')
            window.location.reload(false) }
          }/>
          <Button title="Hard"/>
        </div>
      </div>
      <h1>
        { isGameEnd ? 'You found your waifus!' : ''}
      </h1>
      <div className="cards">
        {pairOfCharacters.map((waifu, index) => {

          if (localStorage.getItem('Start')) {
            isFlipped = false;
          } 
         
          if (openedCard.includes(index)) {
            isFlipped = true
          };
          if (matched.includes(waifu.id)) {
            isFlipped = true
          };
          return (
            <div
              className={`card ${isFlipped ? "flipped" : ""} `}
              key={index}
              onClick={() => flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  <img
                    src ={`./img/${waifu.name}.png`}
                    alt="waifu-name"
                    // width="190"
                    width="150"
                  />
                </div>
                <div className="back">
                  <img
                    src ={`./img/logo.png`}
                    alt="waifu-name"
                    width="145"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Game;