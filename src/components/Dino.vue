<script>
  import { useDinoStore } from '../store/dino';
  export default {
    setup() {
      const dinoStore = useDinoStore();

      return {
        dinoStore
      }
    }
  }
</script>

<template>
  <div>
    Name: {{ dinoStore.name }}
    <br />
    Description: XXXX
  </div>
</template>