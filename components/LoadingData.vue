<template>
  <div class="flex items-center justify-center w-full min-h-[350px]">
    <div class="text-center">
      <div class="relative mx-auto w-48 h-48 mb-6">
        <svg
          class="absolute inset-0 w-full h-full text-rose-600/20"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            stroke-width="8"
            stroke-dasharray="282"
            class="animate-circle-dash"
          />
        </svg>

        <div
          class="absolute inset-0 flex items-center justify-center transform transition-all duration-300"
          :class="rotateClasses"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            class="w-32 h-32 text-rose-600"
          >
            <path
              d="M50 10 
                 Q70 30, 50 50 
                 Q30 70, 50 90 
                 Q70 70, 50 50 
                 Q30 30, 50 10 Z"
              fill="currentColor"
              class="animate-pulse"
            />
            <circle
              cx="50"
              cy="50"
              r="5"
              fill="#ffffff"
              stroke="currentColor"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>

      <div class="space-y-2">
        <h3 class="text-2xl font-bold text-rose-900 animate-fade-in">
          {{ currentLoadingText }}
        </h3>
        <p class="text-rose-700 opacity-75 animate-fade-in-delay">
          We're gathering your information, just a moment...
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rotateIndex: 0,
      loadingTexts: [
        "Preparing your data...",
        "Almost there...",
        "Just a moment more...",
      ],
      currentLoadingTextIndex: 0,
    };
  },
  computed: {
    rotateClasses() {
      return ["rotate-0", "rotate-90", "rotate-180", "rotate-270"][
        this.rotateIndex
      ];
    },
    currentLoadingText() {
      return this.loadingTexts[this.currentLoadingTextIndex];
    },
  },
  mounted() {
    this.startRotationCycle();
    this.startTextCycle();
  },
  methods: {
    startRotationCycle() {
      setInterval(() => {
        this.rotateIndex = (this.rotateIndex + 1) % 4;
      }, 500);
    },
    startTextCycle() {
      setInterval(() => {
        this.currentLoadingTextIndex =
          (this.currentLoadingTextIndex + 1) % this.loadingTexts.length;
      }, 2000);
    },
  },
};
</script>

<style scoped>
@keyframes circle-dash {
  0% {
    stroke-dashoffset: 282;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -282;
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-circle-dash {
  animation: circle-dash 2s linear infinite;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fade-in 0.5s ease-out 0.3s forwards;
  opacity: 0;
}
</style>
