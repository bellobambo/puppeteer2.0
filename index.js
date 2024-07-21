const puppeteer = require("puppeteer");
const fs = require("fs");

async function run() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.traversymedia.com/");

  //   await page.screenshot({ path: "example.png", fullPage: true });
  //   await page.pdf({ path: "example.pdf", fullPage: "A4" });

  //   const html = await page.content();

  //   const title = await page.evaluate(() => document.title);

  //   const text = await page.evaluate(() => document.body.innerText);

  const courses = await page.$$eval("#cscourses .card", (elements) =>
    elements.map((e) => ({
      title: e.querySelector(".card-body h3").innerText,
      level: e.querySelector(".card-body .level").innerText,
      url: e.querySelector(".card-footer a").href,
    }))
  );

  console.log(courses);
  fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log("File Saved");
  });

  await browser.close();
}

run();
