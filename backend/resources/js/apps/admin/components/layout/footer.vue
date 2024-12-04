<template>
  <!-- BEGIN FOOTER -->
  <div class="footer-wrapper">
    <div class="footer-section f-section-1">
      <p class="">
        Copyright © {{ year }} <a target="_blank" href="https://sheffieldafrica.com">Sheffield Africa</a>, All rights reserved.
      </p>
    </div>
  </div>
  <!-- END FOOTER -->
</template>

<script setup>
    const year = new Date().getFullYear();
</script>