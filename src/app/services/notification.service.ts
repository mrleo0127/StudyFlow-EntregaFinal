
import { Injectable } from '@angular/core';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-messaging';
import { Toasty } from '@triniwiz/nativescript-toasty';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private initialized = false;

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      // Inicializar Firebase con la configuración de Android.
      await firebase().initializeApp();

      // Obtener el servicio de mensajería.
      const messaging = firebase().messaging();

      // Solicitar permiso para recibir notificaciones.
      await messaging.requestPermission();

      // Obtener el token único del dispositivo.
      const token = await messaging.getToken();

      console.log('Token FCM de StudyFlow:', token);

      // Escuchar mensajes recibidos con la aplicación abierta.
      messaging.onMessage((message) => {
        const title = message.notification?.title || 'StudyFlow';
        const body =
          message.notification?.body || 'Has recibido una notificación.';

        new Toasty({
          text: `${title}: ${body}`,
        }).show();

        console.log('Notificación recibida:', message);
      });

      this.initialized = true;
      console.log('Firebase Messaging inicializado correctamente.');
    } catch (error) {
      console.error('Error al inicializar las notificaciones:', error);
    }
  }
}
