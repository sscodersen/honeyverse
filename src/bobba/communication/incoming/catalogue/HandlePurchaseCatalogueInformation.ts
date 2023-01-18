import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import Web3 from "web3";
import { ItemType } from "../../../imagers/furniture/FurniImager";

export default class HandleCataloguePurchaseInformation implements IIncomingEvent {
    handle(request: ServerMessage): void {
        const itemId = request.popInt();
        const itemName = request.popString();
        const cost = request.popInt();
        const itemType = request.popString() === 'F' ? ItemType.FloorItem : ItemType.WallItem;
        const baseId = request.popInt();

        const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        const contractAddress = "0x123456789abcdef0123456789abcdef012345678";
        const abi = [{...}]; // ABI of the deployed smart contract
        const contract = new web3.eth.Contract(abi, contractAddress);

        // Get the user's address
        const userAddress = BobbaEnvironment.getGame().userManager.getUser().getAddress();

        // Call the smart contract's purchase function
        contract.methods.purchase(itemId, cost)
            .send({from: userAddress, gas: 1000000})
            .then(console.log)
            .catch(console.error);
    }
}
