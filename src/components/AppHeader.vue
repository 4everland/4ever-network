<template>
	<div>
		<v-app-bar fixed app color="#FAFAFA" height="100">
			<v-container class="d-flex align-center justify-space-between">
				<v-btn
					text
					color="transparent"
					to="/"
					class="always-active mr-8"
				>
					<logo />
				</v-btn>
				<div class="d-flex align-center justify-space-between">
					<div class="search-bar">
						<v-menu
							:value="isShow"
							:close-on-content-click="false"
							@input="handleMenu"
							transition="slide-y-transition"
							attach
							left
							nudge-bottom="50"
						>
							<template v-slot:activator="{ on }">
								<input
									class="search-input"
									type="text"
									v-model="searchValue"
									@keydown.enter="handleSearch"
									placeholder="Node/TeeReport/CID......"
								/>
							</template>
							<div v-if="isShow && status" class="content">
								<div class="message-header d-flex align-center">
									<i class="header-line left"></i>
									<span>{{
										searchData.type == "BLOCK"
											? "TeeReport"
											: searchData.type == "CID"
											? "CID"
											: "NodeID"
									}}</span>
									<i class="header-line right"></i>
								</div>
								<div
									class="message-content-block d-flex flex-column"
									v-if="searchData.type == 'BLOCK'"
								>
									<span
										class="block-info"
										@click="
											handleViewClick(
												searchData.block,
												'reportDetail'
											)
										"
										>#
										{{ searchData.block.blockNumber }}</span
									>
									<span class="block-time">
										{{ searchData.block.createdAt }}</span
									>
								</div>
								<div
									class="message-content-block d-flex flex-column"
									v-else-if="searchData.type == 'NODE'"
								>
									<span
										class="block-info"
										@click="
											handleViewClick(
												searchData.node,
												'nodeDetail'
											)
										"
										>{{ searchData.node.nodeId }}</span
									>
									<span class="block-time">
										{{
											formart_date(
												searchData.node.createdAt
											)
										}}
									</span>
								</div>
								<div
									class="message-content-cid"
									v-else-if="searchData.type == 'CID'"
								>
									<span class="message-cid">{{
										searchData.cid.cid
									}}</span>
									<span>{{
										searchData.cid.pinned ? "pin" : "unpin"
									}}</span>
								</div>
							</div>
							<div v-if="isShow && !status" class="content">
								<h2 class="no-results-title">
									No Results found.
								</h2>
								<p class="no-results-content">
									Please search by Node ID,TeeReport ID or CID
								</p>
							</div>
						</v-menu>
					</div>
					<!-- <div
						class="balance-container ml-7"
						v-if="$store.state.account"
						@click="handleClaim"
					>
						<p class="balance-content d-flex align-center">
							Available to Claim:
							<v-icon
								v-if="$store.state.balance == '0'"
								color="#FFF"
								class="balance-loading mx-3"
								>mdi-loading</v-icon
							>
							<span v-else class="balance mx-3">{{
								$store.state.balance
							}}</span>
							4EVER
						</p>
					</div> -->
					<!-- <div
						class="connect-wallet ml-7"
						@click="connectWallet"
						v-else
					>
						<img
							style="width: 24px"
							src="../assets/imgs/header/link-icon.png"
							alt=""
						/>
						<span>Connect Wallet</span>
					</div> -->
				</div>
				<v-dialog class="rounded-xl" v-model="claimDialog" width="500">
					<v-card class="pl-7 pr-7 pb-11 rounded-xl">
						<v-card-title
							class="dialog-title pa-0 justify-center mt-8"
						>
							My Reward
							<img
								class="dialog-close"
								src="../assets/imgs/nodeDetail/close.png"
								alt=""
								@click="claimDialog = false"
							/>
						</v-card-title>
						<v-card-text class="text-center mt-10 pb-14">
							<span class="claim-balance">{{
								$store.state.balance
							}}</span>
							<span class="currency">4EVER</span>
						</v-card-text>
						<v-card-actions style="width: 100%">
							<v-btn
								height="48"
								class="claim-btn"
								block
								:disabled="$store.state.balance == '-'"
								@click="handleClaimConfirm"
							>
								<span>Claim</span>
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-container>
		</v-app-bar>
	</div>
</template>

