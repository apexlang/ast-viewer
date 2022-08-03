<script>
  import { onMount } from "svelte";
  import CodeMirror from "codemirror";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import "codemirror/mode/idl/idl";
  import "../node_modules/codemirror/lib/codemirror.css";

  let cm = null;
  export let value;

  onMount(() => {
    const textarea = document.getElementById("codemirror-textarea");
    textarea.value = value;

    cm = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
    });
    cm.getWrapperElement();

    cm.setSize("auto", "100%");
    cm.on("change", (_) => {
      value = cm.getValue();
      dispatch("change", { source: cm.getValue() });
    });
  });
</script>

<div class="code">
  <div class="editor">
    <textarea id="codemirror-textarea" {value} />
  </div>
</div>

<style>
  .editor {
    height: 100%;
  }

  .code {
    height: calc(100% - 10px);
  }
</style>
