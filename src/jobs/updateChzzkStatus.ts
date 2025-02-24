import { type Client, EmbedBuilder } from "discord.js";
import parse from "node-html-parser";
import * as v from "valibot";
import {
  CHZZK_ID,
  DISCORD_CHZZK_CATEGORY,
  DISCORD_CHZZK_FOLLOWER_CHANNEL,
  DISCORD_CHZZK_LIVE_CHANNEL,
} from "../utils/env";
import { getCategory, getTextChannel, getVoiceChannel } from "../utils/functions";

export const updateChzzkStatus = async (client: Client<true>) => {
  // 🔴 🟢
  const chzzkCategory = await getCategory(client, DISCORD_CHZZK_CATEGORY);
  const chzzkLiveChannel = await getTextChannel(client, DISCORD_CHZZK_LIVE_CHANNEL);
  const chzzkFollowerChannel = await getVoiceChannel(client, DISCORD_CHZZK_FOLLOWER_CHANNEL);

  if (chzzkCategory && chzzkLiveChannel && chzzkFollowerChannel) {
    const chzzkChannelResponse = await fetch(`https://api.chzzk.naver.com/service/v1/channels/${CHZZK_ID}`, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "SeonjuBot",
      },
    });
    const chzzkChannelSchema = v.pipe(
      v.unknown(),
      v.object({
        code: v.number(),
        message: v.union([v.string(), v.null()]),
        content: v.object({
          channelId: v.string(),
          channelName: v.string(),
          channelImageUrl: v.string(),
          followerCount: v.number(),
        }),
      }),
    );
    const chzzkChannel = v.parse(chzzkChannelSchema, await chzzkChannelResponse.json());

    const chzzkLiveResponse = await fetch(`https://api.chzzk.naver.com/polling/v2/channels/${CHZZK_ID}/live-status`, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "SeonjuBot",
      },
    });
    const chzzkLiveSchema = v.pipe(
      v.unknown(),
      v.object({
        code: v.number(),
        message: v.union([v.string(), v.null()]),
        content: v.object({
          status: v.string(),
          liveTitle: v.string(),
          liveCategoryValue: v.string(),
          concurrentUserCount: v.number(),
        }),
      }),
    );
    const chzzkLive = v.parse(chzzkLiveSchema, await chzzkLiveResponse.json());

    const onlineIcon = "🟢";
    const offlineIcon = "🔴";
    const currentStatus = chzzkLive.content.status === "OPEN";
    const previousStatus = chzzkCategory.name.startsWith(onlineIcon);
    console.log(currentStatus, previousStatus);

    if (currentStatus) {
      chzzkCategory.setName(`${onlineIcon}ㅣ치지직ㅣ${onlineIcon}`);
      chzzkLiveChannel.setName(`${onlineIcon}ㅣ${chzzkLive.content.concurrentUserCount}명-시청중`);
      chzzkFollowerChannel.setName(`${onlineIcon}ㅣ팔로워-${chzzkChannel.content.followerCount}명`);

      if (previousStatus) {
        const liveUrl = `https://chzzk.naver.com/live/${CHZZK_ID}`;
        const metaResponse = await fetch(liveUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)",
          },
        });
        const meta = parse(await metaResponse.text());
        const thumbnail = meta.querySelector("meta[property='og:image']")?.getAttribute("content");

        const embed = new EmbedBuilder()
          .setColor(0x00ffa3)
          .setTitle(chzzkLive.content.liveTitle)
          .setURL(liveUrl)
          .setDescription("선주님이 방송을 시작했습니다!")
          .addFields([
            {
              name: "카테고리",
              value: chzzkLive.content.liveCategoryValue,
            },
          ])
          .setImage(thumbnail || "");
        await chzzkLiveChannel.send({ content: "@everyone 와!! 선주님 방송한데!! 빨리가자!!!!!", embeds: [embed] });
      }
    } else {
      chzzkCategory.setName(`${offlineIcon}ㅣ치지직ㅣ${offlineIcon}`);
      chzzkLiveChannel.setName(`${offlineIcon}ㅣ오프라인`);
      chzzkFollowerChannel.setName(`${offlineIcon}ㅣ팔로워-${chzzkChannel.content.followerCount}명`);
    }
  }
};
