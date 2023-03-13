import styled from '@emotion/styled';
import { Colors, typography } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const CartIconQuantity = styled.span`
  font-size: 1.2rem;
  line-height: 13px;
  font-weight: ${typography.weight.medium};
  color: #ed54a4;
  background: ${Colors.WHITE};
  border-radius: 7px;
  position: absolute;
  top: 10px;
  left: 26px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 15px;
  min-width: 15px;
  padding: 3px 4px 4px;
`;

const IconWrapper = styled(SvgIcon)<{ width?: string; height?: string; }>`
  min-width: ${(props) => (props.width ? 'none' : '24px')}; 
  min-height: ${(props) => (props.height ? 'none' : '24px')};
`;

export { CartIconQuantity, IconWrapper };
