export interface HsSnackbarProps {
  open: boolean;
  message: string;
  type: ErrorType['type'];
  onSnackBarClose: (open: boolean) => void;
}
export interface ErrorType {
  type: 'success' | 'info' | 'warning' | 'error' | undefined;
}
