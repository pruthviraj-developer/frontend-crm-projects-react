import styled from '@emotion/styled';
import { typography, Colors, HsTextAlign } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const SizeChartWrapper = styled.footer`
  font-size: ${typography.size.s1}px;
  line-height: ${typography.size.s2}px;
  font-weight: ${typography.weight.regular};
  background-color: ${Colors.WHITE};
`;

const SizeChartHeader = styled.div`
  border-bottom: 1px solid ${Colors.MERCURY};
  padding: ${typography.size.s3}px 0;
  position: relative;
`;

const SizeChartHeaderTitle = styled.div``;

const SizeChartHeaderCloseIcon = styled.div`
  position: absolute;
  right: ${typography.size.s3}px;
  top: ${typography.size.s1}px;
`;

const SizeChartCloseIcon = styled(SvgIcon)`
  fill: #bbb;
`;

const SizeChartHeaderWrapper = styled.div`
  text-align: ${HsTextAlign.center};
  font-weight: ${typography.weight.medium};
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
`;

const SizeChartHeaderProductName = styled.div`
  color: ${Colors.GRAY20};
  border-bottom: 1px solid ${Colors.MERCURY};
  padding: ${typography.size.s1}px;
`;

export {
  SizeChartWrapper,
  SizeChartHeaderWrapper,
  SizeChartHeader,
  SizeChartHeaderTitle,
  SizeChartHeaderCloseIcon,
  SizeChartHeaderProductName,
  SizeChartCloseIcon,
};
