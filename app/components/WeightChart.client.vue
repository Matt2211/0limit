<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'

const props = withDefaults(
  defineProps<{
    labels: string[]
    values: Array<number | null>
    label?: string
    yMin?: number
    yMax?: number
    stepSize?: number
    /** Chart.js type */
    type?: 'line' | 'bar'
    /** Use stepped lines (useful for discrete metrics) */
    stepped?: boolean
    /** Base dataset color (hex/rgb/rgba). Default is emerald. */
    color?: string
    /** Background fill alpha for bar (and any fill). */
    fillAlpha?: number
  }>(),
  {
    type: 'line',
    stepped: false,
    color: '#34d399',
    fillAlpha: 0.35,
  },
)

const rootEl = ref<HTMLElement | null>(null)
const canvasEl = ref<HTMLCanvasElement | null>(null)

let chart: Chart | null = null
let ro: ResizeObserver | null = null

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = String(hex ?? '')
    .replace('#', '')
    .trim()

  if (h.length === 3) {
    const rHex = h.charAt(0)
    const gHex = h.charAt(1)
    const bHex = h.charAt(2)
    if (!rHex || !gHex || !bHex) return null

    const r = parseInt(rHex + rHex, 16)
    const g = parseInt(gHex + gHex, 16)
    const b = parseInt(bHex + bHex, 16)
    if ([r, g, b].some((x) => Number.isNaN(x))) return null
    return { r, g, b }
  }

  if (h.length === 6) {
    const r = parseInt(h.slice(0, 2), 16)
    const g = parseInt(h.slice(2, 4), 16)
    const b = parseInt(h.slice(4, 6), 16)
    if ([r, g, b].some((x) => Number.isNaN(x))) return null
    return { r, g, b }
  }

  return null
}

function withAlpha(color: string, alpha: number): string {
  const c = String(color ?? '').trim()
  if (!c) return `rgba(52, 211, 153, ${alpha})`

  if (c.startsWith('#')) {
    const rgb = hexToRgb(c)
    if (rgb) return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
  }

  const rgbMatch = c.match(
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i,
  )
  if (rgbMatch) {
    const r = Number(rgbMatch[1])
    const g = Number(rgbMatch[2])
    const b = Number(rgbMatch[3])
    if ([r, g, b].every((n) => Number.isFinite(n))) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  }

  const rgbaMatch = c.match(
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9.]+)\s*\)$/i,
  )
  if (rgbaMatch) {
    const r = Number(rgbaMatch[1])
    const g = Number(rgbaMatch[2])
    const b = Number(rgbaMatch[3])
    if ([r, g, b].every((n) => Number.isFinite(n))) {
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  }

  return c
}

function applyDatasetStyling(ds: any) {
  ds.stepped = props.stepped
  ds.borderColor = withAlpha(props.color, 1)
  ds.pointBackgroundColor = withAlpha(props.color, 1)
  ds.pointBorderColor = withAlpha(props.color, 1)

  ds.backgroundColor =
    props.type === 'bar'
      ? withAlpha(props.color, props.fillAlpha)
      : withAlpha(props.color, 0.15)

  ds.borderWidth = props.type === 'bar' ? 0 : 2

  if (props.type === 'bar') {
    ds.borderRadius = 10
    ds.maxBarThickness = 56
    ds.categoryPercentage = 0.6
    ds.barPercentage = 0.9
  } else {
    ds.borderRadius = 0
  }
}

function buildChart() {
  if (!canvasEl.value) return

  if (chart) {
    chart.destroy()
    chart = null
  }

  chart = new Chart(canvasEl.value, {
    type: props.type,
    data: {
      labels: props.labels,
      datasets: [
        (() => {
          const ds: any = {
            label: props.label ?? 'Value',
            data: props.values,
            tension: 0.35,
            spanGaps: false,
            pointRadius: 3,
            pointHoverRadius: 5,
          }
          applyDatasetStyling(ds)
          return ds
        })(),
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
      scales: {
        x: {
          ticks: { maxRotation: 0, autoSkip: true },
          grid: { display: false },
        },
        y: {
          min: props.yMin,
          max: props.yMax,
          ticks: props.stepSize ? { stepSize: props.stepSize } : undefined,
          grid: { color: 'rgba(148,163,184,0.15)' },
        },
      },
    },
  })

  requestAnimationFrame(() => {
    if (chart) chart.resize()
  })
}

onMounted(async () => {
  await nextTick()
  buildChart()

  if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
    ro = new ResizeObserver(() => {
      if (!chart) return
      chart.resize()
    })
    if (rootEl.value) ro.observe(rootEl.value)
  }
})

watch(
  () => [
    props.labels,
    props.values,
    props.label,
    props.yMin,
    props.yMax,
    props.stepSize,
    props.type,
    props.stepped,
    props.color,
    props.fillAlpha,
  ],
  async () => {
    await nextTick()

    if (!chart) return buildChart()

    chart.data.labels = props.labels

    const yScale: any = (chart.options.scales as any)?.y
    if (yScale) {
      yScale.min = props.yMin
      yScale.max = props.yMax
      yScale.ticks = props.stepSize ? { stepSize: props.stepSize } : undefined
    }

    ;(chart.config as any).type = props.type

    const first = chart.data.datasets[0] as any
    if (first) {
      first.data = props.values
      first.label = props.label ?? 'Value'
      applyDatasetStyling(first)
    }

    chart.update()

    requestAnimationFrame(() => {
      if (chart) chart.resize()
    })
  },
  { deep: true },
)

onBeforeUnmount(() => {
  if (ro) {
    ro.disconnect()
    ro = null
  }
  if (chart) chart.destroy()
  chart = null
})
</script>

<template>
  <div ref="rootEl" class="h-64 w-full">
    <canvas ref="canvasEl" />
  </div>
</template>
