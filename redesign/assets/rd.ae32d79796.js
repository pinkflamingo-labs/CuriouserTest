window.CC_RD_ART={"alice":"assets/rdc-alice.a5c8d09229.webp","clockmaker":"assets/rdc-clockmaker.977e029280.webp","court2":"assets/rdc-court2.051d22cec3.webp","daintree":"assets/rdc-daintree.8d6c5b89ba.webp","glasshouse":"assets/rdc-glasshouse.4100f7ac57.webp","hall":"assets/rdc-hall.4169ad6048.webp","hole":"assets/rdc-hole.184459dbb2.webp","ignite":"assets/rdc-ignite.364c4d1570.webp","jacaranda":"assets/rdc-jacaranda.7cc3201164.webp","moreton":"assets/rdc-moreton.39f925aea2.webp","outback":"assets/rdc-outback.c1ac889dd3.webp","race":"assets/rdc-race.456a3c77dd.webp","school":"assets/rdc-school.25271dd261.webp","whitsundays":"assets/rdc-whitsundays.d6f3d2661e.webp"};window.CC_RD_HERO={"glasshouse":"assets/pano-glasshouse.dc405e0bf1.webp","race":"../assets/pano-race.94fe5f5152.webp","school":"assets/rdh-school.a363d8a3aa.webp","whitsundays":"../assets/pano-whitsundays.0f71faad13.webp"};window.CC_RD_IMG={"garden":"../assets/ixa-garden-m.11acc006eb.webp","rabbit":"../assets/bfx-cmrabbit.e554a700b9.webp","cat":"../assets/spr-guest-caterpillar.4c404a9baa.webp","key":"assets/rd-key.8f0593e5f5.webp"};
/* ===== Wonderland redesign, phase 1 (20 November 2026, Charlie): one navigation for the whole site =====
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
const small=()=>matchMedia('(max-width:1180px)').matches;
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
  d:'What is new this fortnight, the key dates and the Ignite special.',dg:'The Pocket Watch Edition, the key dates and what changed at Ignite.'},
 {k:'roadmap',lab:'Roadmap',ic:'bottle',items:['roadmap','roadmap/horizon'],
  d:'The roadmap explorer and what is on the horizon.',dg:'What is coming to the apps you use.'},
 {k:'ai-and-copilot',lab:'AI & Copilot',ic:'thimble',items:['ai-and-copilot','ai-and-copilot/caucus-race','ai-and-copilot/live-flowers','ai-and-copilot/questions'],
  d:'The Caucus Race: what governments in Australia and the UK are doing with AI.',dg:'Stories of people using AI at work, and the questions people ask.'},
 {k:'governance',lab:'Governance',ic:'crown',glass:1,items:['governance','governance/playbooks','governance/templates','governance/how-we-decide'],
  d:'The Queen\u2019s Court: royal decrees, playbooks, templates and how we decide.'},
 {k:'wonderland',lab:'Explore Wonderland',short:'Wonderland',ic:'hole',keep:1,items:['wonderland','wonderland/tea-party','wonderland/caterpillar','wonderland/rabbit-hole','wonderland/hall-of-doors'],
  d:'Four interactive stories: the Tea Party, the Caterpillar, the Rabbit Hole and the Hall of Doors.',dg:'Four interactive stories, through the looking-glass: the Tea Party, the Caterpillar, the Rabbit Hole and the Hall of Doors.'},
 {k:'learning',lab:'Learning & Resources',short:'Learning',ic:'turtle',items:['learning','learning/school','sources'],
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
const VD={'ai-and-copilot':['The Caucus Race and the other AI and Copilot pages, in one place.','Stories of people using AI at work, and the questions people ask about Copilot.'],
 'wonderland':['Four interactive stories that explain how Microsoft AI works: who sits at the table, how adoption grows, where your data goes and how AI is paid for.','Four interactive stories that explain how Microsoft AI works. They are through the looking-glass: step through to explore them, and come back any time.'],
 'learning':['The School, the Dodo\u2019s dictionary, past issues and every source behind this issue.','Your School, the Dodo\u2019s dictionary, past issues and every source behind this issue.'],
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

function drawNav(){
 rn.innerHTML='<ul class="rdl1">'+secs().map(s=>{const its=itemsOf(s);
  return `<li class="rdi${its.length>1?' hasdd':''}${s.short?' hasshort':''}" data-sec="${s.k}"><a class="rda" href="#/${s.k}"><span class="rdic" aria-hidden="true">${ico(s.ic)}</span><span class="rdtl">${esc(s.lab)}</span>${s.short?`<span class="rdts" aria-hidden="true">${esc(s.short)}</span>`:''}<span class="rdb l" hidden></span><span class="rdb s" hidden></span></a>${its.length>1?`<button type="button" class="rddd" aria-expanded="false" aria-controls="rddd-${s.k}" aria-label="${esc(s.lab)} pages">${SV.caret}</button><div class="rdpop rddrop" id="rddd-${s.k}" hidden><p class="rdpd">${esc(secD(s))}</p><ul>${its.map(k=>itemHTML(k)).join('')}</ul></div>`:''}</li>`}).join('')+'</ul>';
 mp.innerHTML=`<div class="rdmh"><b>Where would you like to go?</b><button type="button" class="rdib" data-rdclose aria-label="Close the menu">${SV.close}</button></div><a class="rdmhome" href="#/">Home</a>`+secs().map(s=>`<section class="rdmg"><h3><a href="#/${s.k}"><span class="rdic" aria-hidden="true">${ico(s.ic)}</span>${esc(s.lab)}</a></h3><ul>${itemsOf(s).filter(k=>k!==s.k).map(k=>itemHTML(k,1)).join('')}</ul></section>`).join('')+`<div class="rdmx"><button type="button" class="rdbtn" data-rdx="tour">Take the tour</button><button type="button" class="rdbtn" data-rdx="side">Choose your side</button><button type="button" class="rdbtn" data-rdx="intro">About this side</button></div>`;
 drawFoot();navOn(cur);badges()}
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

/* the brand takes you home */
document.addEventListener('click',e=>{if(!e.target.closest('#brandBtn'))return;e.preventDefault();e.stopImmediatePropagation();go('',{});},true);

