<template>
  <div class="hero-section">
    <h1 v-if="!isOfferExpired" class="title">
      {{ title }}
    </h1>
    <h1 v-else class="title">
      No Offers available
    </h1>
  </div>
  <div class="landing-page">
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Special Discounts on Buffet, Servery & Food Processing Equipment',
      products: [
        {
          name: 'Automatic Citrus Juicer',
          description: 'Juices citrus fruits efficiently.',
          price: '160,000.00',
          offer: '128,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1694727807__gallery_10A.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/655/citrus-juicer-10a-10a',
        },
        {
          name: 'Automatic Orange Juicer (28 Oranges/Minute)',
          description: 'High-speed orange juicer.',
          price: '379,500.00',
          offer: '303,600.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1694727148__gallery_CANCAN%2028.jpeg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/651/automatic-orange-juicer-cancan-28-cancan-28',
        },
        {
          name: 'Automatic Orange Juicer (38 Oranges/Minute)',
          description: 'Efficient and powerful juicer.',
          price: '724,500.00',
          offer: '579,600.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1694727313__gallery_CANCAN%2038.jpeg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/652/automatic-orange-juicer-cancan-38-cancan-38',
        },
        {
          name: 'Automatic Orange Juicer',
          description: 'Reliable and efficient juicing.',
          price: '397,750.00',
          offer: '318,200.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1694727646__gallery_Z14%20Zummo.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/654/orange-juicer-z14-z14',
        },
        {
          name: 'Induction Cooker (Single Zone 5kw)',
          description: 'High-power induction cooking.',
          price: '75,000.00',
          offer: '60,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1723815064__gallery_Buffet%20&%20Servery%20and%20Food%20Processing%20SAP%20Listing.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1051/table-top-induction-cooker-single-zone-3.5-kw-sl-g35-tp3',
        },
        {
          name: 'Induction Cooker (Drop In 3kw)',
          description: 'Compact drop-in induction cooker.',
          price: '75,000.00',
          offer: '60,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1723815425__gallery_Drop%20in.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1052/induction-cooker-drop-in-3kw-sl-30c-xp3',
        },
        {
          name: 'Induction Cooker (Single Zone 5kw Table Top)',
          description: 'Portable table top induction cooker.',
          price: '75,000.00',
          offer: '60,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1723815766__gallery_Capture.JPG',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1053/induction-cooker-single-zone-5kw-table-top-sl-g50-kp9',
        },
        {
          name: 'Induction Wok (5kw Table Top)',
          description: 'High-performance induction wok.',
          price: '125,000.00',
          offer: '100,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1723816139__gallery_Capture%202.JPG',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1054/table-top-single-induction-wok-5kw-sl-g50-ka12',
        },
        {
          name: 'Induction Cooker (Two Zone Table Top 7kw)',
          description: 'Dual-zone table top induction cooker.',
          price: '125,000.00',
          offer: '100,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1723816903__gallery_2%20Zone.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1056/table-top-induction-cooker-two-zone-7kw-sl-c351-kpp3-y',
        },
        {
          name: 'Induction Cooker (Two Zone Side By Side 7kw)',
          description: 'Side-by-side dual zone induction cooker.',
          price: '125,000.00',
          offer: '100,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1723816699__gallery_Side%20by%20Side.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1055/two-zone-induction-cooker-(side-by-side)-7kw-sl-c351-kpp2',
        },
        {
          name: 'Induction Cooker (4 Zone 14kw)',
          description: 'Powerful four-zone induction cooker.',
          price: '275,000.00',
          offer: '220,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1723817904__gallery_4%20Zone.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1057/4-zone-induction-cooker-14kw-sl-c351-4s13-y',
        },
        {
          name: 'Hand Immersion Blender (500w)',
          description: 'High-power handheld immersion blender.',
          price: '166,750.00',
          offer: '133,400.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1724054153__gallery_31SBueCcbfL._SL500_1.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1066/hand-immersion-blender-500w-ib500lv',
        },
        {
          name: 'Brushless Blender',
          description: 'Efficient and quiet blending.',
          price: '92,000.00',
          offer: '73,600.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1694726079__gallery_SHG902.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/650/commercial-brushless-blender-1.5ltr-shg902',
        },
        {
          name: 'Potato Chipper (On Stand)',
          description: 'Easy and efficient potato cutting.',
          price: '42,550.00',
          offer: '34,040.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1694816664__gallery_JSPCC08.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/738/potato-chipper-on-stand-systematic-jspcc-08-jspcc-08',
        },
        {
          name: 'Vacuum Packers (DZ 300)',
          description: 'Reliable vacuum packing.',
          price: '195,000.00',
          offer: '156,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1724057576__gallery_images%20(1).jpeg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1068/vacuum-packing-machine-dz300-qiqiang-dz300',
        },
        {
          name: 'Vacuum Packers (DZ 400)',
          description: 'High-capacity vacuum packing.',
          price: '220,000.00',
          offer: '176,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1724059200__gallery_images%20(2).jpeg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1069/vacuum-packing-machine-dz400-qiqiang-dz400',
        },
        {
          name: 'Induction Fryer (23L)',
          description: 'Large-capacity induction fryer.',
          price: '425,000.00',
          offer: '340,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1723872334__gallery_download.jpeg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1058/induction-fryer-23l-sl-fr1c23a',
        },
        {
          name: 'Induction Griddle (6kw)',
          description: 'Powerful and efficient griddle.',
          price: '275,000.00',
          offer: '220,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1723873236__gallery_images.jpeg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1059/table-top-induction-griddle-6kw-grt24b',
        },
        {
          name: 'Thermo Box (3 GN H-Kitchen)',
          description: 'Thermal food storage box.',
          price: '90,000.00',
          offer: '72,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1723811493__gallery_Buffet%20&%20Servery%20and%20Food%20Processing%20SAP%20Listing.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1050/3-gn-thermobox-cpwk090-1',
        },
        {
          name: 'Chaffing Dish (9L Oblong Roll Top)',
          description: 'Stylish food presentation.',
          price: '46,000.00',
          offer: '34,500.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1694502570__gallery_R23301-2.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/427/chafing-dish-roll-top-double-pan-9-litres-r23301-2',
        },
        {
          name: 'Chaffing Dish (9L Oblong Roll Top with Visible Window)',
          description: 'Stylish food presentation with visibility.',
          price: '48,000.00',
          offer: '36,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1694503662__gallery_R2302.jpg',
          link: 'https://www.sheffieldafrica.com/kitchen/product/431/chafing-dish-roll-top-9-litres-with-glass-lid-ra2302',
        },
        {
          name: 'Microwave Oven (34 LTR)',
          description: 'High-capacity microwave.',
          price: '245,000.00',
          offer: '196,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1724049034__gallery_Capture.JPG',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1061/microwave-oven-34ltr-ema34gtqs00e00',
        },
        {
          name: 'Microwave Oven (25 LTR)',
          description: 'Compact microwave oven.',
          price: '155,000.00',
          offer: '124,000.00',
          image: 'https://www.sheffieldafrica.com/storage/uploads/1724048788__gallery_Capture.JPG',
          link: 'https://www.sheffieldafrica.com/kitchen/product/1060/microwave-oven-25ltr-em025fjts0sf00',
        },
],

    };
  },
  computed: {
    isOfferExpired() {
      const currentDate = new Date();
      const offerEndDate = new Date('2024-09-26');
      return currentDate > offerEndDate;
    },
  },
};
</script>

