import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { BoardComponent } from './components/board/board.component';
import { HomeComponent } from './components/home/home.component';
import { APP_ROUTING } from './app.routes';
import { FormsModule } from '@angular/forms';
import { ManageComponent } from './components/manage/manage.component';
import { ManageTableComponent } from './components/manage/manage-table/manage-table.component';
import { ManageCreateBoardComponent } from './components/manage/manage-create-board/manage-create-board.component';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    BoardComponent,
    HomeComponent,
    ManageComponent,
    ManageTableComponent,
    ManageCreateBoardComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
