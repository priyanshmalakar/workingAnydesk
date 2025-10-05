// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// import { IonicModule } from '@ionic/angular';

// import { RemotePageRoutingModule } from './remote-routing.module';

// import { PwDialog, RemotePage } from './remote.page';
// import { LottieModule } from 'ngx-lottie';
// import { TranslateModule } from '@ngx-translate/core';
// import { TippyDirective } from '@ngneat/helipopper';
// @NgModule({
//     imports: [
//         CommonModule,
//         FormsModule,
//         IonicModule,
//         RemotePageRoutingModule,
//         LottieModule,
//         TranslateModule,
//         TippyDirective,
//     ],
//     declarations: [RemotePage, PwDialog],
// })
// export class RemotePageModule {}


// Add new code below

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemotePageRoutingModule } from './remote-routing.module';

import { PwDialog, RemotePage } from './remote.page';
import { LottieModule } from 'ngx-lottie';
import { TranslateModule } from '@ngx-translate/core';
// Note: TippyDirective should be declared or used as a directive; not imported like a module.
// If you use it as a directive globally, declare it in a shared module instead.

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemotePageRoutingModule,
    LottieModule,
    TranslateModule,
  ],
  declarations: [RemotePage, PwDialog /* add TippyDirective here if you actually import it as a directive */],
})
export class RemotePageModule {}
