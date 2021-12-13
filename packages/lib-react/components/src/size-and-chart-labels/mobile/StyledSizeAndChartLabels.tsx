import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';

const SizeAndChartLabelsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${typography.size.s24}px ${typography.size.s3}px 0
    ${typography.size.s17}px;
  /* font-size: ${typography.size.s2}px; */
  line-height: ${typography.size.s4}px;
  font-weight: ${typography.weight.medium};
`;

const Size = styled.span`
  /* font-size: ${typography.size.s2}px; */
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
`;

const ViewSizeChart = styled.span`
  color: ${Colors.PINK[500]};
  border: none;
  cursor: pointer;
  text-transform: uppercase;
`;

export { SizeAndChartLabelsWrapper, Size, ViewSizeChart };
