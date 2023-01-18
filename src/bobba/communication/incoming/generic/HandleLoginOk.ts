import IIncomingEvent from "../IIncomingEvent";
import ServerMessage from "../../protocol/ServerMessage";
import BobbaEnvironment from "../../../BobbaEnvironment";
import Web3 from "web3"; // import the web3 library

// import the ABI and address of the deployed smart contract
import myContractABI from "./myContractABI.json";
import myContractAddress from "./myContractAddress.json";

export default class LoginOk implements IIncomingEvent {
    handle(request: ServerMessage) {

        const id = request.popInt();
        const name = request.popString();
        const look = request.popString();
        const motto = request.popString();

        // Connect to a web3 provider
        const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

        // Create an instance of the smart contract
        const myContract = new web3.eth.Contract(myContractABI, myContractAddress);

        // Call the smart contract to update the user's data
        myContract.methods.updateUserData(id, name, look, motto).send({from: web3.eth.defaultAccount});

        BobbaEnvironment.getGame().handleUserData(id, name, look, motto);
    }
}
