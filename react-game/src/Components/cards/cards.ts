import { Characters } from "../../shared/types";

console.log('kek')
function shuffle(array:any) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export let characters = [
  { id: 1, name: "hitagi", logo: "logo" },
  { id: 2, name: "hanekawa", logo: "logo" },
  { id: 3, name: "kanbaru", logo: "logo" },
  { id: 4, name: "kiss-shot", logo: "logo" },
  { id: 5, name: "nadeko", logo: "logo" },
  { id: 6, name: "hachikuji", logo: "logo" },
  { id: 7, name: "tsukihi", logo: "logo" },
  { id: 8, name: "karen", logo: "logo" },
  { id: 9, name: "ougi", logo: "logo" },
  { id: 10, name: "black-hanekawa", logo: "logo" },
  { id: 11, name: "gaen", logo: "logo" },
  { id: 12, name: "kagenui", logo: "logo" },
];

export let charactersEva = [
  { id: 1, name: "asuka", logo: "logo-2" },
  { id: 2, name: "asuka-2", logo: "logo-2" },
  { id: 3, name: "rei", logo: "logo-2" },
  { id: 4, name: "rei-2", logo: "logo-2" },
  { id: 5, name: "asuka-3", logo: "logo-2" },
  { id: 6, name: "misato", logo: "logo-2" },
  { id: 7, name: "misato-2", logo: "logo-2" },
  { id: 8, name: "mari", logo: "logo-2" },
  { id: 9, name: "misato-3", logo: "logo-2" },
  { id: 10, name: "rei-asuka", logo: "logo-2" },
  { id: 11, name: "mari-2", logo: "logo-2" },
  { id: 12, name: "asuka-4", logo: "logo-2" },
];

export let charactersFate = [
  { id: 1, name: "saber", logo: "logo-3" },
  { id: 2, name: "rin", logo: "logo-3" },
  { id: 3, name: "jeanne", logo: "logo-3" },
  { id: 4, name: "rider", logo: "logo-3" },
  { id: 5, name: "mordred", logo: "logo-3" },
  { id: 6, name: "saber-2", logo: "logo-3" },
  { id: 7, name: "dark-sakura", logo: "logo-3" },
  { id: 8, name: "sakura", logo: "logo-3" },
  { id: 9, name: "astolfo", logo: "logo-3" },
  { id: 10, name: "musashi", logo: "logo-3" },
  { id: 11, name: "nero", logo: "logo-3" },
  { id: 12, name: "alter-jeanne", logo: "logo-3" },
];

if (localStorage.getItem('Mode') === 'Easy') {
  characters = characters.slice(0, 4)
  charactersEva = charactersEva.slice(0, 4)
  charactersFate = charactersFate.slice(0, 4)
} else if (localStorage.getItem('Mode') === 'Normal') {
  characters = characters.slice(0, 8)
  charactersEva = charactersEva.slice(0, 8)
  charactersFate = charactersFate.slice(0, 8)
} else if (localStorage.getItem('Mode') === 'Hard') {
  characters = characters.slice(0, 12)
  charactersEva = charactersEva.slice(0, 12)
  charactersFate = charactersFate.slice(0, 12)
} else {
  characters = characters.slice(0, 8)
  charactersEva = charactersEva.slice(0, 8)
  charactersFate = charactersFate.slice(0, 8)
}
localStorage.removeItem('Mode')
// const pairOfCharacters: Characters[] = [...characters, ...characters];

let pairOfCharacters: Characters[] = [...characters, ...characters];
console.log('FANDOM', localStorage.getItem('Fandom'))
if (localStorage.getItem('Fandom') === 'Monogatari') {
  pairOfCharacters = [...characters, ...characters];
} else if (localStorage.getItem('Fandom') === 'Evangelion') {
  pairOfCharacters = [...charactersEva, ...charactersEva];
} else if (localStorage.getItem('Fandom') === 'Fate') {
  pairOfCharacters = [...charactersFate, ...charactersFate];
}
console.log('PAIRSofCHaractes', pairOfCharacters)
shuffle(pairOfCharacters);



export default pairOfCharacters;