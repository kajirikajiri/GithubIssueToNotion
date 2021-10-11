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
    const env = process.env as any;
    const notionApiKey = process.env.NOTION_INTERNAL_API_KEY;
    const notionDatabaseId =
      process.env.NOTION_DATABASE_PAGE_URL?.split("/")[4].split("?")[0];
    const issueTitle = core.getInput("issue-title");
    const issueNumber = core.getInput("issue-number");
    const issueState = core.getInput("issue-state");
    const issueLabelsJson = core.getInput("issue-labels");
    core.info(issueLabelsJson);
    const issueLabels = issueLabelsJson;
    const issueUrl = core.getInput("issue-url");
    const numberOfComments = core.getInput("number-of-comments");
    const notion = new Client({ auth: notionApiKey });
    core.info(issueTitle);
    core.info(issueNumber);
    core.info(issueState);
    core.info(issueUrl);
    core.info(numberOfComments);
    if (notionDatabaseId) {
      notion.pages
        .create({
          parent: { database_id: notionDatabaseId },
          properties: getPropertiesFromIssue(
            issueTitle,
            issueNumber,
            issueState,
            numberOfComments,
            issueUrl
            // issueLabels
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

declare type WithAuth<P> = P & {
  auth?: string;
};

// 何をどうやっても返り値の型がnotion.pages.createに受け入れられなかったのでanyを返す
function getPropertiesFromIssue(
  issueTitle: string,
  issueNumber: string,
  issueState: string,
  numberOfComments: string,
  issueUrl: string
  // issueLabels: IssueLabel[]
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
    // Labels: {
    //   multi_select: issueLabels.map((l) => {
    //     name: l.name;
    //   }),
    // },
  };
}
