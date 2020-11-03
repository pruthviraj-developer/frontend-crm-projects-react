import { httpService } from '../http';
import { MerchStatusChangeType } from './Imerch.statuschange.service';

const markNonProcurable = ({
  file,
  params,
}: MerchStatusChangeType): Promise<any> => {
  const url = `/markstatus/statusupdate`;
  const data = new FormData();
  if (file) {
    data.append('file', file);
  }
  return httpService.fileUpload<any>({ url, data, params });
};

export const merchStatusChangeService = {
  markNonProcurable,
};
