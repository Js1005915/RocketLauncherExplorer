// ** JavaScript Starter File **
// Purpose: Populate a dropdown of upcoming launches and display mission details
// and a rocket image using callbacks (Part 1), then refactor to promises (Part 2).

// Space Devs development endpoint: no rate limits, but the data is stale and limited.
const BASE_URL = "https://lldev.thespacedevs.com/2.3.0";

// ---------------------------------------------------------------
// PART 1: XMLHttpRequest and callbacks
// ---------------------------------------------------------------

// Step 1: Create getUpcomingLaunches(callback)
// - Makes a GET request to BASE_URL + "/launches/upcoming/"
// - Parses the response
// - Calls the callback function and passes the results array
function getUpcomingLaunches(callback) {
  // TODO: Implement XHR GET request
  const xmlrequest = new XMLHttpRequest()
  xmlrequest.open("GET", BASE_URL + "/launches/upcoming/")

  xmlrequest.onload = function () {
    if (xmlrequest.readyState == 4) {
      if (xmlrequest.status == 200) {
        const data = JSON.parse(xmlrequest.responseText)
        console.log(data)
        callback(data.results)
      }
    }

  }
  xmlrequest.send()
}

// Step 2: Create populateDropdown(launches)
// - Receives an array of launches
// - Adds one <option> per launch: text = launch name, value = launch id
function populateDropdown(launches) {
  // TODO: Iterate and append <option> elements
  launches.forEach((launch) => {
    option = document.createElement("option")
    option.innerText = launch.name
    option.value = launch.id
    dropdown = document.getElementById("launchDropdown")
    dropdown.appendChild(option)
  })
}

// Step 3: Add event listener to #launchDropdown
// - On change, get the selected launch ID
// - Call getLaunchDetails(launchId, callback)
document.getElementById("launchDropdown").addEventListener("change", function () {
  // TODO: Get selected launchId
  // TODO: Call getLaunchDetails
  launchId = document.getElementById("launchDropdown").value
  console.log(launchId)
  getLaunchDetails(launchId, displayLaunchInfo)
});

// Step 4: Create getLaunchDetails(launchId, callback)
// - Makes a GET request to BASE_URL + "/launches/" + launchId + "/"
// - Parses the response and passes the launch object to the callback
function getLaunchDetails(launchId, callback) {
  // TODO: Implement XHR GET request for a single launch
  const xhr = new XMLHttpRequest()
  xhr.open("GET", BASE_URL + "/launches/" + launchId + "/")

  xhr.onload = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        const data = JSON.parse(xhr.responseText)
        console.log(data)
        callback(data)
      }
    }
  }

  xhr.send()
}

// Step 5: Create displayLaunchInfo(launch)
// - Updates #missionDetails with the mission name and description (if available)
// - Creates an image of the rocket (launch.rocket.configuration.image.image_url) and appends it to #rocket
// - If no image is available, displays a message instead
function displayLaunchInfo(launch) {
  // TODO: Display mission name and description
  // TODO: Display the rocket image
  missionDetails = document.getElementById("missionDetails")
  rocket = document.getElementById("rocket")

  missionDetails.replaceChildren()
  rocket.replaceChildren()

  header = document.createElement("h1")
  desc = document.createElement("p")

  header.textContent = launch.name

  if (launch.mission && launch.mission.description){
    desc.textContent = launch.mission.description
  }
  else{
    desc.textContent = "No description provided"
  }
  missionDetails.appendChild(header)
  missionDetails.appendChild(desc)

  if (launch.rocket.configuration && launch.rocket.configuration.image){
    rocketImg = document.createElement("img")
    rocketImg.src = launch.rocket.configuration.image.image_url
    rocketImg.alt = launch.rocket.configuration.image.name

    rocket.appendChild(rocketImg)
  }
  else {
    noImg = document.createElement("p")
    noImg.textContent = "There is no image provided"
    
    rocket.appendChild(noImg)
  }

}

// Final step: kick off the flow
getUpcomingLaunches(populateDropdown);

// ---------------------------------------------------------------
// PART 2: Axios and promises (refactor after Part 1 is committed)
// ---------------------------------------------------------------
// - Replace both XHR requests with axios.get(...).then(...).catch(...)
// - Show "Loading..." in #status while a request is pending
// - Show a clear error message in #status when a request fails
// - Clear the status message when data arrives
