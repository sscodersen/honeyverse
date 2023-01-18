import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import BobbaEnvironment from "../../../BobbaEnvironment";
import Web3 from 'web3';
import RoomModelInfoContract from './contracts/RoomModelInfo.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const contract = new web3.eth.Contract(RoomModelInfoContract.abi, '0x...'); // replace with the address of your deployed RoomModelInfo contract

export default class HandleRoomModelInfo implements IIncomingEvent {
    handle(request: ServerMessage) {
        const modelId = request.popString();
        const roomId = request.popInt();

        // store room model information on the blockchain
        contract.methods.addRoomModelInfo(modelId, roomId).send({ from: '0x...' }); // replace with the address of the user who is adding the data
        
        BobbaEnvironment.getGame().handleRoomModelInfo(modelId, roomId);
    }
}
