import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import BobbaEnvironment from "../../../BobbaEnvironment";
import web3 from "../../../web3";
import ItemOwnership from "../../../contracts/ItemOwnership.json";

export default class HandleCataloguePurchaseError implements IIncomingEvent{
    async handle(request: ServerMessage): void {
        const notEnoughCredits = request.popBoolean();
        if (notEnoughCredits) {
            const account = await web3.eth.getAccounts();
            const contract = new web3.eth.Contract(
                ItemOwnership.abi,
                contractAddress
            );
            const balance = await contract.methods.balanceOf(account[0]).call();
            if(balance<itemCost){
                BobbaEnvironment.getGame().uiManager.onShowNotification('Not enough credits');
            }
        }
    }
}

