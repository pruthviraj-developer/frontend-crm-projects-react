import styled from '@emotion/styled';
import { typography, Colors, secondaryColor } from '@hs/utils';

const AccordianWrapper = styled.div`
  margin: ${typography.size.s3}px auto;
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

const DetailsDescription = styled.div`
  &b {
    font-size: ${typography.size.s2}px;
    line-height: ${typography.size.s4}px;
    font-weight: ${typography.weight.medium};
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

export {
  AccordianWrapper,
  AccordionTitle,
  AccordionContent,
  AccordianDescription,
  DetailsDescription,
  DescriptionList,
  DescriptionListItem,
  OtherDetails,
};
