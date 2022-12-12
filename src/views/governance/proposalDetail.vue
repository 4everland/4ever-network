<template>
  <div class="proposal-detail">
    <v-container>
      <v-row>
        <v-col cols="12">
          <div class="d-flex">
            <v-img
              v-if="data.logo"
              class="mr-6 rounded-circle"
              width="60"
              max-width="60"
              height="60"
              max-height="60"
              :src="data.logo"
            ></v-img>
            <span class="ball mr-6" v-else></span>
            <div class="proposal-info">
              <div class="datanum--text proposal-name">
                {{ "Proposal #" + data.id }}
              </div>
              <div class="cardtitle--text proposal-create">
                {{ formart_date(data.createdAt) }}
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" :md="isNode || data.voteRes ? 6 : 12">
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
              <span class="submit-cutdown">Remaining {{ count }}</span>
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
        <v-col cols="12" md="6" v-if="data.voteRes">
          <v-card elevation="0" class="card-block result-box">
            <div>
              <div class="d-flex justify-lg-space-between datanum--text">
                <span>Result</span>
                <span v-if="seconds > 0"
                  >Voting Period Remaining {{ count }}</span
                >
              </div>
              <div class="d-flex justify-lg-space-between my-4">
                <div>
                  <div class="defult-text">Yes</div>
                  <div class="datanum--text mt-4">{{ theFoPer }}%</div>
                </div>
                <div>
                  <div class="defult-text">No</div>
                  <div class="datanum--text mt-4">{{ againstPer }}%</div>
                </div>
              </div>
              <div>
                <v-progress-linear
                  color="datanum"
                  height="18"
                  rounded
                  :value="theFoPer"
                ></v-progress-linear>
              </div>
              <div class="d-flex justify-lg-space-between mt-4">
                <div>
                  <div class="defult-text">VotingPower</div>
                  <div class="datanum--text mt-4">
                    {{ bignumFormatter(theFor) }}
                  </div>
                </div>
                <div>
                  <div class="defult-text">VotingPower</div>
                  <div class="datanum--text mt-4">
                    {{ bignumFormatter(against) }}
                  </div>
                </div>
              </div>
              <div class="text-center">
                <v-btn
                  v-if="data.status != 'Executed'"
                  class="voting-btn btnColor--text"
                  :href="votingUrl"
                  target="_blank"
                  >Voting</v-btn
                >
              </div>
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
import { formart_number, formart_date, bignumFormatter } from "@/utils/utils";
import { fetchProposalDetail, sendProposal } from "@/api/proposal.js";
import contracts from "@/contracts";
import { BigNumber } from "@ethersproject/bignumber";

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
          formart(val) {
            return val;
          },
        },
        {
          name: "Node",
          value: "",
          key: "node",
          formart(val) {
            return val;
          },
        },
        {
          name: "Voted(4EVER)",
          value: "",
          key: "slash",
          formart(val) {
            return bignumFormatter(val / 1e18);
          },
        },
        {
          name: "Deadline",
          value: "",
          key: "expiredAt",
          formart(val) {
            return formart_date(val);
          },
        },
        {
          name: "Status",
          value: "",
          key: "status",
          formart(val) {
            return val;
          },
        },
      ],
      isNode: false,
      nodeHolder: "",
      seconds: 0,
      count: "",
    };
  },
  computed: {
    isSelfNode() {
      const account = this.$store.state.account;
      if (account) {
        return this.nodeHolder.toLowerCase() == account.toLowerCase();
      } else {
        return false;
      }
    },
    account() {
      return this.$store.state.account;
    },
    theFor() {
      if (this.data.voteRes) {
        return this.data.voteRes.theFor || 0;
      } else {
        return 0;
      }
    },
    theFoPer() {
      if (this.theFor != "0") {
        const all =
          parseFloat(this.theFor) +
          parseFloat(this.against) +
          parseFloat(this.data.voteRes.abstain);
        return ((this.theFor / all) * 100).toFixed(2);
      } else {
        return 0;
      }
    },
    against() {
      if (this.data.voteRes) {
        return this.data.voteRes.against || 0;
      } else {
        return 0;
      }
    },
    againstPer() {
      if (this.against != "0") {
        const all =
          parseFloat(this.theFor) +
          parseFloat(this.against) +
          parseFloat(this.data.voteRes.abstain);
        return ((this.against / all) * 100).toFixed(2);
      } else {
        return 0;
      }
    },
    votingUrl() {
      if (this.data.voteRes) {
        return `https://demo.snapshot.org/#/lksdhgoweinv.eth/proposal/${this.data.voteRes.id}`;
      } else {
        return null;
      }
    },
  },
  watch: {},
  methods: {
    formart_date,
    bignumFormatter,
    getInfo(params) {
      fetchProposalDetail(params).then((res) => {
        this.data = res.data;
        this.nodeHolder = res.data.owner;
        let seconds = res.data.expiredAt - Date.now() / 1000;
        if (seconds <= 0) {
          seconds = 0;
        }
        this.seconds = seconds;
        this.Time();
        this.dataList.map((item) => {
          item.value = item.formart(res.data[item.key]);
          return item;
        });
        if (
          this.account.toLowerCase() == res.data.owner.toLowerCase() &&
          !res.data.voteRes
        ) {
          this.isNode = true;
        } else {
          this.isNode = false;
        }
      });
    },
    async submitNode() {
      const Obj = {
        address: this.account,
        proposalId: this.id,
      };
      const signText = JSON.stringify(Obj);
      const sig = await contracts.signer.signMessage(signText);
      const data = {
        signText: signText,
        signature: sig,
        address: this.account,
        proposalId: this.id,
      };
      sendProposal(data).then((res) => {
        console.log(res);
        this.getInfo(this.id);
        window.open(
          `https://demo.snapshot.org/#/lksdhgoweinv.eth/proposal/${res.data.id}`
        );
      });
    },
    countDown() {
      let d = parseInt(this.seconds / (24 * 60 * 60));
      d = d < 10 ? "0" + d : d;
      let h = parseInt((this.seconds / (60 * 60)) % 24);
      h = h < 10 ? "0" + h : h;
      let m = parseInt((this.seconds / 60) % 60);
      m = m < 10 ? "0" + m : m;
      let s = parseInt(this.seconds % 60);
      s = s < 10 ? "0" + s : s;
      this.count = d + " Day " + h + ":" + m + ":" + s;
    },
    Time() {
      setInterval(() => {
        if (this.seconds <= 0) {
          return;
        }
        this.seconds -= 1;
        this.countDown();
      }, 1000);
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
    // margin-right: 22px;
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
  .result-box {
    .defult-text {
      color: #a7b9c6;
      font-size: 12px;
    }
    .voting-btn {
      width: 180px;
      height: 29px;
      background: linear-gradient(270deg, #ff6ceb 0%, #ffb881 100%);
      border-radius: 4px;
    }
  }
}
</style>
