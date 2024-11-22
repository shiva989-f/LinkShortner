const getAnalytic = document.querySelector("#get-analytic");
const generatePageBtn = document.querySelector("#generate-link-page");
const shortIdInput = document.querySelector("#short-id");
const baseURL = window.location.origin;

getAnalytic.addEventListener("click", () => {
  const shortId = shortIdInput.value;
  if (shortId != "") {
    fetch(`${baseURL}/url/analytic/${shortId}`)
    .then((res) => res.json())
    .then((data)=> {
        let timeDate = ""
        data.TimeDate.map((item, index) => {
            timeDate += `(${index+1}) Date: ${item.Date}, Time: ${item.Time}\n`
        })
        const result = `
        Original Link: ${data.Link}\nVisits: ${data.Visits}\nTime & Date : ${timeDate}
        `
        document.querySelector("#analytics-details").innerText = result
        
    })
    .catch(error => document.querySelector("#analytics-details").innerText = "Can't Find Analytics, Please Check your Short ID")
  }
});

generatePageBtn.addEventListener("click", ()=> {
    window.location = baseURL
})
