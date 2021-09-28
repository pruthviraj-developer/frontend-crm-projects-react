import { css, Global } from '@emotion/react';
import 'react-multi-carousel/lib/styles.css';
export const globalStyles = (
  <Global
    styles={css`
      html {
        font-size: 62.5%;
      }
      body {
        padding: 0;
        margin: 0;
        background-color: #f5f5f5;
        font-size: 1.6rem;
        font-family: 'Averta', Helvetica, Arial, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
          Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      a {
        color: inherit;
        text-decoration: none;
      }
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
      .product-carousel-dot-list li.active button {
        background-color: #707070;
      }
      * {
        box-sizing: border-box;
      }
      @font-face {
        font-family: 'Averta';
        src: url('//static.hopscotch.in/web2/fonts/averta-regular-webfont.woff2') format('woff2'),
          url('//static.hopscotch.in/web2/fonts/averta-regular-webfont.woff') format('woff');
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: 'Averta';
        src: url('//static.hopscotch.in/web2/fonts/averta-semibold-webfont.woff2') format('woff2'),
          url('//static.hopscotch.in/web2/fonts/averta-semibold-webfont.woff') format('woff');
        font-weight: 600;
        font-style: normal;
      }

      @font-face {
        font-family: 'Averta';
        src: url('//static.hopscotch.in/web2/fonts/averta-bold-webfont.woff2') format('woff2'),
          url('//static.hopscotch.in/web2/fonts/averta-bold-webfont.woff') format('woff');
        font-weight: 700;
        font-style: normal;
      }
    `}
  />
);
