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
                displayPageButtons(pageInfo)
                document.getElementById("user-searched").innerText = term
                createProducts(data.results)
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

function displayPageButtons(pageObj) {
    let left = document.getElementById("left")
    let right = document.getElementById("right")
    if(pageObj.next != 0) {
        right.classList.remove("d-none")
    } else if(pageObj.next == 0) {
        right.classList.add("d-none")
    }
    if(pageObj.previous != 0) {
        left.classList.remove("d-none")
    } else if(pageObj.previous == 0) {
        left.classList.add("d-none")
    }
}

function createProducts(results) {
    console.log(results)
    let html = ""
    results.forEach(element => {
        html += "<div class=\"card flex\">" +
        "<img src=\"" + element.thumbnailImageUrl + "\">" +
        "<h3>" + element.name + "</h3>"
        
        if(element.on_sale[0] == "No") {
            html += "<h4>$" + parseFloat(element.price).toFixed(2) + "</h4>"
        } else {
            html += "<p><strike>$" + parseFloat(element.price).toFixed(2) + "</strike></p>" + " " + 
            "<h4>$" + parseFloat(element.ss_sale_price).toFixed(2) + "</h4>"
        }

        html += "<div class=\"add-to-cart\">Add to Cart</div>" +
        "</div>"  
    
    });

    document.getElementById("products").innerHTML = html
}