import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import RoomData, { LockType } from "../../../navigator/RoomData";
import BobbaEnvironment from "../../../BobbaEnvironment";
import Web3 from 'web3';
import RoomDataContract from './contracts/RoomData.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const contract = new web3.eth.Contract(RoomDataContract.abi, '0x...'); // replace with the address of your deployed contract

export const getRoomData = (request: ServerMessage): RoomData => {
    const id = request.popInt();
    const name = request.popString();
    const owner = request.popString();
    const description = request.popString();
    const lockTypeId = request.popInt();
    const userCount = request.popInt();
    const capacity = request.popInt();

    let lockType = LockType.Open;
    if (lockTypeId === 1) {
        lockType = LockType.Locked;
    } else if (lockTypeId === 2) {
        lockType = LockType.Password;
    }

    // store room data on the blockchain
    contract.methods.addRoomData(id, name, owner, description, lockTypeId, userCount, capacity).send({ from: '0x...' }); // replace with the address of the user who is adding the data
    return new RoomData(id, name, owner, description, capacity, user
