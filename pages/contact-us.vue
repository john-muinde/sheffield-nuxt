<template>
    <div>
        <main class="main">

            <!-- End .breadcrumb-nav -->

            <div class="page-content pb-0 my-header-image-section">
                <!--  <img class="my-header-image mb-1" src="/assets/images/contact_us_banner.jpg">
              <div class="container">
                  <div class="row justify-content-center mb-4">
  
                  </div>
                </div> -->

                <div class="pt-1 page-content-contact">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-10 offset-lg-1">
                                <h2 class="about-us-title">
                                    Contact Us
                                </h2>
                                <!-- End .title -->
                                <p class="lead about-us-lead text-primary mb-1">
                                    Use the form below to get in touch with our team
                                </p>
                            </div>

                            <!--   <div class="col-lg-10 offset-lg-1">
  
  
                          <p class="mb-t">
                            Use the form below to get in touch with our team
                          </p>
  
                      </div> -->
                            <div class="offset-lg-1 col-lg-5 mb-3 mb-lg-0 contact-form-div">
                                <form class="contact-form mb-3 my_form_contact_us" @submit.prevent="submitForm">
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <label for="cname" class="label-contact">First Name *</label>
                                            <input id="firstname" v-model="contact.firstname" type="text"
                                                class="form-control" name="firstname"
                                                placeholder="Please enter your first name" required />
                                        </div>

                                        <div class="col-sm-12">
                                            <label for="cname" class="label-contact">Surname *</label>
                                            <input id="surname" v-model="contact.surname" type="text"
                                                class="form-control" name="surname"
                                                placeholder="Please enter your surname" required />
                                        </div>

                                        <div class="col-sm-12">
                                            <label for="cname" class="label-contact">Phone Number *</label>
                                            <div class="input-group">
                                                <div style="max-width: 35%; width: 35%" class="input-group-prepend">
                                                    <select v-model="contact.code" required class="form-control"
                                                        name="code">
                                                        <option value="">
                                                            Select Code
                                                        </option>
                                                        <option value="93">
                                                            Afghanistan +93
                                                        </option>
                                                        <option value="358">
                                                            Aland Islands +358
                                                        </option>
                                                        <option value="355">
                                                            Albania +355
                                                        </option>
                                                        <option value="213">
                                                            Algeria +213
                                                        </option>
                                                        <option value="1684">
                                                            American Samoa +1684
                                                        </option>
                                                        <option value="376">
                                                            Andorra +376
                                                        </option>
                                                        <option value="244">
                                                            Angola +244
                                                        </option>
                                                        <option value="1264">
                                                            Anguilla +1264
                                                        </option>
                                                        <option value="672">
                                                            Antarctica +672
                                                        </option>
                                                        <option value="1268">
                                                            Antigua and Barbuda +1268
                                                        </option>
                                                        <option value="54">
                                                            Argentina +54
                                                        </option>
                                                        <option value="374">
                                                            Armenia +374
                                                        </option>
                                                        <option value="297">
                                                            Aruba +297
                                                        </option>
                                                        <option value="61">
                                                            Australia +61
                                                        </option>
                                                        <option value="43">
                                                            Austria +43
                                                        </option>
                                                        <option value="994">
                                                            Azerbaijan +994
                                                        </option>
                                                        <option value="1242">
                                                            Bahamas +1242
                                                        </option>
                                                        <option value="973">
                                                            Bahrain +973
                                                        </option>
                                                        <option value="880">
                                                            Bangladesh +880
                                                        </option>
                                                        <option value="1246">
                                                            Barbados +1246
                                                        </option>
                                                        <option value="375">
                                                            Belarus +375
                                                        </option>
                                                        <option value="32">
                                                            Belgium +32
                                                        </option>
                                                        <option value="501">
                                                            Belize +501
                                                        </option>
                                                        <option value="229">
                                                            Benin +229
                                                        </option>
                                                        <option value="1441">
                                                            Bermuda +1441
                                                        </option>
                                                        <option value="975">
                                                            Bhutan +975
                                                        </option>
                                                        <option value="591">
                                                            Bolivia +591
                                                        </option>
                                                        <option value="599">
                                                            Bonaire, Sint Eustatius and Saba +599
                                                        </option>
                                                        <option value="387">
                                                            Bosnia and Herzegovina +387
                                                        </option>
                                                        <option value="267">
                                                            Botswana +267
                                                        </option>
                                                        <option value="55">
                                                            Bouvet Island +55
                                                        </option>
                                                        <option value="55">
                                                            Brazil +55
                                                        </option>
                                                        <option value="246">
                                                            British Indian Ocean Territory +246
                                                        </option>
                                                        <option value="673">
                                                            Brunei Darussalam +673
                                                        </option>
                                                        <option value="359">
                                                            Bulgaria +359
                                                        </option>
                                                        <option value="226">
                                                            Burkina Faso +226
                                                        </option>
                                                        <option value="257">
                                                            Burundi +257
                                                        </option>
                                                        <option value="855">
                                                            Cambodia +855
                                                        </option>
                                                        <option value="237">
                                                            Cameroon +237
                                                        </option>
                                                        <option value="1">
                                                            Canada +1
                                                        </option>
                                                        <option value="238">
                                                            Cape Verde +238
                                                        </option>
                                                        <option value="1345">
                                                            Cayman Islands +1345
                                                        </option>
                                                        <option value="236">
                                                            Central African Republic +236
                                                        </option>
                                                        <option value="235">
                                                            Chad +235
                                                        </option>
                                                        <option value="56">
                                                            Chile +56
                                                        </option>
                                                        <option value="86">
                                                            China +86
                                                        </option>
                                                        <option value="61">
                                                            Christmas Island +61
                                                        </option>
                                                        <option value="672">
                                                            Cocos (Keeling) Islands +672
                                                        </option>
                                                        <option value="57">
                                                            Colombia +57
                                                        </option>
                                                        <option value="269">
                                                            Comoros +269
                                                        </option>
                                                        <option value="242">
                                                            Congo +242
                                                        </option>
                                                        <option value="242">
                                                            Congo, Democratic Republic of the Congo +242
                                                        </option>
                                                        <option value="682">
                                                            Cook Islands +682
                                                        </option>
                                                        <option value="506">
                                                            Costa Rica +506
                                                        </option>
                                                        <option value="225">
                                                            Cote D'Ivoire +225
                                                        </option>
                                                        <option value="385">
                                                            Croatia +385
                                                        </option>
                                                        <option value="53">
                                                            Cuba +53
                                                        </option>
                                                        <option value="599">
                                                            Curacao +599
                                                        </option>
                                                        <option value="357">
                                                            Cyprus +357
                                                        </option>
                                                        <option value="420">
                                                            Czech Republic +420
                                                        </option>
                                                        <option value="45">
                                                            Denmark +45
                                                        </option>
                                                        <option value="253">
                                                            Djibouti +253
                                                        </option>
                                                        <option value="1767">
                                                            Dominica +1767
                                                        </option>
                                                        <option value="1809">
                                                            Dominican Republic +1809
                                                        </option>
                                                        <option value="593">
                                                            Ecuador +593
                                                        </option>
                                                        <option value="20">
                                                            Egypt +20
                                                        </option>
                                                        <option value="503">
                                                            El Salvador +503
                                                        </option>
                                                        <option value="240">
                                                            Equatorial Guinea +240
                                                        </option>
                                                        <option value="291">
                                                            Eritrea +291
                                                        </option>
                                                        <option value="372">
                                                            Estonia +372
                                                        </option>
                                                        <option value="251">
                                                            Ethiopia +251
                                                        </option>
                                                        <option value="500">
                                                            Falkland Islands (Malvinas) +500
                                                        </option>
                                                        <option value="298">
                                                            Faroe Islands +298
                                                        </option>
                                                        <option value="679">
                                                            Fiji +679
                                                        </option>
                                                        <option value="358">
                                                            Finland +358
                                                        </option>
                                                        <option value="33">
                                                            France +33
                                                        </option>
                                                        <option value="594">
                                                            French Guiana +594
                                                        </option>
                                                        <option value="689">
                                                            French Polynesia +689
                                                        </option>
                                                        <option value="262">
                                                            French Southern Territories +262
                                                        </option>
                                                        <option value="241">
                                                            Gabon +241
                                                        </option>
                                                        <option value="220">
                                                            Gambia +220
                                                        </option>
                                                        <option value="995">
                                                            Georgia +995
                                                        </option>
                                                        <option value="49">
                                                            Germany +49
                                                        </option>
                                                        <option value="233">
                                                            Ghana +233
                                                        </option>
                                                        <option value="350">
                                                            Gibraltar +350
                                                        </option>
                                                        <option value="30">
                                                            Greece +30
                                                        </option>
                                                        <option value="299">
                                                            Greenland +299
                                                        </option>
                                                        <option value="1473">
                                                            Grenada +1473
                                                        </option>
                                                        <option value="590">
                                                            Guadeloupe +590
                                                        </option>
                                                        <option value="1671">
                                                            Guam +1671
                                                        </option>
                                                        <option value="502">
                                                            Guatemala +502
                                                        </option>
                                                        <option value="44">
                                                            Guernsey +44
                                                        </option>
                                                        <option value="224">
                                                            Guinea +224
                                                        </option>
                                                        <option value="245">
                                                            Guinea-Bissau +245
                                                        </option>
                                                        <option value="592">
                                                            Guyana +592
                                                        </option>
                                                        <option value="509">
                                                            Haiti +509
                                                        </option>
                                                        <option value="39">
                                                            Holy See (Vatican City State) +39
                                                        </option>
                                                        <option value="504">
                                                            Honduras +504
                                                        </option>
                                                        <option value="852">
                                                            Hong Kong +852
                                                        </option>
                                                        <option value="36">
                                                            Hungary +36
                                                        </option>
                                                        <option value="354">
                                                            Iceland +354
                                                        </option>
                                                        <option value="91">
                                                            India +91
                                                        </option>
                                                        <option value="62">
                                                            Indonesia +62
                                                        </option>
                                                        <option value="98">
                                                            Iran, Islamic Republic of +98
                                                        </option>
                                                        <option value="964">
                                                            Iraq +964
                                                        </option>
                                                        <option value="353">
                                                            Ireland +353
                                                        </option>
                                                        <option value="44">
                                                            Isle of Man +44
                                                        </option>
                                                        <option value="972">
                                                            Israel +972
                                                        </option>
                                                        <option value="39">
                                                            Italy +39
                                                        </option>
                                                        <option value="1876">
                                                            Jamaica +1876
                                                        </option>
                                                        <option value="81">
                                                            Japan +81
                                                        </option>
                                                        <option value="44">
                                                            Jersey +44
                                                        </option>
                                                        <option value="962">
                                                            Jordan +962
                                                        </option>
                                                        <option value="7">
                                                            Kazakhstan +7
                                                        </option>
                                                        <option selected value="254">
                                                            Kenya +254
                                                        </option>
                                                        <option value="686">
                                                            Kiribati +686
                                                        </option>

                                                        <option value="82">
                                                            Korea, Republic of +82
                                                        </option>
                                                        <option value="381">
                                                            Kosovo +383
                                                        </option>
                                                        <option value="965">
                                                            Kuwait +965
                                                        </option>
                                                        <option value="996">
                                                            Kyrgyzstan +996
                                                        </option>

                                                        <option value="371">
                                                            Latvia +371
                                                        </option>
                                                        <option value="961">
                                                            Lebanon +961
                                                        </option>
                                                        <option value="266">
                                                            Lesotho +266
                                                        </option>
                                                        <option value="231">
                                                            Liberia +231
                                                        </option>
                                                        <option value="218">
                                                            Libyan Arab Jamahiriya +218
                                                        </option>
                                                        <option value="423">
                                                            Liechtenstein +423
                                                        </option>
                                                        <option value="370">
                                                            Lithuania +370
                                                        </option>
                                                        <option value="352">
                                                            Luxembourg +352
                                                        </option>
                                                        <option value="853">
                                                            Macao +853
                                                        </option>

                                                        <option value="261">
                                                            Madagascar +261
                                                        </option>
                                                        <option value="265">
                                                            Malawi +265
                                                        </option>
                                                        <option value="60">
                                                            Malaysia +60
                                                        </option>
                                                        <option value="960">
                                                            Maldives +960
                                                        </option>
                                                        <option value="223">
                                                            Mali +223
                                                        </option>
                                                        <option value="356">
                                                            Malta +356
                                                        </option>
                                                        <option value="692">
                                                            Marshall Islands +692
                                                        </option>
                                                        <option value="596">
                                                            Martinique +596
                                                        </option>
                                                        <option value="222">
                                                            Mauritania +222
                                                        </option>
                                                        <option value="230">
                                                            Mauritius +230
                                                        </option>
                                                        <option value="262">
                                                            Mayotte +262
                                                        </option>
                                                        <option value="52">
                                                            Mexico +52
                                                        </option>

                                                        <option value="373">
                                                            Moldova, Republic of +373
                                                        </option>
                                                        <option value="377">
                                                            Monaco +377
                                                        </option>
                                                        <option value="976">
                                                            Mongolia +976
                                                        </option>
                                                        <option value="382">
                                                            Montenegro +382
                                                        </option>
                                                        <option value="1664">
                                                            Montserrat +1664
                                                        </option>
                                                        <option value="212">
                                                            Morocco +212
                                                        </option>
                                                        <option value="258">
                                                            Mozambique +258
                                                        </option>
                                                        <option value="95">
                                                            Myanmar +95
                                                        </option>
                                                        <option value="264">
                                                            Namibia +264
                                                        </option>
                                                        <option value="674">
                                                            Nauru +674
                                                        </option>
                                                        <option value="977">
                                                            Nepal +977
                                                        </option>
                                                        <option value="31">
                                                            Netherlands +31
                                                        </option>
                                                        <option value="599">
                                                            Netherlands Antilles +599
                                                        </option>
                                                        <option value="687">
                                                            New Caledonia +687
                                                        </option>
                                                        <option value="64">
                                                            New Zealand +64
                                                        </option>
                                                        <option value="505">
                                                            Nicaragua +505
                                                        </option>
                                                        <option value="227">
                                                            Niger +227
                                                        </option>
                                                        <option value="234">
                                                            Nigeria +234
                                                        </option>
                                                        <option value="683">
                                                            Niue +683
                                                        </option>
                                                        <option value="672">
                                                            Norfolk Island +672
                                                        </option>

                                                        <option value="47">
                                                            Norway +47
                                                        </option>
                                                        <option value="968">
                                                            Oman +968
                                                        </option>
                                                        <option value="92">
                                                            Pakistan +92
                                                        </option>
                                                        <option value="680">
                                                            Palau +680
                                                        </option>

                                                        <option value="507">
                                                            Panama +507
                                                        </option>
                                                        <option value="675">
                                                            Papua New Guinea +675
                                                        </option>
                                                        <option value="595">
                                                            Paraguay +595
                                                        </option>
                                                        <option value="51">
                                                            Peru +51
                                                        </option>
                                                        <option value="63">
                                                            Philippines +63
                                                        </option>
                                                        <option value="64">
                                                            Pitcairn +64
                                                        </option>
                                                        <option value="48">
                                                            Poland +48
                                                        </option>
                                                        <option value="351">
                                                            Portugal +351
                                                        </option>
                                                        <option value="1787">
                                                            Puerto Rico +1787
                                                        </option>
                                                        <option value="974">
                                                            Qatar +974
                                                        </option>
                                                        <option value="262">
                                                            Reunion +262
                                                        </option>
                                                        <option value="40">
                                                            Romania +40
                                                        </option>
                                                        <option value="7">
                                                            Russian Federation +7
                                                        </option>
                                                        <option value="250">
                                                            Rwanda +250
                                                        </option>
                                                        <option value="590">
                                                            Saint Barthelemy +590
                                                        </option>
                                                        <option value="290">
                                                            Saint Helena +290
                                                        </option>
                                                        <option value="1869">
                                                            Saint Kitts and Nevis +1869
                                                        </option>
                                                        <option value="1758">
                                                            Saint Lucia +1758
                                                        </option>
                                                        <option value="590">
                                                            Saint Martin +590
                                                        </option>
                                                        <option value="508">
                                                            Saint Pierre and Miquelon +508
                                                        </option>
                                                        <option value="1784">
                                                            Saint Vincent +1784
                                                        </option>
                                                        <option value="684">
                                                            Samoa +684
                                                        </option>
                                                        <option value="378">
                                                            San Marino +378
                                                        </option>
                                                        <option value="239">
                                                            Sao Tome and Principe +239
                                                        </option>
                                                        <option value="966">
                                                            Saudi Arabia +966
                                                        </option>
                                                        <option value="221">
                                                            Senegal +221
                                                        </option>
                                                        <option value="381">
                                                            Serbia +381
                                                        </option>
                                                        <option value="381">
                                                            Serbia and Montenegro +381
                                                        </option>
                                                        <option value="248">
                                                            Seychelles +248
                                                        </option>
                                                        <option value="232">
                                                            Sierra Leone +232
                                                        </option>
                                                        <option value="65">
                                                            Singapore +65
                                                        </option>
                                                        <option value="721">
                                                            Sint Maarten +721
                                                        </option>
                                                        <option value="421">
                                                            Slovakia +421
                                                        </option>
                                                        <option value="386">
                                                            Slovenia +386
                                                        </option>
                                                        <option value="677">
                                                            Solomon Islands +677
                                                        </option>
                                                        <option value="252">
                                                            Somalia +252
                                                        </option>
                                                        <option value="27">
                                                            South Africa +27
                                                        </option>
                                                        <option value="211">
                                                            South Sudan +211
                                                        </option>
                                                        <option value="34">
                                                            Spain +34
                                                        </option>
                                                        <option value="94">
                                                            Sri Lanka +94
                                                        </option>
                                                        <option value="249">
                                                            Sudan +249
                                                        </option>
                                                        <option value="597">
                                                            Suriname +597
                                                        </option>
                                                        <option value="47">
                                                            Svalbard and Jan Mayen +47
                                                        </option>
                                                        <option value="268">
                                                            Swaziland +268
                                                        </option>
                                                        <option value="46">
                                                            Sweden +46
                                                        </option>
                                                        <option value="41">
                                                            Switzerland +41
                                                        </option>
                                                        <option value="963">
                                                            Syrian Arab Republic +963
                                                        </option>
                                                        <option value="886">
                                                            Taiwan, Province of China +886
                                                        </option>
                                                        <option value="992">
                                                            Tajikistan +992
                                                        </option>
                                                        <option value="255">
                                                            Tanzania +255
                                                        </option>
                                                        <option value="66">
                                                            Thailand +66
                                                        </option>
                                                        <option value="670">
                                                            Timor-Leste +670
                                                        </option>
                                                        <option value="228">
                                                            Togo +228
                                                        </option>
                                                        <option value="690">
                                                            Tokelau +690
                                                        </option>
                                                        <option value="676">
                                                            Tonga +676
                                                        </option>
                                                        <option value="1868">
                                                            Trinidad and Tobago +1868
                                                        </option>
                                                        <option value="216">
                                                            Tunisia +216
                                                        </option>
                                                        <option value="90">
                                                            Turkey +90
                                                        </option>
                                                        <option value="7370">
                                                            Turkmenistan +7370
                                                        </option>
                                                        <option value="1649">
                                                            Turks and Caicos Islands +1649
                                                        </option>
                                                        <option value="688">
                                                            Tuvalu +688
                                                        </option>
                                                        <option value="256">
                                                            Uganda +256
                                                        </option>
                                                        <option value="380">
                                                            Ukraine +380
                                                        </option>
                                                        <option value="971">
                                                            United Arab Emirates +971
                                                        </option>
                                                        <option value="44">
                                                            United Kingdom +44
                                                        </option>
                                                        <option value="1">
                                                            United States +1
                                                        </option>
                                                        <option value="598">
                                                            Uruguay +598
                                                        </option>
                                                        <option value="998">
                                                            Uzbekistan +998
                                                        </option>
                                                        <option value="678">
                                                            Vanuatu +678
                                                        </option>
                                                        <option value="58">
                                                            Venezuela +58
                                                        </option>
                                                        <option value="84">
                                                            Viet Nam +84
                                                        </option>
                                                        <option value="1284">
                                                            Virgin Islands, British +1284
                                                        </option>
                                                        <option value="1340">
                                                            Virgin Islands, U.s. +1340
                                                        </option>
                                                        <option value="681">
                                                            Wallis and Futuna +681
                                                        </option>
                                                        <option value="212">
                                                            Western Sahara +212
                                                        </option>
                                                        <option value="967">
                                                            Yemen +967
                                                        </option>
                                                        <option value="260">
                                                            Zambia +260
                                                        </option>
                                                        <option value="263">
                                                            Zimbabwe +263
                                                        </option>
                                                    </select>
                                                </div>
                                                <input id="phone_number" v-model="contact.phone_number"
                                                    style="width: 65%" type="text" class="form-control"
                                                    name="phone_number" placeholder="Please enter your phone number"
                                                    required />
                                            </div>
                                        </div>

                                        <div class="col-sm-12">
                                            <label for="email" class="label-contact">Email *</label>
                                            <input id="email" v-model="contact.email" type="email" class="form-control"
                                                name="email" placeholder="Please enter your email" required />
                                        </div>

                                        <div class="col-sm-12">
                                            <label for="company_name" class="label-contact">Company Name *</label>
                                            <input id="company_name" v-model="contact.company_name" type="company_name"
                                                class="form-control" name="company_name"
                                                placeholder="Please enter your company name" required />
                                        </div>

                                        <div class="col-sm-12">
                                            <label for="business_type" class="label-contact">Business Type *</label>

                                            <select id="business_type" v-model="contact.business_type"
                                                name="business_type" class="form-control" required>
                                                <option value="">
                                                    Select an option
                                                </option>
                                                <option value="HOTEL">
                                                    HOTEL
                                                </option>
                                                <option value="RESTAURANT">
                                                    RESTAURANT
                                                </option>
                                                <option value="CATERING">
                                                    CATERING
                                                </option>
                                                <option value="CLUB">
                                                    CLUB
                                                </option>
                                                <option value="BAR">
                                                    BAR
                                                </option>
                                                <option value="COFFEE SHOP">
                                                    COFFEE SHOP
                                                </option>
                                                <option value="CORPORATE">
                                                    CORPORATE
                                                </option>
                                                <option value="CONSTRUCTION">
                                                    CONSTRUCTION
                                                </option>
                                                <option value="ARCHITECTS & ENGINEERS">
                                                    ARCHITECTS & ENGINEERS
                                                </option>
                                                <option value="RESIDENTIAL">
                                                    RESIDENTIAL
                                                </option>
                                                <option value="INSTITUTION">
                                                    INSTITUTION
                                                </option>
                                                <option value="GOVERNMENT">
                                                    GOVERNMENT
                                                </option>
                                                <option value="BUTCHERY">
                                                    BUTCHERY
                                                </option>
                                                <option value="BAKERY">
                                                    BAKERY
                                                </option>
                                                <option value="ICE CREAM SHOP">
                                                    ICE CREAM SHOP
                                                </option>
                                                <option value="HEALTHCARE">
                                                    HEALTHCARE
                                                </option>
                                                <option value="LAUNDRY & CLEANING">
                                                    LAUNDRY & CLEANING
                                                </option>
                                                <option value="RETAIL & SUPERMARKETS">
                                                    RETAIL & SUPERMARKETS
                                                </option>
                                                <option value="FINANCIAL INSTITUTIONS">
                                                    FINANCIAL INSTITUTIONS
                                                </option>
                                                <option value="COLD CHAIN">
                                                    COLD CHAIN
                                                </option>
                                                <option value="FOOD PROCESSING">
                                                    FOOD PROCESSING
                                                </option>
                                                <option value="DISTRIBUTER">
                                                    DISTRIBUTER
                                                </option>
                                                <option value="TRADERS">
                                                    TRADERS
                                                </option>
                                                <option value="OTHERS">
                                                    OTHERS
                                                </option>
                                            </select>
                                        </div>

                                        <!-- End .col-sm-12 -->

                                        <div class="col-sm-12">
                                            <label for="request_type" class="label-contact">Request Type *</label>

                                            <select id="request_type" v-model="contact.request_type" name="request_type"
                                                class="form-control" required>
                                                <option value="">
                                                    Select an option
                                                </option>
                                                <option value="Quotation">
                                                    Quotation
                                                </option>
                                                <option value="Product Information">
                                                    Product Information
                                                </option>
                                                <option value="Service Request">
                                                    Service Request
                                                </option>
                                                <option value="Parts and Consumables">
                                                    Parts and Consumables
                                                </option>
                                            </select>
                                        </div>
                                        <!-- End .col-sm-12 -->

                                        <div class="col-sm-12">
                                            <label for="area_of_interest" class="label-contact">Area of Interest
                                                *</label>

                                            <select id="area_of_interest" v-model="contact.area_of_interest"
                                                name="area_of_interest" class="form-control" required>
                                                <option value="">
                                                    Select an option
                                                </option>
                                                <option value="Food Service Equipment">
                                                    Food Service Equipment
                                                </option>
                                                <option value="Laundry and Floor Cleaning">
                                                    Laundry and Floor Cleaning
                                                </option>
                                                <option value="Cold Storage">
                                                    Cold Storage
                                                </option>
                                                <option value="Others">
                                                    Others
                                                </option>
                                            </select>
                                        </div>

                                        <div class="col-sm-12">
                                            <label for="country" class="label-contact">Country *</label>

                                            <select id="country" v-model="contact.country" name="country"
                                                class="form-control" required>
                                                <option value="">
                                                    Select an option
                                                </option>
                                                <option value="Algeria">
                                                    Algeria
                                                </option>
                                                <option value="Angola">
                                                    Angola
                                                </option>
                                                <option value="Benin">
                                                    Benin
                                                </option>
                                                <option value="Botswana">
                                                    Botswana
                                                </option>
                                                <option value="Burkina Faso">
                                                    Burkina Faso
                                                </option>
                                                <option value="Burundi">
                                                    Burundi
                                                </option>
                                                <option value="Cabo Verde">
                                                    Cabo Verde
                                                </option>
                                                <option value="Cameroon">
                                                    Cameroon
                                                </option>
                                                <option value="Central African Republic">
                                                    Central African Republic
                                                </option>
                                                <option value="Chad">
                                                    Chad
                                                </option>
                                                <option value="Comoros">
                                                    Comoros
                                                </option>
                                                <option value="Congo (Brazzaville)">
                                                    Congo (Brazzaville)
                                                </option>
                                                <option value="Congo (Kinshasa)">
                                                    Congo (Kinshasa)
                                                </option>
                                                <option value="Cote d'Ivoire">
                                                    Cote d'Ivoire
                                                </option>
                                                <option value="Djibouti">
                                                    Djibouti
                                                </option>
                                                <option value="Egypt">
                                                    Egypt
                                                </option>
                                                <option value="Equatorial Guinea">
                                                    Equatorial Guinea
                                                </option>
                                                <option value="Eritrea">
                                                    Eritrea
                                                </option>
                                                <option value="Eswatini">
                                                    Eswatini
                                                </option>
                                                <option value="Ethiopia">
                                                    Ethiopia
                                                </option>
                                                <option value="Gabon">
                                                    Gabon
                                                </option>
                                                <option value="Gambia">
                                                    Gambia
                                                </option>
                                                <option value="Ghana">
                                                    Ghana
                                                </option>
                                                <option value="Guinea">
                                                    Guinea
                                                </option>
                                                <option value="Guinea-Bissau">
                                                    Guinea-Bissau
                                                </option>
                                                <option value="Kenya">
                                                    Kenya
                                                </option>
                                                <option value="Lesotho">
                                                    Lesotho
                                                </option>
                                                <option value="Liberia">
                                                    Liberia
                                                </option>
                                                <option value="Libya">
                                                    Libya
                                                </option>
                                                <option value="Madagascar">
                                                    Madagascar
                                                </option>
                                                <option value="Malawi">
                                                    Malawi
                                                </option>
                                                <option value="Mali">
                                                    Mali
                                                </option>
                                                <option value="Mauritania">
                                                    Mauritania
                                                </option>
                                                <option value="Mauritius">
                                                    Mauritius
                                                </option>
                                                <option value="Morocco">
                                                    Morocco
                                                </option>
                                                <option value="Mozambique">
                                                    Mozambique
                                                </option>
                                                <option value="Namibia">
                                                    Namibia
                                                </option>
                                                <option value="Niger">
                                                    Niger
                                                </option>
                                                <option value="Nigeria">
                                                    Nigeria
                                                </option>
                                                <option value="Rwanda">
                                                    Rwanda
                                                </option>
                                                <option value="Sao Tome and Principe">
                                                    Sao Tome and Principe
                                                </option>
                                                <option value="Senegal">
                                                    Senegal
                                                </option>
                                                <option value="Seychelles">
                                                    Seychelles
                                                </option>
                                                <option value="Sierra Leone">
                                                    Sierra Leone
                                                </option>
                                                <option value="Somalia">
                                                    Somalia
                                                </option>
                                                <option value="South Africa">
                                                    South Africa
                                                </option>
                                                <option value="South Sudan">
                                                    South Sudan
                                                </option>
                                                <option value="Sudan">
                                                    Sudan
                                                </option>
                                                <option value="Tanzania">
                                                    Tanzania
                                                </option>
                                                <option value="Togo">
                                                    Togo
                                                </option>
                                                <option value="Tunisia">
                                                    Tunisia
                                                </option>
                                                <option value="Uganda">
                                                    Uganda
                                                </option>
                                                <option value="Zambia">
                                                    Zambia
                                                </option>
                                                <option value="Zimbabwe">
                                                    Zimbabwe
                                                </option>
                                            </select>
                                        </div>

                                        <div class="col-lg-12">
                                            <label for="request" class="label-contact">Request*</label>
                                            <textarea id="request" v-model="contact.request" class="form-control"
                                                cols="30" rows="4" name="request" required
                                                placeholder="I'd like to find out more about your FOOD and LAUNDRY solutions, please get in touch with me."></textarea>
                                        </div>

                                        <div class="col-lg-12 mt-2">
                                            <label>
                                                <input v-model="contact.agree_to_marketing" type="checkbox"
                                                    style="margin-right: 10px" />
                                                <span style="margin-left: 10px">
                                                    Yes, I agree to receive marketing communications regarding
                                                    products, services, and events.
                                                </span>
                                            </label>
                                        </div>

                                        <div class="col-lg-12 mt-1">
                                            <label>
                                                <input v-model="contact.accept_terms_conditions" required
                                                    type="checkbox" style="margin-right: 10px" />
                                                <span style="margin-left: 10px">
                                                    Please read and agree to our
                                                    <router-link to="/terms-and-conditions">Terms and
                                                        Conditions</router-link>
                                                </span>
                                            </label>
                                        </div>

                                        <div class="col-lg-12 mt-1">
                                            <vue-recaptcha ref="recaptcha"
                                                :sitekey="'6Ldyw1wpAAAAAGx6vRq1hhnnfKaKHPmcuJ0imPkT'" size="normal"
                                                @verify="onRecaptchaVerify" />
                                        </div>
                                    </div>
                                    <!-- End .row -->

                                    <button type="submit" :disabled="isLoading"
                                        class="btn btn-primary btn-minwidth-sm mt-2">
                                        <div v-show="isLoading" class=""></div>
                                        <span v-if="isLoading">Processing...</span>
                                        <span v-else>SUBMIT</span>
                                        <i class="icon-long-arrow-right"></i>
                                    </button>
                                </form>
                            </div>
                            <!-- End .col-lg-5 -->

                            <div class="col-lg-5">
                                <div class="contact-images about-images">
                                    <img src="/assets/images/about/contact_us_sheffield.jpg" alt=""
                                        class="about-img-front" />
                                    <!-- <img src="/assets/images/about/img-2.jpg" alt="" class="about-img-back"> -->
                                </div>
                                <!-- End .about-images -->

                                <div class="contact-us-block mt-2">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="contact-info">
                                                <span class="contact_details_h3">Map</span>
                                            </div>
                                            <!-- End .contact-info -->
                                        </div>
                                        <!-- End .col-sm-7 -->
                                    </div>

                                    <div class="mb-2" style="height: 400px">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.404283237157!2d36.897868854447694!3d-1.3553081986318496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f0d988832605f%3A0x9fbb9391696ca583!2sSheffield%20Steel%20Systems%20Limited!5e0!3m2!1sen!2ske!4v1707294139960!5m2!1sen!2ske"
                                            width="100%" height="400" style="border:0;" allowfullscreen=""
                                            loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                                        <!-- gmaps-map requires a height to fill -->
                                        <!--<gmaps-map :zoom="16" :center="{ lat: -1.3553082, lng: 36.9030187 }">-->
                                        <!--  <gmaps-marker :position="{ lat: -1.3553082, lng: 36.9030187 }" />-->
                                        <!--</gmaps-map>-->
                                    </div>
                                </div>
                            </div>
                            <!-- End .col-lg-6 -->
                        </div>
                        <!-- End .row -->
                    </div>
                    <!-- End .container -->
                </div>
            </div>
            <!-- End .page-content -->
        </main>
    </div>