/* ---------- 4. the top of every page: breadcrumb and the parts of the page ---------- */
const top=document.createElement('div');top.id='rdtop';top.className='rdtop';top.tabIndex=-1;
top.innerHTML='<div class="rdtopl"><nav class="rdcrumb" aria-label="Breadcrumb"><ol></ol></nav><span class="rded"></span></div><nav class="rdparts" aria-label="On this page" hidden></nav>';
{const is=$('#brandBtn .iss');$('.rded',top).textContent=is?is.textContent.trim():''}
panels.insertBefore(top,panels.firstChild);
const vp=document.createElement('div');vp.id='rdpage';vp.className='rdpage';vp.hidden=true;panels.insertBefore(vp,top.nextSibling);
function crumbs(k){const ol=$('.rdcrumb ol',top),r=RT[k]||{};top.classList.toggle('rdhome',!k);if(!k){ol.innerHTML='';return}
 const S=SEC.find(s=>s.k===r.s),L=[['','Home']];if(S&&k!==S.k&&!(S.glass&&gar()))L.push([S.k,S.lab]);
 ol.innerHTML=L.map(([kk,l])=>`<li><a href="#/${kk}">${esc(l)}</a></li>`).join('')+`<li><span aria-current="page">${esc(S&&k===S.k?S.lab:(mlab(k)||r.t))}</span></li>`}
