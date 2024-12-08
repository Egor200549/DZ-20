<script>
import { mapGetters } from 'vuex';
import TaskItem from './TaskItem.vue';
export default {
    components: {
        TaskItem
    },
    computed: {
        ...mapGetters(['allTasks']),
        tasks() {
            return this.allTasks;
        }
    },
    created() {
        this.loadTasks();
    },
    watch: {
        $route: 'loadTasks'
    },
    methods: {
        loadTasks() {
            this.$store.dispatch('loadTasks');
        }
    }
}
</script>

<template>
    <div class="tasks">
        <h3 v-if="tasks.length === 0">Задач нет</h3>
        <ul>
            <TaskItem v-for="(task, index) in tasks" :key="index" :task="task" />
        </ul>
    </div>
</template>

<style scoped>
.tasks {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

h3 {
    text-align: center;
    margin-bottom: 40px;
}

ul {
    width: 100%;
}
</style>