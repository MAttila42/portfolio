/// <reference types="node" />
import fs from 'node:fs/promises'
import {
  defineConfig,
  presetIcons,
  presetMini,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import technologies from './src/lib/data/technologies'

const techIcons = technologies.map(t => t.icon)
const techIconsMasked = techIcons.map(icon => `${icon}?mask`)

export default defineConfig({
  presets: [
    presetMini(),
    presetIcons({
      collections: {
        icons: {
          elysia: () => fs.readFile('./src/lib/assets/elysia.svg', 'utf-8'),
        },
      },
      customizations: {
        iconCustomizer(collection, _icon, props) {
          if (['devicon', 'selfhst', 'icons'].includes(collection))
            props.transform = 'scale(0.8)'
        },
      },
    }),
  ],
  preflights: [{ getCSS: () => `body,h1,h2{margin:0;}html{color-scheme:dark;}` }],
  safelist: [
    ...techIcons,
    ...techIconsMasked,
  ],
  theme: {
    breakpoints: {
      xxs: '360px',
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    colors: {
      background: 'hsl(210 12% 16%)',
      foreground: 'hsl(210 8% 88%)',
      border: 'hsl(210 8% 26%)',
      input: 'hsl(210 10% 20%)',
      shadow: 'hsl(210 6% 12%)',
      success: 'hsl(120 70% 40%)',
      destructive: 'hsl(0 70% 60%)',
      card: {
        DEFAULT: 'hsl(210 12% 19%)',
        foreground: 'hsl(210 8% 80%)',
      },
      muted: {
        DEFAULT: 'hsl(210 8% 22%)',
        foreground: 'hsl(210 6% 64%)',
      },
      primary: {
        DEFAULT: 'hsl(210 100% 50%)',
        foreground: 'hsl(0 0% 100%)',
        hover: 'hsl(210 100% 55%)',
        disabled: 'hsl(210 50% 35%)',
      },
      accent: {
        DEFAULT: 'hsl(210 90% 50%)',
        foreground: 'hsl(210 100% 10%)',
        hover: 'hsl(210 100% 65%)',
      },
    },
  },
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
  ],
})
