export interface SetCookieProps {
  key: string;
  value: Record<string, unknown> | number;
  options?: Record<string, unknown>;
}

export interface GetCookieProps {
  key: string;
}
