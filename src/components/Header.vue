<template>
    <header> 
        <h1>{{title}}</h1>
        <Button @btn-click="Logout" v-show="homePage" text="Вийти" color="black"/>
    </header>
</template>

<script>
import Button from './Button'
import request from 'request-promise';

export default {
    name: 'Header',
    props: {
        title: {
            type: String,
            default: 'Hello world',
        },
    },
    components: {
        Button
    },  
    data() {
        return {
            url: process.env.VUE_APP_API_URL,
        }
    },
    computed: {
        homePage() {
            return ['/', '/update-bypass'].includes(this.$route.path);
        }
    },
    methods: {
        async Logout() {
            console.log(localStorage.getItem('token'), this.headers)
            if (localStorage.getItem('token')) {
                await request.get(`${this.url}/logout`, { 
                    headers: {
                        Authorization: localStorage.getItem('token'),
                    } 
                });
                localStorage.removeItem('token');
            }
            this.$router.push({ name: 'Login' });
        }
    }
}
</script>

<style scoped>
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>