export interface ProgressBarProps {
  action: string;
  statusCode: number;
  data: ProgressbarData[] | null;
}

interface ProgressbarData {
  title: string;
  info: InfoData[] | null;
}

interface InfoData {
  label: string;
  value: number;
}
