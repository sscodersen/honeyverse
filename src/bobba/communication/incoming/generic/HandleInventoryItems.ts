import web3 from "../../../web3";
import ItemOwnership from "../../../contracts/ItemOwnership.json";

export default class HandleInventoryItems implements IIncomingEvent {
    handle(request: ServerMessage) {
        const count = request.popInt();
        for (let i = 0; i < count; i++) {
            const itemId = request.popInt();
            const itemType = request.popString() === 'F' ? ItemType.FloorItem : ItemType.WallItem;
            const baseId = request.popInt();
            const state = request.popInt();
            const isStackable = request.popBoolean();
            
            // add logic to check smart contract for item ownership
            const itemOwnership = new web3.eth.Contract(ItemOwnership.abi, contractAddress);
            itemOwnership.methods.checkOwnership(itemId).call((err, owner) => {
                if(err) {
                    console.log(err);
                } else {
                    // check if msg.sender is the owner of the item
                    if(owner == web3.eth.defaultAccount) {
                        BobbaEnvironment.getGame().inventory.addItem(itemId, baseId, state, isStackable, itemType);
                    } else {
                        console.log("You are not the owner of this item.");
                    }
                }
            });
        }
    }
}
