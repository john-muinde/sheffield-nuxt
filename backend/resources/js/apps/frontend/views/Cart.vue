<template>
  <div class="page-wrapper">
    <main class="main">
      <!-- <div
        class="page-header text-center"
        style="background-image: url('../assets/images/page-header-bg.jpg')"
      >
        <div class="container">
          <h1 class="page-title">Shopping Cart<span>Shop</span></h1>
        </div>
       
      </div> -->
      <!-- End .page-header -->
      <nav aria-label="breadcrumb" class="breadcrumb-nav">
        <div class="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="/">
                HOME
              </router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              CART
            </li>
          </ol>
        </div>
        <!-- End .container -->
      </nav>
      <!-- End .breadcrumb-nav -->

      <div class="page-content">
        <div class="cart">
          <div class="container">
            <div class="row">
              <div class="col-lg-9">
                <table class="table table-cart table-mobile">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Brand</th>
                      <th>Quantity</th>
                      <th></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr v-for="(item, index) in cartItems" :key="index">
                      <td class="product-col">
                        <div class="product">
                          <figure class="product-media">
                            <a href="#">
                              <img
                                :src="'/storage/' + item.main_image_path"
                                alt="product"
                              />
                            </a>
                          </figure>

                          <h3 class="product-title">
                            <a href="#">{{ item.name }}</a>
                          </h3>
                          <!-- End .product-title -->
                        </div>
                        <!-- End .product -->
                      </td>
                      <td class="price-col">
                        <img
                          v-if="item.product_brand && item.product_brand.main_image_path"
                          :src="'/storage/' + item.product_brand.main_image_path"
                          alt="product"
                          style="max-width: 50%;"
                        />
                      </td>
                      <td class="quantity-col">
                        <div class="cart-product-quantity">
                          <input
                            type="number"
                            class="form-control"
                            min="1"
                            max="10"
                            step="1"
                            data-decimals="0"
                            required
                            :value="item.quantity"
                          />
                        </div>
                        <!-- End .cart-product-quantity -->
                      </td>
                     
                      <td class="remove-col">
                        <button class="btn-remove">
                          <i class="icon-close"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- End .table table-wishlist -->

                
                <!-- End .cart-bottom -->
              </div>
              <!-- End .col-lg-9 -->
              <aside class="col-lg-3">
                <div class="summary summary-cart">
                  <h3 class="summary-title">
                    Cart Total
                  </h3>
                  <!-- End .summary-title -->

                  <table class="table table-summary">
                    <tbody>
                      <tr class="summary-subtotal">
                        <td>Subtotal:</td>
                        <td>$160.00</td>
                      </tr>
                      <!-- End .summary-subtotal -->
                      <tr class="summary-shipping">
                        <td>Shipping:</td>
                        <td>&nbsp;</td>
                      </tr>

                      <tr class="summary-shipping-row">
                        <td>
                          <div class="custom-control custom-radio">
                            <input
                              id="free-shipping"
                              type="radio"
                              name="shipping"
                              class="custom-control-input"
                            />
                            <label
                              class="custom-control-label"
                              for="free-shipping"
                            >Free Shipping</label>
                          </div>
                          <!-- End .custom-control -->
                        </td>
                        <td>$0.00</td>
                      </tr>
                      <!-- End .summary-shipping-row -->

                      <tr class="summary-shipping-row">
                        <td>
                          <div class="custom-control custom-radio">
                            <input
                              id="standart-shipping"
                              type="radio"
                              name="shipping"
                              class="custom-control-input"
                            />
                            <label
                              class="custom-control-label"
                              for="standart-shipping"
                            >Standart:</label>
                          </div>
                          <!-- End .custom-control -->
                        </td>
                        <td>$10.00</td>
                      </tr>
                      <!-- End .summary-shipping-row -->

                      <tr class="summary-shipping-row">
                        <td>
                          <div class="custom-control custom-radio">
                            <input
                              id="express-shipping"
                              type="radio"
                              name="shipping"
                              class="custom-control-input"
                            />
                            <label
                              class="custom-control-label"
                              for="express-shipping"
                            >Express:</label>
                          </div>
                          <!-- End .custom-control -->
                        </td>
                        <td>$20.00</td>
                      </tr>
                      <!-- End .summary-shipping-row -->

                      <tr class="summary-shipping-estimate">
                        <td>
                          Estimate for Your Country<br />
                          <a href="dashboard.html">Change address</a>
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                      <!-- End .summary-shipping-estimate -->

                      <tr class="summary-total">
                        <td>Total:</td>
                        <td>$160.00</td>
                      </tr>
                      <!-- End .summary-total -->
                    </tbody>
                  </table>
                  <!-- End .table table-summary -->

                  <router-link
                    to="/checkout"
                    class="btn btn-outline-primary-2 btn-order btn-block"
                  >
                    PROCEED TO RFQ
                  </router-link>
                </div>
                <!-- End .summary -->
              </aside>
              <!-- End .col-lg-3 -->
            </div>
            <!-- End .row -->
          </div>
          <!-- End .container -->
        </div>
        <!-- End .cart -->
      </div>
      <!-- End .page-content -->
    </main>
  </div>
</template>

<script setup>
  import { useStore } from 'vuex';
  const store = useStore();

  const cartItems = store.state.cart.cartItems;

  const removeFromCart = (index) => {
    store.dispatch('cart/removeFromCart', index);
  };
</script>

<style scoped>
  .cart .product .product-media {
    position: relative;
    width: 100%;
    height: 50px;
    overflow: hidden;
    text-align: center;
    background-color: #ffffff;
        padding-top: 0%;
}
</style>
