<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const currentRound = computed(() => {
    const round = store.state.raceSchedule.find(
        r => r.round === store.state.currentRound
    );
    return round ? round.horses : [];
});
const isRaceRunning = computed(() => store.state.isRaceRunning);

const generateHorses = () => {
    store.dispatch('generateHorses');
};

const toggleRace = () => {
    store.dispatch('toggleRace');
};

</script>

<template>
    <div>
        <div v-if="currentRound.length" v-for="horse in currentRound" :key="horse.name" class="track-row">
            <div class="start-door">{{ horse.position }}</div>
            <div class="race-line">
                <div class="racehorse" :class="{ running: isRaceRunning }" :style="{
                    animationDuration: `${store.state.raceSchedule.find(r => r.round === store.state.currentRound).distance / horse.speed}s`,
                }">
                    <img src="/src/assets/horse-images/horse.svg" width="64" alt="">
                </div>
            </div>
        </div>
        <div v-else>
            <p>There are no races to show.
                <button @click="generateHorses">
                    Generate your horses
                </button>,
                and start racing!
            </p>
        </div>
    </div>
</template>

<style scoped>
.track-row {
    display: flex;
    align-items: flex-start;
    height: 100%;
    max-height: min-content;
}

.start-door {
    padding: 20px 10px;
    background-color: #32a852;
    text-align: center;
    border: 2px solid #fff;
    max-width: min-content;
    max-height: min-content;
}

.race-line {
    border-top: 2px dashed;
    width: 100%;
    font-size: 40px;
    position: relative;
}

.racehorse {
    position: absolute;
    left: 0;
}

.track-row:first-child .race-line {
    border-top: none;
}

.racehorse.running {
    animation-name: run;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    /* Animasyon tamamlandığında durdur */
}

p {
    text-align: center;
}

button {
    border: none;
    background: none;
    font-weight: bold;
    font-size: medium;
    cursor: pointer;
    padding: 0;
    color: #ff0000;
}

@keyframes run {
    0% {
        left: 0;
    }

    100% {
        left: 100%;
    }
}
</style>
