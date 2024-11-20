<script setup>
import NavBar from './components/NavBar.vue';
import HorseList from './components/HorseList.vue';
import RaceTrack from './components/RaceTrack.vue';
import RaceSchedule from './components/RaceSchedule.vue';
import Results from './components/Results.vue';
</script>

<template>
  <NavBar />
  <div class="main">
    <div class="horse-list">
      <HorseList />
    </div>
    <div class="race-track">
      <RaceTrack />
    </div>
    <div class="schedule-results">
      <div class="schedule">
        <RaceSchedule />
      </div>
      <div class="results">
        <Results />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: grid;
  grid-template-columns: 1fr 2fr 1.5fr;
  gap: 20px;
  padding: 20px;
  max-height: 100dvh;
  overflow: hidden;
}

/**
* Horse List 
*/
.horse-list {
  grid-column: 1;
  display: flex;
  flex-direction: column;
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 75vh;
}


/**
* Race Track 
*/
.race-track {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 75vh;
}

/**
* Schedule and Results Side by Side 
*/
.schedule-results {
  grid-column: 3;
  display: flex;
  gap: 20px;
}

.schedule,
.results {
  flex: 1;
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 75vh;
}

/**
* Responsive Design 
*/
@media (max-width: 1200px) {
  .main {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .horse-list,
  .race-track,
  .schedule-results {
    grid-column: 1;
    padding: 10px;
  }

  .schedule-results {
    flex-direction: column;
  }
}
</style>
