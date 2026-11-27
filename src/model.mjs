export const dimensions = [
  ['Knowledge', 'Do you know which systems, data and dependencies matter most?', 'Create a prioritised inventory and name a business owner.'],
  ['Protection', 'Have you tested whether access and protective controls work?', 'Choose one important control and define a repeatable test.'],
  ['Recovery', 'Have you restored a critical service against an agreed recovery objective?', 'Plan an authorised restore exercise with clear success criteria.'],
  ['People', 'Can your team demonstrate the skills needed to respond?', 'Rehearse a realistic scenario and record decisions and gaps.'],
  ['Governance', 'Does current evidence have an accountable owner and review date?', 'Create an evidence register with owners, dates and limitations.']
];
export const answers = [['unknown', 'Not sure', 0], ['planned', 'Planned', 1], ['implemented', 'In place', 2], ['tested', 'Tested recently', 3]];
export function assess(values) {
  if (!Array.isArray(values) || values.length !== 5 || values.some(v => !answers.some(a => a[0] === v))) throw new Error('Answer all five questions.');
  const points = values.map(v => answers.find(a => a[0] === v)[2]);
  return { score: Math.round(points.reduce((a,b) => a+b,0) / 15 * 100), unknown: values.filter(v=>v==='unknown').length, priorities: points.map((v,i)=>({value:v,index:i})).sort((a,b)=>a.value-b.value).slice(0,2).map(v=>dimensions[v.index]), values };
}
export const plans = { Foundation: [990,1500,3,2,2], Growth: [2490,3500,10,5,6], Scale: [5990,7500,25,12,15] };
export function estimate(plan, months, baseline=false) {
  if (!Object.hasOwn(plans,plan) || ![3,6,12].includes(months)) throw new Error('Select a valid plan and term.');
  const [monthly,setup] = plans[plan];
  return {monthly, setup, months, baseline: baseline ? 2500 : 0, total: monthly * months + setup + (baseline ? 2500 : 0)};
}
export const money = n => 'A$' + new Intl.NumberFormat('en-AU',{maximumFractionDigits:0}).format(n);
export const interests = ['Help me understand what I need','Safety Capital assessment','ZERO Proof','ZERO Baseline','ZERO Discover','ZERO AI','ZERO DevSecOps','ZERO Govern','ZERO Response','ZERO Protect','ZERO Labs','ZERO Academy','ZERO Intelligence','ZERO Professional','Enterprise assurance','Research insight','Report a correction'];
export function contactContext(search) {
  const params = new URLSearchParams(search);
  return {interest: interests.includes(params.get('interest')) ? params.get('interest') : interests[0], from: /^\/[a-z0-9/-]*\/$/.test(params.get('from') || '') || params.get('from') === '/' ? params.get('from') : '/contact/'};
}
