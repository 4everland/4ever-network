import { TransactionResponse } from "@ethersproject/abstract-provider";
import { providers } from "ethers";
import { ERC20__factory } from "./ERC20__factory";
import { POSC__factory } from "./types";

class Contracts {
  public contractAddress = "0x6B39778aAde00b3a99e463934b614Aa41dFAF09b";

  public get provider(): providers.Web3Provider {
    if (!window.ethereum) {
      throw "no ethereum plugin";
    }
    return new providers.Web3Provider(window.ethereum as any);
  }

  public get signer() {
    return this.provider.getSigner();
  }

  public async sendTransaction(tx: {
    to: string;
    data: string;
  }): Promise<TransactionResponse> {
    const from = await this.signer.getAddress();
    return this.signer.sendTransaction({
      from,
      ...tx,
    });
  }

  public ERC20(addr: string) {
    return ERC20__factory.connect(addr, this.provider);
  }

  public get POSC() {
    return POSC__factory.connect(this.contractAddress, this.provider);
  }
}

const contracts = new Contracts();
export default contracts;
