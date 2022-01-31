import styled from '@emotion/styled';

const EmailWrapper = styled.div`
  margin-top: 20px;
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
  /* font-size: 14px; */
  line-height: 14px;
  left: 12px;
  top: 18px;
  transition: 0.2s ease all;
  color: #a4a4a4;
`;

export { EmailWrapper, InputWrapper, InputField, Label };
