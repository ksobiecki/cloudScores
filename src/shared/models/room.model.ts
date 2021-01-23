import { Game } from './game.model';

export interface Room {
  _id: string;
  name: string;
  author: string;
  imgSrc: string;
  games: Game[];
  players: string[];
}
