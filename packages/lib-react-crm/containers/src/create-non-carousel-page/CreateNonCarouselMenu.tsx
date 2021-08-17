import React from 'react';
import { MenuItem } from '@material-ui/core';
import { StyledMenuItem } from './StyledCreateNonCarouselPage';
export const platformOptions = () =>
  [
    { display: 'IOS', value: 'IOS' },
    { display: 'ANDROID', value: 'ANDROID' },
  ].map((item) => (
    <StyledMenuItem key={item.value} value={item.value}>
      {item.display}
    </StyledMenuItem>
  ));

export const carouselTypesOptions = () =>
  [
    { display: '1', value: '1' },
    { display: '2', value: '2' },
    { display: '3', value: '3' },
    { display: '4', value: '4' },
    { display: '5', value: '5' },
  ].map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.display}
    </MenuItem>
  ));

export const getPositionOptions = (count = 1) =>
  Array.from({ length: count }, (_v, i) => ++i).map((value) => (
    <MenuItem key={'position' + value.toString()} value={value}>
      {value}
    </MenuItem>
  ));
export const getTileTypeOptions = () =>
  [
    { display: 'PLP', value: 'plp' },
    { display: 'Special Page', value: 'sp' },
    { display: 'Boutique', value: 'boutique' },
  ].map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.display}
    </MenuItem>
  ));
