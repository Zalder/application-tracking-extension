chrome.runtime.onMessage.addListener((_message, _sender, sendReponse) => {
  let companyName, jobTitle, jobLocation;

  if (location.hostname === "www.linkedin.com") {
    companyName = document.querySelector(
      "div.job-details-jobs-unified-top-card__primary-description-without-tagline>a"
    )?.textContent;
    jobTitle = document.querySelector(
      "span.job-details-jobs-unified-top-card__job-title-link"
    )?.textContent;
    jobLocation = document
      .querySelector(
        "div.job-details-jobs-unified-top-card__primary-description-without-tagline"
      )
      ?.textContent?.split("·")[1]
      .trim()
      .split(",")[0];
  }

  console.log(companyName);
  console.log(jobTitle);
  console.log(jobLocation);

  sendReponse({
    jobTitle,
    companyName,
    jobLocation,
  });
});
