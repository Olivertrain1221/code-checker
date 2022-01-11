const API_KEY = "uh2yF8F_dCn_YEHWnzipVSYQO9Y";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const resultsModal = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));

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
    results += `<div> class="key-status">${data.expiry}</div>`

    document.getElementById("resultsModalTitle").innerText = heading;
    document.getElementById("results-content").innerHTML = results;

    resultsModal.show();
}