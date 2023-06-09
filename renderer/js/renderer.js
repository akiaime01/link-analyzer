const { JSDOM } = require('jsdom')
const Toastify = require('toastify-js')

async function getReportOnClick() {
    spinnerOn()
    const url = document.querySelector('#url')
    try {
        const pages = await scrapePage(url.value, url.value, {})
        const csvdata = csvMaker(pages)
        download(csvdata)
        spinnerOff()
        alertSuccess(url.value+ " Successfully Analyzed!")
    } catch(err) {
        alertError("Please Enter a Valid URL")
        spinnerOff()
    }
}

async function scrapePage(baseURL, currentURL, pages) {

    const baseURLObj = new URL(baseURL)
    const currentURLObj = new URL(currentURL)

    const normalizedCurrentURL = normalizeURL(currentURL)
    if (pages[normalizedCurrentURL] > 0) {
        pages[normalizedCurrentURL]++
        return pages
    }
    pages[normalizedCurrentURL] = 1

    if (baseURLObj.hostname !== currentURLObj.hostname) {
        //console.log(`EXTERNAL URL FOUND: ${currentURL}`)
        return pages
    }
    console.log(`Actively Scraping ${currentURL}`)

    try {
        const response = await fetch(currentURL)

        if (response.status > 399) {
            //console.log(`error in fetch with status code ${response.status} on page: ${currentURL}`)
            return pages
        }

        const contentType = response.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            //console.log(`non html response, content type: ${contentType} on page: ${currentURL}`)
            return pages
        }

        const htmlBody = await response.text()

        const nextURLS = getURLsFromHTML(htmlBody, baseURL)

        for (const nextURL of nextURLS) {
            pages = await scrapePage(baseURL, nextURL, pages)
        }
        return pages

    } catch (err) {
        //console.log(`error in fetch: ${err.message}, on page: ${currentURL}`)
    }
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            //  IS THE OBJECT IN THE LINK A VALID URL?
            // IF the new URL Object Throws an Error we know the 'a' tag is NOT a URL
            try {
                urls.push(new URL(linkElement.href, baseURL).href)
            } catch (err) {
                // console.log(`error with relative url: ${err.message}`)
            }
        } else {
            // absolute
            try {
                urls.push(new URL(linkElement.href).href)
            } catch (err) {
                // console.log(`error with absolute url: ${err.message}`)
            }
        }
    }
    return urls
}

function normalizeURL(urlString) {
    // built in URL constructor
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    // if the last character of the input URL is a / remove the slash
    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1)
    }
    return hostPath
}


function csvMaker(pages) {
    csvRows = []
    const sortedPages = sortPages(pages)
    const headers = ["Url", "Hits"]
    csvRows.push(headers)
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hits = sortedPage[1]
        const values = [url, hits]
        csvRows.push(values)
    }
    return csvRows.join('\n')
}

function download(pages) {
    const blob = new Blob([pages], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', '.csv')
    a.click()
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a, b) => {
        aHits = a[1]
        bHits = b[1]
        return bHits - aHits
    })
    return pagesArr
}

function spinnerOn() {
    document.getElementsByClassName("loader")[0].style.display = "block";
    document.getElementsByClassName("button1")[0].style.display = "none";
    document.getElementsByClassName("advancedSearchTextBox")[0].style.display = "none";
}
function spinnerOff() {
    document.getElementsByClassName("loader")[0].style.display = "none";
    document.getElementsByClassName("button1")[0].style.display = "block";
    document.getElementsByClassName("advancedSearchTextBox")[0].style.display = "block";
}

function alertError(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: false,
        style: {
            background: 'red',
            color: 'white',
            textAlign: 'center'
        }
    }).showToast()
}

function alertSuccess(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: false,
        style: {
            background: 'green',
            color: 'white',
            textAlign: 'center'
        }
    }).showToast()
}