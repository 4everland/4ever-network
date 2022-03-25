<template>
  <div class="block-detail-container">
    <div class="block-header d-flex justify-space-between align-center">
      <div class="block-info d-flex align-start">
        <img
          class="block-icon"
          src="../assets/imgs/blockDetail/block.png"
          alt=""
        />
        <div class="block-detail">
          <h2>Block # 10086</h2>
          <p>Feb 22, 2022 16:00:00</p>
        </div>
      </div>
      <div class="d-flex align-start" style="height: 100%">
        <div class="operation-btn previous">Previous</div>
        <div class="operation-btn next">Next</div>
      </div>
    </div>
    <div class="block-table">
      <network-table :pagination="false"></network-table>
    </div>
  </div>
</template>

<script>
import NetworkTable from "../components/NetworkTable.vue";
export default {
  name: "BlockDetail",
  components: {
    NetworkTable,
  },
};
</script>

<style lang="less" scoped>
p {
  margin: 0;
}
.block-detail-container {
  max-width: 1000px;
  min-height: 620px;
  padding: 24px 16px 16px;
  margin: 20px auto;
  box-sizing: border-box;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid #e6e8eb;
  .block-header {
    width: 100%;
    .block-info {
      .block-icon {
        width: 24px;
        height: 24px;
        margin-right: 14px;
      }
      .block-detail {
        > h2 {
          font-size: 18px;
          color: #495667;
          line-height: 21px;
        }
        > p {
          margin-top: 5px;
          font-family: "ArialMT";
          font-size: 14px;
          line-height: 16px;
          color: #7c848c;
        }
      }
    }
    .operation-btn {
      width: 100px;
      height: 36px;
      box-sizing: border-box;
      line-height: 36px;
      text-align: center;
      font-family: "PingFangSC-Regular, PingFang SC";
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
    }
    .operation-btn.previous {
      color: #34a9ff;
      border: 1px solid #34a9ff;
      transition: all 0.3s ease;
    }
    .operation-btn.previous:hover {
      color: #ffffff;
      background: #34a9ff;
      border: none;
    }
    .operation-btn.next {
      margin-left: 10px;
      color: #ffffff;
      background: #34a9ff;
    }
    .operation-btn.next:hover {
      color: #34a9ff;

      background: #fff;
      border: 1px solid #34a9ff;
      transition: all 0.3s ease;
    }
  }
  .block-table {
    padding-top: 11px;
  }
}
</style>
