import Layout from '@/layout'

export default {
  path: '/order',
  component: Layout,
  redirect: '/order/repairorder',
  name: 'Order',
  meta: { title: '工单管理', icon: 'gongdanguanli' },
  children: [
    {
      path: 'repairorder',
      name: 'Repairorder',
      component: () => import('@/views/repairorder/index.vue'),
      meta: { title: '运营工单' }
    },
    {
      path: 'workorder',
      name: 'Workorder',
      component: () => import('@/views/workorder/index.vue'),
      meta: { title: '运维工单' }
    }
  ]
}
