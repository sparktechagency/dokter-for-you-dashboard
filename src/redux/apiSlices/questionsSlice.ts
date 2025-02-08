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
} = questionsApi;
