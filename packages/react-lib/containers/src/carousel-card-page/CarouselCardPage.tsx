import React from 'react';
import styled from '@emotion/styled';
import { CarouselCard } from '@hs/components';
import { State, Action, Tile } from './ICarouselCardPage';
import { Button, Grid } from '@material-ui/core';
import { useReducer } from 'reinspect';

let count = 1;
const getCount = () => count++;

const initialState: State = {
  imageWidth: 400,
  imageHeight: 500,
  tiles: [],
  addEnable: true,
};
const StyledCarouselPage = styled.div`
  .MuiGrid-root {
    flex-grow: 1;
  }
`;
const carouselPageReducer = (
  state: State,
  [type, payload]: Action<Tile>
): State => {
  switch (type) {
    case 'addTile':
      return { ...state, ...{ tiles: [...state.tiles, payload] } };
    case 'removeTile':
      return {
        ...state,
        ...{
          tiles: [
            ...state.tiles?.filter((tile) => tile.position < payload.position),
            ...state.tiles
              ?.filter((tile) => tile.position > payload.position)
              ?.map((tile) => ({
                ...tile,
                ...{ position: tile.position - 1 },
              })),
          ],
        },
      };
    case 'changePosition':
      return {
        ...state,
        ...{
          tiles: [
            ...state.tiles?.filter((tile) => tile.position < payload.position),
            payload,
            ...state.tiles
              ?.filter(
                (tile) =>
                  tile.position >= payload.position &&
                  tile.cardId != payload.cardId
              )
              ?.map((tile) => ({
                ...tile,
                ...{ position: tile.position + 1 },
              })),
          ],
        },
      };
  }
  return state;
};
const getPostionOptions = (length: number) => {
  const options: Array<Record<'display' | 'value', string | number>> = [];
  for (let index = 0; index < length; index++) {
    options.push({ display: index + 1, value: index + 1 });
  }
  return options;
};
const getTileTypeOptions = () => [
  { display: 'PLP', value: 'plp' },
  { display: 'Special Page', value: 'sp' },
  { display: 'Boutique', value: 'boutique' },
];
export const CarouselCardPage = () => {
  const [state, dispatch] = useReducer(
    carouselPageReducer,
    initialState,
    (state) => state,
    'CarouselCard'
  );

  const handleTileAdd = () => {
    dispatch([
      'addTile',
      {
        type: 'plp',
        position: state.tiles.length + 1,
        cardId: 'card' + getCount(),
      },
    ]);
  };
  const handleTileRemove = (cardId: string) => {
    dispatch([
      'removeTile',
      state.tiles.filter((tile) => tile.cardId == cardId)[0],
    ]);
  };

  const handlePositionChange = ({
    cardId,
    position,
  }: Record<'cardId' | 'position', number | string>) => {
    dispatch([
      'changePosition',
      {
        ...state.tiles.filter((tile) => tile.cardId == cardId)[0],
        ...{ position: position as number },
      },
    ]);
  };

  return (
    <StyledCarouselPage>
      <Grid container direction="row" spacing={3}>
        {state.tiles.map((tile, index) => (
          <Grid item xs={3} key={'CarouselTile' + index}>
            <CarouselCard
              position={tile.position}
              type={tile.type}
              typeBox={{
                placeholder: 'Type',
                options: getTileTypeOptions(),
                selectedValue: tile.type,
              }}
              positionBox={{
                placeholder: 'Postion',
                options: getPostionOptions(state.tiles.length),
                selectedValue: tile.position,
              }}
              autoCopmpleOptions={{
                options: [],
              }}
              onDelete={handleTileRemove}
              cardId={tile.cardId}
              onPositionChange={handlePositionChange}
            ></CarouselCard>
          </Grid>
        ))}

        <Grid item xs={2}>
          <Button
            color={'primary'}
            variant={'contained'}
            disabled={!state.addEnable}
            size={'large'}
            onClick={handleTileAdd}
          >
            Add Tile
          </Button>
        </Grid>
      </Grid>
    </StyledCarouselPage>
  );
};
