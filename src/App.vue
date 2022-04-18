<template>
  <div id="app">
    <label for="url">Link<input type="text" v-model="newLink" id="url"></label><br>
    <label for="Image"><input type="file" accept="image/*"
           @change="uploadImage($event)" id="Image"></label><br>
    <button v-if="!edit" @click="links.push({ content: newLink, image: newImage});
            setVal();" id="add">Add</button>
    <button v-else @click="updateLink()" id="update">Update</button>
    <div v-for="(link, index) in links" :key="index">
      <img :src="link.image" class="uploading-image" alt="" width="40px"
           height="40px" />
      <a :href="link.content" target="_blank">{{ link.content }}</a>
      <button @click="editLink(index, link)" id="edit">Edit</button>
      <button @click="removeVal(index)" id="delete">Delete</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'imageUpload',
  data() {
    return {
      newImage: null,
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
    setVal() {
      localStorage.setItem('links', JSON.stringify(this.links));
      this.newLink = '';
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
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (event) => {
        this.newImage = event.target.result;
      };
    },
    editLink(index, link) {
      if (this.newLink) {
        this.newLink = link.content;
      } else {
        this.newLink = '';
      }
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
    },
  },
};
</script>

<style lang="scss">
label {
  font-size: 14px;
  margin-top: 10px;
  margin-left: 20px;
}

button, input {
  overflow: visible;
  margin-left: 5px;
}

#add {
  background-color: green;
  border: none;
  outline: none;
  color: white;
  text-align: center;
  margin-left: 25px;
}

#update {
  background-color: violet;
  border: none;
  outline: none;
  color: white;
  margin-left: 25px;
}

img {
  margin: 5px 5px 5px 5px;
}

#edit {
  background-color: blue;
  color: white;
  margin-left: 5px;
  border: none;
  outline: none;
}

#delete {
  background-color: red;
  color: white;
  border: none;
  outline: none;
}

#app {
  margin-left: 10px;
  min-width: 550px;
}
</style>
