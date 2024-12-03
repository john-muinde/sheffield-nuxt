<template>
  <TransitionRoot appear :show="showPopup" as="template">
    <Dialog as="div" class="relative z-50 w-full" @close="closeVideo">
      <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-75"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel class="rounded-2xl bg-white" :style="{
              width: 'calc(100vw - 40px)',
              maxWidth: '1200px'
            }">
              <div class="relative aspect-video">
                <div v-if="isYouTubeVideo" class="plyr__video-embed h-full">
                  <iframe :src="`https://www.youtube.com/embed/${getYoutubeId(videoUrl)}?autoplay=1`" allowfullscreen
                    allow="autoplay" class="w-full h-full rounded-2xl"></iframe>
                </div>
                <div v-else class="h-full">
                  <video ref="videoElement" class="plyr-video w-full h-full rounded-2xl" crossorigin>
                    <source :src="videoUrl" type="video/mp4" />
                  </video>
                </div>
                <button
                  class="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"
                  @click="closeVideo">
                  <span class="sr-only">Close</span>
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';
import 'plyr/dist/plyr.css';

const videoElement = ref(null);
let player = null;

const plyrOptions = {
  controls: [
    'play-large',
    'play',
    'progress',
    'current-time',
    'mute',
    'volume',
    'captions',
    'settings',
    'pip',
    'fullscreen',
  ],
  autoplay: true,
  hideControls: false,
  quality: { default: '1080p', options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] },
};

const props = defineProps({
  showPopup: {
    type: Boolean,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);

const initPlyr = () => {
  // Check if we're in a client-side environment
  if (process.client) {
    import('plyr').then((PlyrModule) => {
      const Plyr = PlyrModule.default;
      if (!isYouTubeVideo.value && videoElement.value && !player) {
        player = new Plyr(videoElement.value, plyrOptions);
      }
    });
  }
};

const destroyPlyr = () => {
  if (player) {
    player.destroy();
    player = null;
  }
};

const closeVideo = () => {
  destroyPlyr();
  emit('close');
};

const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : 'error';
};

const isYouTubeVideo = computed(() => {
  const regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  return regExp.test(props.videoUrl);
});

watch(() => props.showPopup, (newValue) => {
  if (newValue && !isYouTubeVideo.value) {
    // Use nextTick to ensure DOM is updated before initializing Plyr
    nextTick(() => {
      initPlyr();
    });
  } else {
    destroyPlyr();
  }
});

onMounted(() => {
  if (props.showPopup && !isYouTubeVideo.value) {
    initPlyr();
  }
});

onBeforeUnmount(() => {
  destroyPlyr();
});
</script>

<style>
.plyr {
  height: 100%;
  width: 100%;
}

.plyr__video-wrapper,
.plyr__controls {
  border-radius: 1rem !important;
}
</style>
