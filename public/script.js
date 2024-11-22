const longUrlInput = document.querySelector("#long-url");
const generateBtn = document.querySelector("#generate-link");
const analyticBtn = document.querySelector("#analyze-link");

generateBtn.addEventListener("click", () => {
  const baseURL = window.location.href;
  const longURL = longUrlInput.value;
  try {
    // Make a POST request using fetch
    fetch("/url/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: longURL }), // Send the data as JSON
    })
      .then((res) => res.json())
      .then((data) => {
        const shortLink = `${baseURL}url/${data.id}`;
        document.querySelector("#short-link").textContent = shortLink;
        console.log(shortLink);
      });
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("responseMessage").textContent =
      "An error occurred.";
  }
});


analyticBtn.addEventListener("click", ()=> {
  window.location.href = "/analytic"; // Navigate to another EJS page. Change the base url with base_url/analytic in browser search bar which is route of analytic.ejs page render by express server
})

