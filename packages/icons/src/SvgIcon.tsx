import React, { FC } from 'react';

interface SVGIconProps extends React.SVGProps<SVGSVGElement> {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const SvgIcon: FC<SVGIconProps> = (Props) => {
  const { className, icon: Icon, ...otherIconProps } = Props;
  return <Icon className={className} {...otherIconProps}></Icon>;
};
