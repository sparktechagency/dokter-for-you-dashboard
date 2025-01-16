import api from '../api/baseApi';

const patientServiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConsultations: builder.query({
      query: () => ({
        url: '/consultation/all',
        method: 'GET',
      }),
      providesTags: ['consultation'],
    }),
    getConsultationById: builder.query({
      query: (id) => ({
        url: `/consultation/${id}`,
        method: 'GET',
      }),
      providesTags: ['consultation'],
    }),
    updateConsultation: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/consultation/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['consultation'],
    }),
  }),
});

export const { useGetConsultationsQuery, useGetConsultationByIdQuery, useUpdateConsultationMutation } =
  patientServiceApi;
