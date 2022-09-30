<script>
  import { onMount } from "svelte";

  import { JsonView } from "@zerodevx/svelte-json-view";

  import Editor from "./Editor.svelte";

  import { parse, ast as AST } from "@apexlang/core";

  const { Writer, Context } = AST;

  import defaultSample from "./default-sample.js";
  export let name = "Apex Validator";

  let hashValue = location.hash ? atob(location.hash.slice(1)) : "";

  let editorValue = hashValue || defaultSample;
  let codegenValue = "";
  let selectEl;

  let parsedApexDoc = null;
  let parsedModel = null;
  let ast = {};
  let activeTab = "AST";

  function onChange(evt) {
    update(evt.detail.source);
  }

  function onLangChange(evt) {
    update(editorValue);
  }

  onMount(() => {
    update(editorValue);
    selectEl.$on("MDCSelect:change", () => {
      update(editorValue);
    });
  });

  function update(src) {
    try {
      parsedApexDoc = parse(src, undefined, { noLocation: true });
      parsedModel = new Context({}, parsedApexDoc);
      // svelte-json-tree doesn't render constructors well, so we have to
      // force the ast into a POJSO until we replace or fix the component.
      ast = parseModel(parsedModel);
      location.hash = btoa(src);
    } catch (e) {
      ast = { error: "Error parsing apex", message: e.message };
    }

    // codegenValue = updateCodegen(parsedApexDoc);
  }

  const omitKeys = [
    "namespacePos",
    "errors",
    "imported",
    "config",
    "imported",
    "allTypes",
    "length",
  ];
  function jsonProcessor(k, v) {
    if (Array.isArray(v)) {
      if (v.length == 0) return undefined;
      return v;
    }
    if (omitKeys.indexOf(k) > -1) return undefined;
    return v;
  }

  function parseModel(doc) {
    try {
      return JSON.parse(JSON.stringify(doc, jsonProcessor));
    } catch (e) {
      return { error: "Error parsing apex", message: e.message };
    }
  }
</script>

<div class="app">
  <header>
    <h1>
      <a href="https://apexlang.github.io/ast-viewer/">Apex Visualizer</a>
    </h1>
  </header>
  <main class="content">
    <div class="left-panel">
      <h3 style="text-align:center">Apex Source</h3>
      <div class="panel-content">
        <Editor on:change={onChange} bind:value={editorValue} />
      </div>
    </div>
    <div class="right-panel">
      <h3 style="text-align:center">Apex Model Tree</h3>
      <div class="invalid-overlay" class:visible={ast.error}>
        <div class="bg" />
        <div class="error">
          <h3>Error: {ast.error}</h3>
          <h4>Error: {ast.message}</h4>
        </div>
      </div>

      <div class="panel-content">
        <div class="tab-panels">
          <div class="panel" class:selected={activeTab === "AST"}>
            <div
              style="--json-tree-font-size: 13px;--json-tree-font-family:  monospace"
            >
              <!-- <JSONTree value={ast} /> -->
              <JsonView json={ast} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</div>

<style>
  h1 {
    color: black;
    margin-top: 0;
  }
  .app {
    height: 100%;
    max-height: 100%;
  }
  header {
    height: 3em;
    line-height: 2em;
    text-align: center;
    font-family: monospace;
  }
  .content {
    height: calc(100% - 3em);
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .panel {
    display: none;
  }
  .selected {
    display: block !important;
  }
  .panel-content {
    height: 100%;
    overflow: auto;
  }
  .left-panel,
  .right-panel {
    height: 100%;
    overflow: hidden;
  }

  .right-panel .panel-header {
    height: 60px;
    position: relative;
  }
  .invalid-overlay {
    z-index: 100000;
    position: absolute;
    width: 50%;
    display: none;
    height: 100%;
  }
  .invalid-overlay .bg {
    background-color: red;
    opacity: 50%;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .visible {
    display: block;
  }
  .error {
    position: absolute;
    z-index: 10;
    background-color: white;
    text-align: center;
    margin-top: 5em;
    width: 100%;
  }
  .bracket::before {
    content: "<";
    display: "block";
  }

  * :global(.mdc-select) {
    width: 100%;
  }
</style>
