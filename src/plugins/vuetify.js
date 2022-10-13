// src/plugins/vuetify.js
import Vue from "vue";
import Vuetify from "vuetify/lib";

import accuracyRateIcon from "@/assets/svg/accuracyRate.vue";
import votingIcon from "@/assets/svg/voting.vue";
import proposalIcon from "@/assets/svg/proposal.vue";
import userRankIcon from "@/assets/svg/userRank.vue";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        cardtitle: "#7F92A0",
        datanum: "#666666",
      },
      dark: {
        cardtitle: "#FFFFFF",
        datanum: "#FFFFFF",
      },
    },
  },
  icons: {
    values: {
      accuracyRateIcon: { component: accuracyRateIcon },
      votingIcon: { component: votingIcon },
      proposalIcon: { component: proposalIcon },
      userRankIcon: { component: userRankIcon },
    },
  },
});

export default vuetify;
