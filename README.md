Gracias por la oportunidad de participar en el proceso de selección para la posición de Tech Lead Frontend. A continuación encontrarás cómo levantar el proyecto y algunas reflexiones sobre el desarrollo.

**Stack:** Node 22, React 19, Next 15.

## Instrucciones de ejecución

- Requisitos: Node 22 (ideal). El proyecto define `engines` en `package.json` para guiar la versión.
- Variables de entorno: este proyecto consume la API pública de Rick & Morty. Configura el endpoint en un archivo `.env.local` en la raíz del proyecto:

```
NEXT_PUBLIC_RICK_MORTY_API_URL=https://rickandmortyapi.com/api
```

- Instalación de dependencias:

```
npm install
```

- Levantar en desarrollo:

```
npm run dev
```

La app quedará disponible en `http://localhost:3000`.

## Pruebas unitarias

Se configuró Jest + React Testing Library.

- Ejecutar suite:

```
npm test
```

- Modo watch:

```
npm run test:watch
```

## ¿Qué es lo que más me gustó de mi desarrollo?

- Fui capaz de agregar funcionalidad que no estaba definida en el look and feel de Figma, pero que considero aporta a la experiencia de usuario. La curiosidad y la experiencia te llevan a cuestionar y mejorar el desarrollo de cualquier producto.

## Si hubiera tenido más tiempo, ¿qué hubiera mejorado o qué más habría hecho?

1. Habría definido una paleta de colores declarando variables reutilizables en todos los componentes (no lo hice por el poco tiempo disponible).
2. Habría creado pruebas unitarias (no lo hice por el poco tiempo disponible).
3. Habría implementado una estructura más modular basada en principios de arquitectura limpia para desacoplar la lógica de negocio de la capa de presentación. Aunque este proyecto es pequeño, me habría gustado mostrar una estructura pensada para escalar a proyectos más complejos.

## Pain points / Bugs encontrados y cómo los resolví

1. Visualización en UI por bloques: el API entrega páginas de 20 personajes pero la interfaz pedía bloques de 4 para desktop y de 2 para mobile, además de manejar el paginado interno sin romper la experiencia. Opté por una lógica de “bloques” (4 en desktop, 2 en mobile) y media queries, manejando índices y páginas de forma controlada.
2. Ambigüedad en Figma: faltaban detalles de comportamientos específicos. Decidí resolverlos con base en patrones comunes y experiencia previa para mantener consistencia y usabilidad.
3. Diferencias notables entre mobile y desktop: había que distribuir varios elementos de forma distinta en cada vista. Usé CSS puro con media queries para acercarme lo más posible al diseño solicitado, manteniendo el layout estable.
