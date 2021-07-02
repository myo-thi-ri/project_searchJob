document.querySelector(".button-container").addEventListener("click", () => {
  let text = document.getElementById("filter-jobs").value;
  getJobs().then((jobs) => {
    let filteredJobs = filterJobs(jobs, text);
    showJobs(filteredJobs);
  });
});

function getJobs() {
  return fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function getQuote() {
  return fetch("https://favqs.com/api/qotd")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.quote.body);
      return data.quote.body;
    });
}

function filterJobs(jobs, searchText) {
  if (searchText) {
    let filteredItems = jobs.filter((job) => {
      if (
        job.roleName.toLowerCase().includes(searchText) ||
        job.type.toLowerCase().includes(searchText) ||
        job.company.toLowerCase().includes(searchText) ||
        job.requirements.content.toLowerCase().includes(searchText)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return filteredItems;
  } else {
    return jobs;
  }
}

function showQuote(quote) {
  let quoteContainer = document.querySelector(".quote-container");
  quoteContainer.innerHTML = `<h3>${quote}</h3>`;
}

function showJobs(jobs) {
  // console.log("Jobs in showJobs", jobs);
  let jobsContainer = document.querySelector(".jobs-container");
  let jobsHTML = "";
  jobs.forEach((job) => {
    jobsHTML += `
        <div class="job-tile">
          <div class="top">
            <img src="${job.logo}" alt="" />
            <span class="material-icons more_horiz">more_horiz</span>
          </div>
          <div class="rolename">
            <span>${job.roleName}</span>
          </div>
          <div class="description">
            <span
              >${job.requirements.content}</span>

          </div>
          <div class="buttons">
            <div class="button apply-now">Apply Now</div>
            <div class="button">Message</div>
          </div>
        </div>

      `;
  });

  jobsContainer.innerHTML = jobsHTML;

  document.querySelector(".count").innerHTML = `Showing ${jobs.length} jobs`;
}

getJobs().then((data) => {
  showJobs(data);
});

getQuote().then((data) => {
  showQuote(data);
});
