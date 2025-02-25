import { type Client, Colors, EmbedBuilder, Events } from "discord.js";
import { DISCORD_LOG_VOICE } from "~/utils/env";
import { getTextChannel } from "~/utils/functions";

export const voiceStateUpdate = (client: Client) => {
  client.on(Events.VoiceStateUpdate, async (oldState, state) => {
    const channel = await getTextChannel(client, DISCORD_LOG_VOICE);
    const oldVoiceChannel = oldState.channel;
    const voiceChannel = state.channel;
    const user = state.member?.user;

    if (channel && user?.bot === false) {
      if (oldVoiceChannel === null && voiceChannel !== null) {
        const headerEmbed = new EmbedBuilder()
          .setColor(Colors.Blue)
          .setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
          })
          .setDescription(`${user.toString()} - ${voiceChannel.toString()}`)
          .setTimestamp(new Date());
        const members = voiceChannel.members.map((member) => member.user.toString());
        const memberEmbed = new EmbedBuilder()
          .setColor(Colors.Blue)
          .setTitle(voiceChannel.toString())
          .setDescription(members.join("\n") || null);
        channel.send({ embeds: [headerEmbed, memberEmbed] });
      } else if (oldVoiceChannel !== null && voiceChannel === null) {
        const headerEmbed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
          })
          .setDescription(`${user.toString()} - ${oldVoiceChannel.toString()}`)
          .setTimestamp(new Date());
        const oldMembers = oldVoiceChannel.members.map((member) => member.user.toString());
        const oldMemberEmbed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle(oldVoiceChannel.toString())
          .setDescription(oldMembers.join("\n") || null);
        channel.send({ embeds: [headerEmbed, oldMemberEmbed] });
      } else if (oldVoiceChannel !== null && voiceChannel !== null) {
        const headerEmbed = new EmbedBuilder()
          .setColor(Colors.Yellow)
          .setAuthor({
            name: user.username,
            iconURL: user.displayAvatarURL(),
          })
          .setDescription(`${user.toString()} - ${oldVoiceChannel.toString()} -> ${voiceChannel.toString()}`)
          .setTimestamp(new Date());
        const oldMembers = oldVoiceChannel.members.map((member) => member.user.toString());
        const members = voiceChannel.members.map((member) => member.user.toString());
        const oldMemberEmbed = new EmbedBuilder()
          .setColor(Colors.Yellow)
          .setTitle(oldVoiceChannel.toString())
          .setDescription(oldMembers.join("\n") || null);
        const memberEmbed = new EmbedBuilder()
          .setColor(Colors.Yellow)
          .setTitle(voiceChannel.toString())
          .setDescription(members.join("\n") || null);
        channel.send({ embeds: [headerEmbed, oldMemberEmbed, memberEmbed] });
      }
    }
  });
};
