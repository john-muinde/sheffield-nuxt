<template>
  <div>
    <main class="main">
      <!-- <div
          class="page-header text-center"
          style="background-image: url('/assets/images/page-header-bg.jpg')"
        >
          <div class="container">
            <h1 class="page-title text-white">
              Contact us<span class="text-white">keep in touch with us</span>
            </h1>
          </div>
         
        </div> -->
      <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
        <div class="container">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <NuxtLink to="/"> HOME </NuxtLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              LEASE & FINANCE
            </li>
          </ol>
        </div>
        <!-- End .container -->
      </nav>
      <!-- End .breadcrumb-nav -->

      <div class="page-content pb-0">
        <div class="container terms_page">
          <div class="row">
            <div class="col-lg-12">
              <div class="headings">
                <h3 class="heading text-primary">Lease & Finance</h3>
              </div>

              <p>
                Leasing has become a universally accepted method of financing
                and it is rare today to find a company that is not enjoying the
                benefits of a leasing program.
              </p>
              <p>
                Sheffield can inform you about the many benefits of leasing but
                only you know your organization’s long-term planning, cash flow,
                budget restrictions, tax position, and general financial policy.
              </p>
              <p>
                Sheffield has a leasing partner- KCB Bank Kenya Limited, who
                will do the pre-requisite and prequalification process and
                determine if leasing can provide the right answer to your
                financial requirements based on their assessment.
              </p>

              <h4 class="mt-3">Advantages of leasing:</h4>

              <ol style="list-style-type: disc; margin-left: 30px">
                <li>Frees up available cash and lines of credit</li>
                <li>
                  Allows you to pay for your equipment as your business
                  generates income
                </li>
                <li>You can lease to own</li>
                <li>Fix cost for the term of the loan</li>
                <li>Take control of your cash flow</li>
                <li>Manage your capital and debt</li>
                <li>Maintain flexible security over assets</li>
              </ol>

              <p>
                For further information on finance leasing of our solutions
                simply contact us on
                <a href="mailto:info@sheffieldafrica.com"
                  >info@sheffieldafrica.com</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
useHead({
  title: "Lease & Finance",
  meta: [
    {
      name: "description",
      content:
        "Leasing has become a universally accepted method of financing and it is rare today to find a company that is not enjoying the benefits of a leasing program.",
    },
  ],
});
</script>
