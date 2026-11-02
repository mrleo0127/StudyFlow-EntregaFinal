import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { NativeScriptCommonModule } from '@nativescript/angular'
import { NativeScriptFormsModule } from '@nativescript/angular'

import { SharingRoutingModule } from './sharing-routing.module'
import { ShareTextComponent } from './share-text/share-text.component'
import { ShareImageComponent } from './share-image/share-image.component'

@NgModule({
  imports: [
  NativeScriptCommonModule,
  NativeScriptFormsModule,
  SharingRoutingModule,
],
  declarations: [
    ShareTextComponent,
    ShareImageComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SharingModule {}