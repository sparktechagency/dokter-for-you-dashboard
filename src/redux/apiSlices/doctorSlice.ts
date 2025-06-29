import api from '../api/baseApi';

const doctorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAffiliatedDoctor: builder.query({
      query: () => ({
        url: '/europe/affiliated-doctor',
        method: 'GET',
      }),
      providesTags: ['AffiliatedDoctor'],
    }),

    addAffiliatedDoctor: builder.mutation({
      query: ({ data }: { data: any }) => ({
        url: '/europe/affiliated-doctor',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AffiliatedDoctor'],
    }),

    updateAffiliatedDoctor: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/europe/affiliated-doctor/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['AffiliatedDoctor'],
    }),

    updateStatus: builder.mutation({
      query: ({ id, data }: { id: string; data: { active: boolean } }) => ({
        url: `/europe/affiliated-doctor/status/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['AffiliatedDoctor'],
    }),

    deleteAffiliatedDoctor: builder.mutation({
      query: (id: string) => ({
        url: `/europe/affiliated-doctor/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AffiliatedDoctor'],
    }),
  }),
});

export const {
  useGetAffiliatedDoctorQuery,
  useDeleteAffiliatedDoctorMutation,
  useUpdateStatusMutation,
  useAddAffiliatedDoctorMutation,
  useUpdateAffiliatedDoctorMutation,
} = doctorApi;
