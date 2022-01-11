const API_KEY = "uh2yF8F_dCn_YEHWnzipVSYQO9Y";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e =>postForm(e));

function processOptions(form) {

    let optArray = [];

    for (let e of form.entries()) {
        if (e[0] === "options") {
            optArray.push(e[1]);
        }
    }
    
    form.delete("options");
    
    form.append("options", optArray.join());

    return form;
}

async function postForm(e) {
    //
    const form = processOptions(new FormData(document.getElementById("checksform")));

    for (let entry of form.entries()) {
        console.log(entry);
    }

    const response = await fetch(API_URL, {
                                method: "POST",
                                headers: {
                                    "Authorization": API_KEY,
                                },
                                body: form,
    })

    const data = await response.json();

    if (response.ok) {
        displaysErrors(data);
    } else {
        throw new Error(data.error);
    }
}


function displaysErrors(data) {
    
    let heading = `JSHint Results for ${data.file}`;

    if (data.total_errors === 0) {
        results = `<div class="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total Errors: <span class ="error_count">${data.total_errors}</span>`
        for (let error of data.error_list) {
            results += `<div> At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`;
        }
    }

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}


async function getStatus(e) {
    //Gets the api with the URL and the KEY
    const queryString = `${API_URL}?api_key=${API_KEY}`;
    // actually fetches the URL
    const response = await fetch(queryString);
    // waits for the response and puts it in json format (javscript object)
    const data = await response.json();
    // if the response is correct ie status 200
    if (response.ok) {
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}


// THis function will change the modal and display the status aswell as the time valid for the API
function displayStatus(data) {
    
    let heading = "API Key Status";
    let results = `<div>Your key is valid until</div>`
    results += `<div class="key-status">${data.expiry}</div>`

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    resultsModal.show();
}
