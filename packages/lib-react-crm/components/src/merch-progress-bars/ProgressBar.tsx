import React from 'react';
import Grid from '@material-ui/core/Grid';
import { ProgressBarProps } from './IProgress';
import { primaryColor, secondaryColor, tertiaryColor } from '@hs/utils';
import {
  MainContainer,
  Container,
  Vendor,
  RowDiv,
  ProgressDiv,
  ProgressInnerContainer,
  Label,
  PBInner,
  ProgressP,
} from './StyledProgressBar';

const ProgressColor = (indx: number): string => {
  switch (indx) {
    case 0:
      return primaryColor[200];
    case 1:
      return secondaryColor[200];
    case 2:
      return tertiaryColor[200];
    default:
      return primaryColor[200];
  }
};

const ProgressBar = ({ data }: ProgressBarProps) => {
  return (
    <MainContainer>
      <Grid container spacing={3}>
        {data &&
          data.map((item, index) => (
            <Grid item xs={12} sm={4} key={item.title + index}>
              <Container key={item.title + index}>
                <Vendor key={item.title + index}>{item.title}</Vendor>
                <>
                  {item.info &&
                    item.info.map((eachItem, keyIndex) => (
                      <RowDiv key={eachItem.label + keyIndex}>
                        <ProgressDiv>
                          <Label key={eachItem.label + keyIndex}>
                            {eachItem.label}
                          </Label>
                          <ProgressInnerContainer>
                            <PBInner
                              key={keyIndex}
                              color={ProgressColor(keyIndex)}
                              width="100"
                            />
                            <ProgressP key={eachItem.label + keyIndex}>
                              {eachItem.value}
                            </ProgressP>
                          </ProgressInnerContainer>
                        </ProgressDiv>
                      </RowDiv>
                    ))}
                </>
              </Container>
            </Grid>
          ))}
      </Grid>
    </MainContainer>
  );
};

export { ProgressBar };
