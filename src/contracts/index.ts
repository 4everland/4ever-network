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
      "0x73105F4AB4B6247FB8F3d9aFacFa682A1304f542",
      this.signer
    );
  }

  public get Stake() {
    return Stake__factory.connect(
      "0xf1B588Bc43264CB390B5f5229128995A66B71037",
      this.signer
    );
  }

  public get Election() {
    return Election__factory.connect(
      "0xb5f3788FF91ef84e590FD42A0C69b4F1409F6cd7",
      this.signer
    );
  }
}

const contracts = new Contracts();
export default contracts;
