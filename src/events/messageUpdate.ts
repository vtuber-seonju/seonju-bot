import { type Client, Colors, EmbedBuilder, Events } from "discord.js";
import { DISCORD_LOG_CHAT } from "~/utils/env";
import { getTextChannel } from "~/utils/functions";

export const messageUpdate = (client: Client) => {
  client.on(Events.MessageUpdate, async (oldMessage, message) => {
    const channel = await getTextChannel(client, DISCORD_LOG_CHAT);
    const user = message.author;

    if (channel && user?.bot === false) {
      const headerEmbed = new EmbedBuilder()
        .setColor(Colors.Yellow)
        .setAuthor({
          name: user.username,
          iconURL: user.displayAvatarURL(),
        })
        .setDescription(`${message.channel.toString()} - ${user.toString()} - ${message.url}`)
        .setTimestamp(new Date());
      const oldEmbed = new EmbedBuilder()
        .setColor(Colors.Yellow)
        .setTitle("수정 전 메시지")
        .setDescription(oldMessage.content || null)
        .setImage(oldMessage.attachments.map((attachment) => attachment.url)[0]);
      const newEmbed = new EmbedBuilder()
        .setColor(Colors.Yellow)
        .setTitle("수정 후 메시지")
        .setDescription(message.content || null)
        .setImage(message.attachments.map((attachment) => attachment.url)[0]);

      channel.send({ embeds: [headerEmbed, oldEmbed, newEmbed] });
    }
  });
};
