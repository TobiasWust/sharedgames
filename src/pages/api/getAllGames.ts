import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const allGames = await axios
    .get(`https://api.steampowered.com/ISteamApps/GetAppList/v2/`)
    .catch(() => {
      throw new Error("Can't get AllGames");
    });

  if (!(allGames.data.applist.apps.length > 0)) {
    return res.status(400).json({
      error: "Can't get AllGames",
    });
  }

  const returnData = allGames.data.applist.apps;

  return res.status(200).json(returnData);
}
