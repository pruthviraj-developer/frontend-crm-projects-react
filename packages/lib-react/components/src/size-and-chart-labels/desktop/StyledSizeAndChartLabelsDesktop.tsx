import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';

const SizeAndChartLabelsWrapperDesktop = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${typography.size.s3}px 0;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
`;

const SizeDesktop = styled.span`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.medium};
`;

const ViewSizeChartDesktop = styled.span`
  color: ${Colors.PINK[500]};
  border: none;
  cursor: pointer;
  text-transform: uppercase;
`;

export { SizeAndChartLabelsWrapperDesktop, SizeDesktop, ViewSizeChartDesktop };
