Rocket Launch Explorer

GitHub repository:
https://github.com/YOUR-USERNAME/YOUR-REPO-NAME


Callback version (Part 1)

getUpcomingLaunches takes a callback function as its argument; in this app it is populateDropdown. The XMLHttpRequest is asynchronous, so the callback does not run right away. It runs inside the request's onload handler, only after the response has arrived with a status of 200. At that point the JSON is parsed and the results array is passed to the callback, which builds the dropdown options. getLaunchDetails works the same way, passing the single launch object to displayLaunchInfo.


Axios version (Part 2)

Both XMLHttpRequest calls were replaced with axios.get(), which returns a promise instead of taking an onload handler, and the code now shows "Loading..." in #status while a request is pending. The .then() handler runs when the request succeeds: it clears the status message and passes the response data to the callback. The .catch() handler runs when the request fails (a network problem or an error status code from the server): it displays an error message in #status and logs the error to the console.




STYLES.CSS AND README made by AI