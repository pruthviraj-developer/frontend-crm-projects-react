import styled from '@emotion/styled';
import { Colors, typography } from '@hs/utils';

// padding: 0.2rem 2rem 0 2rem;
const JoinUsWrapper = styled.div`
  position: fixed;
  width: 100%;
  top: 25px;
  left: 0;
  bottom: 0;
  min-height: calc(75% - 24px);
  overflow-y: auto;
  font-weight: ${typography.weight.regular};
  /* font-size: ${typography.size.s2}px; */
  line-height: 1.43;
  letter-spacing: 0.2px;
  color: rgba(0, 0, 0, 0.8);
  background-color: ${Colors.WHITE};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const JoinUsContainer = styled.div`
  padding: 0 ${typography.size.s5}px ${typography.size.s5}px;
`;

const InputField = styled.input`
  height: 48px;
  width: 100%;
  outline: none;
  padding: 14px 12px 0 12px;
  border-radius: 4px;
  display: inline-block;
  vertical-align: middle;
  background-color: #eff1f4;
  border: none;
  /* &:focus + .label {
    top: 10px;
  } */
  &:focus {
    border-bottom: 2px solid #ed54a4;
    & + .label {
      top: 10px;
    }
  }
  &:not([value='']) + .label {
    top: 10px;
  }
`;

const InputWrapper = styled.div<{ isFirst?: boolean }>`
  position: relative;
  margin-top: ${(props) => (props.isFirst ? '20px' : '12px')};
`;

const Label = styled.label`
  pointer-events: none;
  position: absolute;
  font-size: 14px;
  line-height: 14px;
  left: 12px;
  top: 18px;
  transition: 0.2s ease all;
  color: #a4a4a4;
`;

const Description = styled.p`
  color: rgba(0, 0, 0, 0.56);
  margin: 0;
  font-size: 12px;
  line-height: 1.33;
  letter-spacing: 0.4px;
  padding: 8px 0 0 12px;
`;

export { JoinUsWrapper, JoinUsContainer, InputWrapper, InputField, Label, Description };
