import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { gameId } = req.query;

  console.log("gameId:", gameId);

  if (!gameId) {
    return res.status(400).json({
      error: "Missing gameId",
    });
  }

  const gameDetails = (
    await axios.get(
      `https://steamspy.com/api.php?request=appdetails&appid=${gameId}`
    )
  ).data;

  return res.status(200).json({
    ...gameDetails,
  });
}
