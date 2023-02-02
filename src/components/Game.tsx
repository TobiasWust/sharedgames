import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Game({ gameId }: { gameId: string }) {
  const { data, isLoading } = useQuery(
    ["games", gameId],
    () => fetch(`/api/getGameInfos?gameId=${gameId}`).then((res) => res.json()),
    {
      staleTime: Infinity,
      enabled: false,
    }
  );

  if (isLoading) return <li>Loading...</li>;
  return (
    <li>
      <a
        href={`https://store.steampowered.com/app/${data.steam_appid}`}
        target="_blank"
        rel="noreferrer"
      >
        <Image src={data.header_image} alt="" />
        {data.name}
      </a>
    </li>
  );
}
