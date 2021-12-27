export interface IJoinUsProps {
  updateUserStatus: (status?: string) => void;
}
export interface IUserProps {
  name: string;
  email: string;
  phoneNo: string;
  otpReason: string;
}
