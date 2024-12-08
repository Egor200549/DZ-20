<script>

export default {
    data() {
        return {
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
    methods: {
        addTask() {
            this.errors.name = '';
            this.errors.description = '';
            this.errors.priority = '';
            this.errors.date = '';

            if (this.name && this.description && this.priority && this.date) {
                this.$store.dispatch('addTask', {
                    name: this.name,
                    description: this.description,
                    priority: this.priority,
                    date: this.date,
                    status: this.status
                });
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
    }
}
</script>

<template>
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
        <!--label for="status">Статус</!label-->
        <!--select v-model="status" id="status" required>
            <option disabled value=""></option>
            <option value="новая">Новая задача</option>
            <option value="в работе">Задача в работе</option>
            <option value="завершена">Задача завершена</option>
        </select-->
        <button style="width: fit-content;" v-on:click.prevent="addTask" type="submit">Создать задачу</button>
    </form>
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
</style>