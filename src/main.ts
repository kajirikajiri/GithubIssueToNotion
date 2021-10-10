import * as core from "@actions/core";
import * as io from "@actions/io";
import path from "path";
import cp from "child_process";
import fs from "fs";
import { URL } from "url";

export const run = () => {
  try {
    const notionApiKey = core.getInput("notion-api-key");
    const databaseId = core.getInput("database-id");
    core.info("notionApiKey");
    core.info("databaseId");
    core.endGroup();
  } catch (error: any) {
    core.setFailed(error.message);
  }
};
