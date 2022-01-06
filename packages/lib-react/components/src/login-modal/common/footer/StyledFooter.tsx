import styled from '@emotion/styled';

const FooterWrapper = styled.div`
  padding: 0.2rem 0 0;
  margin-top: 12px;
`;

const HrLine = styled.div`
  opacity: 0.12;
  border-top: solid 1px #000000;
`;

const FooterDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  color: #000000cc;
  /* rgba(0, 0, 0, 0.8); */
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.43;
  margin: 12px 0;
  letter-spacing: 0.2px;
`;

const ActionLink = styled.a`
  color: #000;
  padding: 6px;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 36px;
  text-transform: uppercase;
`;

export { FooterWrapper, FooterDetails, HrLine, Title, ActionLink };
