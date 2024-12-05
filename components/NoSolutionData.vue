<template>
  <div
    class="flex flex-col items-center justify-center min-h-[400px] p-6 bg-gradient-to-br from-rose-50 to-rose-100 w-full"
  >
    <div class="text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 400 300"
        class="mx-auto mb-6 w-64 h-64"
        :class="{ 'animate-bounce': isAnimating }"
      >
        <defs>
          <linearGradient id="giftGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :stop-color="gradientStart" stop-opacity="1" />
            <stop offset="100%" :stop-color="gradientEnd" stop-opacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M100 120 L200 50 L300 120 L300 250 L100 250 Z"
          fill="url(#giftGradient)"
          :stroke="borderColor"
          stroke-width="4"
        />
        <path
          d="M100 120 L200 190 L300 120"
          fill="none"
          :stroke="borderColor"
          stroke-width="4"
        />
        <circle
          cx="200"
          cy="85"
          r="20"
          fill="#FFFFFF"
          :stroke="borderColor"
          stroke-width="4"
        />
        <path
          d="M190 85 L210 85 M200 75 L200 95"
          :stroke="borderColor"
          stroke-width="3"
        />
      </svg>

      <h2 class="text-2xl font-bold mb-4" :class="titleColor">
        Exciting Promotions Coming Soon!
      </h2>
      <p class="max-w-md mx-auto mb-6" :class="subtitleColor">
        We're crafting something extraordinary just for you. Stay tuned for
        exclusive deals that'll make your day!
      </p>

      <button
        @click="handleRetry"
        class="flex items-center justify-center mx-auto px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        :class="buttonClasses"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mr-2"
          :class="{ 'animate-spin': isAnimating }"
        >
          <path d="M23 4v6h-6"></path>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Check Again
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAnimating: false,
      primaryColor: "#c02434",
      gradientStart: "#e74c5d",
      gradientEnd: "#a11d2a",
      borderColor: "#7c1520",
    };
  },
  computed: {
    titleColor() {
      return "text-rose-900";
    },
    subtitleColor() {
      return "text-rose-800";
    },
    buttonClasses() {
      return [
        "bg-rose-600",
        "text-white",
        "hover:bg-rose-700",
        { "animate-pulse": this.isAnimating },
      ];
    },
  },
  methods: {
    handleRetry() {
      this.isAnimating = true;
      setTimeout(() => {
        this.isAnimating = false;
      }, 1500);
    },
  },
};
</script>
