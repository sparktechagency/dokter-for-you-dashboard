import api from '../api/baseApi';

const questionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionBySubCategory: builder.query({
      query: (id) => ({
        url: `/question?subCategory=${id}`,
        method: 'GET',
      }),
      providesTags: ['Question'],
    }),

    createQuestion: builder.mutation({
      query: ({ data }) => {
        // console.log('slice', data);
        return {
          url: '/question/create',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Question'],
    }),

    createBasicQuestion: builder.mutation({
      query: ({ data }) => {
        return {
          url: '/medical-question/create',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Question'],
    }),

    getBasicQuestionBySubCategory: builder.query({
      query: (id) => ({
        url: `/medical-question?subCategory=${id}`,
        method: 'GET',
      }),
      providesTags: ['Question'],
    }),

    updateBasicQuestion: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/medical-question/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Question'],
    }),

    deleteBasicQuestion: builder.mutation({
      query: (id) => ({
        url: `/medical-question/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Question'],
    }),

    updateQuestion: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/question/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Question'],
    }),

    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/question/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Question'],
    }),
  }),
});

export const {
  useGetQuestionBySubCategoryQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useCreateBasicQuestionMutation,
  useUpdateBasicQuestionMutation,
  useDeleteBasicQuestionMutation,
  useGetBasicQuestionBySubCategoryQuery,
} = questionsApi;
