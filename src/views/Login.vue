<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Логін</label>
      <input type="text" v-model="login" name="login" placeholder="username..." />
    </div>
    <div class="form-control">
      <label>Пароль</label>
      <input
        type="password"
        v-model="password" 
        name="password"
        placeholder="********"
      />
    </div>
    <input type="submit" value="Увійти" class="btn btn-block" />
  </form>
</template>

<script>
import _ from 'lodash';
import request from 'request-promise';

export default {
    name: 'Login',
    data() {
        return {
            name: '',
            beginTime: '',
            url: process.env.VUE_APP_API_URL,
            headers: {
                Authorization: process.env.VUE_APP_API_TEST_TOKEN,
            }
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault();

            if (!this.login || !this.password) {
                alert('Будь ласка, вкажіть всі поля');
                return;
            }
            
            try {
              const user = JSON.parse(await request.post(`${this.url}/login`, {
                headers: this.headers,
                body: JSON.stringify({ login: this.login, password: this.password }),
              }));

              if (_.get(user, 'token')) {
                localStorage.setItem('token', user.token);
                this.$router.push({ name: 'Home' });
              }
            } catch(err) {
              console.log(err)
              if (_.get(err, 'statusCode') === 401) {
                alert('Неправильні дані для входу');
              } else {
                alert('Сталася помилка. Будь ласка, спробуйте пізніше');
              }
            }
        }
    }
}
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>