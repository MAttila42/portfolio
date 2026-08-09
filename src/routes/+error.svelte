<script lang='ts'>
  import { resolve } from '$app/paths'
  import { page } from '$app/state'
  import '@fontsource/caprasimo'

  const status = $derived(page.status || 500)
</script>

<svelte:head>
  <title>{status} - Attila Menyhárt</title>
</svelte:head>

<main class='min-h-screen flex items-center justify-center'>
  <div class='max-w-xl w-full flex flex-col items-center text-center'>
    <h1 class='m-0 text-8xl text-primary font-normal leading-none font-[caprasimo] sm:text-9xl'>{status}</h1>
    <div class='my-8 h-px w-24 bg-border'></div>

    <h2 class='m-0 text-3xl font-normal font-[caprasimo] sm:text-4xl'>Something went wrong</h2>
    <p class='mb-0 mt-4 max-w-md text-lg text-muted-foreground font-light leading-7'>
      The page you are looking for could not be found, or an unexpected error occurred.
    </p>

    <a
      href={resolve('/')}
      class='group mt-10 flex items-center gap-1 text-lg text-foreground no-underline transition-150 hover:text-primary-foreground'
    >
      <div class='i-pepicons-pop:arrow-left size-6 transition-150 group-hover:-translate-x-1'></div>
      <span class='link-label'>Back to home</span>
    </a>
  </div>
</main>
