import React from 'react';
import styled from '@emotion/styled';
import { ICreateProductSubtypeProps } from './ICreateProduct';

const ProductWrapper = styled.div`
  width: 100%;
  margin: 10px 10px 10px 90px;
`;

const CreateProduct = ({ header }: ICreateProductSubtypeProps) => {
  return (
    <>
      <ProductWrapper>
        <h1>{header}</h1>
      </ProductWrapper>
    </>
  );
};
export default CreateProduct;
