import assert from 'assert';
import { encode } from '../components/custom-ident.js';
import { describe, it } from 'node:test';

describe('encode', () => {
	it('does not change simple identifiers', () => {
		assert.strictEqual(encode('foo'), 'foo');
	});
	it('can handle A-Za-z0-9-_', () => {
		assert.strictEqual(
			encode('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'),
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
		);
	});
	it('can handle numbers at the start', () => {
		assert.strictEqual(encode('1Foo'), '\\31 Foo');
		assert.strictEqual(encode('1foo'), '\\31 foo');
		assert.strictEqual(encode('-1zoo'), '-\\31zoo');
	});
	it('can handle unicode characters', () => {
		assert.strictEqual(encode('😀'), '\\1F600');
	});
	it('can handle ASCII < 128', () => {
		assert.strictEqual(encode(' test!"$%&'), '_20test_21_22_24_25_26');
	});
});
