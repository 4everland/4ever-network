// src/plugins/vuetify.js
import Vue from "vue";
import Vuetify from "vuetify/lib";

import accuracyRateIcon from "@/assets/svg/accuracyRate.vue";
import votingIcon from "@/assets/svg/voting.vue";
import proposalIcon from "@/assets/svg/proposal.vue";
import userRankIcon from "@/assets/svg/userRank.vue";
import viewIcon from "@/assets/svg/viewIcon.vue";
import stakeIcon from "@/assets/svg/stakeIcon.vue";
import rewardIcon from "@/assets/svg/rewardIcon.vue";
import validatedIcon from "@/assets/svg/validatedIcon.vue";
import validatorIcon from "@/assets/svg/validatorIcon.vue";
import slashIcon from "@/assets/svg/slashIcon.vue";
import teereportIcon from "@/assets/svg/teereportIcon.vue";
import applyIcon from "@/assets/svg/applyIcon.vue";
import widthdrawIcon from "@/assets/svg/widthdrawIcon.vue";
import empty from "@/assets/svg/empty.vue";

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
        inputBg: "#fff",
        tableHeader: "#7F92A0",
      },
      dark: {
        cardtitle: "#FFFFFF",
        datanum: "#FFFFFF",
        boxbackgroud: "#242627",
        btnColor: "#171819",
        inputBg: "#2C2E31",
        tableHeader: "#7F92A0",
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
      stakeIcon: { component: stakeIcon },
      rewardIcon: { component: rewardIcon },
      validatedIcon: { component: validatedIcon },
      validatorIcon: { component: validatorIcon },
      slashIcon: { component: slashIcon },
      teereportIcon: { component: teereportIcon },
      applyIcon: { component: applyIcon },
      widthdrawIcon: { component: widthdrawIcon },
      empty: { component: empty },
    },
  },
});

export default vuetify;
