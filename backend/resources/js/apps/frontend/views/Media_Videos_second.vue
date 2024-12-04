<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          Video Gallery
        </h1>
        <p class="text-gray-600">
          Explore our collection of videos
        </p>
      </div>

      <!-- Filters Section -->
      <div class="flex flex-col md:flex-row gap-4 mb-8">
        <!-- Search Input -->
        <div class="flex-1">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search videos..."
            class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <!-- Category Filters -->
        <div class="flex gap-2 overflow-x-auto pb-2">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="[
              'px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200',
              activeFilter === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            ]"
            @click="activeFilter = category.id"
          >
            {{ category.label }}
          </button>
        </div>
      </div>

      <!-- Video Grid -->
      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div
          v-for="video in filteredVideos"
          :key="video.id"
          :data-index="video.id"
          class="group relative rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300"
        >
          <!-- Thumbnail Container -->
          <div class="aspect-video relative overflow-hidden cursor-pointer" @click="playVideo(video)">
            <img
              :src="getVideoPoster(video)"
              :alt="video.name"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              @error="handleImageError"
            />
            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            >
              <div
                class="w-16 h-16 rounded-full bg-white bg-opacity-90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
              >
                <div
                  class="play-icon w-8 h-8"
                  :class="{ 'playing': selectedVideo?.id === video.id && !isPaused }"
                ></div>
              </div>
            </div>
          </div>

          <!-- Video Info -->
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {{ video.name }}
            </h3>
            <p class="text-sm text-gray-600 line-clamp-2">
              {{ video.description || 'No description available'
              }}
            </p>
            <div class="mt-3 flex items-center justify-between">
              <span class="text-sm text-blue-600">{{ video.duration || '00:00' }}</span>
              <span class="text-sm text-gray-500">{{ video.category }}</span>
            </div>
          </div>
        </div>
      </TransitionGroup>

      <!-- Video Player Modal -->
      <TransitionRoot appear :show="!!selectedVideo" as="template">
        <Dialog as="div" class="relative z-50" @close="closeVideo">
          <TransitionChild
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-75"></div>
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel class="w-full max-w-4xl rounded-2xl bg-white">
                  <div class="relative aspect-video">
                    <div v-if="isYouTubeVideo" class="plyr__video-embed h-full">
                      <iframe
                        :src="`https://www.youtube.com/embed/${getYoutubeId(selectedVideo?.video_url)}?autoplay=1`"
                        allowfullscreen
                        allow="autoplay"
                        class="w-full h-full"
                      ></iframe>
                    </div>
                    <video
                      v-else
                      ref="videoElement"
                      :src="videoSrc(selectedVideo)"
                      class="w-full h-full plyr-video"
                      controls
                      autoplay
                    ></video>
                    <button
                      class="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors"
                      @click="closeVideo"
                    >
                      <span class="sr-only">Close</span>
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup>
import '@/styles.css';
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue';
import gsap from 'gsap';

// State
const videos = ref([]);
const selectedVideo = ref(null);
const searchTerm = ref('');
const activeFilter = ref('all');
const isPaused = ref(true);
const videoElement = ref(null);

// Categories for filtering
const categories = [
    { id: 'all', label: 'All Videos' },
    { id: 'tutorials', label: 'Tutorials' },
    { id: 'webinars', label: 'Webinars' },
    { id: 'events', label: 'Events' },
];

// Computed properties
const filteredVideos = computed(() => {
    return videos.value
        .filter(video => {
            const matchesSearch = video.name.toLowerCase().includes(searchTerm.value.toLowerCase());
            const matchesCategory = activeFilter.value === 'all' || video.category === activeFilter.value;
            return matchesSearch && matchesCategory;
        });
});

const isYouTubeVideo = computed(() => {
    return selectedVideo.value && selectedVideo.value.type !== 'Upload';
});

// Methods
const fetchVideos = async () => {
    try {
        const response = await fetch('/api/get-media-center-videos');
        const data = await response.json();
        videos.value = data.videos;
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
};

const getYoutubeId = (url) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : '';
};

const videoSrc = (video) => {
    if (!video) return '';
    return video.type === 'Upload' ? `/storage/${video.file_path}` : '';
};

const getVideoPoster = (video) => {
    if (!video) return null;
    if (video.thumbnail) return video.thumbnail;
    if (video.type !== 'Upload' && video.video_url) {
        const videoId = getYoutubeId(video.video_url);
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    }
    return '/api/placeholder/320/180';
};

const handleImageError = (event) => {
    event.target.src = '/api/placeholder/320/180';
};

const playVideo = (video) => {
    selectedVideo.value = video;
    isPaused.value = false;
};

const closeVideo = () => {
    selectedVideo.value = null;
    isPaused.value = true;
};

// Animation handlers
const onBeforeEnter = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'scale(0.8)';
};

const onEnter = (el, done) => {
    gsap.to(el, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        delay: el.dataset.index * 0.1,
        onComplete: done,
    });
};

const onLeave = (el, done) => {
    gsap.to(el, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        onComplete: done,
    });
};

// Lifecycle hooks
onMounted(() => {
    fetchVideos();
});

onUnmounted(() => {
    if (videoElement.value) {
        videoElement.value.pause();
    }
});
</script>

<style scoped>
.play-icon {
    position: relative;
}

.play-icon:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-40%, -50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 12px 0 12px 20px;
    border-color: transparent transparent transparent #1d4ed8;
}

.play-icon.playing:before {
    transform: translate(-50%, -50%);
    border-width: 0 6px 0 6px;
    border-color: transparent #1d4ed8 transparent #1d4ed8;
    width: 20px;
    height: 24px;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
