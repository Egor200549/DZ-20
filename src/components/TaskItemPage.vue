<script>
import { useRouter } from 'vue-router';
import { mapGetters } from 'vuex';

export default {
    name: 'taskPage',
    data() {
        return {
            edit: false,
            name: '',
            description: '',
            priority: '',
            date: '',
            status: 'новая',
            errors: {
                name: '',
                description: '',
                priority: '',
                date: '',
            }
        }
    },
    computed: {
        taskId() {
            return this.$route.params.id;
        },
        ...mapGetters(['task']),
        taskItem() {
            return this.task;
        }
    },
    setup() {
        const router = useRouter();

        const routeToMain = () => {
            router.push({ path: '/' });
        }

        return {
            routeToMain
        }
    },
    methods: {
        deleteTask(id) {
            this.$store.dispatch('deleteTask', id);
            this.routeToMain();
        },
        preformTask(id, step) {
            this.$store.dispatch('preformTask', { id, step });
        },
        loadTask() {
            this.$store.dispatch('loadTask', this.taskId);
        },
        openForm() {
            this.edit = !this.edit;
        },
        editTask() {
            this.errors.name = '';
            this.errors.description = '';
            this.errors.priority = '';
            this.errors.date = '';

            if (this.name && this.description && this.priority && this.date) {
                const task = {
                    name: this.name,
                    description: this.description,
                    priority: this.priority,
                    date: this.date,
                }
                const id = this.taskId;

                this.$store.dispatch('editTask', { id, task });

                this.name = '';
                this.description = '';
                this.priority = '';
                this.date = '';
            } else {
                if (!this.name) this.errors.name = 'Введите имя';
                if (!this.description) this.errors.description = 'Введите описание';
                if (!this.priority) this.errors.priority = 'Выберите приоритет';
                if (!this.date) this.errors.date = 'Выберите дату';
            }
        }
    },
    created() {
        this.loadTask();
    },
    watch: {
        $route: 'loadTask'
    }
}
</script>

<template>
    <div class="item" :class="{ 'perf': task.status == 'завершена' }">
        <div>
            <h1>{{ task.name }}</h1>
        </div>
        <div class="details">
            <p style="font-size: 16px;">Описание задачи:</p>
            <p>{{ task.description }}</p>
        </div>
        <div class="set">
            <div>
                <p><span style="font-weight: bold;">Статус:</span> {{ task.status }}</p>
            </div>
            <div>
                <p><span style="font-weight: bold;">Приоритет:</span> {{ task.priority }}</p>
            </div>
            <div>
                <p><span style="font-weight: bold;">Срок выполнения:</span> {{ task.date }}</p>
            </div>
        </div>
        <div :class="{ 'none': task.status == 'завершена' }">
            <button :class="{ 'none': task.status == 'в работе' }" @click="preformTask(taskId, 'в работе')">
                В работе
            </button>
            <button :class="{ 'none': task.status == 'новая' }" @click="preformTask(taskId, 'завершена')">
                Выполнить
            </button>
        </div>
    </div>
    <button style="margin-right: 20px;" @click="openForm()"
        :class="{ 'none': task.status == 'завершена' || task.status == 'в работе' }">Редактировать</button>
    <button @click="deleteTask(taskId)">Удалить</button>
    <div style="margin-top: 20px;" v-if="edit">
        <form>
            <label for="name">Название задачи</label>
            <input v-model.trim="name" v-on:keyup.enter="addTask" type="text" id="name" required>
            <p v-if="errors.name" class="error">{{ errors.name }}</p>
            <label for="description">Описание задачи</label>
            <textarea id="description" v-model.trim="description" required></textarea>
            <p v-if="errors.description" class="error">{{ errors.description }}</p>
            <label for="priority">Приоритет</label>
            <select v-model="priority" id="priority" required>
                <option disabled value=""></option>
                <option value="низкий">Низкий приоритет</option>
                <option value="средний">Средний приоритет</option>
                <option value="высокий">Высокий приоритет</option>
            </select>
            <p v-if="errors.priority" class="error">{{ errors.priority }}</p>
            <label for="date">Срок выполнения</label>
            <input v-model="date" type="date" id="date" required>
            <p v-if="errors.date" class="error">{{ errors.date }}</p>
            <button style="width: fit-content;" v-on:click.prevent="editTask" type="submit">Редактировать
                задачу</button>
        </form>
    </div>

</template>

<style scoped>
.error {
    color: red;
    font-weight: bold;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

input,
select,
textarea {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 2px solid black;
    background-color: #f5f5dc;
    box-shadow: 4px 4px black;
    font-weight: 600;
    padding: 5px 10px;
    outline: none;
}

textarea {
    resize: vertical;
}

.none {
    display: none;
}

.set {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
}

.set>div {
    padding: 20px;
    flex-grow: 1;
    background-color: bisque;
    border-radius: 20px;
}

.details {
    width: 100%;
    padding: 20px;
    background-color: lightgoldenrodyellow;
    border-radius: 20px;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.perf {
    opacity: .5;
}

.perf h1 {
    text-decoration: line-through;
}

.item {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    list-style: none;
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 20px;
    background-color: aliceblue;
    border-radius: 20px;
    border: 2px solid black;
}
</style>