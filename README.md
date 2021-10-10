# 作成中です
# GithubIssueToNotion

## must
Create a table using this template and copy the URL of the page.
https://kajirikajiri.notion.site/963ef208eda14cb592837a6c9b0d9be2?v=ab7609ff7de740fbb2d07708d70fadb9

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
## issueから取得できるeventの参考
https://docs.github.com/ja/actions/learn-github-actions/events-that-trigger-workflows#issues

## issueから取得できる項目の参考
https://docs.github.com/ja/actions/learn-github-actions/events-that-trigger-workflows#:~:text=%E8%A9%B3%E7%B4%B0%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6%E3%81%AF%E3%80%81%E3%80%8C-,Issue,-%E3%80%8D%E3%82%92%E5%8F%82%E7%85%A7%E3%81%97

## runs
https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions
### 構文
https://docs.github.com/ja/actions/creating-actions/metadata-syntax-for-github-actions

## 仕様書
https://octokit.github.io/rest.js/v18#actions

# tasks
- [ ] create issue → notion
- [ ] update issue → notion