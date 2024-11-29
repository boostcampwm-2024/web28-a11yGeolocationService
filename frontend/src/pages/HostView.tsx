import { HeaderDropdownContext } from '@/component/header/HeaderDropdownProvider.tsx';
import { useContext, useEffect, useState } from 'react';
import { IGuest, IChannelInfo, IGuestData } from '@/types/channel.types.ts';
import { getChannelInfo } from '@/api/channel.api.ts';
import { useLocation } from 'react-router-dom';
import { MapCanvasForView } from '@/component/canvasWithMap/canvasWithMapForView/MapCanvasForView.tsx';
import { IGuestDataInMapProps, IPoint, IPointWithAlpha } from '@/lib/types/canvasInterface.ts';
import { getChannelResEntity, guestEntity } from '@/api/dto/channel.dto.ts';
import { HostMarker } from '@/component/IconGuide/HostMarker.tsx';
import { LoadingSpinner } from '@/component/common/loadingSpinner/LoadingSpinner.tsx';
import { getUserLocation } from '@/hooks/getUserLocation.ts';
import { loadLocalData, saveLocalData } from '@/utils/common/manageLocalData.ts';
import { AppConfig } from '@/lib/constants/commonConstants.ts';
import { v4 as uuidv4 } from 'uuid';
import { useSocket } from '@/hooks/useSocket.ts';

interface IOtherLocationsInHostView {
  guestId: string;
  location: IPointWithAlpha;
  token: string;
  color: string;
}
export const HostView = () => {
  const { lat, lng, alpha, error } = getUserLocation();
  const location = useLocation();

  const [channelInfo, setChannelInfo] = useState<IChannelInfo>();
  const [guestsData, setGuestsData] = useState<IGuestData[]>([]);
  const [mapProps, setMapProps] = useState<IGuestDataInMapProps[]>([]);
  const [clickedId, setClickedId] = useState<string>('');
  const [otherLocations, setOtherLocations] = useState<IOtherLocationsInHostView[]>([]);

  const headerDropdownContext = useContext(HeaderDropdownContext);
  const markerDefaultColor = ['#B4D033', '#22A751', '#2722A7', '#8F22A7', '#A73D22'];

  if (!loadLocalData(AppConfig.KEYS.BROWSER_TOKEN)) {
    const token = uuidv4();
    saveLocalData(AppConfig.KEYS.BROWSER_TOKEN, token);
  }
  const token = loadLocalData(AppConfig.KEYS.BROWSER_TOKEN);
  const url = `${AppConfig.SOCKET_SERVER}/?token=${token}&channelId=${location.pathname.split('/')[2]}&role=host`;

  const ws = useSocket(url);

  useEffect(() => {
    if (ws) {
      ws.onmessage = event => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.type === 'init') {
          // 기존 클라이언트들의 위치 초기화
          const updatedLocations = data.clients.map((client: any, index: number) => {
            const matchingGuest = channelInfo?.guests?.find(guest => guest.id === client.guestId);
            return {
              ...client,
              color: matchingGuest?.markerStyle.color ?? markerDefaultColor[index],
            };
          });
          setOtherLocations(updatedLocations);
        } else if (data.type === 'location') {
          // 새로 들어온 위치 업데이트
          const matchingGuest = guestsData?.find(guest => guest.id === data.guestId);
          const updatedLocation = {
            guestId: data.guestId,
            location: data.location,
            token: data.token,
            color: matchingGuest?.markerStyle.color ?? '#ffffff',
          };

          setOtherLocations(prev => {
            const index = prev.findIndex(el => el.guestId === data.guestId);

            if (index !== -1) {
              const updatedLocations = [...prev];
              updatedLocations[index] = updatedLocation;
              return updatedLocations;
            }
            return [...prev, updatedLocation];
          });
        }
      };
    }
  }, [ws, guestsData]);

  const transformTypeGuestEntityToIGuest = (props: guestEntity): IGuest => {
    return {
      id: props.id ?? '',
      name: props.name ?? '',
      startPoint: {
        lat: props.start_location?.lat ?? 0,
        lng: props.start_location?.lng ?? 0,
      },
      endPoint: {
        lat: props.end_location?.lat ?? 0,
        lng: props.end_location?.lng ?? 0,
      },
      paths: (props.path as IPoint[]) ?? [],
      markerStyle: {
        color: props.marker_style?.color ?? '',
      },
    };
  };

  const transformTypeFromResToInfo = (props: getChannelResEntity): IChannelInfo => {
    const guests = props.guests?.map(guest => transformTypeGuestEntityToIGuest(guest)) ?? [];

    return {
      name: props.name ?? '',
      hostId: props.host_id ?? '',
      channelId: props.id ?? '',
      guests,
    };
  };

  const fetchChannelInfo = (userId: string) => {
    getChannelInfo(userId)
      .then(res => {
        if (!res.data) throw new Error('🚀 Fetch Error: responsed undefined');
        const transfromedData = transformTypeFromResToInfo(res.data);
        setChannelInfo(transfromedData);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const handleClickDropdown = (guestId: string) => {
    setClickedId(guestId);
  };

  useEffect(() => {
    headerDropdownContext.setItems([{ name: '사용자 1', id: '1', markerStyle: { color: '#000' } }]);

    fetchChannelInfo(location.pathname.split('/')[2]);
  }, []);

  useEffect(() => {
    if (channelInfo?.guests) {
      const data: IGuestData[] = channelInfo.guests.map((guest, index) => ({
        name: guest.name,
        markerStyle: guest.markerStyle ?? { color: markerDefaultColor[index] },
        // markerStyle: { color: markerDefaultColor[index] },
        id: guest.id,
      }));

      setGuestsData(data);

      if (clickedId === '') {
        setMapProps([]);
        channelInfo.guests?.map(guest =>
          setMapProps(prev => [...prev, guest as IGuestDataInMapProps]),
        );
      } else {
        setMapProps(channelInfo.guests?.filter(guest => guest.id === clickedId));
      }
    }
  }, [channelInfo, clickedId]);

  useEffect(() => {
    headerDropdownContext.setItems(guestsData);
    headerDropdownContext.setOnClickHandler(handleClickDropdown);
  }, [guestsData]);

  return (
    <article className="absolute h-full w-screen flex-grow overflow-hidden">
      <HostMarker guestsData={mapProps} />
      {/* eslint-disable-next-line no-nested-ternary */}
      {lat && lng ? (
        // eslint-disable-next-line no-nested-ternary
        mapProps ? (
          otherLocations ? (
            <MapCanvasForView
              lat={lat}
              lng={lng}
              alpha={alpha}
              width="100%"
              height="100%"
              guests={mapProps}
              otherLocations={otherLocations}
            />
          ) : (
            <LoadingSpinner />
          )
        ) : (
          <LoadingSpinner />
        )
      ) : (
        <section className="flex h-full flex-col items-center justify-center gap-2 text-xl text-gray-700">
          <LoadingSpinner />
          {error ? `Error: ${error}` : 'Loading map data...'}
        </section>
      )}
    </article>
  );
};