</template>

<script setup>
useHead({
    title: 'Contact Us',
    meta: [
        {
            name: 'description',
            content: 'Contact Sheffield Steel Systems for all your food service equipment, laundry and floor cleaning solutions.'
        },
        {
            name: 'keywords',
            content: 'Contact Sheffield Steel Systems, food service equipment, laundry solutions, floor cleaning solutions'
        }
    ]
});

import {
    ref,
    computed,
    watch,
    onMounted,
    onUnmounted,
    watchEffect,
    defineComponent,
    reactive,
} from 'vue';

import VueEasyLightbox from 'vue-easy-lightbox';

import { gmapsMap, gmapsMarker } from 'v3-gmaps';

const mapContainer = ref(null);

defineComponent({
    components: { gmapsMap, gmapsMarker },
});
import useContacts from '@/composables/contact';
import { useForm, useField, defineRule } from 'vee-validate';

const { executeRecaptcha, recaptchaLoaded } = useVueRecaptcha();

defineRule('required', required);
defineRule('min', min);

// Define a validation schema
const schema = {
    request_type: 'required|min:3',
    area_of_interest: 'required',
    surname: 'required|min:3',
    email: 'required|min:3',
    company_name: 'required',
    business_type: 'required',
    country: 'required',
    request: 'required',
};

