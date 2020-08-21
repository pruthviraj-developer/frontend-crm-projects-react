import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import Message from '../message/Message';
import { Colors } from '@hs/utils';
import { UploadIcon, SvgIcon } from '@hs/icons';
import ImageUploadCore from './ImageUploadCore';
import { MessageProps } from 'message';
import { ErrorsType, ImageUploadProps } from './IImageUpload';

const maxNumber = 69;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const onChange = (_imageList: ImageListType) => {
//   // alert(imageList);
//   // data for submit
//   // console.log(imageList);
// };

const StyledImageUpload = styled.div<{
  previewHeight: number;
  previewWidth: number;
}>`
  display: 'flex';
  justify-content: space-evenly;
  flex-flow: column;
  align-items: center;
  background: ${Colors.GREY_TINT[500]};
  height: ${(props) => props.previewHeight}px;
  width: ${(props) => props.previewWidth}px;
  :hover {
    box-shadow: 0 0 0 1px ${Colors.PINK[400]}, 0 0 0 2px ${Colors.PINK[400]};
  }
`;
const StyledImage = styled.img`
  /* border-radius: 5%; */
  display: block;
`;

const StyledUploadMessage = styled.div<{ height: number; width: number }>`
  display: flex;
  justify-content: space-around;
  flex-flow: column wrap;
  align-items: center;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`;
export const ImageUpload: FC<ImageUploadProps> = ({
  previewHeight = 200,
  previewWidth = 200,
  resolutionHeight,
  resolutionWidth,
  resolutionValidationType,
  onChange,
}: ImageUploadProps) => {
  const [message, setmessage] = useState<MessageProps>({
    messageType: 'info',
    msg: 'Image Upload',
  });
  const onError = (errors: ErrorsType) => {
    if (errors.resolution) {
      setmessage({
        messageType: 'error',
        msg: `Please upload ${resolutionValidationType} ${resolutionHeight}X${resolutionWidth} Image`,
        title: `Size Error`,
      });
    }
    // console.log('Error', errors);
  };
  return (
    <ImageUploadCore
      multiple={false}
      onChange={onChange}
      maxNumber={maxNumber}
      resolutionWidth={resolutionWidth}
      resolutionHeight={resolutionHeight}
      resolutionValidationType={resolutionValidationType}
      onError={onError}
    >
      {({ imageList, onImageUpload, errors }) => (
        <StyledImageUpload
          previewHeight={previewHeight}
          previewWidth={previewWidth}
        >
          {imageList.length > 0 && !errors.name ? (
            imageList.map((image) => (
              <StyledImage
                onClick={image.onUpdate}
                key={image.key}
                src={image.dataURL}
                height={previewHeight}
                width={previewWidth}
              ></StyledImage>
            ))
          ) : (
            <StyledUploadMessage
              height={previewHeight}
              width={previewWidth}
              onClick={onImageUpload}
            >
              <SvgIcon
                icon={UploadIcon}
                fill={Colors.PINK[500]}
                width="50px"
                height="50px"
              />
              <Message {...message}></Message>
            </StyledUploadMessage>
          )}
        </StyledImageUpload>
      )}
    </ImageUploadCore>
  );
};
