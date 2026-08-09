<script lang='ts'>
  import type { PageData } from './$types'
  import { resolve } from '$app/paths'
  import ExternalLink from '$lib/components/ExternalLink.svelte'
  import TechBadge from '$lib/components/TechBadge.svelte'
  import '@fontsource/caprasimo'

  const { data }: { data: PageData } = $props()
</script>

<svelte:head>
  <title>{data.project.title} - Attila Menyhárt</title>
</svelte:head>

<div class='mx-auto box-border max-w-3xl w-full flex flex-col gap-4 pt-24'>
  <a
    href={resolve('/')}
    class='group w-max flex flex-row items-center gap-1 text-muted-foreground no-underline transition-150 hover:text-foreground'
  >
    <div class='i-pepicons-pop:arrow-left size-5 transition-150 group-hover:-translate-x-1'></div>
    back to home
  </a>

  <div class='flex flex-col gap-4'>
    <h1 class='m-0 text-4xl font-normal font-[caprasimo] md:text-5xl'>{data.project.title}</h1>

    <div class='flex flex-wrap items-center gap-2'>
      {#each data.project.metadata?.technologies ?? [] as tech (tech.id)}
        <TechBadge {tech} />
      {/each}
    </div>

    {#if data.project.metadata?.visit || data.project.metadata?.source}
      <div class='flex flex-col gap-2 md:(flex-row items-center gap-3)'>
        {#if data.project.metadata?.visit}
          <ExternalLink text={data.project.metadata.visit} url={data.project.metadata.visit} />
        {/if}
        {#if data.project.metadata?.visit && data.project.metadata?.source}
          <span class='hidden text-muted-foreground md:inline'>|</span>
        {/if}
        {#if data.project.metadata?.source}
          <ExternalLink text='View source' url={data.project.metadata.source} />
        {/if}
      </div>
    {/if}
  </div>

  <div class='content'>
    <!-- eslint-disable-next-line -->
    {@html data.project.content}
  </div>

  <p class='mb-12 text-sm text-muted-foreground'>
    © {new Date().getFullYear()} Attila Menyhárt
  </p>
</div>

<style>
  .content :global(h1) {
    --uno: hidden;
  }
  .content :global(h2) {
    --uno: m-0 mt-10 mb-4 text-2xl text-muted-foreground;
  }
  .content :global(h3) {
    --uno: m-0 mt-8 mb-3 text-xl;
  }
  .content :global(p) {
    --uno: my-4 text-lg line-height-7 font-light;
  }
  .content :global(a) {
    --uno: text-accent underline underline-offset-4 transition-150 hover: text-foreground;
  }
  .content :global(ul),
  .content :global(ol) {
    --uno: my-4 pl-6 text-lg line-height-7 font-light;
  }
  .content :global(code) {
    --uno: rounded bg-muted px-1.5 py-0.5 text-sm;
  }
  .content :global(pre) {
    --uno: my-4 overflow-x-auto b-2 b-border rounded-xl b-solid bg-card p-4;
  }
  .content :global(pre code) {
    --uno: bg-transparent p-0;
  }
  .content :global(blockquote) {
    --uno: m-0 my-4 b-l-2 b-l-solid b-l-primary pl-4 text-muted-foreground;
  }
  .content :global(img) {
    --uno: h-auto w-90% rounded-xl shadow shadow-shadow shadow-lg;
  }
  .content :global(p:has(> img)) {
    --uno: text-center;
  }
  .content :global(hr) {
    --uno: my-8 b-0 b-t-2 b-t-solid b-t-border;
  }
</style>
