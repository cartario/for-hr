const { assert } = require('chai');

const Decentragram = artifacts.require('./Decentragram.sol');

require('chai').use(require('chai-as-promised')).should();

contract('Decentragram', ([deployer, author, tipper]) => {
  let decentragram;

  before(async () => {
    decentragram = await Decentragram.deployed();
  });

  describe(
    'deployment',
    async () => {
      it('deploys successfully', async () => {
        const address = await decentragram.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
      });

      it('has a name', async () => {
        const name = await decentragram.name();
        assert.equal(name, 'Decentragram');
      });

      it('has motherfucker', async () => {
        const hey = await decentragram.hey();
        assert.equal(hey, 'Mothefucker!!!');
      });
    },

    describe('images', async () => {
      let result, imageCount, hash;
      hash = 'abd';

      before(async () => {
        await decentragram.uploadImage(hash, 'Image description', { from: author });
        result = await decentragram.uploadImage(hash, 'Image description2', { from: author });
        imageCount = await decentragram.imageCount();
      });

      //check event
      it('create images', async () => {
        //SUCCESS
        const event = result.logs[0].args;
        assert.equal(imageCount, 2);
        assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct');
        assert.equal(event.hash, hash, 'hash is correct');
        assert.equal(event.description, 'Image description2', 'description is correct');
        assert.equal(event.tipAmount, '0', 'tip amount is correct');
        assert.equal(event.author, author, 'author is correct');

        //FAILURE
        // Image must have hash
        await decentragram.uploadImage('', 'Image description3', { from: author }).should.be
          .rejected;
        // Image must have description
        await decentragram.uploadImage('hash', '', { from: author }).should.be.rejected;
      });

      //check from Struct
      it('listImages', async () => {
        const image = await decentragram.images(imageCount);
        assert.equal(image.id.toNumber(), imageCount.toNumber(), 'id is correct');
        assert.equal(image.hash, hash, 'hash is correct');
        assert.equal(image.description, 'Image description2', 'description is correct');
        assert.equal(image.tipAmount, '0', 'tip amount is correct');
        assert.equal(image.author, author, 'author is correct');
      });

      // tipImages
      it('allows users to tip images', async () => {
        let oldAuthorBalance, newAuthorBalance, tipImageOwnerAmount;
        oldAuthorBalance = await web3.eth.getBalance(author);
        oldAuthorBalance = new web3.utils.BN(oldAuthorBalance); // get balane in bigInt

        result = await decentragram.tipImageOwner(imageCount, {
          from: tipper,
          value: web3.utils.toWei('1', 'Ether'), //convert 1 eth to wei
        });

        // SUCCESS
        const event = result.logs[0].args;

        assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct');
        assert.equal(event.hash, hash, 'hash is correct');
        assert.equal(event.description, 'Image description2', 'description is correct');
        assert.equal(event.tipAmount, '1000000000000000000', 'TipAmmount is correct');
        assert.equal(event.author, author, 'author is correct');

        newAuthorBalance = await web3.eth.getBalance(author);
        newAuthorBalance = new web3.utils.BN(newAuthorBalance);

        tipImageOwnerAmount = web3.utils.toWei('1', 'Ether');
        tipImageOwnerAmount = new web3.utils.BN(tipImageOwnerAmount);

        const expectedBalance = oldAuthorBalance.add(tipImageOwnerAmount);

        assert.equal(
          newAuthorBalance.toString(),
          expectedBalance.toString(),
          'expected balance is correct',
        );

        // FAILURE: Tries to tip a image that does not exist
        await decentragram.tipImageOwner(99, {
          from: tipper,
          value: web3.utils.toWei('1', 'Ether'),
        }).should.be.rejected;
      });
    }),
  );
});
