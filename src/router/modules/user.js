import Layout from '@/layout'
export default {
  path: '/user',
  component: Layout,
  redirect: '/user/index',
  name: 'User',
  meta: { title: '人员管理', icon: 'renyuanguanli' },
  children: [
    {
      path: 'index',
      component: () => import('@/views/user/index'),
      meta: { title: '人员列表' }
    },
    {
      path: 'user-task-stats',
      name: 'User-task-stats',
      component: () => import('@/views/user/user-task-stats'),
      meta: { title: '人效统计' }
    },
    {
      path: 'user-work',
      name: 'User-work',
      component: () => import('@/views/user/user-work'),
      meta: { title: '工作量列表' }
    }
  ]
}
