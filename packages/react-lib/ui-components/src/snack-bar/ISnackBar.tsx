export interface HsSnackbarProps {
  open: boolean;
  message: string;
  type: ErrorType['type'];
  onSnackBarClose: (event: any) => void;
}
export interface ErrorType {
  type: 'success' | 'info' | 'warning' | 'error' | undefined;
}
