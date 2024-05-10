import { createRouter, createWebHistory } from 'vue-router'
import TopPage from '@/views/index.vue'
import Article from '@/views/article.vue'
import Events from '@/views/events.vue'
import Money from '@/views/money.vue'
import Equips from '@/views/equips.vue'
import Mypage from '@/views/mypage.vue'
import Admin from '@/views/admin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TopPage
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/events',
      name: 'events',
      component: Events
    },
    {
      path: '/money',
      name: 'money',
      component: Money
    },
    {
      path: '/equips',
      name: 'equips',
      component: Equips
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: Mypage
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})

export default router
