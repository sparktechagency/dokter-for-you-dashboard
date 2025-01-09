import api from '../api/baseApi';

const aboutAndArticleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query({
      query: () => ({
        url: '/about',
        method: 'GET',
      }),
      providesTags: ['About'],
    }),
    createAbout: builder.mutation({
      query: (data) => ({
        url: `about/create`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['About'],
    }),
    updateAbout: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/about/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['About'],
    }),
    deleteAbout: builder.mutation({
      query: (id) => ({
        url: `/about/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['About'],
    }),
  }),
});

export const { useGetAboutQuery, useCreateAboutMutation, useUpdateAboutMutation, useDeleteAboutMutation } =
  aboutAndArticleApi;
