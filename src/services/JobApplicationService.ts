import JobApplication from "../model/JobApplication";

class JobApplicationService {
  applications: JobApplication[] = [];

  constructor() {
    this.loadApplications();
  }

  private async loadApplications() {
    const { applications } = await chrome.storage.local.get("applications");
    this.applications = applications;
  }

  private convertApplicationToCsv = (application: JobApplication) => {
    const valuesArr = [
      application.jobTitle,
      application.companyName,
      application.date,
      "Applied",
      application.jobLocation,
    ];
    return Object.values(valuesArr).join(";");
  };

  async saveApplication(application: JobApplication) {
    this.applications = [...this.applications, application];
    chrome.storage.local.set({ applications: this.applications });
  }

  async saveApplicationsToCsv() {
    const csvData = this.applications
      .map(this.convertApplicationToCsv)
      .join("\n");
    console.log(csvData);

    const blob = new Blob([csvData], { type: "text/csv" });
    const blobURL = URL.createObjectURL(blob);

    chrome.downloads.download({
      url: blobURL,
      filename: "applications.csv",
    });
  }

  async clearApplicationsData() {
    await chrome.storage.local.clear();
  }
}

export default JobApplicationService;
