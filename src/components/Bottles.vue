<template>
    <div class="flex justify-content-center">
        <form @submit="onSubmit" class="flex flex-column gap-2">
            <span class="p-float-label">
                <InputText id="name" v-model="name" type="text" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" />
                <label for="name">Nom</label>
            </span>
            <span class="p-float-label">
                <InputText id="domain" v-model="domaine" type="text" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" />
                <label for="domain">Domaine</label>
            </span>
            <span class="p-float-label">
                <InputText id="year" v-model="year" type="number" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" />
                <label for="year">Année</label>
            </span>
            <span class="p-float-label">
                <InputText id="color" v-model="color" type="number" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" />
                <label for="color">Couleur</label>
            </span>
            <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
            
            <Button type="submit" label="Ajouter" />
        </form>
    </div>
</template>

<script setup>
import { useField, useForm } from 'vee-validate';

const { handleSubmit, resetForm } = useForm();
const { value, errorMessage } = useField('name', validateField);

function validateField(value) {
    if (!value) {
        return 'Name - Surname is required.';
    }

    return true;
}

const onSubmit = handleSubmit((values) => {
    if (values.value && values.value.length > 0) {
        resetForm();
    }
});

</script>

<style lang="scss" scoped>

</style>