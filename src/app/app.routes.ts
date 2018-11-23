import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BoardComponent } from './components/board/board.component';
import { ManageComponent } from './components/manage/manage.component';
import { WebsocketComponent } from './components/websocket/websocket.component';

const APP_ROUTES: Routes = [
   { path: 'home', component: HomeComponent },
   { path: 'boards', component: BoardComponent },
   { path: 'manage', component: ManageComponent },
   { path: 'websocket', component: WebsocketComponent },
   { path: '**', pathMatch: 'full', redirectTo: ''}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);