/* import { RouterModule, Routes } from '@angular/router';
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
*/




import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router, NavigationStart } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { ManageComponent } from './components/manage/manage.component';
import { WebsocketComponent } from './components/websocket/websocket.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthService } from './services/auth.service';

export const routes: Routes = [{
    path: 'login',
    component: LoginComponent
}, {
    path: 'home',
    component: HomeComponent,
    children: [
        { path: 'home', component: HomeComponent },
        { path: 'boards', component: BoardComponent },
        { path: 'manage', component: ManageComponent },
        { path: 'websocket', component: WebsocketComponent },
        { path: '**', pathMatch: 'full', redirectTo: '' }
    ]

}];


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class RoutingModule {

    constructor(router: Router, authService: AuthService) {
        router.events
            .subscribe(event => {
                if (event.constructor.name === "NavigationStart") {
                    let isLoggedIn = authService.isAuthenticated();
                    let navEvent = event as NavigationStart;
                    console.log("ESTA LOGUEADO:" + isLoggedIn + " - navEvent: " +navEvent);
                    if (!isLoggedIn && navEvent.url != '/login') {
                        router.navigate(["/login"])
                    } else if (!isLoggedIn && navEvent.url == '/') {
                        router.navigate(["/login"])
                    } else if (!isLoggedIn && navEvent.url == '') {
                        router.navigate(["/login"])
                    } else if (isLoggedIn && navEvent.url == '/login') {
                        router.navigate(["/home"])
                    } else if (isLoggedIn && navEvent.url == '/') {
                        router.navigate(["/home"])
                    }
                }
            }
            );
    }

}