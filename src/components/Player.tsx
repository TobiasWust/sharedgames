import Image from "next/image";
import { GiThreeFriends } from "react-icons/gi";
import { CgRemoveR } from "react-icons/cg";

export type TPlayer = {
  steamid: string;
  personaname: string;
  profileurl: string;
  avatar: string;
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
    <div className="flex justify-between">
      <div>
        <a
          className="flex items-center gap-3 font-bold text-accent-content"
          href={player.profileurl}
          target="_blank"
          rel="noreferrer"
        >
          <Image src={player.avatar} height={50} width={50} alt="avatar" />
          {player.personaname}
        </a>
      </div>
      <div className="flex gap-3">
        {/* // todo open modal and select friends that I want to add */}
        <button
          className="btn-outline btn-success btn gap-2"
          type="button"
          onClick={() => getFriends()}
        >
          <GiThreeFriends className="inline-block" /> Add friends
        </button>
        <button
          className="btn-outline btn-error btn gap-2"
          type="button"
          onClick={() => removePlayer()}
          aria-label="remove"
        >
          <CgRemoveR className="inline-block" />
        </button>
      </div>
    </div>
  );
}
