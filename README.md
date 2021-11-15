# jira-release-notes-generator

CLI for automatically generating Jira Release Notes

## Before you begin

You're gonna need a Jira APÌ Key. Refer to [Create a Jira API Key](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/) to create one.

## Usage

1. Put all issues you want to be shown in the release notes at the "Done" column of your board
2. Execute this command

```
npx jira-release-notes-generator --releaseVersion="2.14.2" --jiraCompanyName="XiruDosPampasLTDA" --jiraProjectName="TodoListApp" --jiraBoardId="23" --jiraSprintId="323" --jiraUserEmail="user@xirudospampas.com" --jiraApiToken="dG1ySj22DVDahY62BX4aBF3P" --completedTasksText="Completed Tasks:"
```

**Output**:

```
Release Notes - V2.14.2

- Enable crashlytics
- Fix: the todo items where toooooo big

Completed Tasks:

- Enable crashlytics - https://XiruDosPampasLTDA.atlassian.net/jira/software/projects/TodoListApp/boards/23?selectedIssue=TodoListApp-513
- Fix: the todo items where toooooo big - https://XiruDosPampasLTDA.atlassian.net/jira/software/projects/TodoListApp/boards/23?selectedIssue=TodoListApp-514
```

## Available Parameters



| Parameter             |      Default       | Required |
| --------------------- | :----------------: | -------: |
| --releaseVersion=     |         ""         |     true |
| --jiraCompanyName=    |         ""         |     true |
| --jiraProjectName=    |         ""         |     true |
| --jiraBoardId=        |         ""         |     true |
| --jiraSprintId=       |         ""         |     true |
| --jiraUserEmail=      |         ""         |     true |
| --jiraApiToken=       |         ""         |     true |
| --sprintText=         |         ""         |     true |
| --jql=                |         ""         |    false |
| --jiraApiVersion=     |      "latest"      |    false |
| --completedTasksText= | "Completed Tasks:" |    false |