<script>
import { formart_date } from "@/utils/utils";
import Logo from "../components/Logo.vue";
import { mapActions, mapMutations } from "vuex";
import { fetchSearchValue } from "@/api/api";
export default {
	components: { Logo },
	data() {
		return {
			isLoading: true,
			rewards: 0,
			isLogin: false,
			isShow: false,
			searchValue: "",
			searchData: {},
			status: false,
			claimDialog: false,
		};
	},
	created() {
		if (!window.ethereum) return;
		// this.updateChainId();

		// this.getAccount();

		// this.listen();
	},
	methods: {
		...mapActions([
			// "getAccount",
			"updateAccount",
			"updateChainId",
			"updateBalance",
			"claim",
		]),
		...mapMutations(["UPDATE_ACCOUNT", "UPDATE_BALANCE"]),
		async connectWallet() {
			if (!window.ethereum) {
				window.open("https://metamask.io/download.html", "_blank");
				return this.$message.warning("Please download Metamask");
			}
			const isUnlocked = await window.ethereum._metamask.isUnlocked();
			if (!isUnlocked) {
				return this.$message.warning("Please unlock Metamask");
			}

			await this.updateAccount();
		},
		handleClaim() {
			if (this.$store.state.balance == 0)
				return this.$message.error("Insufficient account balance！");
			this.claimDialog = true;
		},
		async handleClaimConfirm() {
			this.claimDialog = false;
			this.$loading.show();
			try {
				const result = await this.claim();
				this.updateBalance();
				this.$message.success("Claim successfully!");
			} catch (error) {
				this.$message.error("Claim failed!");
			}
			this.$loading.hide();
		},
		async handleSearch() {
			try {
				this.searchValue = this.searchValue.trim();
				const reg = /^[A-Za-z0-9]{1,255}$/;
				if (!reg.test(this.searchValue)) {
					return this.$message.warning(
						"Only allow English characters/numbers！"
					);
				}
				const result = await fetchSearchValue(this.searchValue);
				if (result.type.toUpperCase() == "BLOCK") {
					result.block.createdAt = formart_date(
						result.block.createdAt
					);
				}
				this.searchData = result;
				console.log(result);
				this.status = true;
			} catch (e) {
				console.log("err", e);
			}
			this.isShow = true;
		},
		handleMenu(e) {
			console.log(e);
			this.status = false;
			this.isShow = false;
		},
		handleViewClick(item, type) {
			this.isShow = false;
			switch (type) {
				case "reportDetail":
					this.$router.push({
						path: "/blockDetail",
						query: {
							blockNumber: item.blockNumber,
						},
					});
					break;
				case "nodeDetail":
					this.$router.push({
						path: "/nodeDetail",
						query: {
							nodeId: item.nodeId,
						},
					});
					break;
				default:
					break;
			}
		},
		listen() {
			window.ethereum.on("accountsChanged", (accounts) => {
				window.location.reload();
			});
			window.ethereum.on("chainChanged", (chainId) => {
				window.location.reload();
			});
		},
		formart_date,
	},
};
</script>
<style lang="less" scoped>
.always-active {
	opacity: 1 !important;
}

.v-menu__content {
	border-radius: 10px;
}
.v-btn--active,
.nav-btn:hover {
	color: #2a7eed;
}
/deep/ .v-btn__content {
	opacity: 1 !important;
}
/deep/ .nav-btn .v-btn__content {
	opacity: 1 !important;
}
/deep/ .v-dialog {
	border-radius: 24px;
}
.v-card {
	overflow: hidden;
}
.v-list {
	width: 161px;
}
.v-list-item__title {
	color: red;
}
.search-bar {
	position: relative;
	width: 297px;
	.search-input {
		position: relative;
		width: 296px;
		padding: 0 20px;
		font-size: 14px;
		border-bottom: 1px solid black;
		box-sizing: border-box;
	}
	.search-input::placeholder {
		font-size: 14px;
	}

	.message-tips {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 0;
		// margin-top: 20px;
	}
	.content {
		padding: 0 12px;
		min-width: 297px;
		// border-radius: 8px;
		box-sizing: border-box;
		background: #fff;
		overflow: hidden;
	}
	.message-header {
		margin-top: 15px;
		.header-line {
			display: inline-block;
			height: 1px;
			background: #e6e8eb;
		}
		span {
			padding: 0 13px;
		}
		.header-line.left {
			width: 16px;
		}
		.header-line.right {
			flex: 1;
		}
	}
	.message-content-cid {
		padding: 23px 0;
		font-size: 14px;
		color: #495667;
		line-height: 16px;
		.message-cid {
			margin-right: 62px;
		}
	}
	.message-content-block {
		min-width: 100%;
		padding: 13px 0;
		.block-info {
			font-size: 16px;
			color: #34a9ff;
			line-height: 18px;
			cursor: pointer;
		}
		.block-time {
			margin-top: 10px;
			font-size: 14px;
			line-height: 16px;
			color: #7c848c;
		}
	}
	.no-results-title {
		padding-top: 19px;
		font-size: 16px;
		color: #495667;
		line-height: 18px;
	}
	.no-results-content {
		margin: 0;
		font-size: 14px;
		color: #7c848c;
		line-height: 16px;
		padding: 10px 0 18px 0;
	}
}
.search-bar::before {
	content: "";
	display: block;
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 16px;
	height: 16px;
	background: url("../assets/imgs/header/search-icon.png") no-repeat;
	background-size: 100%;
}
.connect-wallet {
	padding: 5px 11px 5px 6px;
	border: 1px solid #34a9ff;
	border-radius: 2px;
	font-size: 14px;
	color: #34a9ff;
	line-height: 20px;
	cursor: pointer;
	img {
		vertical-align: middle;
		margin-right: 6px;
	}
}
.balance-container {
	padding: 5px 15px;
	background: #34a9ff;
	border-radius: 4px;
	cursor: pointer;
	.balance-content {
		// height: 30px;
		color: #fff;
		margin-bottom: 0;
		font-size: 12px;
		.balance-loading {
			transform: rotate(360deg);
			animation: loading 0.7s infinite ease-in;
		}
		@keyframes loading {
			0% {
				transform: rotate(0deg);
			}
			20% {
				transform: rotate(72deg);
			}
			40% {
				transform: rotate(144deg);
			}
			60% {
				transform: rotate(216deg);
			}
			80% {
				transform: rotate(288deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
		.balance {
			font-size: 18px;
		}
	}
}
.dialog-title {
	position: relative;
	font-size: 18px;
	font-weight: 600;
}
.claim-balance {
	font-size: 40px;
	color: #34a9ff;
}
.currency {
	margin-left: 10px;
	font-size: 24px;
}
.v-btn {
	color: #fff;
}
.claim-btn {
	color: #fff !important;
	font-weight: bold;
	background: #34a9ff !important;
}
.dialog-close {
	position: absolute;
	right: 30px;
	top: 50%;
	transform: translateY(-50%);
	width: 18px;
	vertical-align: middle;
	cursor: pointer;
}
</style>
