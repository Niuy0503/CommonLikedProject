import Layout from '@/layout'

export default {
  path: '/indent',
  component: Layout,
  redirect: '/indent/index',
  children: [{
    path: 'indent',
    name: 'Indent',
    component: () => import('@/views/order/index'),
    meta: { title: '订单管理', icon: 'dingdanguanli' }
  }]
}
