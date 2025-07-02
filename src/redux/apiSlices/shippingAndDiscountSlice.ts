import api from '../api/baseApi';

const shippingAndDiscountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getShippingDetails: builder.query({
      query: () => ({
        url: '/shipping',
        method: 'GET',
      }),
      providesTags: ['ShippingDetails'],
    }),
    createShippingDetails: builder.mutation({
      query: (data) => ({
        url: '/shipping',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ShippingDetails'],
    }),
    updateShippingDetails: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/shipping/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['ShippingDetails'],
    }),
    deleteShippingDetails: builder.mutation({
      query: (id) => ({
        url: `/shipping/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ShippingDetails'],
    }),

    //discount api
    getDiscount: builder.query({
      query: () => ({
        url: '/discount',
        method: 'GET',
      }),
      providesTags: ['Discount'],
    }),
    createDiscount: builder.mutation({
      query: (data) => ({
        url: '/discount/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Discount'],
    }),
    updateDiscount: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/discount/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Discount'],
    }),
    deleteDiscount: builder.mutation({
      query: (id) => ({
        url: `/discount/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Discount'],
    }),

    //review api
    getReview: builder.query({
      query: () => ({
        url: '/review',
        method: 'GET',
      }),
      providesTags: ['Review'],
    }),
    updateReview: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/review/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Review'],
    }),
  }),
});

export const {
  useGetShippingDetailsQuery,
  useCreateShippingDetailsMutation,
  useUpdateShippingDetailsMutation,
  useDeleteShippingDetailsMutation,

  //discount
  useGetDiscountQuery,
  useCreateDiscountMutation,
  useUpdateDiscountMutation,
  useDeleteDiscountMutation,

  //review
  useGetReviewQuery,
  useUpdateReviewMutation,
} = shippingAndDiscountApi;
