<template>
      <Button @btn-click="toggleAddBypass" :text="showAddBypass ? 'Сховати' : 'Додати обід'" color="black" style="width:100%"/>
      <div v-show="showAddBypass">
        <AddBypass @add-bypass="addBypass" />
      </div>
      <Bypasses 
        @delete-bypass="deleteBypass" 
        :bypasses="bypasses" />
</template>

<script>
import _ from 'lodash';
import request from 'request-promise';

import Bypasses from '../components/Bypasses';
import AddBypass from '../components/AddBypass';
import Button from '../components/Button';

export default {
  name: 'App',
  components: {
    Bypasses,
    AddBypass,
    Button,
  },
  data() {
    return {
      bypasses: [],
      showAddBypass: false,
      url: process.env.VUE_APP_API_URL,
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    }
  },
  methods: {
    async reloadBypasses() {
      this.bypasses = await this.getBypasses();
    },

    async getBypasses() {
      const res = await request.get(`${this.url}/bypasses`, { headers: this.headers });
      return JSON.parse(res);
    },

    toggleAddBypass() {
      this.showAddBypass = !this.showAddBypass;
    },
    async addBypass(bypass) {
      const result = await request.post(`${this.url}/bypasses`, {
          headers: this.headers,
          body: JSON.stringify(bypass)
        });

      await this.reloadBypasses();
    },
    async deleteBypass(id) {
      const result = await request.delete(`${this.url}/bypasses?ids=[${id}]`, {
          headers: this.headers,
        });

      await this.reloadBypasses();
    },
  },
  async created() {
    if (!localStorage.getItem('token'))
        this.$router.push({ name: 'Login' });

    await this.reloadBypasses();
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Poppins', sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
