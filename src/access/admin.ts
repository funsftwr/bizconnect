import { Access } from 'payload'

export const admin: Access = ({ req: { user } }) => {
  if (user && user.role === 'admin') {
    return true
  }

  return false
}
