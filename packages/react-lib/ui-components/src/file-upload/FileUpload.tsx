import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { getBase64 } from './FileValidation';
import {
  FileListType,
  FileUploadProps,
  FileErrorsType as ErrorsType,
} from './IFileUpload';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import { StyledFileUpload, StyledPaper } from './StyledFileUpload';

const defaultErrors: ErrorsType = {
  maxFileSize: false,
  maxNumber: false,
  acceptType: false,
};

export const FileUpload = ({
  multiple,
  acceptType,
  maxNumber,
  maxFileSize,
  onChange,
}: FileUploadProps) => {
  const [fileList, setFileList] = useState<FileListType>([]);
  const [, setErrors] = useState<ErrorsType>({ ...defaultErrors });
  const acceptString =
    acceptType && acceptType.length > 0
      ? acceptType.map((item) => `.${item}`).join(', ')
      : 'text/*';

  const getListFile = (files: FileList): Promise<FileListType> => {
    const promiseFiles: Array<Promise<string>> = [];

    for (let i = 0; i < files.length; i++) {
      promiseFiles.push(getBase64(files[i]));
    }

    return Promise.all(promiseFiles).then((fileListBase64: Array<string>) => {
      const fileList: FileListType = fileListBase64.map((base64, index) => {
        const key = `${new Date().getTime().toString()}-${files[index].name}`;
        return {
          dataURL: base64,
          file: files[index],
          key,
        };
      });
      return fileList;
    });
  };
  const validate = async (fileList: FileListType): Promise<boolean> => {
    const newErrors = { ...defaultErrors };

    if (maxNumber && fileList.length + fileList.length > maxNumber) {
      newErrors.maxNumber = true;
    } else {
      for (let i = 0; i < fileList.length; i++) {
        const { file } = fileList[i];

        if (file) {
          const fileType: string = file.type;
          if (!fileType.includes('image')) {
            newErrors.acceptType = true;
            break;
          }
          if (maxFileSize) {
            if (file.size > maxFileSize) {
              newErrors.maxFileSize = true;
              break;
            }
          }
          if (acceptType && acceptType.length > 0) {
            const type: string = file.name.split('.').pop() || '';
            if (acceptType.indexOf(type) < 0) {
              newErrors.acceptType = true;
              break;
            }
          }
        }
      }
    }
    setErrors(newErrors);
    return true;
  };
  const onInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const { files } = e.target;

    if (files) {
      const fileList = await getListFile(files);
      if (fileList.length > 0) {
        const checkValidate = await validate(fileList);
        if (checkValidate) {
          let updatedFileList: FileListType;
          if (multiple) {
            updatedFileList = [...fileList];
            if (maxNumber && updatedFileList.length > maxNumber) {
              updatedFileList = fileList;
            }
          } else {
            updatedFileList = [fileList[0]];
          }
          setFileList(updatedFileList);
          if (onChange) onChange(updatedFileList);
        }
      }
    }
  };
  return (
    <StyledFileUpload elevation={3}>
      <Grid container spacing={0} justify="flex-start" alignItems="center">
        <Grid item xs={3}>
          <input
            type="file"
            accept={acceptString}
            multiple={multiple}
            onChange={onInputChange}
            style={{ display: 'none' }}
            id="file-upload-input"
          />
          <label htmlFor="file-upload-input">
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUploadOutlinedIcon />}
              component="span"
              size={'large'}
            >
              Choose File
            </Button>
          </label>
        </Grid>
        <Grid item xs={9}>
          {/* <Paper elevation={3}> */}
          <Grid container direction="column" spacing={1}>
            {fileList &&
              fileList.map((file) => (
                <Grid item xs={12} key={file.file.name}>
                  <StyledPaper key={file.file.name}>
                    {file.file.name}
                  </StyledPaper>
                </Grid>
              ))}
          </Grid>
          {/* </Paper> */}
        </Grid>
      </Grid>
    </StyledFileUpload>
  );
};
