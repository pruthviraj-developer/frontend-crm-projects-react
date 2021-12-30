import styled from '@emotion/styled';
import { SvgIcon } from '@hs/icons';
const HyperLinkWrapper = styled.div`
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const FaceBookIcon = styled(SvgIcon)`
//   margin: 1px 8px 0;
//   width: 18px;
//   height: 18px;
// `;

const HyperLinkTag = styled.a`
  color: #000;
  opacity: 0.56;
  font-size: 14px;
  letter-spacing: 0.2px;
  text-decoration: underline;
`;

// const Divider = styled.span`
//   margin-left: 4%;
//   margin-right: 2%;
//   width: 4px;
//   height: 4px;
//   border-radius: 4px;
//   background-color: #dcdcdc;
//   display: inline-block;
// `;

export { HyperLinkWrapper, HyperLinkTag };
