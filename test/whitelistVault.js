const { expect } = require("chai");
const {
    BigNumber,
    FixedFormat,
    FixedNumber,
    formatFixed,
    parseFixed
} = require("@ethersproject/bignumber");

describe("WhitelistVault", function() {

  let whitelistVault , tos , provider;
  let maxInputOnceTime = 2;
  let deployer, user1, person1, person2, person3, person4,person5, person6 ;

  let name="WhitelistTestVault";

  let totalAllocatedAmount=100000;
  let totalTgeCount=5;
  let startTime, endTime;
  let periodTimesPerCliam = 60 * 10; // 10 mins

  let tgeRound = [
      {
       round : 1,
       amount : 10000,
       whitelist: []
      },
      {
       round : 2,
       amount : 22500,
       whitelist: []
      },
      {
       round : 3,
       amount : 22500,
       whitelist: []
      },
      {
       round : 4,
       amount : 22500,
       whitelist: []
      },
      {
       round : 5,
       amount : 22500,
       whitelist: []
      }
  ]
  totalTgeCount = tgeRound.length;


  before(async function () {
    let accounts = await ethers.getSigners();
    [deployer, user1, person1, person2, person3, person4, person5, person6 ] = accounts
    tgeRound[0].whitelist = [person1.address, person2.address, person3.address, person4.address];
    tgeRound[1].whitelist = [person1.address, person6.address];
    tgeRound[2].whitelist = [person1.address, person5.address];
    tgeRound[3].whitelist = [person1.address, person5.address, person6.address];
    tgeRound[4].whitelist = [person1.address, person6.address];


    const WhitelistVault = await ethers.getContractFactory("WhitelistVault");
    const TOS = await ethers.getContractFactory("TOS");

    tos = await TOS.deploy("TOS Token","TOS","1") ;
    tos.deployed();

    whitelistVault = await WhitelistVault.deploy(name, tos.address, maxInputOnceTime);
    whitelistVault.deployed();

    provider = await ethers.getDefaultProvider();

  });

  it("check name, token ", async function() {
    expect(await whitelistVault.name()).to.equal(name);
    expect(await whitelistVault.token()).to.equal(tos.address);
    expect(await whitelistVault.maxInputOnceTime()).to.equal(maxInputOnceTime);
  });

  it("Check onlyOwner Function : 관리자 권한 함수 확인 : 일반사용자가 실행시 거부됨 ", async function() {

    /** onlyOwner Functions
      initialize
      setClaimer
      allocateAmount
      addWhitelist
      startRound
      start
      withdraw
     */

    let curBlock = await ethers.provider.getBlock();
    startTime = curBlock.timestamp ;

    await expect(
        whitelistVault.connect(user1).initialize(
            totalAllocatedAmount,
            totalTgeCount,
            startTime,
            periodTimesPerCliam
        )
      ).to.be.revertedWith("Accessible: Caller is not an admin");

    await expect(
        whitelistVault.connect(user1).allocateAmountTGE(
            1000
        )
      ).to.be.revertedWith("Accessible: Caller is not an admin");

    await expect(
        whitelistVault.connect(user1).addWhitelist(
            1, [user1.address]
        )
      ).to.be.revertedWith("Accessible: Caller is not an admin");

    await expect(
        whitelistVault.connect(user1).startRound(
            1
        )
      ).to.be.revertedWith("Accessible: Caller is not an admin");

    await expect(
        whitelistVault.connect(user1).withdraw(user1.address)
      ).to.be.revertedWith("Accessible: Caller is not an admin");


  });

  it("initialize : check balance : 볼트의 토큰(TOS) 잔액이 totalAllocatedAmount보다 작으면 실패 ", async function() {

      this.timeout(1000000);
      let curBlock = await provider.getBlock();
      startTime = curBlock.timestamp + 15

      await  expect(
        whitelistVault.connect(deployer).initialize(
            totalAllocatedAmount,
            totalTgeCount,
            startTime,
            periodTimesPerCliam
        )
      ).to.be.revertedWith("BaseVault: balanceOf is insuffient");
  });

  it("initialize by owner : 관리자에 의해 초기 설정", async function() {
      this.timeout(1000000);

      let curBlock = await provider.getBlock();
      startTime = curBlock.timestamp + 15;
      endTime = startTime+(periodTimesPerCliam*totalTgeCount);

      await tos.mint(whitelistVault.address, totalAllocatedAmount);
      await whitelistVault.connect(deployer).initialize(
            totalAllocatedAmount,
            totalTgeCount,
            startTime,
            periodTimesPerCliam
      );
      expect(await whitelistVault.totalAllocatedAmount()).to.equal(totalAllocatedAmount);
      expect(await whitelistVault.totalTgeCount()).to.equal(totalTgeCount);
      expect(await whitelistVault.startTime()).to.equal(startTime);
      expect(await whitelistVault.periodTimesPerCliam()).to.equal(periodTimesPerCliam);
      expect(await whitelistVault.endTime()).to.equal(endTime);
  });

  it("initialize by owner exceute only once : 초기화는 한번만 실행되어야 한다.", async function() {
      this.timeout(1000000);
      await  expect(
        whitelistVault.connect(deployer).initialize(
            totalAllocatedAmount,
            totalTgeCount,
            startTime,
            periodTimesPerCliam
        )
      ).to.be.revertedWith("BaseVault: already initialized");

  });

  it("startRound : round 2: allocateAmountTGE 이 호출되기 전에 라운드가 호출될 수 없다. ", async function() {
    await  expect(
        whitelistVault.connect(deployer).startRound(
            2
        )
      ).to.be.revertedWith("BaseVaultStorage: zero value");
  });

  it("allocateAmountTGE : check amount: 할당액은 총 할당액을 초과할 수 없다.", async function() {
    await  expect(
        whitelistVault.connect(deployer).allocateAmountTGE(
            totalAllocatedAmount+1
        )
      ).to.be.revertedWith("WhitelistVault: exceed total allocated amount");
  });


  it("allocateAmount by owner : round 1 ", async function() {
    let i = 0;
    await whitelistVault.connect(deployer).allocateAmountTGE(
            tgeRound[i].amount
        );
    let infos = await whitelistVault.getTgeInfos(i+1);
    expect(infos.allocated).to.equal(true);
    expect(infos.allocatedAmount).to.equal(tgeRound[i].amount);

    let allocatedAmountForRound = (totalAllocatedAmount- tgeRound[i].amount)/ (totalTgeCount-1) ;
    allocatedAmountForRound = parseInt(allocatedAmountForRound);
    expect(await whitelistVault.allocatedAmountForRound()).to.equal(allocatedAmountForRound);

  });

  it("allocateAmount : 각 라운드에 금액 할당은 한번만 할 수 있다. ", async function() {
    let i = 0;
    await  expect(
        whitelistVault.connect(deployer).allocateAmountTGE(
            tgeRound[i].amount
        )
      ).to.be.revertedWith("WhitelistVault: already allocated");
  });

  it("addWhitelist : check round: 입력 라운드는 설정된 totalTgeCount 보다 클수 없다.", async function() {
    let i = 1;
    await  expect(
        whitelistVault.connect(deployer).addWhitelist(
            totalTgeCount+1,
            tgeRound[i].whitelist
        )
    ).to.be.revertedWith("BaseVault: exceed available round");
  });

  it("addWhitelist : check input users length: 추가되는 화이트리스트는 한번에 정해진 개수(maxInputOnceTime)씩만 가능하다. ", async function() {
    let i = 0;
    await  expect(
        whitelistVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            tgeRound[i].whitelist
        )
    ).to.be.revertedWith("BaseVault: check input count at once time");
  });

  it("addWhitelist : 2 round ", async function() {
    let i = 1;
    await whitelistVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            tgeRound[i].whitelist
        );
    let infos = await whitelistVault.getTgeInfos(tgeRound[i].round);
    expect(infos.whitelist).to.deep.equal(tgeRound[i].whitelist);
  });

  it("startRound : 1 round : 화이트리스트 등록을 안하고 시작을 할 수 없다.", async function() {
    let i = 0;
    await  expect(
        whitelistVault.connect(deployer).startRound(
            tgeRound[i].round
        )
    ).to.be.revertedWith("WhitelistVault: no whitelist");
  });

  it("addWhitelist : 1 round:  추가되는 화이트리스트는 이미 중복된 주소가 있어도 에러를 리턴하지 않는다.", async function() {
    let i = 0;
    await whitelistVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            [person1.address, person2.address]
        );
    await whitelistVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            [person2.address, person3.address]
        );
    await whitelistVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            [person3.address, person4.address]
        );
    let infos = await whitelistVault.getTgeInfos(tgeRound[i].round);
    expect(infos.whitelist).to.deep.equal([person1.address, person2.address, person3.address, person4.address]);
  });

  it("startRound : 1 round   ", async function() {
    let i = 0;

    await whitelistVault.connect(deployer).startRound(
            tgeRound[i].round
        );
    let infos = await whitelistVault.getTgeInfos(tgeRound[i].round);
    expect(infos.started).to.equal(true);
    expect(infos.amount).to.equal(parseInt(tgeRound[i].amount/tgeRound[i].whitelist.length));
  });

  it("addWhitelist : 1 round : 이미 시작된 라운드는 화이트리스트를 추가할 수 없다.", async function() {
    let i = 0;
    await  expect(
       whitelistVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            [person5.address]
        )
    ).to.be.revertedWith("BaseVault: already started");
  });

  it("startRound : check round: 입력 라운드는 설정된 totalTgeCount 보다 클수 없다.", async function() {
    await  expect(
       whitelistVault.connect(deployer).startRound(
            totalTgeCount+1
        )
    ).to.be.revertedWith("BaseVault: exceed available round");
  });

  it("startRound : 1 round  : 이미 시작된 라운드는 실행할 수 없다.", async function() {
    let i = 0;
    await  expect(
       whitelistVault.connect(deployer).startRound(
            tgeRound[i].round
        )
    ).to.be.revertedWith("WhitelistVault: already started");
  });

  it("claim : 1 round : tge 의 화이트리스트에 포함되어 있지 않으면 person6 클래임할 것이 없다.   ", async function() {

      let currentRound = await whitelistVault.connect(deployer).currentRound();
      expect(ethers.BigNumber.from(currentRound).toString()).to.equal('1');
      let person6UnclaimedInfo = await whitelistVault.connect(person6).unclaimedInfos();
      expect(ethers.BigNumber.from(person6UnclaimedInfo.count).toString()).to.equal('0');
      expect(ethers.BigNumber.from(person6UnclaimedInfo.amount).toString()).to.equal('0');

  });


  it("claim : 1 round : tge 의 화이트리스트 person3 가 1번째 라운드에 클래임을 한다.  ", async function() {
      let currentRound = await whitelistVault.connect(person3).currentRound();
      let infos = await whitelistVault.getTgeInfos(currentRound);
      let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));
      expect(ethers.BigNumber.from(infos.amount).toString()).to.equal(amount.toString());

      let person3UnclaimedInfo = await whitelistVault.connect(person3).unclaimedInfos();
      let preTosBalance = await tos.balanceOf(person3.address);
      await whitelistVault.connect(person3).claim();
      let afterTosBalance = await tos.balanceOf(person3.address);
      expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(person3UnclaimedInfo.amount));

  });


  it("startRound : 2 round : 해당 라운드 시간에만 스타트 할 수 있다.", async function() {
    let i = 2;
    await  expect(
       whitelistVault.connect(deployer).startRound(
            i
        )
    ).to.be.revertedWith("WhitelistVault: no current round period");
  });

  it("startRound : 2 round  ", async function() {
    let i = 2;
    //console.log('tgeRound[i-1]', i-1, tgeRound[i-1]);
    let lastClaimedRound = await whitelistVault.connect(deployer).lastClaimedRound();
    //console.log('lastClaimedRound', lastClaimedRound.toString());

    let currentRound = await whitelistVault.connect(deployer).currentRound();
    let currentRoundNumber = ethers.BigNumber.from(currentRound).toNumber();
    let roundStartTime = await whitelistVault.connect(deployer).startRoundTime(i);

    let nowInt = parseInt(Date.now()/1000);
    let round2StartTimeNumber = ethers.BigNumber.from(roundStartTime).toNumber();

    if(i > currentRoundNumber && round2StartTimeNumber > nowInt ){
      let increaseTime = round2StartTimeNumber - nowInt + 10;
      await ethers.provider.send("evm_increaseTime", [increaseTime]);
      await ethers.provider.send("evm_mine");
    }
    await whitelistVault.connect(deployer).startRound(i);
    let infos = await whitelistVault.getTgeInfos(i);

    expect(infos.started).to.equal(true);
    expect(infos.amount).to.equal(parseInt(tgeRound[i-1].amount/tgeRound[i-1].whitelist.length));

  });

  it("unclaimedInfos : tge 등록자, person2 클래임하지 않은 라운드의 수와 금액을 리턴한다. ", async function() {

      let i = 1;
      let infos = await whitelistVault.getTgeInfos(i);
      let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));
      expect(ethers.BigNumber.from(infos.amount).toString()).to.equal(amount.toString());

      let person2UnclaimedInfo = await whitelistVault.connect(person2).unclaimedInfos();
      expect(person2UnclaimedInfo.count).to.equal(1);
      expect(ethers.BigNumber.from(person2UnclaimedInfo.amount).toString()).to.equal(amount.toString());
  });

  it("unclaimedInfos : tge 등록자, person1 클래임하지 않은 라운드의 수와 금액을 리턴한다. 2번째 라운드에서 1라운드에 클래임하지 않은 금액도 포함하여 알수있다. ", async function() {

      let currentRound = await whitelistVault.connect(person1).currentRound();
      let sumOfAmount = ethers.BigNumber.from('0');

      for(let i=1 ; i <= currentRound.toNumber(); i++){
        let infos = await whitelistVault.getTgeInfos(i);
        let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));
        sumOfAmount = sumOfAmount.add(amount);
      }

      let person1UnclaimedInfo = await whitelistVault.connect(person1).unclaimedInfos();
      expect(person1UnclaimedInfo.count).to.equal(currentRound);
      expect(ethers.BigNumber.from(person1UnclaimedInfo.amount).toString()).to.equal(sumOfAmount.toString());
  });


  it("claim : tge 등록자, 2라운드만 있는 사용자 person6 가 2라운드 클래임을 한다.", async function() {
      // await ethers.provider.send("evm_increaseTime", [periodTimesPerCliam]);
      // await ethers.provider.send('evm_mine');
      let currentRound = await whitelistVault.connect(person6).currentRound();
      expect(currentRound).to.equal(2);

      let infos = await whitelistVault.getTgeInfos(currentRound);
      let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));
      expect(ethers.BigNumber.from(infos.amount).toString()).to.equal(amount.toString());

      let person6UnclaimedInfo = await whitelistVault.connect(person6).unclaimedInfos();
      let preTosBalance = await tos.balanceOf(person6.address);
      await whitelistVault.connect(person6).claim();
      let afterTosBalance = await tos.balanceOf(person6.address);
      expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(person6UnclaimedInfo.amount));
  });

  it("claim : tge 등록자, person1 , 3라운드에서 지난 라운드것을 한번에 클래임을 한다. 3라운드 스타트를 안한상태이다.", async function() {
      await ethers.provider.send("evm_increaseTime", [periodTimesPerCliam]);
      await ethers.provider.send('evm_mine');
      let currentRound = await whitelistVault.connect(person1).currentRound();
      expect(currentRound).to.equal(3);
      let sumOfAmount = ethers.BigNumber.from('0');
      let count = 0;
      for(let i=1 ; i <= currentRound.toNumber(); i++){
        let infos = await whitelistVault.getTgeInfos(i);

        if(infos.started){
          let amount = ethers.BigNumber.from(infos.allocatedAmount).div(ethers.BigNumber.from(infos.whitelist.length));
          sumOfAmount = sumOfAmount.add(amount);
          count ++;
        }
      }
      let person1UnclaimedInfo = await whitelistVault.connect(person1).unclaimedInfos();
      expect(person1UnclaimedInfo.count).to.equal(count);
      expect(ethers.BigNumber.from(person1UnclaimedInfo.amount).toString()).to.equal(sumOfAmount.toString());

      let preTosBalance = await tos.balanceOf(person1.address);
      await whitelistVault.connect(person1).claim();
      let afterTosBalance = await tos.balanceOf(person1.address);
      expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(sumOfAmount));
  });

  it("claim : tge 의 화이트리스트가 1라운드만 있는 사용자가 라운드가 종료되어도 클래임을 할 수 있다. ", async function() {
      let person4UnclaimedInfo = await whitelistVault.connect(person4).unclaimedInfos();
      let preTosBalance = await tos.balanceOf(person4.address);
      await whitelistVault.connect(person4).claim();
      let afterTosBalance = await tos.balanceOf(person4.address);
      expect(person4UnclaimedInfo.amount).to.above(0);
      expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(person4UnclaimedInfo.amount));
  });


  it("addWhitelist : 3 round ", async function() {
    let i = 2;
    await whitelistVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            tgeRound[i].whitelist
        );
    let infos = await whitelistVault.getTgeInfos(tgeRound[i].round);
    expect(infos.whitelist).to.deep.equal(tgeRound[i].whitelist);
  });

  it("addWhitelist : 4 round ", async function() {
    let i = 3;
    await whitelistVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            [person1.address, person5.address]
        );
    await whitelistVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            [person6.address ]
        );
    let infos = await whitelistVault.getTgeInfos(tgeRound[i].round);
    expect(infos.whitelist).to.deep.equal(tgeRound[i].whitelist);
  });

  it("addWhitelist : 5 round ", async function() {
    let i = 4;
    await whitelistVault.connect(deployer).addWhitelist(
            tgeRound[i].round,
            tgeRound[i].whitelist
        );
    let infos = await whitelistVault.getTgeInfos(tgeRound[i].round);
    expect(infos.whitelist).to.deep.equal(tgeRound[i].whitelist);
  });


  it("addWhitelist : 5 round,  person1 , 3단계 화이트등록했으나, 3,4단계 스타트 없이 5단계로 지나간다.  ", async function() {

      let targetRound = 5;
      let loop = true;
      while(loop){
        await ethers.provider.send("evm_increaseTime", [periodTimesPerCliam]);
        await ethers.provider.send('evm_mine');
        let currentRound = await whitelistVault.currentRound();
        if(currentRound == targetRound ) loop = false;
      }

      await whitelistVault.connect(deployer).addWhitelist(
            tgeRound[targetRound-1].round,
            tgeRound[targetRound-1].whitelist
      );
      let infos = await whitelistVault.getTgeInfos(targetRound);
      expect(infos.whitelist).to.deep.equal(tgeRound[targetRound-1].whitelist);
  });

  it("claim : 5 round, person1 , startRound 하지 않았으니, 클래임할게 없다.", async function() {

      let person1UnclaimedInfo = await whitelistVault.connect(person1).unclaimedInfos();
      expect(person1UnclaimedInfo.count).to.equal(0);
      expect(ethers.BigNumber.from(person1UnclaimedInfo.amount).toString()).to.equal('0');

  });

  it("startRound : 5 round, person1, 3,4단계 스타트 없이 5단계로 지나갔다. 3,4 할당리워드는 이월되어야한다.", async function() {
      let i = 5;
      let lastClaimedRound = await whitelistVault.connect(deployer).lastClaimedRound();
      let currentRound = await whitelistVault.currentRound();

      let sumOfAmount = 0;
      for(let i=lastClaimedRound.toNumber()+1 ; i <= currentRound.toNumber(); i++){
        sumOfAmount += tgeRound[i-1].amount;
      }

      await whitelistVault.connect(deployer).startRound(i);
      let infos = await whitelistVault.getTgeInfos(i);
      expect(infos.started).to.equal(true);
      expect(infos.allocated).to.equal(true);
      expect(infos.allocatedAmount.toNumber()).to.equal(sumOfAmount);
      expect(infos.amount).to.equal(parseInt(sumOfAmount/tgeRound[i-1].whitelist.length));

  });

  it("claim :  5 round, person1, 3,4 할당리워드는 이월되어, 5라운드 클래임한다.  ", async function() {

      let person1UnclaimedInfo = await whitelistVault.connect(person1).unclaimedInfos();
      let preTosBalance = await tos.balanceOf(person1.address);
      await whitelistVault.connect(person1).claim();
      let afterTosBalance = await tos.balanceOf(person1.address);
      expect(person1UnclaimedInfo.amount).to.above(0);
      expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(person1UnclaimedInfo.amount));
  });

  it("claim :  5 round, person2,  ", async function() {

      let person2UnclaimedInfo = await whitelistVault.connect(person2).unclaimedInfos();
      let preTosBalance = await tos.balanceOf(person2.address);
      await whitelistVault.connect(person2).claim();
      let afterTosBalance = await tos.balanceOf(person2.address);
      expect(person2UnclaimedInfo.amount).to.above(0);
      expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(person2UnclaimedInfo.amount));
  });
  it("claim :  5 round, person3, 클래임할 금액이 없다. ", async function() {

      let person3UnclaimedInfo = await whitelistVault.connect(person3).unclaimedInfos();
      expect(person3UnclaimedInfo.amount).to.equal(0);
      expect(person3UnclaimedInfo.count).to.equal(0);
  });
  it("claim :  5 round, person4, 클래임할 금액이 없다.  ", async function() {

      let person4UnclaimedInfo = await whitelistVault.connect(person4).unclaimedInfos();
      expect(person4UnclaimedInfo.amount).to.equal(0);
      expect(person4UnclaimedInfo.count).to.equal(0);
  });
  it("claim :  5 round, person5, 4라운드 화이트리스트이나. startRound가 이루어지지 않아, 클래임할 금액이 없다.  ", async function() {

      let person5UnclaimedInfo = await whitelistVault.connect(person5).unclaimedInfos();
      expect(person5UnclaimedInfo.amount).to.equal(0);
      expect(person5UnclaimedInfo.count).to.equal(0);
  });

  it("claim :  5 round, person6, 3,4 할당리워드는 이월되어, 5라운드 클래임한다. 4라운드 화이트리스트이나. 4 라운드 startRound은 실행되지 않았다. 5라운드 금액만 클래임한다. ", async function() {

       let i = 5;
      let lastClaimedRound = 3;
      let currentRound = await whitelistVault.currentRound();

      let sumOfAmount = 0;
      for(let i=lastClaimedRound ; i <= currentRound.toNumber(); i++){
        sumOfAmount += tgeRound[i-1].amount;
      }

      let infos = await whitelistVault.getTgeInfos(i);
      expect(infos.started).to.equal(true);
      expect(infos.allocated).to.equal(true);
      expect(infos.allocatedAmount.toNumber()).to.equal(sumOfAmount);
      expect(infos.amount).to.equal(parseInt(sumOfAmount/tgeRound[i-1].whitelist.length));

      let person6UnclaimedInfo = await whitelistVault.connect(person6).unclaimedInfos();
      let preTosBalance = await tos.balanceOf(person6.address);
      await whitelistVault.connect(person6).claim();
      let afterTosBalance = await tos.balanceOf(person6.address);
      expect(person6UnclaimedInfo.amount).to.equal(infos.amount);
      expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(person6UnclaimedInfo.amount));
  });

  it("totalClaimedAmount :  총 클래임한 금액은 총할당된 리워드와 같다.", async function() {

      let totalClaimedAmount = await whitelistVault.totalClaimedAmount();
      let totalAllocatedAmount = await whitelistVault.totalAllocatedAmount();
      expect(totalClaimedAmount).to.equal(totalAllocatedAmount);
  });


  it("availableWithdrawAmount : 관리자가 인출가능한 금액을 리턴한다. 총 할당금액은 인출할수없다. ", async function() {
    let availableWithdrawAmount = await whitelistVault.availableWithdrawAmount();
    expect(availableWithdrawAmount).to.equal(0);

    let addAmount = 1000;
    await tos.connect(deployer).mint(whitelistVault.address, addAmount);
    availableWithdrawAmount = await whitelistVault.availableWithdrawAmount();
    expect(availableWithdrawAmount).to.equal(addAmount);
  });

  it("withdraw : 관리자는 인출가능 금액을 특정 주소로 보낼수 있다. 총 할당금액은 인출할수없다. ", async function() {
    let availableWithdrawAmount = await whitelistVault.availableWithdrawAmount();
    let preTosBalance = await tos.balanceOf(person5.address);
    await whitelistVault.connect(deployer).withdraw(person5.address);
    let afterTosBalance = await tos.balanceOf(person5.address);
    expect(afterTosBalance).to.equal(ethers.BigNumber.from(preTosBalance).add(availableWithdrawAmount));
  });


});
