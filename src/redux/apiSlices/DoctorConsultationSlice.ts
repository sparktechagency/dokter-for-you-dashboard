import api from '../api/baseApi';

const doctorPatientServiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorConsultations: builder.query({
      query: (id) => {
        console.log('slice', id);
        return {
          url: `/consultation/all?doctorId=${id}`,
          method: 'GET',
        };
      },
    }),
    getDoctorConsultationById: builder.query({
      query: (id) => ({
        url: `/consultation/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetDoctorConsultationsQuery, useGetDoctorConsultationByIdQuery } = doctorPatientServiceApi;
