var _yr=document.getElementById('yr'); if(_yr)_yr.textContent=new Date().getFullYear();

/* ---------- language ---------- */
var LANGS=['en','es','de','zh'];
function detectLang(){
  try{var s=localStorage.getItem('lang'); if(s&&LANGS.indexOf(s)>-1)return s;}catch(e){}
  var cands=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||'en'];
  for(var i=0;i<cands.length;i++){var p=(cands[i]||'').toLowerCase().slice(0,2); if(LANGS.indexOf(p)>-1)return p;}
  return 'en';
}
function setLang(l){
  if(LANGS.indexOf(l)<0)l='en';
  var h=document.documentElement;
  h.setAttribute('data-lang',l); h.setAttribute('lang',l);
  try{localStorage.setItem('lang',l);}catch(e){}
  var cur=document.querySelector('.lang-cur');
  var li=document.querySelector('.lang-menu li[data-lang="'+l+'"]');
  if(cur&&li)cur.innerHTML=li.innerHTML;
  var m=document.querySelector('.lang-menu'); if(m)m.classList.remove('open');
  var b=document.querySelector('.lang-btn'); if(b)b.setAttribute('aria-expanded','false');
}
function pickLang(l){setLang(l);}
function toggleLangMenu(btn){
  var m=document.querySelector('.lang-menu'); if(!m)return;
  var open=m.classList.toggle('open');
  btn.setAttribute('aria-expanded', open?'true':'false');
}
document.addEventListener('click',function(e){
  if(!e.target.closest('.lang-dd')){var m=document.querySelector('.lang-menu'); if(m)m.classList.remove('open');}
});

/* ---------- theme ---------- */
function detectTheme(){
  try{var s=localStorage.getItem('theme'); if(s==='light'||s==='dark')return s;}catch(e){}
  return (window.matchMedia&&matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark';
}
function setTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  try{localStorage.setItem('theme',t);}catch(e){}
  var mc=document.querySelector('meta[name="theme-color"]'); if(mc)mc.setAttribute('content', t==='light'?'#f5f2fc':'#0a0713');
}
function toggleTheme(){setTheme(document.documentElement.getAttribute('data-theme')==='light'?'dark':'light');}

/* ---------- init ---------- */
setTheme(detectTheme());
setLang(detectLang());

/* ---------- hero photo crossfade ---------- */
(function(){
  var pf=document.querySelectorAll('.hero-photo .pf'); if(pf.length<2)return;
  var i=0;
  setInterval(function(){pf[i].classList.remove('active'); i=(i+1)%pf.length; pf[i].classList.add('active');},5000);
})();

/* ---------- reveal on scroll ---------- */
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el);});
  /* safety: reveal anything already on screen or if something goes wrong */
  setTimeout(function(){var vh=innerHeight||document.documentElement.clientHeight;document.querySelectorAll('.reveal:not(.in)').forEach(function(el){if(el.getBoundingClientRect().top<vh)el.classList.add('in');});},400);
}else{
  document.querySelectorAll('.reveal').forEach(function(el){el.classList.add('in');});
}

/* ---------- close mobile menu on link click ---------- */
document.querySelectorAll('.nav-links a').forEach(function(a){a.addEventListener('click',function(){var n=document.querySelector('.nav-links'); if(n)setTimeout(function(){n.classList.remove('open');},340);});});

/* ---------- energy-transfer particle canvas ---------- */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var c=document.getElementById('energy'); if(!c)return; var x=c.getContext('2d');
  var w,h,parts,DPR=Math.min(window.devicePixelRatio||1,2);
  var COLORS=['#7c3aed','#d946ef','#4f46e5','#a855f7','#6453a1'];
  function init(){
    var area=innerWidth*innerHeight;
    var n=Math.max(30,Math.min(95,Math.round(area/11000)));
    parts=[];
    for(var i=0;i<n;i++){parts.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35*DPR,vy:(Math.random()-.5)*.35*DPR,r:(Math.random()*2+1.1)*DPR,col:COLORS[i%COLORS.length]});}
  }
  function resize(){w=c.width=innerWidth*DPR;h=c.height=innerHeight*DPR;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';init();}
  function step(){
    x.clearRect(0,0,w,h);
    var max=Math.min(w,h)*0.22;
    for(var i=0;i<parts.length;i++){
      var p=parts[i]; p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1;
      for(var j=i+1;j<parts.length;j++){
        var q=parts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);
        if(d<max){var g=x.createLinearGradient(p.x,p.y,q.x,q.y);g.addColorStop(0,p.col);g.addColorStop(1,q.col);x.strokeStyle=g;x.globalAlpha=(1-d/max)*.45;x.lineWidth=1.1*DPR;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke();}
      }
    }
    x.globalAlpha=.95;
    for(var k=0;k<parts.length;k++){var pp=parts[k];x.beginPath();x.arc(pp.x,pp.y,pp.r,0,7);x.fillStyle=pp.col;x.fill();}
    x.globalAlpha=1;
    if(!reduce)requestAnimationFrame(step);
  }
  var lastW=innerWidth;
  addEventListener('resize',function(){
    // ignore height-only changes (mobile address bar show/hide during scroll)
    if(innerWidth===lastW)return;
    lastW=innerWidth; resize();
  });
  addEventListener('orientationchange',function(){lastW=innerWidth; resize();});
  resize(); step();
})();

/* ---------- generic carousels (team photos, group banner) ---------- */
document.querySelectorAll('.carousel').forEach(function(c){
  var s=c.querySelectorAll('.cslide'); if(s.length<2)return;
  var i=0;
  setInterval(function(){s[i].classList.remove('active'); i=(i+1)%s.length; s[i].classList.add('active');}, 4000+Math.random()*1600);
});

/* ---------- nav link tap/click energy pulse ---------- */
document.querySelectorAll('.nav-links a').forEach(function(a){
  a.addEventListener('pointerdown',function(){/*navtap*/ a.classList.remove('tap'); void a.offsetWidth; a.classList.add('tap'); setTimeout(function(){a.classList.remove('tap');},520);});
});

/* ---------- hero CTA button click pulse ---------- */
document.querySelectorAll('.hero-cta .btn').forEach(function(b){
  b.addEventListener('pointerdown',function(){b.classList.remove('pulse'); void b.offsetWidth; b.classList.add('pulse'); setTimeout(function(){b.classList.remove('pulse');},560);});
});

/* ---------- nav submenus ---------- */
function toggleSub(btn){
  var g = btn.parentNode.parentNode, was = g.classList.contains('open');
  document.querySelectorAll('.navgroup.open').forEach(function(o){ o.classList.remove('open'); });
  if(!was) g.classList.add('open');
}
document.addEventListener('click', function(e){
  if(!e.target.closest || !e.target.closest('.navgroup')){
    document.querySelectorAll('.navgroup.open').forEach(function(o){ o.classList.remove('open'); });
  }
});
