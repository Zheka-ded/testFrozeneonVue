<template>
  <div id="app" class="container">
    <PackageList/>
    <Footer/>
  </div>
</template>

<script>
import PackageList from './components/PackageList.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    PackageList,
    Footer,
  }
}
</script>