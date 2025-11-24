# Tic Tac Toe – Development Guide

_A step-by-step explanation of how this project was built._

## 1. Project Setup

The project was created using **Vite + React**, with the following initial structure:

```bash

src/
components/
context/
hooks/
assets/

```

A global state was later added using **useReducer**, and the project was deployed to **GitHub Pages**.

---

## 2. Adding the LevelSelector

**Goal:** allow the user to choose the difficulty level before starting the game.

1. A constant `LEVELS` was created:

```js
export const LEVELS = [
  { id: 1, name: 'Easy' },
  { id: 2, name: 'Medium' },
  { id: 3, name: 'Hard' },
];
```

2. The `<LevelSelector />` component displays those options.
3. The selected level is saved in the global game state.

This step prepares the game to support different behaviors depending on the selected difficulty.

---

## 3. Character Selection (Player Avatars)

The game includes several characters (Mario, Bowser, Toad, etc.), stored in:

```js
export const CHARACTERS = [
  { name: "Mario", src: mario },
  { name: "Koopa", src: koopa },
  { name: "Toad", src: toad },
  ...
];
```

A **CharacterSelector** allows Player 1 and Player 2 to pick their avatars.
The selected characters define the symbols used during gameplay.

---

## 4. Creating the Square Component

**Goal:** represent a single cell on the Tic Tac Toe grid.

Steps:

1. Create an initial board:

```js
const initialBoard = Array(9).fill(null);
```

2. Implement `<Square />`, which receives:

- `value` → null or the character chosen by each player
- `onClick` → selects the square

3. Styling is added to show the character image inside each Square.

---

## 5. Assembling the Board Grid

The `<Board />` component renders 9 Squares using `.map()`:

```jsx
export const Board = ({ board, onSelectSquare }) => (
  <div className='board'>
    {board.map((value, index) => (
      <Square
        key={index}
        value={value}
        onClick={() => onSelectSquare(index)}
      />
    ))}
  </div>
);
```

This is the visual core of the game.

---

## 6. Implementing Game Logic (Turns, Moves, Winner)

Each time a player clicks a Square:

- a new board is generated
- the turn switches to the other player
- the game checks for a winner

### Winner Checking

A helper function evaluates all winning combinations:

```js
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
```

If the combination contains the same character, we have a winner.

---

## 7. Creating the WinnerModal

The modal appears when:

- there is a winner
- OR the board is full (draw)

It displays:

- the winning character
- or a "Draw!" message
- a button to restart or go back to character/level selection

The modal becomes visible when the reducer updates `winner` or `draw`.

---

## 8. Managing State using useReducer

The project moved from `useState` to `useReducer` for better structure.

The reducer handles:

- SET_SIZE
- SET PLAYER
- PLAY
- RESET

This centralizes all game logic.

---

## 9. Persisting Data with localStorage

Some game data (selected characters, last board state, current turn) is saved to localStorage so the game can continue after refreshing the page.

A custom hook `usePersistedState` or manual sync inside the reducer keeps the data stored.

---

## 10. Final Improvements

- Responsive layout using CSS Grid
- Better organization of assets
- GitHub Pages deployment
- Ensuring characters reset to default on full reset
- Improved UI polish

---

# 🇪🇸 Versión en Español

## 1. Configuración del Proyecto

El proyecto se creó con **Vite + React**, usando esta estructura inicial:

```
src/
  components/
  context/
  hooks/
  assets/
```

Luego se añadió un estado global con **useReducer**, y finalmente se hizo el deploy a **GitHub Pages**.

---

## 2. Añadiendo el LevelSelector

**Objetivo:** permitir al usuario elegir la dificultad antes de empezar.

1. Se creó la constante:

```js
export const LEVELS = [
  { id: 1, name: 'Fácil' },
  { id: 2, name: 'Medio' },
  { id: 3, name: 'Difícil' },
];
```

2. El componente `<LevelSelector />` muestra estos niveles.
3. El nivel seleccionado se guarda en el estado global.

Esto prepara el juego para comportarse de forma distinta según la dificultad.

---

## 3. Selección de Personajes (Avatares)

El juego incluye varios personajes (Mario, Bowser, Toad, etc.) dentro de:

```js
export const CHARACTERS = [
  { name: "Mario", src: mario },
  { name: "Koopa", src: koopa },
  { name: "Toad", src: toad },
  ...
];
```

Un componente **CharacterSelector** permite a Player 1 y Player 2 elegir sus avatares.
Los personajes elegidos son los símbolos usados en el tablero.

---

## 4. Creación del Componente Square

**Objetivo:** representar una celda del tablero.

Pasos:

1. Crear el tablero inicial:

```js
const initialBoard = Array(9).fill(null);
```

2. Crear `<Square />`, el cual recibe:

- `value` → null o el personaje del jugador
- `onClick` → selecciona la celda

3. Se aplican estilos para mostrar el personaje dentro del Square.

---

## 5. Construcción del Tablero (Board)

El componente `<Board />` muestra los 9 Squares:

```jsx
export const Board = ({ board, onSelectSquare }) => (
  <div className='board'>
    {board.map((value, index) => (
      <Square
        key={index}
        value={value}
        onClick={() => onSelectSquare(index)}
      />
    ))}
  </div>
);
```

Este es el corazón visual del juego.

---

## 6. Implementación de la Lógica del Juego

Cada vez que el jugador hace clic en un Square:

- se genera un nuevo tablero
- cambia el turno
- se revisa si alguien ganó

### Revisión de ganador

Se evalúan todas las combinaciones ganadoras:

```js
const WIN_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
```

Si los tres valores son iguales y no son null, hay ganador.

---

## 7. Creación del WinnerModal

El modal aparece cuando:

- hay un ganador
- O no quedan espacios (empate)

Muestra:

- el personaje ganador
- o “¡Empate!”
- un botón para reiniciar

El modal se activa cuando el reducer cambia `winner` o `draw`.

---

## 8. Manejo del Estado con useReducer

Se cambió de `useState` a `useReducer` para centralizar la lógica.

El reducer maneja:

- PLAY
- RESET GAME
- SET LEVEL
- SET PLAYER CHARACTER
- RESTART

Esto hace el código más claro y mantenible.

---

## 9. Persistencia con localStorage

Se guarda información importante:

- personajes elegidos
- último estado del tablero
- turno actual

Así, al refrescar la página, el juego continúa donde quedó.

---

## 10. Mejoras Finales

- UI responsive usando CSS Grid
- Mejor organización de assets
- Deploy en GitHub Pages
- Reset total restaurando personajes por defecto
- Mejoras visuales

---

# End of Guide / Fin de la guía
