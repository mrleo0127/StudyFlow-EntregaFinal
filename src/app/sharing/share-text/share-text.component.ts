import { Component } from '@angular/core'
import * as SocialShare from '@nativescript/social-share'
import { Application, isAndroid } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'

@Component({
  standalone: false,
  selector: 'app-share-text',
  template: `
    <ActionBar title="Compartir texto" class="action-bar studyflow-actionbar">
      <NavigationButton visibility="hidden"></NavigationButton>
      <ActionItem
        text="Menú"
        (tap)="onDrawerButtonTap()"
        android.position="actionBar"
        ios.position="left"
      ></ActionItem>
    </ActionBar>

    <ScrollView>
      <StackLayout class="page-content" padding="20">
        <Label
          text="Compartir contenido"
          class="page-title"
          textWrap="true"
        ></Label>

        <Label
          text="Escribe un mensaje y compártelo con otras aplicaciones."
          class="page-subtitle"
          textWrap="true"
        ></Label>

        <TextView
          [(ngModel)]="message"
          hint="Escribe aquí el mensaje que deseas compartir..."
          height="130"
          class="input"
        ></TextView>

        <Button
          text="Compartir texto"
          (tap)="shareMessage()"
          class="btn btn-primary"
        ></Button>

        <Label
          [text]="statusMessage"
          textWrap="true"
          class="page-subtitle"
        ></Label>
      </StackLayout>
    </ScrollView>
  `,
})
export class ShareTextComponent {
  message = '¡Estoy organizando mis actividades académicas con StudyFlow!'
  statusMessage = ''

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer
    sideDrawer.showDrawer()
  }

  shareMessage(): void {
    if (!this.message.trim()) {
      this.statusMessage = 'Escribe un mensaje antes de compartir.'
      return
    }

    try {
      SocialShare.shareText(
        this.message,
        'Compartir desde StudyFlow'
      )

      this.statusMessage = 'Selecciona una aplicación para compartir tu mensaje.'

    } catch (error) {
      this.statusMessage = 'No fue posible compartir el mensaje.'
      console.error('Error al compartir texto:', error)
    }
  }
}