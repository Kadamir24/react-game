import { Characters } from "../../shared/types";

function shuffle(array:any) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const characters = [
  { id: 1, name: "hitagi" },
  { id: 2, name: "hanekawa" },
  { id: 3, name: "kanbaru" },
  { id: 4, name: "kiss-shot" },
  { id: 5, name: "nadeko" },
  { id: 6, name: "hachikuji" }
];
  
const pairOfCharacters: Characters[] = [...characters, ...characters];
shuffle(pairOfCharacters);

export default pairOfCharacters;