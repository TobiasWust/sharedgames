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

  const { data, isLoading } = useQuery(
    ["friends", playerId],
    () =>
      fetch(`/api/getFriends?playerId=${playerId}`).then((res) => res.json()),
    { enabled: !!playerId, staleTime: Infinity }
  );

  return (
    <>
      <input type="checkbox" id="friends-modal" className="modal-toggle" />
      {/* @ts-ignore */}
      <label
        htmlFor="friends-modal"
        className="modal h-screen cursor-pointer justify-end"
      >
        <label
          className="modal-box relative h-full max-w-xs overflow-y-scroll"
          htmlFor="nothing"
        >
          {/* @ts-ignore */}
          <label
            htmlFor="friends-modal"
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            {/* @ts-ignore */}✕
          </label>
          <h3 className="pr-5 text-lg font-bold">
            Select friends you want to add to the list
          </h3>
          <input
            type="text"
            placeholder="Search friend"
            className="input-bordered input my-5 w-full"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          {isLoading && <p>Loading...</p>}

          {data?.error && <p>{data.error}</p>}
          {data?.length === 0 && <p>No friends found</p>}
          {data?.length > 0 && (
            <div className="grid gap-2">
              {data
                ?.filter((friend: any) => {
                  if (filter === "") return true;
                  return friend.name
                    .toLowerCase()
                    .includes(filter.toLowerCase());
                })
                .map((friend: any) => (
                  <div
                    className="flex items-center justify-between"
                    key={friend.steamId}
                  >
                    <p className="font-bold text-accent-content">
                      {friend.name}
                    </p>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => addPlayer(friend.steamId)}
                    >
                      <GoDiffAdded />
                    </button>
                  </div>
                ))}
            </div>
          )}
        </label>
      </label>
    </>
  );
}
