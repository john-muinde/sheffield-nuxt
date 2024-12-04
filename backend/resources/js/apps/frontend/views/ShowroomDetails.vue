<template>
  <main class="main">
    <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
      <div class="container">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/">
              Home
            </router-link>
          </li>
          <li class="breadcrumb-item">
            <router-link to="/about-us">
              About Us
            </router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ showroom.name }}
          </li>
        </ol>
      </div><!-- End .container -->
    </nav><!-- End .breadcrumb-nav -->


            

    <div class="page-content pb-0">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 mb-2 mb-lg-0">
            <h2 class="heading text-primary mb-1">
              {{ showroom.name }}
            </h2><!-- End .title mb-2 -->
            <div v-html="showroom.description"></div>
            <div class="row">
              <div class="col-sm-7 p-5">
                <div class="contact-info">
                  <h3>The Showroom</h3>

                  <ul class="contact-list">
                    <li>
                      <i class="icon-map-marker"></i>
                      {{ showroom.location }}
                    </li>
                    <li>
                      <i class="icon-phone"></i>
                      <a :href="'tel:'+showroom.phone_number1">{{ showroom.phone_number1 }}</a>
                    </li>
                    <li>
                      <i class="icon-phone"></i>
                      <a :href="'tel:'+showroom.phone_number2">{{ showroom.phone_number2 }}</a>
                    </li>
                    <li>
                      <i class="icon-envelope"></i>
                      <a href="'mailto:'+showroom.email">{{ showroom.email }}</a>
                    </li>
                  </ul><!-- End .contact-list -->
                </div><!-- End .contact-info -->
              </div><!-- End .col-sm-7 -->

              <div class="col-sm-5 p-5">
                <div class="contact-info">
                  <h3>&nbsp;</h3>

                  <ul class="contact-list">
                    <li>
                      <i class="icon-clock-o"></i>
                      <span class="text-dark">Monday-Saturday</span> <br />8am-5pm
                    </li>
                    <li>
                      <i class="icon-calendar"></i>
                      <span class="text-dark">Sunday & Holidays</span> <br />closed 
                    </li>
                  </ul><!-- End .contact-list -->
                </div><!-- End .contact-info -->
              </div><!-- End .col-sm-5 -->
            </div><!-- End .row -->
          </div><!-- End .col-lg-6 -->

          <div class="col-md-6">
            <div style="height: 400px">
              <!-- gmaps-map requires a height to fill -->
              <gmaps-map :zoom="16" :center="{ lat: parseFloat(showroom.latitude), lng: parseFloat(showroom.longitude) }">
                <gmaps-marker :position="{ lat: parseFloat(showroom.latitude), lng: parseFloat(showroom.longitude) }" />
              </gmaps-map>
            </div>
          </div><!-- End .col-lg-2 -->
        </div><!-- End .row -->

        <div class="row">
          <div class="col-lg-12 pt-3">
            <div class="entry-container max-col-3">
              <div v-for="(image, index) in showroom.showroom_images" :key="index" class="entry-item lifestyle shopping col-sm-4">
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

        <hr class="mt-4 mb-5" />

        <div class="stores mb-4 mb-lg-5">
          <h3 class="header text-primary text-left mb-3">
            Other Showrooms
          </h3><!-- End .title text-center mb-2 -->

          <div class="row">
            <div v-for="showroom in other_showrooms" :key="showroom.id" class="col-sm-6 col-lg-3">
              <article class="entry entry-grid">
                <figure class="entry-media">
                  <router-link :to="getShowroomLink(showroom.id, showroom.name)">
                    <img style="aspect-ratio: 3 / 2;" :src="'/storage/'+ showroom.main_image_path" alt="image desc" />
                  </router-link>
                </figure><!-- End .entry-media -->

                <div class="entry-body text-center pt-1">
                  <h2 class="entry-title">
                    <router-link :to="getShowroomLink(showroom.id, showroom.name)">
                      {{ showroom.name }}
                    </router-link>
                  </h2><!-- End .entry-title -->

                  <div class="entry-content">
                    <p>
                      <span>
                        <i style="color:rgb(223, 31, 49);" class="icon-phone "></i> 
                        <b>

                          <a
                            style="color: #777; text-decoration: none;" 
                            onmouseover="this.style.color='#c02434'" 
                            onmouseout="this.style.color='#777'"
                            class="text-grey pl-3"
                            :href="'tel:' + showroom.phone_number1"
                          >{{ showroom.phone_number1 }}</a>, 

                          <a
                            style="color: #777; text-decoration: none;" 
                            onmouseover="this.style.color='#c02434'" 
                            onmouseout="this.style.color='#777'"
                            class="text-grey"
                            :href="'tel:' + showroom.phone_number2"
                          >{{ showroom.phone_number2 }}</a>
                                   
                        </b>
                      </span><br /> 
                      <span>
                        <i style="color:rgb(223, 31, 49);" class="icon-envelope "></i>  
                        <b> 
                          <a
                            style="color: #777; text-decoration: none;" 
                            onmouseover="this.style.color='#c02434'" 
                            onmouseout="this.style.color='#777'"
                            class="text-grey pl-3"
                            :href="'mailto:'+showroom.email"
                          >{{ showroom.email }} </a> 
                        </b>
                      </span><br /> 
                      {{ showroom.location }}
                    </p> 
                          
                    <router-link :to="getShowroomLink(showroom.id, showroom.name)" class="btn btn-outline-primary">
                      <span>View More</span><i class="icon-long-arrow-right"></i>
                    </router-link>
                  </div><!-- End .entry-content -->
                </div><!-- End .entry-body -->
              </article><!-- End .entry -->
            </div><!-- End .col-lg-3 -->

                
            <!-- <div class="col-lg-6">
                  <div class="store">
                    <div class="row">
                      <div class="col-sm-5 col-xl-6">
                        <figure class="store-media mb-2 mb-lg-0">
                          <img src="assets/images/stores/img-1.jpg" alt="image">
                        </figure>
                      </div>
                      <div class="col-sm-7 col-xl-6">
                        <div class="store-content">
                          <h3 class="store-title">Wall Street Plaza</h3>
                          <address>88 Pine St, New York, NY 10005, USA</address>
                          <div><a href="tel:#">+1 987-876-6543</a></div>

                          <h4 class="store-subtitle">Store Hours:</h4>
                          <div>Monday - Saturday 11am to 7pm</div>
                          <div>Sunday 11am to 6pm</div>

                          <a href="#" class="btn btn-link" target="_blank"><span>View Map</span><i class="icon-long-arrow-right"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

             
                <div class="col-lg-6">
                  <div class="store">
                    <div class="row">
                      <div class="col-sm-5 col-xl-6">
                        <figure class="store-media mb-2 mb-lg-0">
                          <img src="assets/images/stores/img-1.jpg" alt="image">
                        </figure>
                      </div>
                      <div class="col-sm-7 col-xl-6">
                        <div class="store-content">
                          <h3 class="store-title">Wall Street Plaza</h3>
                          <address>88 Pine St, New York, NY 10005, USA</address>
                          <div><a href="tel:#">+1 987-876-6543</a></div>

                          <h4 class="store-subtitle">Store Hours:</h4>
                          <div>Monday - Saturday 11am to 7pm</div>
                          <div>Sunday 11am to 6pm</div>

                          <a href="#" class="btn btn-link" target="_blank"><span>View Map</span><i class="icon-long-arrow-right"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> -->
          </div><!-- End .row -->
        </div><!-- End .stores -->
      </div><!-- End .container -->
    </div><!-- End .page-content -->
  </main>
