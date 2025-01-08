import api from '../api/baseApi';

const medicineApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMedicine: builder.query({
      query: () => ({
        url: '/medicine',
        method: 'GET',
      }),
    }),
    getMedicineById: builder.query({
      query: (id) => ({
        url: `/medicine/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetMedicineQuery, useGetMedicineByIdQuery } = medicineApi;
