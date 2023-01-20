import ClientMessage from "../../protocol/ClientMessage";
import { REQUEST_CATALOGUE_PAGE } from "../../protocol/OpCodes/ClientOpCodes";
import Web3 from 'web3';
import ItemPurchase from './contracts/ItemPurchase.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const contract = new web3.eth.Contract(ItemPurchase.abi, '0x...'); // replace with the address of your deployed contract

export default class RequestCataloguePage extends ClientMessage {
    constructor(pageId: number) {
        super(REQUEST_CATALOGUE_PAGE);
        this.appendInt(pageId);
    }

    async purchaseItem(itemId: number, userAddress: string) {
        // call the purchaseItem method on the smart contract
        const receipt = await contract.methods.purchaseItem(itemId).send({ from: userAddress, value: '1000000000000000' }); // replace with the cost of the item in wei
        // process the receipt and handle any errors
        // ...
    }
}
