const { sortPages } = require('./report.js')
const { test, expect } = require('@jest/globals')

test('sortPages 2 pages', () => {
    const input = {
        'https://andrew.dev/path': 1,
        'https://andrew.dev': 4
    }
    const actual = sortPages(input)
    const expected = [
        ['https://andrew.dev', 4],
        ['https://andrew.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})

test('sortPages 5 pages', () => {
    const input = {
        'https://andrew.dev/path': 1,
        'https://andrew.dev': 5,
        'https://andrew.dev/path2': 2,
        'https://andrew.dev/path3': 3,
        'https://andrew.dev/path4': 8
    }
    const actual = sortPages(input)
    const expected = [
        ['https://andrew.dev/path4', 8],
        ['https://andrew.dev', 5],
        ['https://andrew.dev/path3', 3],
        ['https://andrew.dev/path2', 2],
        ['https://andrew.dev/path', 1]
    ]
    expect(actual).toEqual(expected)
})