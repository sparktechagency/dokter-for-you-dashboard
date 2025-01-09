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

    //article api
    getArticle: builder.query({
      query: () => ({
        url: '/article',
        method: 'GET',
      }),
      providesTags: ['Article'],
    }),
    createArticle: builder.mutation({
      query: (data) => ({
        url: '/article/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Article'],
    }),
    updateArticle: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/article/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Article'],
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/article/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useCreateAboutMutation,
  useUpdateAboutMutation,
  useDeleteAboutMutation,

  //article api
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = aboutAndArticleApi;
