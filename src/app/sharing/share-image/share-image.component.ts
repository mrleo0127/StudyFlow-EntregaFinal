import { Component, OnInit } from '@angular/core'
import { Application, ImageSource } from '@nativescript/core'
import * as SocialShare from '@nativescript/social-share'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'

@Component({
  standalone: false,
  selector: 'app-share-image',
  template: `
    <ActionBar title="Compartir imagen" class="action-bar studyflow-actionbar">
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
          text="Compartir imagen"
          class="page-title"
          textWrap="true"
        ></Label>

        <Label
          text="Comparte la imagen de StudyFlow con otras aplicaciones."
          class="page-subtitle"
          textWrap="true"
        ></Label>

        <Image
          src="~/assets/studyflow_splash.png"
          stretch="aspectFit"
          height="250"
        ></Image>

        <Button
          text="Compartir imagen"
          (tap)="shareImage()"
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
export class ShareImageComponent implements OnInit {
  image: ImageSource
  statusMessage = ''

  async ngOnInit(): Promise<void> {
  try {
    this.image = await ImageSource.fromFile(
      '~/assets/studyflow_splash.png'
    )
  } catch (error) {
    this.statusMessage = 'No se pudo cargar la imagen.'
    console.error('Error al cargar la imagen:', error)
  }
}

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer
    sideDrawer.showDrawer()
  }

  shareImage(): void {
    if (!this.image) {
      this.statusMessage = 'No se pudo cargar la imagen.'
      return
    }

    try {
      SocialShare.shareImage(this.image, {
        subject: 'Imagen de StudyFlow',
        caption: 'Conoce StudyFlow, mi organizador académico.',
        fileFormat: 'png',
      })

      this.statusMessage = 'Selecciona una aplicación para compartir la imagen.'

    } catch (error) {
      this.statusMessage = 'No fue posible compartir la imagen.'
      console.error('Error al compartir imagen:', error)
    }
  }
}