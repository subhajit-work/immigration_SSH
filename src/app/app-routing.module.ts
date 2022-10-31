import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'crm/:action',
    loadChildren: () => import('./pages/crm/crm.module').then( m => m.CrmPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canLoad: [AuthGuard]
  },
  
  {
    path: 'news-details/:id',
    loadChildren: () => import('./pages/news-details/news-details.module').then( m => m.NewsDetailsPageModule)
  },
  {
    path: 'profile/:id',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'service/:action',
    loadChildren: () => import('./pages/service/service.module').then( m => m.ServicePageModule)
  },
  {
    path: 'event/:action',
    loadChildren: () => import('./pages/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'enrollment',
    loadChildren: () => import('./pages/enrollment/enrollment.module').then( m => m.EnrollmentPageModule)
  },
  {
    path: 'enrollmentform',
    loadChildren: () => import('./pages/enrollmentform/enrollmentform.module').then( m => m.EnrollmentformPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,})
    //  initialNavigation: 'enabledBlocking' 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
