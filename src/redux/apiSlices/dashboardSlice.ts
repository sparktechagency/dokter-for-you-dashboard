import api from '../api/baseApi';

const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralStates: builder.query({
      query: () => ({
        url: 'user/admins/status',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    getEarningStates: builder.query({
      query: (year) => ({
        url: `/user/admins/earning/status?year=${year}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    getUserStatistics: builder.query({
      query: (year) => ({
        url: `/user/admins/users/status?year=${year}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    getWorkloadStates: builder.query({
      query: (year) => ({
        url: `/user/admins/workload/status?year=${year}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),

    //doctor dashboard
    getDoctorGeneralStates: builder.query({
      query: () => ({
        url: '/user/doctors/status',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    getWorkActivityStates: builder.query({
      query: (year) => ({
        url: `/user/doctors/activity/status?year=${year}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    getDoctorEarningStates: builder.query({
      query: (year) => ({
        url: `/user/doctors/earning/status?year=${year}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
  }),
});

export const {
  useGetGeneralStatesQuery,
  useGetEarningStatesQuery,
  useGetUserStatisticsQuery,
  useGetWorkloadStatesQuery,

  //doctor dashboard
  useGetDoctorGeneralStatesQuery,
  useGetWorkActivityStatesQuery,
  useGetDoctorEarningStatesQuery,
} = dashboardApi;
