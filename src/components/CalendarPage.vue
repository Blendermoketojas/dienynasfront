<template>
  <AppLayout></AppLayout>
  <div class="calendar-page">
    <vue-cal
      style="height: 80vh"
      :time-from="8 * 60"
      :events="events"
      :on-event-click="onEventClick"
      locale="lt"
    />
    <div class="backdrop" v-show="showDialog" @click="closeDialog"></div>
    <div class="cardBackground">
      <v-dialog v-show="showDialog" @click.stop ref="dialogRef">
        <v-card>
          <v-card-title class="w-card__title">
            <span>{{ selectedEvent.title }}</span>
            <v-spacer />
            <div class="selectedTitleDate">
              <strong>{{
                selectedEvent.start && selectedEvent.start.format("DD/MM/YYYY")
              }}</strong>
            </div>
          </v-card-title>
          <v-card-text>
            <p v-html="selectedEvent.contentFull" />
            <strong>Laikas:</strong>
            <ul>
              <li>
                Pradžia:
                {{ selectedEvent.start && selectedEvent.start.formatTime() }}
              </li>
              <li>
                Pabaiga:
                {{ selectedEvent.end && selectedEvent.end.formatTime() }}
              </li>
            </ul>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
  <button  @click="goToAddCalendarEvent" class="circular-button">+</button>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import AppLayout from "./Layout.vue";

export default {
  components: {
    AppLayout,
    VueCal,
  },
  name: "CalendarPage",
  data: () => ({
    selectedEvent: {},
    user: null,
    showDialog: false,
    events: [  {
              start: "2023-11-01 14:00",
              end: "2023-11-05 18:00",
              title: "Praktika",
              content: "Praktikos aprašymas",
              contentFull: 'Praktika atliekama UAB "VLANTANA"',
              class: "",
            },],
    mounted() {
      this.$axios
        .get("/api/user")
        .then((response) => {
          this.user = response.data;
          this.events = [
            {
              start: "2023-11-01 14:00",
              end: "2023-11-03 18:00",
              title: "Praktika",
              content: "Praktikos aprašymas",
              contentFull: "",
              class: "",
            },
          ];
        })
        .catch((error) => {
          console.error(error);
        });
    },
  }),
  methods: {
    goToAddCalendarEvent(){
this.$router.push('/addevent');
    },
    onEventClick(event, e) {
      this.selectedEvent = event;
      this.showDialog = !this.showDialog;
      e.stopPropagation();
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
};
</script>

<style scoped>
.circular-button {
  position: fixed; 
  right: 20px;     
  bottom: 20px;    
  width: 50px;     
  height: 50px;    
  border-radius: 50%; 
  text-align: center; 
  line-height: 50px; 
  background-color: #007bff; 
  color: white; 
  border: none; 
  font-size: 24px; 
  cursor: pointer; 
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2); 
  z-index: 1000; 
}
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: block;
}

.vuecal__event {
  cursor: pointer;
}

.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
  margin: 5px 8px;
}

.vuecal__event-time {
  display: inline-block;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.vuecal__event-content {
  font-style: italic;
}

.w-card__title {
  display: flex;
  justify-content: space-between;
  padding: 8px 12px;
  font-size: 1.3em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  background-color: #42b983;
}
ul {
  margin: 0;
  padding: 15px;
}

v-dialog {
  min-width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 3;
}
v-card-text {
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
}
</style>
