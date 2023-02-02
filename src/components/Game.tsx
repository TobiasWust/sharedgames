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

  if (isLoading) return <li>Loading...</li>;
  return (
    <li>
      <a
        href={`https://store.steampowered.com/app/${data.appid}`}
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${data.appid}/header.jpg`}
          alt=""
          width={600}
          height={338}
        />
        {data.name}
      </a>
    </li>
  );
}
