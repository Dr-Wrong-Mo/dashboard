import * as json from '../json/bookmarks.json'
const bookmarks = document.getElementById('bookmarks')

let links = json
links = links.links

function manageBookmarks() {    
    links.forEach(el => {
        let template = document.createElement("li")
        template.classList.add('bookmark')
        template.innerHTML = `<a href="${el.url}" target="_blank">${el.name}</a>`
        bookmarks.appendChild(template)        
    });
}

export default manageBookmarks;