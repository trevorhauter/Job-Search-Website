// displays all jobs when user first loads the page
// adding .then at the end makes it wait for the promise to be fulfilled
// then once it has the data it calls the showjobs function and passes it the jobs
getJobs().then(jobs => {
    showJobs(jobs);
});

// listens to the element that has the button-container class
document.querySelector(".search-button-container").addEventListener("click", () => {
    // gets the value from the search bar
    let searchText = document.getElementById("filter-jobs").value;
    // // calls the search function and passes it the value
    getJobs().then(jobs => {
        search(jobs, searchText);
    });
});

function getJobs(){
    // grabs the json file and the data from it
    // its returning the fetch, which makes it a promise and it guarentees the data will be there at some point... idk lol
    return fetch("data.json")
    // waits for the response from the json file
    // converts it a json object
    .then(response => response.json())
    .then(data => {
        // returns the data
        return data;
    });
}

function showJobs(jobs) {
    // grabs the jobs-list html, this is where we'll put each job tile
    let jobsList = document.querySelector(".jobs-list");
    // creates a variable that will contain all of our html for each job tile
    let jobsHTML = "";

    jobs.forEach(job => {
        jobsHTML += `
        <div class="job-tile">
            <div class="tile-top">
                <img src="${job.logo}">
                <span class="more-info">
                    <i class="fas fa-ellipsis-h"></i>
                </span>
            </div>
            <div class="job-title">
                <span>${job.roleName}</span>
            </div>
            <div class="job-description">
                <span>${job.requirements.content}</span>
            </div>
            <div class="job-button-container">
                <div class="button apply-now">
                    Apply Now
                </div>
                <div class="button">
                    Message
                </div>
            </div>
        </div>`});
    
    jobsList.innerHTML = jobsHTML
}

function search(jobs, search) {
    // if search is set
    if(search){
        // calls a filter function that allows us to specify which items we want
        let results = jobs.filter(job => {
            // logic for each job in job to decide what we want to keep
            if(job.roleName.toLowerCase().includes(search.toLowerCase())
                || job.type.toLowerCase().includes(search.toLowerCase())
                || job.company.toLowerCase().includes(search.toLowerCase())
                || job.requirements.content.toLowerCase().includes(search.toLowerCase())) {
                return true;
            } else {
                return false;
            }
        });
        showJobs(results);
    } else{
        showJobs(jobs);
    }
}