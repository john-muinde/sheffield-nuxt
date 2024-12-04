<template>
  <div>
    <main class="main">
      <div class="page-content bg-gray-50">
        <div class="container mx-auto px-4">
          <div class="row">
            <div class="col-lg-10 offset-lg-1 media-video">
              <!-- Header Section -->
              <div class="flex justify-between items-center">
                <div>
                  <h2 class="about-us-title text-3xl font-bold">
                    Videos
                  </h2>
                  <p class="lead about-us-lead text-primary mb-3">
                    Explore our videos
                  </p>
                </div>
                <router-link to="/media" class="btn btn-primary btn-round btn-shadow">
                  <i class="icon-long-arrow-left"></i>
                  <span>Back to Media Center</span>
                </router-link>
              </div>

              <!-- Video Player Section -->
              <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 main-container">
                <!-- Main Video Player -->
                <div class="lg:col-span-3 video-content-container">
                  <div class="video-player w-full">
                    <vue-plyr
                      ref="plyr"
                      :options="plyrOptions"
                      @ready="handlePlayerReady"
                      @playing="handlePlaying"
                      @pause="handlePause"
                      @ended="handleEnded"
                    >
                      <template v-if="isYouTubeVideo">
                        <div
                          data-plyr-provider="youtube"
                          :data-plyr-embed-id="getYoutubeId(selectedVideo?.video_url)"
                        >
                        </div>
                      </template>
                      <template v-else>
                        <video
                          :poster="getVideoPoster(selectedVideo)"
                          controls
                          crossorigin
                          loop
                          autoplay
                          muted
                        >
                          <source
                            v-if="selectedVideo"
                            :src="videoSrc(selectedVideo)"
                            type="video/mp4"
                          />
                        </video>
                      </template>
                    </vue-plyr>
                  </div>
                </div>

                <!-- Video List -->
                <div class="lg:col-span-1 video-player-list">
                  <div class="widget widget-cats bg-white rounded-xl shadow-lg">
                    <h3 class="widget-title p-4 border-b">
                      <b>Video List</b>
                    </h3>
                    <ul class="ul-pdf-view-videos">
                      <li
                        v-for="video in videos"
                        :key="video.id"
                        :class="['video-item', { 'active': selectedVideo?.id === video.id }]"
                        @click="playVideo(video)"
                      >
                        <div class="flex items-center w-full">
                          <!-- Thumbnail Container -->
                          <div class="relative w-24 h-16 flex-shrink-0 mr-3">
                            <div
                              class="absolute inset-0 bg-gray-100 rounded overflow-hidden"
                            >
                              <img
                                v-if="getVideoPoster(video)"
                                :src="getVideoPoster(video)"
                                :alt="video.name"
                                class="w-full h-full object-cover"
                                @error="handleImageError"
                              />
                              <div
                                v-else
                                class="w-full h-full flex items-center justify-center bg-gray-200"
                              >
                                <svg
                                  class="w-8 h-8 text-gray-400"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <!-- Play/Pause Overlay -->
                            <div
                              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity"
                              :class="{ 'opacity-0': selectedVideo?.id === video.id && !isPaused }"
                            >
                              <div
                                class="play_pause_icon"
                                :class="{ 'play': selectedVideo?.id !== video.id || isPaused, 'pause': selectedVideo?.id === video.id && !isPaused }"
                              >
                              </div>
                            </div>
                          </div>

                          <!-- Video Title -->
                          <span class="video-title text-sm font-medium line-clamp-2">
                            {{ video.name }}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import axios from 'axios';
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';

const videos = ref([]);
const selectedVideo = ref(null);
const plyr = ref(null);
const isPaused = ref(true);

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
    muted: true,
    quality: { default: '1080p', options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] },
};

const isYouTubeVideo = computed(() => {
    return selectedVideo.value && selectedVideo.value.type !== 'Upload';
});

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
    return null;
};

const handleImageError = (event) => {
    event.target.style.display = 'none';
    event.target.parentElement.querySelector('svg')?.classList.remove('hidden');
};

const fetchMediaCenter = async () => {
    try {
        const response = await axios.get('/api/get-media-center-videos');
        videos.value = response.data.videos;
        autoplayFirstVideo();
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
};

const autoplayFirstVideo = async () => {
    await nextTick();
    if (videos.value.length > 0) {
        playVideo(videos.value[0]);
    }
};

const playVideo = async (video) => {
    if (selectedVideo.value?.id === video.id) {
        if (plyr.value) {
            const player = plyr.value.player;
            if (player.paused) {
                await player.play();
                isPaused.value = false;
            } else {
                await player.pause();
                isPaused.value = true;
            }
        }
        return;
    }

    selectedVideo.value = video;
    isPaused.value = false;

    if (plyr.value) {
        const player = plyr.value.player;
        await nextTick();
        if (isYouTubeVideo.value) {
            player.source = {
                type: 'video',
                sources: [{
                    src: getYoutubeId(video.video_url),
                    provider: 'youtube',
                }],
            };
        } else {
            player.source = {
                type: 'video',
                sources: [{
                    src: videoSrc(video),
                    type: 'video/mp4',
                }],
            };
        }
        await player.play();
    }
};

// Player event handlers
const handlePlayerReady = async (player) => {

    if (player && selectedVideo.value) {
        player.muted = true;
        await player.play();
        isPaused.value = true;
    }
};


const handlePlaying = () => {

    isPaused.value = false;
};

const handlePause = () => {

    isPaused.value = true;
};

const handleEnded = () => {

    isPaused.value = true;
};

onMounted(() => {
    if (plyr.value?.player) {
        plyr.value.player.muted = true;
    }
    fetchMediaCenter();
});
</script>

<style scoped>
.video-content-container {
    width: 100%;
}

.video-player {
    aspect-ratio: 16/9;
    background: #000;
    width: 100%;
    max-height: 500px;
    /* Set a maximum height for the video player */
}

:deep(.plyr) {
    --plyr-color-main: #304296;
    width: 100%;
    height: 100%;
}

.ul-pdf-view-videos {
    max-height: calc(100vh - 200px);
    overflow-y: auto;
    background-color: #f8f9fa;
    padding: 0;
}

.video-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 1px solid #e9ecef;
}

.video-item:hover {
    background-color: #f1f3f5;
}

.video-item.active {
    background-color: #e9ecef;
}

.play_pause_icon {
    width: 24px;
    height: 24px;
    background: white;
    transition: all 0.2s ease;
}

.play {
    clip-path: polygon(20% 0, 20% 100%, 90% 50%, 90% 50%);
}

.pause {
    clip-path: polygon(0 0, 0 100%, 33.33% 100%, 33.33% 0, 66.66% 0, 100% 0, 100% 100%, 66.66% 100%, 66.66% 0);
}

.video-title {
    color: #333;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Custom scrollbar */
.ul-pdf-view-videos::-webkit-scrollbar {
    width: 6px;
}

.ul-pdf-view-videos::-webkit-scrollbar-track {
    background: #f1f1f1;
}

.ul-pdf-view-videos::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 3px;
}

.ul-pdf-view-videos::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
