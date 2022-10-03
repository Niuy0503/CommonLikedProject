import Layout from '@/layout'
export default {
  path: '/vm',
  component: Layout,
  redirect: '/vm/index',
  name: 'Vm',
  meta: { title: '设备管理', icon: 'shebeiguanli' },
  children: [
    {
      path: 'index',
      name: 'Index',
      component: () => import('@/views/vm/Equipment'),
      meta: { title: '设备管理' }
    },
    {
      path: 'status',
      name: 'Status',
      component: () => import('@/views/vm/Status'),
      meta: { title: '设备状态' }
    },
    {
      path: 'type',
      name: 'type',
      component: () => import('@/views/vm/Type'),
      meta: { title: '设备类型管理' }
    }
  ]
}
