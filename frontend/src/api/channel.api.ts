import { ResponseDto } from '@/api/dto/response.dto.ts';
import {
  createChannelReqEntity,
  createChannelResEntity,
  getChannelResEntity,
  getUserChannelsResEntity,
  guestEntity,
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
          fnResolve(new ResponseDto<createChannelResEntity>(res.data));
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
          fnResolve(new ResponseDto<getUserChannelsResEntity>(res.data));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};

export const getChannelInfo = (channelId: string): Promise<ResponseDto<getChannelResEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<getChannelResEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .get(`/channel/${channelId}`)
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<getChannelResEntity>(res.data));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};

export const getGuestInfo = (
  channelId: string,
  userId: string,
): Promise<ResponseDto<guestEntity>> => {
  const promiseFn = (
    fnResolve: (value: ResponseDto<guestEntity>) => void,
    fnReject: (reason?: any) => void,
  ) => {
    const apiClient = getApiClient();
    apiClient
      .get(`/channel/${channelId}/guest/${userId}`)
      .then(res => {
        if (res.status !== 200) {
          console.error(res);
          fnReject(`msg.${res}`);
        } else {
          fnResolve(new ResponseDto<guestEntity>(res.data));
        }
      })
      .catch(err => {
        console.error(err);
        fnReject('msg.RESULT_FAILED');
      });
  };
  return new Promise(promiseFn);
};
