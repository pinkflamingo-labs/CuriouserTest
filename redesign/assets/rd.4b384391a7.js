window.CC_RD_ART={"alice":"assets/rdc-alice.a5c8d09229.webp","clockmaker":"assets/rdc-clockmaker.977e029280.webp","court2":"assets/rdc-court2.051d22cec3.webp","daintree":"assets/rdc-daintree.8d6c5b89ba.webp","glasshouse":"assets/rdc-glasshouse.4100f7ac57.webp","hall":"assets/rdc-hall.4169ad6048.webp","hole":"assets/rdc-hole.184459dbb2.webp","ignite":"assets/rdc-ignite.364c4d1570.webp","jacaranda":"assets/rdc-jacaranda.7cc3201164.webp","moreton":"assets/rdc-moreton.39f925aea2.webp","outback":"assets/rdc-outback.c1ac889dd3.webp","race":"assets/rdc-race.456a3c77dd.webp","school":"assets/rdc-school.25271dd261.webp","whitsundays":"assets/rdc-whitsundays.d6f3d2661e.webp"};window.CC_RD_HERO={"glasshouse":"assets/pano-glasshouse.dc405e0bf1.webp","race":"../assets/pano-race.94fe5f5152.webp","school":"assets/rdh-school.a363d8a3aa.webp","whitsundays":"../assets/pano-whitsundays.0f71faad13.webp"};window.CC_RD_IMG={"garden":"../assets/ixa-garden-m.11acc006eb.webp","rabbit":"../assets/bfx-cmrabbit.e554a700b9.webp","cat":"../assets/spr-guest-caterpillar.4c404a9baa.webp","key":"assets/rd-key.8f0593e5f5.webp"};window.CC_RD_FACTS={"hole":{"stages":6,"scenarios":6}};
/* ===== Wonderland redesign, phases 1 to 4 (20 November 2026, Charlie): one navigation for the whole site =====
   Seven sections across the top (six in the garden, which has no Governance), a search field, a breadcrumb on every page,
   the parts of each page as chips, a phone menu, a New here? corner for the welcome and the tours, a compact footer and a
   Sources page. Nothing opens by itself: the welcome, the tour, the side chooser, the side introduction and the School's
   set-up all wait to be asked for. The addresses are in rd0.js. This runs after the page's own code. */
(function(){
if(!window.CC_RD||!window.CC_RD_RT)return;
const R=document.documentElement,$=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const RT=window.CC_RD_RT,parse=window.ccRdParse,routeOf=window.ccRdRouteOf,chOf=window.ccRdCh;
const gar=()=>R.classList.contains('ccgarden'),side=()=>gar()?'garden':'glass';
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const TT=()=>typeof TABS!=='undefined'&&Array.isArray(TABS)?TABS:[];
const tab=id=>TT().find(t=>t.id===id)||null;
const ico=n=>{try{return typeof icon==='function'?icon(n):''}catch(e){return ''}};
const small=()=>R.classList.contains('rdf4');
const curTab=()=>R.dataset.tab||'';
const later=(f,ms)=>setTimeout(f,ms||0);
const SV={
 search:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 15.5L21 21" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
 menu:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
 caret:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 close:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>'};

/* ---------- 1. the sections ---------- */
const SEC=[
 {k:'this-week',lab:'This Week',ic:'watch',items:['this-week','this-week/key-dates','this-week/ignite'],
  d:'What is new this fortnight, the key dates and the Ignite Special Edition.',dg:'The Pocket Watch Edition, the key dates and what changed at Ignite.'},
 {k:'roadmap',lab:'Roadmap',ic:'bottle',items:['roadmap','roadmap/horizon'],
  d:'The roadmap explorer and what is on the horizon.',dg:'What is coming to the apps you use.'},
 {k:'ai-and-copilot',lab:'AI & Copilot',ic:'thimble',items:['ai-and-copilot','ai-and-copilot/caucus-race','ai-and-copilot/live-flowers','ai-and-copilot/questions'],
  d:'What is new by topic, which door to use, use cases, technical guidance and the Caucus Race.',dg:'Stories of people using AI at work, and the questions people ask.'},
 {k:'governance',lab:'Governance',ic:'crown',glass:1,items:['governance','governance/playbooks','governance/templates','governance/how-we-decide'],
  d:'The Queen\u2019s Court: royal decrees, playbooks, templates and how we decide.'},
 {k:'wonderland',lab:'Explore Wonderland',short:'Wonderland',ic:'hole',keep:1,items:['wonderland','wonderland/tea-party','wonderland/caterpillar','wonderland/rabbit-hole','wonderland/hall-of-doors'],
  d:'Four interactive stories: the Tea Party, the Caterpillar, the Rabbit Hole and the Hall of Doors.',dg:'Four interactive stories, through the looking-glass: the Tea Party, the Caterpillar, the Rabbit Hole and the Hall of Doors.'},
 {k:'learning',lab:'Learning & Resources',short:'Learning',ic:'turtle',keep:1,items:['learning','learning/school','sources'],
  d:'The School, the Dodo\u2019s dictionary, past issues and every source.'},
 {k:'events',lab:'Events',ic:'card',items:['events','this-week/key-dates'],
  d:'Invitations to events, and curious questions for your leaders.',dg:'Events you can join and dates for your diary.'}];
const secs=()=>SEC.filter(s=>!(s.glass&&gar()));
const secD=s=>(gar()&&s.dg)||s.d;
const secOf=k=>(RT[k]||{}).s||'';
const avail=k=>{const r=RT[k];if(!r)return false;if(r.v)return true;return chOf(k)!==null};
/* a page's name, words and icon, from the side where it lives */
function info(k){const r=RT[k]||{};if(r.v)return {lab:r.t,d:'',ic:''};const c=chOf(k);
 if(c){const t=tab(c)||{};return {lab:t.lab||r.t,d:t.d||'',ic:t.ic||''}}
 if(r.g){const t=tab(r.g)||{},o=t._o||t;return {lab:o.lab||r.t,d:o.d||'',ic:o.ic||''}}
 const g=(window.GTABS||{})[r.n]||{};return {lab:g.lab||r.t,d:g.d||'',ic:g.ic||''}}
function mlab(k){const r=RT[k];if(!r)return '';if(r.v)return r.t;
 if(k===''||r.s===k){if(!gar()&&r.m)return r.m;return info(k).lab||r.t}return r.t}
function msub(k){const r=RT[k];if(!r||r.v||r.sub)return '';const l=info(k).lab;return l&&l!==mlab(k)?l:''}
const VD={'ai-and-copilot':['What is new in Microsoft AI and Copilot, by topic: the updates, which door to use, use cases, technical guidance and what governments are doing.','Stories of people using AI at work, the questions people ask, and which Copilot fits the job.'],
 'wonderland':['Four interactive stories that explain how Microsoft AI works: who sits at the table, how adoption grows, where your data goes and how AI is paid for.','Four interactive stories that explain how Microsoft AI works. They are through the looking-glass: step through to explore them, and come back any time.'],
 'learning':['The learning library: every lesson, School room, playbook, template, class and reference, by topic and goal.','The learning library: your lessons, School rooms, classes and references, by topic and goal.'],
 'sources':['Every public source this issue draws on.','Every public source this issue draws on.']};
const vd=k=>{const v=VD[k];return v?(gar()?v[1]:v[0]):''};
/* each section's items on this side, without two that land in the same place */
function itemsOf(s){const seen=new Set(),out=[];s.items.forEach(k=>{if(!RT[k])return;if(!avail(k)&&!s.keep)return;
 const key=RT[k].v?k:(chOf(k)||RT[k].g)+'|'+(RT[k].sub||'')+(RT[k].a||'');if(seen.has(key))return;seen.add(key);out.push(k)});return out}

/* ---------- 2. the pictures: each page's own banner painting, in a card-sized copy (CC_RD_ART) ---------- */
const ART=window.CC_RD_ART||{};
const SCN={overview:'clockmaker',watch:'moreton',drink:'whitsundays',race:'race',journey:'daintree',party:'jacaranda',hole:'hole',glass:'hall',school:'school',court:'court2',cheshire:'outback',alice:'alice',ignite:'ignite'};
function sceneOf(c){if(SCN[c])return SCN[c];const im=$('#p-'+c+' .pbanner img.pbfull');if(!im)return '';const k=im.dataset.k;if(k)return k;
 const m=/pano-([a-z0-9]+)\./.exec(im.getAttribute('src')||'');return m?m[1]:''}
const artOf=key=>ART[key]||((window.SCENES||{})[key])||'';
const heroOf=key=>(window.CC_RD_HERO||{})[key]||((window.SCENES||{})[key])||artOf(key);

/* ---------- 3. the header: sections, search, New here?, the phone menu ---------- */
const nav=$('#nav'),wrap=$('#nav .wrap'),ct=$('#ctools'),panels=$('#panels'),foot=$('footer.foot');
if(!nav||!wrap||!panels)return;
R.classList.add('rd');
const brand=$('#brandBtn');if(brand){brand.setAttribute('aria-label','Curiouser and Curiouser, home');brand.title='Home'}
const rn=document.createElement('nav');rn.id='rdnav';rn.className='rdnav';rn.setAttribute('aria-label','Sections');wrap.insertBefore(rn,ct||null);
const sf=document.createElement('form');sf.id='rdsearch';sf.className='rdsearch';sf.setAttribute('role','search');sf.setAttribute('autocomplete','off');
sf.innerHTML=`<label class="rdvh" for="rdq">Search Curiouser and Curiouser</label><span class="rdsi">${SV.search}</span><input id="rdq" type="search" placeholder="Search this issue" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="rdres"><kbd aria-hidden="true">/</kbd><div id="rdres" class="rdres" role="listbox" aria-label="Search results" hidden></div>`;
document.body.appendChild(sf);
const sb=document.createElement('button');sb.type='button';sb.id='rdsrchb';sb.className='rdsrchb rdib';sb.setAttribute('aria-label','Search');sb.setAttribute('aria-expanded','false');sb.innerHTML=SV.search;wrap.insertBefore(sb,ct||null);
const nb=document.createElement('button');nb.type='button';nb.id='rdnew';nb.className='rdnew';nb.setAttribute('aria-haspopup','dialog');nb.setAttribute('aria-expanded','false');nb.innerHTML=`<span class="rdnic" aria-hidden="true">${ico('cater')}</span>Take a tour<span class="rdcar" aria-hidden="true">${SV.caret}</span>`;nb.setAttribute('aria-label','Take a tour: the tour, the welcome and other ways in');wrap.insertBefore(nb,ct||null);
const mb=document.createElement('button');mb.type='button';mb.id='rdmenub';mb.className='rdmenub';mb.setAttribute('aria-expanded','false');mb.setAttribute('aria-controls','rdmenu');mb.innerHTML=`${SV.menu}<span>Menu</span>`;wrap.appendChild(mb);
const mp=document.createElement('div');mp.id='rdmenu';mp.className='rdmenu';mp.setAttribute('role','dialog');mp.setAttribute('aria-modal','true');mp.setAttribute('aria-label','Menu');mp.hidden=true;document.body.appendChild(mp);
const np=document.createElement('div');np.id='rdnewpop';np.className='rdpop rdnewpop';np.setAttribute('role','dialog');np.setAttribute('aria-label','New here?');np.hidden=true;document.body.appendChild(np);

function newHTML(){const w=!window.CC_PHONE&&typeof window.ccIntroPlay==='function';
 return `<p class="rdpd">What\u2019s new in Microsoft AI, and what it means for Queensland public sector agencies. Explore at your own pace: nothing opens unless you ask.</p><ul class="rdacts">
 <li><button type="button" data-rdx="tour"><b>Take the tour</b><small>A short walk around the site and the tools that make it yours</small></button></li>
 <li><button type="button" data-rdx="page"><b>Show me this page</b><small>The useful parts of the page you are on</small></button></li>
 ${w?'<li><button type="button" data-rdx="welcome"><b>Play the welcome</b><small>Follow the White Rabbit down the hole</small></button></li>':''}
 <li><button type="button" data-rdx="side"><b>Choose your side</b><small>The garden, or through the looking-glass</small></button></li>
 <li><button type="button" data-rdx="intro"><b>About this side</b><small>What ${gar()?'the garden':'the looking-glass side'} is for</small></button></li></ul>`}
function doX(x){closeAll();
 if(x==='tour'&&window.ccTour)window.ccTour.start();
 else if(x==='page'&&window.ccTour){if(R.classList.contains('rdv'))window.ccTour.start();else window.ccTour.page()}
 else if(x==='welcome'&&window.ccIntroPlay)window.ccIntroPlay();
 else if(x==='side'&&window.ccTray)window.ccTray();
 else if(x==='intro'&&window.ccSideIntro)window.ccSideIntro()}

function drawNav(){R.classList.remove('rdf1','rdf2','rdf3','rdf4');
 rn.innerHTML='<ul class="rdl1">'+secs().map(s=>{const its=itemsOf(s);
  return `<li class="rdi${its.length>1?' hasdd':''}${s.short?' hasshort':''}" data-sec="${s.k}"><a class="rda" href="#/${s.k}"><span class="rdic" aria-hidden="true">${ico(s.ic)}</span><span class="rdtl">${esc(s.lab)}</span>${s.short?`<span class="rdts" aria-hidden="true">${esc(s.short)}</span>`:''}<span class="rdb l" hidden></span><span class="rdb s" hidden></span></a>${its.length>1?`<button type="button" class="rddd" aria-expanded="false" aria-controls="rddd-${s.k}" aria-label="${esc(s.lab)} pages">${SV.caret}</button><div class="rdpop rddrop" id="rddd-${s.k}" hidden><p class="rdpd">${esc(secD(s))}</p><ul>${its.map(k=>itemHTML(k)).join('')}</ul></div>`:''}</li>`}).join('')+'</ul>';
 mp.innerHTML=`<div class="rdmh"><b>Where would you like to go?</b><button type="button" class="rdib" data-rdclose aria-label="Close the menu">${SV.close}</button></div><a class="rdmhome" href="#/">Home</a>`+secs().map(s=>`<section class="rdmg"><h3><a href="#/${s.k}"><span class="rdic" aria-hidden="true">${ico(s.ic)}</span>${esc(s.lab)}</a></h3><ul>${itemsOf(s).filter(k=>k!==s.k).map(k=>itemHTML(k,1)).join('')}</ul></section>`).join('')+`<div class="rdmx"><button type="button" class="rdbtn" data-rdx="tour">Take the tour</button><button type="button" class="rdbtn" data-rdx="side">Choose your side</button><button type="button" class="rdbtn" data-rdx="intro">About this side</button></div>`;
 drawFoot();navOn(cur);badges();fitBar()}
function itemHTML(k,m){const ok=avail(k),r=RT[k],sub=msub(k);
 const lb=r.v&&RT[k].s===k?'Overview':mlab(k);
 const d=m||(r.v&&r.s===k)?'':(r.v?vd(k):info(k).d);
 return `<li><a href="#/${k}"${ok?'':' class="rdother"'}><b>${esc(lb)}</b>${sub&&!m?`<span class="rdsub">${esc(sub)}</span>`:''}${d?`<small>${esc(d)}</small>`:''}${ok?'':`<span class="rdmk">${gar()?'Through the looking-glass':'In the garden'}</span>`}</a></li>`}

/* drop-downs: hover with a mouse, the caret or the down arrow from the keyboard */
let ddT=0;
function openDD(li,focus){if(!li)return;const p=$('.rddrop',li),b=$('.rddd',li);if(!p)return;$$('.rdi.open',rn).forEach(x=>{if(x!==li)closeDD(x)});li.classList.add('open');p.hidden=false;p.style.transform='';{const r=p.getBoundingClientRect();let dx=0;if(r.left<10)dx=10-r.left;else if(r.right>innerWidth-10)dx=innerWidth-10-r.right;if(dx)p.style.transform=`translateX(calc(-50% + ${Math.round(dx)}px))`}if(b)b.setAttribute('aria-expanded','true');if(focus){const a=$('a',p);if(a)a.focus()}}
function closeDD(li){if(!li)return;const p=$('.rddrop',li),b=$('.rddd',li);li.classList.remove('open');if(p)p.hidden=true;if(b)b.setAttribute('aria-expanded','false')}
rn.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const li=e.target.closest('.rdi.hasdd');if(!li)return;clearTimeout(ddT);if(!li.classList.contains('open'))ddT=setTimeout(()=>openDD(li),110)});
rn.addEventListener('pointerout',e=>{if(e.pointerType!=='mouse')return;const li=e.target.closest('.rdi');if(!li||li.contains(e.relatedTarget))return;clearTimeout(ddT);ddT=setTimeout(()=>closeDD(li),260)});
rn.addEventListener('click',e=>{const b=e.target.closest('.rddd');if(b){e.preventDefault();const li=b.closest('.rdi');li.classList.contains('open')?closeDD(li):openDD(li,false)}});
rn.addEventListener('keydown',e=>{const li=e.target.closest('.rdi');if(!li)return;
 if(e.key==='ArrowDown'){e.preventDefault();if(!li.classList.contains('open'))openDD(li,true);else{const L=$$('.rddrop a',li),i=L.indexOf(document.activeElement);(L[i+1]||L[0]).focus()}}
 else if(e.key==='ArrowUp'&&li.classList.contains('open')){e.preventDefault();const L=$$('.rddrop a',li),i=L.indexOf(document.activeElement);(L[i-1]||L[L.length-1]).focus()}
 else if(e.key==='Escape'&&li.classList.contains('open')){closeDD(li);$('.rda',li).focus()}});
rn.addEventListener('focusout',e=>{const li=e.target.closest('.rdi');if(li&&!li.contains(e.relatedTarget))closeDD(li)});

function openMenu(){mp.hidden=false;mb.setAttribute('aria-expanded','true');document.body.classList.add('rdlock');const a=$('a,button',mp);if(a)a.focus()}
function closeMenu(back){if(mp.hidden)return;mp.hidden=true;mb.setAttribute('aria-expanded','false');document.body.classList.remove('rdlock');if(back)mb.focus()}
mb.addEventListener('click',()=>mp.hidden?openMenu():closeMenu(true));
mp.addEventListener('click',e=>{if(e.target.closest('[data-rdclose]'))closeMenu(true)});
mp.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu(true);return}if(e.key!=='Tab')return;const F=$$('a,button',mp).filter(x=>x.offsetParent);if(!F.length)return;
 if(e.shiftKey&&document.activeElement===F[0]){e.preventDefault();F[F.length-1].focus()}else if(!e.shiftKey&&document.activeElement===F[F.length-1]){e.preventDefault();F[0].focus()}});
