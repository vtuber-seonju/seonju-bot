import { type Client, Colors, EmbedBuilder, Events } from "discord.js";
import { DISCORD_LOG_CHAT } from "~/utils/env";
import { getTextChannel } from "~/utils/functions";

export const messageDelete = (client: Client) => {
  client.on(Events.MessageDelete, async (message) => {
    const channel = await getTextChannel(client, DISCORD_LOG_CHAT);
    const user = message.author;

    if (channel && user?.bot === false) {
      const headerEmbed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setAuthor({
          name: user.username,
          iconURL: user.displayAvatarURL(),
        })
        .setDescription(`${message.channel.toString()} - ${user.toString()}`)
        .setTimestamp(new Date());
      const chatEmbed = new EmbedBuilder()
        .setColor(Colors.Red)
        .setTitle("삭제된 메시지")
        .setDescription(message.content || null)
        .setImage(message.attachments.map((attachment) => attachment.url)[0]);

      channel.send({ embeds: [headerEmbed, chatEmbed] });
    }
  });
};
