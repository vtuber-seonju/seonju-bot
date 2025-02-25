import { CronJob } from "cron";
import type { Client } from "discord.js";
import { ENVIRONMENT } from "~/utils/env";
import { updateChzzkStatus } from "./updateChzzkStatus";

export const loadJobs = async (client: Client<true>) => {
  if (ENVIRONMENT === "production") {
    // await updateChzzkStatus(client);
    const updateChzzkStatusJob = new CronJob(
      "0 */5 * * * *",
      updateChzzkStatus.bind(null, client),
      null,
      true,
      "Asia/Seoul",
    );
    updateChzzkStatusJob.start();
  }
};
