import styled from '@emotion/styled';
import { HsTextAlign, typography, Colors } from '@hs/utils';

const CustomSizeWrapper = styled.div`
  margin: ${typography.size.s3}px auto;
  overflow-x: scroll;
`;

const Sizes = styled.div`
  white-space: nowrap;
`;

const SizePill = styled.div`
  display: inline-block;
  vertical-align: top;
  position: relative;
  text-align: ${HsTextAlign.center};
  margin-right: 8px;
`;

const Size = styled.div<{
  selected: boolean;
}>`
  display: inline-block;
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  font-weight: ${typography.weight.regular};
  padding: ${typography.size.s1}px ${typography.size.s2}px;
  margin-bottom: 8px;
  border: 1px solid
    ${(props) => (props.selected ? Colors.PINK[500] : Colors.GREY_TINT[500])};
  border-radius: ${typography.size.m2}px;
  background-color: ${Colors.WHITE};
  color: ${(props) => (props.selected ? Colors.PINK[500] : Colors.BLACK)};
  opacity: 0.8;
`;

export { CustomSizeWrapper, SizePill, Sizes, Size };