function partsRow(k,c,virt){const el=$('.rdparts',top);el.innerHTML='';el.hidden=true;el._p=null;
 if(virt||(RT[k]&&RT[k].view)||!c||/^(court|school|journey)$/.test(c)||!window.ccWay||!window.ccWay.parts)return;
 const P=(window.ccWay.parts(c)||[]).filter(x=>!x.side||x.side===side());if(P.length<2)return;
 el._p=P;el.innerHTML='<span class="rdpl">On this page</span>'+P.map((x,i)=>`<button type="button" class="rdchip" data-rdpart="${i}">${esc(x.lab)}</button>`).join('');el.hidden=false}
top.addEventListener('click',e=>{const b=e.target.closest('[data-rdpart]');if(!b)return;const P=$('.rdparts',top)._p;const x=P&&P[+b.dataset.rdpart];if(x&&window.ccGo)window.ccGo(x.to)});
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
function drawV(k){const r=RT[k]||{};clearV();
 vp.innerHTML=r.v==='index'?indexHTML(k):r.v==='sources'?sourcesHTML():doorHTML(k);
 if(r.v==='sources'){const g=$('#srcgrid');if(g){$('#rdsrcslot').appendChild(g);srcMoved=true}}}
vp.addEventListener('click',e=>{const s=e.target.closest('[data-rdside]');if(s&&window.ccSetSide){window.ccSetSide(s.dataset.rdside,{how:'nav'});return}
 const a=e.target.closest('[data-rdact]');if(a&&window.ccGo){e.preventDefault();e.stopPropagation();const x=a.dataset.rdact;setTimeout(()=>window.ccGo('act:'+x),40)}});

/* ---------- 6. the footer: the sections, and the sources on their own page ---------- */
const fn=document.createElement('nav');fn.className='rdfoot';fn.setAttribute('aria-label','Site');
function drawFoot(){if(!foot)return;fn.innerHTML=`<a href="#/">Home</a>${secs().map(s=>`<a href="#/${s.k}">${esc(s.lab)}</a>`).join('')}<a href="#/sources">Sources for this issue</a>`}
if(foot){foot.insertBefore(fn,foot.firstChild);const h3=foot.querySelector(':scope > h3');if(h3&&h3.nextElementSibling&&h3.nextElementSibling.id==='srcgrid')h3.classList.add('rdgone')}
/* the sources move to their own page; until it is opened they wait out of sight */
{const g=$('#srcgrid');if(g&&foot){const park=document.createElement('div');park.id='rdpark';park.hidden=true;document.body.appendChild(park);park.appendChild(g)}}

/* ---------- 7. the router ---------- */
let cur=null,busy=0,ready=false;
function saveY(){try{history.replaceState(Object.assign({},history.state||{},{y:Math.round(scrollY)}),'')}catch(e){}}
function go(k,o){o=o||{};if(!RT.hasOwnProperty(k))k='';saveY();const h='#/'+k;
 if(location.hash!==h){try{history.pushState({rd:k},'',h)}catch(e){}}render(k,o)}
