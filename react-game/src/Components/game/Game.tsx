import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, RoundButton } from "../Button/Button";
import pairOfCharacters from "./../cards/cards";
import "./Game.css";
import useSound from 'use-sound';


let isGameEnd = false;

function Game() {
  const [openedCard, setOpenedCard] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [flip, setFlipped] = useState<boolean>(true);
  const [tries, setTries] = useState<number>(Number(localStorage.getItem('tries')) || 0);
  const [correct, setCorrect] = useState<number>(Number(localStorage.getItem('correct')) || 0);
  const [gameVolume, setGameVolume] = useState<number>(0.5);
  const [back, setBack] = useState<number>(Number(localStorage.getItem('back')) || 1);
  const [fullScreen, setFullScreen] = useState<boolean>(false);
  const [actionSound, setActionSound] = useState<number>(Number(localStorage.getItem('mute')) || 0.25);

  useEffect( () => {
    console.log('chetam')
    if ((localStorage.getItem('mute'))) {
      setActionSound(0)
    }
  }, [actionSound])
  
  // console.log('UPDATE')

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
    if (localStorage.getItem('tries')) {
      setTries(() => Number(localStorage.getItem('tries')));
    } 
    setTries(() => tries + 1);
    localStorage.setItem('tries', String(tries+1))
    if (second && first.id === second.id) {
  
      if (localStorage.getItem('OpenedCard')) {
        let locStore = localStorage.getItem('OpenedCard')
        let oldArr = JSON.parse(locStore || '[]');
        let newArr = [...openedCard, ...oldArr];
        localStorage.setItem('OpenedCard',JSON.stringify(newArr));
      } else {
        localStorage.setItem('OpenedCard',JSON.stringify(openedCard))
      }

      if (localStorage.getItem('correct')) {
        setCorrect(() => Number(localStorage.getItem('correct')));
      } 
      setCorrect(() => correct + 1);
      localStorage.setItem('correct', String(correct+1))
      setMatched([...matched, first.id]);
      correctSound()
    }

    if (openedCard.length === 2) {
      setTimeout(() => setOpenedCard([]), 1000);
    }
    // playCard()
  }, [openedCard]);

  if (matched.length === (pairOfCharacters.length / 2) || 
  JSON.parse(localStorage.getItem('OpenedCard') || '[]').length === (pairOfCharacters.length)) {
    isGameEnd = true;
  }

  let isFlipped:boolean = true;


      if (localStorage.getItem('Start') === null) {
        setTimeout(() => {
             localStorage.setItem('Start', 'Flipped');
          setFlipped(false);

        }, 2000);
      } 

    //  const currentTime = useMemo(() => Date.now() + 600000, [])
  const [playCard] = useSound(
    './audio/Card-flip-sound-effect.mp3',
    { volume: actionSound }
  )

  const [correctSound] = useSound(
    './audio/Correct-answer.mp3',
    { volume: actionSound }
  )

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
  console.log('ACTION SOUND', actionSound)
  // const [play, { stop, isPlaying }] = useSound('./audio/bakeop.mp3');
  const [play, { stop, isPlaying }] = useSound(`${musicTheme}`, { volume: gameVolume });
  console.log('openCArds', openedCard)
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
        <div className="newGame">
        <Button title="New Game" onClick={ () => {
          localStorage.removeItem('pairOfCharacters')
          localStorage.removeItem('OpenedCard')
          localStorage.removeItem('Start')
          localStorage.removeItem('tries')
          localStorage.removeItem('correct')
          window.location.reload(false)
          } }/>
        </div>

        <div className="BackGround">
          <Button title="background" onClick={ () => {
            if (back === 3) {
              setBack(1)
              localStorage.setItem('back', String(1))
              
            } else {
              setBack(back + 1)
              localStorage.setItem('back', String(back+1))
            }
            
          } }/>
        </div>

        <div>
          <RoundButton onClick={ () => {
            if (localStorage.getItem('mute')) {
              localStorage.removeItem('mute')
              setActionSound(0.25)
            } else {
              localStorage.setItem('mute', '0')
              setActionSound(0)
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
           localStorage.removeItem('pairOfCharacters')
           localStorage.removeItem('OpenedCard')
           localStorage.removeItem('Start')
            window.location.reload(false) }
          }/>
          <Button title="Normal" onClick={() =>
           { localStorage.setItem('Mode', 'Normal')
           localStorage.removeItem('pairOfCharacters')
           localStorage.removeItem('OpenedCard')
           localStorage.removeItem('Start')
            window.location.reload(false) }
          }/>
          <Button title="Hard" onClick={() =>
           { localStorage.setItem('Mode', 'Hard')
           localStorage.removeItem('pairOfCharacters')
           localStorage.removeItem('OpenedCard')
           localStorage.removeItem('Start')
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
      {/* <h3>{ `${localStorage.getItem('tries') ? localStorage.getItem('tries') : tries} tries and 
      ${localStorage.getItem('correct') ? localStorage.getItem('correct') : correct} correct answers` }</h3> */}
            <h3>{ `${tries} tries and 
      ${correct} correct answers` }</h3>
      <div className="cards">
        {pairOfCharacters.map((waifu, index) => {

          if (localStorage.getItem('Start')) {
            isFlipped = false;
          }
          
          if (localStorage.getItem('OpenedCard')) {
            let locStore = localStorage.getItem('OpenedCard')
            let oldArr = JSON.parse(locStore || '[]');
            if (oldArr.includes(index)) {
              isFlipped = true;
            }
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
                   
                    className="front-image"
                  />
                </div>
                <div className="back">
                  <img
                    src ={`./img/${waifu.logo}.png`}
                    alt="waifu-name"
                  
                    className="back-image"
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