<style scoped>
.landing-page {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-right: 40px;
  margin-left: 40px;
}

.hero-section {
  background-color: #e1341e;
  color: white;
  padding: 50px 20px;
  text-align: center;
  margin-top: 0px;
}

.title {
  font-size: 3rem;
  font-weight: bold;
  color: white;
}

.subtitle {
  font-size: 1.5rem;
  margin-top: 10px;
  color: #ddd;
}

.content-section {
  padding: 40px 20px;
  background-color: #FFF;
  color: #333;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.product-list {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr); /* Default to 2 columns */
}

/* Mobile (2 columns) */
@media (max-width: 511px) {
  .product-list {
    grid-template-columns: repeat(1, 1fr);
  }
}

/* Mobile (2 columns) */
@media (min-width: 512px) {
  .product-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Tablets (3 columns) */
@media (min-width: 768px) {
  .product-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Desktop (4 columns) */
@media (min-width: 992px) {
  .product-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Extra Wide Screens (6 columns) */
@media (min-width: 1200px) {
  .product-list {
    grid-template-columns: repeat(6, 1fr);
  }
}


.product-card {
  background-color: #F7F7F7;
  border: 1px solid #DDD;
  padding: 20px;
  flex: 1 1 calc(25% - 40px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  width: 100%;
  height: auto;
  margin-bottom: 15px;
  object-fit: cover;
  border-radius: 8px;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #F44336;
}

.contact-section {
  background-color: #FAFAFA;
  padding: 40px 20px;
  color: #333;
}

.contact-details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.retail-price {
  font-size: 12px;
  text-decoration: line-through;
}
</style>
