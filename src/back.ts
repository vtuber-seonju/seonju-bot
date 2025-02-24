import { ShardingManager } from "discord.js";

const manager = new ShardingManager("src/bot.ts", {
  token: process.env.DISCORD_TOKEN,
});

manager.spawn();
