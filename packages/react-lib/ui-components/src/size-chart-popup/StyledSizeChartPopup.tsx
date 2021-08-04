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

const SizeChartDetailsWrapper = styled.div`
  max-height: 86.5vh;
`;

const SizeChartDetail = styled.div`
  margin: 8px 0 0;
  border-bottom: 1px solid #e6e6e6;
`;

const SizeChartDetailImages = styled.div``;

const SizeChartDetailImage = styled.div`
  position: relative;
`;

const ChartDetailImageIllustration = styled.img`
  position: relative;
  width: 100%;
`;

const ImageLink = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
`;

const SizeTableWrapper = styled.div``;

const SizeTableHeader = styled.div`
  padding: ${typography.size.s08}px 0;
`;

const SizeOptionTypeLengthHeader = styled.div`
  display: flex;
  align-items: center;
`;

const SizeOptionType = styled.div`
  padding: ${typography.size.s08}px 6px 4px;
  margin: ${typography.size.s08}px;
  color: ${Colors.PINK[500]};
  font-weight: ${typography.weight.regular};
  cursor: pointer;
  &.active {
    border-bottom: 3px solid ${Colors.PINK[500]};
    font-weight: ${typography.weight.medium};
  }
`;

export {
  SizeChartWrapper,
  SizeChartDetail,
  SizeChartDetailImage,
  SizeChartDetailImages,
  SizeChartDetailsWrapper,
  SizeChartHeaderWrapper,
  SizeChartHeader,
  SizeChartHeaderTitle,
  SizeChartHeaderCloseIcon,
  SizeChartHeaderProductName,
  SizeChartCloseIcon,
  SizeTableWrapper,
  SizeTableHeader,
  SizeOptionType,
  SizeOptionTypeLengthHeader,
  ChartDetailImageIllustration,
  ImageLink,
};
