export interface ErrorPanelProps {
  header?: string;
  messages?: Array<string>;
  onCopy?: (isCopied?: boolean) => void;
}
