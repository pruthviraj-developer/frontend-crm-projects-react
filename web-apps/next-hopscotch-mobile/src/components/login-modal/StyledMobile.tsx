import styled from '@emotion/styled';
import { typography, Colors } from '@hs/utils';

const MobileWrapper = styled.div`
  margin-top: ${typography.size.s5}px;
`;

const MobileNumber = styled.input`
  width: 100%;
  height: 48px;
  line-height: 20px;
  padding: 14px 12px 0 12px;
  border-radius: 4px;
  background-color: #eff1f4;
  border: transparent;
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 8px;
`;

const MobileNumberLabel = styled.label`
  pointer-events: none;
  position: absolute;
  left: 12px;
  top: 18px;
  color: rgba(0, 0, 0, 0.36);
  transition: 0.2s ease all;
  font-size: 14px;
  line-height: 14px;
  padding: 0;
  margin: 0;
`;

export { MobileWrapper, MobileNumber, MobileNumberLabel };
