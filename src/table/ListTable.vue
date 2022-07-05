<template>
  <div class="list-table">
    <keep-alive>
      <table id="customers">
        <tr style="border: 1px solid #f2f2f2">
          <th scope="col" v-for="table in tables" :key="table.id">
            {{ table.name }}
          </th>
          <th scope="col">Action</th>
        </tr>
        <div v-if="loadingData">loading ...</div>
        <tr v-for="getPost in postsOnPage" :key="getPost.id">
          <th scope="col" v-for="table in tables" :key="table.id">
            <div>{{ getPost[table.name] }}</div>
          </th>
          <th scope="col" class="btn-actions" style="border: none">
            <custom-btn
              :buttonText="customBtn.btnUpadte.buttonText"
              :dark="customBtn.btnUpadte.dark"
              @click="handleUpdate(getPost.id)"
            ></custom-btn>
            <custom-btn
              :buttonText="customBtn.btnEdit.buttonText"
              :dark="customBtn.btnEdit.dark"
              @click="handleEdit(getPost.id)"
            ></custom-btn>
            <custom-btn
              :buttonText="customBtn.btnDelete.buttonText"
              :dark="customBtn.btnDelete.dark"
              @click="handleDelete(getPost.id)"
            ></custom-btn>
          </th>
        </tr>
      </table>
    </keep-alive>
  </div>
</template>

<script>
import CustomBtn from "@/CustomBtn.vue";
export default {
  components: {
    CustomBtn,
  },
  name: "ListTable",

  data() {
    return {
      couter: 0,
      tables: [
        {
          id: 1,
          name: "id",
        },
        {
          id: 2,
          name: "title",
        },
        {
          id: 3,
          name: "body",
        },
        // {
        //   id: 4,
        //   name: "Actions",
        // },
      ],
      customBtn: {
        btnDelete: {
          buttonText: "Delete",
          dark: true,
        },
        btnUpadte: {
          buttonText: "Detail",
          dark: false,
        },
        btnEdit: {
          buttonText: "Edit",
          dark: false,
        },
      },
    };
  },
  props: {
    postsOnPage: {
      type: Array || null,
      require: true,
      default: [],
    },
    loadingData: {
      type: Boolean.apply,
      default: "",
    },
  },
  methods: {
    handleDelete(id) {
      this.$emit("deletePost", id);
    },
    handleUpdate(getPosts) {
      this.$router.push(`/detail/${getPosts}`);
    },
    handleEdit(getPosts) {
      this.$router.push(`/edit/${getPosts}`);
    },
  },
  // unmounted() {
  //   console.log("unmounted listable");
  // },
  // mounted() {
  //   console.log("mounted listable");
  // },
};
</script>

<style scoped>
.btn-actions {
  display: flex;
  /* padding: 20px; */
}
#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 50px;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}
#customers tr {
  border: 1px solid #ddd;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  /* background-color: red; */
  /* background-color: #f2f2f2; */
}
</style>
