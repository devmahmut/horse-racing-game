import { createStore } from 'vuex';

const store = createStore({
  state: {
    /**
     * Stores all horse information.
     */
    horses: [],

    /**
     * Stores the race schedule 
     * (rounds and participating horses)
     */
    raceSchedule: [],

    /**
     * Stores the results of 
     * complated rounds.
     */
    results: [],

    /**
     * Indicates whether the race 
     * is currently running.
     */
    isRaceRunning: false,

    /**
     * Tracks the current round 
     * number.
     */
    currentRound: 1,

    /**
     * Holds the interval function 
     * for the race
     */
    raceInterval: null,

    /**
     * Indicates whether the horses 
     * have ben generated.
     */
    isHorsesGenerated: false,
  },
  mutations: {
    /**
     * Adds the horses to the state 
     * and marks them as generated
     * @param {object}  state 
     * @param {Array} horses 
     */
    setHorses(state, horses) {
      state.horses = horses;
      state.isHorsesGenerated = true;
    },

    /**
     * Adds the race schedule to the state.
     * @param {object} state 
     * @param {Array} schedule 
     */
    setRaceSchedule(state, schedule) {
      state.raceSchedule = schedule;
    },

    /**
     * Adds a completed round s 
     * result to the results list
     * @param {object} state 
     * @param {object} result 
     */
    addRaceResult(state, result) {
      state.results.push(result);
    },

    /**
     * Updates the running status of the race.
     * @param {object} state 
     * @param {Boolean} status 
     */
    setRaceRunning(state, status) {
      state.isRaceRunning = status;
    },

    /**
     * Updates the current round number.
     * @param {object} state 
     * @param {number} round 
     */
    setCurrentRound(state, round) {
      state.currentRound = round;
    },

    /**
     * Marks whether the horses 
     * have been generated.
     * @param {Object} state 
     * @param {boolean} status 
     */
    setHorsesGenerated(state, status) {
      state.isHorsesGenerated = status;
    },
  },
  actions: {
  /**
   * Generated random horses and adds
   * them to the state
   * then it generates the race schedule.
   * @param {object} param0 
   */
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
        speed: Math.floor(Math.random() * 10) + 5, // Hız 5-15 arası (kondisyona göre değiştirilebilir)
        color: `hsl(${index * 18}, 70%, 50%)`,
      }));

      commit('setHorses', horses);
      dispatch('generateRaceSchedule');
    },

    /**
     * Generates the race schedule 
     * and adds it to the state.
     * Each round includes 20 randomly 
     * selected horses.
     * @param {Object} param0 
     */
    generateRaceSchedule({ commit, state }) {
      const schedule = Array.from({ length: 6 }, (_, i) => ({
        round: i + 1,
        distance: 1200 + i * 200, // Mesafe her turda artıyor
        horses: [...state.horses]
          .sort(() => Math.random() - 0.5)
          .slice(0, 10)
          .map((horse, position) => ({
            position: position + 1,
            id: horse.id,
            name: horse.name,
            color: horse.color,
            speed: horse.speed, // Hız bilgisi ekleniyor
          })),
      }));
      commit('setRaceSchedule', schedule);
    },
/**
     * Simulates the current round 
     * and updates the rankings.
     * adds the completed round 
     * to the results.
     * @param {Object} param0 
     * @returns 
     */
    runRace({ commit, state, dispatch }) {
      if (!state.isRaceRunning || state.currentRound > state.raceSchedule.length) {
        return;
      }

      const currentRoundData = state.raceSchedule.find(r => r.round === state.currentRound);

      if (currentRoundData) {
        const raceDuration = Math.max(...currentRoundData.horses.map(h => currentRoundData.distance / h.speed));
        
        setTimeout(() => {
          const sortedHorses = currentRoundData.horses
            .map(horse => ({
              ...horse,
              performance: horse.position + Math.random() * 10 - 5,
            }))
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

          if (state.currentRound <= state.raceSchedule.length) {
            dispatch('runRace'); // Bir sonraki tura geç
          } else {
            commit('setRaceRunning', false); // Yarış bitti
          }
        }, raceDuration * 1000); // Yarış süresi saniyeye çevriliyor
      }
    },

    /**
     * Starts or stops the race.
     * Runs each round at a fixed
     * @param {Object} param0 
     */
    toggleRace({ commit, state, dispatch }) {
      const newStatus = !state.isRaceRunning;
      commit('setRaceRunning', newStatus);

      if (newStatus) {
        commit('setCurrentRound', 1);
        dispatch('runRace');
      } else {
        clearInterval(state.raceInterval);
      }
    },
  },
});

export default store;
