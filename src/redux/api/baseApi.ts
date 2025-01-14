import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getFromLocalStorage } from '../../utils/local-storage';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://10.0.70.127:8000/api/v1',
    prepareHeaders: (headers) => {
      const token = getFromLocalStorage('authToken');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    'user',
    'Doctor',
    'Pharmacy',
    'Discount',
    'About',
    'Question',
    'Shipping',
    'Article',
    'TermsAndConditions',
    'UserAgreement',
    'FAQ',
    'Admin',
    'ShippingDetails',
    'Review',
  ],
});

export const { reducer } = api;
export default api;
