import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const LoginModalHeaderIcon = styled(SvgIcon)`
  margin: 16px 16px 16px 20px;
`;

const LoginModalWrapper = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  min-height: calc(75% - 24px);
  overflow-y: auto;
  font-weight: ${typography.weight.regular};
  /* font-size: ${typography.size.s2}px; */
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: rgba(0, 0, 0, 0.8);
  background-color: ${Colors.WHITE};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const SignInContainer = styled.div`
  padding: 0 ${typography.size.s5}px ${typography.size.s5}px;
`;

const SignInWrapper = styled.div`
  position: relative;
`;

const Description = styled.div`
  opacity: 0.56;
  margin-bottom: 16px;
  margin-top: 12px;
`;

const HeaderWrapper = styled.div<{ active: boolean }>`
  align-items: center;
  box-shadow: ${(props) => (props.active ? ' 0 1px 0 0 rgb(0 0 0 / 12%)' : 'none')};
  display: flex;
`;

const HeaderTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.2px;
`;

const SubHeaderWrapper = styled.div`
  color: rgba(0, 0, 0, 0.8);
  font-size: 32px;
  font-weight: 700;
  line-height: 40px;
  letter-spacing: -0.2px;
`;

export {
  LoginModalWrapper,
  LoginModalHeaderIcon,
  HeaderWrapper,
  HeaderTitle,
  SignInContainer,
  SignInWrapper,
  SubHeaderWrapper,
  Description,
};
