const puppeteer = require("puppeteer");

(async () => {
  try {
    const URL =
      "https://espndeportes.espn.com/futbol/posiciones/_/liga/eng.1/liga-premier";
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    let table = await page.evaluate(() => {
      const teams = [...document.querySelectorAll('.hide-mobile')].map(
        (nodeTeam) => nodeTeam.innerText
      );

      const points = [
        ...document.querySelectorAll('.team-position')
      ].map((nodePoints) => nodePoints.innerText);

      return teams.map((team, index) => ({
        team: team,
        point: points[index],
      }));
    });
    console.log(table);
    await browser.close();
  } catch (error) {}
})();
