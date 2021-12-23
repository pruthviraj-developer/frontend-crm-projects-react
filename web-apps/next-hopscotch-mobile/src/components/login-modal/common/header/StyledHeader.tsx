import styled from '@emotion/styled';
import { SvgIcon } from '@hs/icons';

const LoginModalHeaderIcon = styled(SvgIcon)`
  margin: 16px 16px 16px 20px;
`;

const HeaderWrapper = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  box-shadow: ${(props) => (props.active ? ' 0 1px 0 0 rgb(0 0 0 / 12%)' : 'none')};
`;

const HeaderTitle = styled.div`
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.2px;
`;

export { LoginModalHeaderIcon, HeaderWrapper, HeaderTitle };
