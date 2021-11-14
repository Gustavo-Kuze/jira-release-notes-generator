#!/usr/bin/env node

const { generateReleaseNotes } = require("./jira");
const { getArgs } = require("./utils");

(async () => {
  const args = getArgs();

  if (args.length === 0 || args.missingArgs) {
    console.log("Required parameters:");
    console.log("--releaseVersion=");
    console.log("--jiraCompanyName=");
    console.log("--jiraProjectName=");
    console.log("--jiraBoardId=");
    console.log("--jiraSprintId=");
    console.log("--jiraUserEmail=");
    console.log("--jiraApiToken=");
    console.log("Optional parameters:");
    console.log("--sprintText=");
    console.log("--jql=");
    console.log("--jiraApiVersion=");
    console.log("--completedTasksText=");
    console.log("----");
    console.log("You forgot to provide the following required params:");
    const { missingArgs, ...rest } = args;
    console.log(rest);
    process.exit(1);
  }

  try {
    const result = await generateReleaseNotes(args);
    console.log(result);
  } catch (err) {
    console.error(
      "An unexpected error occurred while trying to fetch Jira tasks:"
    );
    console.error(err);
  }
})();
