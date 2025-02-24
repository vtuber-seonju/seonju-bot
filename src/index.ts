import { Client, GatewayIntentBits, Partials } from "discord.js";
import { loadEvents } from "./events";
import { DISCORD_TOKEN } from "./utils/env";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

// client.on(Events.ClientReady, async (client) => {
//   const logChannel = await getTextChannel(client, "1343432109863469218");
//   if (logChannel) {
//     await logChannel.send("로그인되었습니다.");
//   }

//   const chzzkCountChannel = await getVoiceChannel(client, "1343444405297741856");
//   if (chzzkCountChannel) {
//     await chzzkCountChannel.setName("치지직 - 300명");
//   }

//   const youtubeCountChannel = await getVoiceChannel(client, "1343445106220470312");
//   if (youtubeCountChannel) {
//     await youtubeCountChannel.setName("유튜브 - 400명");
//   }

//   console.log(`${client.user.displayName} 로그인 되었습니다.`);
// });

loadEvents(client);

client.login(DISCORD_TOKEN);
