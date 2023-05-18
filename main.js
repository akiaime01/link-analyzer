const {scrapePage} = require('./scrape.js')
const {printReport} = require('./report.js')

async function main() {
    if (process.argv.length < 3) {
        console.log("No Website Provided")
        process.exit(1)
    }

    if (process.argv.length > 3) {
        console.log("Too Many Command Line Arguments")
        process.exit(1)
    }

    const baseURL = process.argv[2]

    console.log(`Starting Crawl of ${baseURL}`)
    const pages = await scrapePage(baseURL, baseURL, {})
    printReport(pages)
}

main()