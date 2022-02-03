import React, { useRef, useState, useCallback } from 'react';
import { getBase64, checkResolution } from './ImageValidation';
import {
  ImageType,
  ImageListType,
  ImageUploadCoreProps,
  ErrorsType,
} from './IImageUpload';

const defaultErrors: ErrorsType = {
  maxFileSize: false,
  maxNumber: false,
  acceptType: false,
  resolution: false,
};

const ImageUploadCore: React.FC<ImageUploadCoreProps> = ({
  multiple,
  onChange,
  maxNumber,
  children,
  defaultValue,
  acceptType,
  maxFileSize,
  resolutionWidth,
  resolutionHeight,
  resolutionValidationType,
  onError,
}: ImageUploadCoreProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageList, setImageList] = useState(() => {
    let initImageList: Array<ImageType> = [];
    if (defaultValue) {
      initImageList = defaultValue.map((item: ImageType) => ({
        ...item,
        key: item.dataURL,
        onUpdate: (): void => onImageUpdate(item.dataURL),
        onRemove: (): void => onImageRemove(item.dataURL),
      }));
    }
    return initImageList;
  });

  const [keyUpdate, setKeyUpdate] = useState<string>('');
  const [errors, setErrors] = useState<ErrorsType>({ ...defaultErrors });

  const onStandardizeDataChange = (list: ImageListType): void => {
    if (onChange) {
      const sData: ImageListType = list.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ key, onUpdate, onRemove, ...restOfItem }) => ({
          ...restOfItem,
        })
      );
      onChange(sData);
    }
  };

  const handleClickInput = useCallback((): void => {
    inputRef.current && inputRef.current.click();
  }, [inputRef]);

  const onImageUpload = useCallback((): void => {
    setKeyUpdate((prevKey) => {
      if (prevKey) {
        return '';
      }
      return prevKey;
    });
    handleClickInput();
  }, [handleClickInput]);

  const onImageRemoveAll = useCallback((): void => {
    setImageList([]);
    onStandardizeDataChange([]);
  }, []);

  const onImageRemove = (key: string): void => {
    setImageList((previousList) => {
      const updatedList = previousList.filter(
        (item: ImageType) => item.key !== key
      );
      onStandardizeDataChange(updatedList);
      return updatedList;
    });
  };

  const onImageUpdate = (key: string): void => {
    setKeyUpdate(key);
    handleClickInput();
  };

  const getListFile = (files: FileList): Promise<ImageListType> => {
    const promiseFiles: Array<Promise<string>> = [];

    for (let i = 0; i < files.length; i++) {
      promiseFiles.push(getBase64(files[i]));
    }

    return Promise.all(promiseFiles).then((fileListBase64: Array<string>) => {
      const fileList: ImageListType = fileListBase64.map((base64, index) => {
        const key = `${new Date().getTime().toString()}-${files[index].name}`;
        return {
          dataURL: base64,
          file: files[index],
          key,
          onUpdate: (): void => onImageUpdate(key),
          onRemove: (): void => onImageRemove(key),
        };
      });
      return fileList;
    });
  };

  const validate = async (fileList: ImageListType): Promise<boolean> => {
    const newErrors = { ...defaultErrors };

    if (
      maxNumber &&
      !keyUpdate &&
      fileList.length + imageList.length > maxNumber
    ) {
      newErrors.maxNumber = true;
    } else {
      for (let i = 0; i < fileList.length; i++) {
        const { file, dataURL } = fileList[i];

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
        if (dataURL && resolutionValidationType) {
          const checkRes = await checkResolution(
            dataURL,
            resolutionValidationType,
            resolutionWidth,
            resolutionHeight
          );
          if (!checkRes) {
            newErrors.resolution = true;
            break;
          } else {
            // console.log('No Error', resolutionValidationType);
          }
        }
      }
    }
    setErrors(newErrors);
    if (Object.values(newErrors).find(Boolean)) {
      onError && onError(newErrors, fileList);
      onImageRemoveAll();
      return false;
    }
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
          let updatedFileList: ImageListType;
          if (keyUpdate) {
            updatedFileList = imageList.map((item: ImageType) => {
              if (item.key === keyUpdate) return { ...fileList[0] };
              return item;
            });
          } else {
            if (multiple) {
              updatedFileList = [...imageList, ...fileList];
              if (maxNumber && updatedFileList.length > maxNumber) {
                updatedFileList = imageList;
              }
            } else {
              updatedFileList = [fileList[0]];
            }
          }
          setImageList(updatedFileList);
          onStandardizeDataChange(updatedFileList);
        }
      }
    }
    keyUpdate && setKeyUpdate('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const acceptString =
    acceptType && acceptType.length > 0
      ? acceptType.map((item) => `.${item}`).join(', ')
      : 'image/*';

  return (
    <>
      <input
        type="file"
        accept={acceptString}
        ref={inputRef}
        multiple={multiple && !keyUpdate}
        onChange={onInputChange}
        style={{ display: 'none' }}
      />
      {children &&
        children({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          errors,
        })}
    </>
  );
};

ImageUploadCore.defaultProps = {
  maxNumber: 100,
  multiple: false,
  acceptType: [],
};

export default ImageUploadCore;
