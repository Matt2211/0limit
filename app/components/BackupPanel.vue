<script setup lang="ts">
const props = defineProps<{
  exportJson: () => string
  importJson: (json: string) => void
}>()
const text = ref('')
const status = ref<string>('')

// Keep in sync with app/composables/usePlanner.ts
const STORAGE_KEY = 'matt_planner_v1'

function filenameNow() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `backup-${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}.json`
}

function downloadJson() {
  try {
    const json = props.exportJson()
    text.value = json
    const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filenameNow()
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
    status.value = '✅ Backup downloaded (.json file).'
  } catch (e) {
    status.value = '❌ Error during download.'
  }
}

function doExport() {
  try {
    text.value = props.exportJson()
    status.value =
      '✅ JSON backup generated. (Includes: profile, goal, routine, meals, workout, daily progress.)'
  } catch (e) {
    status.value = '❌ Error while generating JSON.'
  }
}

function doImport() {
  const raw = text.value.trim()
  if (!raw) {
    status.value = '⚠️ Paste a JSON backup first.'
    return
  }

  // Validate JSON before passing it to the composable
  try {
    JSON.parse(raw)
  } catch (e) {
    status.value = '❌ Invalid JSON. Make sure it is complete and well-formed.'
    return
  }

  try {
    props.importJson(raw)
    status.value =
      '✅ Import complete. (Note: import overwrites your current local data.)'
  } catch (e) {
    status.value = '❌ Error during import.'
  }
}

function resetLocalData() {
  if (!import.meta.client) return

  const ok = confirm(
    'This will delete all 0limit data saved on this device. This cannot be undone. Continue?',
  )
  if (!ok) return

  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }

  // Reload so the app re-initializes from defaults.
  location.reload()
}
</script>

<template>
  <section class="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-4">
    <h2 class="mb-2 text-lg font-semibold text-neutral-100">Backup</h2>
    <p class="text-sm text-neutral-400">
      Export/import a JSON backup so you never lose your data.
      <span class="text-neutral-500">
        Includes profile (height), goal, routine, meals, workout, and daily
        progress.
      </span>
    </p>

    <div class="mt-3 flex flex-wrap justify-between gap-2">
      <div class="flex items-center gap-4">
        <Button @click="doExport">Export JSON</Button>
        <Button @click="doImport">Import JSON (overwrite)</Button>
      </div>
      <Button @click="downloadJson">Download .json</Button>
    </div>

    <p v-if="status" class="mt-3 text-sm text-neutral-300">{{ status }}</p>

    <textarea
      v-model="text"
      class="mt-3 h-64 w-full rounded-xl border border-neutral-800 bg-neutral-950/40 p-3 text-xs text-neutral-200"
      placeholder="Click Export to generate the JSON. Paste here to Import." />
  </section>
  <section>
    <div class="mt-4 rounded-xl border border-rose-900/60 bg-rose-950/20 p-3">
      <p class="text-xs font-semibold tracking-wide text-rose-300 uppercase">
        Reset local data
      </p>
      <p class="mt-1 text-sm text-rose-200/90">
        Deletes all 0limit data saved on this device (localStorage). Use this if
        you want a fresh start.
      </p>

      <div class="mt-3 flex items-center justify-end">
        <Button
          class="border border-rose-900/60 bg-rose-950/30 text-rose-200 hover:bg-rose-950/50"
          @click="resetLocalData">
          Reset
        </Button>
      </div>
    </div>
  </section>
</template>
