<template>
	<div class="table-container">
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
			<template v-slot:item.treeReportDetail="{ item }">
				<!-- {{ item }} -->
				<img
					style="width: 20px; height: 12px; cursor: pointer"
					@click="handleToDetail(item, 'reportDetail')"
					src="../assets/imgs/home/eyes.png"
					alt=""
				/>
			</template>
			<template v-slot:item.nodeDetail="{ item }">
				<!-- {{ item }} -->
				<img
					style="width: 20px; height: 12px; cursor: pointer"
					@click="handleToDetail(item, 'nodeDetail')"
					src="../assets/imgs/home/eyes.png"
					alt=""
				/>
			</template>
			<template v-slot:item.cidList="{ item }">
				<!-- {{ item }} -->
				<span class="view-item" @click="handleToDetail(item)"
					>view</span
				>
			</template>
			<!-- <template v-slot:item.status="{ item }">
        <span :class="item.status ? 'pin' : 'unpin'">
          {{ item.status ? "pin" : "unpin" }}
        </span>
      </template> -->
		</v-data-table>

		<v-row class="max-width d-flex align-center" v-if="pagination">
			<v-col>
				<v-pagination
					v-model="currentPage"
					class="my-4"
					@input="handlePagination"
					:length="totalPageSize"
					:total-visible="7"
				></v-pagination>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	props: {
		pagination: {
			type: Boolean,
			default: true,
		},
		totalPageSize: {
			type: Number,
			default: 15,
		},
		tableHeaderData: {
			type: Array,
			default: () => {
				return [];
			},
		},
		tableContentData: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	data() {
		return {
			currentPage: 1,
			loading: true,
		};
	},
	methods: {
		handleToDetail(item, type) {
			this.$emit("handleViewClick", item, type);
		},
		handlePagination(value) {
			this.$emit("handleChangePage", value);
			this.loading = true;
		},
	},
	watch: {
		tableContentData() {
			this.loading = false;
		},
	},
};
</script>

<style lang="less" scoped>
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
.jump-page /deep/ .v-input__slot,
.jump-page /deep/ .v-input__control {
	width: 50px;
}
.view-item {
	color: #34a9ff;
	font-size: 12px;
	cursor: pointer;
}
.pin {
	color: #34a9ff;
}
.unpin {
	color: #fb0505;
}
</style>
