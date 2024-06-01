export type Role = 'ADMIN' | 'USER'

export interface RoleFlags {
  isAdmin: boolean
  isFarmer: boolean
}

export default (role: Role): RoleFlags => ({
  isAdmin: role === 'ADMIN',
  isFarmer: role === 'USER',
})
