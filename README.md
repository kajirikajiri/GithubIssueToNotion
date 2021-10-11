# 作成中です
# GithubIssueToNotion

## must
`1. Create a table using this template and copy the URL of the page.`
https://kajirikajiri.notion.site/963ef208eda14cb592837a6c9b0d9be2?v=ab7609ff7de740fbb2d07708d70fadb9

`2. Process the copied url.`
https://YOUR_WORKSPACE.notion.site/12345678123412341234123456789012?v=22222222222222222222222222222222
↓
12345678123412341234123456789012
↓
12345678-1234-1234-1234-123456789012
`3. Register Repository secrets`
key: NOTION_DATABASE_ID
value: Value created in `2. Process the copied url.` ex) 12345678-1234-1234-1234-123456789012

`4. register Repository secrets to NOTION_INTERNAL_API_KEY`
key: NOTION_INTERNAL_API_KEY
value: Your Internal API KEY(https://www.notion.so/my-integrations)


```
name: CI
on:
  issues:
    types: [opened, edited, closed, reopened, deleted]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:      
      - uses: actions/GithubIssueToNotion@latest
      - name: Github issue to Notion
        uses: actions/GithubIssueToNotion@latest
        with:
          notion-internal-api-key: ${{ secrets.NOTION_INTERNAL_API_KEY }}
          notion-database-page-url: ${{ secrets.NOTION_DATABASE_PAGE_URL }}
          issue-title: ${{ github.event.issue.title }}
          issue-number: ${{ github.event.issue.number }}
          issue-state: ${{ github.event.issue.state }}
          issue-tags-url: ${{ github.event.issue.tags_url }}
          issue-url: ${{ github.event.issue.html_url }}
          number-of-comments: ${{ github.event.issue.comments }}
```
