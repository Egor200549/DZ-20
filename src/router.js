import { createMemoryHistory, createRouter } from "vue-router";
import AddTask from './components/AddTask.vue';
import MyTasks from './components/myTasks.vue';
import TaskItemPage from "./components/TaskItemPage.vue";

const routes = [
    {
        path: '/',
        component: MyTasks
    },
    {
        path: '/addTask',
        component: AddTask
    },
    {
        path: '/tasks/:id',
        name: 'taskPage',
        component: TaskItemPage,
        props: true
    }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router;