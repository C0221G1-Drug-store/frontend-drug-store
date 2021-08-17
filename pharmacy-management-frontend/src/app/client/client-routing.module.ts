import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CartComponent} from './cart/cart.component';
import {DrugDetailsComponent} from './drug-details/drug-details.component';
import {HomepageComponent} from './homepage/homepage.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {GroupComponent} from './group/group.component';
import {ChatRoomComponent} from './inbox/chat-room/chat-room.component';
import {SignupComponent} from './inbox/signup/signup.component';
import {InboxBoxComponent} from './inbox/inbox-box/inbox-box.component';
import {ManageChatRoomComponent} from './adminInbox/manage-chat-room/manage-chat-room.component';


const routes: Routes = [
  {path: '',
    component: HomepageComponent,
    children:[
      {
        path:'',
        component:SignupComponent,
        outlet:'inbox'
      },
      {
        path:'inbox',
        component:ChatRoomComponent,
        outlet:'inbox'
      }
    ]
  },
  {path: 'search/:search', component: SearchPageComponent},
  {path: 'details/:id', component: DrugDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginRegisterComponent},
  {path: 'group/:id', component: GroupComponent},
  {path:'chatroom',component:ManageChatRoomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ClientRoutingModule {
}
