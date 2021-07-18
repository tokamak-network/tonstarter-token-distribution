const { expect } = require("chai");

const {
    BigNumber,
    FixedFormat,
    FixedNumber,
    formatFixed,
    parseFixed
} = require("@ethersproject/bignumber");

describe("DesignedVault", function() {

  let designedVault , tos , provider;
  let maxInputOnceTime = 2;
  let deployer, user1, person1, person2, person3, person4,person5, person6 ;

  let name="LiquidityTestVault";

  let totalAllocatedAmount=100000;
  let totalClaims=10;
  let totalTgeCount=1;
  let startTime, endTime;
  let periodTimesPerClaim = 60 * 10; // 5 mins

  // let tgeRound = [
  //     {
  //      round : 1,
  //      amount : 10000,
  //      whishlist: []
  //     },
  //     {
  //      round : 2,
  //      amount : 10000,
  //      whishlist: []
  //     }
  // ]

  let tgeRound = [
      {
       round : 1,
       amount : 10000,
       whishlist: []
      }
  ]

  totalTgeCount = tgeRound.length;



  before(async function () {
    let accounts = await ethers.getSigners();
    [deployer, user1, person1, person2, person3, person4, person5, person6 ] = accounts
    // tgeRound[0].whishlist = [person1.address, person2.address, person3.address, person4.address];
    // tgeRound[1].whishlist = [person1.address, person6.address];
    tgeRound[0].whishlist = [user1.address];

    const DesignedVault = await ethers.getContractFactory("DesignedVault");
    const TOS = await ethers.getContractFactory("TOS");

    tos = await TOS.deploy("TOS Token","TOS","1") ;
    tos.connect(deployer).deployed();

    designedVault = await DesignedVault.deploy(name, tos.address, maxInputOnceTime);
    designedVault.connect(deployer).deployed();

    provider = ethers.provider;

  });

  it("check name, tos ", async function() {
    expect(await designedVault.name()).to.equal(name);
    expect(await designedVault.tos()).to.equal(tos.address);
    expect(await designedVault.maxInputOnceTime()).to.equal(maxInputOnceTime);
  });

  it("Check onlyOwner Function : 관리자 권한 함수 확인 : 일반사용자가 실행시 거부됨 ", async function() {

    let curBlock = await ethers.provider.getBlock();
    startTime = curBlock.timestamp ;

    await expect(
        designedVault.connect(user1).initialize(
            totalAllocatedAmount,
            totalClaims,
            totalTgeCount,
            startTime,
            periodTimesPerClaim
        )
      ).to.be.revertedWith("Accessible: Caller is not an admin");

    await expect(
        designedVault.connect(user1).setClaimer(
            user1.address
        )
      ).to.be.revertedWith("Accessible: Caller is not an admin");

    await expect(
        designedVault.connect(user1).allocateAmount(
            1, 1000
        )
      ).to.be.revertedWith("Accessible: Caller is not an admin");

    await expect(
        designedVault.connect(user1).addWhitelist(
            1, [user1.address]
        )
      ).to.be.revertedWith("Accessible: Caller is not an admin");

    await expect(
        designedVault.connect(user1).startRound(
            1
        )
      ).to.be.revertedWith("Accessible: Caller is not an admin");


    await expect(
        designedVault.connect(user1).start()
      ).to.be.revertedWith("Accessible: Caller is not an admin");

    await expect(
        designedVault.connect(user1).withdraw(user1.address)
      ).to.be.revertedWith("Accessible: Caller is not an admin");


  });

  it("initialize : check balance : 볼트의 토큰(TOS) 잔액이 totalAllocatedAmount보다 작으면 실패 ", async function() {
      let curBlock = await provider.getBlock();
      startTime = curBlock.timestamp + 15

      await  expect(
        designedVault.connect(deployer).initialize(
            totalAllocatedAmount,
            totalClaims,
            totalTgeCount,
            startTime,
            periodTimesPerClaim
        )
      ).to.be.revertedWith("BaseVault: balanceOf is insuffient");
  });

  it("initialize by owner : 관리자에 의해 초기 설정", async function() {
      let curBlock = await provider.getBlock();
      startTime = curBlock.timestamp + 15;
      endTime = startTime+(periodTimesPerClaim*totalClaims);

      await tos.mint(designedVault.address, totalAllocatedAmount);
      await designedVault.connect(deployer).initialize(
            totalAllocatedAmount,
            totalClaims,
            totalTgeCount,
            startTime,
            periodTimesPerClaim
      );
      expect(await designedVault.totalAllocatedAmount()).to.equal(totalAllocatedAmount);
      expect(await designedVault.totalClaims()).to.equal(totalClaims);
      expect(await designedVault.totalTgeCount()).to.equal(totalTgeCount);
      expect(await designedVault.startTime()).to.equal(startTime);
      expect(await designedVault.periodTimesPerClaim()).to.equal(periodTimesPerClaim);
      expect(await designedVault.endTime()).to.equal(endTime);
  });

  it("initialize by owner exceute only once : 초기화는 한번만 실행되어야 한다.", async function() {

      await  expect(
        designedVault.connect(deployer).initialize(
            totalAllocatedAmount,
            totalClaims,
            totalTgeCount,
            startTime,
            periodTimesPerClaim
        )
      ).to.be.revertedWith("BaseVault: already initialized");
  });

  it("cannot recive ETH  ", async function() {
      await expect(
          deployer.sendTransaction({
              to: designedVault.address,
              value: ethers.BigNumber.from('1'),
          })
      ).to.be.reverted;
  });

  it("set claimer : 변경되는 인출자 주소는 기존주소와 달라야 한다.", async function() {
      await  expect(
        designedVault.connect(deployer).setClaimer(
            deployer.address
        )
      ).to.be.revertedWith("BaseVault: same address");
  });

  it("set claimer :  ", async function() {
      await designedVault.connect(deployer).setClaimer(user1.address);
      expect(await designedVault.claimer()).to.equal(user1.address);
  });

  it("allocateAmount : check round: 입력 라운드는 설정된 totalTgeCount 보다 클수 없다.", async function() {
    await  expect(
        designedVault.connect(deployer).allocateAmount(
            totalTgeCount+1,
            1000
        )
      ).to.be.revertedWith("BaseVault: exceed available round");
  });

  it("allocateAmount : check amount: 할당액은 총 할당액을 초과할 수 없다.", async function() {
    await  expect(
        designedVault.connect(deployer).allocateAmount(
            1,
            totalAllocatedAmount+1
        )
      ).to.be.revertedWith("DesignedVault: exceed total allocated amount");
  });

  it("allocateAmount by owner : round 1 ", async function() {
    let i = 0;
    await designedVault.connect(deployer).allocateAmount(
            tgeRound[i].round,
            tgeRound[i].amount
        )
    let info = await designedVault.getTgeInfos(tgeRound[i].round);
   // console.log('info',info);

    expect(info.allocated).to.equal(true);
  });

  it("allocateAmount : 각 라운드에 금액 할당은 한번만 할 수 있다. ", async function() {
    let i = 0;
    await  expect(
        designedVault.connect(deployer).allocateAmount(
            tgeRound[i].round,
            tgeRound[i].amount
        )
      ).to.be.revertedWith("DesignedVault: already allocated");
  });
  /*
  it("addWhitelist : check round: 입력 라운드는 설정된 totalTgeCount 보다 클수 없다.", async function() {
    let i = 1;
    await  expect(
        designedVault.connect(deployer).addWhitelist(
            totalTgeCount+1,
            tgeRound[i].whishlist
        )
    ).to.be.revertedWith("BaseVault: exceed available round");
  });

  it("addWhitelist : check input users length: 추가되는 화이트리스트는 한번에 정해진 개수(maxInputOnceTime)씩만 가능하다. ", async function() {
    let i = 0;
    await  expect(
        designedVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            tgeRound[i].whishlist
        )
    ).to.be.revertedWith("BaseVault: check input count at once time");
  });
*/
  it("addWhitelist ", async function() {
    let i = 0;
    await designedVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            tgeRound[i].whishlist
        );
    let infos = await designedVault.getTgeInfos(tgeRound[i].round);
    expect(infos.whitelist).to.deep.equal(tgeRound[i].whishlist);
  });

  /*
  it("addWhitelist :  추가되는 화이트리스트는 이미 중복된 주소가 있어도 에러를 리턴하지 않는다.", async function() {
    let i = 0;
    await designedVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            [person1.address, person2.address]
        );
    await designedVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            [person2.address, person3.address]
        );
    await designedVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            [person3.address, person4.address]
        );
    let infos = await designedVault.getTgeInfos(tgeRound[i].round);
    expect(infos.whitelist).to.deep.equal([person1.address, person2.address, person3.address, person4.address]);
  });
  */

  it("startRound : 1 round   ", async function() {
    let i = 0;
    await designedVault.connect(deployer).startRound(
            tgeRound[i].round
        );
    let infos = await designedVault.getTgeInfos(tgeRound[i].round);
    // let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));
    expect(infos.started).to.equal(true);
    expect(infos.amount).to.above(0);

    //console.log('infos',infos);

  });


  it("addWhitelist : 이미 시작된 라운드는 화이트리스트를 추가할 수 없다.", async function() {
    let i = 0;
    await  expect(
       designedVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            [person5.address]
        )
    ).to.be.revertedWith("BaseVault: already started");
  });

  it("startRound : check round: 입력 라운드는 설정된 totalTgeCount 보다 클수 없다.", async function() {
    await  expect(
       designedVault.connect(deployer).startRound(
            totalTgeCount+1
        )
    ).to.be.revertedWith("BaseVault: exceed available round");
  });

  it("startRound : 이미 시작된 라운드는 실행할 수 없다.", async function() {
    let i = 0;
    await  expect(
       designedVault.connect(deployer).startRound(
            tgeRound[i].round
        )
    ).to.be.revertedWith("DesignedVault: already started");
  });
  /*
  it("startRound : 할당금액이 없는 라운드는 시작할 수 없다.", async function() {
    let i = 1;
    await  expect(
       designedVault.connect(deployer).startRound(
            tgeRound[i].round
        )
    ).to.be.revertedWith("DesignedVault: no allocated");
  });

  it("start : 인출자의 인출시작 요청 호출 전에 모든 Tge라운드는 이전에 금액 할당이 모두 끝나야 한다. ", async function() {
    await  expect(
       designedVault.connect(deployer).start()
    ).to.be.revertedWith("DesignedVault: previous round did't be allocated yet.");
  });

  it("allocateAmount by owner : round 2 ", async function() {
    let i = 1;
    await designedVault.connect(deployer).allocateAmount(
            tgeRound[i].round,
            tgeRound[i].amount
        )
  });

  it("startRound : 2 round   ", async function() {
    let i = 1;
    await designedVault.connect(deployer).startRound(tgeRound[i].round);
    let infos = await designedVault.getTgeInfos(tgeRound[i].round);
    expect(infos.started).to.equal(true);
    expect(infos.amount).to.above(0);
  });
  */
  it("start  ", async function() {
    await designedVault.connect(deployer).start();
    expect(await designedVault.startedByClaimer()).to.equal(true);

    let totalTgeAmount = 0;
    tgeRound.forEach(e=>{totalTgeAmount += e.amount;});
    let oneClaimAmountByClaimer =
            (totalAllocatedAmount - totalTgeAmount) /
            (totalClaims - totalTgeCount);
    oneClaimAmountByClaimer = parseInt(oneClaimAmountByClaimer);
    expect(
       await designedVault.connect(deployer).oneClaimAmountByClaimer()
    ).to.be.equal(oneClaimAmountByClaimer);
  });

  it("start : 이미 시작되었으면 다시 함수 호출할 수 없다. ", async function() {
    await  expect(
       designedVault.connect(deployer).start()
    ).to.be.revertedWith("DesignedVault: already started by claimer");
  });


  it("unclaimedInfos : tge 등록자, 클래임하지 않은 라운드의 수와 금액을 리턴한다. ", async function() {

      let currentRound = await designedVault.currentRound();
      let infos = await designedVault.getTgeInfos(currentRound);
      let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));
      expect(ethers.BigNumber.from(infos.amount).toString()).to.equal(amount.toString());

      let user1UnclaimedInfo = await designedVault.unclaimedInfos(user1.address);
      expect(user1UnclaimedInfo.count).to.equal(currentRound);
      expect(ethers.BigNumber.from(user1UnclaimedInfo.amount).toString()).to.equal(amount.toString());
  });
  /*
  it("unclaimedInfos : tge 등록자, 클래임하지 않은 라운드의 수와 금액을 리턴한다. ", async function() {

      let currentRound = await designedVault.currentRound();
      let infos = await designedVault.getTgeInfos(currentRound);
      let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));
      expect(ethers.BigNumber.from(infos.amount).toString()).to.equal(amount.toString());

      let person2UnclaimedInfo = await designedVault.unclaimedInfos(person2.address);
      expect(person2UnclaimedInfo.count).to.equal(currentRound);
      expect(ethers.BigNumber.from(person2UnclaimedInfo.amount).toString()).to.equal(amount.toString());
  });
  */
  it("claim : tge 의 화이트리스트가 1번째 라운드에 클래임을 한다.  ", async function() {
      let currentRound = await designedVault.currentRound();
      let infos = await designedVault.getTgeInfos(currentRound);
      let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));
      expect(ethers.BigNumber.from(infos.amount).toString()).to.equal(amount.toString());

      let user1UnclaimedInfo = await designedVault.unclaimedInfos(user1.address);
      let preTosBalance = await tos.balanceOf(user1.address);
      await designedVault.connect(user1).claim();
      let afterTosBalance = await tos.balanceOf(user1.address);
      expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(user1UnclaimedInfo.amount));

  });

  it("unclaimedInfos : claimer, 1라운드에서 클래임하지 않은 라운드의 수와 금액을 리턴한다. ", async function() {
      let currentRound = await designedVault.currentRound();
      expect(currentRound).to.equal(1);
      let claimerUnclaimedInfos = await designedVault.unclaimedInfos(user1.address);
      expect(claimerUnclaimedInfos.count).to.equal(0);
      expect(claimerUnclaimedInfos.amount).to.equal(0);
  });

  /*
  it("claim : 인출자는 tge기간에는 클래임을 할 금액이 없다.", async function() {
    await expect(
      designedVault.connect(user1).claim()
    ).to.be.revertedWith("DesignedVault: no claimable amount");
  });

  it("claim : tge 등록자, 2라운드만 있는 사용자가 2라운드 클래임을 한다.", async function() {
      await ethers.provider.send("evm_increaseTime", [periodTimesPerClaim]);
      await ethers.provider.send('evm_mine');
      let currentRound = await designedVault.connect(person6).currentRound();
      expect(currentRound).to.equal(2);

      let infos = await designedVault.getTgeInfos(currentRound);
      let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));
      expect(ethers.BigNumber.from(infos.amount).toString()).to.equal(amount.toString());

      let person6UnclaimedInfo = await designedVault.unclaimedInfos(person6.address);
      let preTosBalance = await tos.balanceOf(person6.address);
      await designedVault.connect(person6).claim();
      let afterTosBalance = await tos.balanceOf(person6.address);
      expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(person6UnclaimedInfo.amount));
  });

  it("unclaimedInfos : tge 등록자, 2번째 라운드에서 1라운드에 클래임하지 않은 금액도 포함하여 알수있다.", async function() {

      let currentRound = await designedVault.connect(person1).currentRound();
      expect(currentRound).to.equal(2);
      let infos = await designedVault.getTgeInfos(currentRound);
      let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));

      // console.log('currentRound',ethers.BigNumber.from(currentRound).toNumber()) ;
      // console.log('allocatedAmount',ethers.BigNumber.from(infos.allocatedAmount).toNumber()) ;
      // console.log('length',ethers.BigNumber.from(infos.whitelist.length).toNumber()) ;
      // console.log('infos.amount',ethers.BigNumber.from(infos.amount).toNumber()) ;
      // console.log('amount',ethers.BigNumber.from(amount).toNumber()) ;
      // console.log('allocated',infos.allocated) ;
      // console.log('started',infos.started) ;

      expect(ethers.BigNumber.from(infos.amount).toString()).to.equal(amount.toString());
      let person1UnclaimedInfo = await designedVault.unclaimedInfos(person1.address);
      // console.log('person1UnclaimedInfo.count',ethers.BigNumber.from(person1UnclaimedInfo.count).toString()) ;
      // console.log('person1UnclaimedInfo.amount',ethers.BigNumber.from(person1UnclaimedInfo.amount).toString()) ;
      expect(person1UnclaimedInfo.count).to.equal(currentRound);
      expect(person1UnclaimedInfo.amount).to.above(amount);
  });

  it("claim : tge 등록자, 3라운드에서 지난 라운드것을 한번에 클래임을 한다.", async function() {
      await ethers.provider.send("evm_increaseTime", [periodTimesPerClaim]);
      await ethers.provider.send('evm_mine');
      let currentRound = await designedVault.connect(person1).currentRound();
      expect(currentRound).to.equal(3);

      let infos = await designedVault.getTgeInfos(2);
      let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));
      expect(ethers.BigNumber.from(infos.amount).toString()).to.equal(amount.toString());

      let person1UnclaimedInfo = await designedVault.unclaimedInfos(person1.address);
      let preTosBalance = await tos.balanceOf(person1.address);
      await designedVault.connect(person1).claim();
      let afterTosBalance = await tos.balanceOf(person1.address);
      expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(person1UnclaimedInfo.amount));
  });

  it("claim : tge 의 화이트리스트가 1라운드만 있는 사용자가 라운드가 종료되어도 클래임을 할 수 있다. ", async function() {
      let person3UnclaimedInfo = await designedVault.unclaimedInfos(person3.address);
      let preTosBalance = await tos.balanceOf(person3.address);
      await designedVault.connect(person3).claim();
      let afterTosBalance = await tos.balanceOf(person3.address);
      expect(person3UnclaimedInfo.amount).to.above(0);
      expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(person3UnclaimedInfo.amount));
  });
  */
  it("unclaimedInfos : claimer, 3라운드에서 클래임하지 않은 라운드의 수와 금액을 리턴한다. ", async function() {
      await ethers.provider.send("evm_increaseTime", [periodTimesPerClaim]);
      await ethers.provider.send('evm_mine');

      await ethers.provider.send("evm_increaseTime", [periodTimesPerClaim]);
      await ethers.provider.send('evm_mine');

      let currentRound = await designedVault.currentRound();
      expect(currentRound.toString()).to.equal('3');

      let claimerUnclaimedInfos = await designedVault.unclaimedInfos(user1.address);
      let oneClaimAmountByClaimer = await designedVault.oneClaimAmountByClaimer();

      expect(claimerUnclaimedInfos.count).to.equal(2);
      expect(claimerUnclaimedInfos.amount).to.equal(oneClaimAmountByClaimer*2);
  });

  it("claim : 인출자는 인출하지 못한 라운드의 금액을 한번에 인출할 수 있다. ", async function() {
    await ethers.provider.send("evm_increaseTime", [periodTimesPerClaim]);
    await ethers.provider.send('evm_mine');
    await ethers.provider.send("evm_increaseTime", [periodTimesPerClaim]);
    await ethers.provider.send('evm_mine');
    let currentRound = await designedVault.connect(user1).currentRound();
    let oneClaimAmountByClaimer = await designedVault.oneClaimAmountByClaimer();
    let totalTgeCount = await designedVault.totalTgeCount();
    let calcAmount = ethers.BigNumber.from(currentRound).sub(ethers.BigNumber.from(totalTgeCount)).mul(ethers.BigNumber.from(oneClaimAmountByClaimer));

    let user1UnclaimedInfo = await designedVault.unclaimedInfos(user1.address);
    expect(user1UnclaimedInfo.amount).to.equal(calcAmount);

    let preTosBalance = await tos.balanceOf(user1.address);
    await designedVault.connect(user1).claim();
    let afterTosBalance = await tos.balanceOf(user1.address);
    expect(user1UnclaimedInfo.amount).to.above(0);
    expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(user1UnclaimedInfo.amount));
  });

  it("claim : 인출자는 특정 라운드에서 클래임을 한다.", async function() {
    await ethers.provider.send("evm_increaseTime", [periodTimesPerClaim]);
    await ethers.provider.send('evm_mine');
    let user1UnclaimedInfo = await designedVault.unclaimedInfos(user1.address);
    let preTosBalance = await tos.balanceOf(user1.address);
    await designedVault.connect(user1).claim();
    let afterTosBalance = await tos.balanceOf(user1.address);
    expect(user1UnclaimedInfo.amount).to.above(0);
    expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(user1UnclaimedInfo.amount));
  });

  it("availableWithdrawAmount : 관리자가 인출가능한 금액을 리턴한다. ", async function() {
    let availableWithdrawAmount = await designedVault.availableWithdrawAmount();
    expect(availableWithdrawAmount).to.equal(0);

    let addAmount = 1000;
    await tos.connect(deployer).mint(designedVault.address, addAmount);
    availableWithdrawAmount = await designedVault.availableWithdrawAmount();
    expect(availableWithdrawAmount).to.equal(addAmount);
  });

  it("withdraw : 관리자는 인출가능 금액을 특정 주소로 보낼수 있다.", async function() {
    let availableWithdrawAmount = await designedVault.availableWithdrawAmount();
    let preTosBalance = await tos.balanceOf(person5.address);
    await designedVault.connect(deployer).withdraw(person5.address);
    let afterTosBalance = await tos.balanceOf(person5.address);
    expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(availableWithdrawAmount));
  });

});
