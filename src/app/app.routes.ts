import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { HomeDetail } from './home-detail/home-detail';
import { AddHomeLocation } from './add-home-location/add-home-location';
import { formGuardGuard } from './guard/form-guard-guard';

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
    children: [
      {
        path: 'add',
        component: AddHomeLocation,
        title: 'Add Home',
        canDeactivate: [formGuardGuard],
      },
      {
        path: 'edit/:id',
        component: AddHomeLocation,
        title: 'Edit Home',
        canDeactivate: [formGuardGuard],
      },
    ],
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
