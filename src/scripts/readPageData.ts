import JobApplication from "../model/JobApplication";
import { ResponseStatus } from "../model/MessageResponse";

chrome.runtime.onMessage.addListener((_message, _sender, sendResponse) => {
  let companyName, jobTitle, jobLocation;

  const jobOriginDomain = location.hostname;

  if (jobOriginDomain === "www.linkedin.com") {
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

    if (!companyName || !jobTitle || !jobLocation) {
      sendResponse({
        status: ResponseStatus.ParsingError,
      });
      return;
    }

    const jobApplication: JobApplication = {
      jobTitle,
      companyName,
      jobLocation,
      date: new Date().toLocaleDateString("fr-FR"),
      jobOriginDomain,
    };

    sendResponse({
      status: ResponseStatus.Success,
      jobApplication,
    });
  } else {
    sendResponse({
      status: ResponseStatus.DomainNotSupported,
    });
  }
});
