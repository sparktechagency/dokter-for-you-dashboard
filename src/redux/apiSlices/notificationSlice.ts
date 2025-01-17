import api from '../api/baseApi';

const notificationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => ({
        url: '/notification',
        method: 'GET',
      }),
      providesTags: ['Notification'],
    }),
  }),
});

export const { useGetNotificationQuery } = notificationApi;
