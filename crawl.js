function normalizeURL(urlString) {
    // built in URL constructor
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    // if the last character of the input URL is a / remove the slash
    if (hostPath.length > 0 & hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeURL
}