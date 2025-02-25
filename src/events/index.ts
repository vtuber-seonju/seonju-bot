import type { Client } from "discord.js";
import { clientReady } from "./clientReady";
import { messageDelete } from "./messageDelete";
import { messageUpdate } from "./messageUpdate";
import { voiceStateUpdate } from "./voiceStateUpdate";

export const loadEvents = (client: Client) => {
  clientReady(client);

  messageDelete(client);
  messageUpdate(client);

  voiceStateUpdate(client);
};
