<template>
  <div class="main-home">
    <Navbar />
    <section class="top-jobs">
      <b-container>
        <h2>Top Jobs</h2>
      </b-container>
    </section>

    <main>
      <b-container>
        <section class="akses-search">
          <div class="searching">
            <input
              type="text"
              placeholder="Search for any skill"
              v-model="form.skills"
              v-on:keyup.enter="searching(form.skills)"
            />
            <b-icon icon="search"></b-icon>
            <b-dropdown
              id="dropdown-1"
              text="Sort"
              right
              class="m-md-2 sorting"
              variant="outline"
            >
              <b-dropdown-item @click="sorting('name')"
                >Sorting Berdasarkan Nama</b-dropdown-item
              >
              <b-dropdown-item @click="sorting('skill')"
                >Sorting Berdasarkan Skill</b-dropdown-item
              >
              <b-dropdown-item @click="sorting('location')"
                >Sorting Berdasarkan Lokasi</b-dropdown-item
              >
              <b-dropdown-item @click="sorting('freelance')"
                >Sorting Berdasarkan Freelance</b-dropdown-item
              >
              <b-dropdown-item @click="sorting('fulltime')"
                >Sorting Berdasarkan Fulltime</b-dropdown-item
              >
            </b-dropdown>
            <b-button class="btn-search" @click="searching(form.skills)"
              >Search</b-button
            >
          </div>
        </section>

        <section class="content-searching">
          <b-row
            v-for="(item, index) in users"
            :key="index"
            class="detail-profile"
          >
            <b-col cols="4" md="2" sm="2">
              <img :src="urlAPI + item.user_image" />
            </b-col>
            <b-col cols="8" md="8" sm="8" class="detail-users">
              <h4>{{ item.user_name }}</h4>
              <p>
                {{ item.user_job }}
                <span v-if="item.user_time_job === 0">(Freelance)</span>
                <span v-if="item.user_time_job === 1">(Fulltime)</span>
              </p>
              <p>{{ item.user_job }}</p>
              <p>
                <b-icon icon="map"></b-icon>
                {{ item.user_location }}
              </p>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[0]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[1]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[2]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[3]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[4]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[5]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[6]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[7]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[8]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[9]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[10]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[11]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[12]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[13]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[14]
              }}</b-badge>
              <b-badge class="btn-skill">{{
                item.skills.split(',')[15]
              }}</b-badge>
            </b-col>
            <b-col cols="2" md="2" sm="2">
              <b-button @click="onLihat(item)" class="btn-lock-profile"
                >Lihat Profile</b-button
              >
            </b-col>
            <b-col cols="12" sm="12" md="12" lg="12">
              <div
                :style="[index === 4 ? { borderBottom: 'none' } : null]"
                class="hr"
              ></div>
            </b-col>
          </b-row>
        </section>

        <section class="paginations">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalPage"
            :per-page="limit"
            @change="handlePageChange"
            first-text="First"
            prev-text="Prev"
            next-text="Next"
            last-text="Last"
            align="center"
          ></b-pagination>
        </section>
      </b-container>
    </main>

    <section class="footer">
      <Footer />
    </section>
  </div>
</template>

