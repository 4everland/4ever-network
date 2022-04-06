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
					<h2>TeeReport # {{ treeReportData.blockNumber }}</h2>
					<p>{{ treeReportData.blockCreatedAt }}</p>
				</div>
			</div>
			<div class="d-flex align-start" style="height: 100%">
				<v-btn
					class="operation-btn"
					:disabled="treeReportData.prevBlockNumber <= 0"
					@click="getReport(treeReportData.prevBlockNumber)"
				>
					Previous
				</v-btn>
				<v-btn
					class="operation-btn next"
					:disabled="treeReportData.nextBlockNumber <= 0"
					@click="getReport(treeReportData.nextBlockNumber)"
					>Next</v-btn
				>
			</div>
		</div>
		<div class="block-table">
			<!-- <network-table
        :pagination="false"
        :tableHeaderData="tableHeaderData"
        :tableContentData="tableContentData"
      ></network-table> -->

			<v-data-table
				:headers="tableHeaderData"
				:items="tableContentData"
				item-class="row-item"
				:hide-default-footer="true"
				:items-per-page="50"
				class="elevation-1"
				:loading="loading"
				loading-text="Loading... Please wait"
			>
			</v-data-table>
		</div>
	</div>
</template>

<script>
import { formart_date, formart_storage } from "@/utils/utils";
import { fetchReport } from "@/api/api";
export default {
	name: "BlockDetail",
	data() {
		return {
			blockNumber: 0,
			tableHeaderData: [
				{
					text: "Node ID",
					align: "center",
					sortable: false,
					value: "nodeId",
				},
				{
					text: "Accuracy Rate",
					align: "center",
					value: "accuracyRate",
				},
				{
					text: "Size of Challenge File",
					align: "center",
					value: "totalSize",
				},
				{ text: "Elapsed Time", align: "center", value: "elapsedTime" },
			],
			tableContentData: [],
			treeReportData: {},
			isLocked: false,
			loading: true,
		};
	},
	created() {
		this.blockNumber = this.$route.query.blockNumber;
		this.getReport(this.blockNumber);
	},
	methods: {
		async getReport(blockNumber) {
			if (this.isLocked) return;
			this.isLocked = true;
			this.loading = true;
			try {
				const result = await fetchReport(blockNumber);
				result.blockCreatedAt = formart_date(result.blockCreatedAt);
				result.reports.map((item) => {
					item.createdAt = formart_date(item.createdAt);
					item.accuracyRate =
						(item.accuracyRate / 100).toFixed(2) + "%";
					item.elapsedTime = item.elapsedTime / 1000 + "S";
					item.totalSize = formart_storage(item.totalSize);
					return item;
				});
				this.treeReportData = result;
				this.tableContentData = result.reports;
				this.isLocked = false;
				this.loading = false;
			} catch (err) {
				console.log(err, "err");
			}
		},
	},
};
</script>

<style lang="less" scoped>
p {
	margin: 0;
}
.block-detail-container {
	position: relative;
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
			color: #ffffff;
			background: #34a9ff;
			cursor: pointer;
		}

		.operation-btn.next {
			margin-left: 10px;
		}
	}
	.block-table {
		padding-top: 11px;

		/deep/ .v-pagination__item,
		/deep/ .v-pagination__navigation {
			box-shadow: none;
			font-size: 12px;
			font-weight: 600;
		}

		/deep/ .v-data-table.elevation-1.theme--light {
			box-shadow: none !important;
		}
		/deep/ td,
		/deep/ th {
			border-bottom: none !important;
			line-height: 48px;
			font-size: 12px !important;
			color: #495667;
		}
		/deep/ .v-input__control {
			width: 130px;
		}
		/deep/ .v-input__slot {
			width: 130px;
		}
		/deep/ .v-text-field__details {
			display: none;
		}
		/deep/ .v-data-table__wrapper tbody tr:nth-of-type(odd) {
			background: #f8f8f8;
		}
		/deep/ .v-data-table__wrapper .v-data-table-header tr {
			background: #e6e8eb;
		}
		/deep/ .v-text-field.v-text-field--solo .v-input__control {
			min-height: 30px;
		}
		/deep/ .v-input__slot {
			margin: 0;
		}
	}
}
</style>
