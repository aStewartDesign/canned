<script lang="ts">
  import { onMount } from 'svelte';
  import { messageStore, type Message, type IAction } from '$lib/stores/messaging';
  import { secondaryButtonClasses } from '$lib/styles';

  interface Props {
    message: Message;
    timeout?: number;
  }
  let { message, timeout = 6000 }: Props = $props();

  const dismissMessage = () => {
    messageStore.update((messages) => messages.filter((m) => m !== message));
  };

  onMount(() => {
    setTimeout(dismissMessage, timeout);
  });

  const typeStyles = $derived.by(() => {
    switch (message.type) {
      case 'success':
        return 'border-green-800';
      case 'error':
        return 'border-red-500';
      default:
        return 'border-slate-300';
    }
  });

  const handleAction = (action: IAction) => {
    action.fn();
    dismissMessage();
  };
</script>

<div
  class="m-6 flex items-center justify-between border-2 {typeStyles} min-h-12 rounded-3xl bg-white dark:bg-slate-900"
>
  <div class="mx-4 flex grow">
    <span class="font-bold">{message.text}</span>
    {#if message.action}
      <button
        class="ml-1 text-cyan-400 hover:text-cyan-700 hover:underline"
        onclick={() => handleAction(message.action!)}
      >
        {message.action.text}
      </button>
    {/if}
  </div>
  <button class="ml-2 {secondaryButtonClasses}" onclick={dismissMessage} aria-label="Dismiss">
    <i class="fas fa-times-circle"></i>
  </button>
</div>
