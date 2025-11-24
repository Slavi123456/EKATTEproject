import test from 'node::test';

// const test = require('node:test');

test('synchronous passing test', (t) => {
  // This test passes because it does not throw an exception.
  assert.strictEqual(1, 1);
});
