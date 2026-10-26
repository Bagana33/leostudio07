'use strict';
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let language = 'mn', activeFilter = 'all', activePiece = 0, activeInfo = 'credits';
let mode = document.documentElement.dataset.mode, classicScroll = 0, switching = false;
let saved = new Set();
try { const value = JSON.parse(localStorage.getItem('leo-studies-traces-of-light') || '[]'); if (Array.isArray(value)) saved = new Set(value.filter(id => pieces.some(p => p.id === id))); } catch {}
const tr = (mn, en) => language === 'mn' ? mn : en;
const src = file => '/' + file.replace(/^\//, '');
const titleOf = piece => piece.name[language];
const typeOf = type => type === 'blue' ? tr('Хувцас', 'Clothing') : tr('Жижиг эдлэл', 'Object');
const editorial = [
  {image:'assets/craft-exposure.jpg',type:'craft',name:{mn:'Гэрэлд дэлгэх нь',en:'Composing with light'}},
  {image:'assets/craft-rinse.jpg',type:'craft',name:{mn:'Усанд тодрох хөх',en:'Blue revealed in water'}},
  {image:'assets/textile-detail.jpg',type:'craft',name:{mn:'Ширхэг бүрд үлдэх дүрс',en:'An image in every thread'}},
  {image:'assets/gift-package.jpg',type:'craft',name:{mn:'Нээх агшин',en:'The moment of opening'}}
];
const media = [pieces[0],editorial[0],pieces[1],editorial[1],pieces[2],editorial[2],pieces[3],editorial[3],pieces[4]];
function setLines(element, value) {
  element.replaceChildren(...value.split('|').flatMap((line, index) => {
    const node = element.classList.contains('caption-code') && index ? document.createElement('em') : document.createTextNode(line);
    if (node.nodeType === 1) node.textContent = line;
    return index ? [document.createElement('br'), node] : [node];
  }));
}
function card(piece) {
  const button = document.createElement('button'); button.type = 'button'; button.className = 'piece-card';
  button.dataset.piece = pieces.indexOf(piece); button.setAttribute('aria-label', titleOf(piece));
  const visual = document.createElement('div'); visual.className = 'piece-visual';
  const img = document.createElement('img'); img.src = src(piece.image); img.alt = titleOf(piece); img.loading = 'lazy'; img.draggable = false; visual.append(img);
  const meta = document.createElement('div'); meta.className = 'piece-meta';
  const code = document.createElement('strong'); code.textContent = 'LEO — ' + piece.id;
  const category = document.createElement('em'); category.textContent = typeOf(piece.type); meta.append(code, category);
  const name = document.createElement('span'); name.className = 'piece-name'; name.textContent = titleOf(piece);
  button.append(visual, meta, name); return button;
}
function renderProducts() {
  const selection = pieces.filter(p => activeFilter === 'all' || p.type === activeFilter);
  $('#product-strip').replaceChildren(...selection.map(card));
  const explore = document.createElement('button'); explore.className = 'explore-card'; explore.dataset.mode = 'experience'; explore.textContent = tr('БҮГДИЙГ НЭЭХ →', 'EXPLORE MORE →');
  $('#product-strip').append(explore); $('#result-count').textContent = String(selection.length).padStart(2, '0');
  $('#one-strip').replaceChildren(...pieces.map(card));
}
function renderSaved() {
  const selection = pieces.filter(p => saved.has(p.id)); $('#saved-count').textContent = selection.length;
  $('#saved-results').replaceChildren(...selection.map(card));
  if (!selection.length) { const p = document.createElement('p'); p.className = 'empty-state'; p.textContent = tr('Бүтээлээ нээгээд “Хадгалах” товчийг дарна уу.', 'Open a study and choose “Save study” to keep it here.'); $('#saved-results').append(p); }
  updateSaveButton();
}
function updateSaveButton() {
  const isSaved = saved.has(pieces[activePiece].id);
  $('#save-piece').textContent = isSaved ? tr('ХАДГАЛСАН ✓ · ХАСАХ', 'SAVED ✓ · REMOVE') : tr('ХАДГАЛАХ +', 'SAVE STUDY +');
  $('#save-piece').setAttribute('aria-pressed', String(isSaved));
}
function renderPiece() {
  const piece = pieces[activePiece]; $('#piece-image').src = src(piece.image); $('#piece-image').alt = titleOf(piece);
  $('#piece-code').textContent = 'LEO — ' + piece.id; $('#piece-category').textContent = typeOf(piece.type);
  $('#piece-title').textContent = titleOf(piece); $('#piece-description').textContent = piece.description[language]; updateSaveButton();
}
function openDialog(id) {
  $$('dialog[open]').forEach(d => d.close()); const dialog = $('#' + id);
  dialog.showModal(); document.body.classList.add('locked');
  $('#menu-open').setAttribute('aria-expanded', String(id === 'menu-dialog'));
}
function openPiece(index) { activePiece = (index + pieces.length) % pieces.length; renderPiece(); openDialog('piece-dialog'); }
function openImage(file, label) { $('#large-image').src = src(file.startsWith('assets/') ? file : 'assets/' + file); $('#large-image').alt = label || tr('LEO STUDIO — концепц дүрслэл', 'LEO STUDIO — concept imagery'); openDialog('image-dialog'); }
function openSearch(query = '') { $('#search-input').value = query; renderSearch(); openDialog('search-dialog'); $('#search-input').focus(); }
function renderSearch() {
  const query = $('#search-input').value.trim().toLocaleLowerCase();
  const selection = pieces.filter(p => [p.id,p.name.mn,p.name.en,p.description.mn,p.description.en,typeOf(p.type),p.type === 'blue' ? 'хувцас clothing look цианотип cyanotype blue хөх' : 'жижиг эдлэл accessories objects'].join(' ').toLocaleLowerCase().includes(query));
  $('#search-results').replaceChildren(...selection.map(card));
  $('#search-status').textContent = selection.length ? tr(`${selection.length} бүтээл олдлоо`, `${selection.length} studies found`) : tr('Илэрц олдсонгүй. “Даашинз”, “алчуур” эсвэл “цүнх” гэж хайгаарай.', 'No studies found. Try “dress”, “scarf” or “tote”.');
}
const infoContent = {
  credits: {"mn": ["ДҮРСЛЭЛИЙН ТУХАЙ", "LEO STUDIO-ийн эх лого болон гүн хөх, дулаан улбар шар өнгийн брэндийн палитрыг ашиглав.", "“Гэрлийн ул мөр” цувралын есөн зураг нь AI-аар бүтээсэн загварын концепц юм. Модел, хувцас, жижиг эдлэл, урлалын үйл явц, материал, савлагааны эдгээр дүрслэл нь бодит бүтээгдэхүүн эсвэл үйлдвэрлэлийн гэрэл зураг биш."], "en": ["ABOUT THE IMAGERY", "The original LEO STUDIO logo and its deep navy and warm peach brand palette are supplied brand assets.", "The nine images in Traces of light are AI-generated design concepts. These fashion, object, making, textile and packaging images are not photographs of manufactured products or actual production."]},
  studies: {"mn": ["ЦУГЛУУЛГЫН ТУХАЙ", "“Гэрлийн ул мөр” нь цианотипийн өнгө, ботаник дүрсийг хувцас болон өдөр тутмын эдлэлтэй холбосон таван загварын концепц. Нэр, тайлбарыг энэ цувралд зориулан боловсруулав.", "Борлуулалт, үнэ, хэмжээ, материалын баталгаатай мэдээлэл хараахан нийтлэгдээгүй. “Хадгалах” товч таны сонголтыг зөвхөн энэ төхөөрөмжид тэмдэглэнэ."], "en": ["ABOUT THE COLLECTION", "Traces of light brings cyanotype blue and botanical forms to five clothing and object concepts. The names and descriptions were developed for this series.", "Sales, pricing, sizing and confirmed material specifications have not been published. Save study keeps your selection on this device only."]},
  help: {mn:['LEO МЭДРЭМЖ','Зургийн ертөнцөөр чирж эсвэл гүйлгэж аялах боломжтой. Компьютер дээр хулганаа зах руу хөдөлгөхөд дүрслэл зөөлөн шилжинэ.','+ / − товчоор томруулж, шүүлтүүрээр төрлөө сонгоно. Зураг дээр дарж дэлгэрүүлэн үзээрэй. Галерейд фокус өгөөд сумтай товчоор мөн шилжиж болно.'],en:['THE LEO EXPERIENCE','Drag or scroll to explore the image canvas. On desktop, moving your pointer toward an edge gently moves the gallery.','Use + / − to zoom and Filters to choose a category. Select an image to view it. Focus the canvas and use the arrow keys to move with a keyboard.']},
  fact: {mn:['ТА МЭДЭХ ҮҮ?','Цианотип нь гэрэлд мэдрэмтгий гадаргуу дээр дүрс үүсгэж, гүн хөх өнгөөр илэрдэг хэвлэлийн арга.','Навч эсвэл өөр биетийг гадаргуу дээр тавихад гэрэлд өртсөн ба халхлагдсан хэсгүүдийн ялгаа дүрс болон үлддэг.'],en:['DID YOU KNOW?','Cyanotype creates an image on a light-sensitive surface, revealing a distinctive deep blue.','A leaf or another object placed on the surface blocks the light. The contrast between exposed and covered areas forms the image.']}
};
function renderInfo() { const [title,...paragraphs] = infoContent[activeInfo][language]; $('#info-title').textContent = title; $('#info-body').replaceChildren(...paragraphs.map(text => {const p=document.createElement('p');p.textContent=text;return p;})); }
function showInfo(key) { activeInfo = key; renderInfo(); openDialog('info-dialog'); }
const categories = [
  {mn:'ХУВЦАС',en:'CLOTHING',image:'look-dress.jpg',filter:'blue'},
  {mn:'ЖИЖИГ ЭДЛЭЛ',en:'OBJECTS',image:'object-scarf.jpg',filter:'line'},
  {mn:'МАТЕРИАЛ',en:'MATERIAL',image:'textile-detail.jpg'},
  {mn:'ХЭЛБЭР',en:'SILHOUETTE',image:'look-coat.jpg'},
  {mn:'ӨДРИЙН ЦЭНХЭР',en:'DAYLIGHT BLUE',image:'look-shirt.jpg',filter:'blue'},
  {mn:'УРЛАХУЙ',en:'THE CRAFT',image:'craft-exposure.jpg'},
  {mn:'ӨДӨР БҮР',en:'EVERYDAY',image:'object-tote.jpg',filter:'line'},
  {mn:'БЭЛЭГ',en:'GIFTING',image:'gift-package.jpg'}
];
function renderCategories() {
  $('.category-strip').replaceChildren(...categories.map((item,index) => {
    const button=document.createElement('button');button.className='category-card'+(index===0?' active':'');
    const image=document.createElement('div');image.className='category-image';const img=document.createElement('img');img.src='/assets/'+item.image;img.alt=item[language];img.loading='lazy';img.draggable=false;image.append(img);
    const h=document.createElement('h3');h.textContent=item[language];const s=document.createElement('span');s.textContent=tr('НЭЭХ →','EXPLORE →');button.append(image,h,s);
    for(const event of ['pointerenter','focus']) button.addEventListener(event,()=>{$$('.category-card').forEach(b=>b.classList.toggle('active',b===button));});
    button.addEventListener('click',()=> { if(item.filter){selectFilter(item.filter);$('#collection').scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});}else openImage(item.image,item[language]); });return button;
  }));
}
let galleryFilter='all';
function renderGallery() {
  const items=media.filter(p=>galleryFilter==='all'||p.type===galleryFilter);
  $('#gallery-thumbs').replaceChildren(...items.map(item=>{const b=document.createElement('button');const img=document.createElement('img');img.src=src(item.image);img.alt=item.name[language];img.loading='lazy';b.setAttribute('aria-label',tr('Арын зураг: ','Background: ')+item.name[language]);b.append(img);b.addEventListener('click',()=>setGalleryImage(item));return b;}));
  setGalleryImage(items[0]);
}
function setGalleryImage(item) { const background=$('.gallery-background');background.src=src(item.image);background.alt=item.name[language]; }
function selectFilter(filter) { activeFilter=filter;$$('[data-filter]').forEach(b=>{const active=b.dataset.filter===filter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});renderProducts(); }
function applyLanguage() {
  document.documentElement.lang=language;document.title=tr('LEO STUDIO — Гэрлийн ул мөр','LEO STUDIO — Traces of light');
  $$('[data-mn][data-en]').forEach(e=>setLines(e,e.dataset[language]));
  $$('[data-placeholder-mn]').forEach(e=>{e.placeholder=e.dataset[language==='mn'?'placeholderMn':'placeholderEn'];e.setAttribute('aria-label',e.placeholder);});
  $$('.close-dialog').forEach(e=>e.setAttribute('aria-label',tr('Хаах','Close')));
  const labels={'menu-open':['Цэс нээх','Open menu'],'saved-open':['Хадгалсан бүтээлүүд','Saved studies'],'canvas-help':['Галерейг хэрхэн ашиглах вэ','How to use the gallery'],'canvas-theme':['Өнгөний горим солих','Switch color theme'],'zoom-in':['Томруулах','Zoom in'],'zoom-out':['Жижигрүүлэх','Zoom out'],'infinite-canvas':['Зургийн галерей. Чирэх эсвэл сумтай товчоор шилжинэ.','Image gallery. Drag or use the arrow keys to move.']};
  Object.entries(labels).forEach(([id,pair])=>$('#'+id).setAttribute('aria-label',pair[language==='mn'?0:1]));
  $('.hero-left').setAttribute('aria-label',tr('LEO хувцасны бүтээлүүд','LEO wearable art'));$('.hero-right').setAttribute('aria-label',tr('LEO урлахуй','LEO craft'));$('.left-nav').setAttribute('aria-label',tr('Үндсэн цэс','Main navigation'));$('.right-nav').setAttribute('aria-label',tr('Нэмэлт цэс','More navigation'));$('.header-mark').setAttribute('aria-label',tr('LEO STUDIO — Нүүр','LEO STUDIO — Home'));$('#language').textContent=language==='mn'?'MN / EN':'EN / MN';$('#language').setAttribute('aria-label',tr('Switch to English','Монгол хэл рүү шилжих'));
  renderProducts();renderCategories();renderGallery();renderSaved();renderSearch();renderPiece();renderInfo();buildCanvas();updateMotionButton();
}
$('#language').addEventListener('click',()=>{language=language==='mn'?'en':'mn';applyLanguage();});
$('[data-language]').addEventListener('click',()=>$('#language').click());
$('#search-open').addEventListener('click',()=>openSearch());$('#search-input').addEventListener('input',renderSearch);
$('#discovery-form').addEventListener('submit',event=>{event.preventDefault();openSearch(new FormData(event.currentTarget).get('query') || '');});
$('#saved-open').addEventListener('click',()=>{renderSaved();openDialog('saved-dialog');});
$$('[data-open-saved]').forEach(b=>b.addEventListener('click',()=>$('#saved-open').click()));$$('[data-open-search]').forEach(b=>b.addEventListener('click',()=>openSearch()));
$('#menu-open').addEventListener('click',()=>openDialog('menu-dialog'));
$('#previous-piece').addEventListener('click',()=>{activePiece=(activePiece+pieces.length-1)%pieces.length;renderPiece();});
$('#next-piece').addEventListener('click',()=>{activePiece=(activePiece+1)%pieces.length;renderPiece();});
$('#save-piece').addEventListener('click',()=>{const id=pieces[activePiece].id;saved.has(id)?saved.delete(id):saved.add(id);try{localStorage.setItem('leo-studies-traces-of-light',JSON.stringify([...saved]));}catch{}renderSaved();});
$$('dialog').forEach(dialog=>{dialog.addEventListener('close',()=>{document.body.classList.toggle('locked',!!$('dialog[open]'));$('#menu-open').setAttribute('aria-expanded',String($('#menu-dialog').open));});dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});});
$$('.close-dialog').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
$$('[data-scroll-strip]').forEach(b=>b.addEventListener('click',()=>$('#product-strip').scrollBy({left:Number(b.dataset.scrollStrip)*innerWidth*.6,behavior:reducedMotion.matches?'instant':'smooth'})));
$$('[data-gallery]').forEach(b=>b.addEventListener('click',()=>{galleryFilter=b.dataset.gallery;$$('[data-gallery]').forEach(e=>{const active=e===b;e.classList.toggle('active',active);e.setAttribute('aria-pressed',String(active));});renderGallery();}));
// Delegate to the document so newly rendered product cards remain interactive.
document.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(button?.dataset.piece!==undefined)openPiece(Number(button.dataset.piece));
  if(button?.dataset.image)openImage(button.dataset.image);
  if(button?.dataset.info)showInfo(button.dataset.info);
  if(button?.dataset.filter)selectFilter(button.dataset.filter);
  if(button?.dataset.mode)switchMode(button.dataset.mode);
  const anchor=event.target.closest('a[href^="#"]');
  if(anchor){if(anchor.classList.contains('hero-panel')&&$('#home').classList.contains('quote-visible')){event.preventDefault();return;}const target=$(anchor.getAttribute('href'));if(target){event.preventDefault();$$('dialog[open]').forEach(d=>d.close());if(mode==='experience'){switchMode('classic',()=>target.scrollIntoView({behavior:'instant'}));}else target.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth'});}}
});
// Opposing, opaque image tracks advance together; each uses a duplicate first frame for the wrap.
let motionPaused=reducedMotion.matches;
const heroTracks=$$('.hero-panel').map((panel,index)=>{
  const track=$('.hero-track',panel),slides=$$('.slide',track),clone=slides[0].cloneNode(true);
  clone.classList.remove('active');clone.alt='';clone.setAttribute('aria-hidden','true');track.append(clone);
  slides.forEach((slide,i)=>slide.setAttribute('aria-hidden',String(i!==0)));
  return {panel,track,slides,index:0,direction:index===0?-1:1,animation:null};
});
function updateMotionButton(){ $('#motion-pause').textContent=motionPaused?'▶':'Ⅱ';$('#motion-pause').setAttribute('aria-pressed',String(motionPaused));$('#motion-pause').setAttribute('aria-label',motionPaused?tr('Зургийн хөдөлгөөнийг үргэлжлүүлэх','Resume image motion'):tr('Зургийн хөдөлгөөнийг түр зогсоох','Pause image motion')); }
function syncHeroMotion(){
  const blocked=motionPaused||document.hidden||mode!=='classic'||$('#home').getBoundingClientRect().bottom<=0;
  for(const state of heroTracks)if(state.animation){if(blocked)state.animation.pause();else state.animation.play();}
}
$('#motion-pause').addEventListener('click',()=>{motionPaused=!motionPaused;updateMotionButton();syncHeroMotion();});
document.addEventListener('visibilitychange',syncHeroMotion);
function advanceHero(){
  if(motionPaused||document.hidden||mode!=='classic'||$('#home').getBoundingClientRect().bottom<=0||heroTracks.some(state=>state.animation))return;
  if(heroTracks.some(state=>{const next=state.slides[(state.index+1)%state.slides.length];return !next.complete||!next.naturalWidth;}))return;
  for(const state of heroTracks){
    const next=state.index+1,from=state.direction*state.index*100,to=state.direction*next*100;
    const animation=state.track.animate([{transform:`translate3d(${from}%,0,0)`},{transform:`translate3d(${to}%,0,0)`}],{duration:1700,easing:'cubic-bezier(.22,.8,.24,1)',fill:'forwards'});
    state.animation=animation;
    animation.finished.then(()=>{
      state.index=next%state.slides.length;
      state.track.style.transform=`translate3d(${state.direction*state.index*100}%,0,0)`;
      state.slides.forEach((slide,i)=>{slide.classList.toggle('active',i===state.index);slide.setAttribute('aria-hidden',String(i!==state.index));});
      animation.cancel();state.animation=null;
    }).catch(()=>{});
  }
}
setInterval(advanceHero,3500);
const clamp=(value,min=0,max=1)=>Math.max(min,Math.min(max,value));
let scrollPending=false;
function updateScenes(){
  scrollPending=false;
  if(mode==='experience'){ syncHeroMotion();$('#site-header').dataset.theme=$('#experience-page').classList.contains('dark')?'dark':'light';$('#mode-switch').classList.remove('hide');return; }
  for(const id of ['home','world']){
    const section=$('#'+id),r=section.getBoundingClientRect();const progress=clamp(-r.top/(r.height-innerHeight));const amount=clamp((progress-.20)/.23);
    if(id==='home'){
      const quoted=progress>=.30;section.classList.toggle('quote-visible',quoted);$('.hero-quote').setAttribute('aria-hidden',String(!quoted));$('.hero-identity').setAttribute('aria-hidden',String(quoted));
      heroTracks.forEach(state=>{state.panel.tabIndex=quoted?-1:0;state.panel.inert=quoted;});
      syncHeroMotion();
    }else{
      const quote=$('.scene-quote',section);quote.style.opacity=amount;quote.style.transform=`translate(-50%,calc(-50% + ${reducedMotion.matches?0:(1-amount)*80}px))`;
      $('.world-image').style.transform=reducedMotion.matches?'none':`scale(${1.025+progress*.065}) translateY(${progress*-2}%)`;
    }
  }
  const height=$('#site-header').offsetHeight;
  const section=$$('#classic-page > [data-theme]').find(s=>{const r=s.getBoundingClientRect();return r.top<=height+1&&r.bottom>height+1;});
  $('#site-header').dataset.theme=section?.dataset.theme||'image';
  $('#mode-switch').classList.toggle('hide',$('#world').getBoundingClientRect().top<innerHeight*.85);
  if(!reducedMotion.matches){const r=$('#beyond').getBoundingClientRect();if(r.top<innerHeight&&r.bottom>0)$$('.floating-media').forEach((e,i)=>e.style.transform=`translateY(${(innerHeight/2-r.top)*(.02+i*.006)}px)`);}
}
function scheduleScenes(){if(!scrollPending){scrollPending=true;requestAnimationFrame(updateScenes);}}
addEventListener('scroll',scheduleScenes,{passive:true});addEventListener('resize',()=>{scheduleScenes();layoutCanvas();});
if(!reducedMotion.matches&&'IntersectionObserver' in window){document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');observer.unobserve(entry.target);}}),{threshold:.08});$$('.reveal').forEach(e=>{if(e.getBoundingClientRect().top>innerHeight){e.classList.add('pending');observer.observe(e);}});}
// A separate, continuous image canvas, with pointer, wheel, touch and keyboard input.
const canvas=$('#infinite-canvas');let canvasFilter='all',canvasCards=[],panX=0,panY=0,zoom=1,velocityX=0,velocityY=0,mouseDrift=0,dragging=false,dragDistance=0,lastX=0,lastY=0,lastFrame=0,canvasRaf=0;
const points=new Map();let pinchDistance=0,pinchZoom=1;
function buildCanvas(){
  if(mode!=='experience'){canvasCards=[];canvas.replaceChildren();return;}
  const items=media.filter(p=>canvasFilter==='all'||p.type===canvasFilter);canvasCards=[];const fragment=document.createDocumentFragment();
  for(let row=0;row<7;row++)for(let col=0;col<7;col++){
    const item=items[(row*3+col)%items.length];const b=document.createElement('button');b.className='canvas-card';b.tabIndex=-1;b.setAttribute('aria-label',item.name[language]);
    const img=document.createElement('img');img.src=src(item.image);img.alt=item.name[language];img.draggable=false;
    const caption=document.createElement('span');caption.textContent=item.name[language];b.append(img,caption);
    b.addEventListener('click',event=>{if(event.detail>0&&dragDistance>6){event.preventDefault();return;}if(item.id)openPiece(pieces.indexOf(item));else openImage(item.image,item.name[language]);});
    fragment.append(b);canvasCards.push({button:b,col,row});
  }
  canvas.replaceChildren(fragment);layoutCanvas();
}
function layoutCanvas(){
  if(mode!=='experience')return;
  const width=Math.max(135,Math.min(235,innerWidth*.145))*zoom,height=width*1.3,stepX=width*1.85,stepY=height+width*.53;
  const totalX=stepX*7,totalY=stepY*7;const wrap=(v,total)=>((v+total/2)%total+total)%total-total/2;
  for(const item of canvasCards){const x=wrap((item.col-3)*stepX+panX,totalX)+innerWidth/2-width/2;const y=wrap((item.row-3)*stepY+panY+(item.col%2?stepY*.35:0),totalY)+innerHeight/2-height/2;item.button.style.width=width+'px';item.button.style.height=height+'px';item.button.style.transform=`translate3d(${x}px,${y}px,0)`;item.button.tabIndex=x>-width&&x<innerWidth&&y>50&&y<innerHeight-90?0:-1;}
  $('#zoom-out').disabled=zoom<=1;$('#zoom-in').disabled=zoom>=5.5;
}
function canvasFrame(time){
  canvasRaf=0;if(mode!=='experience')return;const factor=lastFrame?Math.min(2,(time-lastFrame)/16.67):1;lastFrame=time;
  if(!document.hidden&&!$('dialog[open]')&&!dragging){if(!reducedMotion.matches){panX+=(velocityX+mouseDrift)*factor;panY+=velocityY*factor;velocityX*=.92;velocityY*=.92;}else{velocityX=0;velocityY=0;}layoutCanvas();}
  canvasRaf=requestAnimationFrame(canvasFrame);
}
function startCanvas(){if(!canvasCards.length)buildCanvas();lastFrame=0;if(!canvasRaf)canvasRaf=requestAnimationFrame(canvasFrame);layoutCanvas();}
function changeZoom(direction){const steps=[1,2.7,5.5];zoom=direction>0?(steps.find(v=>v>zoom+.01)||5.5):([...steps].reverse().find(v=>v<zoom-.01)||1);layoutCanvas();}
$('#zoom-in').addEventListener('click',()=>changeZoom(1));$('#zoom-out').addEventListener('click',()=>changeZoom(-1));
canvas.addEventListener('pointerdown',event=>{if(event.button!==0)return;points.set(event.pointerId,{x:event.clientX,y:event.clientY});(event.target.closest("button") || canvas).setPointerCapture(event.pointerId);dragging=true;dragDistance=0;lastX=event.clientX;lastY=event.clientY;velocityX=velocityY=mouseDrift=0;canvas.classList.add('dragging');if(points.size===2){const p=[...points.values()];pinchDistance=Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);pinchZoom=zoom;}});
canvas.addEventListener('pointermove',event=>{if(!dragging){mouseDrift=event.pointerType==='mouse'?(innerWidth/2-event.clientX)/innerWidth*2:0;return;}if(!points.has(event.pointerId))return;points.set(event.pointerId,{x:event.clientX,y:event.clientY});if(points.size===2){const p=[...points.values()];zoom=clamp(pinchZoom*Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)/Math.max(1,pinchDistance),1,5.5);dragDistance=10;}else{const dx=event.clientX-lastX,dy=event.clientY-lastY;panX+=dx;panY+=dy;dragDistance+=Math.abs(dx)+Math.abs(dy);velocityX=dx;velocityY=dy;}lastX=event.clientX;lastY=event.clientY;layoutCanvas();});
function endPointer(event){points.delete(event.pointerId);if(!points.size){dragging=false;canvas.classList.remove('dragging');}else{const p=[...points.values()][0];lastX=p.x;lastY=p.y;} }
canvas.addEventListener('pointerup',endPointer);canvas.addEventListener('pointercancel',endPointer);canvas.addEventListener('pointerleave',()=>{mouseDrift=0;});
canvas.addEventListener('wheel',event=>{event.preventDefault();mouseDrift=0;velocityX=velocityY=0;panX-=event.deltaX;panY-=event.deltaY;layoutCanvas();},{passive:false});
canvas.addEventListener('focusin',()=>{mouseDrift=0;velocityX=velocityY=0;});
canvas.addEventListener('keydown',event=>{const moves={ArrowLeft:[130,0],ArrowRight:[-130,0],ArrowUp:[0,130],ArrowDown:[0,-130]};if(moves[event.key]){event.preventDefault();panX+=moves[event.key][0];panY+=moves[event.key][1];layoutCanvas();}if(event.key==='+'||event.key==='='){event.preventDefault();changeZoom(1);}if(event.key==='-'){event.preventDefault();changeZoom(-1);}});
$('#canvas-help').addEventListener('click',()=>showInfo('help'));$('#canvas-fact').addEventListener('click',()=>showInfo('fact'));
$('#canvas-theme').addEventListener('click',()=>{$('#experience-page').classList.toggle('dark');$('#canvas-theme').setAttribute('aria-pressed',String($('#experience-page').classList.contains('dark')));updateScenes();});
$('#canvas-filter-open').setAttribute('aria-expanded','false');
$('#canvas-filter-open').addEventListener('click',()=>{const panel=$('#canvas-filters');panel.hidden=!panel.hidden;$('#canvas-filter-open').setAttribute('aria-expanded',String(!panel.hidden));});
$$('[data-canvas-filter]').forEach(b=>b.addEventListener('click',()=>{canvasFilter=b.dataset.canvasFilter;$$('[data-canvas-filter]').forEach(e=>{const active=e===b;e.classList.toggle('active',active);e.setAttribute('aria-pressed',String(active));});buildCanvas();$('#canvas-filters').hidden=true;$('#canvas-filter-open').setAttribute('aria-expanded','false');$('#canvas-filter-open').focus();}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!$('#canvas-filters').hidden){$('#canvas-filters').hidden=true;$('#canvas-filter-open').setAttribute('aria-expanded','false');$('#canvas-filter-open').focus();}});
document.addEventListener('pointerdown',event=>{if(!event.target.closest('#canvas-filters, #canvas-filter-open')){$('#canvas-filters').hidden=true;$('#canvas-filter-open').setAttribute('aria-expanded','false');}});
function applyMode(next){mode=next;document.documentElement.dataset.mode=next;$$('#mode-switch button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===next)));if(next==='experience'){startCanvas();}else{cancelAnimationFrame(canvasRaf);canvasRaf=0;mouseDrift=0;scrollTo({top:classicScroll,behavior:'instant'});}updateScenes();}
function switchMode(next,after){
  if(next===mode){after?.();return;}if(switching)return;switching=true;if(mode==='classic')classicScroll=scrollY;
  $$('dialog[open]').forEach(d=>d.close());const cover=$('#page-transition');cover.classList.add('active');
  setTimeout(()=>{history.pushState({mode:next},'',next==='experience'?'/exp/':'/');applyMode(next);after?.();requestAnimationFrame(()=>cover.classList.remove('active'));switching=false;},reducedMotion.matches?0:400);
}
addEventListener('popstate',()=>applyMode(location.pathname.startsWith('/exp')?'experience':'classic'));
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches){motionPaused=true;updateMotionButton();syncHeroMotion();$$('.reveal.pending').forEach(e=>e.classList.remove('pending'));}updateScenes();});
applyLanguage();applyMode(mode);updateScenes();

// Mouse dragging complements native touch scrolling in the horizontal strips.
for(const strip of [$('#product-strip'),$('#one-strip'),$('.category-strip')]){
  let held=false,start=0,initial=0,moved=false;
  strip.addEventListener('pointerdown',event=>{if(event.pointerType!=='mouse'||event.button!==0)return;held=true;moved=false;start=event.clientX;initial=strip.scrollLeft;});
  strip.addEventListener('pointermove',event=>{if(!held)return;const delta=event.clientX-start;if(Math.abs(delta)>5){moved=true;strip.setPointerCapture(event.pointerId);strip.classList.add('dragging');strip.scrollLeft=initial-delta;}});
  const release=()=>{held=false;strip.classList.remove('dragging');};
  strip.addEventListener('pointerup',release);strip.addEventListener('pointercancel',release);strip.addEventListener('pointerleave',event=>{if(!strip.hasPointerCapture(event.pointerId))release();});
  strip.addEventListener('click',event=>{if(moved&&event.detail>0){event.preventDefault();event.stopImmediatePropagation();}},true);
}
