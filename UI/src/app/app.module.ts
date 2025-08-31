import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { EmployeeDetailsModule } from './component/employee-details/employee-details.module';
import { ToastrModule } from 'ngx-toastr';





export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
   





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en'
    }),
    AuthModule,
    CoreModule,
    LayoutModule,
    EmployeeDetailsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center', // top-center
      closeButton: false,                // no close button
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
      toastClass: 'ngx-toastr toast-top-custom' // custom width/height
    })
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
