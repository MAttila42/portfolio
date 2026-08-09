<script lang='ts'>
  import DotGrid from '$lib/components/DotGrid.svelte'
  import '@fontsource/ubuntu'
  import 'virtual:uno.css'

  const { children } = $props()
</script>

<DotGrid />
<div class='px-5 xxs:px-10'>
  {@render children()}
</div>

<style>
  :global(body) {
    --uno: bg-background text-foreground font-[ubuntu];
  }
</style>
