<template>
    <div>
        <main class="main">
            <nav aria-label="breadcrumb" class="breadcrumb-nav">
                <div class="container">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item">
                            <NuxtLink to="/">
                                HOME
                            </NuxtLink>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">
                            FAQ
                        </li>
                    </ol>
                </div>
                <!-- End .container -->
            </nav>
            <!-- End .breadcrumb-nav -->

            <div class="page-content">
                <div class="container terms_page">
                    <div v-for="(section, sectionIndex) in faqSections" :key="sectionIndex">
                        <div class="headings">
                            <h3 class="heading text-primary">
                                {{ section.title }}
                            </h3>
                        </div>
                        <div :id="'accordion-' + sectionIndex" class="accordion accordion-rounded">
                            <div v-for="(faq, index) in section.faqs" :key="index"
                                class="card card-box card-sm bg-light">
                                <div :id="'heading-' + sectionIndex + '-' + (index + 1)" class="card-header">
                                    <h2 class="card-title">
                                        <a role="button" :class="{ collapsed: index !== 0 || sectionIndex !== 0 }"
                                            data-toggle="collapse"
                                            :href="'#collapse-' + sectionIndex + '-' + (index + 1)"
                                            :aria-expanded="index === 0 && sectionIndex === 0 ? 'true' : 'false'"
                                            :aria-controls="'collapse-' + sectionIndex + '-' + (index + 1)">
                                            {{ index + 1 }}. {{ faq.question }}
                                        </a>
                                    </h2>
                                </div>
                                <!-- End .card-header -->
                                <div :id="'collapse-' + sectionIndex + '-' + (index + 1)" class="collapse"
                                    :class="{ show: index === 0 && sectionIndex === 0 }"
                                    :aria-labelledby="'heading-' + sectionIndex + '-' + (index + 1)"
                                    :data-parent="'#accordion-' + sectionIndex">
                                    <div class="card-body">
                                        <p v-html="faq.answer"></p>
                                    </div>
                                    <!-- End .card-body -->
                                </div>
                                <!-- End .collapse -->
                            </div>
                            <!-- End .card -->
                        </div>
                        <!-- End .accordion -->
                    </div>
                </div>
                <!-- End .container -->
            </div>
            <!-- End .page-content -->
        </main>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import data from '~/assets/data/faqs.json';

useHead({
    title: 'Frequently Asked Questions (FAQ) - Sheffield',
    meta: [
        {
            name: 'description',
            content: 'Find answers to the most frequently asked questions about Sheffield. Learn more about our services, policies, and more.'
        },
        {
            name: 'keywords',
            content: 'Sheffield, FAQ, Frequently Asked Questions, Sheffield services, Sheffield policies, Sheffield support'
        }
    ]
});

const faqSections = ref(data.sections);

</script>

<style scoped>
.headings .heading {
    font-weight: 500;
    font-size: 2.1rem;
    margin-top: 2rem;
}

.card-title a {
    color: #333 !important;
    background: #ffffff;
    padding: 5px;
}

.collapse {
    visibility: unset;
}
</style>