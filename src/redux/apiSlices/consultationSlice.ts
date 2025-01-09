import api from '../api/baseApi';

const consultationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getConsultationCategory: builder.query({
      query: () => ({
        url: '/category',
        method: 'GET',
      }),
    }),
    getConsultationCategoryById: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'GET',
      }),
    }),
    createConsultationCategory: builder.mutation({
      query: (data) => ({
        url: '/category/create',
        method: 'POST',
        body: data,
      }),
    }),
    editConsultationCategory: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/category/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteConsultationCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetConsultationCategoryQuery,
  useGetConsultationCategoryByIdQuery,
  useCreateConsultationCategoryMutation,
  useEditConsultationCategoryMutation,
  useDeleteConsultationCategoryMutation,
} = consultationApi;
