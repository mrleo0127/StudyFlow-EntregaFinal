
import { Component } from '@angular/core'
import { Application } from '@nativescript/core'
import { RadSideDrawer } from 'nativescript-ui-sidedrawer'

@Component({
  standalone: false,
  selector: 'app-maps',
  template: `
    <ActionBar title="Google Maps" class="action-bar studyflow-actionbar">
      <NavigationButton visibility="hidden"></NavigationButton>
      <ActionItem
        text="Menú"
        (tap)="onDrawerButtonTap()"
        android.position="actionBar"
        ios.position="left"
      ></ActionItem>
    </ActionBar>

    <StackLayout class="page-content" padding="15">
      <Label
        text="Mapa de StudyFlow"
        class="page-title"
        textWrap="true"
      ></Label>

      <Label
        text="Explora el mapa y consulta la ubicación del marcador."
        class="page-subtitle"
        textWrap="true"
      ></Label>

      <MapView
        height="450"
        width="100%"
        lat="6.3375"
        lng="-75.5580"
        zoom="15"
        (ready)="onMapReady($event)"
      ></MapView>
    </StackLayout>
  `,
})
export class MapsComponent {
  onDrawerButtonTap(): void {
    const sideDrawer = Application.getRootView() as RadSideDrawer
    sideDrawer.showDrawer()
  }

  onMapReady(event: any): void {
    const map = event.map

    map.addMarker({
      position: {
        lat: 6.3375,
        lng: -75.5580,
      },
      title: 'Parque Principal de Bello',
      snippet: 'Marcador de ubicación de StudyFlow.',
    })
  }
}
