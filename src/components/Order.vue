<template>
    <div class="order">
        <div class="d-flex justify-content-end">
            <button type="button" class="btn btn-outline-success" @click="saveOrder">Save</button>
        </div>
        <div v-b-toggle.collapse2 class="m-1">
            <h2 class="">
                Order {{id}}
                <icon name="angle-down"></icon>
            </h2>
        </div>
        <hr />
        <div class="order__order-info-form">
            <b-collapse id="collapse2">
                <div>
                    <label class="typo__label">Currency</label>
                    <multiselect v-model="currency.value" :max-height="200" :searchable="false" :close-on-select="false" :show-labels="false"  placeholder="Search a tag" label="code" track-by="code" :options="currencies"></multiselect>
                </div>
            </b-collapse>
        </div>
        <div class="order__order-info-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab active>
                        <template slot="title">Products</template>
                        Products
                    </b-tab>
                    <b-tab>
                        <template slot="title">Shipment</template>
                        Shipment
                    </b-tab>
                    <b-tab>
                        <template slot="title">Shipment Specification</template>
                        Shipment Specification
                    </b-tab>
                    <b-tab>
                        <template slot="title">Documents</template>
                        Documents
                    </b-tab>
                    <b-tab>
                        <template slot="title">Comments</template>
                        Comments
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>

</template>

<script>
  import Multiselect from 'vue-multiselect';
  import {mapGetters} from "vuex";
  import {mapMutations} from "vuex";
  import {mapActions} from "vuex";

  export default {
    data() {
      return {
        orderData: null,
        currency: {
          //options: [{name:'DKK'}, {name:'EUR'}, {name:'GBP'}, {name:'USD'}],
          value: []
        }
      }
    },
    methods: {
      saveOrder() {
        console.log(this.currency.value)
        this.$http.put(`sales/salesorders/${this.id}/`, {
          currency: this.currency.value.id
        })
          .then(response => response.json())
          .then(data => {
            this.$notify({
              group: 'foo',
              title: 'SUCCESS',
              type: 'success',
              text: 'Order has been updated!'
            });
          });
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },
      ...mapGetters('generic', {
        currencies: 'currencies',
      })
    },
    beforeMount() {
      this.$store.dispatch('generic/getCurrencies');
      this.$http.get(`sales/salesorders/${this.id}/`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          this.currency.value = {code: data[0].currency_name};
        });
    },
    components: {
      Multiselect
    }
  }
</script>

<style scoped>
    .order__order-info-tabs {
        margin-top: 10px;
    }
</style>

