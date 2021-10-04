import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const LoginModalHeaderIcon = styled(SvgIcon)`
  margin: 16px;
`;

const LoginModalWrapper = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  top: ${typography.size.s24}px;
  height: 100%;
  overflow-y: auto;
  font-weight: ${typography.weight.regular};
  font-size: ${typography.size.s2}px;
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
  margin-top: 20px;
`;

const HeaderWrapper = styled.div<{ active: boolean }>`
  box-shadow: ${(props) => (props.active ? ' 0 1px 0 0 rgb(0 0 0 / 12%)' : 'none')};
`;

const HeaderTitle = styled.div`
  display: inline-block;
  padding: 16px 0 16px 72px;
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

const FooterWrapper = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
`;
const FooterDescription = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: rgba(0, 0, 0, 0.8);
`;
const FooterDescriptionLink = styled.div`
  font-size: 14px;
  font-weight: bold;
  padding: 6px;
  line-height: 36px;
  color: #000;
  text-transform: uppercase;
`;
export {
  LoginModalWrapper,
  LoginModalHeaderIcon,
  HeaderWrapper,
  HeaderTitle,
  SignInContainer,
  SignInWrapper,
  SubHeaderWrapper,
  FooterWrapper,
  FooterDescription,
  FooterDescriptionLink,
};
