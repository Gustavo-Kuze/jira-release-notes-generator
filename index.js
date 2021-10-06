const { generateReleaseNotes } = require("./jira");

(async () => {
  try {
    const result = await generateReleaseNotes(
      "0.2.1",
      "lighthouseit",
      "APPSJ",
      35,
      186,
      "Sprint 4 - Checkout",
      undefined,
      "gustavo.kuze@lighthouseit.com.br",
      "hG2yOj227VDShY6oBX4EBE39"
    );
    console.log(result);
  } catch (err) {
    console.error("Ocorreu um erro ao gerar as notas da versão:");
    console.error(err);
  }
})();
