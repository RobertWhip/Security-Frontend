<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Назва обходу</label>
      <input type="text" v-model="name" name="name" placeholder="обхід будинку..." />
    </div>
    <div class="form-control">
      <label>Час початку (hh:mm)</label>
      <input
        type="text"
        v-model="beginTime" 
        name="beginTime"
        placeholder="13:50..."
      />
    </div>
    <div class="form-control form-control-check">
      <label>Сигнал:</label>
      <input type="checkbox" v-model="pushNotification" name="pushNotification" />
      <label>Push оповіщення</label>

      <input type="checkbox" v-model="sms" name="sms" />
      <label>СМС</label>

      <input type="checkbox" v-model="call" name="call" />
      <label>Дзвінок</label>
    </div>

    <input type="submit" value="Додати" class="btn btn-block" />
  </form>
</template>

<script>
export default {
    name: 'AddBypass',
    data() {
        return {
            name: '',
            beginTime: '',
            pushNotification: true,
            sms: false,
            call: false,
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault();

            if (!this.name || !this.beginTime) {
                alert('Будь ласка, вкажіть всі поля');
                return;
            }

            const bypass = {
                name: this.name,
                beginTime: this.beginTime,
                alarmTypes: [
                  this.pushNotification ? 'PUSH_NOTIFICATION' : null,
                  this.sms ? 'SMS' : null,
                  this.call ? 'CALL' : null,
                ].filter(x => x),
            };

            this.$emit('add-bypass', bypass);
            
            this.name = '';
            this.beginTime = '';
            this.pushNotification = true;
            this.sms = false;
            this.call = false;
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