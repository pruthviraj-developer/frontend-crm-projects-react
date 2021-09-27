import styled from '@emotion/styled';
import { typography, Colors, secondaryColor, primaryColor } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const AccordionWrapper = styled.div`
  margin: auto;
`;

const AccordionTitle = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  padding: 12px 12px 12px 14px;
  border: 1px solid ${Colors.MERCURY};
  font-weight: ${typography.weight.medium};
  color: ${Colors.GRAY20};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AccordionIcon = styled(SvgIcon)<{ active: boolean }>`
  transform: scaleY(${(props) => (props.active ? -1 : 1)});
`;

const AccordionContent = styled.div`
  opacity: 0;
  display: none;
  color: ${secondaryColor[300]};
  padding: 1rem;
  border: none;
  background-color: ${Colors.WHITE};
  &.active {
    display: block;
    opacity: 1;
    transition: opacity 5s ease-in-out;
  }
`;

const AccordionDescription = styled.div``;

const DetailsDescription = styled.div<{ margin?: boolean }>`
  margin-top: ${(props) => (props.margin ? typography.size.s3 : 0)}px;
  &b {
    font-size: ${typography.size.s2}px;
    line-height: ${typography.size.s4}px;
    font-weight: ${typography.weight.medium};
  }
  & > a {
    color: ${primaryColor[100]};
  }
`;

const OtherDetails = styled.div`
  margin-top: ${typography.size.s3}px;
  &.content {
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
  }
`;

const FeatureAttributesList = styled.ul`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  padding-left: 24px;
  margin: 0;
`;

const FeatureAttributesListItem = styled.li`
  list-style-type: disc;
`;

const DetailsDescriptionTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  margin-top: 16px;
`;

export {
  AccordionWrapper,
  AccordionTitle,
  AccordionIcon,
  AccordionContent,
  AccordionDescription,
  DetailsDescription,
  OtherDetails,
  FeatureAttributesList,
  FeatureAttributesListItem,
  DetailsDescriptionTitle,
};
