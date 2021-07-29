import React, { FC } from 'react';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { ImageListType, ImageUploadMultiple, ImageType } from '@hs/components';
import { buyerService } from '@hs/services';
import { Grid, Paper } from '@material-ui/core';
import { ImageUploadRes, UpdateImageUrls, IPid, UploadImageProps } from './IImages';
import { Helmet } from 'react-helmet';

const ImagesWrapper = styled.div`
  width: 95%;
  margin: 10px 10px 10px 90px;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 1rem;
`;

const uploadFile = async (value: ImageType) => {
  return await buyerService.imageUpload({
    file: value.file,
  });
};

const tryLater = 'Please try later';
const showError = (error: Record<string, string>) => {
  let message = tryLater;
  if (error.action === 'failure' && error.message) {
    message = error.message;
  }
  toast.error(message);
};

const Images: FC<UploadImageProps> = ({ header }: UploadImageProps) => {
  const params: IPid = useParams();
  const location = useLocation();
  const history = useHistory();
  const imageUrls: Array<string> = (location && location.state) as Array<string>;
  const gotoDashboard = () => {
    history.push('/buyer/dashboard');
  };

  if (!imageUrls) {
    gotoDashboard();
  }

  const uploadToProductTypes = async (params: IPid, imgUrls: string[]) => {
    try {
      const updateImages: UpdateImageUrls = await buyerService.postData(
        { action: 'buyerDashboardPTImageMap', pid: params.pid },
        { imgUrls: imgUrls },
      );
      if (updateImages && updateImages.action === 'SUCCESS') {
        toast.success(updateImages.message);
        gotoDashboard();
      } else {
        toast.error(updateImages.message);
      }
    } catch (error) {
      showError(error);
    }
  };

  const uploadMultipleFiles = (uploadedFiles: ImageListType, params: IPid, imageUrls: string[]) => {
    const resolvePromises = uploadedFiles.map((data: ImageType) => uploadFile(data));
    Promise.all(resolvePromises)
      .then((values) => {
        const imgUrls: string[] = [];
        values.map((res: ImageUploadRes) => {
          if (res.action === 'success') {
            imgUrls.push(
              `https://${res.imageURLPrefix}/fstatic${res.imageResponse.imageUrl}?version=${res.imageResponse.version}`,
            );
          } else {
            toast.error('Error uploading, please try again');
            return;
          }
        });
        uploadToProductTypes(params, [...imgUrls, ...imageUrls]);
      })
      .catch((error) => {
        showError(error);
      });
  };

  return (
    <Wrapper>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <h1 style={{ margin: '20px', fontSize: '18px' }}>{header}</h1>
      <Grid container direction="column" justify="center" spacing={3}>
        <Paper variant="outlined">
          <Grid item xs>
            <ImagesWrapper>
              <ImageUploadMultiple
                {...{
                  previewHeight: 200,
                  previewWidth: 200,
                  resolutionHeight: 250,
                  resolutionWidth: 250,
                  resolutionValidationType: 'less',
                  onSubmit: (imageUrls: string[], imageToUpload?: ImageListType) => {
                    imageToUpload && uploadMultipleFiles(imageToUpload, params, imageUrls);
                  },
                  defaultImageUrls: imageUrls,
                }}
              />
            </ImagesWrapper>
          </Grid>
        </Paper>
      </Grid>
    </Wrapper>
  );
};
export default Images;
