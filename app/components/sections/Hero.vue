<template>
  <section id="hero" class="flex h-screen items-center justify-center">
    <div class="text-center">
      <h1 class="mb-4 text-8xl">
        Take the first step <span class="block">toward feeling better</span>
      </h1>
      <p class="lead">
        Evidence-based CBT therapy to help you overcome
        <span class="block"
          >anxiety, stress, trauma and emotional difficulties.</span
        >
      </p>
      <div class="mt-6 flex flex-col items-center gap-3">
        <Button @click="navigateTo('/booking')">Book your first session</Button>

        <!-- <Button variant="basic" @click="consultationModal?.openModal()">
          Schedule a Free Consultation
        </Button> -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const consultationModal = inject('consultationModal') as Ref<any> | null
</script>
