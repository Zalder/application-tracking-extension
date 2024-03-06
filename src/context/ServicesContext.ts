import { createContext, useContext } from "react";
import JobApplicationService from "../services/JobApplicationService";

type ServicesContextType = {
  jobApplicationService: JobApplicationService;
};

export const ServicesContext = createContext<ServicesContextType | undefined>(
  undefined
);

export const useServicesContext = () => {
  const servicesContext = useContext(ServicesContext);
  if (!servicesContext)
    throw new Error(
      "No SericeContext Provider found when calling useServicesContext."
    );
  return servicesContext;
};
