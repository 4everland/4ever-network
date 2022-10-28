<template>
  <div class="proposal-detail">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex">
            <div class="ball"></div>
            <div class="proposal-info">
              <div class="datanum--text proposal-name">
                {{ "Proposal #" + data.blockNumber }}
              </div>
              <div class="cardtitle--text proposal-create">
                {{ formart_date(data.blockCreatedAt) }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" :md="isNode ? 6 : 12">
          <v-card elevation="0" class="card-block">
            <div
              v-for="item in dataList"
              :key="item.key"
              class="d-flex align-center justify-space-between mb-8"
              style="max-width: 650px"
            >
              <span class="cardtitle--text" style="font-size: 12px">{{
                item.name
              }}</span>
              <span class="datanum--text" style="font-size: 12px">{{
                item.value
              }}</span>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6" v-if="isNode">
          <v-card elevation="0" class="card-block">
            <div
              class="d-flex align-center justify-space-between datanum--text submit-title-box"
            >
              <span class="submit-title">Submit</span>
              <span class="submit-cutdown">Remaining 12:31:42</span>
            </div>
            <div class="datanum--text submit-desc">
              You can submit evidence during the public period if you disagree
              with the penalty proposal initiated by the sentinel program, and
              community members will vote on whether to proceed. The penalty
              proposal will be rejected if it receives majority votes during the
              voting period, and it will be passed and executed if it receives
              minority votes.
            </div>
            <div class="submit-btn-box">
              <v-btn class="submit-btn btnColor--text" @click="submitNode"
                >Submit</v-btn
              >
            </div>
          </v-card>
        </v-col>
      </v-row>
      <table-reason :tableList="data.evidence" />
    </v-container>
  </div>
</template>

<script>
import tableReason from "./components/tableReason.vue";
import { formart_number, formart_date } from "@/utils/utils";
import { fetchProposalDetail, sendProposal } from "@/api/proposal.js";
import contracts from "@/contracts";

export default {
  components: { tableReason },
  data() {
    return {
      data: {},
      dataList: [
        {
          name: "Proposer",
          value: "",
          key: "proposer",
        },
        {
          name: "Node",
          value: "",
          key: "node",
        },
        {
          name: "Voted(4EVER)",
          value: "",
          key: "slash",
        },
        {
          name: "Deadline",
          value: "",
          key: "expiredAt",
        },
        {
          name: "Status",
          value: "",
          key: "status",
        },
      ],
      isNode: true,
    };
  },
  computed: {
    account() {
      return localStorage.getItem("address");
    },
  },
  watch: {},
  methods: {
    formart_date,
    getInfo(params) {
      fetchProposalDetail(params).then((res) => {
        this.data = res.data;
        this.dataList.map((item) => {
          item.value = res.data[item.key];
          return item;
        });
        if (this.account == res.data.owner && !res.data.voteRes) {
          this.isNode = true;
        }
      });
    },
    async submitNode() {
      const signText = "aaa";
      const sig = await contracts.signer.signMessage(signText);
      const data = {
        signText: signText,
        signature: sig,
        address: this.account,
        proposalId: this.id,
      };
      sendProposal(data).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    const id = this.$route.params.id;
    this.id = id;
    this.getInfo(id);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.proposal-detail {
  .ball {
    width: 60px;
    height: 60px;
    background: linear-gradient(325deg, #79bc5a 0%, #dffcd1 100%);
    border-radius: 50%;
    margin-right: 22px;
  }
  .proposal-info {
    .proposal-name {
      font-size: 27px;
      font-weight: bold;
    }
    .proposal-create {
      font-size: 12px;
      font-weight: bold;
      margin-top: 8;
    }
  }
  .card-block {
    padding: 30px;
    height: 300px;
    .submit-title-box {
      .submit-title {
        font-size: 18px;
      }
      .submit-cutdown {
        font-size: 12px;
      }
    }
    .submit-desc {
      font-size: 12px;
      font-weight: 600;
      margin-top: 30px;
    }
    .submit-btn-box {
      margin-top: 60px;
      text-align: center;
      .submit-btn {
        width: 180px;
        height: 29px;
        background: linear-gradient(270deg, #53ccfb 0%, #fbb2dd 100%);
        border-radius: 4px;
        font-size: 12px;
      }
    }
  }
}
</style>
