<template>
  <div>
    <main class="main">
      <div class="page-content">
        <div class="container">
          <div class="row">
            <div class="col-lg-10 offset-lg-1">
              <h2 class="about-us-title">
                Gallery
              </h2><!-- End .title -->
              <router-link to="/media/gallery" class="btn btn-primary btn-round btn-shadow float-right">
                <i class="icon-long-arrow-left"></i><span>Back to Gallery</span>
              </router-link>
              <p class="lead about-us-lead text-primary mb-1">
                Journey Through the Lens: Our Story in Pictures
              </p>

              <h2 class="text-primary text-2">
                {{ showroom.name }}
              </h2>

              <p class="about-us-lead"></p>

              <div class="row">
                <div class="col-lg-12 gallery_items">
                  <div class="entry-container max-col-3">
                    <div v-for="(image, index) in showroom.gallery_images" :key="index" class="entry-item lifestyle shopping col-sm-4">
                      <article class="entry entry-grid text-center">
                        <figure class="entry-media">
                          <a href="#" @click="showMultiple(index)">
                            <img :src="'/storage/' + image.name" :alt="showroom.name" />
                          </a>
                        </figure><!-- End .entry-media -->
                      </article><!-- End .entry -->
                    </div><!-- End .entry-item -->

                    <!-- show images -->
                    <vue-easy-lightbox
                      esc-disabled
                      :visible="visible"
                      :imgs="imgs"
                      :index="indexRef"
                      @hide="handleHide"
                    />
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

import { ref, computed, watch, onMounted, onUnmounted, watchEffect } from 'vue';

  import { useRoute } from 'vue-router';

  import { useMeta } from '../../admin/composables/use-meta';
  //useMeta({ title: "Showroom Details" });


  const route = useRoute();
  const currentRoute = ref(route);


  const showroom = ref([]);
  const other_showrooms = ref([]);
  const showroom_id = ref(route.params.id ? parseInt(route.params.id) : 1);



   import VueEasyLightbox from 'vue-easy-lightbox';



  // Fetch showrooms based on the current page
  const fetchShowroom = async () => {

    try {
      const response = await axios.get('/api/get-media-center-galleries-details', {
        params: {
          showroom_id: showroom_id.value,
        },
      });
      showroom.value = response.data.showroom;

      //useMeta({ title: showroom.value.name + " | Gallery" });
    } catch (error) {
      console.error(error);
    }
  };

  const imgs = ref([]);
  const rootUrl = window.location.protocol + '//' + window.location.host;



  const showMultiple = async (index) => {
    imgs.value = showroom.value.gallery_images.map(item => rootUrl + '/storage/' +item.name);
    show(index);
  };

  const visible = ref(false);
  const indexRef = ref(0);
  const show = (index) => {
    indexRef.value = index;
    visible.value = true;
  };

  const handleHide = () => {
    visible.value = false;
  };



  const getShowroomLink = (id, name) => {
    // Replace spaces with dashes
    let transformedName = name.replace(/ /g, '-');
    // Remove consecutive dashes
    transformedName = transformedName.replace(/-+/g, '-');
    // Remove leading and trailing dashes
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    // Convert to lowercase
    transformedName = transformedName.toLowerCase();



    return `/showroom/${id}/${transformedName}`;
  };

  const getCategoryLink = (id, name, page) => {
    //Replace spaces with dashes
    let transformedName = name.replace(/ /g, '-');
    // Remove consecutive dashes
    transformedName = transformedName.replace(/-+/g, '-');
    // Remove leading and trailing dashes
    transformedName = transformedName.replace(/^-+|-+$/g, '');
    // Convert to lowercase
    transformedName = transformedName.toLowerCase();



    return `/category/${id}/${transformedName}/page/${page}`;
  };

  // const renderAsRawHTML = (html) => {
  //     return { __html: html };
  // };


  // Initial fetch of showrooms
  onMounted(() => {
    fetchShowroom();

  });

  const mainImage = ref('');
  const activeIndex = ref(0);

  const changeMainImage = (imageName, index) => {
    mainImage.value = imageName;
    activeIndex.value = index;
  };

  watch(showroom, () => {
    if (showroom.value.gallery_images.length > 0) {
      mainImage.value = showroom.value.gallery_images[0].name;
    }
  });

  const adjustTheClass1Height = () => {
    const carouselHeight = this.$refs.carousel.$el.offsetHeight;
    this.$refs.carousel.$el.closest('.theClass1-wrapper').style.height = carouselHeight + 'px';
  };

  watchEffect(() => {
    const params = route.params; // Access the route parameters
    const query = route.query; // Access the query parameters

    if( params.id !== '' && showroom_id.value !== params.id ){

        showroom_id.value = params.id ? parseInt(params.id) : 1;

        fetchShowroom();

    }
});

</script>
