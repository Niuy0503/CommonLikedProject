import Layout from '@/layout'
export default {
  path: '/node',
  component: Layout,
  redirect: '/node/region',
  name: 'Node',
  meta: { title: '点位管理', icon: 'dianweiguanli' },
  children: [
    {
      path: 'region',
      name: 'Region',
      component: () => import('@/views/areamanage/index'),
      meta: { title: '区域管理' }
    },
    {
      path: 'node',
      name: 'Node',
      component: () => import('@/views/levelmanage/index'),
      meta: { title: '点位管理' }
    },
    {
      path: 'partner',
      name: 'Partner',
      component: () => import('@/views/partnersmanage/index'),
      meta: { title: '合作商管理' }
    }
  ]
}
