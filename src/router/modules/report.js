import Layout from '@/layout'
export default {
  path: '/report',
  component: Layout,
  redirect: '/report/index',
  children: [{
    path: 'report',
    name: 'Report',
    component: () => import('@/views/report/index'),
    meta: { title: '对账统计', icon: 'duizhangtongji' }
  }]
}
