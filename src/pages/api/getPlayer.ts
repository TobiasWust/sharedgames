import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { playerId } = req.query;

  let steamId;

  if (!playerId) {
    return res.status(400).json({
      error: "Missing playerId",
    });
  }

  // check if playerId is a steamId or a vanityUrl
  if (playerId.length === 17) {
    steamId = playerId;
  } else {
    const playerIdResponse = await axios
      .get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/`, {
        params: {
          key: process.env.STEAM_API_KEY,
          vanityurl: playerId,
        },
      })
      .catch(() => {
        throw new Error("Invalid playerId or profile not public");
      });

    if (!playerIdResponse?.data.response.steamid) {
      return res.status(400).json({
        error: "Invalid playerId or profile not public",
      });
    }
    steamId = playerIdResponse?.data.response.steamid;
  }

  const playerData = await axios
    .get(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`
    )
    .catch(() => {
      throw new Error("Invalid playerId or profile not public");
    });

  if (!playerData?.data.response.players[0]) {
    return res.status(400).json({
      error: "Invalid playerId or profile not public",
    });
  }

  const player = playerData?.data.response.players[0];

  const ownedGamesData = await axios
    .get(
      `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json`
    )
    .catch(() => {
      throw new Error("Invalid playerId or profile not public");
    });

  if (!ownedGamesData?.data.response.games) {
    return res.status(400).json({
      error: "Invalid playerId or profile not public",
    });
  }

  const ownedGames = ownedGamesData?.data.response.games.map(
    (game: any) => game.appid
  );

  return res.status(200).json({
    player,
    ownedGames,
  });
}
