<script lang='ts'>
  import { afterNavigate } from '$app/navigation'
  import { resolve } from '$app/paths'
  import { page } from '$app/state'
  import '@fontsource/caprasimo'

  const { children } = $props()

  let navEl: HTMLElement | undefined = $state()

  const PRESERVED_PATHS = ['/', '/contact']

  afterNavigate(({ from, to, type }) => {
    if (!(type === 'link' || type === 'goto'))
      return

    const fromPath = from?.url?.pathname
    const toPath = to?.url?.pathname
    if (!fromPath || !toPath)
      return
    if (!PRESERVED_PATHS.includes(fromPath) || !PRESERVED_PATHS.includes(toPath))
      return

    const isMobile = window.matchMedia('(max-width: 1023px)').matches
    if (isMobile && navEl) {
      const top = navEl.getBoundingClientRect().top + window.scrollY
      window.scrollTo(0, top)
    }
    else {
      window.scrollTo(0, 0)
    }
  })
</script>

<svelte:head>
  <title>Attila Menyhárt</title>
</svelte:head>

{#snippet nav()}
  <nav bind:this={navEl} class='mb-12 w-full flex items-center justify-end'>
    <div class='flex gap-6 text-lg'>
      <a
        href={resolve('/')}
        data-sveltekit-noscroll
        class={`${page.url.pathname === '/' ? 'active' : ''} no-underline`}
      >about me</a>
      <a
        href={resolve('/contact')}
        data-sveltekit-noscroll
        class={`${page.url.pathname === '/contact' ? 'active' : ''} no-underline`}>contact</a>
    </div>
  </nav>
{/snippet}

{#snippet social(text: string, url: string, icon: string)}
  <a
    href={url}
    target='_blank'
    rel='external'
    class='w-max flex items-center gap-2 text-lg text-foreground font-light no-underline duration-300 hover:(duration-150)'
  >
    <div class={`${icon} size-6 duration-300`}></div>
    <span>{text}</span>
  </a>
{/snippet}

<div class='pt-100px lg:(m-auto max-w-full w-5xl flex gap-30)'>
  <div class='top-100px mb-12 h-fit w-full flex flex-col gap-3 lg:(sticky ml-10 w-2/5 flex)'>
    <h1 class='text-5xl font-normal font-[caprasimo] md:(pl-16 indent--16 text-6xl) xxs:pl-12 xxs:indent--12'>
      Attila Menyhart
    </h1>
    <h2 class='text-accent font-light'>Software Developer</h2>
    <p class='m-0 text-lg text-muted-foreground'>
      I am a passionate software developer, who loves solving complex problems and creating
      innovative solutions.
    </p>
    <div class='mt-6 flex flex-col gap-4'>
      {@render social('GitHub', 'https://github.com/MAttila42', 'i-simple-icons:github')}
      {@render social('attila@menyh.art', 'mailto:attila@menyh.art', 'i-simple-icons:maildotru')}
      {@render social('Facebook', 'https://www.facebook.com/attila.menyhart.94695', 'i-simple-icons:facebook',
      )}
      {@render social('Discord', 'https://discord.gg/kembxGyb2x', 'i-simple-icons:discord')}
      {@render social('Resume', 'https://cv.menyh.art/attila/resume', 'i-pepicons-pop:cv-circle-filled',
      )}
    </div>
  </div>
  <div class='mb-10 w-full lg:(top-60px mr-10 w-3/5)'>
    {@render nav()}
    {@render children()}

    <p class='mt-12 text-right text-sm text-muted-foreground'>
      © {new Date().getFullYear()} Attila Menyhárt
    </p>
  </div>
</div>

<style>
  a span {
    box-shadow: inset 0 -0.15em 0 theme("colors.primary.DEFAULT");
    --uno: duration-300 px-.5;
  }
  a:hover span {
    box-shadow: inset 0 -2em 0 theme("colors.primary.hover");
    --uno: duration-150 text-accent-foreground;
  }
  a:hover div {
    --uno: text-primary duration-150;
  }

  nav a {
    --uno: no-underline text-foreground;
  }
  nav a.active {
    --uno: text-accent font-bold;
  }
</style>
