import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import BobbaEnvironment from "../../../BobbaEnvironment";
import web3 from "../../../web3";
import RoomData from "../../../contracts/RoomData.json";

export default class HandleLeaveRoom implements IIncomingEvent {
    async handle(request: ServerMessage): void {
        // Get the current user's address
        const userAddress = BobbaEnvironment.getGame().getClient().getUserAddress();
        // Get the current room's id
        const roomId = BobbaEnvironment.getGame().getRoomId();
        // Get the instance of the RoomData smart contract
        const roomData = new web3.eth.Contract(RoomData.abi, "CONTRACT_ADDRESS_HERE");
        try {
            // Call the "leaveRoom" function on the smart contract
            await roomData.methods.leaveRoom(roomId, userAddress).send({ from: userAddress });
            BobbaEnvironment.getGame().unloadRoom();
        } catch (err) {
            console.error(err);
        }
    }
}
