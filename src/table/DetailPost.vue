<template>
  <div>
    <div v-if="loading">loading..</div>
    <label>Deatil Post id: {{ this.$route.params.id }}</label>
    <table id="customers">
      <tr>
        <th>id</th>
        <th>userId</th>
        <th>title</th>
        <th>body</th>
      </tr>
      <tr>
        <td>{{ detailPost.id }}</td>
        <td>{{ detailPost.userId }}</td>
        <td>{{ detailPost.title }}</td>
        <td>{{ detailPost.body }}</td>
      </tr>
    </table>
    <custom-btn
      :buttonText="customBtn.btnBack.buttonText"
      :dark="customBtn.btnBack.dark"
      @click="handleBack"
    ></custom-btn>
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
.form-control {
  width: 40%;
  margin-bottom: 20px;
  padding: 15px;
}
/* .edit-post {
  color: #fff;
  background-color: #337ab7;
  border: none;
  text-align: center;
  font-size: 16px;
  padding: 10px 42px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 15px;
} */
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04aa6d;
  color: white;
}
</style>
