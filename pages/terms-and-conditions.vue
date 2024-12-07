<template>
  <div>
    <main class="main">
      <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
        <div class="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/"> HOME </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              TERMS AND CONDITIONS
            </li>
          </ol>
        </div>
      </nav>

      <div class="page-content pb-0">
        <div class="container terms_page">
          <div class="row">
            <div class="col-lg-12">
              <div ref="markdownContainer" v-html="renderedContent"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
import { ref, onMounted } from "vue";

useHead({
  title: "Terms and Conditions",
  meta: [
    {
      name: "description",
      content: "Our terms and conditions",
    },
  ],
});

const { formatMarkdownContent } = useMarkdown();
const markdownContainer = ref(null);

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

const renderedContent = ref("");

onMounted(async () => {
  try {
    const response = await import("~/assets/data/terms-and-conditions.md?raw");
    const rawContent = response.default;
    renderedContent.value = md.render(rawContent);
    await formatMarkdownContent(markdownContainer.value);
  } catch (error) {
    console.error("Error loading markdown content:", error);
    renderedContent.value = "Error loading content. Please try again later.";
  }
});
</script>

<style>
.terms_page h4 {
  margin-top: 20px;
}

.terms_page ul {
  list-style-type: none;
  padding-left: 0;
}

.terms_page ol {
  padding-left: 0;
}

.terms_page li {
  margin-bottom: 10px;
}

.terms_page li > ol {
  margin-top: 10px;
}

.terms_page .headings {
  margin-bottom: 20px;
}

.terms_page .heading {
  font-weight: bold;
}
</style>
