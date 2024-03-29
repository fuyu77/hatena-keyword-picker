const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(process.argv[2])
  // 記事中のはてなブログタグを配列として取得する
  const keywords = await page.$$eval('a.keyword', (nodes) => nodes.map((node) => node.innerText))
  // 取得したはてなブログタグの重複数を集計する
  const keywordsWithCount = keywords.reduce((result, keyword) => {
    return {
      ...result,
      [keyword]: result[keyword] ? result[keyword] + 1 : 1
    }
  }, {})
  console.log(keywordsWithCount)
  await browser.close()
})()
