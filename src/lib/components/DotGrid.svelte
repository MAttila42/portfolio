<script lang='ts'>
  let glow: HTMLDivElement | undefined = $state()
  let isTouchDevice = $state(false)

  function setGlowPosition() {
    if (!glow)
      return

    glow.style.setProperty('--mx', `${window.innerWidth}px`)
    glow.style.setProperty('--my', `${window.innerHeight}px`)
    glow.style.opacity = '0.6'
  }

  function move(e: PointerEvent) {
    if (!glow)
      return

    glow.style.setProperty('--mx', `${e.clientX}px`)
    glow.style.setProperty('--my', `${e.clientY}px`)
    glow.style.opacity = '0.6'
  }

  function leave(e: PointerEvent) {
    if (!e.relatedTarget && glow && !isTouchDevice)
      glow.style.opacity = '0'
  }

  $effect(() => {
    isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) {
      setGlowPosition()
      window.addEventListener('resize', setGlowPosition)
    }
    return () => {
      if (isTouchDevice)
        window.removeEventListener('resize', setGlowPosition)
    }
  })
</script>

<svelte:window onpointermove={isTouchDevice ? undefined : move} onpointerout={leave} />

<div class='dots' aria-hidden='true'></div>
<div bind:this={glow} class='dots glow' aria-hidden='true'></div>

<style>
  .dots {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-image:
      radial-gradient(circle, hsl(210 8% 88% / 0.08) 1px, transparent 1.4px),
      radial-gradient(circle, hsl(210 8% 88% / 0.08) 1px, transparent 1.4px);
    background-size: 44px 44px;
    background-position:
      0 0,
      22px 22px;
  }

  .glow {
    opacity: 0;
    transition: opacity 0.4s;
    background-image:
      radial-gradient(circle, hsl(210 20% 54%) 1.4px, transparent 1.9px),
      radial-gradient(circle, hsl(210 20% 54%) 1.4px, transparent 1.9px);
    mask-image: radial-gradient(
      circle at var(--mx, -100vw) var(--my, -100vh),
      black 0px,
      black 70px,
      transparent 600px
    );
  }
</style>
