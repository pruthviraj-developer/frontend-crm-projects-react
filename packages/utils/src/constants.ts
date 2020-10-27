export interface apiErrorMessageDetail {
  code?: string;
  messageType?: string;
  messageUIType: string;
  message: string;
  actionText: string;
  actionLink?: string;
  actionTextRight?: string;
  actionLinkRight?: string;
  title?: string;
  redirectLink?: string;
  value: string;
  backgroundApi?: string;
}
export interface apiErrorMessage {
  status: string;
  messageDetail?: apiErrorMessageDetail;
  errorMessage: string;
}
