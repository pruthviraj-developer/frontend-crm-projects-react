import styled from '@emotion/styled';
import { Colors } from '@hs/utils';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1400px;
`;

const ProductsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 23px;
  background-color: ${Colors.WHITE};
  border-top: 1px solid ${Colors.MERCURY};
  border-left: 1px solid ${Colors.MERCURY};
`;

const ProductListWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 24px 24px 32px 24px;
`;

const ProductListContainer = styled.div`
  margin-left: 24px;
  width: calc(100% - 262px);
`;

export { Wrapper, ProductsList, ProductListContainer, ProductListWrapper };
