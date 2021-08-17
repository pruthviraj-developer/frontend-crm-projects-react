import styled from '@emotion/styled';
import { Colors } from '@hs/utils';

const MainContainer = styled.div`
  // padding: 0;
  // width: 100%;
  // display: flex;
  // flex-wrap: wrap;
`;

const Container = styled.div`
  background-color: white;
  box-shadow: 0 1px 4px 0 rgb(0 0 0 / 14%);
  // flex-basis: 44%;
  // margin: 0 1rem;
  padding: 2.5rem 2.5rem 1rem 2.5rem;
  border-radius: 0.5rem;
  position: relative;
  margin: 0.5rem;
`;

const Vendor = styled.div`
  background: linear-gradient(
    60deg,
    ${Colors.PINK[600]},
    ${Colors.PINK[500]},
    ${Colors.PINK[400]}
  );
  box-shadow: 0 4px 20px 0 rgb(0 0 0 / 14%),
    0 7px 10px -5px rgb(0 172 193 / 40%);
  padding: 1.2rem;
  color: white;
  display: inline-block;
  position: absolute;
  top: -5%;
  left: 2%;
  border-radius: 3px;
`;

const RowDiv = styled.div`
  margin: 1rem 0 1rem 0;
`;

const ProgressDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const Label = styled.label`
  width: 30%;
`;

const ProgressInnerContainer = styled.div`
  background-color: gray;
  width: 100%;
  height: 4rem;
  position: relative;
`;

const PBInner = styled.div<{
  color: string;
  width: string;
}>`
  height: inherit;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width};
`;

const ProgressP = styled.p`
  position: absolute;
  left: 50%;
  top: -15%;
  color: white;
  font-size: 1.5rem;
  transform: translate(-50%, 0%);
`;

export {
  MainContainer,
  Container,
  Vendor,
  RowDiv,
  ProgressDiv,
  ProgressInnerContainer,
  Label,
  PBInner,
  ProgressP,
};
