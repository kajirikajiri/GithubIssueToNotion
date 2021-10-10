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
    const issueTitle = core.getInput("issue-title");
    const issueNumber = core.getInput("issue-number");
    const issueState = core.getInput("issue-state");
    const issueTagsUrl = core.getInput("issue-tags-url");
    const issueUrl = core.getInput("issue-url");
    const numberOfComments = core.getInput("number-of-comments");
    core.info(issueTitle);
    core.info(issueNumber);
    core.info(issueState);
    core.info(issueTagsUrl);
    core.info(issueUrl);
    core.info(numberOfComments);
    core.endGroup();
  } catch (error: any) {
    core.setFailed(error.message);
  }
};
