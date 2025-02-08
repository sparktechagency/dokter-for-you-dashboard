import api from '../api/baseApi';

const doctorPatientServiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDoctorConsultations: builder.query({
      query: (id) => {
        // console.log('slice', id);
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
      providesTags: ['consultation'],
    }),

    rejectConsultation: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/consultation/reject/${id}`,
        method: 'POST',
        body: data,
      }),
    }),

    updateConsultationStatus: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/consultation/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['consultation'],
    }),

    setScheduleVideoCall: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `consultation/schedule/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    setUpVideoCallLink: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `consultation/link/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['consultation'],
    }),

    //doctor earnings

    getDoctorEarningsStates: builder.query({
      query: () => ({
        url: `/user/doctors/earnings`,
        method: 'GET',
      }),
    }),
    withdrawMoney: builder.mutation({
      query: () => ({
        url: `consultation/withdraw`,
        method: 'POST',
      }),
    }),
    doctorEarningHistory: builder.query({
      query: () => ({
        url: `/user/doctors/earning-history`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetDoctorConsultationsQuery,
  useGetDoctorConsultationByIdQuery,
  useRejectConsultationMutation,
  useSetScheduleVideoCallMutation,
  useSetUpVideoCallLinkMutation,

  //doctor earnings
  useGetDoctorEarningsStatesQuery,
  useWithdrawMoneyMutation,
  useUpdateConsultationStatusMutation,
  useDoctorEarningHistoryQuery,
} = doctorPatientServiceApi;
