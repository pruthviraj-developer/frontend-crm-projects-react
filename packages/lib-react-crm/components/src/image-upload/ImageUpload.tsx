import React, { FC, useState, useEffect } from 'react';
import Message from '../message/Message';
import { Colors } from '@hs/utils';
import { UploadIcon, SvgIcon } from '@hs/icons';
import ImageUploadCore from './ImageUploadCore';
import { MessageProps } from 'message';
import { ErrorsType, ImageUploadProps } from './IImageUpload';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  StyledImageUpload,
  StyledImage,
  StyledUploadMessage,
  StyledProgress,
} from './StyledImageUpload';

const maxNumber = 69;

export const ImageUpload: FC<ImageUploadProps> = ({
  previewHeight = 200,
  previewWidth = 200,
  resolutionHeight,
  resolutionWidth,
  resolutionValidationType,
  onChange,
  imageUrl = '',
}: ImageUploadProps) => {
  const initMessage: MessageProps = {
    messageType: 'info',
    msg: 'Image Upload',
  };
  const [message, setmessage] = useState<MessageProps>(initMessage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageUrl != '') {
      setLoading(false);
      setmessage(initMessage);
    }
  }, [imageUrl]);

  const onError = (errors: ErrorsType) => {
    setLoading(false);
    if (errors.resolution) {
      setmessage({
        messageType: 'error',
        msg: `Please upload ${resolutionValidationType} ${resolutionHeight}X${resolutionWidth} Image`,
        title: `Size Error`,
      });
    }
  };
  const getResolutionValidationType = () =>
    resolutionWidth ? resolutionValidationType : undefined;

  return (
    <ImageUploadCore
      multiple={false}
      onChange={(value) => {
        setLoading(true);
        if (onChange) onChange(value);
      }}
      maxNumber={maxNumber}
      resolutionWidth={resolutionWidth}
      resolutionHeight={resolutionHeight}
      resolutionValidationType={getResolutionValidationType()}
      onError={onError}
    >
      {({ onImageUpload, errors }) => (
        <StyledImageUpload
          previewHeight={previewHeight}
          previewWidth={previewWidth}
        >
          {!loading && imageUrl && !errors.name && (
            <StyledImage
              onClick={onImageUpload}
              src={imageUrl}
              height={previewHeight}
              width={previewWidth}
            ></StyledImage>
          )}
          {(message.messageType == 'error' || !imageUrl) && (
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
          {loading && !(message.messageType == 'error') && (
            <StyledProgress margin={previewHeight / 2 - 22}>
              <CircularProgress />
            </StyledProgress>
          )}
        </StyledImageUpload>
      )}
    </ImageUploadCore>
  );
};
