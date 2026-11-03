# StudyFlow

**StudyFlow** es una aplicación móvil desarrollada con NativeScript y Angular que funciona como un organizador académico. Su propósito es ofrecer herramientas para gestionar actividades académicas y acceder a diferentes funcionalidades desde una misma aplicación.

Este proyecto fue desarrollado como parte de la asignatura **Programación de Aplicaciones Móviles** de la carrera de Ingeniería de Software.

## Funcionalidades

La aplicación incluye las siguientes características:

- **Organización académica:** navegación por las diferentes secciones de StudyFlow.
- **Notificaciones push:** integración con Firebase Cloud Messaging para recibir notificaciones.
- **Mensajes emergentes:** visualización de notificaciones mediante Toast.
- **Compartir texto:** permite compartir contenido con otras aplicaciones.
- **Compartir imágenes:** permite seleccionar imágenes y compartirlas.
- **Cámara:** permite tomar fotografías utilizando la cámara del dispositivo.
- **Compartir fotografías:** permite compartir las imágenes tomadas desde la aplicación.
- **Google Maps:** visualización de mapas de Google con un marcador de ubicación.
- **Pruebas unitarias:** pruebas del reducer de NgRx utilizando Jasmine.
- **Reporte de pruebas:** generación de reportes XML mediante Karma JUnit Reporter.

## Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| NativeScript | Desarrollo de la aplicación móvil |
| Angular | Estructura y componentes de la aplicación |
| TypeScript | Lenguaje de programación |
| NgRx | Gestión del estado |
| Firebase Cloud Messaging | Notificaciones push |
| Google Maps SDK | Visualización de mapas |
| Jasmine | Pruebas unitarias |
| Karma | Ejecución de pruebas |
| Karma JUnit Reporter | Generación de reportes XML |

## Requisitos previos

Para instalar y ejecutar el proyecto se necesita:

- Node.js y npm.
- NativeScript CLI.
- Java Development Kit (JDK 21).
- Android Studio.
- Android SDK y herramientas de plataforma.
- Un dispositivo Android físico o un emulador configurado.

La ejecución local para Android requiere tener configurado correctamente el entorno de desarrollo de NativeScript.

## Instalación

### 1. Clonar el repositorio

Abrir una terminal y ejecutar:

```bash
git clone https://github.com/mrleo0127/StudyFlow-EntregaFinal.git
```

### 2. Ingresar al proyecto

```bash
cd StudyFlow-EntregaFinal
```

### 3. Instalar las dependencias

```bash
npm install
```

Este comando instala las dependencias definidas en `package.json`.

## Ejecución en Android

Conectar un dispositivo Android con la depuración USB habilitada o iniciar un emulador.

Ejecutar:

```bash
ns run android
```

NativeScript se encargará de preparar, compilar e iniciar la aplicación en el dispositivo disponible.

## Configuración de Firebase

StudyFlow utiliza Firebase Cloud Messaging para recibir notificaciones.

El proyecto Android incluye el archivo de configuración:

```text
App_Resources/Android/src/google-services.json
```

Para utilizar una configuración propia:

1. Crear un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Registrar una aplicación Android.
3. Utilizar el identificador de paquete `org.nativescript.StudyFlow`.
4. Descargar el archivo `google-services.json`.
5. Colocarlo en `App_Resources/Android/src/`.
6. Configurar Firebase Cloud Messaging y los permisos de notificaciones.

Para probar las notificaciones, ejecutar la aplicación en un dispositivo Android y enviar un mensaje desde Firebase Console.

**Importante:** no compartir públicamente los tokens FCM de los dispositivos ni credenciales privadas.

## Configuración de Google Maps

La aplicación utiliza Google Maps SDK for Android.

Para configurar una clave propia:

1. Crear un proyecto en [Google Cloud Console](https://console.cloud.google.com/).
2. Habilitar Maps SDK for Android.
3. Crear una clave de API.
4. Configurar las restricciones para la aplicación Android.
5. Utilizar el identificador de paquete `org.nativescript.StudyFlow`.
6. Agregar la clave en el archivo:

```text
App_Resources/Android/src/main/AndroidManifest.xml
```

Dentro de la etiqueta `<application>`, configurar:

```xml
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="TU_CLAVE_DE_GOOGLE_MAPS"/>
```

Se recomienda restringir la clave a Maps SDK for Android y al certificado SHA-1 correspondiente.

## Ejecución de las pruebas

StudyFlow incluye pruebas unitarias para el reducer `readingReducer`, encargado de gestionar los recursos guardados en la lista de lectura.

Para ejecutar las pruebas, utilizar:

```bash
npm test
```

Las pruebas verifican:

- Retorno del estado inicial.
- Agregar recursos.
- Evitar recursos duplicados.
- Eliminar recursos.

La ejecución utiliza Jasmine y Karma con Chrome Headless.

### Reporte de pruebas

Después de ejecutar las pruebas, Karma genera el reporte JUnit en formato XML:

```text
reports/junit/results.xml
```

Este archivo contiene los resultados de la ejecución de las pruebas unitarias.

## Estructura del proyecto

La estructura principal del código fuente es:

```text
StudyFlow/
├── App_Resources/
│   └── Android/
├── reports/
│   └── junit/
│       └── results.xml
├── src/
│   ├── app/
│   │   ├── camera/
│   │   ├── maps/
│   │   ├── sharing/
│   │   ├── services/
│   │   │   └── notification.service.ts
│   │   └── store/
│   │       └── reading.reducer.spec.ts
│   └── main.ts
├── karma.conf.js
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.spec.json
└── nativescript.config.ts
```

## Autor

Proyecto académico desarrollado para la asignatura **Programación de Aplicaciones Móviles**.

