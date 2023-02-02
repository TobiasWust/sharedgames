import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { gameId } = req.query as { gameId: string };
  if (!gameId) {
    return res.status(400).json({
      error: "Missing gameId",
    });
  }

  // const gameDetails = (
  //   await axios.get(
  //     `https://steamspy.com/api.php?request=appdetails&appid=${gameId}`
  //   )
  // ).data;
  const gameDetails = (
    await axios.get(
      `http://store.steampowered.com/api/appdetails?appids=${gameId}`
    )
  ).data;

  const returnGame = gameDetails[gameId].data;

  return res.status(200).json({
    ...returnGame,
  });
}
