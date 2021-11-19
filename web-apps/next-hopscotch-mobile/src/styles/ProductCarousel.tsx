import { css, Global } from '@emotion/react';
import 'react-multi-carousel/lib/styles.css';
export const productCarouselStyles = (
  <Global
    styles={css`
      .product-carousel-dot-list li button {
        width: 8px;
        height: 8px;
        margin-right: 6px;
        background-color: #e6e6e6;
        border: 1px solid #e6e6e6;
        border-radius: 6px;
      }
      .product-carousel-dot-list {
        bottom: 9px;
        text-align: left;
        margin-left: 16px;
        justify-content: start;
      }
      .product-carousel-dot-list li.react-multi-carousel-dot--active button {
        background-color: #707070;
        /* border: 1px solid #707070; */
      }
      /* .product-carousel-container {
        max-height: calc(100vw - 8px);
      } */
    `}
  />
);
