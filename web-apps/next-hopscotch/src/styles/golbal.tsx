import { css, Global } from '@emotion/react';
import 'react-toastify/dist/ReactToastify.css';
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
        font-size: 1.4rem;
        color: #333;
        font-family: 'Averta', Helvetica, Arial, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
          Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      #cartQuantiyChangeToaster {
        max-width: 240px;
        position: absolute;
        top: 0;
        right: 0;
        padding: 0;
        border-radius: 4px;
        margin-top: 16px;
        margin-right: 16px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }

      .cartQuantiyChangeBodyToaster {
        padding: 0;
      }

      a {
        color: inherit;
        text-decoration: none;
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
