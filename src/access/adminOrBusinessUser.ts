import { Access } from 'payload'
import { admin } from './admin'

export const adminOrBusinessUser: Access = async ({ req, data }) => {
  if (admin({ req, data })) {
    return true
  }

  const user = req.user
  const businessId = data?.business
  if (!user) return false

  return (
    businessId &&
    user.business &&
    (typeof user.business === 'number'
      ? user.business === businessId
      : user.business.id === businessId)
  )
}
