// export var GoToTopComponent = function ($window, AppStateService, $state) {
//   'ngInject';
//   return {
//     restrict: 'E',
//     scope: {
//       isMobile: '=',
//     },
//     template: `
//         <a href="javascript:void(0);" id="goToTop">
//           <div class="ellipse" ng-if="isMobile">
//             <span class="icon-16 ic-arrow-copy"></span>
//           </div>
//           <span class="icon-medium icon-arrow-top"  ng-if="!isMobile"></span>
//           <span class="top-text">Back To Top</span></a>`,

//     link: function ($scope, $elem, $attrs) {
//       let anchorElem = $elem.find('#goToTop');
//       let anchorContent = $elem.find('.top-text');
//       let lastScrollTop = 0;
//       let totalRecords = 0;
//       $scope.$on('$locationChangeSuccess', () => {
//         lastScrollTop = windowElement.scrollTop();
//         totalRecords = undefined;
//         anchorElem.hide().removeClass('active');
//       });
//       $scope.$root.$on('setTotalRecords', function (event, data) {
//         totalRecords = data;
//         debugger;
//       });
//       const windowElement = angular.element($window);
//       let timeOut;

//       var isInViewport = function (el, excludePartials) {
//         var elementTop = $(el).offset().top;
//         var elementBottom = elementTop + $(el).outerHeight();

//         var viewportTop = $(window).scrollTop();
//         var viewportBottom = viewportTop + $(window).height() - 56; //56 is the height of the sort & filter bar

//         if (excludePartials) {
//           var bottomVisible = (elementBottom - viewportTop) / $(el).outerHeight();
//           var isInView = elementBottom > viewportTop && elementTop < viewportBottom;

//           return isInView && bottomVisible > 0.5; // false if its less than 50% visible
//         }

//         return elementBottom > viewportTop && elementTop < viewportBottom;
//       };

//       windowElement.scroll(function () {
//         if (
//           (AppStateService.isOnHomepage() || $state.includes('moments')) &&
//           AppStateService.getDeviceType() === 'mobile'
//         ) {
//           anchorElem.css('top', '124px');
//         } else if (
//           !(AppStateService.isOnHomepage() || $state.includes('moments')) &&
//           AppStateService.getDeviceType() === 'mobile'
//         ) {
//           anchorElem.css('top', '76px');
//         }
//         timeOut = clearTimeout(timeOut);
//         setTimeout(() => {
//           /*eslint angular/timeout-service: 0  */
//           let currentScrollTop = windowElement.scrollTop();
//           let difference = currentScrollTop - lastScrollTop;
//           if (currentScrollTop > 500 && totalRecords) {
//             anchorElem.show().addClass('active');
//           } else if (currentScrollTop < 500 && totalRecords) {
//             anchorElem.hide().removeClass('active');
//           }
//           if (difference < 0 && currentScrollTop > 500) {
//             // Scrolling up, and below a certain height
//             anchorElem.show().addClass('active');
//           } else if ((difference > 20 || currentScrollTop <= 500) && !totalRecords) {
//             anchorElem.hide().removeClass('active');
//           }
//           if (totalRecords && document.getElementsByClassName('product').length > 0) {
//             setDirectiveContent();
//           } else {
//             $(anchorContent).text('Back to top');
//           }
//           lastScrollTop = currentScrollTop;
//         }, 200);
//       });

//       var setDirectiveContent = function () {
//         let imageCounter = 0;
//         $('.product').each(function () {
//           // pass in false if partially visible objects should be used
//           if (isInViewport(this, false)) {
//             imageCounter = $('.product').index($(this));
//           }
//         });
//         $(anchorContent).text(imageCounter + 1 + ' of ' + totalRecords);
//       };
//       anchorElem.click(function () {
//         angular.element('html, body').animate({ scrollTop: 0 }, 600);
//         return false;
//       });
//     },
//   };
// };

import React, { FC } from 'react';

import { GoToTopWrapper, BackToTopIconWrapper, BackToTopIcon, BackToTopText } from './StyledGoToTop';
import { BackIcon } from '@hs/icons';

const GoToTop: FC = () => {
  return (
    <GoToTopWrapper>
      <BackToTopIconWrapper>
        <BackToTopIcon icon={BackIcon}></BackToTopIcon>
      </BackToTopIconWrapper>
      <BackToTopText>Back to top</BackToTopText>
    </GoToTopWrapper>
  );
};
export default GoToTop;
