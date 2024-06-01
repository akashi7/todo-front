import { jwtDecode } from 'jwt-decode'
import { getFromLocal, removeFromLocal } from './handleStorage'
import { Role } from './userType'

interface DecodedToken {
  role?: Role
  id?: string
  fullNames?: string
}

interface ErrorObject {
  status?: number
}

export const isTokenValid = (
  err?: ErrorObject
): { role?: Role; id?: string; fullNames?: string } => {
  const token = getFromLocal<string>('token')

  if (!token || (err && err.status === 401)) {
    handleInvalidToken()
    return { role: undefined, id: undefined, fullNames: undefined }
  } else {
    const decoded: DecodedToken = jwtDecode(token)
    return { role: decoded.role, id: decoded.id, fullNames: decoded.fullNames }
  }
}

const handleInvalidToken = () => {
  removeFromLocal('token')
  window.location.href = '/'
}
