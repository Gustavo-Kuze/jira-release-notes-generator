const axios = require("axios");

// get All issues from jira using axios
const getJiraIssuesAxios = async () => {
  const result = await axios.get(
    `https://lighthouseit.atlassian.net/rest/api/latest/search?jql=project%20%3D%20APPSJ%20AND%20status%20%3D%20Done%20AND%20Sprint%20%3D%20186%20order%20by%20created%20DESC&fields=summary`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic " +
          Buffer.from(
            `gustavo.kuze@lighthouseit.com.br:hG2yOj227VDShY6oBX4EBE39`
          ).toString("base64"),
      },
    }
  );
  return result.data.issues;
};

(async () => {
  try {
    const issues = await getJiraIssuesAxios();
    const jiraDoneIssues = issues.map((issue) => {
      return `- ${issue.fields.summary} - https://lighthouseit.atlassian.net/jira/software/projects/APPSJ/boards/35?selectedIssue=${issue.key}`;
    });
    const releaseNotes = issues.map((issue) => {
      return `- ${issue.fields.summary}`;
    });
    console.log(`Release Notes - Sprint 4 - Checkout

Release Notes - V2.2.0

${releaseNotes.join("\n")}

Tarefas Concluídas:

${jiraDoneIssues.join('\n')}`)
  } catch (err) {
    debugger;
  }
})();
