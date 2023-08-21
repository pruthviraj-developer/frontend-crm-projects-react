import React, { useState, useEffect } from 'react';
import {
  IPromiseDataStatus,
  MIPProductListCardProps,
} from './IMIPProductListCard';
import {
  ButtonWrapper,
  CardImage,
  CardImageWrapper,
  CardWrapper,
  CullButton,
  KeepButton,
  CardTableWrapper,
  CardOverlay,
} from './StyledMIPProductListCard';
import { MipMskuTable } from '../mip-msku-table/MipMskuTable';
// import { useQuery } from 'react-query';

export const MIPProductListCard: React.FC<MIPProductListCardProps> = ({
  imageUrl,
  discoveryDecision,
  catalog,
  pidData,
  isDecisionTaken,
  keepFunctionDef,
  cullFunctionDef,
}: MIPProductListCardProps) => {
  const [showKeepCullButton, setShowKeepCullButton] = useState<boolean>(true);

  const [borderColorState, setborderColorState] = useState('#f5f5f5');

  useEffect(() => {
    const borderColor = !isDecisionTaken
      ? discoveryDecision.toLowerCase() == 'catalog'
        ? '#028e77'
        : discoveryDecision.toLowerCase() == 'cull'
        ? '#ff0100'
        : '#f5f5f5'
      : '#f5f5f5';
    setborderColorState(borderColor);
  }, [discoveryDecision, isDecisionTaken, catalog]);

  const keepFunction = ($event) => {
    $event.stopPropagation();

    keepFunctionDef().then((data: IPromiseDataStatus) => {
      if (data?.action?.toLowerCase() == 'success') {
        setShowKeepCullButton(false);
        setborderColorState('#f5f5f5');
      }
    });
  };

  const cullFunction = ($event) => {
    $event.stopPropagation();
    cullFunctionDef().then((data: IPromiseDataStatus) => {
      if (data?.action?.toLowerCase() == 'success') {
        setShowKeepCullButton(false);
        setborderColorState('#f5f5f5');
      }
    });
  };

  return (
    <CardWrapper>
      <CardImageWrapper>
        <CardImage src={imageUrl}></CardImage>
        <CardTableWrapper
          hasButton={!isDecisionTaken && showKeepCullButton ? true : false}
        >
          <MipMskuTable tableData={[...pidData]}></MipMskuTable>
        </CardTableWrapper>
      </CardImageWrapper>
      {!catalog && !isDecisionTaken && showKeepCullButton && (
        <CardOverlay borderColor={borderColorState}>
          <ButtonWrapper>
            <KeepButton variant="contained" onClick={(e) => keepFunction(e)}>
              Keep
            </KeepButton>
            <CullButton variant="contained" onClick={(e) => cullFunction(e)}>
              Cull
            </CullButton>
          </ButtonWrapper>
        </CardOverlay>
      )}
    </CardWrapper>
  );
};
