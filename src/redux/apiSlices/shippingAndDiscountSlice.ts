import api from '../api/baseApi';

const shippingAndDiscountApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getShippingDetails: builder.query({
      query: () => ({
        url: '/shippingdetails',
        method: 'GET',
      }),
    }),
    createShippingDetails: builder.mutation({
      query: (data) => ({
        url: '/shippingdetails/create',
        method: 'POST',
        body: data,
      }),
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
  }),
});

export const {
  useGetShippingDetailsQuery,
  useCreateShippingDetailsMutation,

  //discount
  useGetDiscountQuery,
  useCreateDiscountMutation,
  useUpdateDiscountMutation,
  useDeleteDiscountMutation,
} = shippingAndDiscountApi;
