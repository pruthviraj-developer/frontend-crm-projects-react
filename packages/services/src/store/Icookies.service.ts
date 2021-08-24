export interface SetCookieProps {
  key: string;
  value: string | Record<string, unknown>;
  options: Record<string, unknown>;
}

export interface GetCookieProps {
  key: string;
}
