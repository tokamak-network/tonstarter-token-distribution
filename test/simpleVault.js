const { expect } = require("chai");

const {
    BigNumber,
    FixedFormat,
    FixedNumber,
    formatFixed,
    parseFixed
} = require("@ethersproject/bignumber");

describe("SimpleVault", function() {

  let simpleVault , tos , provider;

  let deployer, user1, person1, person2, person3, person4,person5, person6 ;

  let name="SimpleVault";

  let totalAllocatedAmount=100000;
  let totalClaims=10;
  let totalTgeCount=2;
  let startTime, endTime;
  let periodTimesPerClaim = 60 * 10; // 5 mins

  let tgeRound = [
      {
       round : 1,
       amount : 10000,
       whishlist: []
      },
      {
       round : 2,
       amount : 10000,
       whishlist: []
      }
  ]
  totalTgeCount = tgeRound.length;



    before(async function () {
        let accounts = await ethers.getSigners();
        [deployer, user1, person1, person2, person3, person4, person5, person6 ] = accounts
        tgeRound[0].whishlist = [person1.address, person2.address, person3.address, person4.address];
        tgeRound[1].whishlist = [person1.address, person6.address];

        const SimpleVault = await ethers.getContractFactory("SimpleVault");
        const TOS = await ethers.getContractFactory("TOS");

        tos = await TOS.deploy("TOS Token","TOS","1") ;
        tos.connect(deployer).deployed();

        simpleVault = await SimpleVault.deploy(tos.address, name);
        simpleVault.connect(deployer).deployed();

        provider = await ethers.getDefaultProvider();

    });

    it("check name, token ", async function() {
        expect(await simpleVault.name()).to.equal(name);
        expect(await simpleVault.tos()).to.equal(tos.address);
    });

    it("check balance ", async function() {
        tos.mint(simpleVault.address, totalAllocatedAmount );
        expect(await tos.balanceOf(simpleVault.address)).to.equal(totalAllocatedAmount);
    });

    it("Check onlyOwner Function : 관리자 권한 함수 확인 : 일반사용자가 실행시 거부됨 ", async function() {
        await expect(
            simpleVault.connect(user1).claimTOS(
                user1.address, 10000
            )
        ).to.be.revertedWith("Accessible: Caller is not an admin");

         await expect(
            simpleVault.connect(user1).claimERC20(
                tos.address,
                user1.address, 10000
            )
        ).to.be.revertedWith("Accessible: Caller is not an admin");
    });

    it("claimTOS ", async function() {
        let sendAmount = 1000;
        let prevBalance = await tos.balanceOf(user1.address);
        await simpleVault.connect(deployer).claimTOS(
            user1.address, sendAmount
        );
        let afterBalance = await tos.balanceOf(user1.address);
        expect(ethers.BigNumber.from(afterBalance)).to.be.equal(ethers.BigNumber.from(prevBalance).add(ethers.BigNumber.from(sendAmount)));

    });

    it("claimERC20 ", async function() {
        let sendAmount = 1000;
        let prevBalance = await tos.balanceOf(user1.address);
        await simpleVault.connect(deployer).claimERC20(
            tos.address,
            user1.address, sendAmount
        );
        let afterBalance = await tos.balanceOf(user1.address);
        expect(ethers.BigNumber.from(afterBalance)).to.be.equal(ethers.BigNumber.from(prevBalance).add(ethers.BigNumber.from(sendAmount)));
    });

    it("balanceTOS ", async function() {
        let sendAmount = 1000;
        let balance = await tos.balanceOf(simpleVault.address);
        let balanceTOS = await simpleVault.balanceTOS();
        expect(ethers.BigNumber.from(balance)).to.be.equal(ethers.BigNumber.from(balanceTOS));
    });


    it("balanceERC20 ", async function() {
        let sendAmount = 1000;
        let balance = await tos.balanceOf(simpleVault.address);
        let balanceERC20 = await simpleVault.balanceERC20(tos.address);
        expect(ethers.BigNumber.from(balance)).to.be.equal(ethers.BigNumber.from(balanceERC20));
    });

});

