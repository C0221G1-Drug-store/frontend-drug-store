import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {HomepageComponent} from './homepage/homepage.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {CartComponent} from './cart/cart.component';
import {DrugDetailsComponent} from './drug-details/drug-details.component';
import {LoginRegisterComponent} from './login-register/login-register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderClientComponent} from './header-client/header-client.component';
import {FooterClientComponent} from './footer-client/footer-client.component';
import { FeedComponent } from './inbox/feed/feed.component';
import { ChatRoomComponent } from './inbox/chat-room/chat-room.component';
import { MessageComponent } from './inbox/message/message.component';
import { ChatFormComponent } from './inbox/chat-form/chat-form.component';
import { SignupComponent } from './inbox/signup/signup.component';
import { InboxBoxComponent } from './inbox/inbox-box/inbox-box.component';
import {GroupComponent} from './group/group.component';
import { ManageMessageComponent } from './adminInbox/manage-message/manage-message.component';
import { ManageFeedComponent } from './adminInbox/manage-feed/manage-feed.component';
import { ManageChatFormComponent } from './adminInbox/manage-chat-form/manage-chat-form.component';
import { ManageChatRoomComponent } from './adminInbox/manage-chat-room/manage-chat-room.component';
import { ManageLoginComponent } from './adminInbox/manage-login/manage-login.component';
import { ListRoomComponent } from './adminInbox/list-room/list-room.component';


@NgModule({
  declarations: [
    HomepageComponent,
    SearchPageComponent,
    CartComponent,
    DrugDetailsComponent,
    GroupComponent,
    LoginRegisterComponent,
    HeaderClientComponent,
    FooterClientComponent,
    FeedComponent,
    ChatRoomComponent,
    MessageComponent,
    ChatFormComponent,
    SignupComponent,
    InboxBoxComponent,
    ManageMessageComponent,
    ManageFeedComponent,
    ManageChatFormComponent,
    ManageChatRoomComponent,
    ManageLoginComponent,
    ListRoomComponent
  ],
  exports: [
    HeaderClientComponent,
    FooterClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientModule {
}
