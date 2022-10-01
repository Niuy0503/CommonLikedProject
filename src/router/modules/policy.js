import Layout from '@/layout'

export default {
  path: '/policy',
  component: Layout,
  redirect: '/policy/index',
  children: [{
    path: 'policy',
    name: 'Policy',
    component: () => import('@/views/policy/index'),
    meta: { title: '策略管理', icon: 'celueguanli' }
  }]
}
