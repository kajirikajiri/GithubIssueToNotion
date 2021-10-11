import * as core from "@actions/core";
import * as io from "@actions/io";
import path from "path";
import cp from "child_process";
import fs from "fs";
import { URL } from "url";
import { Client } from "@notionhq/client";

type IssueLabel = {
  color: string;
  default: boolean;
  description: string;
  id: number;
  name: string;
  node_id: string;
  url: string;
};

export const run = () => {
  try {
    const notionApiKey = core.getInput("notion-internal-api-key");
    core.info(notionApiKey);
    const notionDatabaseId = core.getInput("notion-database-page-url");
    core.info(notionDatabaseId);
    // .split("/")[4]
    // .split("?")[0];
    const issueTitle = core.getInput("issue-title");
    core.info("1");
    core.info(issueTitle);
    const issueNumber = core.getInput("issue-number");
    core.info("2");
    core.info(issueNumber);
    const issueState = core.getInput("issue-state");
    core.info("3");
    core.info(issueState);
    const issueLabelsJson = core.getInput("issue-labels");
    core.info("4");
    core.info(issueLabelsJson);
    const issueLabels = JSON.parse(issueLabelsJson);
    const issueUrl = core.getInput("issue-url");
    core.info("5");
    core.info(issueUrl);
    const numberOfComments = core.getInput("number-of-comments");
    core.info("6");
    core.info(numberOfComments);
    const notion = new Client({ auth: notionApiKey });
    if (notionDatabaseId) {
      notion.pages
        .create({
          parent: { database_id: notionDatabaseId },
          properties: getPropertiesFromIssue(
            issueTitle,
            issueNumber,
            issueState,
            numberOfComments,
            issueUrl,
            issueLabels
          ),
        })
        .then(() => {
          core.endGroup();
        })
        .catch((e) => {
          core.error(e);
          core.endGroup();
        });
    } else {
      core.info(
        `notionDatabaseId: {typeof: ${typeof notionDatabaseId}}, {value: ${notionDatabaseId}} `
      );
      core.endGroup();
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
};

// 何をどうやっても返り値の型がnotion.pages.createに受け入れられなかったのでanyを返す
function getPropertiesFromIssue(
  issueTitle: string,
  issueNumber: string,
  issueState: string,
  numberOfComments: string,
  issueUrl: string,
  issueLabels: IssueLabel[]
): any {
  return {
    Name: {
      type: "title",
      title: [{ type: "text", text: { content: issueTitle } }],
    },
    "Issue Number": {
      type: "number",
      number: Number(issueNumber),
    },
    State: {
      type: "select",
      select: { name: issueState },
    },
    "Number of Comments": {
      type: "number",
      number: Number(numberOfComments),
    },
    "Issue URL": {
      type: "url",
      url: issueUrl,
    },
    Labels: {
      multi_select: issueLabels.map((l) => {
        name: l.name;
      }),
    },
  };
}
