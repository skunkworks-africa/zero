import test from 'node:test';
import assert from 'node:assert/strict';
import {assess,estimate,contactContext} from '../src/model.mjs';
test('assessment uncertainty is distinct from proven absence and mixed values are rounded',()=>{
  assert.equal(assess(Array(5).fill('unknown')).unknown,5);
  assert.equal(assess(Array(5).fill('tested')).score,100);
  const mixed=assess(['unknown','planned','implemented','tested','tested']);
  assert.equal(mixed.score,60);assert.equal(mixed.unknown,1);assert.equal(mixed.priorities[0][0],'Knowledge');
});
test('incomplete or unsupported responses cannot produce a score',()=>{for(const input of [[],['tested'],['fake',...Array(4).fill('tested')],null])assert.throws(()=>assess(input));});
test('plans include setup exactly once and optional assessment separately',()=>{assert.equal(estimate('Foundation',3).total,4470);assert.equal(estimate('Growth',12,true).total,35880);assert.equal(estimate('Scale',6).total,43440);assert.throws(()=>estimate('Enterprise',3));assert.throws(()=>estimate('Foundation',0));});
test('query context only accepts known topics and bounded site paths',()=>{assert.equal(contactContext('?interest=ZERO%20AI&from=%2Fservices%2Fai%2F').interest,'ZERO AI');assert.equal(contactContext('?interest=%3Cscript%3E&from=https://evil.test/').from,'/contact/');assert.equal(contactContext('?from=/').from,'/');});
