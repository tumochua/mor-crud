<template>
  <div>
    <button to="/add-post" @click="handleAddNewPost" class="btn-add-post">
      Add New Post
    </button>
    <list-table-vue
      :postsOnPage="postsOnPage"
      @deletePost="deletePost"
      :loadingData="loadingData"
    ></list-table-vue>
    <span v-for="(amountPage, index) in pageNumber" :key="index">
      <button class="btn-page" @click="handleAmountPage(amountPage)">
        {{ amountPage }}
      </button>
    </span>
  </div>
</template>

<script>
import ListTableVue from "./ListTable.vue";
import axios from "axios";
export default {
  name: "TableVue",
  data() {
    return {
      getPosts: [],
      loadingData: false,
      amountPages: 10,
      currentPage: 1,
      postsOnPage: [],
    };
  },
  components: {
    // AddPost,
    ListTableVue,
  },
  async created() {
    try {
      this.loadingData = true;
      let res = await axios.get(`https://jsonplaceholder.typicode.com/posts/`);

      this.getPosts = res.data;
      this.loadingData = false;

      console.log("this.getPosts : ", this.getPosts);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    deletePost(id) {
      this.$swal
        .fire({
          title: "Do you want to delete?",
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Ok",
          denyButtonText: `Don't save`,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.postsOnPage = this.postsOnPage.filter(
              (getPost) => getPost.id !== id
            );
            this.$swal.fire("Deleted", "post", "success");
          }
        });
    },
    handleCreatePost(post) {
      this.getPosts.push(post);
    },
    handleAmountPage(value) {
      console.log("check value ", value);
      this.currentPage = value;
      this.postsOnPage = this.getPosts.slice(this.startPost, this.endPost);
    },
    handleAddNewPost() {
      this.$router.push("/add-post");
    },
  },
  computed: {
    startPost() {
      const startPost = (this.currentPage - 1) * this.amountPages;
      return startPost;
    },
    endPost() {
      const endPost = this.startPost + this.amountPages;

      return endPost;
    },
    postAmount() {
      let postAmount = this.getPosts.length;
      return postAmount;
    },
    pageNumber() {
      let pageNumber = this.postAmount / this.amountPages;
      return Math.ceil(pageNumber);
    },
  },
  watch: {
    getPosts: {
      immediate: true,
      handler() {
        this.handleAmountPage(this.currentPage);
      },
    },
  },
};
</script>

<style scoped>
.btn-page {
  cursor: pointer;
  padding: 8px 30px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 40px;
}
.btn-add-post {
  padding: 10px 20px;
  border: none;
  background: #198754;
  border-radius: 4px;
  cursor: pointer;
  color: #ffff;
}
</style>
