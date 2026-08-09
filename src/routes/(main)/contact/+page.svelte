<script lang='ts'>
  import { sendMessage } from '$lib/remote/contact.remote'

  let email = $state('')
  let message = $state('')
  let loading = $state(false)
  let result = $state<{ success?: boolean, error?: string } | null>(null)

  async function handleSubmit() {
    loading = true
    result = null
    try {
      await sendMessage({ email, message })
      result = { success: true }
      email = ''
      message = ''
    }
    catch (e) {
      result = {
        error: e instanceof Error ? e.message : 'Failed to send message.',
      }
      console.error(e)
    }
    finally {
      loading = false
    }
  }
</script>

<div class='w-full flex flex-col gap-6'>
  <div class='flex flex-col gap-1'>
    <h2 class='m-0 text-2xl font-light'>Send me a Message</h2>
    <p class='m-0 text-4 text-muted-foreground'>
      Use this form to get in touch with me. I will try to answer as soon as possible.
    </p>
  </div>

  <form
    class='flex flex-col gap-4'
    onsubmit={(e) => {
      e.preventDefault()
      handleSubmit()
    }}
  >
    <input type='email' placeholder='E-mail' bind:value={email} required />
    <textarea placeholder='Message' bind:value={message} required rows={6} class='resize-y'></textarea>
    <div class='flex flex-row items-center gap-5'>
      <button
        type='submit'
        disabled={loading}
        class='h-max w-max cursor-pointer rounded b-none bg-primary px-10 py-3 text-4 text-primary-foreground font-medium transition-150 disabled:(cursor-not-allowed bg-primary-disabled) hover:bg-primary-hover focus:(outline-2 outline-primary outline-offset-2 outline)'
      >
        {loading ? 'Sending...' : 'Send'}
      </button>

      {#if result?.success}
        <p class='text-success'>Message sent!</p>
      {/if}
      {#if result?.error}
        <p class='text-destructive'>{result.error} Write me an e-mail manually instead!</p>
      {/if}
    </div>
  </form>
</div>

<style>
  input,
  textarea {
    --uno: rounded b-none bg-input px-4 py-3 text-foreground outline-none ring-0 transition-colors
      font-[ubuntu] text-4 focus: (outline-2 outline-primary);
  }
</style>
