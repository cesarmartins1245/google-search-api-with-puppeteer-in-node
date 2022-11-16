const puppeteer = require("puppeteer");

let browser;
const searchGoogle = async (searchQuery) => {

    browser = await puppeteer.launch();
    const [page] = await browser.pages();
    await page.setRequestInterception(true);
    page.on("request", request => {
        request.resourceType() === "document" ?
        request.continue() : request.abort();
    });
    await page.goto("https://www.google.com/", {waitUntil: "domcontentloaded"});
    await page.waitForSelector('input[name="q"]', {visible: true});
    await page.type('input[name="q"]', searchQuery);
    await Promise.all([
        page.waitForNavigation({waitUntil: "domcontentloaded"}),
        page.keyboard.press("Enter"),
    ]);
    await page.waitForSelector(".LC20lb", {visible: true});
    const searchResults = await page.$$eval(".LC20lb", els =>
        els.map(e => ({title: e.innerText, url: e.parentNode.href}))
    );
    return searchResults;
};

module.exports = searchGoogle;