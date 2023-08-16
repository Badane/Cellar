import {defineStore} from "pinia"

export const useDinoStore = defineStore('dino', {
    state: ()=> ({
        name: "default"
    }),
    getters: {
        // doubleCount: (state) => state.count*2,
    },
    actions: {
        setName(newName) {
            this.name = newName;
        }
    }
});