import Layout from '@/layout'

export default {
  path: '/sku',
  component: Layout,
  redirect: '/sku/sku-class',
  name: 'Sku',
  meta: { title: '商品管理', icon: 'shangpinguanli' },
  children: [
    {
      path: 'sku-class',
      name: 'Sku-class',
      component: () => import('@/views/sku/sku-class'),
      meta: { title: '商品类型' }
    },
    {
      path: 'sku',
      name: 'Sku',
      component: () => import('@/views/sku/sku'),
      meta: { title: '商品管理' }
    }
  ]
}
