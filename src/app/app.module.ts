import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { BoardComponent } from './components/board/board.component';
import { HomeComponent } from './components/home/home.component';
import { RoutingModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { ManageComponent } from './components/manage/manage.component';
import { ManageTableComponent } from './components/manage/manage-table/manage-table.component';
import { WebsocketComponent } from './components/websocket/websocket.component';
import { LoginComponent } from './components/login/login.component';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { UserModel } from './model/user.model';
import { TokenInterceptor } from './interceptors/tokenInterceptor';

export function tokenGetter() {
  const json = localStorage.getItem('user');
  let user = <UserModel>JSON.parse(json);
  if (!user) {
    return null;
  }
  return user.token;
}


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    BoardComponent,
    HomeComponent,
    ManageComponent,
    ManageTableComponent,
    WebsocketComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
