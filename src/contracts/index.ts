import { TransactionResponse } from "@ethersproject/abstract-provider";
import { providers } from "ethers";
import {
  Stake__factory,
  Election__factory,
  ERC20__factory,
} from "@4everland/dao-contracts";

class Contracts {
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

  public get Token() {
    return ERC20__factory.connect(
      "0xC9451ba109F3e8339c17d5bfA4A14602BBE8f5cd",
      this.signer
    );
  }

  public get Stake() {
    return Stake__factory.connect(
      "0xeb2852579fF160Ae78d86B86Be4C903D7242dEF7",
      this.signer
    );
  }

  public get Election() {
    return Election__factory.connect(
      "0xEeBBf635D0D0c03E7a6b21ab99c9a641DF8EA10e",
      this.signer
    );
  }
}

const contracts = new Contracts();
export default contracts;
