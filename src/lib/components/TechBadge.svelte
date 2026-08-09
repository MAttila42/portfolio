<script lang='ts'>
  import type { Technology } from '$lib/data/technologies'

  const {
    tech,
  }: {
    tech: Technology
  } = $props()
</script>

<span
  class='flex select-none items-center gap-1.5 b-2 b-border rounded-full b-solid bg-card px-3 py-1 text-sm text-card-foreground transition-150 hover:b-primary'
>
  <div class={`${tech.icon} size-4`}></div>
  {tech.name}
</span>
