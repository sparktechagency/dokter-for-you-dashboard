import api from '../api/baseApi';

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: '/user/all',
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetUserQuery } = userApi;
