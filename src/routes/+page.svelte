<script lang="ts">
  import { onMount } from 'svelte';
  import { cans, addCan, updateCan, deleteCan, type Can } from '$lib/stores/cans.svelte';
  import { messageStore, addMessage, type Message } from '$lib/stores/messaging';
  import MessageComponent from '$lib/components/message.svelte';
  import Input from '$lib/components/input.svelte';
  import { primaryButtonClasses, secondaryButtonClasses } from '$lib/styles';
  import Fuse from 'fuse.js';

  let messages = $state<Message[]>([]);
  onMount(() => {
    messageStore.subscribe((value) => {
      messages = value;
    });
  });

  let searchQuery = $state('');
  let filteredCans = $derived.by(() => {
    if (!searchQuery.trim()) {
      return $cans;
    }
    const fuse = new Fuse($cans, {
      keys: ['text'], // Fields to search in
      threshold: 0.5, // 0 = perfect match, 1 = match anything
      distance: 100,
      includeScore: true,
      minMatchCharLength: 1,
      findAllMatches: true,
      ignoreLocation: true,
    });
    return fuse.search(searchQuery).map((result) => result.item);
  });

  let newCanText = $state('');

  const handleAdd = async () => {
    const text = newCanText.trim();
    if (text) {
      await addCan(text);
      newCanText = '';
    } else {
      addMessage('Canned response text required');
    }
  };

  const handleDelete = async (can: Can) => {
    const text = can.text;
    await deleteCan(can.id);
    addMessage('Canned response deleted.', 'default', {
      text: 'Undo',
      fn: () => addCan(text),
    });
  };

  const handleBlur = async (can: Can) => {
    const text = can.text.trim();
    if (text) {
      await updateCan(can.id, text);
    } else {
      await handleDelete(can);
    }
  };

  const copyCan = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addMessage('Copied to clipboard!', 'success');
    } catch (error) {
      addMessage('Failed to copy to clipboard', 'error');
      console.error('Failed to copy text: ', error);
    }
  };
</script>

<div class="fixed right-0 bottom-0 left-0 z-50">
  {#each messages as message (message.id)}
    <MessageComponent {message} />
  {/each}
</div>

<div class="p-4">
  {#if $cans.length === 0}
    <div
      class="text-md mb-4 flex min-h-16 items-center justify-between rounded-4xl border-2 border-dashed border-slate-400 bg-slate-100 px-2 py-2 dark:bg-slate-700"
    >
      <p class="grow text-center text-slate-600 dark:text-slate-300">No canned responses yet.</p>
    </div>
  {:else}
    <div class="sticky top-4 mb-4">
      <input
        class="w-full rounded-4xl border-2 border-slate-500 px-6 py-3 focus:border-slate-300 dark:bg-slate-900 focus:dark:bg-slate-700"
        type="search"
        placeholder="Search..."
        bind:value={searchQuery}
      />
      <span class="absolute top-1.5 right-2 p-2 text-white">
        <i class="fas fa-search"></i>
      </span>
    </div>
  {/if}
  {#each filteredCans as can (can.id)}
    <div
      class="text-md mb-4 flex min-h-16 items-center justify-between rounded-4xl border-2 border-dashed border-slate-400 bg-slate-100 px-2 py-2 dark:bg-slate-700"
    >
      <button
        class="{primaryButtonClasses} mr-2"
        aria-label="Copy"
        onclick={() => copyCan(can.text)}
      >
        <i class="far fa-clipboard"></i>
      </button>
      <Input bind:value={can.text} onenter={() => handleBlur(can)} onblur={() => handleBlur(can)} />
      <div>
        <button
          class={secondaryButtonClasses}
          aria-label="Delete"
          onclick={() => handleDelete(can)}
        >
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  {/each}
  <div
    class="text-md mb-4 flex min-h-16 items-center justify-between rounded-4xl bg-slate-100 px-2 py-2 dark:bg-slate-700"
  >
    <Input bind:value={newCanText} onenter={handleAdd} />
    <button class={primaryButtonClasses} aria-label="Add" onclick={handleAdd}>
      <i class="fas fa-plus"></i>
    </button>
  </div>
</div>
