const axios = require("axios");

const getJiraIssuesAxios = async (
  jql,
  jiraCompanyName,
  jiraProjectName,
  jiraSprintId,
  jiraUserEmail,
  jiraApiToken,
  jiraApiVersion = "latest"
) => {
  const result = await axios.get(
    `https://${jiraCompanyName}.atlassian.net/rest/api/${jiraApiVersion}/search?jql=${
      jql
        ? jql
        : `project%20%3D%20${jiraProjectName}%20AND%20status%20%3D%20Done%20AND%20Sprint%20%3D%20${jiraSprintId}%20order%20by%20created%20DESC`
    }&fields=summary`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(`${jiraUserEmail}:${jiraApiToken}`).toString("base64"),
      },
    }
  );
  return result.data.issues;
};

const generateReleaseNotes = async ({
  releaseVersion,
  jiraCompanyName,
  jiraProjectName,
  jiraBoardId,
  jiraSprintId,
  sprintText,
  jql,
  jiraUserEmail,
  jiraApiToken,
  jiraApiVersion = "latest",
  completedTasksText = "Completed tasks:",
}) => {
  try {
    const issues = await getJiraIssuesAxios(
      jql,
      jiraCompanyName,
      jiraProjectName,
      jiraSprintId,
      jiraUserEmail,
      jiraApiToken,
      jiraApiVersion
    );

    const jiraDoneIssues = issues.map((issue) => {
      return `- ${issue.fields.summary} - https://${jiraCompanyName}.atlassian.net/jira/software/projects/${jiraProjectName}/boards/${jiraBoardId}?selectedIssue=${issue.key}`;
    });

    console.log(jiraDoneIssues.length);

    const releaseNotes = issues.map((issue) => {
      return `- ${issue.fields.summary}`;
    });

    return `${sprintText ? `Release Notes - ${sprintText}` : ""}

Release Notes - V${releaseVersion}

${releaseNotes.join("\n")}

${completedTasksText}

${jiraDoneIssues.join("\n")}`;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = {
  generateReleaseNotes,
  getJiraIssuesAxios,
};
