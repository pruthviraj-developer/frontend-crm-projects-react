import styled from '@emotion/styled';
import { Colors, typography } from '@hs/utils';

const AddToCartWrapper = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 88px;
  background-color: ${Colors.WHITE};
  box-shadow: inset 0 1px 0 0 rgb(0 0 0 / 12%);
`;

const AddToCartButton = styled.button<{ disabled: boolean }>`
  width: calc(100% - 40px);
  height: 48px;
  margin: 20px;
  border-radius: 4px;
  background-color: ${(props) =>
    props.disabled ? 'rgba(237,84,164,.36)' : '#ed54a4'};
  color: ${(props) => (props.disabled ? 'hsla(0,0%,100%,.6)' : Colors.WHITE)};
  padding: ${typography.size.s3}px ${typography.size.s4}px;
  border: none;
`;

export { AddToCartWrapper, AddToCartButton };
