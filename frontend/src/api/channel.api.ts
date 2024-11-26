import { ResponseDto } from '@/api/dto/response.dto.ts';
import {
  createChannelReqEntity,
  createChannelResEntity,
  getUserChannelsResEntity,
} from '@/api/dto/channel.dto.ts';
import { getApiClient } from '@/api/client.api.ts';

export const createChannel = (
  data: createChannelReqEntity,
): Promise<ResponseDto<createChannelResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<createChannelResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .post('/channel', data)
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<createChannelResEntity>(res));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};

export const getUserChannels = (userId: string): Promise<ResponseDto<getUserChannelsResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<getUserChannelsResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .get(`/channel/user/${userId}`)
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<getUserChannelsResEntity>(res));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};