</template>




<script setup>
  import { ref, computed, watch, onMounted, onUnmounted, watchEffect, defineComponent } from 'vue';

  import VueEasyLightbox from 'vue-easy-lightbox';

  import { gmapsMap, gmapsMarker } from 'v3-gmaps';

  const mapContainer = ref(null);

    defineComponent({
      components: { gmapsMap, gmapsMarker },
    });



  import { useRoute } from 'vue-router';

  import { useMeta } from '../../admin/composables/use-meta';
  useMeta({ title: 'Showroom Details' });

  
  const route = useRoute();
  const currentRoute = ref(route);
  
 
  const showroom = ref([]);
  const other_showrooms = ref([]);
  const showroom_id = ref(route.params.id ? parseInt(route.params.id) : 1);

  // Fetch showrooms based on the current page
  const fetchShowroom = async () => {

    try {
      const response = await axios.get('/api/get-showroom', {
        params: {
          showroom_id: showroom_id.value,
        },
      });
      showroom.value = response.data.showroom;
      other_showrooms.value = response.data.other_showrooms;
      useMeta({ title: showroom.value.name + ' | Showroom' });
    } catch (error) {
      console.error(error);
    }
  };

  const imgs = ref([]);
  const rootUrl = window.location.protocol + '//' + window.location.host;
 
  const showSingle = () => {
     imgs.value = 'https://media.istockphoto.com/id/1189903200/photo/red-generic-sedan-car-isolated-on-white-background-3d-illustration.jpg?s=612x612&w=0&k=20&c=uRu3o_h5FVljLQHS9z0oyz-XjXzzXN_YkyGXwhdMrjs=';
    show();
  };

  
  const showMultiple = async (index) => {
    imgs.value = showroom.value.showroom_images.map(item => rootUrl + '/storage/' +item.name);
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
    if (showroom.value.showroom_images.length > 0) {
      mainImage.value = showroom.value.showroom_images[0].name;
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



