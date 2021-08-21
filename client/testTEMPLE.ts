import { Sotez } from 'sotez';

const tezos = new Sotez('https://testnet-tezos.giganode.io');

const transfer = async () => {
  await tezos.importKey(
    'edskSA6t5s3MfqoYbTTrqN5RudsAgQWagGpfJ7Ymjg4y5snFDQhDRNpYzcP4UPCiHE287m7msT3SsygqMnHKUQk7S9ommxL25t',
  );
  const { hash } = await tezos.transfer({
    to: 'tz1i3KsBoopizJj9RrkfMY4NZchAp5h3939L',
    amount: 1,
  });

  console.log(`Waiting for operation ${hash}`);
  const blockHash = await tezos.awaitOperation(hash);
  console.log(`Operation found in block ${blockHash}`);
};

transfer();
