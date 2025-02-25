import { ActivityType, type Client, Events } from "discord.js";
import { loadJobs } from "~/jobs";
import { DISCORD_LOG_SYSTEM } from "~/utils/env";
import { getTextChannel } from "~/utils/functions";

export const clientReady = async (client: Client) => {
  client.once(Events.ClientReady, async (client) => {
    client.user.setPresence({
      activities: [
        {
          name: "선주님을 열심히 돕는중!",
          type: ActivityType.Streaming,
        },
      ],
      status: "dnd",
    });

    console.log(`${client.user.displayName} 로그인 되었습니다.`);
    const systemLogChannel = await getTextChannel(client, DISCORD_LOG_SYSTEM);
    if (systemLogChannel) {
      await systemLogChannel.send("로그인되었습니다.");
    }

    await loadJobs(client);
  });
};
