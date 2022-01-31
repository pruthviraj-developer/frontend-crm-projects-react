import styled from '@emotion/styled';
import { Colors, typography } from '@hs/utils';

const AddToCartWrapper = styled.div``;

const AddToCartButton = styled.button<{ disabled: boolean }>`
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 16px;
  position: relative;
  letter-spacing: normal;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  border: 1px solid transparent;
  background-color: ${(props) =>
    props.disabled ? 'rgba(237,84,164,.36)' : '#ed54a4'};
  color: ${(props) => (props.disabled ? 'hsla(0,0%,100%,.6)' : Colors.WHITE)};
  margin: ${typography.size.s3}px 0 ${typography.size.s08}px 0;
  padding: ${typography.size.s3}px;
  &:hover {
    background-color: #e8288d;
    color: #fff;
  }
`;

export { AddToCartWrapper, AddToCartButton };
