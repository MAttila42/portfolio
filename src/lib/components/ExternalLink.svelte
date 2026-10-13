<script lang='ts'>
  const {
    text,
    url,
    class: c,
  }: {
    text: string
    url: string
    class?: string
  } = $props()
</script>

<a
  href={url}
  target='_blank'
  rel='external'
  class={`${c} min-w-0 flex flex-row items-center gap-1 break-all text-muted-foreground underline underline-offset-4 transition-150 hover:text-foreground`}
>
  {text}
  <div class='i-pepicons-pop:open mt-[2px] shrink-0'></div>
</a>
