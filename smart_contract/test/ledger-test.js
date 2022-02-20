const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Ledger", function () {
  it("Should deposit success", async function () {
    const Ledger = await ethers.getContractFactory("Ledger");
    const ledger = await Ledger.deploy("Under The Dev");
    await ledger.deployed();

    const tx = await ledger.deposit({value: "1000000000000000000"});
    await tx.wait();

    expect(await ledger.totalBalance()).to.equal("1000000000000000000");
  });

  it("Should deposit fail", async function () {
    const Ledger = await ethers.getContractFactory("Ledger");
    const ledger = await Ledger.deploy("Under The Dev");
    await ledger.deployed();

    const tx = ledger.deposit({value: "0"});

    expect(tx).revertedWith("Must deposit more than 0");
  });

  it("Should withdraw success", async function () {
    const Ledger = await ethers.getContractFactory("Ledger");
    const ledger = await Ledger.deploy("Under The Dev");
    await ledger.deployed();

    const tx = await ledger.deposit({value: "1000000000000000000"});
    await tx.wait();

    const tx2 = await ledger.withdraw("1000000000000000000");
    await tx2.wait();

    expect(await ledger.totalBalance()).to.equal("0");
  });

  it("Should withdraw fail", async function () {
    const Ledger = await ethers.getContractFactory("Ledger");
    const ledger = await Ledger.deploy("Under The Dev");
    await ledger.deployed();

    const tx = await ledger.deposit({value: "1000000000000000000"});
    await tx.wait();

    const tx2 = ledger.withdraw("10000000000000000000");

    expect(tx2).revertedWith("You not enough fund");
  });
});