import { createStore } from "vuex";

const store = createStore({
    state: {
        tasks: [],
        task: []
    },
    mutations: {
        LOAD_TASK(state, data) {
            state.task = data;
        },
        LOAD_TASKS(state, data) {
            state.tasks = data;
        },
        ADD_TASK(state, task) {
            state.tasks.push(task);
        },
        DELETE_TASK(state, id) {
            state.tasks = state.tasks.filter(task => task.id !== id);
            state.task = [];
        },
        PERFORM_TASK(state, step) {
            state.task.status = step;
        },
        EDIT_TASK(state, task) {
            state.task = task;
        }
    },
    actions: {
        loadTask: async ({ commit }, id) => {
            try {
                const response = await fetch(`https://6755a5ec11ce847c992abdae.mockapi.io/todos/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong');
                }

                commit('LOAD_TASK', data);

            } catch (error) {
                error.value = error.message;
            }
        },
        loadTasks: async ({ commit }) => {
            try {
                const response = await fetch('https://6755a5ec11ce847c992abdae.mockapi.io/todos');
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Something went wrong');
                }

                commit('LOAD_TASKS', data);

            } catch (error) {
                error.value = error.message;
            }
        },
        addTask: async ({ commit }, task) => {
            try {
                const response = await fetch('https://6755a5ec11ce847c992abdae.mockapi.io/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Something went wrong');
                }

                commit('ADD_TASK', task);

            } catch (error) {
                error.value = error.message;
            }
        },
        deleteTask: async ({ commit }, id) => {
            try {
                const response = await fetch(`https://6755a5ec11ce847c992abdae.mockapi.io/todos/${id}`, {
                    method: 'DELETE',
                })

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Something went wrong');
                }

                commit('DELETE_TASK', id);
            }
            catch (error) {
                error.value = error.message;
            }
        },
        preformTask: async ({ commit }, { id, step }) => {
            try {
                const response = await fetch(`https://6755a5ec11ce847c992abdae.mockapi.io/todos/${id}`, {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ status: step })
                })

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Something went wrong');
                }

                commit('PERFORM_TASK', step);
            }
            catch (error) {
                error.value = error.message;
            }
        },
        editTask: async ({ commit }, { id, task }) => {
            try {
                const response = await fetch(`https://6755a5ec11ce847c992abdae.mockapi.io/todos/${id}`, {
                    method: 'PUT',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify(task)
                })

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Something went wrong');
                }

                commit('EDIT_TASK', task);
            }
            catch (error) {
                error.value = error.message;
            }
        }
    },
    getters: {
        allTasks(state) {
            return state.tasks;
        },
        task(state) {
            return state.task;
        }
    }
})

export default store;