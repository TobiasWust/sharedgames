import { SiSteam } from "react-icons/si";
import { GiThreeFriends } from "react-icons/gi";
import { GoDiffRemoved } from "react-icons/go";

export type TPlayer = {
  steamid: string;
  personaname: string;
  profileurl: string;
};

type PlayerProps = {
  player: TPlayer;
  removePlayer: () => void;
  getFriends: () => void;
};

export default function Player({
  player,
  removePlayer,
  getFriends,
}: PlayerProps) {
  return (
    <li>
      <p>{player.personaname}</p>
      <p className="flex gap-3">
        <button type="button" onClick={() => removePlayer()}>
          <GoDiffRemoved className="inline-block" />
          Remove
        </button>
        <a href={player.profileurl} target="_blank" rel="noreferrer">
          <SiSteam className="inline-block" /> Open in Steam
        </a>
        {/* // todo open modal and select friends that I want to add */}
        <button disabled type="button" onClick={() => getFriends()}>
          <GiThreeFriends className="inline-block" /> Import friends
        </button>
      </p>
    </li>
  );
}
