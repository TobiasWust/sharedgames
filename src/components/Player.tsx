import { SiSteam } from "react-icons/si";
import { GiThreeFriends } from "react-icons/gi";
import { GoDiffRemoved } from "react-icons/go";

export type TPlayer = {
  steamid: string;
  personaname: string;
  profileurl: string;
};

export default function Player({ player }: { player: TPlayer }) {
  return (
    <li>
      <p>{player.personaname}</p>
      <p className="flex gap-3">
        <button type="button">
          <GoDiffRemoved className="inline-block" />
          Remove
        </button>
        <a href={player.profileurl} target="_blank" rel="noreferrer">
          <SiSteam className="inline-block" /> Open in Steam
        </a>
        <button type="button">
          <GiThreeFriends className="inline-block" /> Import friends
        </button>
      </p>
    </li>
  );
}
