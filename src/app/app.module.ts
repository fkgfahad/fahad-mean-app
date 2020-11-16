import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { RouteModule } from './modules/route.module';
import { MaterialModule } from './modules/material.module';
import { DirectivesModule } from './modules/directives.module';

import { reducers } from './store/app.reducers';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HelperService } from './services/helper.service';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageNotFoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    RouteModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers),
    HttpClientModule,
    MaterialModule,
    DirectivesModule
  ],
  providers: [
    HelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
