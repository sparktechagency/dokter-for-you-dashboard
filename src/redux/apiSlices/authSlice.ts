import { getFromLocalStorage } from '../../utils/local-storage';
import api from '../api/baseApi';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    otpVerify: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-email',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response,
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forget-password',
        method: 'POST',
        body: data,
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ data }) => {
        console.log('authSlice', data);
        const token = getFromLocalStorage('oneTimeCodeToken');
        console.log(`Using token for reset password: ${token}`);

        return {
          url: '/auth/reset-password',
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` || undefined,
          },
        };
      },
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/auth/update-profile',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: '/admin/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),
    profile: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
      providesTags: ['user'],
      transformResponse: ({ user }) => user,
    }),
    fetchAdminProfile: builder.query({
      query: () => ({
        url: '/admin/profile',
        method: 'GET',
      }),
    }),
    fetchAllAdmins: builder.query({
      query: () => ({
        url: 'admin',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    deleteAdminProfile: builder.mutation({
      query: (id) => ({
        url: `admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],
    }),
    addAdminProfile: builder.mutation({
      query: (data) => ({
        url: '/admin',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),

    getCurrentAdmin: builder.query({
      query: (id) => ({
        url: `/user/admins/${id}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),
    updateUserProfile: builder.mutation({
      query: ({ data }) => ({
        url: '/user',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['user'],
    }),

    getCurrentUserProfile: builder.query({
      query: () => ({
        url: '/user/profile',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),

    lockUnlockUser: builder.mutation({
      query: (id) => {
        console.log('slice', id);
        return {
          url: `user/lock/${id}`,
          method: 'PATCH',
        };
      },
    }),
  }),
});

export const {
  useOtpVerifyMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useProfileQuery,
  useUpdateAdminProfileMutation,
  useFetchAdminProfileQuery,
  useFetchAllAdminsQuery,
  useDeleteAdminProfileMutation,

  useAddAdminProfileMutation,
  useGetCurrentAdminQuery,
  useUpdateUserProfileMutation,
  useGetCurrentUserProfileQuery,
  useLockUnlockUserMutation,
} = authApi;
