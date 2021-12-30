import styled from '@emotion/styled';

const ButtonWrapper = styled.div`
  padding: 12px 0 8px 0;
`;

const StyledButton = styled.button<{ disabled?: Boolean }>`
  color: #fff;
  border: 0;
  width: 100%;
  min-height: 48px;
  background-color: #ed54a4;
  border-radius: 4px;
  text-align: center;
  font: inherit;
  text-transform: uppercase;
  line-height: 1.14;
  font-weight: 700;
  opacity: ${(props) => (props.disabled ? 0.36 : 1)};
`;

export { ButtonWrapper, StyledButton };
