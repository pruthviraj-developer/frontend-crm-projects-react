import React from 'react';
// import { ITileProps } from './ITile';
import { TileWrapper, ImageContainer } from './StyledTile';
import Image from 'next/image';
import { forwardRef } from 'react';

const Tile = forwardRef(({ onClick, href, productData }: any) => {
  return (
    <TileWrapper>
      <a href={href} target="_blank" onClick={onClick} rel="noreferrer">
        <ImageContainer>
          <Image
            layout="fill"
            draggable={false}
            loader={({ src, width }: Record<string, unknown>) =>
              `${src}&tr=w-${width},c-at_max,n-medium`
            }
            src={productData.mediumImg}
            alt={productData.name}
            className="plpImage"
          />
        </ImageContainer>
      </a>
    </TileWrapper>
  );
});
Tile.displayName = 'Tile';
export default Tile;
