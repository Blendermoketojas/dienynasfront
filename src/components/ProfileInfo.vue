<template>
  <AppLayout></AppLayout>
  <div class="mainBody">
    <form class="profileInfoMain" @submit.prevent="updateProfile">
      <div class="iconDiv">
        <img class="userIcon" :src="userIcon" alt="UserIcon" />
      </div>
      <div class="fieldDiv">
        <label for="name">Vardas</label>
        <input v-model="userProfile.first_name" type="text" />
      </div>
      <div class="fieldDiv">
        <label for="surname">Pavardė</label>
        <input v-model="userProfile.last_name" type="text" />
      </div>
      <div class="fieldDiv">
        <label for="description">Aprašymas</label>
        <textarea v-model="userProfile.description" rows="4" cols="25" />
      </div>
      <button type="submit">Atnaujinti</button>
    </form>
  </div>
</template>

<script>
import AppLayout from "./Layout.vue";
import axios from 'axios';

export default {
  components: {
    AppLayout,
  },
  data() {
    return {
      kvkLogo: require("@/assets/Photos/KVKlogo.png"),
      userIcon: require("@/assets/Photos/UserIcon.png"),
      userProfile:{
      firstName: "",
      lastName: "",
      description: "",
      },
    };
  },
  mounted(){
this.fetchUserProfile()
  },
  methods: {
    async fetchUserProfile() {
     
      const userInfoString = localStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);

      const userId=userInfo.user.id;
console.log(userId);
      try {

        const response = await axios.post('http://127.0.0.1:8000/api/userinfo', { userId: userId });
        

        this.userProfile=response.data;
        console.log(this.userProfile);

      } catch (error) {
        console.error('An error occurred while fetching the user profile:', error);
      }
    

    },
    async updateProfile() {
     
      const userInfoString = localStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);
      const userId = userInfo.user.id;
      console.log(userId);
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/updateprofile', {
          profileId: userId,
          firstName: this.userProfile.first_name,
          lastName: this.userProfile.last_name,
          description: this.userProfile.description
        });
        alert('Profile updated successfully!');
        console.log('Profile updated successfully', response.data);
      } catch (error) {
        alert('Profile update failed!');

        console.error('An error occurred while updating the user profile:', error);
      }
    }
  },
};
</script>

<style scoped>
.mainBody {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
.profileInfoMain {
  background-color: rgb(207, 209, 209);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  background-image: linear-gradient(rgb(158, 152, 216), rgb(101, 105, 190));
  height: 65%;
  width: 35%;
  display: flex;
  justify-content: space-evenly;
  padding: 3%;
  flex-direction: column;
  border-radius: 10px;
  align-items: center;
}
.iconDiv {
  width: 70px;
  height: 70px;
  justify-content: center;
}
.userIcon {
  width: 100%;
  height: 100%;
}
.fieldDiv {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  padding: 0 20%;
}
.fieldDiv input {
  border-radius: 5px;
  height: 30px;
}
button{
  width: 40%;
  border-radius: 5px;
border: none;
height: 40px;

}
button:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
</style>
