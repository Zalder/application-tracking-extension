import JobApplication from "./JobApplication";

export enum ResponseStatus {
  Success,
  DomainNotSupported,
  ParsingError,
}

type MessageResponse = {
  status: ResponseStatus;
  jobApplication?: JobApplication;
};

export default MessageResponse;
