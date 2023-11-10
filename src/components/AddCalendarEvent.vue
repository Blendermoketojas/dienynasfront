<template>
  <AppLayout></AppLayout>

  <div class="main">
    <div class="middleBackground">
      <div class="content">
        <div>
          <label for="start">Pradžios data:</label>
          <input type="date" id="start" v-model="startDate" />
        </div>
        <div>
          <label for="end">Pabaigos data :</label>
          <input type="date" id="end" v-model="endDate" />
        </div>
        <div>
          <label for="company">Kompanija:</label>
          <select name="company" id="company" v-model="selectedCompany">
            <option
              v-for="company in companies"
              :key="company.id"
              :value="company.id"
            >
              {{ company.company_name }}
            </option>
          </select>
        </div>
        <div>
          <button @click="submitData">Pateikti</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLayout from "./Layout.vue";
import axios from "axios";

export default {
  components: {
    AppLayout,
  },
  data() {
    let today = new Date().toISOString().substr(0, 10);
    return {
      startDate: today,
      endDate: today,
      companies: [],
      selectedCompany: null,
    };
  },
  mounted() {
    this.fetchCompanies();
  },
  methods: {
    fetchCompanies() {
  
      axios
        .get("http://127.0.0.1:8000/api/retrievecompanydata")
        .then((response) => {
          this.companies = response.data;
        })
        .catch((error) => {
          console.error("There was an error fetching the companies:", error);
        });
    },

    submitData() {
      let userInfoString = localStorage.getItem('userInfo');
    let userID; 

    if (userInfoString) {
      let userInfo = JSON.parse(userInfoString);
      userID = userInfo.user.id; 
    } else {
      console.error('User info not found in localStorage.');
      return;
    }

      const formData = {
        date_from: this.startDate,
        date_to: this.endDate,
        company_id: this.selectedCompany,
        user_id: userID, 
      };

      axios.post('http://127.0.0.1:8000/api/sendevent', formData)
        .then(response => {
          console.log('Data submitted successfully', response.data);
        })
        .catch(error => {
          console.error('An error occurred:', error.response);
        });
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  height: 25px;
}
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.middleBackground {
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
</style>
