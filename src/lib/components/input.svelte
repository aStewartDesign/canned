<script lang="ts">
  interface Props {
    value: string;
    onblur?: () => void;
    onenter?: () => void;
  }
  let { value = $bindable(), onblur, onenter }: Props = $props();

  const handleKeydown = (event: KeyboardEvent) => {
    if (onenter && event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onenter();
    }
  };
</script>

<div class="grow-wrap grow" data-replicated-value={value}>
  <textarea
    class="mx-2 rounded border-x-0 border-t-0 border-b-2 border-slate-300 bg-transparent p-2 ring-slate-300 focus:border-x-0 focus:border-t-0 focus:border-b-2 focus:border-cyan-900 dark:placeholder:text-slate-300"
    placeholder="Add new canned response..."
    rows="1"
    bind:value
    {onblur}
    onkeydown={handleKeydown}
  ></textarea>
</div>
