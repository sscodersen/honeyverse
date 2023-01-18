import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import BobbaEnvironment from "../../../BobbaEnvironment";
import Web3 from 'web3';
import RoomItemContract from './contracts/RoomItems.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const contract = new web3.eth.Contract(RoomItemContract.abi, '0x...'); // replace with the address of your deployed contract

export default class HandleRoomItemRemove implements IIncomingEvent {
handle(request: ServerMessage) {
const itemId = request.popInt();
const room = BobbaEnvironment.getGame().currentRoom;
if (room != null) {
// remove room item information from the blockchain
contract.methods.removeItem(itemId).send({ from: '0x...' }); // replace with the address of the user who is removing the item
room.roomItemManager.removeItemFromRoom(itemId, true);
}
}
}