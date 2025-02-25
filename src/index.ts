import { Client, GatewayIntentBits, Partials } from "discord.js";
import { loadEvents } from "./events";
import { DISCORD_TOKEN } from "./utils/env";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Message, Partials.Channel],
});

loadEvents(client);

client.login(DISCORD_TOKEN);
