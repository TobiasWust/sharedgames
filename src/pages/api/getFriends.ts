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

  const friendListResponse = await axios.get(
    `http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?relationship=friend`,
    {
      params: {
        key: process.env.STEAM_API_KEY,
        steamid: playerId,
      },
    }
  );

  const friendList = friendListResponse.data.friendslist.friends.map(
    (friend: any) => friend.steamid
  );

  return res.status(200).json(friendList);
}
