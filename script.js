//EVENT LISTENERS
//Window Load
window.addEventListener("load", () => {
    setTimeout(() => {
        let loader = document.getElementById("load-container")
        loader.remove()
    }, 1500)    
})
//Search bar
document.getElementById("search-button").addEventListener("click", () => {
    let userSearch = document.getElementById("search-bar").value
    query(userSearch, 1)
})

//Quick links
let quickLink = document.getElementsByClassName("quick-link")
for(let i = 0; i < quickLink.length; i++) {
    quickLink[i].addEventListener("click", () => {
        query(quickLink[i].innerHTML, 1);
    })
}

const searchspringURL = "https://api.searchspring.io/api/search/search.json"




//Function definitions
function query(term, pageNumber) {
    if(document.getElementById("search-results").classList.contains("d-none")) {
        document.getElementById("search-results").classList.remove("d-none")
    }
    const searchParameters = new URLSearchParams({
        q: term,
        resultsFormat: "native",
        siteId: "scmq7n",
        page: pageNumber
    })

    return new Promise((resolve) => {
        fetch(searchspringURL + "?" + searchParameters)
            .then(response => response.json())
            .then(data => {
                // resolve(data)
                let pageInfo = createPageDataObject(data)
                document.getElementById("user-searched").innerText = term
                console.log(data)
            })
            .catch(error => console.log(error))
    })
}

function createPageDataObject(searchData) {
    let pageObject = {
        current: searchData.pagination.currentPage,
        next: searchData.pagination.nextPage,
        previous: searchData.pagination.previousPage
    }

    console.log(pageObject)
    return pageObject;
}