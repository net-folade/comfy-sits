// Files in public/ are published under Vite's base path ('/comfy-sits/' on
// GitHub Pages). The bundler only rewrites paths it can see in markup and
// imports, so runtime strings must be prefixed here or they 404 in production.
// main.tsx supplies the base at start-up; the tests compile to CommonJS and
// cannot read import.meta, so the default keeps them on a root-served path.
let base = '/'

export const setAssetBase = (value: string): void => {
  base = value.endsWith('/') ? value : `${value}/`
}

export const asset = (path: string): string => `${base}${path.replace(/^\//, '')}`
