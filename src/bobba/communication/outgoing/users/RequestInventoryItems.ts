import Web3 from 'web3';
import ItemManagement from 'path/to/ItemManagement.json';

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const itemManagement = new web3.eth.Contract(ItemManagement.abi, '0x...');

class RequestInventoryItems extends ClientMessage {
    constructor(address) {
        super(REQUEST_INVENTORY_ITEMS);
        this.address = address;
    }

    async handle() {
        const items = await itemManagement.methods.getInventory(this.address).call();
        console.log(items);
    }
}
