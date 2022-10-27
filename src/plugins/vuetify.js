// src/plugins/vuetify.js
import Vue from "vue";
import Vuetify from "vuetify/lib";

import accuracyRateIcon from "@/assets/svg/accuracyRate.vue";
import votingIcon from "@/assets/svg/voting.vue";
import proposalIcon from "@/assets/svg/proposal.vue";
import userRankIcon from "@/assets/svg/userRank.vue";
import viewIcon from "@/assets/svg/viewIcon.vue";

Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        cardtitle: "#7F92A0",
        datanum: "#666666",
        boxbackgroud: "#F5F7FA",
        btnColor: "#FFFFFF",
        inputBg: "#F5F7FA",
      },
      dark: {
        cardtitle: "#FFFFFF",
        datanum: "#FFFFFF",
        boxbackgroud: "#242627",
        btnColor: "#171819",
        inputBg: "#2C2E31",
      },
    },
  },
  icons: {
    values: {
      accuracyRateIcon: { component: accuracyRateIcon },
      votingIcon: { component: votingIcon },
      proposalIcon: { component: proposalIcon },
      userRankIcon: { component: userRankIcon },
      viewIcon: { component: viewIcon },
    },
  },
});

export default vuetify;
