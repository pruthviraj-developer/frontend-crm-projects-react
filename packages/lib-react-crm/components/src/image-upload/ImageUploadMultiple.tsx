import React, { FC, useState, useEffect } from 'react';
import ImageUploadCore from './ImageUploadCore';
import { MessageProps } from 'message';
import Message from '../message/Message';
import { MultipleImageUploadProps } from './IImageUploadMultiple';
import { ErrorsType } from './IImageUpload';
import {
  StyledImage,
  StyledImageUpload,
  StyledUploadMessage,
  StyledImageUploadMultiple,
  StyledCard,
} from './StyledImageUploadMultiple';
import {
  Button,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from '@material-ui/core';
import { Colors } from '@hs/utils';
import { UploadIcon, SvgIcon } from '@hs/icons';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const maxNumber = 69;

export const ImageUploadMultiple: FC<MultipleImageUploadProps> = ({
  previewHeight = 200,
  previewWidth = 200,
  resolutionHeight,
  resolutionWidth,
  resolutionValidationType,
  onSubmit,
  defaultImageUrls = [],
}: MultipleImageUploadProps) => {
  const initMessage: MessageProps = {
    messageType: 'info',
    msg: 'Image Upload',
  };
  const [imageUrls, setDefaultImageUrls] = useState<Array<string>>(
    () => defaultImageUrls
  );
  const [message, setmessage] = useState<MessageProps>(initMessage);
  useEffect(() => {
    if (imageUrls.length) {
      setmessage(initMessage);
    }
  }, [imageUrls]);

  const onError = (errors: ErrorsType) => {
    if (errors.resolution) {
      setmessage({
        messageType: 'error',
        msg: `Please upload ${resolutionValidationType} ${resolutionHeight}X${resolutionWidth} Image`,
        title: `Size Error`,
      });
    }
  };

  const onRemove = (index: number) => {
    const images = [...imageUrls];
    images.splice(index, 1);
    setDefaultImageUrls(images);
  };

  const getResolutionValidationType = () =>
    resolutionWidth ? resolutionValidationType : undefined;

  return (
    <ImageUploadCore
      multiple={true}
      maxNumber={maxNumber}
      resolutionWidth={resolutionWidth}
      resolutionHeight={resolutionHeight}
      resolutionValidationType={getResolutionValidationType()}
      onError={onError}
      onChange={(value) => {
        if (value && value.length) {
          setmessage(initMessage);
        }
      }}
    >
      {({ onImageUpload, errors, imageList }) => (
        <StyledImageUpload>
          <StyledImageUploadMultiple>
            <Grid container spacing={2}>
              {imageUrls.length > 0 &&
                !errors.name &&
                imageUrls.map((imageUrl, index: number) => (
                  <Grid item xs={4} key={index}>
                    <StyledCard key={'card' + index} variant={'elevation'}>
                      <CardHeader
                        action={
                          <IconButton
                            onClick={() => {
                              onRemove && onRemove(index);
                            }}
                          >
                            <DeleteForeverIcon fontSize={'large'} />
                          </IconButton>
                        }
                        title={'Image'}
                        subheader={`Supported ${resolutionWidth}X${resolutionHeight}`}
                      />
                      <CardContent>
                        <StyledImage
                          key={index}
                          src={imageUrl}
                          height={previewHeight}
                          width={previewWidth}
                        ></StyledImage>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              {imageList.length > 0 &&
                !errors.name &&
                imageList.map((image, index: number) => (
                  <Grid item xs={4} key={index}>
                    <StyledCard key={'card' + index} variant={'elevation'}>
                      <CardHeader
                        action={
                          <IconButton
                            onClick={() => {
                              image?.onRemove && image.onRemove();
                              onRemove && onRemove(index);
                            }}
                          >
                            <DeleteForeverIcon fontSize={'large'} />
                          </IconButton>
                        }
                        title={'Image'}
                        subheader={`Supported ${resolutionWidth}X${resolutionHeight}`}
                      />
                      <CardContent>
                        <StyledImage
                          key={index}
                          src={image.dataURL}
                          height={previewHeight}
                          width={previewWidth}
                        ></StyledImage>
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}

              {message.messageType == 'error' && (
                <Grid item xs={4}>
                  <StyledUploadMessage
                    height={previewHeight}
                    width={previewWidth}
                  >
                    <SvgIcon
                      icon={UploadIcon}
                      fill={Colors.PINK[500]}
                      width="50px"
                      height="50px"
                    />
                    <Message {...message}></Message>
                  </StyledUploadMessage>
                </Grid>
              )}
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadOutlinedIcon />}
                  component="span"
                  size={'large'}
                  onClick={onImageUpload}
                >
                  Upload Images
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUploadOutlinedIcon />}
                  component="span"
                  size={'large'}
                  onClick={() => onSubmit && onSubmit(imageUrls, imageList)}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </StyledImageUploadMultiple>
        </StyledImageUpload>
      )}
    </ImageUploadCore>
  );
};
