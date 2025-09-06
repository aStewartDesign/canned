<script lang="ts">
  interface ICan {
    text: string;
    id: string;
  }

  const mockData: ICan[] = [
    { text: 'I can do this', id: '1' },
    { text: 'I can do that', id: '2' },
    { text: 'I can do something else', id: '3' },
  ];

  const primaryButtonClasses = 'rounded-4xl bg-cyan-600 p-2 text-white hover:bg-cyan-900';
  const secondaryButtonClasses =
    'rounded-4xl bg-transparent p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700';
</script>

<div class="p-4">
  {#each mockData as can (can.id)}
    <div
      class="text-md mb-4 flex min-h-16 items-center justify-between rounded-4xl border-2 border-dashed border-slate-400 bg-slate-100 px-2 py-2 dark:bg-slate-700"
    >
      <button class="{primaryButtonClasses} mr-2" aria-label="Copy">
        <i class="far fa-clipboard"></i>
      </button>
      <input
        type="text"
        class="mr-2 grow rounded border-x-0 border-t-0 border-b-2 border-slate-300 bg-transparent p-2 ring-slate-300 focus:border-x-0 focus:border-t-0 focus:border-b-2 focus:border-cyan-900"
        value={can.text}
      />
      <div>
        <button class={secondaryButtonClasses} aria-label="Delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  {/each}
  <div
    class="text-md mb-4 flex min-h-16 items-center justify-between rounded-4xl bg-slate-100 px-2 py-2 dark:bg-slate-700"
  >
    <input
      type="text"
      class="mx-2 grow rounded border-x-0 border-t-0 border-b-2 border-slate-300 bg-transparent p-2 ring-slate-300 focus:border-x-0 focus:border-t-0 focus:border-b-2 focus:border-cyan-900"
      placeholder="Add new can..."
    />
    <button class={primaryButtonClasses} aria-label="Add">
      <i class="fas fa-plus"></i>
    </button>
  </div>
</div>
