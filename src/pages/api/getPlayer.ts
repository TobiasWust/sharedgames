import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { playerId } = req.query;

  const playerIdResponse = await axios.get(
    `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/`,
    {
      params: {
        key: process.env.STEAM_API_KEY,
        vanityurl: playerId,
      },
    }
  );

  const { steamid } = playerIdResponse.data.response;

  const playerData = await axios.get(
    `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamid}`
  );

  const player = playerData.data.response.players[0];

  const ownedGamesData = await axios.get(
    `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamid}&format=json`
  );

  const ownedGames = ownedGamesData.data.response.games;

  const ownedGameswithDetails = await Promise.all(
    ownedGames.map(async (game: any) => {
      const gameDetails = await axios.get(
        `https://steamspy.com/api.php?request=appdetails&appid=${game.appid}`
      );

      return {
        ...game,
        details: gameDetails.data,
      };
    })
  );

  console.log("ownedGameswithDetails:", ownedGameswithDetails);

  res.status(200).json({
    player,
    ownedGames: ownedGameswithDetails,
  });
}
