import api from '../api/baseApi';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: '/user/all',
        method: 'GET',
      }),
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: 'notification/send/USER',
        method: 'POST',
        body: data,
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
    deleteDoctor: builder.mutation({
      query: (id) => ({
        url: `user/doctors/${id}`,
        method: 'DELETE',
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
    deletePharmacy: builder.mutation({
      query: (id) => ({
        url: `/user/pharmecy/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Pharmacy'],
    }),
    getAllAdmin: builder.query({
      query: () => ({
        url: '/user/admins/all',
        method: 'GET',
      }),
      providesTags: ['Admin'],
    }),
    createAdmin: builder.mutation({
      query: (data) => ({
        url: '/user/admins',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Admin'],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/user/admins/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useSendMessageMutation,
  useGetDoctorQuery,
  useGetPharmacyQuery,
  useCreateDoctorMutation,
  useCreatePharmacyMutation,
  useDeleteDoctorMutation,
  useDeletePharmacyMutation,
  useGetAllAdminQuery,
  useCreateAdminMutation,
  useDeleteAdminMutation,
} = userApi;
