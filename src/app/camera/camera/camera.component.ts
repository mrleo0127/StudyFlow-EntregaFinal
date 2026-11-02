
import { Component, NgZone, ChangeDetectorRef } from '@angular/core'
import { Application, ImageSource } from '@nativescript/core'
import * as Camera from '@nativescript/camera'
import * as SocialShare from '@nativescript/social-share'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'

@Component({
  standalone: false,
  selector: 'app-camera',
  template: `
    <ActionBar title="Cámara" class="action-bar studyflow-actionbar">
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
          text="Cámara de StudyFlow"
          class="page-title"
          textWrap="true"
        ></Label>

        <Label
          text="Toma una fotografía y compártela con otras aplicaciones."
          class="page-subtitle"
          textWrap="true"
        ></Label>

        <Image
          *ngIf="photo"
          [src]="photo"
          stretch="aspectFit"
          height="300"
        ></Image>

        <Label
          *ngIf="!photo"
          text="Todavía no has tomado una fotografía."
          class="page-subtitle"
          textWrap="true"
        ></Label>

        <Button
          text="Tomar fotografía"
          (tap)="takePhoto()"
          class="btn btn-primary"
        ></Button>

        <Button
          *ngIf="photo"
          text="Compartir fotografía"
          (tap)="sharePhoto()"
          class="btn btn-primary"
        ></Button>

        <Label
          [text]="statusMessage"
          class="page-subtitle"
          textWrap="true"
        ></Label>
      </StackLayout>
    </ScrollView>
  `,
})
export class CameraComponent {
  photo: ImageSource | null = null
  statusMessage = ''

  constructor(
  private ngZone: NgZone,
  private changeDetector: ChangeDetectorRef
) {}

  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer
    sideDrawer.showDrawer()
  }

  async takePhoto(): Promise<void> {
    try {
      if (!Camera.isAvailable()) {
        this.ngZone.run(() => {
          this.statusMessage = 'No se encontró una cámara disponible.'
        })
        return
      }

      const permission = await Camera.requestCameraPermissions()

      if (!permission.Success) {
        this.ngZone.run(() => {
          this.statusMessage = 'Debes permitir el acceso a la cámara.'
        })
        return
      }

      const imageAsset = await Camera.takePicture({
        width: 1200,
        height: 1200,
        keepAspectRatio: true,
        saveToGallery: true,
      })

      if (!imageAsset) {
        this.ngZone.run(() => {
          this.statusMessage = 'No se tomó ninguna fotografía.'
        })
        return
      }

      const newPhoto = await ImageSource.fromAsset(imageAsset)

      this.ngZone.run(() => {
        this.photo = null
        this.changeDetector.detectChanges()

        this.photo = newPhoto
        this.statusMessage = 'Fotografía tomada correctamente.'

        this.changeDetector.detectChanges()
        })
    } catch (error) {
      this.ngZone.run(() => {
        this.statusMessage = 'No fue posible tomar la fotografía.'
      })

      console.error('Error al utilizar la cámara:', error)
    }
  }

  sharePhoto(): void {
    if (!this.photo) {
      this.statusMessage = 'Primero debes tomar una fotografía.'
      return
    }

    try {
      SocialShare.shareImage(this.photo, {
        subject: 'Fotografía desde StudyFlow',
        caption: 'Fotografía tomada con StudyFlow.',
        fileFormat: 'jpg',
      })

      this.statusMessage = 'Selecciona una aplicación para compartir.'
    } catch (error) {
      this.statusMessage = 'No fue posible compartir la fotografía.'
      console.error('Error al compartir fotografía:', error)
    }
  }
}

