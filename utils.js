const whichArgsAreMissing = ({
  releaseVersion,
  jiraCompanyName,
  jiraProjectName,
  jiraBoardId,
  jiraSprintId,
  sprintText,
  jql,
  jiraUserEmail,
  jiraApiToken,
  jiraApiVersion,
}) => {
  const missingArgs = [];

  if (!releaseVersion) missingArgs.push("releaseVersion");
  if (!jiraCompanyName) missingArgs.push("jiraCompanyName");
  if (!jiraProjectName) missingArgs.push("jiraProjectName");
  if (!jiraBoardId) missingArgs.push("jiraBoardId");
  if (!jiraSprintId) missingArgs.push("jiraSprintId");
  if (!jiraUserEmail) missingArgs.push("jiraUserEmail");
  if (!jiraApiToken) missingArgs.push("jiraApiToken");

  return missingArgs.length > 0 ? missingArgs : false;
};

const getArgs = () => {
  let releaseVersion = "";
  let jiraCompanyName = "";
  let jiraProjectName = "";
  let jiraBoardId = "";
  let jiraSprintId = "";
  let sprintText = "";
  let jql = "";
  let jiraUserEmail = "";
  let jiraApiToken = "";
  let jiraApiVersion = "latest";
  let completedTasksText = "Completed tasks:";

  const args = process.argv.slice(2);

  args.forEach((arg) => {
    const [key, value] = arg.split("=");
    switch (key) {
      case "--releaseVersion":
        releaseVersion = value;
        break;
      case "--jiraCompanyName":
        jiraCompanyName = value;
        break;
      case "--jiraProjectName":
        jiraProjectName = value;
        break;
      case "--jiraBoardId":
        jiraBoardId = value;
        break;
      case "--jiraSprintId":
        jiraSprintId = value;
        break;
      case "--sprintText":
        sprintText = value;
        break;
      case "--jql":
        jql = value;
        break;
      case "--jiraUserEmail":
        jiraUserEmail = value;
        break;
      case "--jiraApiToken":
        jiraApiToken = value;
        break;
      case "--jiraApiVersion":
        jiraApiVersion = value;
        break;
      case "--completedTasksText":
        completedTasksText = value;
        break;
      default:
        break;
    }
  });

  const missingArgs = whichArgsAreMissing({
    releaseVersion,
    jiraCompanyName,
    jiraProjectName,
    jiraBoardId,
    jiraSprintId,
    sprintText,
    jql,
    jiraUserEmail,
    jiraApiToken,
    jiraApiVersion,
  });

  if (missingArgs) return { missingArgs: true, ...missingArgs };

  return {
    releaseVersion,
    jiraCompanyName,
    jiraProjectName,
    jiraBoardId,
    jiraSprintId,
    sprintText,
    jql,
    jiraUserEmail,
    jiraApiToken,
    jiraApiVersion,
    completedTasksText,
  };
};

module.exports = {
  getArgs,
  whichArgsAreMissing,
};
