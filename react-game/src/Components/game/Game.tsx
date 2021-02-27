import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import pairOfCharacters from "./../cards/cards";
import "./Game.css";
import useSound from 'use-sound';
// // @ts-ignore 
// import cardFlipSound from './audio/Card-flip-sound-effect.mp3';

let isGameEnd = false;

function Game() {
  const [openedCard, setOpenedCard] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [flip, setFlipped] = useState<boolean>(true);
  const [tries, setTries] = useState<number>(0);
  const [correct, setCorrect] = useState<number>(0);
  const [gameVolume, setGameVolume] = useState<number>(0.5);
  const [back, setBack] = useState<number>(1);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  function flipCard(index: any) {
    if (openedCard.length > 1) return;
    playCard()
    setOpenedCard((opened) => {
      return [...opened, index];
    });
  }

  useEffect(() => {
    if (openedCard.length < 2) return;

    const first = pairOfCharacters[openedCard[0]];
    const second = pairOfCharacters[openedCard[1]];
    setTries(() => tries + 1);
    if (second && first.id === second.id) {
      setCorrect(() => correct + 1);;
      setMatched([...matched, first.id]);
      correctSound()
    }

    if (openedCard.length === 2) {
      setTimeout(() => setOpenedCard([]), 1000);
    }
    // playCard()
  }, [openedCard]);

  if (matched.length === (pairOfCharacters.length / 2)) {
    isGameEnd = true;
  }

  let isFlipped:boolean = true;
  useEffect(() => {
      if (!localStorage.getItem('Start')) {
        setTimeout(() => {
          localStorage.setItem('Start', 'Flipped');
          setFlipped(false);
        }, 2000);
      }
  }, [flip])


  const [playCard] = useSound(
    './audio/Card-flip-sound-effect.mp3',
    { volume: 0.25 }
  )

  const [correctSound] = useSound(
    './audio/Correct-answer.mp3',
    { volume: 0.25 }
  )

  // const [playMusic] = useSound(
  //   './audio/bakeop.mp3',
  //   { volume: 0.25 }
  // )

  const Pause = (props:any) => {
    return (
      <svg className="button" viewBox="0 0 60 60" onClick={()=>props.stop()}>
        <polygon points="0,0 15,0 15,60 0,60" />
        <polygon points="25,0 40,0 40,60 25,60" />
      </svg>
    );
  };
  
  const Play = (props:any) => {
    return (
      <svg className="button" viewBox="0 0 60 60" onClick={props.play}>
        <polygon points="0,0 50,30 0,60" />
      </svg>
    );
  };
  let backgroundTheme;
  let musicTheme;
  if (localStorage.getItem('Fandom') === 'Monogatari') {
    musicTheme = './audio/bakeop.mp3';
    backgroundTheme=`monogatari-background`
  } else if (localStorage.getItem('Fandom') === 'Evangelion') {
    musicTheme = './audio/cruel-angel.mp3';
    backgroundTheme=`eva-background`
  } else if (localStorage.getItem('Fandom') === 'Fate') {
    musicTheme = './audio/fate.mp3';
    backgroundTheme=`fate-background`
  }

  // const [play, { stop, isPlaying }] = useSound('./audio/bakeop.mp3');
  const [play, { stop, isPlaying }] = useSound(`${musicTheme}`, { volume: gameVolume });
  console.log('VOLUME',gameVolume)
  return (
    <div className="App"  style={{ 
      backgroundImage: `url(./img/${backgroundTheme}-${back}.jpg)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width:'100%' 
    }}>
      <div className="Menu">
        <Link to="/">
          <Button title="Choose fandom"/>
        </Link>
        {/* <Button title="Play Music" onClick={() => playMusic()}/> */}
        <div className="BackGround">
          <Button title="background" onClick={ () => {
            if (back === 3) {
              setBack(1)
            } else {
              setBack(back + 1)
            }
          } }/>
        </div>

        <div className="Menu_sv">
          <div className="Menu_sound">
          <Button title="-" onClick={ () => {
            if (gameVolume > 0 ) {
              setGameVolume(gameVolume - 0.1)
            }
          } }/>
          <div className="playMusic">
            {isPlaying ? <Pause stop={stop} /> : <Play play={play} />}
              Music
            </div>
            <Button title="+" onClick={ () => {
            if (gameVolume < 0.9 ) {
              setGameVolume(gameVolume + 0.1)
            }
          } }/>
          </div>

          <div className="Menu_volume">Volume: {Math.ceil(gameVolume*10)}</div>


        </div>


        <div className="Mode">
          <Button title="Easy" onClick={() =>
           { localStorage.setItem('Mode', 'Easy')
            window.location.reload(false) }
          }/>
          <Button title="Normal" onClick={() =>
           { localStorage.setItem('Mode', 'Normal')
            window.location.reload(false) }
          }/>
          <Button title="Hard" onClick={() =>
           { localStorage.setItem('Mode', 'Hard')
            window.location.reload(false) }
          }/>
        </div>

        <Button title="Screen" onClick={ () => {
          if (!fullScreen) {
            document.documentElement.requestFullscreen();
            setFullScreen(true)
          } else {
            document.exitFullscreen();
            setFullScreen(false)
          }
          
        } }/>

      </div>
      <h1>
        { isGameEnd ? 'You found all waifus!' : ''}
      </h1>
      <h3>{ `${tries} tries and ${correct} correct answers` }</h3>
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
                    src ={`./img/${waifu.logo}.png`}
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