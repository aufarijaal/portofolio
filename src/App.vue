<template>
  <div ref="block" class="bg-indigo-500 w-12 h-12 m-20" @mousemove="c()"></div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  methods: {
    c() {
      alert('hello')
    }
  },
  mounted() {
    this.$animejs({
      targets: this.$refs.block,
      translateX: 250,
      direction: 'alternate',
      loop: true,
      easing: 'easeOutBack'
    })
  }
}
</script>
