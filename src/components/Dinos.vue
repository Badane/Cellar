<script>
    import { useDinoStore } from '../store/dino'

    export default {
      async setup() {
        const dinoStore = useDinoStore();

        const res = await fetch("http://localhost:8000/api/dinos")
        const dinosaurs = await res.json();
        return {
          dinosaurs,
          dinoStore
        }
      }
    }
</script>

<template>
  <div class="container">
    <div v-for="dinosaur in dinosaurs" class="dinosaur-wrapper">
      <span class="dinosaur">
        <router-link :to="{ name: 'Dinosaur', params: { dinosaur: `${dinosaur.name.toLowerCase()}` }}">
          <a @click="dinoStore.setName(dinosaur.name)">
            {{dinosaur.name}}
          </a>
        </router-link>
      </span>
    </div>
  </div>
</template>

<style scoped>
.dinosaur-wrapper {
  display: inline-block;
  margin: 0.15rem 1rem;
  padding: 0.15rem 1rem;
}
.container {
  text-align: left;
}
</style>