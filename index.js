const { generateReleaseNotes } = require("./jira");
const { getArgs } = require("./utils");

(async () => {
  const args = getArgs();

  if (args.length === 0 || args.missingArgs) {
    console.log("Os seguintes parametros sao obrigatorios:");
    console.log("--releaseVersion=");
    console.log("--jiraCompanyName=");
    console.log("--jiraProjectName=");
    console.log("--jiraBoardId=");
    console.log("--jiraSprintId=");
    console.log("--jiraUserEmail=");
    console.log("--jiraApiToken=");
    console.log("Os seguintes parametros opcionais:");
    console.log("--sprintText=");
    console.log("--jql=");
    console.log("--jiraApiVersion=");
    console.log("----");
    console.log("Voce esqueceu os seguintes parametros obrigatorios:");
    const { missingArgs, ...rest } = args;
    console.log(rest);
    process.exit(1);
  }

  try {
    const result = await generateReleaseNotes(args);
    console.log(result);
  } catch (err) {
    console.error("Ocorreu um erro ao gerar as notas da versão:");
    console.error(err);
  }
})();
