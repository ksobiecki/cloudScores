import { Winner} from './winner.model'
import { Game } from './game.model'

export interface Match {
  _id: string;
  game: Game;
  duration: number;
  date: string;
  players: string[];
  winners: Winner[];
}
