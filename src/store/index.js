import { createStore } from 'vuex';

const store = createStore({
  state: {
    horses: [], 
    raceSchedule: [],
    results: [], 
    isRaceRunning: false,
    currentRound: 1, 
    raceInterval: null, 
    isHorsesGenerated: false, 
  },
  mutations: {
    setHorses(state, horses) {
      state.horses = horses;
      state.isHorsesGenerated = true;
    },
    setRaceSchedule(state, schedule) {
      state.raceSchedule = schedule;
    },
    addRaceResult(state, result) {
      state.results.push(result);
    },
    setRaceRunning(state, status) {
      state.isRaceRunning = status;
    },
    setCurrentRound(state, round) {
      state.currentRound = round;
    },
    setHorsesGenerated(state, status) {
      state.isHorsesGenerated = status;
    },
  },
  actions: {
    generateHorses({ commit, dispatch }) {
      const names = [
        "Grace Hopper",
        "Margaret Hamilton",
        "Joan Clarke",
        "Ada Lovelace",
        "Alan Turing",
        "Dennis Ritchie",
        "Ken Thompson",
        "Barbara Liskov",
        "Donald Knuth",
        "Linus Torvalds",
        "Tim Berners-Lee",
        "Guido van Rossum",
        "Brendan Eich",
        "Bjarne Stroustrup",
        "John McCarthy",
        "James Gosling",
        "Vint Cerf",
        "Brian Kernighan",
        "Doug Engelbart",
        "Marvin Minsky",
      ];

      const horses = names.map((name, index) => ({
        id: index + 1,
        name,
        condition: Math.floor(Math.random() * 100) + 1,
        color: `hsl(${index * 18}, 70%, 50%)`,
      }));

      commit('setHorses', horses);
      dispatch('generateRaceSchedule');
    },
    generateRaceSchedule({ commit, state }) {
      const schedule = Array.from({ length: 6 }, (_, i) => ({
        round: i + 1,
        distance: 1200 + i * 200,
        horses: [...state.horses]
          .sort(() => Math.random() - 0.5)
          .slice(0, 10)
          .map((horse, position) => ({
            position: position + 1,
            name: horse.name,
            color: horse.color,
          })),
      }));
      commit('setRaceSchedule', schedule);
    },
    runRace({ commit, state }) {
      if (!state.isRaceRunning || state.currentRound > state.raceSchedule.length) {
        return;
      }
    
      const currentRoundData = state.raceSchedule.find(r => r.round === state.currentRound);
    
      if (currentRoundData) {
        const horsesWithPerformance = currentRoundData.horses.map(horse => ({
          ...horse,
          performance: horse.position + Math.random() * 10 - 5,
        }));
    
        const sortedHorses = horsesWithPerformance
          .sort((a, b) => a.performance - b.performance)
          .map((horse, index) => ({
            ...horse,
            position: index + 1,
          }));
    
        const result = {
          round: currentRoundData.round,
          horses: sortedHorses,
        };
    
        commit('addRaceResult', result);
        commit('setCurrentRound', state.currentRound + 1);
      }
    
      if (state.currentRound > state.raceSchedule.length) {
        commit('setRaceRunning', false);
      }
    },
    
    toggleRace({ commit, state, dispatch }) {
      const newStatus = !state.isRaceRunning;
      commit('setRaceRunning', newStatus);

      if (newStatus) {
        commit('setCurrentRound', 1);

        state.raceInterval = setInterval(() => {
          const currentRoundData = state.raceSchedule.find(r => r.round === state.currentRound);
          if (state.isRaceRunning && currentRoundData) {
            dispatch('runRace');
          } else {
            clearInterval(state.raceInterval);
          }
        }, 8000);
      } else {
        clearInterval(state.raceInterval);
      }
    },
  },
});

export default store;
