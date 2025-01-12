import api from '../api/baseApi';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: '/user/all',
        method: 'GET',
      }),
    }),
    getDoctor: builder.query({
      query: () => ({
        url: '/user/doctors/all',
        method: 'GET',
      }),
      providesTags: ['Doctor'],
    }),
    createDoctor: builder.mutation({
      query: (data) => ({
        url: '/user/doctors',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Doctor'],
    }),
    getPharmacy: builder.query({
      query: () => ({
        url: 'user/pharmecy/all',
        method: 'GET',
      }),
      providesTags: ['Pharmacy'],
    }),
    createPharmacy: builder.mutation({
      query: (data) => ({
        url: 'user/pharmecy',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Pharmacy'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetDoctorQuery,
  useGetPharmacyQuery,
  useCreateDoctorMutation,
  useCreatePharmacyMutation,
} = userApi;
