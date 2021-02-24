import { Characters } from "../../shared/types";

console.log('kek')
function shuffle(array:any) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export let characters = [
  { id: 1, name: "hitagi" },
  { id: 2, name: "hanekawa" },
  { id: 3, name: "kanbaru" },
  { id: 4, name: "kiss-shot" },
  { id: 5, name: "nadeko" },
  { id: 6, name: "hachikuji" },
  { id: 7, name: "tsukihi" },
  { id: 8, name: "karen" }
];

export let charactersEva = [
  { id: 1, name: "hitagi" },
  { id: 2, name: "hitagi" },
  { id: 3, name: "hitagi" },
  { id: 4, name: "hitagi" },
  { id: 5, name: "hitagi" },
  { id: 6, name: "hitagi" },
  { id: 7, name: "hitagi" },
  { id: 8, name: "hitagi" },
];

if (localStorage.getItem('Mode') === 'Easy') {
  characters = characters.slice(0, 4)
  charactersEva = charactersEva.slice(0, 4)
} else if (localStorage.getItem('Mode') === 'Normal') {
  characters = characters.slice(0, 8)
  charactersEva = charactersEva.slice(0, 8)
}
localStorage.removeItem('Mode')
// const pairOfCharacters: Characters[] = [...characters, ...characters];

let pairOfCharacters: Characters[] = [...characters, ...characters];
console.log('FANDOM', localStorage.getItem('Fandom'))
if (localStorage.getItem('Fandom') === 'Monogatari') {
  pairOfCharacters = [...characters, ...characters];
} else if (localStorage.getItem('Fandom') === 'Evangelion') {
  pairOfCharacters = [...charactersEva, ...charactersEva];
}
console.log('PAIRSofCHaractes', pairOfCharacters)
shuffle(pairOfCharacters);



export default pairOfCharacters;