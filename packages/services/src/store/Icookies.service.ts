export interface SetCookieProps {
  key: string;
  value: any;
  options?: Record<string, unknown>;
}

export interface GetCookieProps {
  key: string;
}
