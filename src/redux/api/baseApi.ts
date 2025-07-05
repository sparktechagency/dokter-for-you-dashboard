import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getFromLocalStorage, getSessionStorage } from '../../utils/local-storage';

const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.dokterforyou.com/api/v1',
    // baseUrl: 'http://10.0.70.30:5002/api/v1',
    // baseUrl: 'http://152.42.140.58:5002/api/v1',
    // baseUrl: 'http://10.0.70.208:5002/api/v1',
    // baseUrl: 'http://152.42.140.58:5000/api/v1',
    // baseUrl: 'http://139.59.0.25:5002/api/v1',
    // baseUrl: 'https://tamim.binarybards.online/api/v1',
    prepareHeaders: (headers) => {
      const token = getFromLocalStorage('authToken') || getSessionStorage('authToken');

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
    'AffiliatedDoctor',
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
    'consultation',
    'Notification',
  ],
});

export const { reducer } = api;
export default api;
