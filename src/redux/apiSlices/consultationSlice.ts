import api from '../api/baseApi';

const consultationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //category
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

    //subCategory
    getConsultationSubcategory: builder.query({
      query: () => ({
        url: '/subcategory',
        method: 'GET',
      }),
    }),
    getConsultationSubcategoryById: builder.query({
      query: (id) => ({
        url: `/subcategory/${id}`,
        method: 'GET',
      }),
    }),
    createConsultationSubcategory: builder.mutation({
      query: (data) => ({
        url: '/subcategory/create',
        method: 'POST',
        body: data,
      }),
    }),
    editConsultationSubcategory: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/subcategory/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteConsultationSubcategory: builder.mutation({
      query: (id) => ({
        url: `/subcategory/${id}`,
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

  //subCategory
  useGetConsultationSubcategoryQuery,
  useGetConsultationSubcategoryByIdQuery,
  useCreateConsultationSubcategoryMutation,
  useEditConsultationSubcategoryMutation,
  useDeleteConsultationSubcategoryMutation,
} = consultationApi;
