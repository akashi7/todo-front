import { EStatus } from '../../../config/constant'
import { baseAPI } from '../api'

export interface PaginationDTO {
  page?: string
  size?: string
}

export interface GetOrderDTO extends PaginationDTO {
  userId?: string
}

export interface ApiResponse<T> {
  message: string
  data: T
}

export interface Farm {
  id: string
  createdAt: string
  farmName: string
  province: string
  sector: string
  landSize: string
  userId: string
}

export interface PaginatedResponse<T> {
  currentPage: number
  itemCount: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
  items: Array<T>
}

export type FarmsResponse = ApiResponse<PaginatedResponse<Farm>>

export interface Order {
  id: string
  createdAt: string
  userId: string
  fertilizerQuantity: number
  seedQuantity: number
  status: EStatus
  farmId: string
  fertilizerName: string
  seedName: string
  farm: Farm
}

export type OrdersResponse = ApiResponse<PaginatedResponse<Order>>

export interface addFarmDTO extends Omit<Farm, 'id' | 'createdAt' | 'userId'> {}

export interface makeOrderDTO {
  farmIds: Array<string>
  fertilizerName: string
  seedName: string
}

export interface approveOrderDTO {
  orderId: string
}

const userEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getFarms: builder.query<FarmsResponse, PaginationDTO>({
      providesTags: ['Farm'],
      query: ({ page, size }) => ({
        url: `farm/get-farm?page=${page || ''}&size=${size || ''}`,
        method: 'GET',
      }),
    }),

    addFarm: builder.mutation<unknown, addFarmDTO>({
      invalidatesTags: ['Farm'],
      query: (DTO) => ({
        url: `farm/create-farm`,
        method: 'POST',
        body: DTO,
      }),
    }),

    getOrders: builder.query<OrdersResponse, GetOrderDTO>({
      providesTags: ['Order'],
      query: ({ page = '', size = '', userId }) => ({
        url: `order/list-orders${
          userId ? `/${userId}` : ''
        }?page=${page}&size=${size}`,
        method: 'GET',
      }),
    }),

    makOrder: builder.mutation<unknown, makeOrderDTO>({
      invalidatesTags: ['Order'],
      query: (DTO) => ({
        url: `order/make-order`,
        method: 'POST',
        body: DTO,
      }),
    }),

    approveOrder: builder.mutation<unknown, approveOrderDTO>({
      invalidatesTags: ['Order'],
      query: ({ orderId }) => ({
        url: `order/approve-order/${orderId}`,
        method: 'PUT',
      }),
    }),
    declineOrder: builder.mutation<unknown, approveOrderDTO>({
      invalidatesTags: ['Order'],
      query: ({ orderId }) => ({
        url: `order/reject-order/${orderId}`,
        method: 'PUT',
      }),
    }),
  }),
})

export const {
  useAddFarmMutation,
  useGetFarmsQuery,
  useGetOrdersQuery,
  useMakOrderMutation,
  useApproveOrderMutation,
  useDeclineOrderMutation,
} = userEndpoints
