import { expect } from "chai";
import EasyBroker from "../index";

describe('EB API', async() => {
    const eb = new EasyBroker()
    it('count titles', async () => {
        const total = await eb.getTotal();
        const titles = await eb.getAll();
        expect(titles.length).equals(total);
    }).timeout(15000);
    it('print all titles',async () => {
        const titles = await eb.getAll();
        titles.forEach((title: any) => {
            console.log(title)
        })
    }).timeout(15000);
})