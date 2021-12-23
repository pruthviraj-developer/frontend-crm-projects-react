export interface IJoinUsProps {
  updateUserStatus: (status?: string) => void;
}
export interface IUserProps {
  name: string;
  type: string;
  email: string;
  phoneNo: string;
  loginId: string;
  otpReason: string;
}
