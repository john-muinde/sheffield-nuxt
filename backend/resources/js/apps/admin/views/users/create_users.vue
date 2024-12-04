<template>
  <div class="container">
    <teleport to="#breadcrumb">
      <ul class="navbar-nav flex-row">
        <li>
          <div class="page-header">
            <nav class="breadcrumb-one" aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="javascript:;">Users</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span>Create User</span>
                </li>
              </ol>
            </nav>
          </div>
        </li>
      </ul>
    </teleport>

    <div class="container">
      <div class="row">
        <div id="" class="col-lg-12 layout-spacing layout-top-spacing">
          <div class="statbox panel box box-shadow">
            <div class="panel-heading pb-0">
              <div class="row">
                <div class="col-xl-12 col-md-12 col-sm-12 col-12">
                  <h3><b>New User</b></h3>
                </div>
              </div>
            </div>
            <div class="panel-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="post-name"> Name</label>
                    <input
                      id="post-name"
                      v-model="user.name"
                      type="text"
                      class="form-control"
                      placeholder="Enter Name ..."
                    />

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.name">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="post-email">User Email</label>
                    <input
                      id="post-email"
                      v-model="user.email"
                      type="email"
                      class="form-control"
                      placeholder="Enter User Email ..."
                    />

                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.email">
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="post-email">Password</label>
                    <input
                      id="post-email"
                      v-model="user.password"
                      type="password"
                      class="form-control"
                      placeholder="Enter Password ..."
                    />
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.password">
                        {{ message }}
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="post-address">Confirm Password</label>
                    <input
                      id="post-address"
                      v-model="user.confirm_password"
                      type="password"
                      class="form-control"
                      placeholder="Enter Confirm Password ..."
                    />
                    <div class="text-danger mt-1">
                      <div v-for="message in validationErrors?.confirm_password">
                        {{ message }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-group col-md-6">
                  <label for="role" class="col-form-label">Role</label>
                  <div>
                    <select id="role" v-model="user.role" class="form-select">
                      <option selected value="1">
                        Admin
                      </option>
                    </select>
                  </div>
                  <div class="text-danger mt-1">
                    <div v-for="message in validationErrors?.role">
                      {{ message }}
                    </div>
                  </div>
                </div>

                <button :disabled="isLoading" class="btn btn-primary mt-3">
                  <div v-show="isLoading" class=""></div>
                  <span v-if="isLoading">Processing...</span>
                  <span v-else>Save</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMeta } from '../../composables/use-meta';
import useUsers from '@/composables/users';
useMeta({ title: 'New User' });

import '../../assets/sass/scrollspyNav.scss';
import '../../assets/sass/scrollspyNav.scss';
import '../../assets/sass/forms/file-upload-with-preview.min.css';

const { storeUser, user, validationErrors, isLoading } = useUsers();

function submitForm() {
    storeUser(user.value);
}
</script>
