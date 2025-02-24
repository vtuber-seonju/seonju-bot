import {
  type CategoryChannel,
  type Channel,
  ChannelType,
  type Client,
  type GuildChannel,
  type TextChannel,
  type VoiceChannel,
} from "discord.js";

const isTextChannel = (channel: Channel | null): channel is TextChannel => {
  return channel?.type === ChannelType.GuildText;
};

const isVoiceChannel = (channel: Channel | null): channel is VoiceChannel => {
  return channel?.type === ChannelType.GuildVoice;
};

const isCategory = (channel: Channel | null): channel is CategoryChannel => {
  return channel?.type === ChannelType.GuildCategory;
};

export const getTextChannel = async (client: Client<true>, id: string): Promise<TextChannel | null> => {
  try {
    const channel = await client.channels.fetch(id);
    return isTextChannel(channel) ? channel : null;
  } catch {
    return null;
  }
};

export const getVoiceChannel = async (client: Client<true>, id: string): Promise<VoiceChannel | null> => {
  try {
    const channel = await client.channels.fetch(id);
    return isVoiceChannel(channel) ? channel : null;
  } catch {
    return null;
  }
};

export const getCategory = async (client: Client<true>, id: string): Promise<CategoryChannel | null> => {
  try {
    const channel = await client.channels.fetch(id);
    return isCategory(channel) ? channel : null;
  } catch {
    return null;
  }
};
