import Layout from '@/layout'
export default {
  path: '/vm',
  component: Layout,
  redirect: '/vm/index',
  name: 'Vm',
  meta: { title: '设备管理', icon: 'shebeiguanli' },
  children: [
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/views/vm/index.vue'),
      meta: { title: '设备管理' }
    },
    {
      path: '/status',
      name: 'Status',
      component: () => import('@/views/vm/status.vue'),
      meta: { title: '设备状态' }
    },
    {
      path: '/partner',
      name: 'Partner',
      component: () => import('@/views/vm/type.vue'),
      meta: { title: '设备类型管理' }
    }
  ]
}
