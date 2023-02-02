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

  const gameDetails = await axios
    .get(`https://steamspy.com/api.php?request=appdetails&appid=${gameId}`)
    .catch(() => {
      throw new Error("Can't get GameInfos");
    });

  if (!gameDetails.data) {
    return res.status(400).json({
      error: "Can't get GameInfos",
    });
  }

  const returnData = gameDetails.data;

  return res.status(200).json(returnData);
}
