import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import BobbaEnvironment from "../../../BobbaEnvironment";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const contractAddress = "0x1234...";
const contract = new web3.eth.Contract(contractABI, contractAddress);

export default class HandleInventoryItemRemove implements IIncomingEvent {
    handle(request: ServerMessage) {
        const itemId = request.popInt();
        const item = BobbaEnvironment.getGame().inventory.getItem(itemId);
        contract.methods.transferItem(itemId, item.owner, "0x0").send({ from: item.owner });
        BobbaEnvironment.getGame().inventory.removeItem(itemId);
    }
}
