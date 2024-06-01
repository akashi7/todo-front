import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getFromLocal } from '../../helpers/handleStorage'

const BASE_URL = 'https://todo-api-a64u.onrender.com/api/'

export const baseAPI = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers: Headers): Headers => {
      const localToken = getFromLocal<string>('token')

      if (localToken) {
        headers.set('authorization', `Bearer ${localToken}`)
      }
      return headers
    },
  }),
  tagTypes: ['Order', 'Farm'] as const,
  endpoints: () => ({}),
})
