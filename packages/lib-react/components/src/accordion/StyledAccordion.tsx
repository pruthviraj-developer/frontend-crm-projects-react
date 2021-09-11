import styled from '@emotion/styled';
import { typography, Colors, secondaryColor, primaryColor } from '@hs/utils';

const AccordianWrapper = styled.div`
  margin: auto;
`;

const AccordionTitle = styled.div`
  font-size: ${typography.size.s2}px;
  line-height: ${typography.size.s3}px;
  padding-top: ${typography.size.s1}px;
  padding-right: 0;
  padding-bottom: ${typography.size.s1}px;
  padding-left: ${typography.size.s2}px;
  border: 1px solid ${Colors.MERCURY};
  font-weight: ${typography.weight.medium};
  color: ${Colors.GRAY20};
`;

const AccordionContent = styled.div`
  opacity: 1;
  animation: display-none-transition 0.5s;
  display: block;
  color: ${secondaryColor[300]};
  padding: 1rem;
  border: none;
  background-color: ${Colors.WHITE};
`;

const AccordianDescription = styled.div``;

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

const DescriptionList = styled.ul`
  margin: 0 0 10px 0;
  padding: 0 0 0 24px;
`;

const DescriptionListItem = styled.li`
  list-style-type: disc;
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
  AccordianWrapper,
  AccordionTitle,
  AccordionContent,
  AccordianDescription,
  DetailsDescription,
  DescriptionList,
  DescriptionListItem,
  OtherDetails,
  FeatureAttributesList,
  FeatureAttributesListItem,
  DetailsDescriptionTitle,
};