// Create a form context with the validation schema
const { validate, errors } = useForm({ validationSchema: schema });
const { value: request_type } = useField('request_type', null, { initialValue: '' });
const { value: area_of_interest } = useField('area_of_interest', null, {
    initialValue: '',
});
const { value: surname } = useField('surname', null, { initialValue: '' });
const { value: email } = useField('email', null, { initialValue: '' });
const { value: company_name } = useField('company_name', null, { initialValue: '' });
const { value: business_type } = useField('business_type', null, { initialValue: '' });
const { value: country } = useField('country', null, { initialValue: '' });
const { value: request } = useField('request', null, { initialValue: '' });
const { value: code } = useField('code', null, { initialValue: '254' });

const { storeContact, validationErrors, isLoading } = useContacts();

const contact = reactive({
    request_type,
    area_of_interest,
    surname,
    email,
    company_name,
    business_type,
    country,
    request,
    code,
});

const onRecaptchaVerify = async (token) => {


    await submitForm();
};

const submitForm = async () => {
    try {
        const form = await validate();

        if (form.valid) {
            const recaptchaToken = await executeRecaptcha('contact_form');
            contact.recaptchaToken = recaptchaToken;
            storeContact(contact);
        }
    } catch (error) {

        console.error('Validation error:', error);
    }
};
</script>

<style>
.my-header-image {
    margin-top: 0px !important;
    margin-bottom: -100px;
    width: 100%;
}

.label-contact {
    color: #666666;
    font-weight: 300;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 0.1rem;
    margin: 0 0 1.1rem;
}

.form-control {
    margin-bottom: 1rem;
}

.contact-form-div {
    background-color: #ffffff;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 30px;
    padding-right: 30px;
}

.my_form_contact_us {
    background-color: #cccccc;
    padding: 30px;
    /*border-radius: 30px;*/
}

.my_form_contact_us label {
    color: #666666;
}

.about-image-front {
    position: relative;
    z-index: 2;
    border: 15px solid #df2030;
    border-radius: 20px;
    margin-top: 5rem;
}

.contact-us-block {
    background-color: #304296;
    padding: 30px;
    border-radius: 30px;
}

.contact-list li {
    color: #ffffff;
}

.contact-info span {
    color: #ffffff;
}

/* .the_main_div {
      margin-top: 0px !important;
  } */
</style>