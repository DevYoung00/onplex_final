/* v0.8 수정내용: 스페셜관 route 추가 */
/* v0.9 수정내용: 마이페이지 route 추가 */

import Vue from 'vue';
import VueRouter from 'vue-router';
import MovieList from '@/views/movies/MovieList.vue';
import Login from '@/views/accounts/Login.vue';
import Signup from '@/views/accounts/Signup.vue';
import Home from '@/views/Home.vue';
import Nonmember from '@/views/accounts/Nonmember.vue';
import NonmemberCheck from '@/views/accounts/NonmemberCheck.vue';
import SpecialHall from '@/views/theater_info/specialhall.vue';
import EventPage from '@/views/events/EventPage.vue';
import MyPage from '@/views/member_info/MyPage.vue';
import Ticketing from '@/views/ticketing/ticketingPage.vue';
import Theater from '@/views/theater_info/theater.vue';
import Dailycheck from '@/views/staff/daily_check.vue';
import join from '@/views/staff/join.vue';
import pay from '@/views/ticketing/pay.vue';
import staffLogin from '@/views/staff/staffLogin.vue';
import inventory from '@/views/staff/inventory.vue';
import facility from '@/views/staff/facility.vue';
import store from '@/views/staff/staffStore.vue';
import MovieReview from '@/views/movies/MovieReview.vue';
import selectSeat from '@/views/ticketing/selectSeat.vue';
import staffMypage from '@/views/staff/staffMypage.vue';
import staffRecommend from '@/views/staff/staffRecommend.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/accounts/signup/',
    name: 'Signup',
    component: Signup,
  },

  {
    path: '/accounts/login/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/accounts/Nonmember/',
    name: 'Nonmember',
    component: Nonmember,
  },
  {
    path: '/accounts/NonmemberCheck/',
    name: 'NonmemberCheck',
    component: NonmemberCheck,
  },
  {
    path: '/movies/MovieList/',
    name: 'MovieList',
    component: MovieList,
  },
  {
    path: '/theater_info/SpecialHall/',
    name: 'SpecialHall',
    component: SpecialHall,
  },
  {
    path: '/events/EventPage/',
    name: 'EventPage',
    component: EventPage,
  },
  {
    path: '/member_info/MyPage/',
    name: 'MyPage',
    component: MyPage,
  },
  {
    path: '/ticketing/ticketingaPage/',
    name: 'Ticketing',
    component: Ticketing,
  },
  {
    path: '/theater_info/theater/',
    name: 'Theater',
    component: Theater,
  },
  {
    path: '/staff/daily_check/',
    name: 'Dailycheck',
    component: Dailycheck,
  },
  {
    path: '/staff/join',
    name: 'join',
    component: join,
  },
  {
    path: '/ticketing/pay',
    name: 'pay',
    component: pay,
  },
  {
    path: '/staff/staffLogin',
    name: 'staffLogin',
    component: staffLogin,
  },
  {
    path: '/staff/inventory',
    name: 'inventory',
    component: inventory,
  },
  {
    path: '/staff/facility',
    name: 'facility',
    component: facility,
  },
  {
    path: '/staff/store',
    name: 'store',
    component: store,
  },
  {
    path: '/movies/movieReview',
    name: 'MovieReview',
    component: MovieReview,
  },
  {
    path: '/ticketing/selectSeat',
    name: 'selectSeat',
    component: selectSeat,
  },
  {
    path: '/staff/mypage',
    name: 'staffMypage',
    component: staffMypage,
  },
  {
    path: '/staff/recommend',
    name: 'staffRecommend',
    component: staffRecommend,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
