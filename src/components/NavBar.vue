<script setup>
import { useStore } from 'vuex';

const store = useStore();

const generateHorses = () => {
    store.dispatch('generateHorses');
};

const toggleRace = () => {
    store.dispatch('toggleRace');
};
</script>

<template>
    <div class="nav-bar">
        <h2>Horse Racing</h2>
        <div class="nav-btn-group">
            <button @click="generateHorses">Generate Horses</button>
            <button @click="toggleRace" :disabled="!store.state.isHorsesGenerated">
                {{ store.state.isRaceRunning ? 'Stop' : 'Start' }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.nav-bar {
    background-color: #eb4034;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 0.17);
    --y: calc(100% - 2rem);
    background: radial-gradient(circle at 30% var(--y), rgb(50 50 50), rgb(0 0 0));
    color: white;
}

h2 {
    color: #fff;
}

.nav-btn-group {
    display: flex;
    align-items: center;
    gap: 20px;
}

button {
    text-decoration: none;
    display: inline-block;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    font-weight: 700;
    background: radial-gradient(circle at 30% var(--y), rgb(255, 0, 0), rgb(219, 104, 104))
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}
</style>
