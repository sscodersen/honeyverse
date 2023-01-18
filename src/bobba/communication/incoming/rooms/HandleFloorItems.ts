import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import BobbaEnvironment from "../../../BobbaEnvironment";
import { Direction } from "../../../imagers/furniture/FurniImager";
import Web3 from 'web3';
import RoomItemContract from './contracts/RoomItems.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const contract = new web3.eth.Contract(RoomItemContract.abi, '0x...'); // replace with the address of your deployed contract

export default class HandleFloorItems implements IIncomingEvent {
    handle(request: ServerMessage) {
        const count = request.popInt();
        for (let i = 0; i < count; i++) {
            const id = request.popInt();
            const x = request.popInt();
            const y = request.popInt();
            const z = request.popFloat();
            const rot = request.popInt();
            const baseId = request.popInt();
            const state = request.popInt();

            const room = BobbaEnvironment.getGame().currentRoom;
            if (room != null) {
                // store room item information on the blockchain
                contract.methods.addFloorItem(id, x, y, z, rot, state, baseId).send({ from: '0x...' }); // replace with the address of the user who is adding the item
                room.roomItemManager.addFloorItemTo
