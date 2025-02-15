import { createRouter, createWebHistory } from 'vue-router'
import TopPage from '@/views/index.vue'
import Article from '@/views/article.vue'
import Events from '@/views/events.vue'
import Money from '@/views/money.vue'
import Equips from '@/views/equips.vue'
import Mypage from '@/views/mypage.vue'
import Admin from '@/views/admin.vue'
import Notfound from '@/views/notfound.vue'

import MemberList from '@/components/admin/MemberList.vue'
import Others from '@/components/admin/Others.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: TopPage
    },
    {
      path: '/article',
      component: Article
    },
    {
      path: '/events',
      component: Events
    },
    {
      path: '/money',
      component: Money
    },
    {
      path: '/equips',
      component: Equips
    },
    {
      path: '/mypage',
      component: Mypage
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: 'members',
          component: MemberList
        },
        {
          path: 'dashboard',
          component: Notfound
        },
        {
          path: 'fee',
          component: Notfound
        },
        {
          path: 'magazine',
          component: Notfound
        },
        {
          path: 'shop',
          component: Notfound
        },
        {
          path: 'others',
          component: Others
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: Notfound
    }
  ]
})

export default router
