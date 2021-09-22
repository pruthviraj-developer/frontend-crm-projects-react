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
import {
  IDeliveryDetailsProps,
  DeliveryMessageOrDeliveryMessagesEntity,
} from './IDeliveryDetails';
import { NextNavLink } from '../next-nav-link';

export const DeliveryDetails: FC<IDeliveryDetailsProps> = (
  props: IDeliveryDetailsProps
) => {
  return (
    <DeliveryDetailsWrapper>
      <DeliveryTitle>
        <Title>Delivery</Title>
        <PinCode>Check pincode</PinCode>
      </DeliveryTitle>
      <DeliveryDetailsContent>
        <Delivery>
          <DeliverIcon icon={IconTick} fill={'#bbb'} />
          {props.sku && (
            <DeliveryInfo>
              {props.sku.eddPrefix}
              <DeliveryBadge
                color={props.sku.eddTextColor}
                bgColor={props.sku.eddColor}
              >
                {props.sku.deliveryMsg}
              </DeliveryBadge>
            </DeliveryInfo>
          )}
          {!props.sku && (
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
          {props.sku && props.sku.isInternationalPreorder && (
            <PreOrderInfo>
              <NextNavLink
                color={'#707070'}
                name={props.sku.preorderInfo}
                href={props.sku.preorderAction}
              ></NextNavLink>
            </PreOrderInfo>
          )}
          {props.productDetail && props.productDetail.isInternationalPreorder && (
            <PreOrderInfo>
              <a
                target="_blank"
                href={props.productDetail.preorderAction}
                rel="noreferrer"
              >
                {props.productDetail.preorderInfo}
              </a>
            </PreOrderInfo>
          )}
        </Delivery>

        {/* 
          <div class="point delivery">
              <span class="delivery-badge" ng-style="{'background-color': vm.productForm.sku.eddColor, 'color': vm.productForm.sku.eddTextColor}" ng-bind="vm.productForm.sku.deliveryMsg"></span>
              <span class="delivery-badge" ng-style="{'background-color': vm.productDetail.eddColor, 'color': vm.productDetail.eddTextColor}" ng-bind="vm.productDetail.edd"></span>
              <span class ="international-preorder" ng-if="vm.showInternationaPreorder()"><a target="_blank" ng-href="{{vm.productForm.sku.preorderAction || vm.productDetail.preorderAction}}">{{vm.productForm.sku.preorderInfo
                  || vm.productDetail.preorderInfo}}</a>
              </span>
          </div>
        */}

        {props.deliveryDetails.map(
          (data: DeliveryMessageOrDeliveryMessagesEntity, index: number) => (
            <Delivery key={index}>
              <DeliverIcon
                icon={data.type ? IconTick : IconCrossRed}
                fill={'#bbb'}
              />
              <DeliveryInfo>{data.msg}</DeliveryInfo>
            </Delivery>
          )
        )}
      </DeliveryDetailsContent>
    </DeliveryDetailsWrapper>
  );
};
