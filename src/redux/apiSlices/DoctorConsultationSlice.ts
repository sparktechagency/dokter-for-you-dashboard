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

    rejectConsultation: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/consultation/reject/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useGetDoctorConsultationsQuery, useGetDoctorConsultationByIdQuery, useRejectConsultationMutation } =
  doctorPatientServiceApi;
