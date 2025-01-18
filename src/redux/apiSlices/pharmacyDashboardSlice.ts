import api from '../api/baseApi';

const pharmacyDashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPharmacyDashboardStates: builder.query({
      query: () => ({
        url: '/user/pharmecy/status',
        method: 'GET',
      }),
    }),
    getPharmacyWorkLoad: builder.query({
      query: (year: number) => ({
        url: `/user/pharmecy/workload?year=${year}`,
        method: 'GET',
      }),
    }),
    getPharmacyTotalEarning: builder.query({
      query: (year: number) => ({
        url: `/user/pharmecy/workload/earnings?year=${year}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetPharmacyDashboardStatesQuery, useGetPharmacyWorkLoadQuery, useGetPharmacyTotalEarningQuery } =
  pharmacyDashboardApi;
