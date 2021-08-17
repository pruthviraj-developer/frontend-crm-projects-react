import { HTMLAttributes, FC, SVGProps } from 'react';

export interface LeftNavBarProps extends HTMLAttributes<HTMLDivElement> {
  navList?: LeftNavItemProps[];
}
export interface LeftNavItemProps extends HTMLAttributes<HTMLDivElement> {
  linkUrl: string;
  linkText?: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}