function placeNew(){const r=nb.getBoundingClientRect();np.style.top=Math.round(r.bottom+8)+'px';np.style.right=Math.max(10,Math.round(innerWidth-r.right))+'px'}
nb.addEventListener('click',()=>{if(!np.hidden){closeNew(true);return}np.innerHTML=newHTML();np.hidden=false;nb.setAttribute('aria-expanded','true');placeNew();const b=$('button',np);if(b)b.focus()});
function closeNew(back){if(np.hidden)return;np.hidden=true;nb.setAttribute('aria-expanded','false');if(back)nb.focus()}
np.addEventListener('keydown',e=>{if(e.key==='Escape')closeNew(true)});
document.addEventListener('click',e=>{const x=e.target.closest('[data-rdx]');if(x){e.preventDefault();doX(x.dataset.rdx);return}
 if(!np.hidden&&!np.contains(e.target)&&e.target!==nb)closeNew(false);
 if(!e.target.closest('.rdi'))$$('.rdi.open',rn).forEach(closeDD);
 if(!e.target.closest('#rdsearch')&&!e.target.closest('#rdsrchb')&&!e.target.closest('#rdres'))closeSearch(false)});
function closeAll(){$$('.rdi.open',rn).forEach(closeDD);closeMenu(false);closeNew(false);closeSearch(false)}

/* the bar always fits: if the sections do not fit beside the title and the tools, the title's words go first, then the
   longer section names shorten, then the tour button keeps only its picture, and only then do the sections move into Menu.
   Measured on the reader's own screen and fonts, so nothing ever overlaps */
const FIT=['rdf1','rdf2','rdf3','rdf4'];
function overNow(){if(R.classList.contains('rdf4'))return false;const ul=$('.rdl1',rn);if(!ul)return false;
 const a=ul.getBoundingClientRect(),b=rn.getBoundingClientRect();if(a.width>b.width+1)return true;
 const bb=brand?brand.getBoundingClientRect():null,nx=[sb,nb,ct].map(x=>x&&x.getBoundingClientRect()).filter(x=>x&&x.width);
 if(bb&&a.left<bb.right-1)return true;if(nx.some(x=>a.right>x.left+1&&x.left>a.left))return true;return wrap.scrollWidth>wrap.clientWidth+1}
let fitting=false;
function fitBar(){if(fitting)return;fitting=true;try{FIT.forEach(c=>R.classList.remove(c));
 if(window.CC_PHONE||innerWidth<=760){R.classList.add('rdf4')}else{let i=0;while(i<FIT.length&&overNow()){R.classList.add(FIT[i]);i++}}
 if(!small())closeMenu(false);navH()}finally{fitting=false}}
/* the brand takes you home */
document.addEventListener('click',e=>{if(!e.target.closest('#brandBtn'))return;e.preventDefault();e.stopImmediatePropagation();go('',{});},true);

/* ---------- 4. the top of every page: breadcrumb and the parts of the page ---------- */
const top=document.createElement('div');top.id='rdtop';top.className='rdtop';top.tabIndex=-1;
top.innerHTML='<h1 class="rdvh" id="rdh1t" tabindex="-1"></h1><div class="rdtopl"><nav class="rdcrumb" aria-label="Breadcrumb"><ol></ol></nav><span class="rded"></span></div><div class="rdtop2" hidden><nav class="rdstabs" aria-label="Pages in this section"></nav><div class="rdotw" hidden><button type="button" class="rdotb" aria-expanded="false" aria-controls="rdotpop">On this page<span class="rdcar" aria-hidden="true">'+SV.caret+'</span></button><div class="rdpop rdotpop" id="rdotpop" hidden><ul></ul></div></div></div>';
{const is=$('#brandBtn .iss');$('.rded',top).textContent=is?is.textContent.trim():''}
panels.insertBefore(top,panels.firstChild);
const vp=document.createElement('div');vp.id='rdpage';vp.className='rdpage';vp.hidden=true;panels.insertBefore(vp,top.nextSibling);
function crumbs(k){const ol=$('.rdcrumb ol',top),r=RT[k]||{};top.classList.toggle('rdhome',!k);if(!k){ol.innerHTML='';return}
 const S=SEC.find(s=>s.k===r.s),L=[['','Home']];if(S&&k!==S.k&&!(S.glass&&gar()))L.push([S.k,S.lab]);
 ol.innerHTML=L.map(([kk,l])=>`<li><a href="#/${kk}">${esc(l)}</a></li>`).join('')+`<li><span aria-current="page">${esc(S&&k===S.k?S.lab:(mlab(k)||r.t))}</span></li>`}
/* the section's own pages, as tabs (the Queen's Court keeps its own) */
function tabsRow(k){const el=$('.rdstabs',top),r=RT[k]||{},S=SEC.find(s=>s.k===r.s);let h='';
 if(k&&S&&!(S.glass&&gar())&&S.k!=='governance'){const its=itemsOf(S);if(its.length>1)h=its.map(x=>{const on=x===k,rt=RT[x]||{};const lb=x===S.k?(rt.v?'Overview':S.lab):(rt.v?rt.t:mlab(x));return `<a href="#/${x}" class="rdstab${on?' on':''}${avail(x)?'':' rdother'}"${on?' aria-current="page"':''}>${esc(lb)}</a>`}).join('')}
 el.innerHTML=h;el.hidden=!h;return !!h}
/* On this page: the useful parts of the page, in a small list (This Week and the Roadmap gather several chapters) */
const VIEWP={week:[['The headline five','#p-drink > .hl5wrap'],['What has changed','#ccchanged'],['The Duchess\u2019s briefing','#agbrief'],['What needs your agency','#aclsum'],['Every update','#p-drink > .phead'],['The Spotlight','#spot'],['Coming up','#p-overview > .landing2']],
 roadmap:[['The Curiosity Meter','#p-overview > .phead'],['Every roadmap item','#rmall']]};
let OTP=[];
function partsBtn(k,c,virt){const w=$('.rdotw',top),ul=$('#rdotpop ul');OTP=[];const r=RT[k]||{};
 if(!virt&&c){if(r.view&&VIEWP[r.view]&&!gar())OTP=VIEWP[r.view].map(([lab,sel])=>({lab,sel})).filter(x=>{try{return !!document.querySelector(x.sel)}catch(e){return false}});
  else if(!r.view&&!/^(court|school)$/.test(c)&&window.ccWay&&window.ccWay.parts)OTP=(window.ccWay.parts(c)||[]).filter(x=>!x.side||x.side===side()).map(x=>({lab:x.lab,to:x.to}))}
 if(OTP.length<2)OTP=[];ul.innerHTML=OTP.map((x,i)=>`<li><button type="button" data-rdpart="${i}">${esc(x.lab)}</button></li>`).join('');w.hidden=!OTP.length;closeOtp();return !!OTP.length}
