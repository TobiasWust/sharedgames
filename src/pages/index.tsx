import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { CgAddR } from "react-icons/cg";
import { toast } from "react-toastify";
import FriendsModal from "../components/FriendsModal";
import Game from "../components/Game";
import Player, { TPlayer } from "../components/Player";
import intersection from "../utils/intersection";
import shuffle from "../utils/shuffle";

type PlayerWithGames = {
  player: TPlayer;
  ownedGames: string[];
};

export default function Home() {
  const [playerId, setPlayerId] = useState("");
  const [players, setPlayers] = useState<PlayerWithGames[]>([]);
  const [gameIds, setGameIds] = useState<string[]>([]);
  const [friendsFor, setFriendsFor] = useState("");
  const [loading, setLoading] = useState(false);

  function getPlayerData(_playerID: string) {
    setLoading(true);
    fetch(`/api/getPlayer?playerId=${_playerID}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          return;
        }
        if (
          players.find(
            (player) => player.player.personaname === data.player.personaname
          )
        ) {
          return;
        }
        setPlayers((state) => [...state, data]);
      })
      .finally(() => setLoading(false));
  }

  function getFriends(_playerId: string) {
    setFriendsFor(_playerId);
    document.getElementById("friends-modal")?.click();
  }

  function removePlayer(_playerId: string) {
    setPlayers((state) =>
      state.filter((player) => player.player.steamid !== _playerId)
    );
  }

  useEffect(() => {
    if (players.length > 1) {
      const gIds = intersection(players.map((player) => player.ownedGames));
      setGameIds(gIds);
    } else {
      setGameIds([]);
    }
  }, [players]);

  return (
    <>
      <Head>
        <title>Games We All Own</title>
        <meta
          name="description"
          content="Discover the games that bring you and your friends together!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
      </Head>
      <main className="grid gap-6 p-4 md:p-12">
        <div className="grid grid-flow-col items-center">
          <h1 className="text-5xl font-bold text-accent-content">
            Discover the games that bring you and your friends together!
          </h1>
        </div>
        <form
          className="input-group rounded-xl bg-base-300 p-5"
          onSubmit={(e) => {
            e.preventDefault();
            getPlayerData(playerId);
          }}
        >
          <input
            className="input w-full"
            placeholder="Enter Steam ID"
            type="text"
            value={playerId}
            onChange={(e) => setPlayerId(e.target.value)}
          />
          <button
            disabled={loading}
            className="btn"
            type="submit"
            aria-label="add"
          >
            <CgAddR />
          </button>
        </form>

        {playerId === "" && players.length === 0 && (
          <p>
            Do you ever struggle to keep track of all the games you own on
            Steam? And when it comes to playing with friends, it&apos;s even
            harder to figure out what games everyone has. Introducing the
            solution to your problem! Our tool allows you to effortlessly add
            your Steam name and add your friends&apos; Steam names to see a
            combined list of games that you both own. No more guessing or
            searching through lists. With just a few clicks, you&apos;ll know
            exactly what games you and your friends have in common. So,
            let&apos;s play together and enjoy the games we all own!
          </p>
        )}

        {(playerId !== "" || players.length > 0) && (
          <>
            <h2 className="font-bold text-accent-content">PLAYERS</h2>
            <div className="grid gap-3">
              {players.map((player) => (
                <Player
                  key={player.player.steamid}
                  player={player.player}
                  removePlayer={() => removePlayer(player.player.steamid)}
                  getFriends={() => getFriends(player.player.steamid)}
                />
              ))}
              {loading && <p>Loading...</p>}
            </div>
            <h2>
              <span className="font-bold text-accent-content">
                SHARED GAMES
              </span>{" "}
              {gameIds.length}
            </h2>
            {players.length < 2 && <p>Add players to compare</p>}
            {gameIds.length === 0 && players.length > 2 && (
              <p>No games in common</p>
            )}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(367px,1fr))] gap-3">
              {shuffle(gameIds).map((gameId) => (
                <Game key={gameId} gameId={gameId} />
              ))}
            </div>
          </>
        )}
      </main>
      {/* eslint-disable-next-line react/jsx-no-bind */}
      <FriendsModal playerId={friendsFor} addPlayer={getPlayerData} />
    </>
  );
}
