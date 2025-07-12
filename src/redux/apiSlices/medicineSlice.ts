import api from '../api/baseApi';

const medicineApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMedicine: builder.query({
      query: () => ({
        url: '/medicine?limit=1000',
        method: 'GET',
      }),
    }),

    createMedicine: builder.mutation({
      query: (data) => ({
        url: '/medicine/create',
        method: 'POST',
        body: data,
      }),
    }),
    getMedicineById: builder.query({
      query: (id) => ({
        url: `/medicine/${id}`,
        method: 'GET',
      }),
    }),
    updateMedicine: builder.mutation({
      query: ({ data, id }: { data: any; id: any }) => ({
        url: `/medicine/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),
    deleteMedicine: builder.mutation({
      query: (id) => ({
        url: `medicine/${id}`,
        method: 'DELETE',
      }),
    }),

    // getMedicineBySubCategory
    getMedicineBySubCategory: builder.query({
      query: (id) => ({
        url: `medicine?subCategory=${id}`,
        method: 'GET',
      }),
    }),
    makePrescription: builder.mutation({
      query: ({ data, id }) => ({
        url: `/consultation/prescribe/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    // medication trade

    getMedicationTradeData: builder.query({
      query: () => ({
        url: '/order/',
        method: 'GET',
      }),
    }),

    uploadExcel: builder.mutation({
      query: (data) => ({
        url: 'order/import',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMedicineQuery,
  useCreateMedicineMutation,
  useGetMedicineByIdQuery,
  useUpdateMedicineMutation,
  useDeleteMedicineMutation,
  useGetMedicineBySubCategoryQuery,
  useMakePrescriptionMutation,

  //get medication trade
  useGetMedicationTradeDataQuery,
  useUploadExcelMutation,
} = medicineApi;
