import { Game } from 'src/app/games/game/game.model';

export interface Room {
  id: number;
  name: string;
  author: string;
  imgSrc: string;
  games: Game[];
  players: string[];
}
