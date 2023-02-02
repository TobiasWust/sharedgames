import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { GoDiffAdded } from "react-icons/go";

type FriendsModalProps = {
  playerId: string;
  addPlayer: (playerId: string) => void;
};

export default function FriendsModal({
  playerId,
  addPlayer,
}: FriendsModalProps) {
  const [filter, setFilter] = useState("");

  const { data } = useQuery(
    ["friends", playerId],
    () =>
      fetch(`/api/getFriends?playerId=${playerId}`).then((res) => res.json()),
    { enabled: !!playerId }
  );

  return (
    <>
      <input type="checkbox" id="friends-modal" className="modal-toggle" />
      {/* @ts-ignore */}
      <label
        htmlFor="friends-modal"
        className="modal h-screen cursor-pointer justify-end"
      >
        <label className="modal-box relative h-full" htmlFor="nothing">
          {/* @ts-ignore */}
          <label
            htmlFor="friends-modal"
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            {/* @ts-ignore */}✕
          </label>
          <h3 className="text-lg font-bold">
            Select friends you want to add to the list
          </h3>
          <input
            type="text"
            className="input-bordered input w-full"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <table className="table-compact table w-full">
            <tbody>
              {data
                ?.filter((friend: any) => {
                  if (filter === "") return true;
                  return friend.name
                    .toLowerCase()
                    .includes(filter.toLowerCase());
                })
                .map((friend: any) => (
                  <tr key={friend.steamId}>
                    <td className="font-bold text-accent-content">
                      {friend.name}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => addPlayer(friend.steamId)}
                      >
                        <GoDiffAdded />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </label>
      </label>
    </>
  );
}
