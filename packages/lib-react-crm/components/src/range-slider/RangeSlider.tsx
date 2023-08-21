import React, { useMemo, useRef, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import { PriceTitle, PriceWrapper } from './StyledRangeSlider';
import IconButton from '@material-ui/core/IconButton';
import { Divider, InputBase, debounce } from '@material-ui/core';

export interface IRangeSlider {
  min?: number;
  max?: number;
  value: number[];
  updateRange: (value: Array<number>) => void;
}

const useDebounce = (callback: () => void) => {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 1000);
  }, []);

  return debouncedCallback;
};

export const RangeSlider = ({
  min = 0,
  max = 100,
  value,
  updateRange,
}: IRangeSlider) => {
  const [values, setValue] = React.useState(value);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleChangeComplete = (event, newValue) => {
    updateRange(newValue);
    event.preventDefault();
  };

  const inputPriceChange = useDebounce(() => {
    updateRange(values);
  });

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{ paddingBottom: '0' }}>
          <Slider
            value={values}
            onChange={handleChange}
            aria-labelledby="range-slider"
            min={min}
            max={max}
            key="range-slider"
            onChangeCommitted={handleChangeComplete}
            //valueLabelDisplay="on"
          />
        </Grid>
        <Grid item xs={6}>
          <PriceTitle>Min Price</PriceTitle>
          <PriceWrapper>
            <IconButton aria-label="min">₹</IconButton>
            <Divider orientation="vertical" className="line" />
            <InputBase
              placeholder="Min"
              value={values[0]}
              style={{ flex: '1', fontSize: '16px' }}
              type="number"
              onChange={(e) => {
                inputPriceChange();
                setValue([+e.target.value, value[1]]);
              }}
            />
          </PriceWrapper>
        </Grid>
        <Grid item xs={6}>
          <PriceTitle>Max Price</PriceTitle>
          <PriceWrapper>
            <IconButton aria-label="max">₹</IconButton>
            <Divider orientation="vertical" className="line" />
            <InputBase
              placeholder="Max"
              value={values[1]}
              type="number"
              onChange={(e) => {
                inputPriceChange();
                setValue([value[0], +e.target.value]);
              }}
              style={{ flex: '1', fontSize: '16px' }}
            />
          </PriceWrapper>
        </Grid>
      </Grid>
    </div>
  );
};
