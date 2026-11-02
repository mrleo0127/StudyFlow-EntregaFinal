
import { platformNativeScript, runNativeScriptAngularApp, registerElement } from '@nativescript/angular';
import { PullToRefresh } from '@nativescript-community/ui-pulltorefresh';
import '@nativescript/firebase-messaging';
import { AppModule } from './app/app.module';

registerElement('PullToRefresh', () => PullToRefresh);

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});


