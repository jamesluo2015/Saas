<template>
  <div>
        <select-docs></select-docs>
        <tabs-docs></tabs-docs>
  </div>
</template>
<script>
import selectDocs from './selectDocs.vue'
import tabsDocs from './tabsDocs.vue'
export default {
  components: { selectDocs,tabsDocs },
}
</script>
