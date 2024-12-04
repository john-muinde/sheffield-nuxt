<template>
  <div>
    <main class="main">
      <!-- <div
        class="page-header text-center"
        style="background-image: url('assets/images/page-header-bg.jpg')"
      >
        <div class="container">
          <h1 class="page-title">F.A.Q<span>Pages</span></h1>
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
              WARRANTY TERMS
            </li>
          </ol>
        </div>
        <!-- End .container -->
      </nav>
      <!-- End .breadcrumb-nav -->

      <div class="page-content pb-0 ">
        <div class="container terms_page">
          <div class="row">
            <div class="col-lg-12">
              <div class="headings">
                <h3 class="heading text-primary">
                  Warranty Terms
                </h3>
              </div>

              <ol style="list-style-type:decimal;">
                <li>
                  For optimum working of machines it is essential that the supply of other services are of the required specifications:
              
                  <ul style="list-style-type: lower-alpha;">
                    <li>Water should be soft and clear.</li>
                    <li>Drain should be the right size and right position.</li>
                    <li>Gas should be of the right size and right pressure.</li>
                    <li>Electrical supply should have stabilized and safety from phase failure, single phasing, and short circuit.</li>
                    <li>Trained qualified persons to authorize, clean, and maintain equipment.</li>
                  </ul>
                </li>
                <li>Equipment supplied will be of the right specification as per the quotation and warranty terms are only applicable if Sheffield technicians have done the installation.</li>
                <li>Warranty is NOT applicable if the client selects different equipment of make, model, or capacity than what is recommended that may strain the efficiency & effectiveness of the equipment.</li>
                <li>Warranty is only valid if our technicians execute the installation. Installation done independently by the client will render the warranty null and void.</li>
                <li>Warranty is only valid if our technicians execute the service/ repair works. Any service, repair work, and replacement of parts done by the client will render the warranty null and void.</li>
                <li>All structural stainless steel fabrication work will be under warranty for 2 years.</li>
                <li>All gas installations will be under warranty for 1 year.</li>
                <li>All refrigeration installations will be under warranty for 6 months.</li>
                <li>Electrical fittings do not carry any warranty because we don’t have the control over quality of the power supply. Goods quoted are of high quality and can last for very long if power guards are fitted to take care of voltage spikes and phase failure are installed.</li>
                <li>The warranty period applies from the date of delivery.</li>
                <li>Warranty does not cover the cost of transport, food, or accommodation. It only covers the cost of the replacement of spare parts without any charge.</li>
                <li>Warranty terms are not applicable for damages caused by negligent use, unauthorized repairs carried out by others, wear and tear, faulty supply of gas, water, or power, etc.</li>
                <li>Only our technicians should be authorized to carry out service and repairs to validate the warranty.</li>
                <li>Warranty terms apply only if the full cost of equipment has been paid to us. We cannot undertake repair and maintenance if the equipment has not been paid for in full.</li>
                <li>We shall either replace the malfunctioning spare parts or refund the cost of spare parts. The client cannot claim other consequential damages like loss of business, profits, etc.</li>
                <li>Rational carries a 2-year warranty if Sheffield installs the machines.</li>
                <li>Repair and maintenance under guarantee will be carried out during work hours i.e. between 8.00 am and 6.00 pm, from Monday to Saturday only.</li>
                <li>Warranty cost out of Nairobi – Travel, Food, and accommodation of Engineer/Technician will be in the scope of the client.</li>
                <li> Warranty claims will not be accepted without warranty certificate invoice reference.</li>
                <li> Replacement of the spares does not extend or restart the warranty.</li>
                <li>All costs of re-installation & relocation, cartage, freight, and insurance associated with this warranty will be paid by the claimant.</li>
                <li>Sheffield provides professional training and advice regarding the usage of goods supplied, this should be respected to validate the warranty.</li>
                <li>Warranty does not cover glass breakage and other physical elements of the equipment. The warranty only covers spares.</li>
              </ol>
              <p>
                <strong>LEGAL GOVERNANCE</strong><br />
                These terms and conditions are governed under the jurisdiction of the Republic of Kenya.
              </p>
            </div>
          </div>
        </div>
        <!-- End .container -->
      </div>
      <!-- End .page-content -->
    </main>
  </div>
</template>

<script setup>
  import { useMeta } from '../../admin/composables/use-meta';
useMeta({ title: 'Warranty Terms' });
</script>


