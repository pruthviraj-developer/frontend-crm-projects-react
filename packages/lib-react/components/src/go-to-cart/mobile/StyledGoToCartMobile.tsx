import styled from '@emotion/styled';
import { Colors, typography } from '@hs/utils';

const GoToCartMobileWrapper = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 88px;
  background-color: ${Colors.WHITE};
  box-shadow: inset 0 1px 0 0 rgb(0 0 0 / 12%);
`;

const GoToCartButton = styled.button`
  width: calc(100% - 40px);
  height: 48px;
  margin: 20px;
  border-radius: 4px;
  background-color: #ed54a4;
  color: ${Colors.WHITE};
  padding: ${typography.size.s3}px ${typography.size.s4}px;
  border: none;
  font-size: 1.4rem;
  line-height: 16px;
  font-weight: 600;
  font-family: Averta, Helvetica, Arial, sans-serif;
`;

export { GoToCartMobileWrapper, GoToCartButton };
