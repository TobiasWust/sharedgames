import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Game({ gameId }: { gameId: string }) {
  const { data, isLoading } = useQuery(
    ["games", gameId],
    () => fetch(`/api/getGameInfos?gameId=${gameId}`).then((res) => res.json()),
    {
      staleTime: Infinity,
    }
  );

  if (isLoading) return <p>Loading...</p>;
  return (
    <a
      className="m-auto w-full transition duration-500 hover:scale-105 hover:shadow-2xl"
      href={`https://store.steampowered.com/app/${gameId}`}
      target="_blank"
      rel="noreferrer"
    >
      <Image
        className="w-full rounded-lg"
        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${gameId}/header.jpg`}
        alt={data?.[gameId]?.data.name}
        width={400}
        height={225}
      />
    </a>
  );
}