const otb=$('.rdotb',top),otp=$('#rdotpop');
function closeOtp(){otp.hidden=true;otb.setAttribute('aria-expanded','false')}
otb.addEventListener('click',()=>{if(!otp.hidden){closeOtp();return}otp.hidden=false;otb.setAttribute('aria-expanded','true');const b=$('button',otp);if(b)b.focus()});
otp.addEventListener('keydown',e=>{if(e.key==='Escape'){closeOtp();otb.focus()}});
top.addEventListener('click',e=>{const b=e.target.closest('[data-rdpart]');if(!b)return;const x=OTP[+b.dataset.rdpart];closeOtp();if(!x)return;if(x.sel)jump(x.sel);else if(x.to&&window.ccGo)window.ccGo(x.to)});
document.addEventListener('click',e=>{if(!otp.hidden&&!e.target.closest('.rdotw'))closeOtp()});
function navOn(k){const s=secOf(k);$$('.rdi',rn).forEach(li=>{const on=li.dataset.sec===s;li.classList.toggle('on',on);const a=$('.rda',li);if(on)a.setAttribute('aria-current',k===s?'page':'true');else a.removeAttribute('aria-current')});
 $$('#rdmenu a').forEach(a=>{const h=(a.getAttribute('href')||'').slice(2);a.classList.toggle('on',h===k);if(h===k)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}
const T0=document.title.replace(/^.*?\|\s*/,'');
function title(k){document.title=k?`${mlab(k)||RT[k].t} | Curiouser and Curiouser`:`Curiouser and Curiouser | ${T0}`}

/* ---------- 5. pages drawn here: a section's front page, the other side's door and the sources ---------- */
function cardHTML(k,o){o=o||{};const r=RT[k],ok=avail(k),inf=info(k),c=chOf(k)||r.g||r.n,img=artOf(sceneOf(c));
 return `<a class="rdcard${ok?'':' rdother'}" href="#/${k}">${img?`<span class="rdart"><img src="${esc(img)}" alt="" loading="lazy" decoding="async"></span>`:`<span class="rdart rdnoart" aria-hidden="true">${ico(inf.ic||'card')}</span>`}<span class="rdcb"><b class="rdct">${esc(mlab(k)||r.t)}</b>${msub(k)?`<span class="rdcs">${esc(msub(k))}</span>`:''}<span class="rdcd">${esc(inf.d)}</span>${ok?'':`<span class="rdtag">${gar()?'Through the looking-glass':'In the garden'}</span>`}<span class="rdgo">${esc(o.go||'Open')} <span aria-hidden="true">\u2192</span></span></span></a>`}
function toolHTML(a,t,d,ic){return `<button type="button" class="rdcard rdtool" data-rdact="${a}"><span class="rdart rdnoart" aria-hidden="true">${ico(ic)}</span><span class="rdcb"><b class="rdct">${esc(t)}</b><span class="rdcd">${esc(d)}</span><span class="rdgo">Open <span aria-hidden="true">\u2192</span></span></span></button>`}
const HERO={'ai-and-copilot':'race','wonderland':'glasshouse','learning':'school'};
const GOW={'wonderland/tea-party':'Join the tea party','wonderland/caterpillar':'Follow the Caterpillar','wonderland/rabbit-hole':'Down the rabbit hole','wonderland/hall-of-doors':'Open the doors'};
function indexHTML(k){const S=SEC.find(s=>s.k===k)||{items:[]},its=itemsOf(S).filter(x=>x!==k&&x!=='sources'),h=heroOf(HERO[k]||'');
 let more='';
 if(k==='ai-and-copilot'){const rel=(gar()?['this-week/ignite']:['this-week/ignite','this-week','roadmap/horizon']).filter(avail);
  if(rel.length)more=`<h2 class="rdh2">Also worth a look</h2><div class="rdgrid">${rel.map(x=>cardHTML(x)).join('')}</div>`}
 if(k==='learning')more=`<h2 class="rdh2">Look it up</h2><div class="rdgrid">${toolHTML('dict','The Dodo\u2019s dictionary','Curious words, explained in plain English.','scroll')}${toolHTML('past','Past issues','Every earlier issue of Curiouser and Curiouser.','card')}${gar()?'':toolHTML('brief','One-page briefing','This issue on one page, to print or save as a PDF.','scroll')}${cardHTML('sources',{})}</div>`;
 return `<section class="rdidx" aria-labelledby="rdh1"><header class="rdhero">${h?`<div class="rdhero-art"><img src="${esc(h)}" alt="" decoding="async"></div>`:''}<div class="rdhero-t"><p class="rdkick"><span aria-hidden="true">${ico(S.ic)}</span>Section</p><h1 id="rdh1" tabindex="-1">${esc(S.lab)}</h1><p>${esc(vd(k)||secD(S))}</p></div></header>
 <div class="rdgrid${k==='wonderland'?' rd4':''}">${its.map(x=>cardHTML(x,{go:GOW[x]})).join('')}</div>${more}</section>`}
function doorHTML(k){const r=RT[k],inf=info(k),toG=!gar(),h=heroOf('whitsundays');
 return `<section class="rdidx rddoor" aria-labelledby="rdh1"><header class="rdhero">${h?`<div class="rdhero-art"><img src="${esc(h)}" alt="" decoding="async"></div>`:''}<div class="rdhero-t"><p class="rdkick">${toG?'In the garden':'Through the looking-glass'}</p><h1 id="rdh1" tabindex="-1">${esc(r.t)}</h1><p>${esc(inf.d)}</p>
 <p>${toG?'This page is in the garden, the side of the site written for people who use AI at work.':'This page is through the looking-glass, the side of the site written for the teams who deploy and govern AI.'} Step across to read it. You can come back at any time.</p>
 <p class="rdbtns"><button type="button" class="rdbtn p" data-rdside="${toG?'garden':'glass'}">${toG?'Step into the garden':'Step through the looking-glass'}</button><a class="rdbtn" href="#/">Back to Home</a></p></div></header></section>`}
let srcMoved=false;
function sourcesHTML(){return `<section class="rdidx rdsrc" aria-labelledby="rdh1"><header class="rdph"><p class="rdkick">Learning &amp; Resources</p><h1 id="rdh1" tabindex="-1">Sources</h1><p>${esc(vd('sources'))} Every item in the issue also links to its own source.</p></header><div id="rdsrcslot"></div></section>`}
function clearV(){const g=$('#srcgrid'),pk=$('#rdpark');if(g&&pk&&vp.contains(g))pk.appendChild(g);vp.innerHTML=''}
function drawV(k){const r=RT[k]||{},K=window.ccRdKit||{},V=r.v&&K.views&&K.views[r.v];clearV();
 vp.innerHTML=V?V.html(k):r.v==='index'?indexHTML(k):r.v==='sources'?sourcesHTML():doorHTML(k);
 if(V&&V.after)try{V.after(k,vp)}catch(e){}
 if(r.v==='sources'){const g=$('#srcgrid');if(g){$('#rdsrcslot').appendChild(g);srcMoved=true}}}
vp.addEventListener('click',e=>{const s=e.target.closest('[data-rdside]');if(s&&window.ccSetSide){window.ccSetSide(s.dataset.rdside,{how:'nav'});return}
 const a=e.target.closest('[data-rdact]');if(a&&window.ccGo){e.preventDefault();e.stopPropagation();const x=a.dataset.rdact;setTimeout(()=>window.ccGo('act:'+x),40)}});

/* the end of every page: the other pages in its section, or for a Wonderland story the other three and the way back */
const end=document.createElement('nav');end.id='rdend';end.className='rdend';end.setAttribute('aria-label','Keep exploring');end.hidden=true;
panels.insertBefore(end,$('#pnav',panels)||null);
const WL=['wonderland/tea-party','wonderland/caterpillar','wonderland/rabbit-hole','wonderland/hall-of-doors'];
function endBlock(k,virt){const r=RT[k]||{};let h='';
 if(k&&!virt){if(r.xp)h=`<h2 class="rdh2">Keep exploring Wonderland</h2><div class="rdgrid rd3">${WL.filter(x=>x!==k).map(x=>cardHTML(x,{go:GOW[x]})).join('')}</div><p class="rdend-back"><a class="rdbtn" href="#/wonderland"><span aria-hidden="true">\u2190</span> Back to Explore Wonderland</a></p>`;
  else{const S=SEC.find(s=>s.k===r.s);if(S&&!(S.glass&&gar())){const sib=itemsOf(S).filter(x=>x!==k);if(sib.length)h=`<h2 class="rdend-h">More in ${esc(S.lab)}</h2><div class="rdend-links">${sib.map(x=>{const rt=RT[x]||{},lb=x===S.k?(rt.v?S.lab+' overview':S.lab):(rt.v?rt.t:mlab(x)),d=rt.v?vd(x):info(x).d;return `<a href="#/${x}"${avail(x)?'':' class="rdother"'}><b>${esc(lb)}</b>${d?`<small>${esc(d)}</small>`:''}</a>`}).join('')}</div>`}}}
 if(h)h+=`<p class="rdend-top"><button type="button" class="rdlink" data-rdtotop>Back to top <span aria-hidden="true">\u2191</span></button></p>`;
 end.innerHTML=h;end.hidden=!h}
end.addEventListener('click',e=>{if(e.target.closest('[data-rdtotop]'))window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches||R.classList.contains('calm')?'instant':'smooth'})});

/* ---------- 6. the footer: the sections, the maker's plaque, and the sources on their own page ---------- */
const fn=document.createElement('nav');fn.className='rdfoot';fn.setAttribute('aria-label','Site');
function drawFoot(){if(!foot)return;fn.innerHTML=`<a href="#/">Home</a>${secs().map(s=>`<a href="#/${s.k}">${esc(s.lab)}</a>`).join('')}<a href="#/sources">Sources for this issue</a>`}
if(foot){foot.insertBefore(fn,foot.firstChild);const h3=foot.querySelector(':scope > h3');if(h3&&h3.nextElementSibling&&h3.nextElementSibling.id==='srcgrid')h3.classList.add('rdgone');
 /* At a glance's plaque (who made this, and About this experience) now lives at the foot of every page, kept as it is */
 const pv=$('#ccprov');if(pv){const box=document.createElement('div');box.className='rdfprov';box.appendChild(pv);foot.insertBefore(box,fn.nextSibling)}}
/* the sources move to their own page; until it is opened they wait out of sight */
{const g=$('#srcgrid');if(g&&foot){const park=document.createElement('div');park.id='rdpark';park.hidden=true;document.body.appendChild(park);park.appendChild(g)}}

/* ---------- 7. the router ---------- */
let cur=null,busy=0,ready=false;
function saveY(){try{history.replaceState(Object.assign({},history.state||{},{y:Math.round(scrollY)}),'')}catch(e){}}
function go(k,o){o=o||{};if(!RT.hasOwnProperty(k))k='';saveY();const h='#/'+k;
 if(location.hash!==h){try{history.pushState({rd:k},'',h)}catch(e){}}render(k,o)}
function render(k,o){o=o||{};const r=RT[k]||RT[''],c=chOf(k),virt=!!r.v||c===null,K=window.ccRdKit||{};
 const pv=R.dataset.rdv||'',pt=curTab();cur=k;closeAll();
 R.classList.toggle('rdv',virt);R.dataset.rdv=virt?'':(r.view||'');R.classList.toggle('rdxp',!!r.xp&&!virt);
 if(virt){vp.hidden=false;drawV(k)}
 else{const V=r.view&&K.views&&K.views[r.view];clearV();if(V){vp.innerHTML=V.html(k)||'';vp.hidden=!vp.innerHTML;if(V.after)try{V.after(k,vp)}catch(e){}}else vp.hidden=true;
  busy++;window.CC_RD_NOBK=1;try{
  if(r.sub&&!r.root&&window.ccGo)window.ccGo('court|'+r.sub);
  else{if(pt!==c&&window.ccShowTab)window.ccShowTab(c);
   /* two pages that share a chapter (Home and the Roadmap): the picture lands afresh, or stays hidden on Home */
   else if(pv!==R.dataset.rdv&&window.ccBanLand)window.ccBanLand(c);
   if(r.root&&r.sub&&window.ccAgency&&window.ccAgency.cSub&&window.ccAgency.cSub()!==r.sub)window.ccAgency.setCSub(r.sub,false);
   if(r.a&&o.y==null&&window.ccGo)window.ccGo(c+'#'+r.a.slice(1))}}catch(e){}finally{busy--;window.CC_RD_NOBK=0}
  if(r.view==='week')$$('#p-overview .reveal').forEach(x=>x.classList.add('in'))}
 if(K.frame)try{K.frame(k,c,virt)}catch(e){}
 crumbs(k);navOn(k);{const a=tabsRow(k),b=partsBtn(k,c,virt);$('.rdtop2',top).hidden=!(a||b)}endBlock(k,virt);title(k);
 $('#rdh1t').textContent=virt||!k?'':(mlab(k)||r.t);
 if(o.initial){if(o.x)later(()=>jump(o.x),700);return}
 if(o.hook)return;
 if(o.y!=null){const y=o.y;requestAnimationFrame(()=>window.scrollTo({top:y,behavior:'instant'}));later(()=>window.scrollTo({top:y,behavior:'instant'}),120)}
 else if(o.x)later(()=>jump(o.x),300);
 else if(!(r.sub&&!r.root)&&!r.a)window.scrollTo({top:0,behavior:'instant'});
 try{const f=$('#rdh1',vp)&&!vp.hidden?$('#rdh1',vp):($('#rdh1t').textContent?$('#rdh1t'):top);if(f)f.focus({preventScroll:true})}catch(e){}}
function jump(x){let el=null;try{el=document.querySelector(x)}catch(e){}if(!el)return;if(window.ccLand)window.ccLand(()=>el);else el.scrollIntoView({block:'start'})}
function sync(){const h=location.hash||'';let p=(h===''||h==='#')?{k:''}:parse(h);
 if(!p){const e=window.ccRdElRoute&&window.ccRdElRoute(h);if(!e)return;if(e.k!==cur){try{history.replaceState({rd:e.k},'','#/'+e.k+e.x)}catch(x){}render(e.k,{x:e.x})}return}
 if(p.legacy){try{history.replaceState({rd:p.k},'','#/'+p.k)}catch(e){}render(p.k,{});return}
 if(p.k===cur&&!p.x)return;const st=history.state||{};render(p.k,{y:st.y,x:p.x})}
