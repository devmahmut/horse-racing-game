<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const results = computed(() => store.state.results);
const horses = computed(() => store.state.horses);
const getHorseColor = (id) => {
    const horse = horses.value.find(h => h.id === id);
    return horse ? horse.color : '#000';
};
</script>

<template>

    <div>
        <ol>
            <h2>Results</h2>
            <li v-for="result in results" :key="result.round">
                <div class="race-round">
                    <span>{{ result.round }}st Lap - Result</span>
                    <span>Good Luck!</span>
                </div>
                <div class="horse-name" v-for="horse in result.horses" :key="horse.id">
                    <div :style="{ color: getHorseColor(horse.id) }">{{ horse.position }}</div>
                    <span>{{ horse.name }}</span>
                </div>
            </li>
        </ol>
    </div>
</template>

<style scoped>
h2 {
    font-size: clamp(1.3rem, 1vw + 1.6rem, 3rem);
    margin: 0;
    text-align: center;
}

ol {
    list-style: none;
    padding: 1.5rem;
    columns: 16rem;
    column-gap: calc(var(--pad) * 2);
    border-radius: 0.5rem;
}

li:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

li {
    --y: calc(100% - 2rem);
    background: radial-gradient(circle at 30% var(--y), rgb(50 50 50), rgb(0 0 0));
    color: white;
    border-radius: 0.75rem;
    overflow: hidden;
    box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 0.17)
}

li+li {
    margin-top: 2rem;
}

.race-round {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid;
}

.horse-name {
    display: flex;
}

.horse-name div {
    counter-increment: list-item -1;
    content: counter(list-item);
    font-weight: 700;
    font-size: 4.5em;
    letter-spacing: -0.125em;
    line-height: 1;
    grid-column: 1;
    grid-row: span 2;
    align-self: end;
    margin: 0 0 -0.15em -0.15em;
}

.horse-name span:first-of-type {
    font-size: 1.5em;
    padding-top: 1rem;
}

.horse-name span:last-of-type {
    font-style: italic;
    padding-bottom: 1rem;
}
</style>