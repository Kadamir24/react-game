import React, { useEffect, useState } from "react";
import pairOfCharacters from "./../cards/cards";
import "./Game.css";

let isGameEnd = false;

export default function Game() {
  const [openedCard, setOpenedCard] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

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
 
  return (
    <div className="App">
      <h1>
        { isGameEnd ? 'You found your waifus!' : ''}
      </h1>
      <div className="cards">
        {pairOfCharacters.map((waifu, index) => {
          let isFlipped:boolean = false;
          if (openedCard.includes(index)) {
            isFlipped = true
          };
          if (matched.includes(waifu.id)) {
            isFlipped = true
          };
          console.log('waifus name', `./../../img/${waifu.name}.png`)
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
                    width="200"
                  />
                </div>
                <div className="back">
                  <img
                    src ={`./img/logo.png`}
                    alt="waifu-name"
                    width="175"
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
