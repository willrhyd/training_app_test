<template>
<div class="file">
  <form @submit.prevent="onSubmit" enctype="multipart/form-data">
    <div class="fields">
      <label>Upload File</label><br />
      <input type="file" multiple="multiple" ref="file" @change="onSelect" />
    </div>
    <div class="fields">
      <button>Submit</button>
    </div>
    <div class="message">
      <h5>{{message}}</h5>
    </div>
  </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'fileUpload',
  data() {
    return {
      file: "",
      message: ""
    }
  },
  methods: {
    onSelect() {
      // const allowedTypes = ["fit"];
      const file = this.$refs.file.files[0];
      this.file = file;
      console.log(file.type)
      // if(!allowedTypes.includes(file.type)){
      //   this.message= file.name.
      // }
    },
    async onSubmit() {
      let formData = new FormData();
      for (var i = 0; i < this.$refs.file.files.length; i++) {
        let file = this.$refs.file.files[i];
        formData.append('files[' + i + ']', file);
      }
      axios.post('/fileUpload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        }).then(function() {})
        .catch(function() {});
    },
  }
}
</script>
