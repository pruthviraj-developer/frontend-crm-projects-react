import React, { FC } from 'react';
import { LeftNavBar, LeftNavBarProps } from '@hs/components';
import { ArchiveIcon } from '@hs/icons';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';
import SaveIcon from '@material-ui/icons/Save';
import { toast } from 'react-toastify';
import { bulkUploadService } from '@hs/services';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export const StyledCntnr = styled(Paper)`
  max-width: 50vw;
  margin: 90px;
  padding: 50px;
  text-align: center;
  max-height: 50vw;
`;

const StyleDownloadButton = styled.div`
  margin: 50px;
  width: auto;
`;

const navItems: LeftNavBarProps = {
  navList: [{ linkUrl: 'mskuTargetDownload', linkText: 'MSKU catalog targets', icon: ArchiveIcon }],
};

export interface MskuTargetDownloadProps {
  header: string;
  action: string;
  downloadOption: string;
}

const MskuTargetDownload: FC<MskuTargetDownloadProps> = ({
  header,
  action,
  downloadOption,
}: MskuTargetDownloadProps) => {
  const onExport = async (downloadAction?: any) => {
    try {
      const res = await bulkUploadService.downloadTemplate({
        action: downloadAction,
      });
      if (res.data.is_available) {
        window.open(res.data.url, '_blank');
        res.data.message !== '' && toast.success(res.data.message);
      } else {
        toast.warn(res.data.message);
      }
    } catch (e) {
      toast.error(e.data.data.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>{header}</title>
      </Helmet>
      <LeftNavBar {...navItems}></LeftNavBar>
      <Grid container direction="column" justify="center" alignItems="center">
        <StyledCntnr elevation={3}>
          <h2>{header}</h2>
          <StyleDownloadButton>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              onClick={() => {
                if (onExport) onExport(action);
              }}
            >
              {downloadOption}
            </Button>
          </StyleDownloadButton>
        </StyledCntnr>
      </Grid>
    </>
  );
};

export default MskuTargetDownload;
