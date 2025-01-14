import { useContext, useEffect, useState } from 'react';
import { HiMiniInformationCircle } from 'react-icons/hi2';
import { FooterContext } from '@/component/layout/footer/LayoutFooterProvider';
import { Outlet, useNavigate } from 'react-router-dom';
import { RouteResultButton } from '@/component/routebutton/RouteResultButton';
import { Page } from '@/component/routebutton/enum';
import { ChannelContext } from '@/context/ChannelContext';
import { IUser, UserContext } from '@/context/UserContext';
import { guestEntity } from '@/api/dto/channel.dto';
import { ToastAlert } from '@/component/common/alert/ToastAlert';
import { InputBox } from '../component/common/InputBox';

const Divider = () => <hr className="my-6 w-full border-gray-300" />;

export const ChannelInfoPage = () => {
  const { channelInfo } = useContext(ChannelContext);
  const { setFooterTransparency, resetFooterContext } = useContext(FooterContext);
  const { resetUsers } = useContext(UserContext);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleAlert = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };
  useEffect(() => {
    setFooterTransparency(true);
  }, []);

  const goToAddChannelPage = () => {
    navigate(`/guest-add-channel/${channelInfo.id}`);
    resetFooterContext();
    resetUsers();
  };

  const markerColors: { [key: number]: string } = {
    1: '#B4D033',
    2: '#22A751',
    3: '#2722A7',
    4: '#8F22A7',
    5: '#A73D22',
  };

  const convertGuestsToUsers = (guests: guestEntity[]): IUser[] => {
    // markerColors의 순서에 따라 guests를 정렬
    const sortedGuests = [...guests].sort((a, b) => {
      const colorA = a.marker_style?.color || '';
      const colorB = b.marker_style?.color || '';
      const indexA = Object.values(markerColors).indexOf(colorA);
      const indexB = Object.values(markerColors).indexOf(colorB);

      return indexA - indexB;
    });

    return sortedGuests.map((guest, index) => ({
      id: guest.id || `guest-${index}`,
      index: index + 1,
      name: guest.name || '',
      start_location: {
        title: guest.start_location?.title || '',
        lat: guest.start_location?.lat || 0,
        lng: guest.start_location?.lng || 0,
      },
      end_location: {
        title: guest.end_location?.title || '',
        lat: guest.end_location?.lat || 0,
        lng: guest.end_location?.lng || 0,
      },
      path:
        guest.path?.map(p => ({
          lat: p.lat || 0,
          lng: p.lng || 0,
        })) || [],
      marker_style: {
        color: guest.marker_style?.color || '',
      },
    }));
  };

  const users = convertGuestsToUsers(channelInfo.guests || []);

  return (
    <main className="flex h-full w-full flex-col items-start px-8 py-16">
      <Outlet />
      <InputBox
        placeholder="경로 이름을 입력해주세요. ex) 아들 집 가는 길"
        value={channelInfo.name}
        readOnly
      />
      <Divider />
      <section className="w-full space-y-4">
        {users.map(user => (
          <div key={user.id}>
            <RouteResultButton user={user} page={Page.UPDATE} showAlert={handleAlert} isGuest />
          </div>
        ))}
      </section>

      <section className="text-grayscale-400 my-4 mr-8 flex items-start justify-start gap-[2px] text-xs">
        <HiMiniInformationCircle className="h-4 w-4 text-black" />
        사용자 별로 url을 복사하여 공유할 수 있습니다.
      </section>
      <section className="flex w-full justify-end">
        <button
          type="button"
          onClick={goToAddChannelPage}
          className="bg-grayscale-25 border-gray-75 font-nomal mt-4 h-8 w-40 rounded border p-2 text-xs"
        >
          수정하기
        </button>
      </section>
      {showAlert && (
        <ToastAlert
          message={alertMessage}
          onClose={() => {
            setShowAlert(false);
          }}
        />
      )}
    </main>
  );
};
