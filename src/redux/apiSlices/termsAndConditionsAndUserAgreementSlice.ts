import api from '../api/baseApi';

const termsAndConditionsAndUserAgreementApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: '/info?name=Privecy And Policy',
        method: 'GET',
      }),
      providesTags: ['TermsAndConditions'],
    }),
    createTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: '/info/create?name=Privecy And Policy',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TermsAndConditions'],
    }),

    //user agreement
    getUserAgreement: builder.query({
      query: () => ({
        url: `/info?name=user-agreement`,
        method: 'GET',
      }),
      providesTags: ['UserAgreement'],
    }),
    createUserAgreement: builder.mutation({
      query: (data) => ({
        url: '/info/create?name=user-agreement',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['UserAgreement'],
    }),

    //faq api
    getAllFaq: builder.query({
      query: () => ({
        url: '/faq',
        method: 'GET',
      }),
      providesTags: ['FAQ'],
    }),

    createFaq: builder.mutation({
      query: ({ data }) => {
        console.log('slice', data);
        return {
          url: '/faq/create',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['FAQ'],
    }),

    updateFaq: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/faq/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['FAQ'],
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FAQ'],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useCreateTermsAndConditionsMutation,

  //user agreement
  useGetUserAgreementQuery,
  useCreateUserAgreementMutation,

  //faq
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = termsAndConditionsAndUserAgreementApi;
