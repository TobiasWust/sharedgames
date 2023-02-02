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
    <tr>
      <td>
        <a
          className="font-bold text-accent-content"
          href={player.profileurl}
          target="_blank"
          rel="noreferrer"
        >
          {player.personaname}
        </a>
      </td>
      <td className="flex gap-3">
        {/* // todo open modal and select friends that I want to add */}
        <button
          className="btn-outline btn-success btn gap-2"
          type="button"
          onClick={() => getFriends()}
        >
          <GiThreeFriends className="inline-block" /> Import friends
        </button>
        <button
          className="btn-outline btn-error btn gap-2"
          type="button"
          onClick={() => removePlayer()}
        >
          <GoDiffRemoved className="inline-block" />
        </button>
      </td>
    </tr>
  );
}
