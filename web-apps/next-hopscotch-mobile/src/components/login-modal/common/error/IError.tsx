export interface ILoginErrorProps {
  switchScreen?: (error: IErrorProps) => void;
  error: IErrorProps;
}

export interface IErrorProps {
  messageType?: string;
  message?: string;
  actionText?: string;
  actionLink?: string;
  redirectLink?: string;
  messageUIType?: string;
  messageDisplayTime?: string;
  code?: string;
  messageBar?: string;
  action?: string;
}
