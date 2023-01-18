import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import BobbaEnvironment from "../../../BobbaEnvironment";
import web3 from "../../../web3";
import MySmartContract from "../../../contracts/MySmartContract.json";

export default class HandleUpdateCreditsBalance implements IIncomingEvent{
    async handle(request: ServerMessage): void {
        const credits = request.popInt();
        const userAddress = BobbaEnvironment.getGame().userManager.getUserAddress();
        const contract = new web3.eth.Contract(MySmartContract.abi, contractAddress);

        try {
            await contract.methods.updateCredit(userAddress, credits).send({ from: userAddress });
            BobbaEnvironment.getGame().userManager.updateCreditsBalance(credits);
        } catch (error) {
            console.log(error);
        }
    }
}
