import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useServicesContext } from "./context/ServicesContext";
import MessageResponse, { ResponseStatus } from "./model/MessageResponse";

function App() {
  const [isIconDisplayed, setIsIconDisplayed] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const { jobApplicationService } = useServicesContext();

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
          jobApplicationService.saveApplication(jobApplication);
          console.log(jobApplication);
        }
      }

      setIsAddSuccess(res.status === ResponseStatus.Success);
      setIsIconDisplayed(true);
      setTimeout(() => setIsIconDisplayed(false), 3000);
    }
  };

  return (
    <div className="text-sm p-1">
      <div className="flex flex-row gap-1 items-center">
        <button onClick={onTrackApplication}>Add job application</button>
        {isIconDisplayed && (
          <FontAwesomeIcon
            icon={isAddSuccess ? faCheck : faX}
            style={{ color: isAddSuccess ? "#63E6BE" : "#ff3d3d" }}
          />
        )}
      </div>
      <button onClick={() => jobApplicationService.saveApplicationsToCsv()}>
        Download job applications
      </button>
      <button onClick={() => jobApplicationService.clearApplicationsData()}>
        Clear data
      </button>
    </div>
  );
}

export default App;
