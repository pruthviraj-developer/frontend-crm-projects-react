import React from 'react';
import { MipPidCardProps } from './IMipPidCard';
import {
  CardImage,
  CardImageWrapper,
  CardWrapper,
  CardTableWrapper,
} from './StyledMipPidCard';
import { MipMskuTable } from '../mip-msku-table/MipMskuTable';
// import { useQuery } from 'react-query';

export const MipPidCard: React.FC<MipPidCardProps> = ({
  imageUrl,
  pidData,
  isOpenOrder = false,
  hasBestSeller = false,
}: MipPidCardProps) => {
  let borderColor = '1px solid#fff';
  if (hasBestSeller) {
    borderColor = isOpenOrder ? '4px solid #008e77' : '4px solid #f00';
  }

  return (
    <CardWrapper borderColor={borderColor}>
      <CardImageWrapper>
        <CardImage src={imageUrl}></CardImage>
        <CardTableWrapper>
          <MipMskuTable tableData={[...pidData]}></MipMskuTable>
        </CardTableWrapper>
      </CardImageWrapper>
    </CardWrapper>
  );
};
