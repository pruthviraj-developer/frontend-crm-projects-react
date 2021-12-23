import React, { FC } from 'react';
import { IconErrorMessage } from '@hs/icons';
import { ILoginErrorProps } from './IError';
import { ActionText, ErrorWrapper, ErrorIcon, ErrorMessage } from './StyedError';

export const Error: FC<ILoginErrorProps> = ({ switchScreen, error }: ILoginErrorProps) => {
  const action = () => {
    if (error.actionLink && error.redirectLink) {
      switchScreen(error);
    }
  };

  return (
    <ErrorWrapper onClick={action}>
      <ErrorIcon icon={IconErrorMessage} />
      <ErrorMessage>
        {error.message}
        {error.actionLink && <ActionText>{error.actionText}</ActionText>}
      </ErrorMessage>
    </ErrorWrapper>
  );
};
