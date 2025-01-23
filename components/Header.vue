<script setup lang="ts">

</script>

<template>
  <header>
    <UContainer>
      <nav class="flex items-center justify-between pt-12">
        <ul class="flex items-center w-full justify-end">
          <li class="flex">
            <NuxtLink to="/matches" class="link">Wedstrijden</NuxtLink>
          </li>
          <li class="px-6 flex">
            <NuxtLink to="/add-user" class="link">Gebruiker toevoegen</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/add-match">
              <UButton
                to="/add-match"
                color="shakespeare"
                size="xl"
                icon="i-heroicons-plus-circle"
              >
                Wedstrijd toevoegen
              </UButton>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </UContainer>
  </header>
</template>

<style>
  .link {
    @apply duration-300 transition-colors;
    @apply hover:text-shakespeare-500;
  }
</style>