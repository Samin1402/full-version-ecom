import { lazy } from 'react'

const Customer = [
  // Dashboards
  {
    path: '/main-dashboard',
    component: lazy(() => import('../../views/pages/fm-main-dashboard')),
    meta: {
      subject: "dashboard",
      action: 'read',
      resource: 'ACL'
    }
  },
  {
    path: '/live',
    component: lazy(() => import('../../views/pages/live')),
    meta: {
      subject: "live",
      action: 'read',
      resource: 'ACL'
    }
  }

]

export default Customer
