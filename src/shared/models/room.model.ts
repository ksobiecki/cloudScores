import { Game } from './game.model'
import { Match } from './match.model'

export interface Room {
  _id: string;
  name: string;
  author: string;
  imgSrc: string;
  games: Game[];
  players: string[];
  matches: Match[];
  code: string;
}
