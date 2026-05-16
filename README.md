<p align="center">
  <img src="./assets/images/icon.png" alt="Logo de Food App V2" width="120" />
</p>

<h1 align="center">Food App V2</h1>

<p align="center">
  Aplicación móvil fan-made inspirada en <strong>El Gran Chef Famosos</strong>, creada para explorar recetas por temporada, categoría y nivel de dificultad desde una experiencia mobile rápida, visual y fácil de usar.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Expo-54-111827?style=for-the-badge&logo=expo&logoColor=white" alt="Expo 54" />
  <img src="https://img.shields.io/badge/React_Native-0.81-61DAFB?style=for-the-badge&logo=react&logoColor=111827" alt="React Native 0.81" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript 5.9" />
  <img src="https://img.shields.io/badge/SQLite-Local_DB-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite local database" />
</p>

<p align="center">
  <img src="./docs/screenshots/home-dark.jpg" alt="Pantalla principal en modo oscuro" width="240" />
  <img src="./docs/screenshots/recipe-detail.jpg" alt="Detalle de receta" width="240" />
  <img src="./docs/screenshots/cook-mode.jpg" alt="Modo cocinar con temporizador" width="240" />
</p>

## Sobre el proyecto

Food App V2 convierte un recetario de televisión en una app móvil navegable y utilizable en el día a día. El proyecto fue pensado como una mezcla de producto visual y ejercicio técnico: una interfaz con identidad propia, datos locales rápidos de consultar y una experiencia enfocada en cocinar mejor desde el celular.

Actualmente incluye más de 500 recetas organizadas en 5 temporadas, con una navegación pensada para descubrir platos, guardar favoritos y seguir instrucciones paso a paso sin salir de la app.

## Galería

<p align="center">
  <img src="./docs/screenshots/home-classic.jpg" alt="Pantalla de inicio con carrusel de temporadas" width="180" />
  <img src="./docs/screenshots/home-dark.jpg" alt="Inicio en modo oscuro" width="180" />
  <img src="./docs/screenshots/recipe-detail.jpg" alt="Vista de detalle de receta" width="180" />
  <img src="./docs/screenshots/cook-mode.jpg" alt="Modo cocinar paso a paso" width="180" />
  <img src="./docs/screenshots/favorites.jpg" alt="Pantalla de favoritos" width="180" />
</p>

## Funcionalidades principales

- Exploración por temporadas con carrusel visual y recetas destacadas.
- Filtros por categoría y nivel de dificultad desde la pantalla principal.
- Buscador con filtros combinados por nombre, temporada, categoría y dificultad.
- Vista de detalle con ingredientes, preparación, tips, glosario y videos relacionados.
- Modo cocinar con pasos secuenciales, temporizador integrado y pantalla activa.
- Sistema de favoritos persistente con almacenamiento local.
- Tema claro y oscuro con una identidad visual enfocada en mobile.

## Valor técnico

- Arquitectura local-first con `Expo SQLite` para consultar recetas sin depender de backend.
- Base de datos versionada con índices para mejorar búsquedas por `slug`, `temporada`, `tipo` y `nivel_complejidad`.
- Navegación tipada con `Expo Router`.
- Persistencia de favoritos con `AsyncStorage`.
- Soporte para videos de YouTube embebidos dentro de la experiencia de receta.
- Migración de favoritos legacy desde nombres de recetas hacia `slugs` para mantener compatibilidad.

## Stack

- React Native
- Expo
- TypeScript
- Expo Router
- Expo SQLite
- AsyncStorage
- NativeWind
- React Native Reanimated

## Ejecución local

1. Instala dependencias:

```bash
npm install
```

2. Inicia el proyecto:

```bash
npx expo start
```

Comandos útiles:

- `npm run android`
- `npm run ios`
- `npm run web`
- `npm run build:recipes-db` para reconstruir la base SQLite a partir de `data/recetario.ts`

## Objetivo del proyecto

Este repositorio forma parte de mi portafolio como desarrollador. Lo usé para practicar arquitectura mobile con datos locales, experiencia de usuario, navegación tipada y una presentación visual más cuidada que la de un proyecto base.

## Nota

Proyecto fan-made y no oficial, desarrollado con fines de aprendizaje, portafolio y experimentación en desarrollo mobile.
