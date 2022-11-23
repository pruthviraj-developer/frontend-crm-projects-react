import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';
import { SvgIcon } from '@hs/icons';

const FooterWrapper = styled.div`
  background-color: ${Colors.WHITE};
  border-top: 1px solid ${Colors.MERCURY};
  //max-width: inherit;
  margin: 68px auto auto;
  margin-bottom: -68px;
`;

const FooterSection = styled.section`
  display: flex;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 0px;
`;

const FooterBlock = styled.div`
  height: 168px;
  &:hover {
    background: #f9f9f9;
    a {
      color: #ed54a4;
      path {
        fill: #ed54a4;
      }
    }
  }
`;

const StyledIcon = styled(SvgIcon)`
  max-width: ${typography.size.s24}px;
`;

const SeoHtmlContent = styled.div`
  color: #777;
  h1{
    margin-bottom: 65px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
  h2{
    margin: 40px 0 24px 0;
    font-size: 18px;
    font-weight: 600;
  }
  h3{
    margin: 40px 0 24px 0;
    font-size: 16px;
    font-weight: 600;
  }
  p{
    font-size: 15px;
    line-height: 20px;
  }
  ul,ol{
    padding-left: 20px;
    li{
      font-size: 14px;
      margin-bottom: 5px;
      line-height: 20px;
    }
  }
`

export {
 
  FooterWrapper,
  FooterSection,
  FooterBlock,
  SeoHtmlContent,
  StyledIcon,
};
