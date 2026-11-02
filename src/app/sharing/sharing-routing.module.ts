import { NgModule } from '@angular/core'
import { Routes } from '@angular/router'
import { NativeScriptRouterModule } from '@nativescript/angular'

import { ShareTextComponent } from './share-text/share-text.component'
import { ShareImageComponent } from './share-image/share-image.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'text',
    pathMatch: 'full',
  },
  {
    path: 'text',
    component: ShareTextComponent,
  },
  {
    path: 'image',
    component: ShareImageComponent,
  },
]

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class SharingRoutingModule {}