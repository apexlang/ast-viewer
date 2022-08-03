<script>
  import JSONTree from "svelte-json-tree";
  // your json data to view
  const value = {
    array: [1, 2, 3],
    bool: true,
    object: {
      foo: "bar",
    },
  };
</script>

<JSONTree id="hello" {value} />

<style>
</style>
