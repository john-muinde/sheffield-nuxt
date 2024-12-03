<template>
    <div class="own-product position-relative px-2 product-card">
        <!-- Savings Badge -->
        <span class="savings-badge">
            Save {{ calculateDiscount(product.cost_price, product.retail_price) }}%
        </span>
        <!-- Product Image with loading skeleton -->
        <div class="product-image-container">
            <NuxtLink :to="getProductLink(product.id, product.name, product.model_number)"
                class="d-flex justify-content-center align-items-center mt-2">
                <div v-if="!imageLoaded" class="image-skeleton"></div>
                <img v-lazy="'/storage/' + product.main_image_path" :alt="product.name"
                    class="img img-fluid product-image" @load="imageLoaded = true" />
            </NuxtLink>
        </div>

        <!-- Product Details with improved spacing -->
        <div class="product-details">
            <!-- Product Name with ellipsis -->
            <span class="text-start product-name">{{ product.name }}</span>
            <!-- Description with ellipsis -->
            <span class="text-start text-muted product-description">
                {{ product.model_number }}
            </span>
        </div>

        <!-- Pricing Section -->
        <div class="pricing-section">
            <!-- Original Price -->
            <span class="fw-bold text-center text-muted original-price">
                KES {{ formatPrice(product.cost_price) }}
            </span>

            <!-- Discounted Price with animation -->
            <div class="price-tag bg-danger fw-bold text-uppercase">
                KES {{ formatPrice(product.retail_price) }}
            </div>

            <!-- Enhanced Add to Cart Button -->
            <div class="product-action-image">
                <button class="btn-product btn-cart" :class="{ adding: isAdding }" @click="addToCart(product)"
                    @mouseenter="showTooltip = true" @mouseleave="showTooltip = false">
                    <span class="btn-text">{{ addToCartText }}</span>
                    <div v-if="isAdding" class="btn-loading-icon">
                        <span class="spinner"></span>
                    </div>
                </button>
            </div>
        </div>

        <button id="scroll-top" title="Back to Top">
            <i class="icon-arrow-up"></i>
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    product: {
        type: Object,
        required: true,
    },
});

const product = props.product;


const isAdding = ref(false);
const showTooltip = ref(false);
const imageLoaded = ref(false);

</script>


<style scoped>
.product-card {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 12px;
    transition: all 0.3s ease;
    height: 380px !important;
    margin: 10px 0px 20px 0px;
}

.product-image-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

.product-image {
    object-fit: contain;
    width: 80%;
    height: 150px !important;
    border-radius: 10px;
}

.product-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 10px 0;
    margin-bottom: 0px;
}

.product-name {
    margin-bottom: 8px;
    color: black;
    font-weight: bold;
}

.product-description {
    font-size: 1.1rem;
    /* margin-bottom: 12px; */
}

.pricing-section {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    position: relative;
}

.original-price {
    text-decoration: line-through;
    font-size: 1.4rem;
    font-weight: bold;
}

.price-tag {
    width: 80%;
    color: white;
    text-align: center;
    border-radius: 10px;
    margin: 10px auto;
}

.product-action-image {
    display: flex;
    justify-content: center;
    padding: 10px 0;
}

.btn-product {
    position: relative;
}

.btn-loading-icon {
    position: absolute;
    right: 10px;
}
</style>

<style scoped>
/* Enhanced Animations and Styling */
.promo-image-wrapper {
    overflow: hidden;
    border-radius: 12px;
}

.promo-image {
    transition: transform 0.5s ease;
}

.promo-image-wrapper:hover .promo-image {
    transform: scale(1.05);
}

/* Banner animation */
.banner-animate {
    position: relative;
}

.banner-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%);
    animation: shine 3s infinite;
}

@keyframes shine {
    to {
        left: 200%;
    }
}

/* Product Card Enhancements */
.own-product {
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.own-product:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.image-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    height: 200px;
    border-radius: 10px;
}

@keyframes loading {
    to {
        background-position: -200% 0;
    }
}

/* Enhanced Add to Cart Button */
.product-action-image {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.95);
    width: 50%;
    border-radius: 10px;
    margin: auto;
    z-index: 10;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0;
    visibility: hidden;
    transform: translateY(50%);
}

.btn-product span,
.btn-product {
    color: #c02434 !important;
}

.btn-product {

    background: white;
    border: none;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.btn-product:hover {
    background: #f8f9fa;
}

.btn-product.adding {
    pointer-events: none;
    opacity: 0.8;
}

/* Loading Spinner */
.spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #f3f3f3;
    border-top: 2px solid #dc3545;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* Price Tag Animation */
.price-tag {
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.price-tag:hover {
    transform: scale(1.05);
}

/* Savings Badge */
.savings-badge {
    position: absolute;
    right: 10px;
    top: 10px;
    background: #28a745;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 1.1rem;
    font-weight: bold;
}

/* Quick View Button */
.quick-view-button {
    position: absolute;
    top: 10px;
    left: 10px;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.own-product:hover .quick-view-button {
    opacity: 1;
}

/* View All Button */
.view-all-button {
    transition: all 0.3s ease;
}

.view-all-button:hover {
    transform: translateX(5px);
}


/* Responsive Adjustments */
@media (max-width: 768px) {
    .product-action-image {
        width: 70%;
    }

    .own-product {
        margin-bottom: 20px;
    }

    .quick-view-button {
        opacity: 1;
    }
}
</style>