addEventListener('popstate',sync);addEventListener('hashchange',sync);
/* the page's own buttons and links still change chapters: the address and the menu follow them */
window.ccRdShown=function(id){if(busy||!ready)return;const k=routeOf(id);if(k===null)return;
 if(!R.classList.contains('rdv')&&cur!==null&&chOf(cur)===id)return;
 saveY();try{history.pushState({rd:k},'','#/'+k)}catch(e){}busy++;try{render(k,{hook:1})}finally{busy--}};
window.ccRdGo=(k,o)=>go(k,o||{});
/* the old Back pill (it follows jumps inside a page) names pages as the menu does */
const pgLab=k=>{if(k==='')return 'Home';const S=SEC.find(s=>s.k===k);return S?S.lab:(mlab(k)||(RT[k]||{}).t||'')};
window.ccRdLab=function(id){if(cur!==null&&chOf(cur)===id)return pgLab(cur);const k=routeOf(id);return k===null?'':pgLab(k)};
function ovRoute(el){const b=el&&el.closest('#p-overview > *');if(!b||gar())return '';if(b.matches('#rmall,#kpis,.phead'))return 'roadmap';if(b.matches('#ccprov,.ccact,.pbanner'))return '';return 'this-week'}
document.addEventListener('click',e=>{const j=e.target.closest('[data-jump]');if(!j)return;const el=document.getElementById(j.dataset.jump);if(!el||!el.closest('#p-overview'))return;
 e.preventDefault();e.stopImmediatePropagation();const k=ovRoute(el);if(k===cur){jump('#'+el.id);return}go(k,{x:'#'+el.id})},true);
let yT=0;addEventListener('scroll',()=>{clearTimeout(yT);yT=setTimeout(saveY,400)},{passive:true});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#/"]');if(a){saveY();closeAll()}},true);
/* a change of side redraws the menus, and the page if it belongs to one side only */
addEventListener('cc-side',()=>{drawNav();if(cur!==null)render(cur,{y:scrollY});
 /* stepping into the garden from a School door: open the room that was asked for */
 const sub=window.CC_RD_SCHSUB;window.CC_RD_SCHSUB='';if(sub&&cur==='learning/school'&&gar())later(()=>{if(window.ccGo)window.ccGo('school|'+sub)},500)});

