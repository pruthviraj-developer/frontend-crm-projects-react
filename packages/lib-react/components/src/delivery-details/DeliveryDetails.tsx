import React, { FC } from 'react';
import { IconTick, IconCrossRed } from '@hs/icons';
import {
  DeliveryDetailsWrapper,
  DeliveryDetailsContent,
  DeliveryTitle,
  Delivery,
  DeliverIcon,
  DeliveryBadge,
  DeliveryInfo,
  Title,
  PinCode,
  PreOrderInfo,
} from './StyledDeliveryDetails';
import { IDeliveryDetailsProps, DetailProps } from './IDeliveryDetails';

export const DeliveryDetails: FC<IDeliveryDetailsProps> = (
  props: IDeliveryDetailsProps
) => {
  debugger;
  return (
    <DeliveryDetailsWrapper>
      <DeliveryTitle>
        <Title>Delivery</Title>
        <PinCode>Check pincode</PinCode>
      </DeliveryTitle>
      <DeliveryDetailsContent>
        <Delivery>
          <DeliverIcon icon={IconTick} fill={'#bbb'} />
          {props.selectedSku && (
            <DeliveryInfo>
              {props.selectedSku.eddPrefix}
              <DeliveryBadge
                color={props.selectedSku.eddTextColor}
                bgColor={props.selectedSku.eddColor}
              >
                {props.selectedSku.deliveryMsg}
              </DeliveryBadge>
            </DeliveryInfo>
          )}
          {!props.selectedSku && (
            <DeliveryInfo>
              {props.productDetail.eddPrefix}
              <DeliveryBadge
                color={props.productDetail.eddTextColor}
                bgColor={props.productDetail.eddColor}
              >
                {props.productDetail.edd}
              </DeliveryBadge>
            </DeliveryInfo>
          )}
          {props.selectedSku && props.selectedSku.isInternationalPreorder && (
            <PreOrderInfo>
              <a target="_blank" href={props.selectedSku.preorderAction}>
                {props.selectedSku.preorderInfo}
              </a>
            </PreOrderInfo>
          )}
          {props.productDetail && props.productDetail.isInternationalPreorder && (
            <PreOrderInfo>
              <a target="_blank" href={props.productDetail.preorderAction}>
                {props.productDetail.preorderInfo}
              </a>
            </PreOrderInfo>
          )}
        </Delivery>

        {/* 
          <div class="point delivery">
              <span class="delivery-badge" ng-style="{'background-color': vm.productForm.selectedSku.eddColor, 'color': vm.productForm.selectedSku.eddTextColor}" ng-bind="vm.productForm.selectedSku.deliveryMsg"></span>
              <span class="delivery-badge" ng-style="{'background-color': vm.productDetail.eddColor, 'color': vm.productDetail.eddTextColor}" ng-bind="vm.productDetail.edd"></span>
              <span class ="international-preorder" ng-if="vm.showInternationaPreorder()"><a target="_blank" ng-href="{{vm.productForm.selectedSku.preorderAction || vm.productDetail.preorderAction}}">{{vm.productForm.selectedSku.preorderInfo
                  || vm.productDetail.preorderInfo}}</a>
              </span>
          </div>
        */}

        {props.deliveryDetails.map((data: DetailProps) => (
          <Delivery>
            <DeliverIcon
              icon={data.type ? IconTick : IconCrossRed}
              fill={'#bbb'}
            />
            <DeliveryInfo>{data.msg}</DeliveryInfo>
          </Delivery>
        ))}
      </DeliveryDetailsContent>
    </DeliveryDetailsWrapper>
  );
};
