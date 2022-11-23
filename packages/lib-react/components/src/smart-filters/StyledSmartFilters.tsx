import styled from '@emotion/styled';
import { SvgIcon } from '@hs/icons';
import { typography, Colors } from '@hs/utils';

const SmartFiltersWrapper = styled.div`
  margin: 10px auto;
  color: ${Colors.GRAY20};
  font-size: ${typography.size.s2}px;
`;

const FiltersList = styled.div`
  display: flex;
  overflow: hidden;
  font-weight: ${typography.weight.regular};
`;

const SelectedFilter = styled.span<{ isDefault: boolean }>`
  display: flex;
  margin: 0 4px 5px 4px;
  color: ${Colors.PINK[600]};
  line-height: ${typography.size.s5}px;
  border: 1px solid ${Colors.PINK[500]};
  background-position: right 4px center;
  border-radius: ${typography.size.s4}px;
  background-color: rgba(237, 84, 164, 0.04);
  cursor: ${(props) => (props.isDefault ? 'default' : 'pointer')};
  padding: ${(props) => (props.isDefault ? '6px 12px' : '6px 4px 6px 12px')};
  &:hover {
    background-color: ${(props) =>
      props.isDefault ? 'rgba(237, 84, 164, 0.04)' : 'rgba(237,84,164,.12)'};
  }
  &:first-of-type {
    margin-left: 0;
  }
`;

const Filter = styled.span`
  opacity: 0.8;
  cursor: pointer;
  line-height: 1.43;
  white-space: nowrap;
  letter-spacing: 0.2px;
  margin: 0 0px 5px 0px;
  color: ${Colors.FULLBLACK};
  background-color: ${Colors.WHITE};
  border-radius: ${typography.size.s24}px;
  border: 1px solid ${Colors.GREY_TINT[500]};
  padding: ${typography.size.s06}px ${typography.size.s1}px;
  &:hover {
    background-color: rgba(223, 225, 230, 0.36);
  }
  &:first-of-type {
    margin-left: 0;
  }
`;

const CloseIcon = styled(SvgIcon)`
  padding-left: 4px;
  width: ${typography.size.s26}px;
`;

const FiltersCarouseWrapper = styled.div`
  position: relative;
`;

const ArrowButton = styled.div`
  right: 0;
  width: 36px;
  height: 36px;
  cursor: pointer;
  position: absolute;
  box-shadow: 0 2px 8px 0 rgb(0 0 0 / 8%);
  border-radius: ${typography.size.s24}px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${Colors.WHITE};
  &.left {
    left: 0;
    transform: rotate(180deg);
  }
  &:hover {
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 16%);
    svg {
      path {
        fill: #ed54a4;
      }
    }
  }
`;

const ArrowWrapper = styled.div`
  right: 0;
  width: 100px;
  height: 36px;
  position: absolute;
  background-image: linear-gradient(
    to left,
    rgba(245, 245, 245, 1) 10%,
    rgba(245, 245, 245, 0.5) 70%,
    rgba(245, 245, 245, 0)
  );
  &.left {
    left: 0;
    background-image: linear-gradient(
      to right,
      rgba(245, 245, 245, 1) 10%,
      rgba(245, 245, 245, 0.5) 70%,
      rgba(245, 245, 245, 0)
    );
  }
`;

const CarouselIcon = styled(SvgIcon)`
  width: 12px;
  height: 14px;
`;

const Arrows = styled.div`
  top: 0;
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: space-between;
`;
export {
  Filter,
  CloseIcon,
  FiltersList,
  SelectedFilter,
  SmartFiltersWrapper,
  FiltersCarouseWrapper,
  Arrows,
  ArrowButton,
  ArrowWrapper,
  CarouselIcon,
};
