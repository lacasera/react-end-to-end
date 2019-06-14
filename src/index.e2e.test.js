"use stict";
const { expect } = require("chai");

const browsers = [
  {
    name: "Chrome",
    package: require("puppeteer")
  },
  {
    name: "Fire Fox",
    package: require("puppeteer-firefox")
  },
  {
    name: "Microsoft Edge",
    package: require("puppeteer-edge")
  }
];

const appUrl = "http://localhost:3000/";

browsers.forEach(b => {
  let browser, opts, page;
  describe(`${b.name} Test for Home Page`, () => {
    before(async () => {
      opts = {
        headless: true,
        slowMo: 100,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
      };

      browser = await b.package.launch(opts);
      page = await browser.newPage();
    });

    after(async () => {
      await page.close();
      await browser.close();
    });

    it("should Page Title", async () => {
      await page.goto(appUrl);
      const title = await page.$eval("title", e => e.innerHTML);

      expect(title).equal("Search Github");
    });

    it("it should contain title", async () => {
      await page.goto(appUrl);
      const pageTitle = await page.$eval("h1.ui.header", e => e.innerHTML);

      expect(pageTitle).equal("Search For Your Repo on Github");
    });

    it("it should fill the search box", async () => {
      await page.goto(appUrl);
      await page.type("#username", "lacasera");
      await page.click(".ui.button");
      await page.waitForSelector(".ui.card");
      const res = await page.$eval(".ui.card", e => e.innerHTML);
      console.log(res);
      // expect(pageTitle).equal("Search For Your Repo on Github");
    });
  });
});
