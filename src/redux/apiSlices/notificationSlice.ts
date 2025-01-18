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
    updateNotification: builder.mutation({
      query: () => ({
        url: `/notification/read`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
});

export const { useGetNotificationQuery, useUpdateNotificationMutation } = notificationApi;