function render(k,o){o=o||{};const r=RT[k]||RT[''],c=chOf(k),virt=!!r.v||c===null;cur=k;closeAll();
 R.classList.toggle('rdv',virt);R.dataset.rdv=virt?'':(r.view||'');R.classList.toggle('rdstill',!virt&&r.lead==='still');
 if(virt){vp.hidden=false;drawV(k)}
 else{const L=window.ccRdKit&&window.ccRdKit.lead&&r.lead?window.ccRdKit.lead[r.lead]:null;if(L){clearV();vp.innerHTML=L(k);vp.hidden=false}else{clearV();vp.hidden=true}busy++;try{
  if(r.sub&&!r.root&&window.ccGo)window.ccGo('court|'+r.sub);
  else{if(curTab()!==c&&window.ccShowTab)window.ccShowTab(c);
   if(r.root&&r.sub&&window.ccAgency&&window.ccAgency.cSub&&window.ccAgency.cSub()!==r.sub)window.ccAgency.setCSub(r.sub,false);
   if(r.a&&o.y==null&&window.ccGo)window.ccGo(c+'#'+r.a.slice(1))}}catch(e){}finally{busy--}
  if(r.view==='week')$$('#p-overview .reveal').forEach(x=>x.classList.add('in'))}
 crumbs(k);navOn(k);partsRow(k,c,virt);title(k);
 if(o.initial){if(o.x)later(()=>jump(o.x),700);return}
 if(o.hook)return;
 if(o.y!=null){const y=o.y;requestAnimationFrame(()=>window.scrollTo({top:y,behavior:'instant'}));later(()=>window.scrollTo({top:y,behavior:'instant'}),120)}
 else if(o.x)later(()=>jump(o.x),300);
 else if(!(r.sub&&!r.root)&&!r.a)window.scrollTo({top:0,behavior:'instant'});
 try{const f=$('#rdh1',vp)&&!vp.hidden?$('#rdh1',vp):top;if(f)f.focus({preventScroll:true})}catch(e){}}
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
window.ccRdGo=k=>go(k,{});
function ovRoute(el){const b=el&&el.closest('#p-overview > *');if(!b||gar())return '';if(b.matches('#rmall,#kpis,.phead'))return 'roadmap';if(b.matches('#ccprov,.ccact,.pbanner'))return '';return 'this-week'}
document.addEventListener('click',e=>{const j=e.target.closest('[data-jump]');if(!j)return;const el=document.getElementById(j.dataset.jump);if(!el||!el.closest('#p-overview'))return;
 e.preventDefault();e.stopImmediatePropagation();const k=ovRoute(el);if(k===cur){jump('#'+el.id);return}go(k,{x:'#'+el.id})},true);
let yT=0;addEventListener('scroll',()=>{clearTimeout(yT);yT=setTimeout(saveY,400)},{passive:true});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#/"]');if(a){saveY();closeAll()}},true);
/* a change of side redraws the menus, and the page if it belongs to one side only */
addEventListener('cc-side',()=>{drawNav();if(cur!==null)render(cur,{y:scrollY})});

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
 $$('.rdi',rn).forEach(li=>{const s=li.dataset.sec,a=$('.rdb.l',li),b=$('.rdb.s',li);if(a){a.hidden=!L[s];a.textContent=L[s]||'';a.title=L[s]?`${L[s]} for your role`:''}if(b){b.hidden=!S[s];b.textContent=S[s]||'';b.title=S[s]?`${S[s]} for your part of the sector`:''}})}
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
addEventListener('resize',()=>{navH();if(!np.hidden)placeNew();if(R.classList.contains('rdsopen'))placeSF();if(!res.hidden)placeRes();if(!small())closeMenu(false)});
window.ccRdKit={R,$,$$,esc,ico,gar,info,mlab,artOf,sceneOf,SEC,RT,chOf,cardHTML,GOW,go};
window.ccRdBoot=()=>{drawNav();navH();
{const P=window.CC_RD_P||{k:''};const k=RT.hasOwnProperty(P.k)?P.k:'';
 if(!P.keep&&(k||location.hash)){try{history.replaceState({rd:k},'','#/'+k)}catch(e){}}
 render(k,{initial:1,x:P.x});ready=true;later(navH,600)}};
})();

/* ===== Wonderland redesign, phase 2 (20 November 2026, Charlie): Home, still page headers and the views =====
   Home is a gateway: the title, three pathways, This Week at a Glance (the headline five), the Curiosity Meter, the four
   Wonderland stories and the next events, all drawn from the issue's own data (TOP5, TILES, ROADMAP, HORIZON, EVENTS), then
   At a glance's own tools and the plaque below. Information pages get a still header with their painting (nothing moves).
   This runs inside rd.js (it is joined onto its end at build time) and uses rd.js's helpers through window.ccRdKit. */
