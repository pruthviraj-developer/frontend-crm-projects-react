import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import Message from '../message/Message';
import { ImageUploadProps } from './IImageUpload';
import { Colors } from '@hs/utils';

const StyledImageUpload = styled.div`
  /* width: 500px; */
`;
const StyledImage = styled.img`
  border-radius: 5%;
  display: block;
`;
const StyledInput = styled.input`
  border-bottom: 4px solid ${Colors.GREY_TINT[500]};
  border-right: 4px solid ${Colors.GREY_SHADE[400]};
  border-top: 1px solid ${Colors.GREY_SHADE[500]};
  border-left: 1px solid ${Colors.GREY_SHADE[500]};
  padding: 10px 0px;
  margin: 15px;
  width: 500px;
  cursor: pointer;
`;
const ImagePreview = styled.div`
  text-align: center;
  margin: 5px 15px;
  height: 200px;
  width: 500px;
  border-left: 1px solid ${Colors.PINK[400]};
  border-right: 1px solid ${Colors.PINK[400]};
  border-top: 5px solid ${Colors.PINK[400]};
  border-bottom: 5px solid ${Colors.PINK[400]};
  img {
    width: 100%;
    height: 100%;
  }
`;

const ImageUpload: FC<ImageUploadProps> = (props: ImageUploadProps) => {
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');

  const validateImage = (imageObj: HTMLImageElement) => {
    let validationMessage = '';
    if (props.maxWidth && imageObj.naturalWidth > props.maxWidth)
      validationMessage = `Image Width ${imageObj.naturalWidth} is greater than ${props.maxWidth}`;
    if (props.maxHeight && imageObj.naturalHeight > props.maxHeight)
      validationMessage = `Image height ${imageObj.naturalHeight} is greater than ${props.maxHeight}`;
    if (props.minWidth && imageObj.naturalWidth < props.minWidth)
      validationMessage = `Image Width ${imageObj.naturalWidth} is less than ${props.minWidth}`;
    if (props.minHeight && imageObj.naturalHeight < props.minHeight)
      validationMessage = `Image height ${imageObj.naturalHeight} is less than ${props.minHeight}`;
    setMessage(validationMessage);
    if (validationMessage) setImageUrl('');
  };

  const handleImageLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event?.target?.files[0];
    const imageObject = new window.Image();
    const imageUrl = URL.createObjectURL(imageFile);
    setImageUrl(imageUrl);

    imageObject.onload = () => {
      validateImage(imageObject);
      URL.revokeObjectURL(imageUrl);
    };
    imageObject.src = imageUrl;
  };

  return (
    <StyledImageUpload color={'red'}>
      <StyledInput
        type="file"
        accept="image/jpg,image/jpeg,image/png,image/gif"
        onChange={handleImageLoad}
      ></StyledInput>
      <ImagePreview>
        {imageUrl && <StyledImage src={imageUrl}></StyledImage>}
        {message && (
          <Message
            messageType="error"
            msg={message}
            title="Size Error"
          ></Message>
        )}
        {!imageUrl && !message && (
          <Message messageType="info" msg={'Upload a image'} title=""></Message>
        )}
      </ImagePreview>
    </StyledImageUpload>
  );
};

export default ImageUpload;
