<template>
  <div id="app">
    <div id="top">
      <b-input-group size="lg" class="mb-2" id="link">
        <b-input-group-prepend is-text>
          <b-icon icon="link"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="url" placeholder="https://example.com" v-model="newLink"
                      required pattern="http://.*"></b-form-input>
      </b-input-group>
      <b-input-group size="lg" class="mb-2" id="image">
        <b-input-group-prepend is-text>
          <b-icon icon="camera"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="url" placeholder="*.png, *.jpg, *.jpeg, ..."
                      v-model="newImage">
        </b-form-input>
      </b-input-group>
      <b-button variant="success" v-if="!edit" @click="pushLink(); setVal();" id="add"
                class="mb-2"
                v-b-tooltip="'Add'">
        <b-icon icon="plus-lg"></b-icon>Tạo Mới
      </b-button>
      <b-button variant="warning" v-else @click="updateLink()" id="update" class="mb-2"
                v-b-tooltip="'Update'">
        <b-icon icon="arrow-repeat"></b-icon>Update
      </b-button>
      <b-input-group size="lg" class="mb-2" id="name">
        <b-input-group-prepend is-text>
          <b-icon icon="person"></b-icon>
        </b-input-group-prepend>
        <b-form-input type="text" placeholder="Name"
                      v-model="newName">
        </b-form-input>
      </b-input-group>
    </div>
    <div id="middle">

    </div>
    <div id="bottom">
      <div v-for="(link, index) in links" :key="index" class="content">
        <img :src="link.image" class="uploading-image" alt="" width="80px" height="80px" />
        <div id="url">
          <h4 class="name">{{ link.name }}</h4>
          <a :href="link.content" target="_blank">{{ link.content }}</a>
        </div>
        <div style="position: relative; display: flex;">
          <b-button @click="editLink(index, link)" id="edit" class="mb-2"
                    v-b-tooltip="'Edit'">
            <b-icon icon="pencil" style="color: blue;"></b-icon>
          </b-button>
          <b-button @click="removeVal(index)" id="delete" class="mb-2"
                    v-b-tooltip="'Delete'">
            <b-icon icon="x-lg" style="color: red;"></b-icon>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      newImage: '',
      newLink: '',
      newName: '',
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
      if (this.newImage && this.newLink && this.newName) {
        this.links.push({ content: this.newLink, image: this.newImage, name: this.newName });
      }
    },
    setVal() {
      localStorage.setItem('links', JSON.stringify(this.links));
      this.newLink = '';
      this.newImage = '';
      this.newName = '';
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
      this.newName = link.name;
      this.selectedIndex = index;
      this.edit = true;
    },
    updateLink() {
      this.links.splice(this.selectedIndex, 1, {
        content: this.newLink,
        image: this.newImage,
        name: this.newName,
      });
      this.edit = false;
      localStorage.setItem('links', JSON.stringify(this.links));
      this.newLink = '';
      this.newImage = '';
      this.newName = '';
    },
  },
};
</script>

<style lang="scss">
#top {
  height: 100%;
  background: white;
  position: relative;
  display: flex;
  margin: 30px 30px 30px 30px;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-around;
  justify-content: flex-start;
  align-items: stretch;
}

#name {
  width: 40%;
  font-size: 1.3rem;
}

#middle {
  width: 100%;
  height: 10px;
  background: #fafafa;
}

#link {
  margin-right: 80px;
  width: 40%;
  font-size: 1.3rem;
}

#image {
  width: 40%;
  margin-right: 110px;
}

.content {
  position: relative;
  display: flex;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid #e2dfdf;
  margin-left: 30px;
  margin-right: 30px;
}

a:hover {
  color: black;
  text-decoration: none;
}

#url {
  width: 100%;
  padding-top: 5px;
}

* {
  margin: 0;
  padding: 0;
}

#edit {
  margin-left: 10px;
  margin-right: 10px;
}

img {
  margin-right: 25px;
  display: inline-block;
  border-radius: 50%;
}

a {
  color: black;
  text-decoration: none;
  word-break: break-all;
}

body {
  background: #fafafa;
}

b-form-input {
  font-size: 1.3rem;
}

#edit, #delete {
  background: none;
  outline: none;
  border: none;
}

#bottom {
  width: 100%;
  height: 100%;
  background: white;
}

//#add, #update {
//  margin-right: 50px;
//}

#app {
  margin-top: 50px;
  margin-left: 50px;
  margin-right: 50px;
  min-width: 500px;
  font-family: inherit;
  padding-top: 1px;
  border-radius: 10px;
  display: block;
  background: white;
  box-shadow: 5px 3px 8px #efefef;
}
</style>
