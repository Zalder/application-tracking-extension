import JobApplication from "./model/JobApplication";
import MessageResponse, { ResponseStatus } from "./model/MessageResponse";

const saveApplication = async (application: JobApplication) => {
  let applications = (await getApplicationData()) ?? [];
  applications = [...applications, application];
  chrome.storage.local.set({ applications });
};

const getApplicationData = async () => {
  const { applications } = await chrome.storage.local.get("applications");
  return applications;
};

const saveApplicationsToCsv = async () => {
  const applications = await getApplicationData();
  console.log(applications);
  const csvData = applications.map(applicationsToCsv).join("\n");
  console.log(csvData);

  const blob = new Blob([csvData], { type: "text/csv" });
  const blobURL = URL.createObjectURL(blob);

  chrome.downloads.download({
    url: blobURL,
    filename: "applications.csv",
  });
};

const clearApplicationsData = async () => {
  await chrome.storage.local.clear();
};

const applicationsToCsv = (application: JobApplication) => {
  const valuesArr = [
    application.jobTitle,
    application.companyName,
    application.date,
    "Applied",
    application.jobLocation,
  ];
  return Object.values(valuesArr).join(";");
};

function App() {
  const onTrackApplication = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    if (tab.id) {
      const res = await chrome.tabs.sendMessage<null, MessageResponse>(
        tab.id,
        null
      );

      if (res.status === ResponseStatus.Success) {
        const { jobApplication } = res;

        if (jobApplication && !Object.values(jobApplication).some((e) => !e)) {
          saveApplication(jobApplication);
          console.log(jobApplication);
        }
      }
    }
  };
  return (
    <>
      <button onClick={onTrackApplication}>Add job application</button>
      <button onClick={() => saveApplicationsToCsv()}>
        Download job applications
      </button>
      <button onClick={() => clearApplicationsData()}>Clear data</button>
    </>
  );
}

export default App;
