import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { HomeDetail } from './home-detail/home-detail';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'home',
    component: Home,
    title: 'Home page',
  },
  {
    path: 'home/:id',
    component: HomeDetail,
    title: 'Home page',
  },
  {
    path: 'about',
    component: About,
    title: 'Home page',
  },
  // {
  //   path: 'details/:id',
  //   component: Details,
  //   title: 'Home details',
  // },
];
