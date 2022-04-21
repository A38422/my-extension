<template>
  <div id="app">
    <img src="assets/logo.png" alt="logo" width="70px" height="80px" />
    <h1>Url List</h1>
    <label for="url"><input type="text" placeholder="Link" v-model="newLink" id="url"></label><br>
    <label for="image"><input type="text" placeholder="Image" v-model="newImage" id="image">
    </label><br>
    <b-button variant="success" v-if="!edit" @click="pushLink(); setVal();" id="add">Add</b-button>
    <b-button variant="warning" v-else @click="updateLink()" id="update">Update</b-button>
    <table>
      <tr style="text-align: center">
        <th>Avatar</th>
        <th>Url</th>
        <th>Actions</th>
      </tr>
      <tr v-for="(link, index) in links" :key="index">
        <td>
          <img :src="link.image" class="uploading-image" alt="" width="40px" height="40px" />
        </td>
        <td>
          <a :href="link.content" target="_blank">{{ link.content }}</a>
        </td>
        <td>
          <b-button variant="primary" @click="editLink(index, link)" id="edit">Edit</b-button>
          <b-button variant="danger" @click="removeVal(index)" id="delete">Delete</b-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      newImage: '',
      newLink: '',
      links: [],
      edit: false,
      selectedIndex: null,
    };
  },
  created() {
    this.getVal();
  },
  methods: {
    pushLink() {
      if (this.newImage && this.newLink) {
        this.links.push({ content: this.newLink, image: this.newImage });
      }
    },
    setVal() {
      localStorage.setItem('links', JSON.stringify(this.links));
      this.newLink = '';
      this.newImage = '';
    },
    getVal() {
      if (localStorage.getItem('links')) {
        this.links = JSON.parse(localStorage.getItem('links'));
      }
    },
    removeVal(index) {
      this.links.splice(index, 1);
      localStorage.setItem('links', JSON.stringify(this.links));
      if (this.edit) {
        this.edit = false;
      }
    },
    editLink(index, link) {
      this.newLink = link.content;
      this.newImage = link.image;
      this.selectedIndex = index;
      this.edit = true;
    },
    updateLink() {
      this.links.splice(this.selectedIndex, 1, {
        content: this.newLink,
        image: this.newImage,
      });
      this.edit = false;
      localStorage.setItem('links', JSON.stringify(this.links));
      this.newLink = '';
      this.newImage = '';
    },
  },
};
</script>

<style lang="scss">
input {
  border-radius: 0.25rem;
  min-height: auto;
  padding: 0.33em 0.75em;
  background: transparent;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  display: block;
  width: 100%;
  border-color: #4f4f4f;
  border: 0.5px solid;
}

table {
  margin-left: auto;
  margin-right: auto;
  text-align: left;
  margin-top: 15px;
}

tr, td, th {
  border-bottom: 0.5px solid;
  border-color: inherit;
  padding-bottom: 10px;
  padding-top: 10px;
}

* {
  margin: 0;
  padding: 0;
  background: pink;
}

#edit {
  margin-left: 10px;
  margin-right: 10px;
}

img {
  margin-right: 10px;
}

body {
  background: pink;
}

#app {
  margin-top: 50px;
  text-align: center;
  margin-left: 10px;
  min-width: 500px;
  min-height: 700px;
  font-family: inherit;
}
</style>
