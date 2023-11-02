
<template>
  <div>
    <div class="header">
      <img :src="kvkLogo" alt="KVK Logo">
    </div>
    <div class="mainLogin">
      <h1>Įveskite prisijungimo duomenis</h1>
      <form @submit.prevent="login">
        <div>
          <label for="username">Prisijungimo vardas</label>
          <input v-model="username" type="text">
        </div>
        <div>
          <label for="password">Slaptažodis</label>
          <input v-model="password" type="password">
        </div>
        <button type="submit">Prisijungti</button>
      </form>
    </div>
    <footer>
        <div class="footerText">
            <h2>©2023</h2>
            <a class="footerA" href="https://www.kvk.lt/">Klaipėdos valstybinė kolegija</a>
        </div>
        <img class='footerLogo' :src="kvkLogo" alt="footerLogo">
        </footer>
  </div>
</template>

<script>
export default {
    name: 'UserLogin',
  data() {
    return {
      kvkLogo: require('@/assets/Photos/KVKlogo.png'),
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await this.$axios.post('http://127.0.0.1:8000/api/LoginCheck', {
        username: this.username,
        password: this.password
        });

        localStorage.setItem('userInfo', JSON.stringify(response.data));
      this.userInfo = response.data;
        if (response.data.message === 'Login successful') {
        this.$router.push({ name: 'MainPage', params: { username: this.username } });
        } else {
        // Handle login error, e.g., showing an error message to the user
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
        // Handle login error, e.g., showing an error message to the user
        }
      }
      
    }
  }
}
</script>

<style scoped>

.header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6rem;
    background: linear-gradient(141deg, #58acfa 0%, #81bef7 51%, #a9d0f5 75%);
}
img {
    width: 10%;
    height: 70%;
    display: block;
    margin: 1% auto;
}

body {
    font-family: sans-serif;
    line-height: 3;
}

.mainLogin {
    text-align: center;
}
form {
    width: 24%;
    margin: 0 auto;
    text-align: right;
}
label {
    margin: 0 1em 0 0;
    width: 10em;
    vertical-align: middle;
}
input {
    padding: 0.5em 0.6em;
    border: 1px solid #ccc;
}
button {
    width: 50%;
    background-color: #58acfa;
    color: #fff;
    float: right;
    padding: 0.5em 1em;
    border: none rgba(0, 0, 0, 0);
    line-height: normal;
}
h1 {
    margin: 1em 0;
    font-size: 2em;
    font-weight: 900;
}
a {
    display: block;
}
footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    height: 5rem;
    background: linear-gradient(141deg, #58acfa 0%, #81bef7 51%, #a9d0f5 75%);
    width: 100%;
    bottom: 0;
}
.footerLogo {
    position: absolute;
    margin-right: 2%;
    height: 4rem;
    margin: 1% 1%;
    right: 0;
    bottom: -6px;
    width: 10%;
}
.footerText {
    width: 70%;
    display: inline-block;
    text-align: center;
}

h2,
.footerA {
    display: inline;
    color: white;
}

</style>