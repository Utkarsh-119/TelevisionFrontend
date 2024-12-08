import { Routes } from '@angular/router';
import { AdminComponent } from './Components/admin/admin.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { ContentProducerComponent } from './Components/content-producer/content-producer.component';
import { AddShowsComponent } from './Components/add-shows/add-shows.component';
import { ManageShowsComponent } from './Components/manage-shows/manage-shows.component';
import { ManageScheduleComponent } from './Components/manage-schedule/manage-schedule.component';
import { ManageAdvertismentComponent } from './Components/manage-advertisment/manage-advertisment.component';
import { AddMediaComponent } from './Components/add-media/add-media.component';
import { ManageMediaComponent } from './Components/manage-media/manage-media.component';
import { ManageFeedbackComponent } from './Components/manage-feedback/manage-feedback.component';
import { AddAdvertisementComponent } from './Components/add-advertisement/add-advertisement.component';
import { AddvertisorComponent } from './Components/addvertisor/addvertisor.component';
import { ChannelManagerComponent } from './Components/channel-manager/channel-manager.component';
import { ReporterComponent } from './Components/reporter/reporter.component';
import { ReporterDashboardComponent } from './Components/reporter-dashboard/reporter-dashboard.component';
import { DirectorComponent } from './Components/director/director.component';
import { TalentComponent } from './Components/talent/talent.component';
import { authGuard } from './Guards/auth.guard';

export const routes: Routes = [
    {
        path:"Admin",
        component:AdminComponent,
        canActivate: [authGuard]
    },
    {
        path:"",
        component:LoginComponent
    
    },
    {
        path:"Channel_manager",
        component:ContentProducerComponent,
        canActivate: [authGuard],
        children:[
            {
                path:"AddShows",
                component:AddShowsComponent
            },
            {
                path:"ManageShows",
                component:ManageShowsComponent
            },
            {
                path:"Schedule",
                component:ManageScheduleComponent
            },
            {
                path:"ManageAds",
                component:ManageAdvertismentComponent
            },
            
            {
                path:"AddAds",
                component:AddAdvertisementComponent
            }
        ]
    },
    {
        path:"Advertiser",
        
        component:AddvertisorComponent,
        canActivate: [authGuard],
        children:[
            {
                path:"AddAds",
                component:AddAdvertisementComponent
            }
            
        ]
    },
    {
        path:"Content_Producer",
        component:ChannelManagerComponent,
        canActivate: [authGuard],
        children:[
            {
                path:"AddMedia",
                component:AddMediaComponent
            },
            {
                path:"ManageMedia",
                component:ManageMediaComponent
            }
        ]
    },
    {
        path:"Reporter",
        component:ReporterComponent,
        canActivate: [authGuard],
        children:[
            {
                path:"Feedback",
                component:ManageFeedbackComponent
            },

            {
                path:"Dashboard",
                component:ReporterDashboardComponent
            }
        ]
    },
    {
        path:"Director",
        component:DirectorComponent,
        canActivate: [authGuard],
        children:[{
            path:"Talents",
            component:TalentComponent
        }]
    }
    
];
