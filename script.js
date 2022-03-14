window.addEventListener("load", () => {
    setTimeout(() => {
        let loader = document.getElementById("load-container")
        loader.remove()
    }, 1500)    
})

const searchspringURL = "https://api.searchspring.io/api/search/search.json"

function query(term, pageNumber) {
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
                resolve(data)
                console.log(data)
            })
            .catch(error => console.log(error))
    })
}