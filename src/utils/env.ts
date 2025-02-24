import * as v from "valibot";

export const DISCORD_TOKEN = v.parse(v.string(), process.env.DISCORD_TOKEN);

export const CHZZK_ID = v.parse(v.string(), process.env.CHZZK_ID);
export const CHZZK_CLIENT_ID = v.parse(v.string(), process.env.CHZZK_CLIENT_ID);
export const CHZZK_CLIENT_SECRET = v.parse(v.string(), process.env.CHZZK_CLIENT_SECRET);

export const DISCORD_CHZZK_CATEGORY = v.parse(v.string(), process.env.DISCORD_CHZZK_CATEGORY);
export const DISCORD_CHZZK_FOLLOWER_CHANNEL = v.parse(v.string(), process.env.DISCORD_CHZZK_FOLLOWER_CHANNEL);
export const DISCORD_CHZZK_LIVE_CHANNEL = v.parse(v.string(), process.env.DISCORD_CHZZK_LIVE_CHANNEL);

export const DISCORD_LOG_SYSTEM = v.parse(v.string(), process.env.DISCORD_LOG_SYSTEM);
export const DISCORD_LOG_CHAT = v.parse(v.string(), process.env.DISCORD_LOG_CHAT);
export const DISCORD_LOG_VOICE = v.parse(v.string(), process.env.DISCORD_LOG_VOICE);
