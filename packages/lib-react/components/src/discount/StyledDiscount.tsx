import styled from '@emotion/styled';
import { typography } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const DiscountWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: ${typography.size.s2}px;
  background-color: rgba(9, 224, 95, 0.12);
`;

const DiscountTitle = styled.div`
  color: #333;
  line-height: ${typography.size.s5}px;
  font-weight: ${typography.weight.regular};
`;

const DiscountIcon = styled(SvgIcon)`
  height: 20px;
  min-width: 20px;
  margin: 0 ${typography.size.s4}px 0 0;
`;
export { DiscountWrapper, DiscountIcon, DiscountTitle };
