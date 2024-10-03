# station-13-announcement-text-allowlist
FUNCTIONAL-PROTOTYPE - Station 13 helper tool for allowing you to type a full sentence for an announcement without using any invalid words, with customizable file you can edit.

---

## How to use
- Install modules `npm i`
- Run locally `npm run start`
  - If any issues, see if an exe works: `npm run make` (will write to `/out` folder)
---

### Using
- [Electron Forge](https://www.electronforge.io/templates/typescript-+-webpack-template)
- [Material UI](https://mui.com/material-ui/getting-started/)

---

### Creation Process
- [Electron Forge Typescript with Webpack Template](https://www.electronforge.io/templates/typescript-+-webpack-template)
  - `npm init electron-app@latest my-new-app -- --template=webpack-typescript`
- Installed various `@types/*` modules
- Update `renderer.ts` and `index.html` to successfully run the React App code
- Installed `@emotion/react @emotion/styled @mui/material @mui/styled-engine-sc styled-components`
- Installed `@fontsource/roboto`
- Installed `@mui/icons-material`
  - https://mui.com/material-ui/icons/
