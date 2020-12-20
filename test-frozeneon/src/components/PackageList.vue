<template>
  <div class="package-list container">
    <h1>Almost like jsDelivr...</h1>
    <div class="form-group">
      <input type="text" class="form-control" @input="loadListPackage" placeholder="enter package name">
    </div>

    <h2 v-if="this.listPackage.length === 0">Enter package name</h2>

    <div class="alert alert-dark" v-for="item in paginatedItem" :key="item.$loki">
      
      <h4>{{item.name}}</h4>
      <h5>Author {{item.author}}</h5>
      
      <button class="btn btn-dark" @click="showModal(item)">Show more</button>

    </div>

    <div class="pagination d-flex flex-wrap pt-0 pb-0 pl-2 pr-2 mb-2 bg-dark text-white">
      <div class="page-link p-1 mt-2 mb-2 ml-1 mr-1 bg-light text-dark" v-for="page in pages" :key="page" @click="pageClick(page)">
        {{page}}
      </div>
    </div>

    <Modal v-if="isModalShow" @closeModal="closeModal">
      <div class="modal-body">
        <h3 class="mt-3">{{this.showItem.name}}</h3>
        <h4 class="mt-3">Author {{this.showItem.author}}</h4>
        <p class="mt-3 h5"> {{this.showItem.description}} </p>
        <p class="mt-3 h5"> Last version - {{this.showItem.lastversion}} </p>
        <p class="mt-3 h5"> Main file - {{this.showItem.mainfile}} </p>
        <a class="pr-3" v-bind:href="this.showItem.github">Github link</a>
        <a class="pr-3" v-bind:href="this.showItem.homepage">Home Page</a>
      </div>
    </Modal>

  </div>
</template>

<script>
  import Modal from './Modal'
  export default {
    name: "PackageList",
    data() {
      return {
        listPackage: [],
        itemPerPage: 10,
        pageNumber: 1,
        isModalShow: false,
        showItem: {},
      }
    },
    components: {
      Modal,
    },

    computed: {
      pages() {
        if(this.listPackage.length > this.itemPerPage){
          return Math.ceil(this.listPackage.length / this.itemPerPage);
        };
      },

      paginatedItem() {
        let from = (this.pageNumber - 1) * this.itemPerPage;
        let to = from + this.itemPerPage;

        return this.listPackage.slice(from, to);
      }
    },

    methods: {
      async loadListPackage(e) {
        let value = e.target.value;
        
        if(value.trim() !== '') {
          this.listPackage = await fetch(`${this.$store.getters.getApiUrl}*${value.trim()}*`)
                                      .then(response => response.json())
                                      .then(res => res.sort((a,b) => a.$loki > b.$loki ? 1 : -1))
        } else {
          this.listPackage = [];
        };

      },

      pageClick(page) {
        this.pageNumber = page;
      },

      closeModal() {
        this.isModalShow = false;
      },

      showModal(element) {
        this.isModalShow = true;
        this.showItem = element;
      },

    }

  }
</script>

<style>
  .package-list{
    min-height: 100vh;
  }
  .page-link{
    cursor: pointer;
  }
</style>