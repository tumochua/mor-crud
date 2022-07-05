<template>
  <div class="edit-post">
    <div v-if="loading">loading..</div>
    <h1>Edit Post id : {{ this.$route.params.id }}</h1>
    <div>
      <label>UserId</label> <br />
      <input v-model="detailPost.id" class="form-control" />
    </div>
    <div>
      <label>Title</label> <br />

      <input v-model="detailPost.title" class="form-control" />
    </div>
    <div>
      <label>Body</label> <br />

      <input v-model="detailPost.body" class="form-control" />
    </div>

    <custom-btn
      :buttonText="customBtn.btnBack.buttonText"
      :dark="customBtn.btnBack.dark"
      @click="handleBack"
    ></custom-btn>
    <!-- <custom-btn
      :buttonText="customBtn.btnUpdate.buttonText"
      @click="handleUpdate"
    ></custom-btn> -->
    <button @click="handleUpdate" class="btn-update">Update</button>
  </div>
</template>

<script>
import CustomBtn from "@/CustomBtn.vue";
import axios from "axios";
export default {
  name: "DetailPost",
  components: {
    CustomBtn,
  },
  data() {
    return {
      detailPost: [],
      loading: true,
      customBtn: {
        btnUpdate: {
          buttonText: "Update",
          dark: true,
        },
        btnBack: {
          buttonText: "Back",
          dark: false,
        },
      },
    };
  },
  async created() {
    let id = this.$route.params.id;
    try {
      let res = await axios.get(
        ` https://jsonplaceholder.typicode.com/posts/${id}`
      );
      this.detailPost = res.data;
      console.log("check this.detailPost : ", this.detailPost);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    async handleUpdate() {
      try {
        await axios.put(
          `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`,
          {
            body: this.detailPost,
          }
        );
      } catch (error) {
        console.log(error);
      }
      this.$router.push("/");
    },
    handleBack() {
      this.$router.push("/");
    },
  },
  // unmounted() {
  //   console.log("unmounted detaipost");
  // },

  // mounted() {
  //   console.log("mounted detaipost");
  // },
};
</script>

<style scoped>
.edit-post {
  width: 50%;
  box-shadow: 0 4px 10px rgb(0 0 0 / 20%), 6px 12px 20px rgb(0 0 0 / 10%);
  margin: 0 auto;
  padding: 10px;
}
.form-control {
  width: 40%;
  margin-bottom: 20px;
  padding: 15px;
}
.btn-update {
  color: #fff;
  background-color: #ffc107;
  border: none;
  text-align: center;
  font-size: 16px;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 15px;
}
</style>
