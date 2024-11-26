import { ref, Ref } from 'vue'
import { defineStore } from 'pinia'

interface CounterState {
  n: number
  myRef: Ref<string>
}

// using pinia store to manage counter data and actions
export const useCounter = defineStore('counter', {
  state: (): CounterState => ({
    n: 5,
    myRef: ref('hello'),
  }),
  actions: {
    increment() {
      this.n++
    },
  },
})
