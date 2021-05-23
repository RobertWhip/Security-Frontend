<template>
    <div class="bypass">
        <h3>{{bypass.name}}
            <i @click="$emit('delete-bypass')" class="fas fa-times"></i>
        </h3>
        <p>Створив: {{bypass.createdByEmployeeName}} {{bypass.createdByEmployeeSurname}}</p>
        <p>Час початку: {{bypass.beginTime}}</p>
        <p style="font-size: 10px">{{bypass.alarmTypes}}</p>
        <router-link :to="{name: 'UpdateBypass', params: {
            _id: bypass.id,
            _name: bypass.name, 
            _beginTime: bypass.beginTime,
            _alarmTypes: bypass.alarmTypes,
          } }" style="color: gray;">Змінити</router-link>
    </div>
</template>

<script>
export default {
    name: 'Bypass',
    props: {
        bypass: Object
    }
}
</script>

<style scope>
.fas {
  color: red;
}
.bypass {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.bypass.reminder {
  border-left: 5px solid green;
}
.bypass h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>