<script>
import Navbar from '../components/_base/Navbar.vue'
import Footer from '../components/_base/footer'
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'PageHomes',
  data() {
    return {
      urlAPI: process.env.VUE_APP_URL,
      currentPage: 1,
      form: {
        skills: ''
      }
    }
  },
  components: {
    Navbar,
    Footer
  },
  created() {
    this.getDataUsers()
    this.loadData()
  },
  methods: {
    ...mapActions(['getDataUsers', 'searcinghUsers', 'selectedDataWorker']),
    ...mapMutations(['changePage', 'sortUsers', 'searchUsers']),
    loadData() {
      if (
        this.getFullUserData.company_image === '' ||
        this.getFullUserData.company_place === null ||
        this.getFullUserData.company_instagram === null ||
        this.getFullUserData.company_linkedin === null ||
        this.getFullUserData.company_description === null ||
        this.getFullUserData.company_field === null
      ) {
        this.$bvToast.toast('Lengkapi data perusahaan anda terlebih dahulu !', {
          title: 'Warning',
          variant: 'danger',
          solid: true
        })
        setTimeout(() => {
          this.$router.push('/profile-pt-edit')
        }, 2000)
      }
    },
    handlePageChange(numberPage) {
      this.$router.push(`?page=${numberPage}`)
      this.changePage(numberPage)
      this.getDataUsers()
    },
    sorting(value) {
      if (value === 'name') {
        this.sortText = 'Sorting Berdasarkan Nama'
      } else if (value === 'skill') {
        this.sortText = 'Sorting Berdasarkan Skill'
      } else if (value === 'location') {
        this.sortText = 'Sorting Berdasarkan Lokasi'
      } else if (value === 'freelance') {
        this.sortText = 'Sorting Berdasarkan Freelance'
      } else if (value === 'fulltime') {
        this.sortText = 'Sorting Berdasarkan Fulltime'
      }
      this.sortUsers(value)
      this.getDataUsers()
      this.$router.push(`?sort=${value}`)
    },
    searching(form) {
      this.searchUsers(form)
      this.getDataUsers()
      this.$router.push(`?search=${form}`)
      this.changePage(1)
    },
    onLihat(item) {
      this.selectedDataWorker(item)
      this.$router.push('/profile-portofolio')
    }
  },
  computed: {
    ...mapGetters({
      users: 'getDataUser',
      totalPage: 'getTotalPage',
      limit: 'getLimit',
      sort: 'getSortUsers',
      search: 'getSearch',
      getFullUserData: 'getFullUserData'
    })
  }
}
</script>

<style scoped>
main {
  padding: 50px 0;
}
.hr {
  margin-top: 20px;
  border-bottom: 1px solid #cecece;
}
.main-home .top-jobs {
  background: #5e50a1;
  padding: 20px 0;
}

.main-home .top-jobs h2 {
  color: #fff;
  padding: 0 10px;
}

.main-home {
  background: #e5e5e5;
}

/* Search */
.main-home .searching {
  background: #fff;
  padding: 10px 0;
  margin: 0 0 50px 0;
  border-radius: 8px;
}

.main-home .searching input {
  width: 80%;
  border: none;
  padding: 15px;
  outline: none;
  margin-left: 10px;
}

.main-home .searching .btn-search {
  background: #5e50a1;
  padding: 10px;
}
/* End Search */

/* content-searching */
.main-home .content-searching {
  background: #fff;
  padding: 20px 0;
  margin-bottom: 50px;
  border-radius: 8px;
}

.main-home .content-searching .detail-profile {
  height: 175px;
  margin-bottom: 40px;
}

.main-home .content-searching img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  margin: 20px 50px;
}

.main-home .content-searching p {
  color: #9ea0a5;
}

.main-home .content-searching .b-icon.bi {
  margin-right: 10px;
}

.main-home .content-searching .btn-skill {
  background: rgba(251, 176, 23, 0.6);
  border: 1px solid rgba(251, 176, 23, 0.6);
  margin-right: 10px;
  padding: 10px 20px;
}

.main-home .content-searching .btn-lock-profile {
  background: #5e50a1;
  border: 1px solid #5e50a1;
  margin: 50px 0;
  padding: 10px;
}
/* End content-searching */

/* .main-home .paginations {
  margin-bottom: 10px;
} */

@media (max-width: 575.98px) {
  .main-home .content-searching {
    margin-bottom: 0px;
  }
  .main-home .top-jobs {
    padding: 50px 0;
    border-bottom-right-radius: 20px;
  }

  .main-home .content-searching .detail-profile {
    height: 120px;
  }

  .main-home .content-searching h4 {
    font-size: 18px;
  }

  .main-home .content-searching p {
    font-size: 14px;
  }

  .main-home .content-searching img {
    width: 75px;
    height: 75px;
    margin: 20px 30px;
  }

  .main-home .content-searching .btn-skill {
    margin-right: 0;
    /* height: 30px; */
    /* padding: 0; */
    padding: 5px;
    margin: -10px 5px 5px 0;
  }

  .main-home .content-searching .btn-lock-profile {
    display: none;
  }

  .main-home .searching .btn-search {
    float: right;
    margin: 0 10px;
    padding: 5px 10px;
  }

  .main-home .paginations {
    padding: 50px 0 80px 0;
  }

  .footer {
    display: none;
  }
}
</style>
