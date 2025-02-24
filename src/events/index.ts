import { type Client, Events } from "discord.js";
import { ready } from "./ready";

export const loadEvents = (client: Client) => {
  client.once(Events.ClientReady, ready);
};
