import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/DocumenCreate.vue') },
      { path: 'documents', component: () => import('pages/DocumentList.vue') },
      { path: 'documents/:id', component: () => import('pages/Document.vue') },
      { path: 'requests', component: () => import('pages/RequestList.vue') },
      { path: 'activity', component: () => import('pages/Activity.vue') },
      {
        path: 'activity_chart',
        component: () => import('pages/ActivityChart.vue'),
      },
      {
        path: 'profile',
        component: () => import('pages/MyProfile.vue'),
      },
      {
        path: 'profile/:id',
        component: () => import('pages/Profile.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue'),
  },
  {
    path: '/signup',
    component: () => import('pages/SignUp.vue'),
  },
  {
    path: '/validate_otp',
    component: () => import('pages/ValidateOtp.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