/* ---------- 8. search: pages, parts, updates, dates, decrees, stories, events, roadmap items and the dictionary ---------- */
const q=$('#rdq'),res=$('#rdres');document.body.appendChild(res);let IDX=null,hits=[],act=-1;
function placeSF(){const r=sb.getBoundingClientRect(),w=Math.min(440,innerWidth-24);sf.style.width=w+'px';sf.style.top=Math.round(r.bottom+10)+'px';sf.style.left=Math.round(Math.max(12,Math.min(r.right-w,innerWidth-w-12)))+'px'}
function placeRes(){const r=sf.getBoundingClientRect(),w=Math.min(460,innerWidth-16);res.style.width=w+'px';res.style.top=Math.round(r.bottom+8)+'px';res.style.left=Math.round(Math.max(8,Math.min(r.right-w,innerWidth-w-8)))+'px'}
const norm=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[\u2018\u2019]/g,"'").replace(/[^a-z0-9' ]+/g,' ').replace(/\s+/g,' ').trim();
const secLab=k=>{const S=SEC.find(s=>s.k===secOf(k));return S?S.lab:(k?'':'Home')};
function buildIdx(){const L=[],add=(ty,t,d,g,w)=>{if(!t)return;L.push({ty,t:String(t),d:String(d||''),g,w:w||'',n:norm(t),m:norm(d)})};
 Object.keys(RT).forEach(k=>{if(!avail(k))return;add('Page',k?(mlab(k)||RT[k].t):'Home',RT[k].v?vd(k):info(k).d,{k},secLab(k))});
 TT().forEach(t=>{const k=routeOf(t.id);if(k===null||!avail(k)||chOf(k)!==t.id||!window.ccWay||!window.ccWay.parts)return;
  (window.ccWay.parts(t.id)||[]).forEach(x=>{if(x.side&&x.side!==side())return;if(t.id==='overview'){let sel=String(x.to);sel=sel.indexOf('#')>=0?sel.slice(sel.indexOf('#')+1):'';if(sel&&!/^[#.\[]/.test(sel))sel='#'+sel;let el=null;try{el=sel?document.querySelector(sel.split(',')[0]):null}catch(e){}const kk=ovRoute(el);add('Part',x.lab,'',{k:kk,x:el&&el.id?'#'+el.id:''},mlab(kk)||'Home');return}add('Part',x.lab,'',{k,to:x.to},mlab(k)||t.lab)})});
 const D=(arr,ty,tf,df,k,ch)=>{try{if(!Array.isArray(arr)||chOf(k)!==ch)return;arr.forEach(x=>add(ty,tf(x),df(x),{k,find:tf(x)},mlab(k)))}catch(e){}};
 try{D(TILES,'Update',x=>x.t,x=>x.s,'this-week','drink')}catch(e){}
 try{D(HORIZON,'Horizon',x=>x.t,x=>x.tx,'roadmap/horizon','cheshire')}catch(e){}
 try{D(DECREES,'Decree',x=>x.t,x=>x.tx,'governance','court')}catch(e){}
 try{D(DATES2,'Date',x=>x.lab,x=>x.what,'this-week/key-dates','watch')}catch(e){}
 try{D(EVENTS,'Event',x=>x.t,x=>x.desc,'events','alice')}catch(e){}
 try{D(PS,'Story',x=>x.title,x=>x.summary,'ai-and-copilot/caucus-race','race')}catch(e){}
 try{D(ROADMAP,'Roadmap',x=>x.t,x=>x.d,'roadmap','overview')}catch(e){}
 try{if(Array.isArray(GLOSSARY))GLOSSARY.forEach(g=>add('Word',g.t,g.d||g.m,{dict:g.t},'The Dodo\u2019s dictionary'))}catch(e){}
 IDX=L}
function find(s){const Q=norm(s);if(Q.length<2)return [];const W=Q.split(' ').filter(w=>w.length>1);const out=[];
 for(const x of IDX){let v=0;if(x.n===Q)v=100;else if(x.n.startsWith(Q))v=80;else if(x.n.includes(Q))v=62;else if(W.length&&W.every(w=>x.n.includes(w)))v=48;else if(W.length&&W.every(w=>(x.n+' '+x.m).includes(w)))v=26;else continue;
  v+=({Page:14,Part:7}[x.ty]||0);out.push([v,x])}
 return out.sort((a,b)=>b[0]-a[0]).slice(0,10).map(a=>a[1])}
function hl(t,s){const Q=norm(s);if(!Q)return esc(t);const i=t.toLowerCase().indexOf(String(s).trim().toLowerCase());if(i<0)return esc(t);const n=String(s).trim().length;return esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+n))+'</mark>'+esc(t.slice(i+n))}
function draw(){const s=q.value;if(!IDX)buildIdx();hits=find(s);act=hits.length?0:-1;const v=s.trim();
 if(v.length<2){res.hidden=true;q.setAttribute('aria-expanded','false');return}
 res.innerHTML=(hits.length?hits.map((x,i)=>`<div class="rdr" role="option" id="rdo${i}" aria-selected="${i===act}" data-i="${i}"><span class="rdty">${esc(x.ty)}</span><span class="rdtb"><span class="rdtt">${hl(x.t,v)}</span>${x.w?`<span class="rdtc">${esc(x.w)}</span>`:''}</span></div>`).join(''):`<p class="rdnone">Nothing in this issue matches \u201c${esc(v)}\u201d.</p>`)
  +`<div class="rdr rdask" role="option" id="rdo-ask" aria-selected="${act<0}" data-i="ask"><span class="rdty">Ask Alice</span><span class="rdtb"><span class="rdtt">\u201c${esc(v)}\u201d</span><span class="rdtc">Alice finds her way around the site for you</span></span></div>`;
 if(act<0)act=hits.length;placeRes();res.hidden=false;q.setAttribute('aria-expanded','true');mark()}
function mark(){$$('.rdr',res).forEach((el,i)=>{const on=i===act;el.setAttribute('aria-selected',on?'true':'false');if(on){q.setAttribute('aria-activedescendant',el.id);el.scrollIntoView({block:'nearest'})}})}
function choose(i){const v=q.value.trim();if(i==='ask'||i>=hits.length){closeSearch(false);if(window.ccWay&&window.ccWay.ask)window.ccWay.ask(v);return}
 const x=hits[i];if(!x)return;closeSearch(false);q.blur();const g=x.g;
 if(g.dict){if(window.ccGo)window.ccGo('dict:'+g.dict);return}
 if(g.x){go(g.k,{x:g.x});return}go(g.k,{});if(g.to)later(()=>{if(window.ccGo)window.ccGo(g.to)},160);else if(g.find)later(()=>findOn(g.find,chOf(g.k)),380)}
function findOn(t,c){const p=document.getElementById('p-'+c);if(!p)return;const n=norm(t).slice(0,46);if(!n)return;
 const el=[...p.querySelectorAll('h2,h3,h4,h5,b,strong,button,a,p,span,div')].find(e=>e.childElementCount<5&&norm(e.textContent).includes(n));if(!el)return;
 const card=el.closest('li,article,.tile,.card,.flip')||el;if(window.ccLand)window.ccLand(()=>card);else card.scrollIntoView({block:'center'});
 card.classList.add('rdflash');later(()=>card.classList.remove('rdflash'),2600)}
function closeSearch(blur){res.hidden=true;q.setAttribute('aria-expanded','false');q.removeAttribute('aria-activedescendant');if(R.classList.contains('rdsopen')&&blur!==null&&!sf.contains(document.activeElement)){R.classList.remove('rdsopen');sb.setAttribute('aria-expanded','false')}}
let qT=0;q.addEventListener('input',()=>{clearTimeout(qT);qT=setTimeout(draw,70)});
q.addEventListener('focus',()=>{if(!IDX)buildIdx();if(q.value.trim().length>1)draw()});
q.addEventListener('keydown',e=>{const n=$$('.rdr',res).length;
 if(e.key==='ArrowDown'&&n){e.preventDefault();if(res.hidden)draw();act=(act+1)%n;mark()}
 else if(e.key==='ArrowUp'&&n){e.preventDefault();act=(act-1+n)%n;mark()}
 else if(e.key==='Enter'){e.preventDefault();if(res.hidden)draw();const el=$$('.rdr',res)[act<0?0:act];if(el)choose(el.dataset.i==='ask'?'ask':+el.dataset.i)}
 else if(e.key==='Escape'){if(!res.hidden){e.stopPropagation();closeSearch(false)}else{q.value='';q.blur();R.classList.remove('rdsopen');sb.setAttribute('aria-expanded','false')}}});
sf.addEventListener('submit',e=>e.preventDefault());
res.addEventListener('mousedown',e=>e.preventDefault());
res.addEventListener('click',e=>{const el=e.target.closest('.rdr');if(el)choose(el.dataset.i==='ask'?'ask':+el.dataset.i)});
sb.addEventListener('click',()=>{const on=!R.classList.contains('rdsopen');if(on)placeSF();R.classList.toggle('rdsopen',on);sb.setAttribute('aria-expanded',on?'true':'false');if(on)later(()=>q.focus(),30);else closeSearch(false)});
document.addEventListener('keydown',e=>{if(e.key!=='/'||e.ctrlKey||e.metaKey||e.altKey)return;const t=e.target;if(t&&(t.isContentEditable||/^(input|textarea|select)$/i.test(t.tagName)))return;
 if(document.body.classList.contains('ccmodal'))return;e.preventDefault();placeSF();R.classList.add('rdsopen');sb.setAttribute('aria-expanded','true');q.focus()});
addEventListener('cc-side',()=>{IDX=null});

/* ---------- 9. counts from Who are you? on the sections (mirrored from the old chapter tabs, which stay hidden) ---------- */
function badges(){const L={},S={};$$('#tabs .tab').forEach(t=>{const id=t.dataset.t,k=routeOf(id);if(!id||!k)return;const s=secOf(k);if(!s)return;
 const num=el=>{if(!el||el.hidden||getComputedStyle(el).display==='none')return 0;const n=parseInt((el.textContent||'').replace(/\D+/g,''),10);return isNaN(n)?0:n};
 L[s]=(L[s]||0)+num(t.querySelector('.lbadge'));S[s]=(S[s]||0)+num(t.querySelector('.sbadge'))});
 let ch=false;$$('.rdi',rn).forEach(li=>{const s=li.dataset.sec,a=$('.rdb.l',li),b=$('.rdb.s',li);if(a){const t=String(L[s]||'');if(a.textContent!==t||a.hidden!==!L[s])ch=true;a.hidden=!L[s];a.textContent=t;a.title=L[s]?`${L[s]} for your role`:''}if(b){const t=String(S[s]||'');if(b.textContent!==t||b.hidden!==!S[s])ch=true;b.hidden=!S[s];b.textContent=t;b.title=S[s]?`${S[s]} for your part of the sector`:''}});if(ch)fitBar()}
{const tb=$('#tabs');if(tb){let bT=0;new MutationObserver(()=>{clearTimeout(bT);bT=setTimeout(badges,120)}).observe(tb,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','hidden','style']})}}

/* ---------- 10. the tour knows the sections; the School's set-up and walkthrough wait to be asked for ---------- */
window.ccRdTourSteps=()=>{const S=secs(),n=S.length,sm=small(),at=k=>()=>sm?$('#rdmenub'):(k?$(`#rdnav [data-sec="${k}"]`):$('#rdnav'));
 return [{sec:'chapters',k:'The sections',h:`${n} sections`,t:'Everything in the issue lives in one of these sections. Next lights up each one in turn.'+(sm?' Find them under Menu.':''),at:[at('')]}]
  .concat(S.map((s,i)=>({sec:'chapters',k:`Section ${i+1} of ${n}`,h:s.lab,t:secD(s),at:[at(s.k)]})))};
window.ccRdSchoolOffer=()=>{const p=$('#p-school');if(!p||$('#rdsch'))return;const c=document.createElement('div');c.id='rdsch';c.className='rdinline';
 c.innerHTML=`<span class="rdii" aria-hidden="true">${ico('turtle')}</span><div><b>Make the School yours</b><p>Answer a few questions about you and the School shows the lessons that fit. You can change your answers at any time.</p></div><button type="button" class="rdbtn p" data-sgplaque="1">Set up my School</button>`;
 const b=p.querySelector(':scope > .pbanner');if(b&&b.nextSibling)p.insertBefore(c,b.nextSibling);else p.prepend(c)};
addEventListener('cc-sch-setup',()=>{const c=$('#rdsch');if(c)c.remove()});
window.ccRdOffer=(text,label,fn)=>{let o=$('#rdoffer');if(!o){o=document.createElement('div');o.id='rdoffer';o.className='rdoffer';o.setAttribute('role','status');document.body.appendChild(o)}
 o.innerHTML=`<span>${esc(text)}</span><button type="button" class="rdbtn p" data-k="y">${esc(label)}</button><button type="button" class="rdbtn" data-k="n">No thanks</button>`;o.hidden=false;
 o.onclick=e=>{const b=e.target.closest('button');if(!b)return;o.hidden=true;if(b.dataset.k==='y'&&fn)fn()};clearTimeout(o._t);o._t=setTimeout(()=>{o.hidden=true},16000)};

/* ---------- 11. start ---------- */
const navH=()=>R.style.setProperty('--rdnavh',Math.round(nav.getBoundingClientRect().height)+'px');
let rzT=0;addEventListener('resize',()=>{clearTimeout(rzT);rzT=setTimeout(()=>{fitBar();if(!np.hidden)placeNew();if(R.classList.contains('rdsopen'))placeSF();if(!res.hidden)placeRes();$$('.rdi.open',rn).forEach(closeDD)},90)});
window.ccRdKit={R,$,$$,esc,ico,gar,side,info,mlab,msub,vd,artOf,heroOf,sceneOf,SEC,RT,chOf,routeOf,avail,itemsOf,cardHTML,toolHTML,GOW,WL,go,jump,later,SV,views:{},cur:()=>cur};
window.ccRdBoot=()=>{drawNav();navH();
{const P=window.CC_RD_P||{k:''};const k=RT.hasOwnProperty(P.k)?P.k:'';
 if(!P.keep&&(k||location.hash)){try{history.replaceState({rd:k},'','#/'+k)}catch(e){}}
 render(k,{initial:1,x:P.x});ready=true;later(fitBar,600);try{document.fonts&&document.fonts.ready.then(()=>fitBar())}catch(e){}}};
})();

/* ===== Wonderland redesign (phases 2 and 3, 20 November 2026, Charlie): Home, the spotlight and This Week's opening =====
   Home is a gateway: the title, three pathways, the spotlight (a special edition, such as Ignite), This Week at a Glance
   (the headline five), the Curiosity Meter, the four Wonderland stories and the next events, all drawn from the issue's own
   data (TOP5, ROADMAP, HORIZON, EVENTS, IGNITE), then At a glance's own tools under Make this issue yours.
   The spotlight: by default it is the Ignite Special Edition while IGNITE.tab is on. To spotlight something else, set
   window.SPOTLIGHT in the issue's data, for example
     window.SPOTLIGHT={route:'this-week/ignite',kicker:'Special edition',title:'...',text:'...',art:'ignite',cta:'Open it',until:'2026-12-01'}
   route is any page address (see rd0.js); art is a painting's name; until (optional) is the last day it shows.
   This runs inside rd.js (it is joined onto its end at build time) and uses rd.js's helpers through window.ccRdKit. */
(function(){
const K=window.ccRdKit;if(!K)return;
const {R,$,esc,ico,gar,info,mlab,artOf,sceneOf,RT,chOf,cardHTML,GOW,WL}=K;
const IMG=window.CC_RD_IMG||{};
const D={rm:()=>typeof ROADMAP!=='undefined'&&Array.isArray(ROADMAP)?ROADMAP:[],hz:()=>typeof HORIZON!=='undefined'&&Array.isArray(HORIZON)?HORIZON:[],
 ev:()=>typeof EVENTS!=='undefined'&&Array.isArray(EVENTS)?EVENTS:[],iss:()=>typeof ISSUE!=='undefined'?ISSUE:{},prov:()=>typeof PROV!=='undefined'?PROV:{},
 top:()=>Array.isArray(window.TOP5)?window.TOP5:[],ig:()=>typeof IGNITE!=='undefined'?IGNITE:null};
const wk=()=>D.iss().weeks===1?'this week':'this fortnight';
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const dd=iso=>{const m=/^(\d{4})-(\d{2})-(\d{2})/.exec(iso||'');return m?`${+m[3]} ${MON[+m[2]-1]}`:''};
const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
/* the next issue, read from the footer line that At a glance also reads ("Issue 05 arrives on Tuesday 24 November 2026.") */
function nextIssue(){const f=$('footer.foot');const m=f&&/Issue\s+(\w+)\s+arrives on\s+(?:\w+\s+)?(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/.exec(f.textContent||'');
 if(!m)return null;const mi=MON.indexOf(m[3].slice(0,3));return {no:m[1],d:`${m[2]} ${m[3].slice(0,3)}`,full:`${m[2]} ${m[3]} ${m[4]}`,iso:mi<0?'':`${m[4]}-${String(mi+1).padStart(2,'0')}-${String(m[2]).padStart(2,'0')}`}}
/* roadmap items with a target of December of the issue's year or sooner, read from their release month ("Dec '26") */
function byDecember(){const y=+(String(D.iss().issueDate||'').slice(0,4))||new Date().getFullYear();let n=0;
 D.rm().forEach(x=>{const m=/^([A-Za-z]{3})\s*'(\d{2})/.exec(String(x.rel||''));if(!m)return;const yy=2000+(+m[2]),mm=MON.indexOf(m[1].slice(0,1).toUpperCase()+m[1].slice(1,3).toLowerCase());if(mm<0)return;if(yy<y||(yy===y&&mm<=11))n++});return n}
function nextEvents(n){const t=today();return D.ev().filter(e=>e&&e.start&&e.start>=t).sort((a,b)=>a.start<b.start?-1:a.start>b.start?1:0).slice(0,n)}
/* ---------- the spotlight ---------- */
function spot(){const S=window.SPOTLIGHT,g=gar();
 if(S&&S.route&&RT[S.route]&&chOf(S.route)!==null&&(!S.until||today()<=S.until)){const c=chOf(S.route)||RT[S.route].g||'';
  return {k:S.route,kick:S.kicker||'Spotlight',title:S.title||mlab(S.route),text:S.text||info(S.route).d,img:artOf(S.art||sceneOf(c)),cta:S.cta||'Take me there'}}
 const IG=D.ig();if(!IG||!IG.tab||chOf('this-week/ignite')===null)return null;
 const I=D.iss(),H=IG.hero||{},GT=(window.GTABS||{}).ignite||{},lab=I.label||I.lab||'Special edition';
 return g?{k:'this-week/ignite',kick:lab,title:'Ignite: what changes for you',text:GT.d||info('this-week/ignite').d,img:artOf('ignite'),cta:'Read what changes for you'}
  :{k:'this-week/ignite',kick:lab,title:H.title||'The Ignite Special Edition',text:H.lead||info('this-week/ignite').d,img:artOf('ignite'),cta:'Open the '+lab};}
function spotHTML(slim){const s=spot();if(!s)return '';
 return `<section class="rdspot${slim?' slim':''}" aria-label="Spotlight"><a class="rdspot-in" href="#/${s.k}">${s.img?`<span class="rdspot-art"><img src="${esc(s.img)}" alt="" decoding="async"></span>`:''}<span class="rdspot-t"><span class="rdkick"><span class="rdspot-star" aria-hidden="true">\u2726</span>${esc(s.kick)}</span><b>${esc(s.title)}</b>${s.text?`<span class="rdspot-d">${esc(s.text)}</span>`:''}</span><span class="rdbtn p rdspot-go">${esc(s.cta)} <span aria-hidden="true">\u2192</span></span></a></section>`}
/* ---------- Home ---------- */
function path(o){const inner=`<img src="${esc(o.img||'')}" alt="" decoding="async"><span><b>${o.t}</b><small>${o.d}</small></span><i aria-hidden="true">\u2192</i>`;
 return o.href?`<a class="rdh-path" href="${o.href}">${inner}</a>`:`<button type="button" class="rdh-path" ${o.attr}>${inner}</button>`}
function homeHTML(){const I=D.iss(),P=D.prov(),g=gar(),lab=I.label||I.lab||'';
 const hero=`<div class="rdh-hero"${IMG.garden?` style="background-image:url('${esc(IMG.garden)}')"`:''}><div class="rdh-plaque">
  <p class="rdh-kick">Microsoft AI &amp; Modern Work${lab?` \u00b7 ${esc(lab)}`:''}</p><h1 id="rdh1" tabindex="-1">Curiouser &amp; Curiouser</h1>
  <p class="rdh-tag">Your journey through what\u2019s new, what\u2019s next and what matters in Microsoft AI.</p>
  <p class="rdh-pills">${I.range?`<span>${ico('watch')}${esc(I.range)}</span>`:''}${P.community?`<span>${ico('crown')}${esc(P.community)}</span>`:''}</p></div></div>`;
 const paths=`<div class="rdh-paths">${path({img:IMG.rabbit,t:'The Two-Minute Briefing',d:'Just tell me what matters this week.',attr:g?'data-jump="gd-overview"':'data-act="pocket"'})}${path({img:IMG.cat,t:'Explore What\u2019s Relevant to Me',d:'Find the updates, guidance and resources that matter to you.',attr:'data-rdact="lens"'})}${path({img:IMG.key,t:'Explore Wonderland',d:'Discover the stories, characters and adventures behind Microsoft AI.',href:'#/wonderland'})}</div>`;
 if(g)return `<section class="rdh" aria-labelledby="rdh1">${hero}${paths}${spotHTML(false)}</section>`;
 const T=D.top();
 const glance=`<section class="rdh-card rdh-glance" aria-labelledby="rdhg"><header><h2 id="rdhg">This Week at a Glance</h2><p>The five things to know from this issue. Open one for what it means and its source.</p></header>
  <ol class="rdh-list">${T.map((x,i)=>`<li><details><summary><span class="rdn">${i+1}</span><span class="rdt">${esc(x.t)}</span><span class="rdpill" title="Roadmap target">${esc(x.rel||'')}</span></summary><div class="rdh-more"><p>${esc(x.why||'')}</p><p class="rdh-links"><a href="https://www.microsoft.com/en-us/microsoft-365/roadmap?id=${encodeURIComponent(x.id)}" target="_blank" rel="noopener">Roadmap ${esc(x.id)} <span aria-hidden="true">\u2197</span></a><a href="#/this-week">More in This Week <span aria-hidden="true">\u2192</span></a></p></div></details></li>`).join('')}</ol>
  <a class="rdh-all" href="#/this-week">Everything new ${wk()} <span aria-hidden="true">\u2192</span></a></section>`;
 const meter=`<section class="rdh-card rdh-meter" aria-labelledby="rdhm"><header><h2 id="rdhm">The Curiosity Meter</h2><p>Counted from this issue\u2019s updates and Microsoft\u2019s AI at Work Roadmap.</p></header>
  <div class="rdh-stats"><div><b>${D.rm().length}</b><span>roadmap items</span></div><div><b>${byDecember()}</b><span>landing by December</span></div><div><b>${D.hz().length}</b><span>on the horizon</span></div></div>
  <p class="rdh-mb"><a class="rdbtn" href="#/roadmap">Explore the roadmap <span aria-hidden="true">\u2192</span></a></p></section>`;
 const wonder=`<section class="rdh-sec" aria-labelledby="rdhw"><header class="rdh-sech"><h2 id="rdhw">Explore Wonderland</h2><p>Curious minds welcome. Step into a story and explore at your own pace.</p></header><div class="rdgrid rd4">${WL.map(x=>cardHTML(x,{go:GOW[x]})).join('')}</div></section>`;
 const ni=nextIssue(),L=nextEvents(3).map(e=>({iso:e.start,h:`<a class="rdh-ev" href="${e.u?esc(e.u):'#/events'}"${e.u?' target="_blank" rel="noopener"':''}><span class="rdd">${esc(dd(e.start))}</span><span><b>${esc(e.t)}</b><small>${esc([...new Set([e.where,e.fmt].filter(Boolean))].join(' \u00b7 '))}</small></span></a>`}));
 if(ni&&ni.iso)L.push({iso:ni.iso,h:`<a class="rdh-ev" href="#/this-week/key-dates"><span class="rdd">${esc(ni.d)}</span><span><b>Issue ${esc(ni.no)} arrives</b><small>${esc(ni.full)}</small></span></a>`});
 const evs=L.sort((a,b)=>a.iso<b.iso?-1:a.iso>b.iso?1:0).slice(0,3).map(x=>x.h).join('');
 const events=`<section class="rdh-card rdh-events" aria-labelledby="rdhe"><h2 id="rdhe"><span aria-hidden="true">${ico('card')}</span>Upcoming Events</h2><div class="rdh-evs">${evs||'<p class="rdh-none">No dated events coming up. See the invitations for monthly sessions.</p>'}</div><a class="rdbtn" href="#/events">View all events <span aria-hidden="true">\u2192</span></a></section>`;
 return `<section class="rdh" aria-labelledby="rdh1">${hero}${paths}${spotHTML(false)}<div class="rdh-row">${glance}${meter}</div>${wonder}${events}</section>`}
/* At a glance's own tools stay on Home under their heading; the two the pathways already open are not repeated there */
function makeYours(){const a=$('#p-overview > .ccact');if(!a||$('#rdmakeh'))return;const h=document.createElement('header');h.className='rdmake-h';h.id='rdmakeh';
 h.innerHTML='<h2>Make this issue yours</h2><p>Take it with you, share it, or never miss the next one.</p>';a.parentNode.insertBefore(h,a)}
K.views.home={html:homeHTML,after:()=>makeYours()};
/* This Week opens with its own picture (the What's new painting, with its moment) and then the spotlight */
K.views.week={html:()=>gar()?'':spotHTML(true)};
K.views.roadmap={html:()=>''};
K.spotHTML=spotHTML;K.spot=spot;
})();

/* ===== Wonderland redesign, phases 3 and 4 (20 November 2026, Charlie) =====
   Phase 3: the Explore Wonderland hub, and the same frame on each of the four stories (the Tea Party, the Caterpillar, the
   Rabbit Hole and the Hall of Doors): the story's own picture and moment first, then what you will learn, the guided way
   in (each story's own: Clean cups, move down!, Play the journey, Follow the request, Follow the whole story), Show me
   around, and a way to move inside the story built from its own parts (the guests, the six stages, the stage stepper, the
   hallway of doors). Every story keeps everything it had; the frame only points into it.
   Phase 4: AI & Copilot (the updates by topic, Ignite's three shifts, Which door?, use cases, technical guidance and the
   Caucus Race), Governance's topic index (Governance, Security, Compliance, Risk, Policy and Responsible AI, each listing
   existing decrees, obligation pages, stories and the Rabbit hole's questions), and the learning library (every lesson,
   School room, playbook, template, class and reference, by topic and goal, with minutes, audience and needs only where the
   School already gives them). Nothing here is new content: it is all drawn from the issue's own data.
   This runs inside rd.js (it is joined onto its end at build time) and uses rd.js's helpers through window.ccRdKit. */
(function(){
const K=window.ccRdKit;if(!K)return;
const {R,$,$$,esc,ico,gar,info,mlab,vd,artOf,heroOf,sceneOf,RT,chOf,avail,cardHTML,GOW,WL,go,later}=K;
const IMG=window.CC_RD_IMG||{};
const G=(f,d)=>{try{const v=f();return v===undefined?d:v}catch(e){return d}};
const calm=()=>R.classList.contains('calm')||matchMedia('(prefers-reduced-motion: reduce)').matches;
const land=el=>{if(!el)return;if(window.ccLand)window.ccLand(()=>el);else el.scrollIntoView({block:'start',behavior:calm()?'auto':'smooth'})};
const click=sel=>{const el=typeof sel==='string'?$(sel):sel;if(el)el.click();return !!el};
const wk=()=>G(()=>ISSUE.weeks,2)===1?'this week':'this fortnight';
/* the Rabbit hole arrives in its own file: wait for it */
function holeReady(){return new Promise((ok,no)=>{let n=0;const t=()=>{if(window.ccHole&&typeof HOLE!=='undefined')return ok();if(n++>60)return no(new Error('hole'));if(n===1&&window.ccGlassLoad)window.ccGlassLoad().catch(()=>{});setTimeout(t,250)};t()})}

/* ---------- a section page's header: the whole painting, with its words on a see-through plaque ---------- */
function heroHTML(o){return `<header class="rdph2"><img class="rdph2-img" src="${esc(o.img||'')}" alt="" decoding="async"><div class="rdph2-plaque"><p class="rdkick">${o.kick||''}</p><h1 id="rdh1" tabindex="-1">${esc(o.title)}</h1>${o.text?`<p>${esc(o.text)}</p>`:''}${o.extra||''}</div></header>`}
const secH=(t,p,id)=>`<header class="rdsec-h"><h2${id?` id="${id}"`:''}>${esc(t)}</h2>${p?`<p>${esc(p)}</p>`:''}</header>`;

/* ---------- Phase 3: the four stories ---------- */
/* what each story holds, counted from its own data (minutes only where the story's own Play has a measured length) */
function facts(c){
 if(c==='party'){const n=G(()=>Object.keys(DISHES).length,0);return n?`${n} guests at the table`:''}
 if(c==='journey'){const n=G(()=>JOURNEY.length,0);return n?`${n} stages`:''}
 if(c==='hole'){const H=G(()=>HOLE,null)||{},F=(window.CC_RD_FACTS||{}).hole||{},st=H.stages?H.stages.length:F.stages,sc=H.scenarios?H.scenarios.length:F.scenarios;return st?`${st} stages`+(sc?` \u00b7 ${sc} scenarios`:''):''}
 if(c==='glass'){const n=G(()=>window.CC_HALL.length,0),t=G(()=>window.CC_LGTOT,0),m=Math.max(1,Math.round(t/60000));return n?`${n} doors`+(t?` \u00b7 about ${m} minute${m>1?'s':''} to play`:''):''}
 return ''}
function xpCard(k){const r=RT[k]||{},c=r.g,ok=avail(k),img=artOf(sceneOf(c)),f=facts(c);
 return `<a class="rdcard rdxcard${ok?'':' rdother'}" href="#/${k}"><span class="rdart"><img src="${esc(img)}" alt="" loading="lazy" decoding="async"></span><span class="rdcb"><b class="rdct">${esc(mlab(k)||r.t)}</b><span class="rdcd">${esc(info(k).d)}</span>${f?`<span class="rdfacts">${esc(f)}</span>`:''}${ok?'':'<span class="rdtag">Through the looking-glass</span>'}<span class="rdgo">${esc(GOW[k]||'Enter')} <span aria-hidden="true">\u2192</span></span></span></a>`}
function moreCard(o){const ok=!o.k||avail(o.k),img=o.img||artOf(o.art||'');const inner=`<span class="rdart${img?'':' rdnoart'}">${img?`<img src="${esc(img)}" alt="" loading="lazy" decoding="async">`:ico(o.ic||'card')}</span><span class="rdcb"><b class="rdct">${esc(o.t)}</b><span class="rdcd">${esc(o.d||'')}</span>${ok?'':`<span class="rdtag">${gar()?'Through the looking-glass':'In the garden'}</span>`}<span class="rdgo">${esc(o.go||'Open')} <span aria-hidden="true">\u2192</span></span></span>`;
 return o.k?`<a class="rdcard rdmore${ok?'':' rdother'}" href="#/${o.k}">${inner}</a>`:`<button type="button" class="rdcard rdmore" ${o.attr}>${inner}</button>`}
function hubHTML(){const g=gar(),ig=G(()=>IGNITE.tab,false);
 const more=[{k:'ai-and-copilot/caucus-race',t:'The Caucus Race',art:'race',d:info('ai-and-copilot/caucus-race').d,go:'Join the race'},
  {k:'governance',t:'The Queen\u2019s Court',art:'court2',d:'Royal decrees, playbooks, templates and how we decide.',go:'Enter the court'},
  {k:'learning/school',t:'The Mock Turtle\u2019s School',art:'school',d:info('learning/school').d,go:'Go to school'}]
  .concat(ig?[{k:'this-week/ignite',t:g?'Ignite: what changes for you':'The Great Book of News',art:'ignite',d:info('this-week/ignite').d,go:'Open the book'}]:[])
  .filter(o=>!(o.k==='governance'&&g))
  .concat([{t:'Advice from a Caterpillar',img:IMG.cat,d:'\u201cWho are YOU?\u201d A few questions, and the Caterpillar suggests which Copilot fits the job.',attr:'data-cat="1"',go:'Ask the Caterpillar'}])
  .concat(!window.CC_PHONE&&typeof window.ccIntroPlay==='function'?[{t:'The welcome',img:IMG.garden,d:'Follow the White Rabbit down the hole, through the Hall of Doors and into the garden.',attr:'data-rdx="welcome"',go:'Play the welcome'}]:[]);
 return `<section class="rdidx rdhub" aria-labelledby="rdh1">${heroHTML({img:heroOf('glasshouse'),kick:'Explore Wonderland',title:'Explore Wonderland',text:vd('wonderland')})}
 <section class="rdhub-sec" aria-label="The four stories"><div class="rdgrid rd4">${WL.map(xpCard).join('')}</div></section>
 <section class="rdhub-sec" aria-labelledby="rdhubm">${secH('More to discover','Other corners of Wonderland, each a page of its own.','rdhubm')}<div class="rdgrid rdmore-grid">${more.map(moreCard).join('')}</div></section></section>`}
K.views.hub={html:hubHTML,after:()=>{if(typeof HOLE==='undefined'&&window.ccGlassLoad&&!gar()){/* the Rabbit hole's counts arrive with its file, when it is fetched */}}};

/* each story's frame: what you will learn, the guided way in, and a way to move inside the story */
const COLS=['#f6c9d8','#cfe4f6','#d8f0dc','#e9dcff','#ffe2c4','#f9d3e3'];
const XD={
 party:{n:1,own:'.partywrap',
  learn:()=>['Meet the guests: what each product brings to the table, and what it passes to the others','See how Microsoft IQ pours context into every cup','Take the guided tour round the table, or visit any seat on your own'],
  play:{lab:'Clean cups, move down!',hint:'The guided tour round the table',run:()=>click('#ttplay'),at:'.partywrap'},
  nav:()=>{const D=G(()=>DISHES,{}),S=window.SPRITES||{};const ks=Object.keys(D);if(!ks.length)return '';
   return `<div class="rdx-nav"><h3>Meet the guests</h3><div class="rdx-strip rdguests">${ks.map(n=>{const d=D[n]||{},im=S[d.img];return `<button type="button" class="rdguest" data-rdguest="${esc(n)}" aria-pressed="false">${im?`<img src="${esc(im)}" alt="" loading="lazy" decoding="async">`:`<span class="rdgi">${ico('teacup')}</span>`}<b>${esc(n)}</b><small>${esc(d.dish||'')}</small></button>`}).join('')}</div></div>`}},
 journey:{n:2,own:'.journey',
  learn:()=>{const J=G(()=>JOURNEY,[]);return [(J.length?`${J.length} stages, from first chat to governed agents at scale: `+J.map(j=>j.k).join(', '):'Six stages from first chat to governed agents at scale'),'Why each stage matters, what it is built on, and a short story','Play the journey, or open any stage on its own']},
  play:{lab:'Play the journey',hint:'The Caterpillar walks the path, stage by stage',run:()=>click('#jplay'),at:'.journey'},
  nav:()=>{const J=G(()=>JOURNEY,[]);if(!J.length)return '';return `<div class="rdx-nav"><h3>The ${J.length} stages</h3><ol class="rdx-strip rdstones">${J.map((j,i)=>`<li><button type="button" class="rdstone" data-rdstage="${i}"><span class="rdsn">${i+1}</span><b>${esc(j.k)}</b><small>${esc(j.t)}</small></button></li>`).join('')}</ol></div>`}},
 hole:{n:3,own:'#hxh',
  learn:()=>['Follow one request, stage by stage, from your prompt back to the answer','Choose a scenario, browse quickly, or go deeper into the technical detail','Check the public source behind every step'],
  play:{lab:'Follow the request',hint:'The request travels through every stage',run:()=>holeReady().then(()=>{if(window.ccHole.play)window.ccHole.play()}).catch(()=>{}),at:'#hxj'},
  nav:()=>`<div class="rdx-nav"><h3>The journey, stage by stage</h3><ol class="rdx-strip rdhsteps" data-rdhole="1"><li class="rdwait">The stages arrive with the story\u2026</li></ol></div>`},
 glass:{n:4,own:'.lg',
  learn:()=>{const n=G(()=>window.CC_HALL.length,0);return [(n?`${n} doors, one for each step of the story`:'A door for each step of the story'),'What runs on a fixed-cost licence, and what uses usage-based credits','Follow the whole story, or open one door at a time']},
  play:{lab:'Follow the whole story',hint:'The story plays page by page',run:()=>{const b=$('#lgplay');if(b&&b.textContent!=='Pause')b.click()},at:'.lg'},
  nav:()=>{const H=G(()=>window.CC_HALL,[]);if(!H.length)return '';return `<div class="rdx-nav"><h3>The hallway of doors</h3><ol class="rdx-strip rdhall">${H.map((h,i)=>`<li><button type="button" class="rddoor" data-rddoor="${i}" style="--dc:${COLS[i%COLS.length]}"><span class="rddoor-arch" aria-hidden="true"><i></i></span><span class="rddoor-n">Door ${i+1}</span><b>${esc(h.ch)}</b></button></li>`).join('')}</ol></div>`}}};
function buildX(c,k){const p=$('#p-'+c),X=XD[c];if(!p||!X)return;let x=$('#rdx-'+c);
 if(!x){const ph=p.querySelector(':scope > .phead'),hk=ph&&ph.offsetParent!==null&&c!=='hole';
  const h2=hk&&ph.querySelector('h2')?ph.querySelector('h2').textContent.trim():'',pp=hk&&ph.querySelector('p')?ph.querySelector('p').innerHTML:'';
  x=document.createElement('section');x.id='rdx-'+c;x.className='rdx';x.setAttribute('aria-labelledby','rdxh-'+c);
  x.innerHTML=`<div class="rdx-top"><div class="rdx-txt"><p class="rdkick">Explore Wonderland \u00b7 Story ${X.n} of 4</p><h2 id="rdxh-${c}">${esc(mlab(k)||RT[k].t)}</h2><p class="rdx-lede">${h2?`<b>${esc(h2)}.</b> `:''}${pp||esc(info(k).d)}</p></div>
  <div class="rdx-learn"><h3>What you\u2019ll learn</h3><ul>${X.learn().map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div></div>
  <div class="rdx-btns"><button type="button" class="rdbtn p" data-rdxgo="play" title="${esc(X.play.hint)}"><span aria-hidden="true">\u25B6</span> ${esc(X.play.lab)}</button><button type="button" class="rdbtn" data-rdxgo="tour">Show me around</button><button type="button" class="rdbtn" data-rdxgo="own">Explore on my own <span aria-hidden="true">\u2193</span></button></div>${X.nav()}`;
  if(hk)ph.classList.add('rdx-moved');
  const b=p.querySelector(':scope > .pbanner');if(b&&b.nextSibling)p.insertBefore(x,b.nextSibling);else p.prepend(x);
  x.addEventListener('click',e=>{const t=e.target;let b;
   if((b=t.closest('[data-rdxgo]'))){const a=b.dataset.rdxgo;if(a==='play'){land($(X.play.at,p));later(X.play.run,calm()?50:450)}else if(a==='tour'){if(window.ccTour)window.ccTour.page(c)}else land($(X.own,p));return}
   if((b=t.closest('[data-rdguest]'))){const n=b.dataset.rdguest,el=[...p.querySelectorAll('.partywrap [data-n]')].find(e=>e.dataset.n===n&&e.tagName==='BUTTON');
    $$('.rdguest',x).forEach(g=>g.setAttribute('aria-pressed',g===b?'true':'false'));if(el){land($('.partywrap',p));later(()=>el.click(),calm()?30:350)}return}
   if((b=t.closest('[data-rdstage]'))){const i=+b.dataset.rdstage,st=$(`#jstages .jst[data-i="${i}"]`);if(st){st.click();later(()=>land($('#jdetail')&&$('#jdetail').offsetParent?$('#jdetail'):st),60)}return}
   if((b=t.closest('[data-rdhs]'))){const i=+b.dataset.rdhs;holeReady().then(()=>{window.ccHole.go(i,true);land($('#hxj'))}).catch(()=>{});return}
   if((b=t.closest('[data-rddoor]'))){const i=+b.dataset.rddoor,s=$(`#lgsteps button[data-i="${i}"]`);if(s){s.click();land($('.lg',p))}return}});}
 if(c==='hole'){const ol=$('[data-rdhole]',x);if(ol&&!ol.dataset.done)holeReady().then(()=>{const S=G(()=>HOLE.stages,[]);if(!S.length)return;ol.dataset.done='1';
  ol.innerHTML=S.map((s,i)=>`<li><button type="button" class="rdhst" data-rdhs="${i}"><span class="rdsn">${i+1}</span><b>${esc(s.w)}</b><small>${esc(s.tech)}</small></button></li>`).join('')}).catch(()=>{ol.innerHTML='<li class="rdwait">The stages did not arrive. Check your connection, then open the story again.</li>'})}}

/* ---------- Phase 4: Governance, the topic index ---------- */
const TOP=[['gov','Governance','crown'],['sec','Security','shield'],['comp','Compliance','scroll'],['risk','Risk','key'],['pol','Policy','card'],['rai','Responsible AI','cater']];
function openDecree(i){go('governance',{});later(()=>{if(window.ccAgency&&window.ccAgency.setCSub)window.ccAgency.setCSub('ag-decrees',true);later(()=>click(`#decrees .dcard[data-i="${i}"]`),420)},80)}
function queenGo(){go('wonderland/rabbit-hole',{});later(()=>holeReady().then(()=>{const a=$('#hxqq'),b=$('#hxqt');land(a&&a.offsetParent?a:b)}).catch(()=>{}),900)}
function topicItems(id){const L=[],DC=G(()=>DECREES,[]),T=G(()=>AGENCY.touch,{}),PSL=G(()=>PS,[]),PB=G(()=>AGENCY.playbooks,[]),TP=G(()=>AGENCY.templates,[]);
 const dec=f=>DC.forEach((d,i)=>{if(f(d))L.push({ty:'Royal decree',t:d.t,d:d.o,go:()=>openDecree(i)})});
 const tch=cs=>cs.forEach(c=>{const o=T[c];if(o)L.push({ty:'What does it touch?',t:o.lab,d:o.what,go:()=>{if(window.ccAgency&&window.ccAgency.touchPage)window.ccAgency.touchPage(c)}})});
 const story=f=>PSL.forEach((p,i)=>{if(f(p))L.push({ty:'Story',t:p.title,d:[p.org,p.jurisdiction].filter(Boolean).join(' \u00b7 '),go:()=>{if(window.ccOpenPS)window.ccOpenPS(i)}})});
 const queen=()=>L.push({ty:'Rabbit hole',t:'The Queen\u2019s Questions',d:'Questions for government and regulated organisations: classification, privacy, data location, processing, records, permissions, agents and governance.',go:queenGo});
 if(id==='gov'){dec(d=>/^(Platform|IT|Finance)$/.test(d.o));tch(['fi','pr','wf']);PB.forEach(p=>L.push({ty:'Playbook',t:p.t,d:p.lede||'',go:()=>window.ccAgency&&window.ccAgency.openPB(p.id)}));TP.forEach(p=>L.push({ty:'Template',t:p.t,d:p.use||'',go:()=>window.ccAgency&&window.ccAgency.openTPL(p.id)}));L.push({ty:'Page',t:'How we decide',d:'How role and sector tags are decided, with public sources.',go:()=>go('governance/how-we-decide',{})})}
 if(id==='sec'){dec(d=>d.o==='Security');tch(['cy']);story(p=>/security/i.test(p.theme||''))}
 if(id==='comp'){dec(d=>/^(Records|Legal)$/.test(d.o));tch(['rec','pv','rti'])}
 if(id==='risk'){tch(['fa','pr']);queen()}
 if(id==='pol'){story(p=>/policy/i.test(p.theme||''));tch(['wf'])}
 if(id==='rai'){tch(['fa']);story(p=>/AI governance policy|responsible AI/i.test((p.title||'')+' '+(p.summary||'')));dec(d=>/\bagents?\b/i.test(d.t));queen()}
 return L}
function buildTopics(){const p=$('#p-court');if(!p||$('#rdtopics'))return;const ph=p.querySelector(':scope > .phead');if(!ph)return;
 const s=document.createElement('section');s.id='rdtopics';s.className='rdtopics';s.setAttribute('aria-labelledby','rdtoph');
 s.innerHTML=`<div class="rdtopics-h"><h2 id="rdtoph">Find it by topic</h2><p>Every royal decree, obligation page, story and question in this issue, gathered by topic. Choose one to see them all.</p></div><div class="rdtopics-row">${TOP.map(([id,t,ic])=>`<button type="button" class="rdtopic" data-rdtopic="${id}" aria-expanded="false" aria-controls="rdtopp"><span aria-hidden="true">${ico(ic)}</span>${esc(t)}<em>${topicItems(id).length}</em></button>`).join('')}</div><div class="rdtopics-panel" id="rdtopp" hidden></div>`;
 ph.parentNode.insertBefore(s,ph.nextSibling);let items=[];
 s.addEventListener('click',e=>{const b=e.target.closest('[data-rdtopic]');const panel=$('#rdtopp',s);
  if(b){const on=b.getAttribute('aria-expanded')==='true';$$('[data-rdtopic]',s).forEach(x=>x.setAttribute('aria-expanded','false'));if(on){panel.hidden=true;return}
   b.setAttribute('aria-expanded','true');items=topicItems(b.dataset.rdtopic);const lab=TOP.find(t=>t[0]===b.dataset.rdtopic)[1];
   panel.innerHTML=`<h3>${esc(lab)}</h3><ul class="rdlist">${items.map((x,i)=>`<li><button type="button" class="rdli" data-rdti="${i}"><span class="rdty">${esc(x.ty)}</span><span class="rdlb"><b>${esc(x.t)}</b>${x.d?`<small>${esc(x.d)}</small>`:''}</span><span class="rdla" aria-hidden="true">\u2192</span></button></li>`).join('')}</ul>`;panel.hidden=false;return}
  const it=e.target.closest('[data-rdti]');if(it){const x=items[+it.dataset.rdti];if(x)x.go()}})}

/* ---------- Phase 4: AI & Copilot ---------- */
/* Which door? travels in the garden's own file, so it may arrive a moment after the page */
function doorsHTML(){const DR=G(()=>window.DOORS.doors,[]);return DR.length?`<section class="rdai-sec" aria-labelledby="rdai3">${secH('Which door? Chat, Cowork, Code or Autopilot','Four ways to work with Copilot, from a quick question to work that runs by itself. Each is sized for a different job, and paid for differently.','rdai3')}<div class="rdgrid rd4">${DR.map(d=>`<article class="rdai-door" style="--dc:${esc(d.col||'#e9dcff')}"><span class="rddoor-arch" aria-hidden="true"><i></i></span><b>${esc(d.t)}</b><span class="rdkick">${esc([d.verb,d.size].filter(Boolean).join(' \u00b7 '))}</span><p>${esc(d.starts||'')}</p><p class="rdmeta">${[d.runs,d.bill,d.avail].filter(Boolean).map(m=>`<span>${esc(m)}</span>`).join('')}</p></article>`).join('')}</div><p class="rdmore-l"><a href="#/learning/school" data-rdschool="mts-doors">Find your door in the School <span aria-hidden="true">\u2192</span></a> <a href="#/wonderland/hall-of-doors">How each is paid for: the Hall of Doors <span aria-hidden="true">\u2192</span></a></p></section>`:'';}
function aiHTML(){const g=gar(),hero=heroHTML({img:heroOf('race'),kick:'Section',title:'AI & Copilot',text:vd('ai-and-copilot')});
 const catCard=moreCard({t:'Advice from a Caterpillar',img:IMG.cat,d:'Which Copilot fits the job? A few questions, and the Caterpillar suggests one.',attr:'data-cat="1"',go:'Ask the Caterpillar'});
 const doorsCard=moreCard({t:'Which door?',art:'hall',d:'Chat, Cowork, Code or Autopilot: which one to open for the job in front of you, in the School.',attr:'data-rdschool="mts-doors"',go:'Find your door'});
 if(g)return `<section class="rdidx rdai" aria-labelledby="rdh1">${hero}<div class="rdgrid">${['ai-and-copilot/live-flowers','ai-and-copilot/questions'].filter(avail).map(k=>cardHTML(k)).join('')}${doorsCard}${catCard}${avail('this-week/ignite')&&G(()=>IGNITE.tab,false)?moreCard({k:'this-week/ignite',t:'Ignite: what changes for you',art:'ignite',d:info('this-week/ignite').d,go:'Read it'}):''}</div></section>`;
 const TL=G(()=>TILES,[]),GR=G(()=>GROUPS,[]),gof=window.ccGroupOf&&window.ccGroupOf.tile;const by={};TL.forEach((t,i)=>{const id=gof?gof(t):'all';(by[id]=by[id]||[]).push(i)});
 const topics=`<section class="rdai-sec" aria-labelledby="rdai1">${secH('What\u2019s new, by topic',`Every update ${wk()}, in ${GR.filter(x=>by[x.id]).length} topics. Open one for what it is, why it matters and its source.`,'rdai1')}<div class="rdai-topics">${GR.filter(x=>by[x.id]).map(x=>`<article class="rdai-topic"><h3><span aria-hidden="true">${ico(x.ic)}</span>${esc(x.t)}</h3><p>${esc(x.sub||'')}</p><ul>${by[x.id].map(i=>`<li><button type="button" class="rdai-u" data-rdtile="${i}"><b>${esc(TL[i].t)}</b><span class="rdpill2">${esc(TL[i].s||'')}</span></button></li>`).join('')}</ul></article>`).join('')}</div><p class="rdmore-l"><a href="#/this-week">All of them on This Week, as tiles or a list <span aria-hidden="true">\u2192</span></a></p></section>`;
 const SH=G(()=>IGNITE.shifts,[]);
 const shifts=SH.length&&avail('this-week/ignite')?`<section class="rdai-sec" aria-labelledby="rdai2">${secH('Ignite: the three big shifts','What Microsoft announced at Ignite points to three shifts. Each one is told in full in the Great Book of News.','rdai2')}<div class="rdgrid rd3">${SH.map(s=>`<a class="rdcard rdshift" href="#/this-week/ignite"><span class="rdcb"><span class="rdkick">${esc(s.k||'')}</span><b class="rdct">${esc(s.t)}</b><span class="rdcd">${esc(s.why||'')}</span><span class="rdgo">Read it in the Great Book of News <span aria-hidden="true">\u2192</span></span></span></a>`).join('')}</div></section>`:'';
 const doors=`<div id="rdai-doors">${doorsHTML()}</div>`;
 const SP=G(()=>SPOT,null);
 const uses=`<section class="rdai-sec" aria-labelledby="rdai4">${secH('Use cases','Real work, done with AI: ready-made scenarios for the public sector, and stories of people using AI in their jobs.','rdai4')}<div class="rdgrid">${SP&&SP.u?`<a class="rdcard rdmore" href="${esc(SP.u)}" target="_blank" rel="noopener"><span class="rdart rdnoart" aria-hidden="true">${ico('auto')}</span><span class="rdcb"><span class="rdkick">${esc(SP.kicker||'Spotlight')}</span><b class="rdct">${esc(SP.title)}</b><span class="rdcd">${esc(SP.lede||'')}</span><span class="rdgo">${esc(SP.cta||'Open it')} <span aria-hidden="true">\u2197</span></span></span></a>`:''}${cardHTML('ai-and-copilot/live-flowers')}${catCard}</div></section>`;
 const tech=`<section class="rdai-sec" aria-labelledby="rdai5">${secH('Technical guidance','How it works underneath: where your data goes, how AI is paid for, and how the products fit together.','rdai5')}<div class="rdgrid rd3">${['wonderland/rabbit-hole','wonderland/hall-of-doors','wonderland/tea-party'].map(xpCard).join('')}</div></section>`;
 const ps=`<section class="rdai-sec" aria-labelledby="rdai6">${secH('Public sector','What governments in Australia and the UK are doing with AI, and what this issue means for Queensland agencies.','rdai6')}<div class="rdgrid rd3">${moreCard({k:'ai-and-copilot/caucus-race',t:'The Caucus Race',art:'race',d:`${G(()=>PS.length,0)} stories from governments in Australia and the UK, each with a line for Queensland.`,go:'Join the race'})}${moreCard({t:'The Duchess\u2019s briefing',art:'whitsundays',d:'This week for Queensland agencies: the biggest risk, the biggest opportunity, the decision needed and the date to watch.',attr:'data-rdgo="this-week" data-rdx2="#agbrief"',go:'Read the briefing'})}${moreCard({k:'governance',t:'The Queen\u2019s Court',art:'court2',d:'Royal decrees for IT, Finance, Legal and Security, with playbooks and templates.',go:'Enter the court'})}</div></section>`;
 return `<section class="rdidx rdai" aria-labelledby="rdh1">${hero}${topics}${shifts}${doors}${uses}${tech}${ps}</section>`}
K.views.ai={html:aiHTML,after:(k,root)=>{{const dz=$('#rdai-doors',root);if(dz&&!dz.innerHTML&&window.ccGarden)window.ccGarden().then(()=>{if(dz.isConnected&&!dz.innerHTML)dz.innerHTML=doorsHTML()}).catch(()=>{})}if(root._rdai)return;root._rdai=1;root.addEventListener('click',e=>{const t=e.target.closest('[data-rdtile]');if(t){const o=$(`#tiles [data-open="${t.dataset.rdtile}"]`);if(o)o.click();return}
 const s=e.target.closest('[data-rdschool]');if(s){e.preventDefault();schGo(s.dataset.rdschool)();return}
 const g2=e.target.closest('[data-rdgo]');if(g2){go(g2.dataset.rdgo,{x:g2.dataset.rdx2||''})}})}};
/* the same pointers work on the hub and the learning pages too (the listener lives on the page area, once) */
K.views.hub.after=K.views.ai.after;

/* ---------- Phase 4: Learning & Resources, the library ---------- */
const LT=[['all','Everything'],['start','Start with the basics'],['every','Use Copilot every day'],['agents','Agents and extras'],['rollout','Roll out and govern'],['classes','Join a class'],['look','Look it up']];
const ROOM={'mts-term':'start','mts-terms':'start','mts-time':'every','mts-lesson':'every','mts-doors':'every','mts-book':'every','mts-extras':'agents','mts-knight':'agents','mts-board':'agents','mts-plan':'rollout','mts-stage':'rollout','mts-plans':'rollout','mts-dance':'rollout','mts-class':'classes'};
function schGo(sub){return ()=>{if(gar()){go('learning/school',{});later(()=>{if(window.ccGo)window.ccGo('school|'+sub)},450)}else{window.CC_RD_SCHSUB=sub;go('learning/school',{})}}}
function learnItems(){const L=[],g=gar(),N={},P={};G(()=>SCHOOL.on.opts,[]).forEach(x=>N[x.id]=x.t);G(()=>SCHOOL.personas,[]).forEach(x=>P[x.id]=x.t);
 const sch=schGo;const og=!g;
 const TM=G(()=>SCHOOL.term,null);if(TM){L.push({tp:'start',ty:'School',t:`${TM.k}: ${TM.t}`,d:TM.p||'',m:[(TM.lessons||[]).length?`${TM.lessons.length} short lessons`:''],go:sch('mts-term'),other:og});
  (TM.lessons||[]).forEach(x=>L.push({tp:'start',ty:'Lesson',t:x.t,d:x.p||x.d||x.what||'',m:[TM.k+(x.n?`, lesson ${x.n}`:''),x.mins?`${x.mins} min`:''],go:sch('mts-term'),other:og}))}
 [G(()=>SCHOOL.everyone,null),G(()=>SCHOOL.lesson,null)].forEach(x=>{if(!x||!x.t)return;L.push({tp:x.kind==='extra'?'agents':'every',ty:'This issue\u2019s lesson',t:x.t,d:x.why||'',m:[x.mins?`${x.mins} min`:'',P[x.persona]?`For: ${P[x.persona]}`:'',N[x.need]?`Needs: ${N[x.need]}`:''],go:sch('mts-lesson'),other:og})});
 G(()=>SCHOOL.lessons,[]).forEach(x=>L.push({tp:x.kind==='extra'?'agents':'every',ty:'Lesson',t:x.t,d:'',m:[x.issue?`Issue ${x.issue}`:'',x.kind==='extra'?'With extras':'For everyone'],go:sch('mts-time'),other:og}));
 const GL=G(()=>GARDEN.lessons,null),GT=G(()=>GARDEN.gterms,{})||{};if(GL)Object.keys(GL).forEach(id=>{const x=GL[id];L.push({tp:x.term==='first'?'start':'every',ty:'Term lesson',t:x.t,d:x.what||x.sub||'',m:[x.mins?`${x.mins} min`:'',N[x.need]?`Needs: ${N[x.need]}`:'',(GT[x.term]||{}).n||''],go:sch('mts-terms'),other:og})});
 (window.ccWay&&window.ccWay.parts?window.ccWay.parts('school'):[]).forEach(x=>{const sub=String(x.to).split('|')[1];if(g&&x.side==='glass')return;L.push({tp:ROOM[sub]||'every',ty:'School room',t:x.lab,d:'',m:[],go:sch(sub),other:og})});
 Object.keys(G(()=>SCHOOL.classes,{})||{}).forEach(k=>{const c=SCHOOL.classes[k]||{};(c.rows||[]).forEach(r=>L.push({tp:'classes',ty:'Class',t:r.t,d:r.d||'',m:[r.when||'',r.st==='open'?'Open to join':''],go:sch('mts-class'),other:og}))});
 if(!g){G(()=>AGENCY.playbooks,[]).forEach(p=>L.push({tp:'rollout',ty:'Playbook',t:p.t,d:p.lede||'',m:[],go:()=>window.ccAgency&&window.ccAgency.openPB(p.id)}));
  G(()=>AGENCY.templates,[]).forEach(p=>L.push({tp:'rollout',ty:'Template',t:p.t,d:p.use||'',m:[],go:()=>window.ccAgency&&window.ccAgency.openTPL(p.id)}))}
 L.push({tp:'look',ty:'Reference',t:'The Dodo\u2019s dictionary',d:'Curious words, explained in plain English.',m:[G(()=>GLOSSARY.length,0)?`${GLOSSARY.length} words`:''],go:()=>window.ccGo&&window.ccGo('act:dict')});
 L.push({tp:'look',ty:'Reference',t:'Past issues',d:'Every earlier issue of Curiouser and Curiouser.',m:[],go:()=>window.ccGo&&window.ccGo('act:past')});
 L.push({tp:'look',ty:'Reference',t:'Sources for this issue',d:'Every public source this issue draws on.',m:[],go:()=>go('sources',{})});
 if(!g)L.push({tp:'look',ty:'Reference',t:'One-page briefing',d:'This issue on one page, to print or save as a PDF.',m:[],go:()=>window.ccGo&&window.ccGo('act:brief')});
 return L.map(x=>Object.assign(x,{m:(x.m||[]).filter(Boolean).concat(x.other?['In the garden']:[])}))}
function learnHTML(){return `<section class="rdidx rdlearn" aria-labelledby="rdh1">${heroHTML({img:heroOf('school'),kick:'Section',title:'Learning & Resources',text:vd('learning')})}
 <div class="rdlib"><div class="rdlib-bar"><div class="rdlib-chips" role="group" aria-label="Browse by topic and goal"></div><label class="rdlib-q"><span class="rdvh">Search the library</span><input type="search" placeholder="Search the library" id="rdlibq" autocomplete="off"></label></div>
 ${gar()?'':'<p class="rdlib-note">The School lives in the garden, the side written for people who use AI at work. Its lessons, rooms and classes are listed here, and open when you step across.</p>'}<p class="rdlib-n" aria-live="polite"></p><ul class="rdlist rdlib-list"></ul></div></section>`}
K.views.learn={html:learnHTML,after:(k,root)=>{let L=learnItems(),tp='all',qq='';const chips=$('.rdlib-chips',root),list=$('.rdlib-list',root),cnt=$('.rdlib-n',root),inp=$('#rdlibq',root);
 const norm=s=>String(s||'').toLowerCase();
 const drawChips=()=>{chips.innerHTML=LT.map(([id,t])=>{const n=id==='all'?L.length:L.filter(x=>x.tp===id).length;return n?`<button type="button" class="rdchip2${tp===id?' on':''}" data-lt="${id}" aria-pressed="${tp===id}">${esc(t)} <em>${n}</em></button>`:''}).join('')};
 const draw=()=>{const Q=norm(qq).trim(),V=L.map((x,i)=>[x,i]).filter(([x])=>(tp==='all'||x.tp===tp)&&(!Q||norm(x.t+' '+x.d+' '+x.ty+' '+x.m.join(' ')).includes(Q)));
  cnt.textContent=`${V.length} of ${L.length} in the library`;
  list.innerHTML=V.map(([x,i])=>`<li><button type="button" class="rdli${x.other?' rdother':''}" data-li="${i}"><span class="rdty">${esc(x.ty)}</span><span class="rdlb"><b>${esc(x.t)}</b>${x.d?`<small>${esc(x.d)}</small>`:''}${x.m.length?`<span class="rdmeta">${x.m.map(m=>`<span>${esc(m)}</span>`).join('')}</span>`:''}</span><span class="rdla" aria-hidden="true">\u2192</span></button></li>`).join('')||'<li class="rdwait">Nothing in the library matches. Try another word, or Everything.</li>'};
 drawChips();draw();
 chips.addEventListener('click',e=>{const b=e.target.closest('[data-lt]');if(!b)return;tp=b.dataset.lt;drawChips();draw()});
 let qT=0;inp.addEventListener('input',()=>{clearTimeout(qT);qT=setTimeout(()=>{qq=inp.value;draw()},90)});
 list.addEventListener('click',e=>{const b=e.target.closest('[data-li]');if(!b)return;const x=L[+b.dataset.li];if(x&&x.go)x.go()});
 /* the garden's term lessons travel in the garden's own file: fetch it quietly, then add them */
 if(typeof GARDEN==='undefined'&&window.ccGarden)window.ccGarden().then(()=>{if(!list.isConnected)return;L=learnItems();drawChips();draw()}).catch(()=>{});K.views.ai.after(k,root)}};

/* ---------- the frames, put in place when their page opens ---------- */
K.frame=(k,c,virt)=>{if(virt||gar())return;const r=RT[k]||{};if(r.xp&&XD[c])buildX(c,k);if(c==='court')buildTopics()};
addEventListener('cc-side',()=>{/* frames are for the looking-glass side; the garden shows each story's door */});
})();

window.ccRdBoot&&window.ccRdBoot();
