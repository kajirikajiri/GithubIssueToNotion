import * as core from "@actions/core";
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
    const {
      issueLabels,
      issueNumber,
      issueState,
      issueTitle,
      issueUrl,
      notionApiKey,
      notionDatabaseId,
    } = getInputList();
    const notion = new Client({ auth: notionApiKey });
    if (notionDatabaseId) {
      notion.pages
        .create({
          parent: { database_id: notionDatabaseId },
          properties: getPropertiesFromIssue(
            issueTitle,
            issueNumber,
            issueState,
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
      core.endGroup();
    }
  } catch (error: any) {
    core.setFailed(error.message);
  }
};

function getInputList() {
  const notionApiKey = core.getInput("notion-internal-api-key");
  const notionDatabaseId = core
    .getInput("notion-database-page-url")
    .split("/")[4]
    ?.split("?")[0];
  const issueTitle = core.getInput("issue-title");
  const issueNumber = core.getInput("issue-number");
  const issueState = core.getInput("issue-state");
  const issueLabelsJson = core.getInput("issue-labels");
  const issueLabels = JSON.parse(
    issueLabelsJson.length ? issueLabelsJson : "[]"
  );
  const issueUrl = core.getInput("issue-url");
  return {
    notionApiKey,
    notionDatabaseId,
    issueTitle,
    issueNumber,
    issueState,
    issueLabels,
    issueUrl,
  };
}

function getPropertiesFromIssue(
  issueTitle: string,
  issueNumber: string,
  issueState: string,
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
    "Issue URL": {
      type: "url",
      url: issueUrl,
    },
    Labels: {
      multi_select: issueLabels.map((l) => {
        return { name: l.name };
      }),
    },
  };
}
