import styled from '@emotion/styled';
import { SvgIcon } from '@hs/icons';

const ErrorWrapper = styled.div`
  padding: 8px 12px 0;
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.span`
  margin-left: 8px;
  display: inline-block;
  color: #eb1000;
  font-size: 1.2rem;
`;

const ErrorIcon = styled(SvgIcon)`
  min-width: 24px;
`;
const ActionText = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: underline;
  padding-left: 4px;
`;

export { ActionText, ErrorWrapper, ErrorIcon, ErrorMessage };
