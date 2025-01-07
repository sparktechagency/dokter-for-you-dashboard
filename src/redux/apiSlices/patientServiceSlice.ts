import api from '../api/baseApi';

const patientServiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConsultations: builder.query({
      query: () => ({
        url: '/consultation/all',
        method: 'GET',
      }),
    }),
    getConsultationById: builder.query({
      query: (id) => ({
        url: `/consultation/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetConsultationsQuery, useGetConsultationByIdQuery } = patientServiceApi;
