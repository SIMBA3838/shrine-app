/* ============================================================
   わびなび マイページ（mypage.js）v4 — 共通デザインシステム
   静かで上質・和モダン / 情報密度は高く保つ / iPhone16 Pro(390px)基準
   色 bg#F8F6F2 card#FFF text#2D2D2D mute#7A7A7A 紫#6E4BA8 金#C9A24A 朱#BC4030
   影 0 8px 24px rgba(0,0,0,.06)  角丸 card20 img20 btn16 ic14
   字 Noto Sans JP / ページ22-600 名26-700 LV18-700 数28-700 見出17-700
      カード15-600 本文14 補助12 タグ11-600 行間 本文1.6 見出1.3
   ============================================================ */
(function () {
  'use strict';
  if (window.__wabiMypageLoaded) return;
  window.__wabiMypageLoaded = true;

  var WABI_PROFILE = {
    name:'巡礼者 太郎', title:'巡礼者', aiTitle:'いつもおだやか',
    level:19, expToNext:340, expPercent:62, coverShrine:'厳島神社', avatar:'',
    stats:[
      {ic:'torii', label:'参拝した神社', value:28, unit:'社'},
      {ic:'book',  label:'御朱印',       value:36, unit:'体'},
      {ic:'map',   label:'作成したルート', value:5,  unit:''},
      {ic:'edit',  label:'投稿した記録',  value:12, unit:'件'},
      {ic:'users', label:'フォロー',      value:24, unit:'人'},
      {ic:'award', label:'フォロワー',    value:37, unit:'人'}
    ],
    quick:[
      {ic:'clock',   label:'参拝履歴'},
      {ic:'book',    label:'御朱印帳'},
      {ic:'star',    label:'行きたい神社'},
      {ic:'map',     label:'作成したルート'},
      {ic:'edit',    label:'投稿した記録'},
      {ic:'bookmark',label:'保存した記事'}
    ],
    aiRec:{ shrine:'伏見稲荷大社', tags:['混雑が少ない時間帯','御朱印が人気','パワースポット'] },
    goshuinBook:['伏見稲荷大社','出雲大社','明治神宮'],
    badges:[
      {ic:'torii', label:'初参拝',            got:true},
      {ic:'book',  label:'御朱印コレクター',   got:true},
      {ic:'star',  label:'パワースポット巡り', got:true},
      {ic:'award', label:'歴史探訪家',         got:false}
    ]
  };

  var P={
    torii:'<path d="M3 22h18"/><path d="M6 18v-7"/><path d="M18 18v-7"/><path d="M4 11 12 5l8 6"/><path d="M6 8h12"/>',
    book:'<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    map:'<path d="m9 4-6 2v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14"/><path d="M15 6v14"/>',
    edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    award:'<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    clock:'<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    star:'<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    bookmark:'<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    back:'<path d="m15 18-6-6 6-6"/>',
    home:'<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    plus:'<path d="M12 5v14"/><path d="M5 12h14"/>',
    user:'<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/>',
    msg:'<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    cr:'<path d="m9 18 6-6-6-6"/>',
    sparkle:'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/>'
  };
  function ic(n,c,s,w){ return '<svg width="'+(s||24)+'" height="'+(s||24)+'" viewBox="0 0 24 24" fill="none" stroke="'+(c||'currentColor')+'" stroke-width="'+(w||1.8)+'" stroke-linecap="round" stroke-linejoin="round">'+(P[n]||'')+'</svg>'; }
  function esc(s){ return String(s==null?'':s).replace(/"/g,'&quot;'); }

  var C={ bg:'#F8F6F2', card:'#FFFFFF', text:'#2D2D2D', mute:'#7A7A7A', purple:'#6E4BA8', gold:'#C9A24A', shrine:'#BC4030', line:'#ECE6DC', tint:'#F3ECE3', ptint:'#F1ECF7' };
  var SH='0 8px 24px rgba(0,0,0,.06)';
  var css=document.createElement('style');
  css.textContent=[
    "#wcMypage{position:fixed;inset:0;z-index:290;background:"+C.bg+";overflow-y:auto;-webkit-overflow-scrolling:touch;display:none;font-family:'Noto Sans JP',sans-serif;color:"+C.text+";line-height:1.6;-webkit-font-smoothing:antialiased;}",
    "#wcMypage.show{display:block;animation:mpFade .45s ease;}",
    "@keyframes mpFade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}",
    ".mp-in{max-width:430px;margin:0 auto;padding-bottom:92px;}",
    ".mp-hd{position:sticky;top:0;z-index:10;height:52px;background:rgba(248,246,242,.9);backdrop-filter:saturate(180%) blur(14px);display:flex;align-items:center;justify-content:space-between;padding:0 12px;}",
    ".mp-hd .mp-t{font-size:22px;font-weight:600;letter-spacing:.02em;}",
    ".mp-ico{width:38px;height:38px;display:flex;align-items:center;justify-content:center;color:"+C.text+";cursor:pointer;border-radius:12px;}",
    ".mp-ico:active{background:#efe9e0;}",
    /* Hero */
    ".mp-hero{position:relative;height:220px;background:#3a3025 center/cover;}",
    ".mp-hero:after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.62),rgba(0,0,0,.05) 46%,rgba(0,0,0,.18));}",
    ".mp-prof{position:absolute;left:16px;right:16px;bottom:16px;z-index:2;display:flex;align-items:flex-end;gap:14px;}",
    ".mp-av{width:88px;height:88px;border-radius:50%;border:4px solid #fff;background:#8a7a66 center/cover;flex:0 0 88px;display:flex;align-items:center;justify-content:center;overflow:hidden;box-shadow:0 6px 20px rgba(0,0,0,.3);}",
    ".mp-av img{width:100%;height:100%;object-fit:cover;}",
    ".mp-pinfo{padding-bottom:6px;min-width:0;}",
    ".mp-name{font-size:26px;font-weight:700;color:#fff;line-height:1.3;text-shadow:0 2px 12px rgba(0,0,0,.55);}",
    ".mp-tags{display:flex;gap:8px;margin-top:8px;}",
    ".mp-tag-t{font-size:11px;font-weight:600;letter-spacing:.03em;color:#fff;background:"+C.shrine+";height:28px;display:inline-flex;align-items:center;padding:0 12px;border-radius:8px;}",
    ".mp-tag-a{font-size:11px;font-weight:600;color:"+C.text+";background:rgba(255,255,255,.92);height:28px;display:inline-flex;align-items:center;padding:0 12px;border-radius:8px;}",
    /* EXP */
    ".mp-exp{margin:16px 16px 0;}",
    ".mp-exp-top{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px;}",
    ".mp-lv{font-size:18px;font-weight:700;color:"+C.purple+";letter-spacing:.02em;}",
    ".mp-lv b{font-size:18px;}",
    ".mp-exp-next{font-size:12px;color:"+C.mute+";}",
    ".mp-exp-next b{color:"+C.gold+";font-weight:700;}",
    ".mp-exp-bar{height:8px;border-radius:6px;background:#e9e2d7;overflow:hidden;}",
    ".mp-exp-fill{height:100%;border-radius:6px;background:linear-gradient(90deg,"+C.purple+","+C.gold+");width:0;transition:width 1.1s cubic-bezier(.22,.61,.36,1);}",
    /* Stats 2x3 */
    ".mp-stats{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:24px 16px 0;}",
    ".mp-stat{background:"+C.card+";border-radius:20px;box-shadow:"+SH+";height:110px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;transition:transform .18s ease;}",
    ".mp-stat:active{transform:scale(.97);}",
    ".mp-stat-top{display:flex;align-items:center;gap:10px;}",
    ".mp-stat-ic{width:40px;height:40px;border-radius:14px;background:"+C.tint+";display:flex;align-items:center;justify-content:center;color:"+C.shrine+";flex:0 0 40px;}",
    ".mp-stat-l{font-size:14px;color:"+C.mute+";font-weight:500;}",
    ".mp-stat-v{font-size:28px;font-weight:700;line-height:1;color:"+C.text+";}",
    ".mp-stat-v small{font-size:13px;font-weight:500;color:"+C.mute+";margin-left:3px;}",
    /* section */
    ".mp-sec{margin:32px 16px 0;}",
    ".mp-sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}",
    ".mp-h{font-size:17px;font-weight:700;color:"+C.text+";letter-spacing:.01em;}",
    ".mp-more{font-size:12px;color:"+C.purple+";cursor:pointer;font-weight:600;display:inline-flex;align-items:center;gap:1px;}",
    /* quick 3x2 circles */
    ".mp-quick{display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px 8px;}",
    ".mp-q{display:flex;flex-direction:column;align-items:center;gap:10px;cursor:pointer;}",
    ".mp-q-ic{width:52px;height:52px;border-radius:50%;background:"+C.tint+";display:flex;align-items:center;justify-content:center;color:"+C.shrine+";transition:transform .18s ease;box-shadow:0 4px 14px rgba(0,0,0,.05);}",
    ".mp-q:active .mp-q-ic{transform:scale(.92);}",
    ".mp-q-l{font-size:12px;font-weight:500;color:"+C.text+";text-align:center;}",
    /* AI */
    ".mp-ai{margin:32px 16px 0;background:"+C.card+";border-radius:20px;box-shadow:"+SH+";padding:16px;display:flex;gap:14px;align-items:stretch;}",
    ".mp-ai-l{flex:1;min-width:0;display:flex;flex-direction:column;}",
    ".mp-ai-h{display:flex;align-items:center;gap:8px;margin-bottom:8px;}",
    ".mp-ai-h .t{font-size:15px;font-weight:600;color:"+C.text+";display:inline-flex;align-items:center;gap:5px;}",
    ".mp-new{font-size:10px;font-weight:700;letter-spacing:.06em;color:#fff;background:"+C.gold+";padding:2px 8px;border-radius:6px;}",
    ".mp-ai-txt{font-size:14px;color:"+C.text+";margin-bottom:10px;line-height:1.5;}",
    ".mp-ai-txt b{color:"+C.purple+";font-weight:700;}",
    ".mp-ai-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:auto;}",
    ".mp-ai-tag{font-size:11px;font-weight:600;color:"+C.purple+";background:"+C.ptint+";height:26px;display:inline-flex;align-items:center;padding:0 10px;border-radius:8px;}",
    ".mp-ai-img{width:110px;height:110px;border-radius:20px;flex:0 0 110px;background:#ccc center/cover;box-shadow:0 6px 18px rgba(0,0,0,.12);}",
    /* hscroll */
    ".mp-hs{display:flex;gap:12px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding:2px 16px 4px;margin:0 -16px;}",
    ".mp-hs::-webkit-scrollbar{display:none;}",
    ".mp-post{flex:0 0 120px;cursor:pointer;}",
    ".mp-post-img{width:120px;height:160px;border-radius:18px;object-fit:cover;background:#d8cdbf center/cover;display:block;box-shadow:0 6px 18px rgba(0,0,0,.1);}",
    ".mp-post-m{font-size:12px;color:"+C.mute+";margin-top:8px;display:flex;gap:12px;align-items:center;}",
    ".mp-post-m span{display:inline-flex;align-items:center;gap:4px;}",
    ".mp-gsh{flex:0 0 100px;cursor:pointer;}",
    ".mp-gsh-img{width:100px;height:130px;border-radius:14px;background:#fff center/cover;box-shadow:0 4px 12px rgba(0,0,0,.08);border:1px solid "+C.line+";display:block;}",
    ".mp-gsh-l{font-size:12px;color:"+C.text+";text-align:center;margin-top:8px;}",
    /* badges 4 */
    ".mp-badges{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}",
    ".mp-bdg{display:flex;flex-direction:column;align-items:center;gap:8px;cursor:pointer;}",
    ".mp-bdg-ic{width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;}",
    ".mp-bdg-ic.got{background:linear-gradient(145deg,#e2c883,"+C.gold+");box-shadow:0 5px 14px rgba(201,162,74,.34);color:#fff;}",
    ".mp-bdg-ic.no{background:"+C.tint+";color:#c3b4a0;}",
    ".mp-bdg-l{font-size:11px;color:"+C.text+";text-align:center;line-height:1.35;}",
    ".mp-bdg-l.no{color:"+C.mute+";}",
    /* nav */
    ".mp-nav{position:fixed;bottom:0;left:0;right:0;max-width:430px;margin:0 auto;height:60px;background:rgba(248,246,242,.94);backdrop-filter:saturate(180%) blur(14px);border-top:1px solid "+C.line+";display:flex;z-index:11;}",
    ".mp-nav a{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;font-size:10px;color:"+C.mute+";cursor:pointer;font-weight:500;}",
    ".mp-nav a.on{color:"+C.purple+";}"
  ].join("\n");
  document.head.appendChild(css);

  function wikiImg(names,cb){
    try{
      var url='https://ja.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=thumbnail&pithumbsize=700&redirects=1&titles='+encodeURIComponent(names.join('|'));
      fetch(url).then(function(r){return r.json();}).then(function(j){
        var m={},rd={};((j.query||{}).redirects||[]).forEach(function(r){rd[r.from]=r.to;});((j.query||{}).normalized||[]).forEach(function(r){rd[r.from]=r.to;});
        var pg=(j.query||{}).pages||{};Object.keys(pg).forEach(function(k){if(pg[k].thumbnail)m[pg[k].title]=pg[k].thumbnail.source;});
        var o={};names.forEach(function(n){o[n]=m[rd[n]||n]||null;});cb(o);
      }).catch(function(){cb({});});
    }catch(e){cb({});}
  }

  function secProfile(p){
    return '<div class="mp-hero" id="mpCover"><div class="mp-prof"><div class="mp-av" id="mpAv">'+(p.avatar?'<img src="'+esc(p.avatar)+'">':ic('user','#fff',40,1.6))+'</div>'
      + '<div class="mp-pinfo"><div class="mp-name">'+p.name+'</div><div class="mp-tags"><span class="mp-tag-t">'+p.title+'</span><span class="mp-tag-a">'+p.aiTitle+'</span></div></div></div></div>';
  }
  function secExp(p){
    return '<div class="mp-exp"><div class="mp-exp-top"><span class="mp-lv">LV.<b>'+p.level+'</b></span><span class="mp-exp-next">あと <b>'+p.expToNext+'</b> EXP で Lv.'+(p.level+1)+'</span></div><div class="mp-exp-bar"><div class="mp-exp-fill" id="mpExpFill"></div></div></div>';
  }
  function secStats(p){
    return '<div class="mp-stats">'+p.stats.map(function(s){
      return '<div class="mp-stat" data-tap="1"><div class="mp-stat-top"><div class="mp-stat-ic">'+ic(s.ic,C.shrine,22,1.8)+'</div><div class="mp-stat-l">'+s.label+'</div></div>'
        + '<div class="mp-stat-v" data-count="'+s.value+'">0'+(s.unit?'<small>'+s.unit+'</small>':'')+'</div></div>';
    }).join('')+'</div>';
  }
  function secQuick(p){
    return '<div class="mp-sec"><div class="mp-sh"><div class="mp-h">クイックメニュー</div><div class="mp-more" data-tap="1">すべて見る'+ic('cr',C.purple,14,2)+'</div></div><div class="mp-quick">'+p.quick.map(function(q){
      return '<div class="mp-q" data-tap="1"><div class="mp-q-ic">'+ic(q.ic,C.shrine,24,1.8)+'</div><div class="mp-q-l">'+q.label+'</div></div>';
    }).join('')+'</div></div>';
  }
  function secAi(p){
    return '<div class="mp-ai" data-tap="1"><div class="mp-ai-l"><div class="mp-ai-h"><span class="t">'+ic('sparkle',C.purple,16,1.8)+'AIおすすめ</span><span class="mp-new">NEW</span></div><div class="mp-ai-txt">今日は <b>'+p.aiRec.shrine+'</b> がおすすめです</div><div class="mp-ai-tags">'+p.aiRec.tags.map(function(t){return '<span class="mp-ai-tag">'+t+'</span>';}).join('')+'</div></div><div class="mp-ai-img" id="mpAiImg"></div></div>';
  }
  function secPosts(){
    var posts=(typeof USER_POSTS!=='undefined'&&USER_POSTS.length)?USER_POSTS.slice(0,8):[];
    var body=posts.length?posts.map(function(p){
      return '<div class="mp-post" data-tap="1"><img class="mp-post-img" src="'+esc(p.img||'')+'" loading="lazy" onerror="this.style.background=\'#d8cdbf\'"><div class="mp-post-m"><span>'+ic('heart',C.shrine,14,1.8)+(p.likes||0)+'</span><span>'+ic('msg',C.mute,14,1.8)+((p.comments&&p.comments.length)||0)+'</span></div></div>';
    }).join(''):'<div style="font-size:14px;color:'+C.mute+';padding:4px 16px">まだ投稿がありません</div>';
    return '<div class="mp-sec"><div class="mp-sh"><div class="mp-h">最近の投稿</div><div class="mp-more" data-tap="1">すべて見る'+ic('cr',C.purple,14,2)+'</div></div><div class="mp-hs">'+body+'</div></div>';
  }
  function secGoshuin(p){
    return '<div class="mp-sec"><div class="mp-sh"><div class="mp-h">御朱印帳</div><div class="mp-more" data-tap="1">すべて見る'+ic('cr',C.purple,14,2)+'</div></div><div class="mp-hs">'
      + p.goshuinBook.map(function(n){return '<div class="mp-gsh" data-tap="1"><div class="mp-gsh-img" data-gsh="'+esc(n)+'"></div><div class="mp-gsh-l">'+n+'</div></div>';}).join('')+'</div></div>';
  }
  function secBadges(p){
    return '<div class="mp-sec"><div class="mp-sh"><div class="mp-h">バッジコレクション</div><div class="mp-more" data-tap="1">すべて見る'+ic('cr',C.purple,14,2)+'</div></div><div class="mp-badges">'
      + p.badges.map(function(b){return '<div class="mp-bdg" data-tap="1"><div class="mp-bdg-ic '+(b.got?'got':'no')+'">'+ic(b.ic,b.got?'#fff':'#c3b4a0',24,1.8)+'</div><div class="mp-bdg-l '+(b.got?'':'no')+'">'+b.label+'</div></div>';}).join('')+'</div></div>';
  }
  function secNav(){
    return '<div class="mp-nav"><a data-tap="1">'+ic('home',C.mute,20,1.8)+'<span>ホーム</span></a><a data-tap="1">'+ic('search',C.mute,20,1.8)+'<span>さがす</span></a><a data-tap="1">'+ic('map',C.mute,20,1.8)+'<span>ルート</span></a><a data-tap="1">'+ic('plus',C.mute,20,1.8)+'<span>投稿</span></a><a class="on">'+ic('user',C.purple,20,2)+'<span>マイページ</span></a></div>';
  }

  var page=document.createElement('div'); page.id='wcMypage'; document.body.appendChild(page);
  function countUp(el,to){var t0=null,dur=850;function step(ts){if(!t0)t0=ts;var k=Math.min(1,(ts-t0)/dur),e=1-Math.pow(1-k,3);el.firstChild.nodeValue=Math.round(e*to);if(k<1)requestAnimationFrame(step);}requestAnimationFrame(step);}

  function render(){
    var p=WABI_PROFILE;
    page.innerHTML='<div class="mp-hd"><span class="mp-ico" id="mpBack">'+ic('back',C.text,22,2)+'</span><span class="mp-t">マイページ</span><span class="mp-ico" id="mpGear">'+ic('settings',C.text,20,1.7)+'</span></div><div class="mp-in">'+secProfile(p)+secExp(p)+secStats(p)+secQuick(p)+secAi(p)+secPosts()+secGoshuin(p)+secBadges(p)+'</div>'+secNav();
    document.getElementById('mpBack').onclick=function(){page.classList.remove('show');page.style.display='none';};
    document.getElementById('mpGear').onclick=function(){toast('設定は準備中です');};
    page.querySelectorAll('[data-tap]').forEach(function(el){el.addEventListener('click',function(){toast('この機能は準備中です');});});
    setTimeout(function(){var f=document.getElementById('mpExpFill');if(f)f.style.width=p.expPercent+'%';page.querySelectorAll('.mp-stat-v[data-count]').forEach(function(el){countUp(el,+el.getAttribute('data-count'));});},140);
    wikiImg([p.coverShrine,p.aiRec.shrine].concat(p.goshuinBook),function(map){
      var cv=document.getElementById('mpCover');if(cv&&map[p.coverShrine])cv.style.background='#3a3025 url('+map[p.coverShrine]+') center/cover';
      var ai=document.getElementById('mpAiImg');if(ai&&map[p.aiRec.shrine])ai.style.background='url('+map[p.aiRec.shrine]+') center/cover';
      page.querySelectorAll('[data-gsh]').forEach(function(el){var u=map[el.getAttribute('data-gsh')];if(u)el.style.background='url('+u+') center/cover';});
    });
  }
  function toast(m){if(typeof showToast==='function')showToast(m);}
  window.openWabiMypage=function(){render();page.style.display='block';requestAnimationFrame(function(){page.classList.add('show');});page.scrollTop=0;};

  function hookMenu(){
    try{
      var cand=[].slice.call(document.querySelectorAll('.site-hd *, header *, [class*=menu], [class*=hd] *')).filter(function(e){return e.children.length===0&&/メニュー/.test((e.textContent||'').trim())&&(e.textContent||'').trim().length<8;});
      cand.forEach(function(l){l.textContent='マイページ';});
      var btns=[];cand.forEach(function(l){var t=l.closest('a,button,div');if(t)btns.push(t);});
      btns.forEach(function(b){b.setAttribute('onclick','');b.onclick=function(e){if(e){e.preventDefault();e.stopPropagation();}window.openWabiMypage();return false;};});
    }catch(e){}
  }
  hookMenu();setInterval(hookMenu,2000);
})();
