// urlHelper.js

// Funktion zum Entfernen von Dateinamen aus URLs
function removeFileName(url) {
    const parts = url.split('/');
    parts[parts.length - 1] = '';
    return parts.join('/');
}

// Funktion zum Modifizieren der URLs
function modifyURLs(urls) {
    return urls.map(url => removeFileName(url));
}