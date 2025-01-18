import { useGetNotificationQuery } from '../../redux/apiSlices/notificationSlice';
import { useEffect, useState } from 'react';
import { connectSocket } from '../../utils/connectSocket';
import { getFromLocalStorage } from '../../utils/local-storage';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import moment from 'moment';

interface NotificationType {
  id: string;
  message: string;
  // Add other properties as needed
  title: string;
  description: string;
  createdAt: string;
}

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

const Notification = () => {
  const [notification, setNotification] = useState<NotificationType[]>([]);

  const token = getFromLocalStorage('authToken') || sessionStorage.getItem('authToken');

  // Check if token is not null before decoding
  if (token) {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    const { id } = decodedToken;

    const { data: getNotification, isFetching } = useGetNotificationQuery(id);
    const notificationData = getNotification?.data;

    useEffect(() => {
      if (notificationData) {
        setNotification(notificationData);
      }

      const socket = connectSocket();

      const handleNewNotification = (data: NotificationType) => {
        setNotification((prev) => [...prev, data]);
        // console.log(data);
      };

      socket.on(`NEW_NOTIFICATION::${id}`, handleNewNotification);

      return () => {
        socket.off(`NEW_NOTIFICATION::${id}`, handleNewNotification);
      };
    }, [id, notificationData]);

    if (isFetching) return <div>Loading...</div>;

    return (
      <div className="mt-5">
        <div className="bg-white p-5 rounded-xl">
          <div className="flex items-center justify-between my-4">
            <div>
              <h1 className="text-2xl font-semibold text-primary">Notification</h1>
            </div>
          </div>
          <div>
            {notification
              ?.slice()
              ?.reverse()
              ?.map((item: NotificationType, index: number) => {
                return (
                  <div key={index} className="w-full mx-auto p-4 my-4   min-h-20  shadow-md">
                    <div className=" text-sm">
                      <div className="flex items-center justify-between gap-5">
                        <p className="font-semibold text-[#555555]">{item?.title}</p>
                        <div className="flex justify-end items-center gap-5 text-[#A7A7A7]">
                          <span className="text-xs ">{moment(item?.createdAt).fromNow()}</span>
                          <span className="text-xs ">{moment(item?.createdAt).format('DD-MM-YYYY')}</span>
                        </div>
                      </div>

                      <div className="mt-2">
                        <p className="text-sm text-[#818181]">{item?.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  } else {
    console.error('No auth token found');
    return <div>No auth token found</div>;
  }
};

export default Notification;
