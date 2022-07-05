<template>
  <div class="header-input">
    <h1>Add New Post</h1>
    <div>
      <input
        placeholder="title"
        v-model="createPost.title"
        class="form-control"
      />
      <p v-if="error" class="error-validtion">This field is required</p>
    </div>
    <div>
      <input
        placeholder="body"
        v-model="createPost.body"
        class="form-control"
      />
      <p v-if="error" class="error-validtion">This field is required</p>
    </div>
    <!-- <button @click="handleCreatePost" class="create-post">Add</button> -->
    <custom-btn
      :buttonText="customBtn.btnAdd.buttonText"
      :dark="customBtn.btnAdd.dark"
      @click="handleCreatePost"
    ></custom-btn>
    <custom-btn
      :buttonText="customBtn.btnBack.buttonText"
      :dark="customBtn.btnBack.dark"
      @click="handleBack"
      class="btn-add"
    ></custom-btn>
  </div>
</template>

<script>
import CustomBtn from "@/CustomBtn.vue";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export default {
  name: "HeaderVue",
  components: {
    CustomBtn,
  },
  data() {
    return {
      error: false,
      createPost: {
        title: "",
        body: "",
        id: "",
      },
      customBtn: {
        btnAdd: {
          buttonText: "Add",
          dark: false,
        },
        btnBack: {
          buttonText: "Back",
          dark: false,
        },
      },
    };
  },
  methods: {
    async handleCreatePost() {
      try {
        this.createPost.id = uuidv4();
        if (!this.createPost.title.trim() || !this.createPost.body.trim()) {
          this.error = true;
        } else {
          this.$emit("handleCreatePost", this.createPost);
          this.$router.push("/");
        }
        const res = await axios.post(
          `https://jsonplaceholder.typicode.com/posts/${this.createPost}`
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    handleBack() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.header-input {
  margin: 40px;
}
.form-control {
  width: 40%;
  margin-bottom: 20px;
  padding: 15px;
}
.error-validtion {
  color: red;
}
.btn-add {
  background-color: #198754;
}
</style>
