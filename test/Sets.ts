import { ethers } from "hardhat";
import { expect } from "chai";
import { Signer } from "ethers";
import { Sets } from "../typechain-types/contracts/Sets";


describe("Sets Contract", function () {
  let owner: Signer;
  let sets:Sets;

beforeEach(async function () {
    [owner] = await ethers.getSigners();

    // Deploy the Sets contract
    const SetsFactory = await ethers.getContractFactory("Sets");
    sets = await SetsFactory.deploy(5); 
  });

  it("should insert and retrieve elements correctly", async function () {
    // Insert an element
    await sets.insert(owner.getAddress(), 10);
    const value = await sets.getValue(owner.getAddress());
    expect(value).to.equal(10);

    // Insert another element
    await sets.insert("0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db", 5);
    const updatedValue = await sets.getValue("0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db");
    expect(updatedValue).to.equal(5);
  });

  it("should update elements correctly", async function () {
    // Insert an element
    await sets.insert(owner.getAddress(), 10);

    // Update the element
    await sets.update(owner.getAddress(), 15);
    const value = await sets.getValue(owner.getAddress());
    expect(value).to.equal(15);
  });

  it("should remove elements correctly", async function () {
    // Insert an element
    await sets.insert(owner.getAddress(), 10);

    // Remove the element
    await sets.remove(owner.getAddress());

    const isRemoved = await sets.inserted(owner.getAddress());
    console.log("Inserted value",isRemoved);
    expect(isRemoved).to.equal(false);
  });

  it ("should get the lowest value and lowest address",async function() {

    // Insert an element
    await sets.insert(owner.getAddress(),10);

    const value = await sets.lowestValue(); 
    const address =  await sets.lowestAddress();

    expect(value).to.equal(10);
    expect(address).to.equal(await owner.getAddress());

  })
});
