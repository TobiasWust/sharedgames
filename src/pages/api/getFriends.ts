import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { playerId } = req.query;

  if (!playerId) {
    return res.status(400).json({
      error: "Missing playerId",
    });
  }

  const friendListResponse = await axios
    .get(
      `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?relationship=friend`,
      {
        params: {
          key: process.env.STEAM_API_KEY,
          steamid: playerId,
        },
      }
    )
    .catch(() => {
      throw new Error("Invalid playerId or profile not public");
    });

  if (!friendListResponse?.data.friendslist.friends) {
    return res.status(400).json({
      error: "Invalid playerId or profile not public",
    });
  }

  const friendListRaw = friendListResponse?.data.friendslist.friends.map(
    (friend: any) => friend.steamid
  );

  const friendsWithNamesRes = await axios
    .get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`, {
      params: {
        key: process.env.STEAM_API_KEY,
        steamids: friendListRaw.join(","),
      },
    })
    .catch(() => {
      throw new Error("Invalid playerId or profile not public");
    });

  if (!friendsWithNamesRes?.data.response.players) {
    return res.status(400).json({
      error: "Invalid playerId or profile not public",
    });
  }

  const friendList = friendsWithNamesRes?.data.response.players.map(
    (friend: any) => ({
      steamId: friend.steamid,
      name: friend.personaname,
    })
  );

  return res.status(200).json(friendList);
}