(function(){
const K=window.ccRdKit;if(!K)return;
const {R,$,esc,ico,gar,info,mlab,artOf,sceneOf,SEC,RT,chOf,cardHTML,GOW}=K;
const IMG=window.CC_RD_IMG||{};
const D={tiles:()=>typeof TILES!=='undefined'&&Array.isArray(TILES)?TILES:[],rm:()=>typeof ROADMAP!=='undefined'&&Array.isArray(ROADMAP)?ROADMAP:[],
 hz:()=>typeof HORIZON!=='undefined'&&Array.isArray(HORIZON)?HORIZON:[],ev:()=>typeof EVENTS!=='undefined'&&Array.isArray(EVENTS)?EVENTS:[],
 iss:()=>typeof ISSUE!=='undefined'?ISSUE:{},prov:()=>typeof PROV!=='undefined'?PROV:{},top:()=>Array.isArray(window.TOP5)?window.TOP5:[]};
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
function path(o){const inner=`<img src="${esc(o.img||'')}" alt="" decoding="async"><span><b>${o.t}</b><small>${o.d}</small></span><i aria-hidden="true">\u2192</i>`;
 return o.href?`<a class="rdh-path" href="${o.href}">${inner}</a>`:`<button type="button" class="rdh-path" ${o.attr}>${inner}</button>`}
function homeHTML(){const I=D.iss(),P=D.prov(),g=gar(),lab=I.label||I.lab||'';
 const hero=`<div class="rdh-hero"${IMG.garden?` style="background-image:url('${esc(IMG.garden)}')"`:''}><div class="rdh-plaque">
  <p class="rdh-kick">Microsoft AI &amp; Modern Work${lab?` \u00b7 ${esc(lab)}`:''}</p><h1 id="rdh1" tabindex="-1">Curiouser &amp; Curiouser</h1>
  <p class="rdh-tag">Your journey through what\u2019s new, what\u2019s next and what matters in Microsoft AI.</p>
  <p class="rdh-pills">${I.range?`<span>${ico('watch')}${esc(I.range)}</span>`:''}${P.community?`<span>${ico('crown')}${esc(P.community)}</span>`:''}</p></div></div>`;
 const paths=`<div class="rdh-paths">${path({img:IMG.rabbit,t:'The Two-Minute Briefing',d:'Just tell me what matters this week.',attr:g?'data-jump="gd-overview"':'data-act="pocket"'})}${path({img:IMG.cat,t:'Explore What\u2019s Relevant to Me',d:'Find the updates, guidance and resources that matter to you.',attr:'data-rdact="lens"'})}${path({img:IMG.key,t:'Explore Wonderland',d:'Discover the stories, characters and adventures behind Microsoft AI.',href:'#/wonderland'})}</div>`;
 if(g)return `<section class="rdh" aria-labelledby="rdh1">${hero}${paths}</section>`;
 const T=D.top();
 const glance=`<section class="rdh-card rdh-glance" aria-labelledby="rdhg"><header><h2 id="rdhg">This Week at a Glance</h2><p>The five things to know from this issue. Open one for what it means and its source.</p></header>
  <ol class="rdh-list">${T.map((x,i)=>`<li><details><summary><span class="rdn">${i+1}</span><span class="rdt">${esc(x.t)}</span><span class="rdpill" title="Roadmap target">${esc(x.rel||'')}</span></summary><div class="rdh-more"><p>${esc(x.why||'')}</p><p class="rdh-links"><a href="https://www.microsoft.com/en-us/microsoft-365/roadmap?id=${encodeURIComponent(x.id)}" target="_blank" rel="noopener">Roadmap ${esc(x.id)} <span aria-hidden="true">\u2197</span></a><a href="#/this-week">More in This Week <span aria-hidden="true">\u2192</span></a></p></div></details></li>`).join('')}</ol>
  <a class="rdh-all" href="#/this-week">Everything new ${wk()} <span aria-hidden="true">\u2192</span></a></section>`;
 const meter=`<section class="rdh-card rdh-meter" aria-labelledby="rdhm"><header><h2 id="rdhm">The Curiosity Meter</h2><p>Counted from this issue\u2019s updates and Microsoft\u2019s AI at Work Roadmap.</p></header>
  <div class="rdh-stats"><div><b>${D.rm().length}</b><span>roadmap items</span></div><div><b>${byDecember()}</b><span>landing by December</span></div><div><b>${D.hz().length}</b><span>on the horizon</span></div></div>
  <p class="rdh-mb"><a class="rdbtn" href="#/roadmap">Explore the roadmap <span aria-hidden="true">\u2192</span></a></p></section>`;
 const W=['wonderland/tea-party','wonderland/caterpillar','wonderland/rabbit-hole','wonderland/hall-of-doors'];
 const wonder=`<section class="rdh-sec" aria-labelledby="rdhw"><header class="rdh-sech"><h2 id="rdhw">Explore Wonderland</h2><p>Curious minds welcome. Step into a story and explore at your own pace.</p></header><div class="rdgrid rd4">${W.map(x=>cardHTML(x,{go:GOW[x]})).join('')}</div></section>`;
 const ni=nextIssue(),L=nextEvents(3).map(e=>({iso:e.start,h:`<a class="rdh-ev" href="${e.u?esc(e.u):'#/events'}"${e.u?' target="_blank" rel="noopener"':''}><span class="rdd">${esc(dd(e.start))}</span><span><b>${esc(e.t)}</b><small>${esc([...new Set([e.where,e.fmt].filter(Boolean))].join(' \u00b7 '))}</small></span></a>`}));
 if(ni&&ni.iso)L.push({iso:ni.iso,h:`<a class="rdh-ev" href="#/this-week/key-dates"><span class="rdd">${esc(ni.d)}</span><span><b>Issue ${esc(ni.no)} arrives</b><small>${esc(ni.full)}</small></span></a>`});
 const evs=L.sort((a,b)=>a.iso<b.iso?-1:a.iso>b.iso?1:0).slice(0,3).map(x=>x.h).join('');
 const events=`<section class="rdh-card rdh-events" aria-labelledby="rdhe"><h2 id="rdhe"><span aria-hidden="true">${ico('card')}</span>Upcoming Events</h2><div class="rdh-evs">${evs||'<p class="rdh-none">No dated events coming up. See the invitations for monthly sessions.</p>'}</div><a class="rdbtn" href="#/events">View all events <span aria-hidden="true">\u2192</span></a></section>`;
 return `<section class="rdh" aria-labelledby="rdh1">${hero}${paths}<div class="rdh-row">${glance}${meter}</div>${wonder}${events}</section>`}
/* a still header for an information page: its words on the left, its painting whole on the right */
function stillHTML(k){const r=RT[k]||{},S=SEC.find(s=>s.k===r.s),c=chOf(k),root=S&&k===S.k,I=D.iss();
 const title=root?S.lab:(mlab(k)||r.t),img=artOf(sceneOf(c)||'');
 let d=info(k).d;
 if(!gar()&&k==='this-week')d=`The headline five, every update ${wk()} with its source, and what it all means for your agency.`;
 if(!gar()&&k==='roadmap')d='The Curiosity Meter and every roadmap item in this issue, with release targets, filters and links to Microsoft\u2019s AI at Work Roadmap.';
 const kick=root?(I.label||I.lab||''):(S?S.lab:'');
 return `<header class="rdstill"><div class="rdst-t">${kick?`<p class="rdkick">${esc(kick)}</p>`:''}<h1 id="rdh1" tabindex="-1">${esc(title)}</h1><p>${esc(d)}</p></div>${img?`<figure class="rdst-art"><img src="${esc(img)}" alt="" decoding="async"></figure>`:''}</header>`}
K.lead={home:homeHTML,still:stillHTML};
})();

window.ccRdBoot&&window.ccRdBoot();
