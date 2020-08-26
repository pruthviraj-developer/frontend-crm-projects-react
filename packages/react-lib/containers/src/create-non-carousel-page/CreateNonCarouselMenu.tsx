import React from 'react';
import { MenuItem } from '@material-ui/core';

export const platformOptions = () =>
  [
    { display: 'IOS', value: 'IOS' },
    { display: 'ANDROID', value: 'ANDROID' },
  ].map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.display}
    </MenuItem>
  ));

export const carouselTypesOptions = () =>
  [
    { display: '1', value: '1' },
    { display: '2', value: '2' },
    { display: '3', value: '3' },
    { display: '4', value: '4' },
  ].map((item) => (
    <MenuItem key={item.value} value={item.value}>
      {item.display}
    </MenuItem>
  ));

export const getPostionOptions = (count = 1) =>
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
