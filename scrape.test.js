const { normalizeURL, getURLsFromHTML } = require('./scrape.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () => {
    const input = 'https://andrew.dev/path'
    const actual = normalizeURL(input)
    const expected = 'andrew.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
    const input = 'https://andrew.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'andrew.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
    const input = 'https://ANDREW.dev/path'
    const actual = normalizeURL(input)
    const expected = 'andrew.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL http', () => {
    const input = 'http://andrew.dev/path'
    const actual = normalizeURL(input)
    const expected = 'andrew.dev/path'
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML absolute', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href = "https://andrew.dev/path/">
            andrew.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://andrew.dev/path/"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://andrew.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML relative', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href = "/path/">
            andrew.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://andrew.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://andrew.dev/path/"]
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML both', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href = "https://andrew.dev/path1/">
            andrew.dev Blog Path 1
        </a>
        <a href = "/path2/">
            andrew.dev Blog Path 2
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://andrew.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://andrew.dev/path1/", "https://andrew.dev/path2/" ]
    expect(actual).toEqual(expected)
})

test('getURLSFromHTML invalid', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href = "invalid">
            andrew.dev Blog
        </a>
    </body>
</html>
`
    const inputBaseURL = "https://andrew.dev"
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})