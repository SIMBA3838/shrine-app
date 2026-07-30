// ══════════════════════════════════════════════════════════════
// わびなび AI旅行コンシェルジュ（ルート選択後の提案ページ）
// ・「このルートを選ぶ」→ このページが開く
// ・周辺のグルメ/カフェ/観光/体験/宿泊を提案し、ルートに追加できる
// ・データは現在ダミー（店名は実在）。API接続時は fetchNearby() を差し替え
// ══════════════════════════════════════════════════════════════
(function(){
  'use strict';

  // 二重読み込み防止（タグが複数あっても1回だけ動く）
  if (window.__wabiConciergeLoaded) return;
  window.__wabiConciergeLoaded = true;

  // ─────────────────────────────────────────
  // 1. 周辺スポットデータ（※評価・件数・徒歩分はダミー値。店名は実在）
  //    API接続時はこのオブジェクトを Google Places / 楽天トラベル の結果に置き換える
  // ─────────────────────────────────────────
  var G={ // グラデーション（カテゴリ別プレースホルダー画像）
    food:'linear-gradient(135deg,#c98a5b,#8a4a2f)', soba:'linear-gradient(135deg,#b9a888,#6f5b3e)',
    cafe:'linear-gradient(135deg,#a98a38,#6e5a20)', matcha:'linear-gradient(135deg,#7a9a6a,#4a6a3f)',
    sight:'linear-gradient(135deg,#8a9ab0,#4a5a70)', exp:'linear-gradient(135deg,#9a7ab0,#5a4470)',
    hotel:'linear-gradient(135deg,#5b7a9a,#2f4a6a)', onsen:'linear-gradient(135deg,#b07a7a,#704444)'
  };
  function I(emoji,grad){ return {emoji:emoji,grad:grad}; }

  var WC_DATA = {
    dyn:{ near:'善光寺',
      gourmet:[
        {name:'信州そば処 みよ田',genre:'そば・郷土料理',rating:4.4,reviews:123,walk:'徒歩4分',ai:96,img:I('🍜',G.soba)},
        {name:'門前そば 藤木庵',genre:'そば',rating:4.2,reviews:98,walk:'徒歩6分',ai:92,img:I('🍜',G.soba)},
        {name:'竹風堂 大門店',genre:'栗おこわ・甘味',rating:4.3,reviews:210,walk:'徒歩5分',ai:90,img:I('🌰',G.food)}],
      cafe:[
        {name:'八幡屋礒五郎 本店カフェ',genre:'七味スイーツ',rating:4.4,reviews:150,walk:'徒歩5分',ai:93,img:I('🍵',G.cafe)},
        {name:'THE FUJIYA GOHONJIN カフェ',genre:'クラシックカフェ',rating:4.5,reviews:120,walk:'徒歩3分',ai:91,img:I('☕',G.cafe)}],
      sight:[
        {name:'長野県立美術館',genre:'美術館',rating:4.4,reviews:380,walk:'徒歩7分',ai:88,img:I('🖼',G.sight)},
        {name:'東山魁夷館',genre:'美術館',rating:4.5,reviews:260,walk:'徒歩8分',ai:87,img:I('🎨',G.sight)}],
      exp:[
        {name:'善光寺 写経体験（約60分）',genre:'写経',rating:4.6,reviews:85,walk:'境内',ai:95,img:I('🖌',G.exp)},
        {name:'ながの門前まち歩きガイドツアー',genre:'ガイドツアー（約90分）',rating:4.5,reviews:60,walk:'徒歩1分',ai:89,img:I('🏮',G.exp)}],
      hotel:[
        {name:'ホテル国際21',genre:'シティホテル',rating:4.5,reviews:893,walk:'徒歩8分',price:'¥12,800〜',ai:94,img:I('🏨',G.hotel)},
        {name:'長野ホテル犀北館',genre:'クラシックホテル',rating:4.3,reviews:612,walk:'徒歩10分',price:'¥15,400〜',ai:90,img:I('🏨',G.hotel)}],
      advice:'善光寺周辺は門前町グルメが充実しています。ランチに信州そばを追加すると、巡礼と食文化の両方を楽しめる満足度の高い巡拝旅になります。'},

    r1:{ near:'鹿島神宮',
      gourmet:[
        {name:'鰻割烹 鈴章',genre:'うなぎ・老舗',rating:4.4,reviews:210,walk:'徒歩3分',ai:95,img:I('🍱',G.food)},
        {name:'亀甲堂',genre:'厄落しだんご（香取神宮門前）',rating:4.3,reviews:180,walk:'香取神宮すぐ',ai:92,img:I('🍡',G.food)}],
      cafe:[
        {name:'亀甲堂 甘味処',genre:'甘味・草だんご',rating:4.3,reviews:180,walk:'香取神宮すぐ',ai:90,img:I('🍵',G.cafe)}],
      sight:[
        {name:'息栖神社 一之鳥居（忍潮井）',genre:'名所・湧水の鳥居',rating:4.4,reviews:150,walk:'徒歩5分',ai:93,img:I('⛩',G.sight)},
        {name:'鹿島城山公園',genre:'公園・展望',rating:4.1,reviews:120,walk:'徒歩10分',ai:82,img:I('🌸',G.sight)}],
      exp:[
        {name:'鹿島神宮 奥参道・要石めぐり',genre:'境内散策',rating:4.6,reviews:300,walk:'境内',ai:94,img:I('🪨',G.exp)}],
      hotel:[
        {name:'鹿島セントラルホテル',genre:'ホテル',rating:4.1,reviews:520,walk:'車10分',price:'¥9,800〜',ai:88,img:I('🏨',G.hotel)},
        {name:'亀の井ホテル 潮来',genre:'温泉ホテル',rating:4.2,reviews:340,walk:'車15分',price:'¥13,200〜',ai:86,img:I('♨️',G.onsen)}],
      advice:'東国三社は各社の間が離れているため、香取神宮門前の亀甲堂で一服を挟むと巡拝のリズムが整います。締めのうなぎもこの地域の楽しみです。'},

    r2:{ near:'出雲大社',
      gourmet:[
        {name:'献上そば 羽根屋 本店',genre:'出雲そば',rating:4.4,reviews:650,walk:'車10分',ai:96,img:I('🍜',G.soba)},
        {name:'そば処 田中屋',genre:'出雲そば（神門通り）',rating:4.3,reviews:480,walk:'徒歩2分',ai:94,img:I('🍜',G.soba)}],
      cafe:[
        {name:'日本ぜんざい学会 壱号店',genre:'ぜんざい発祥の地',rating:4.2,reviews:390,walk:'徒歩3分',ai:93,img:I('🍵',G.cafe)},
        {name:'くつろぎ和かふぇ 甘右衛門',genre:'和カフェ',rating:4.3,reviews:150,walk:'徒歩3分',ai:88,img:I('🍡',G.cafe)}],
      sight:[
        {name:'稲佐の浜',genre:'神話の浜・夕日名所',rating:4.5,reviews:800,walk:'徒歩15分',ai:95,img:I('🌅',G.sight)},
        {name:'島根県立古代出雲歴史博物館',genre:'博物館',rating:4.5,reviews:620,walk:'徒歩5分',ai:90,img:I('🏛',G.sight)}],
      exp:[
        {name:'いずも勾玉の里 伝承館 勾玉づくり',genre:'勾玉づくり体験',rating:4.3,reviews:130,walk:'車15分',ai:87,img:I('🔮',G.exp)}],
      hotel:[
        {name:'竹野屋旅館',genre:'老舗旅館（大社正門前）',rating:4.3,reviews:280,walk:'徒歩1分',price:'¥16,500〜',ai:96,img:I('🏮',G.hotel)},
        {name:'お宿 月夜のうさぎ',genre:'温泉宿',rating:4.4,reviews:520,walk:'車20分',price:'¥14,800〜',ai:89,img:I('♨️',G.onsen)}],
      advice:'出雲そばは「割子」で食べ比べるのが醍醐味。両参りの間にぜんざい発祥の地・神門通りで甘味を挟むと、縁結びの旅がいっそう豊かになります。'},

    r3:{ near:'伊勢神宮 内宮',
      gourmet:[
        {name:'すし久',genre:'てこね寿司（おかげ横丁）',rating:4.3,reviews:900,walk:'徒歩3分',ai:96,img:I('🍣',G.food)},
        {name:'ふくすけ',genre:'伊勢うどん',rating:4.2,reviews:780,walk:'徒歩3分',ai:94,img:I('🍜',G.soba)}],
      cafe:[
        {name:'赤福 本店',genre:'赤福餅・甘味',rating:4.5,reviews:2100,walk:'徒歩3分',ai:98,img:I('🍡',G.cafe)},
        {name:'五十鈴川カフェ',genre:'川沿いカフェ',rating:4.3,reviews:460,walk:'徒歩4分',ai:90,img:I('☕',G.cafe)}],
      sight:[
        {name:'おかげ横丁',genre:'門前町さんぽ',rating:4.5,reviews:5200,walk:'徒歩3分',ai:97,img:I('🏮',G.sight)},
        {name:'伊勢志摩スカイライン 朝熊山頂展望台',genre:'展望台',rating:4.4,reviews:530,walk:'車15分',ai:88,img:I('🗻',G.sight)}],
      exp:[
        {name:'おかげ座 神話の館',genre:'日本神話シアター',rating:4.1,reviews:160,walk:'徒歩3分',ai:85,img:I('📜',G.exp)}],
      hotel:[
        {name:'神宮会館',genre:'内宮まで徒歩5分の宿',rating:4.2,reviews:480,walk:'徒歩5分',price:'¥11,000〜',ai:95,img:I('🏨',G.hotel)},
        {name:'伊勢シティホテル',genre:'シティホテル',rating:4.1,reviews:520,walk:'車12分',price:'¥8,900〜',ai:85,img:I('🏨',G.hotel)}],
      advice:'お伊勢参りの締めは、おかげ横丁での食べ歩きが王道です。朝一番の内宮参拝＋赤福本店の朝がゆという「お伊勢さんの朝」もおすすめです。'},

    r4:{ near:'熊野本宮大社',
      gourmet:[
        {name:'総本家めはりや 新宮本店',genre:'めはり寿司',rating:4.2,reviews:310,walk:'速玉大社から車5分',ai:94,img:I('🍙',G.food)}],
      cafe:[
        {name:'香梅堂',genre:'鈴焼・銘菓（新宮）',rating:4.6,reviews:280,walk:'速玉大社から徒歩5分',ai:92,img:I('🍡',G.cafe)}],
      sight:[
        {name:'那智の大滝（飛瀧神社）',genre:'日本一の名瀑',rating:4.7,reviews:2800,walk:'那智大社から徒歩15分',ai:99,img:I('🌊',G.sight)},
        {name:'大斎原の大鳥居',genre:'日本一の大鳥居',rating:4.6,reviews:900,walk:'本宮から徒歩10分',ai:96,img:I('⛩',G.sight)}],
      exp:[
        {name:'熊野古道 大門坂ウォーク',genre:'石畳の古道歩き（約40分）',rating:4.7,reviews:750,walk:'那智大社ふもと',ai:97,img:I('🌲',G.exp)}],
      hotel:[
        {name:'川湯温泉 冨士屋',genre:'温泉旅館',rating:4.4,reviews:410,walk:'本宮から車10分',price:'¥18,700〜',ai:93,img:I('♨️',G.onsen)},
        {name:'ホテル浦島',genre:'洞窟温泉（那智勝浦）',rating:4.0,reviews:2300,walk:'那智から車15分',price:'¥13,000〜',ai:88,img:I('♨️',G.onsen)}],
      advice:'熊野は一日で巡らず、川湯温泉で一泊するのがおすすめ。翌朝の大門坂を歩いて那智大社へ登ると、よみがえりの旅が完成します。'},

    r5:{ near:'諏訪大社 上社本宮',
      gourmet:[
        {name:'うなぎ小林',genre:'うなぎ',rating:4.4,reviews:520,walk:'車10分',ai:93,img:I('🍱',G.food)},
        {name:'そば処 山猫亭 本店',genre:'そば（下社秋宮前）',rating:4.2,reviews:430,walk:'秋宮すぐ',ai:91,img:I('🍜',G.soba)}],
      cafe:[
        {name:'くらすわ 本店',genre:'ベーカリーカフェ・諏訪湖ビュー',rating:4.3,reviews:680,walk:'車8分',ai:90,img:I('☕',G.cafe)},
        {name:'新鶴本店',genre:'塩羊羹（下諏訪）',rating:4.5,reviews:290,walk:'秋宮から徒歩1分',ai:92,img:I('🍡',G.cafe)}],
      sight:[
        {name:'立石公園',genre:'諏訪湖の絶景展望',rating:4.5,reviews:750,walk:'車12分',ai:91,img:I('🌄',G.sight)},
        {name:'万治の石仏',genre:'パワースポット（春宮近く）',rating:4.2,reviews:520,walk:'春宮から徒歩5分',ai:93,img:I('🪨',G.sight)}],
      exp:[
        {name:'真澄 蔵元ショップ（宮坂醸造）',genre:'酒蔵・試飲',rating:4.4,reviews:340,walk:'車7分',ai:89,img:I('🍶',G.exp)}],
      hotel:[
        {name:'上諏訪温泉 しんゆ',genre:'温泉旅館',rating:4.5,reviews:620,walk:'車10分',price:'¥19,800〜',ai:92,img:I('♨️',G.onsen)},
        {name:'萃 sui-諏訪湖',genre:'全室レイクビューの宿',rating:4.7,reviews:280,walk:'車10分',price:'¥35,000〜',ai:90,img:I('🏨',G.hotel)}],
      advice:'四社まいりの途中、春宮近くの「万治の石仏」は必見。締めは上諏訪温泉で諏訪湖の夕景を眺めれば、御柱の力をいただく旅が整います。'},

    r6:{ near:'戸隠神社 中社',
      gourmet:[
        {name:'うずら家',genre:'戸隠そばの名店（中社前）',rating:4.5,reviews:980,walk:'中社すぐ',ai:98,img:I('🍜',G.soba)},
        {name:'そばの実',genre:'戸隠そば',rating:4.3,reviews:520,walk:'車3分',ai:92,img:I('🍜',G.soba)}],
      cafe:[
        {name:'戸隠 岩戸屋',genre:'そばソフト・甘味',rating:4.1,reviews:210,walk:'中社すぐ',ai:86,img:I('🍦',G.cafe)}],
      sight:[
        {name:'鏡池',genre:'戸隠連峰を映す絶景池',rating:4.5,reviews:640,walk:'車8分',ai:95,img:I('🏞',G.sight)},
        {name:'戸隠森林植物園',genre:'散策路・野鳥',rating:4.4,reviews:330,walk:'奥社参道入口すぐ',ai:88,img:I('🌲',G.sight)}],
      exp:[
        {name:'戸隠民俗館・忍者からくり屋敷',genre:'忍者体験',rating:4.2,reviews:400,walk:'奥社入口すぐ',ai:87,img:I('🥷',G.exp)},
        {name:'とんくるりん そば打ち体験',genre:'そば打ち',rating:4.3,reviews:120,walk:'車5分',ai:85,img:I('🖐',G.exp)}],
      hotel:[
        {name:'宿坊 極意',genre:'戸隠の宿坊',rating:4.6,reviews:150,walk:'宝光社近く',price:'¥13,500〜',ai:95,img:I('🏮',G.hotel)},
        {name:'越志旅館',genre:'中社門前の旅館',rating:4.4,reviews:130,walk:'中社すぐ',price:'¥12,000〜',ai:90,img:I('🏨',G.hotel)}],
      advice:'五社巡りの昼は中社前の戸隠そばが鉄板です。時間に余裕があれば鏡池へ。宿坊に泊まれば、朝の凛とした神域を独り占めできます。'},

    r7:{ near:'秩父神社',
      gourmet:[
        {name:'豚みそ丼本舗 野さか',genre:'豚みそ丼',rating:4.4,reviews:1100,walk:'車5分',ai:96,img:I('🍱',G.food)},
        {name:'わへいそば',genre:'そば・くるみだれ',rating:4.2,reviews:380,walk:'徒歩7分',ai:90,img:I('🍜',G.soba)}],
      cafe:[
        {name:'阿左美冷蔵 金崎本店',genre:'天然氷かき氷（長瀞）',rating:4.4,reviews:980,walk:'宝登山から徒歩5分',ai:94,img:I('🍧',G.cafe)},
        {name:'泰山堂カフェ',genre:'古民家カフェ',rating:4.5,reviews:210,walk:'徒歩3分',ai:89,img:I('☕',G.cafe)}],
      sight:[
        {name:'長瀞ラインくだり',genre:'川下り',rating:4.4,reviews:1500,walk:'宝登山から徒歩10分',ai:92,img:I('🚣',G.sight)},
        {name:'羊山公園',genre:'芝桜の丘',rating:4.4,reviews:1300,walk:'車10分',ai:87,img:I('🌸',G.sight)}],
      exp:[
        {name:'秩父まつり会館',genre:'秩父夜祭の展示',rating:4.2,reviews:420,walk:'秩父神社すぐ',ai:88,img:I('🏮',G.exp)},
        {name:'ちちぶ銘仙館',genre:'織物・染め体験',rating:4.3,reviews:150,walk:'徒歩12分',ai:84,img:I('🧵',G.exp)}],
      hotel:[
        {name:'三峯神社 興雲閣',genre:'神社直営の宿坊',rating:4.3,reviews:310,walk:'三峯神社境内',price:'¥12,100〜',ai:97,img:I('🏮',G.hotel)},
        {name:'和どう',genre:'和銅鉱泉の温泉旅館',rating:4.4,reviews:480,walk:'車12分',price:'¥17,600〜',ai:89,img:I('♨️',G.onsen)}],
      advice:'三峯神社の興雲閣に泊まると、早朝の澄んだ気の中でご祈祷を受けられます。長瀞の天然氷かき氷は行列必至、午前中がおすすめです。'},

    r8:{ near:'上賀茂神社',
      gourmet:[
        {name:'今井食堂',genre:'さば煮定食（上賀茂）',rating:4.2,reviews:520,walk:'徒歩2分',ai:93,img:I('🍱',G.food)},
        {name:'岡北（おかきた）',genre:'京うどん（平安神宮近く）',rating:4.3,reviews:780,walk:'平安神宮から徒歩5分',ai:91,img:I('🍜',G.soba)}],
      cafe:[
        {name:'神馬堂',genre:'やきもち（上賀茂名物）',rating:4.5,reviews:430,walk:'徒歩1分',ai:96,img:I('🍡',G.cafe)},
        {name:'長楽館',genre:'洋館カフェ（八坂神社近く）',rating:4.4,reviews:890,walk:'八坂から徒歩3分',ai:90,img:I('☕',G.cafe)}],
      sight:[
        {name:'祇園白川',genre:'石畳の街並み',rating:4.5,reviews:1600,walk:'八坂から徒歩5分',ai:92,img:I('🏮',G.sight)},
        {name:'蹴上インクライン',genre:'桜と線路跡の名所',rating:4.4,reviews:1100,walk:'平安神宮から徒歩10分',ai:87,img:I('🌸',G.sight)}],
      exp:[
        {name:'松尾大社 お酒の資料館',genre:'酒神の資料館',rating:4.0,reviews:130,walk:'松尾大社境内',ai:86,img:I('🍶',G.exp)}],
      hotel:[
        {name:'ザ・ホテル青龍 京都清水',genre:'元小学校のホテル',rating:4.6,reviews:520,walk:'八坂から徒歩10分',price:'¥38,000〜',ai:91,img:I('🏨',G.hotel)},
        {name:'ホテル平安の森 京都',genre:'岡崎エリアのホテル',rating:4.0,reviews:680,walk:'平安神宮から徒歩8分',price:'¥9,500〜',ai:87,img:I('🏨',G.hotel)}],
      advice:'五社めぐりは移動が多いので、上賀茂の神馬堂で「やきもち」を、締めの祇園で長楽館の一服を。専用色紙の御朱印集めもお忘れなく。'},

    r9:{ near:'北口本宮冨士浅間神社',
      gourmet:[
        {name:'桜井うどん',genre:'吉田のうどん',rating:4.2,reviews:480,walk:'車5分',ai:94,img:I('🍜',G.soba)},
        {name:'みうらうどん',genre:'吉田のうどん',rating:4.3,reviews:620,walk:'車7分',ai:92,img:I('🍜',G.soba)}],
      cafe:[
        {name:'金多留満 本店',genre:'和菓子・はまなし',rating:4.4,reviews:180,walk:'車5分',ai:88,img:I('🍡',G.cafe)}],
      sight:[
        {name:'新倉山浅間公園（忠霊塔）',genre:'富士山×五重塔の絶景',rating:4.6,reviews:2100,walk:'車10分',ai:97,img:I('🗻',G.sight)},
        {name:'富士山レーダードーム館',genre:'体験型ミュージアム',rating:4.1,reviews:230,walk:'車8分',ai:82,img:I('📡',G.sight)}],
      exp:[
        {name:'ふじさんミュージアム',genre:'富士山信仰の博物館',rating:4.2,reviews:190,walk:'車6分',ai:87,img:I('🗻',G.exp)}],
      hotel:[
        {name:'ハイランドリゾート ホテル＆スパ',genre:'富士急隣接リゾート',rating:4.3,reviews:1500,walk:'車8分',price:'¥17,000〜',ai:90,img:I('🏨',G.hotel)},
        {name:'ホテル鐘山苑',genre:'庭園温泉旅館',rating:4.5,reviews:980,walk:'車10分',price:'¥24,200〜',ai:92,img:I('♨️',G.onsen)}],
      advice:'両参りは2時間半で回れるので、午後は新倉山浅間公園へ。五重塔越しの富士は、金運の旅の締めくくりにふさわしい絶景です。'},

    r10:{ near:'筑波山神社',
      gourmet:[
        {name:'コマ展望台 レストラン',genre:'つくばうどん（山頂名物）',rating:4.0,reviews:350,walk:'御幸ヶ原すぐ',ai:90,img:I('🍜',G.soba)}],
      cafe:[
        {name:'沼田屋',genre:'かりんとう饅頭',rating:4.4,reviews:410,walk:'車5分',ai:93,img:I('🍡',G.cafe)}],
      sight:[
        {name:'筑波山ロープウェイ',genre:'つつじヶ丘〜女体山',rating:4.3,reviews:820,walk:'つつじヶ丘駅',ai:91,img:I('🚡',G.sight)},
        {name:'筑波山梅林',genre:'梅の名所（2〜3月）',rating:4.3,reviews:560,walk:'車5分',ai:85,img:I('🌸',G.sight)}],
      exp:[
        {name:'ガマの油売り口上（実演）',genre:'伝統芸能',rating:4.2,reviews:90,walk:'山頂周辺',ai:86,img:I('🐸',G.exp)}],
      hotel:[
        {name:'筑波山江戸屋',genre:'神社隣の老舗旅館',rating:4.2,reviews:380,walk:'徒歩2分',price:'¥15,400〜',ai:95,img:I('🏮',G.hotel)},
        {name:'筑波山京成ホテル',genre:'関東平野を望む宿',rating:4.1,reviews:420,walk:'車5分',price:'¥14,300〜',ai:88,img:I('🏨',G.hotel)}],
      advice:'登拝の昼は山頂の「つくばうどん」を。下山後は神社隣の江戸屋で一泊すれば、朝の静かな拝殿にお参りできます。縁結びの旅は朝が吉です。'}
  };

  // 固定10ルート＝手作りデータ／検索ルート＝Google Placesで周辺を実検索
  var dynCache = {};
  function dynKey(route){ return route.spots.map(function(s){return s.name;}).join('|'); }
  function fetchNearby(route){
    if (window._dynamicRoutes && dynCache[dynKey(route)]) return dynCache[dynKey(route)];
    return WC_DATA[route.id] || WC_DATA.dyn;
  }
  function haversine(a,b,c,d2){var R=6371e3,p=Math.PI/180;var x=(c-a)*p,y=(d2-b)*p;var s=Math.sin(x/2)*Math.sin(x/2)+Math.cos(a*p)*Math.cos(c*p)*Math.sin(y/2)*Math.sin(y/2);return 2*R*Math.asin(Math.sqrt(s));}
  function fetchDynamicNearby(route, cb){
    try{
      var s0 = route.spots[0];
      if (typeof API_KEY==='undefined' || !API_KEY || typeof google==='undefined' || !google.maps || !google.maps.places || !s0 || !s0.lat){ cb(null); return; }
      var svc = new google.maps.places.PlacesService(document.createElement('div'));
      var center = new google.maps.LatLng(s0.lat, s0.lng);
      var out = { near:String(s0.name).replace(/[（(].*$/,''), gourmet:[], cafe:[], sight:[], exp:[], hotel:[],
        advice: String(s0.name).replace(/[（(].*$/,'')+'周辺の人気スポットをAIが選びました。ランチやカフェを追加して、あなただけの巡拝プランに仕上げましょう。' };
      var jobs = [
        {key:'gourmet', type:'restaurant', radius:800,  emoji:'🍱', grad:G.food,  genre:'お食事処'},
        {key:'cafe',    type:'cafe',       radius:800,  emoji:'☕',  grad:G.cafe,  genre:'カフェ'},
        {key:'sight',   type:'tourist_attraction', radius:1500, emoji:'🏞', grad:G.sight, genre:'観光名所'},
        {key:'hotel',   type:'lodging',    radius:1500, emoji:'🏨', grad:G.hotel, genre:'ホテル'}
      ];
      var done = 0;
      jobs.forEach(function(job){
        svc.nearbySearch({location:center, radius:job.radius, type:job.type}, function(res, status){
          if (status===google.maps.places.PlacesServiceStatus.OK && res){
            var notHotel = function(p){ return job.key==='hotel' || !(p.types && p.types.indexOf('lodging')>-1); };
            var list = res.filter(function(p){ return notHotel(p) && p.rating>=4.0 && (p.user_ratings_total||0)>=50 && p.name!==s0.name; });
            // 4件に満たなければ条件をゆるめて補充（人気順）
            var relaxed = res.filter(function(p){ return notHotel(p) && (p.user_ratings_total||0)>=5 && p.name!==s0.name; })
              .sort(function(a,b){ return (b.user_ratings_total||0)-(a.user_ratings_total||0); });
            relaxed.forEach(function(p){ if (list.length<4 && list.indexOf(p)<0) list.push(p); });
            list.sort(function(a,b){ return (b.rating||0)-(a.rating||0); });
            out[job.key] = list.slice(0,4).map(function(p){
              var dist = (p.geometry&&p.geometry.location)?haversine(s0.lat,s0.lng,p.geometry.location.lat(),p.geometry.location.lng()):600;
              var mins = Math.max(1, Math.round(dist/80));
              return { name:p.name, genre:job.genre, rating:p.rating||4.0, reviews:p.user_ratings_total||0,
                walk:(mins>20?'車'+Math.round(mins/5)+'分':'徒歩'+mins+'分'),
                ai:Math.min(99, Math.round((p.rating||4)*19 + Math.min((p.user_ratings_total||0),1000)/125)),
                img:I(job.emoji, job.grad),
                photoUrl:(p.photos&&p.photos.length)?p.photos[0].getUrl({maxWidth:500}):null };
            });
          }
          done++;
          if (done===jobs.length) cb(out);
        });
      });
    }catch(e){ cb(null); }
  }

  // ─────────────────────────────────────────
  // 2. スタイル
  // ─────────────────────────────────────────
  var css = document.createElement('style');
  css.textContent = [
    '#wcPage,#wcPrev{position:fixed;inset:0;z-index:250;background:#F8F5EF;display:none;overflow-y:auto;-webkit-overflow-scrolling:touch;}',
    '#wcPrev{z-index:260;}',
    '.wc-inner{max-width:500px;margin:0 auto;padding-bottom:96px;}',
    '.wc-hd{position:sticky;top:0;z-index:5;background:#fff;display:flex;align-items:center;gap:8px;padding:14px 16px;border-bottom:1px solid #eee8dc;}',
    '.wc-back{font-size:22px;color:#a83320;cursor:pointer;line-height:1;padding:0 6px;}',
    '.wc-tit{font-family:"Shippori Mincho",serif;font-weight:800;font-size:15px;color:#2a2018;}',
    '.wc-sec{margin:10px 16px 0;}',
    '.wc-sec-h{display:flex;align-items:baseline;justify-content:space-between;}',
    '.wc-sec-tit{font-family:"Shippori Mincho",serif;font-size:14.5px;font-weight:800;color:#2a2018;}',
    '.wc-sec-sub{font-size:11px;color:#a89a80;margin-top:2px;}',
    '.wc-all{font-size:11px;color:#a83320;cursor:pointer;white-space:nowrap;}',
    '.wc-row{display:flex;gap:10px;overflow-x:auto;padding:6px 0 2px;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;}',
    '.wc-row::-webkit-scrollbar{display:none;}',
    '.wc-card{flex:0 0 calc(50% - 5px);background:#fff;border-radius:20px;border:1px solid #e8dfcd;box-shadow:0 3px 12px -6px rgba(90,70,40,.2);overflow:hidden;scroll-snap-align:start;}',
    '.wc-img{position:relative;width:100%;aspect-ratio:4/3;display:flex;align-items:center;justify-content:center;font-size:34px;overflow:hidden;cursor:pointer;}',
    '.wc-ai{position:absolute;top:5px;left:5px;background:rgba(255,255,255,.92);color:#6e5a20;font-size:8px;font-weight:700;padding:2px 6px;border-radius:10px;}',
    '.wc-pr{position:absolute;top:8px;right:8px;background:rgba(42,32,24,.65);color:#fff;font-size:9px;padding:2px 7px;border-radius:10px;}',
    '.wc-body{padding:9px 10px 10px;}',
    '.wc-name{font-family:"Shippori Mincho",serif;font-size:11px;font-weight:800;color:#2a2018;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.wc-meta{font-size:9.5px;color:#a89a80;margin-top:3px;}',
    '.wc-meta b{color:#2a2018;font-weight:700;}',
    '.wc-sub2{font-size:9.5px;color:#a89a80;margin-top:2px;}',
    '.wc-genre{display:inline-block;font-size:9px;color:#7a4a10;background:#f5efd6;border-radius:8px;padding:1px 7px;margin-top:5px;}',
    '.wc-price{font-size:11px;font-weight:800;color:#a83320;margin-top:4px;}',
    '.wc-add{display:block;width:100%;margin-top:6px;padding:5px 0;border-radius:10px;border:1px solid #c9a84c;background:#fff;color:#7a4a10;font-size:10px;font-weight:700;cursor:pointer;font-family:"Shippori Mincho",serif;}',
    '.wc-add.on{background:#a83320;border-color:#a83320;color:#fff;}',
    '.wc-advice{background:#fff;border-radius:24px;padding:18px;margin:28px 16px 0;box-shadow:0 4px 16px -8px rgba(90,70,40,.25);border-left:4px solid #7a5aa8;}',
    '.wc-advice-t{font-family:"Shippori Mincho",serif;font-size:13px;font-weight:800;color:#5a4470;}',
    '.wc-advice-b{font-size:12.5px;color:#3f382e;line-height:1.9;margin-top:8px;}',
    '.wc-list{background:#fff;border-radius:24px;padding:16px;margin:20px 16px 0;box-shadow:0 4px 16px -8px rgba(90,70,40,.25);}',
    '.wc-li{display:flex;align-items:center;gap:10px;padding:9px 4px;border-bottom:1px dashed #eee2c8;font-size:12.5px;color:#2a2018;}',
    '.wc-li:last-child{border-bottom:none;}',
    '.wc-li-ic{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:17px;flex:0 0 34px;color:#fff;}',
    '.wc-li-nm{flex:1;line-height:1.4;}',
    '.wc-li-tag{font-size:10px;color:#a89a80;}',
    '.wc-li-btn{border:none;background:#f3ede1;color:#8a7a5c;width:26px;height:26px;border-radius:8px;cursor:pointer;font-size:12px;}',
    '.wc-cta-wrap{position:fixed;bottom:0;left:0;right:0;z-index:6;padding:10px 16px calc(12px + env(safe-area-inset-bottom));background:linear-gradient(to top,#F8F5EF 65%,rgba(248,245,239,0));}',
    '.wc-cta{display:block;width:100%;max-width:468px;margin:0 auto;height:56px;border:none;border-radius:28px;background:linear-gradient(135deg,#7a5aa8,#5a4470);color:#fff;font-size:15px;font-weight:800;font-family:"Shippori Mincho",serif;cursor:pointer;box-shadow:0 8px 20px -6px rgba(90,68,112,.5);}',
    '.wc-hero{position:relative;width:100%;aspect-ratio:4/3;background:#ddd;overflow:hidden;}',
    '.wc-hero img{width:100%;height:100%;object-fit:cover;display:block;}',
    '.wc-hero-grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(20,14,8,.72),rgba(20,14,8,0) 55%);}',
    '.wc-hero-t{position:absolute;left:18px;right:18px;bottom:44px;color:#fff;font-family:"Shippori Mincho",serif;font-size:19px;font-weight:800;line-height:1.5;text-shadow:0 2px 8px rgba(0,0,0,.4);}',
    '.wc-hero-chips{position:absolute;left:18px;bottom:14px;display:flex;gap:8px;}',
    '.wc-chip{background:rgba(42,32,24,.6);color:#fff;font-size:11px;padding:4px 11px;border-radius:14px;}',
    '.wc-tl{margin:20px 16px 0;background:#fff;border-radius:24px;padding:18px 16px;box-shadow:0 4px 16px -8px rgba(90,70,40,.25);}',
    '.wc-tl-i{display:flex;gap:12px;align-items:center;padding:9px 0;}',
    '.wc-tl-n{width:26px;height:26px;border-radius:50%;background:#a83320;color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex:0 0 26px;}',
    '.wc-tl-th{width:54px;height:54px;border-radius:12px;overflow:hidden;flex:0 0 54px;display:flex;align-items:center;justify-content:center;font-size:24px;color:#fff;}',
    '.wc-tl-th img{width:100%;height:100%;object-fit:cover;}',
    '.wc-tl-nm{font-size:13px;font-weight:700;color:#2a2018;font-family:"Shippori Mincho",serif;}',
    '.wc-tl-mt{font-size:10.5px;color:#a89a80;margin-top:2px;}',
    '.wc-tl-mv{font-size:10.5px;color:#c9a84c;padding:0 0 0 13px;border-left:2px dotted #e0d4b4;margin-left:12px;height:16px;line-height:16px;}',
    '.wc-btn2{flex:1;height:48px;border-radius:24px;font-size:13.5px;font-weight:800;font-family:"Shippori Mincho",serif;cursor:pointer;}',
    '.wc-save{background:#fff;border:1.5px solid #c9a84c;color:#7a4a10;}',
    '.wc-navi{background:linear-gradient(135deg,#a83320,#7a2114);border:none;color:#fff;box-shadow:0 8px 20px -6px rgba(168,51,32,.5);}'
  ].join('\n');
  document.head.appendChild(css);
  var css2 = document.createElement('style');
  css2.textContent = [
    '#wcSpot{position:fixed;inset:0;z-index:265;background:#F8F5EF;display:none;overflow-y:auto;-webkit-overflow-scrolling:touch;}',
    '.wc-sd-inner{max-width:500px;margin:0 auto;padding-bottom:110px;}',
    '.wc-sd-hero{position:relative;width:100%;height:340px;background:linear-gradient(135deg,#8a9ab0,#4a5a70);overflow:hidden;}',
    '.wc-sd-hero>img{width:100%;height:100%;object-fit:cover;display:block;}',
    '.wc-sd-grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,10,5,.8),rgba(15,10,5,.05) 62%);}',
    '.wc-sd-back{position:absolute;top:14px;left:14px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.94);display:flex;align-items:center;justify-content:center;font-size:19px;color:#a83320;cursor:pointer;z-index:3;box-shadow:0 2px 8px rgba(0,0,0,.2);}',
    '.wc-sd-heart{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.94);display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer;z-index:3;}',
    '.wc-sd-badge{position:absolute;top:60px;left:14px;background:rgba(255,255,255,.92);color:#6e5a20;font-size:10px;font-weight:700;padding:4px 11px;border-radius:14px;z-index:2;}',
    '.wc-sd-tit{position:absolute;left:18px;right:18px;bottom:96px;color:#fff;font-family:"Shippori Mincho",serif;font-size:21px;font-weight:800;text-shadow:0 2px 10px rgba(0,0,0,.45);z-index:2;}',
    '.wc-sd-meta{position:absolute;left:18px;right:18px;bottom:72px;color:#f5efe2;font-size:12px;z-index:2;}',
    '.wc-sd-btns{position:absolute;left:18px;bottom:18px;display:flex;gap:10px;z-index:2;}',
    '.wc-sd-add{background:linear-gradient(135deg,#7a5aa8,#5a4470);color:#fff;border:none;border-radius:20px;padding:10px 18px;font-size:12.5px;font-weight:700;font-family:"Shippori Mincho",serif;cursor:pointer;}',
    '.wc-sd-map{background:rgba(255,255,255,.94);color:#2a2018;border:none;border-radius:20px;padding:10px 18px;font-size:12.5px;font-weight:700;font-family:"Shippori Mincho",serif;cursor:pointer;}',
    '.wc-sd-card{background:#fff;border-radius:20px;padding:16px;margin:14px 16px 0;box-shadow:0 4px 16px -8px rgba(90,70,40,.22);}',
    '.wc-sd-h{font-family:"Shippori Mincho",serif;font-size:14px;font-weight:800;color:#2a2018;margin-bottom:8px;}',
    '.wc-sd-reason{border-left:4px solid #7a5aa8;}',
    '.wc-sd-reason .wc-sd-h{color:#5a4470;}',
    '.wc-sd-txt{font-size:12.5px;color:#3f382e;line-height:1.9;}',
    '.wc-sd-chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px;}',
    '.wc-sd-chip{font-size:10px;color:#7a4a10;background:#f5efd6;border-radius:12px;padding:3px 10px;}',
    '.wc-sd-g{display:flex;gap:8px;overflow-x:auto;padding:4px 0 2px;}',
    '.wc-sd-g img{width:112px;height:84px;object-fit:cover;border-radius:12px;flex:0 0 auto;cursor:pointer;}',
    '.wc-sd-g .ph{width:112px;height:84px;border-radius:12px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;font-size:26px;color:#fff;}',
    '.wc-menu{display:flex;gap:10px;overflow-x:auto;padding:4px 0 2px;}',
    '.wc-menu-c{flex:0 0 150px;border:1px solid #eee2c8;border-radius:14px;overflow:hidden;background:#fff;}',
    '.wc-menu-img{height:70px;display:flex;align-items:center;justify-content:center;font-size:26px;color:#fff;}',
    '.wc-menu-b{padding:8px 10px 10px;}',
    '.wc-menu-n{font-size:11.5px;font-weight:700;color:#2a2018;font-family:"Shippori Mincho",serif;}',
    '.wc-menu-p{font-size:12px;font-weight:800;color:#a83320;margin-top:3px;}',
    '.wc-menu-d{font-size:9.5px;color:#a89a80;margin-top:3px;line-height:1.5;}',
    '.wc-info-row{display:flex;gap:10px;padding:7px 0;border-bottom:1px dashed #eee2c8;font-size:12px;color:#3f382e;}',
    '.wc-info-row:last-of-type{border-bottom:none;}',
    '.wc-info-ic{flex:0 0 20px;text-align:center;}',
    '.wc-info-k{flex:0 0 70px;color:#a89a80;font-size:11px;padding-top:1px;}',
    '.wc-rev{border:1px solid #eee2c8;border-radius:14px;padding:10px 12px;margin-top:8px;}',
    '.wc-rev-h{display:flex;align-items:center;gap:8px;font-size:11.5px;font-weight:700;color:#2a2018;}',
    '.wc-rev-av{width:26px;height:26px;border-radius:50%;background:#c9a84c;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;}',
    '.wc-rev-st{color:#c9a84c;font-size:10px;}',
    '.wc-rev-t{font-size:11.5px;color:#3f382e;line-height:1.7;margin-top:6px;}',
    '.wc-mini{flex:0 0 128px;background:#fff;border:1px solid #e8dfcd;border-radius:16px;overflow:hidden;}',
    '.wc-mini-img{height:76px;display:flex;align-items:center;justify-content:center;font-size:24px;color:#fff;overflow:hidden;position:relative;}',
    '.wc-mini-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}',
    '.wc-mini-b{padding:7px 9px 9px;}',
    '.wc-mini-n{font-size:10.5px;font-weight:700;color:#2a2018;font-family:"Shippori Mincho",serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.wc-mini-m{font-size:9px;color:#a89a80;margin-top:2px;}',
    '.wc-mini-add{display:block;width:100%;margin-top:6px;padding:4px 0;border-radius:9px;border:1px solid #c9a84c;background:#fff;color:#7a4a10;font-size:9.5px;font-weight:700;cursor:pointer;}',
    '.wc-mini-add.on{background:#a83320;border-color:#a83320;color:#fff;}',
    '.wc-hotel2{display:flex;gap:10px;margin-top:8px;}',
    '.wc-hbtn{flex:1;border:none;border-radius:12px;padding:8px 0;font-size:10.5px;font-weight:700;cursor:pointer;}',
    '.wc-hbtn.rk{background:#bf0000;color:#fff;}',
    '.wc-hbtn.jl{background:#f60;color:#fff;}',
    '#wcLb{position:fixed;inset:0;z-index:270;background:rgba(10,8,5,.92);display:none;align-items:center;justify-content:center;cursor:pointer;}',
    '#wcLb img{max-width:94%;max-height:88%;border-radius:10px;}'
  ].join('\n');
  document.head.appendChild(css2);
  var css3 = document.createElement('style');
  css3.textContent = [
    '.wcb-card{background:#fff;border-radius:24px;box-shadow:0 8px 24px rgba(0,0,0,.06);padding:18px 14px 14px;margin:16px 16px 0;}',
    '.wcb-tit{text-align:center;font-family:"Shippori Mincho",serif;font-size:16px;font-weight:800;color:#2a2018;}',
    '.wcb-sub{text-align:center;font-size:10.5px;color:#a89a80;margin:4px 0 8px;}',
    '.wcb-total{display:table;margin:0 auto 10px;font-size:11px;font-weight:700;color:#7a4a10;background:#f5efd6;border-radius:14px;padding:4px 14px;}',
    '.wcb-row{display:flex;align-items:center;gap:10px;padding:8px 2px;background:#fff;border-radius:14px;position:relative;}',
    '.wcb-row.drag{box-shadow:0 10px 24px rgba(0,0,0,.18);transform:scale(1.02);z-index:5;}',
    '.wcb-numcol{display:flex;flex-direction:column;align-items:center;flex:0 0 30px;align-self:stretch;}',
    '.wcb-num{width:29px;height:29px;border-radius:50%;background:#a83320;color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center;flex:0 0 29px;}',
    '.wcb-line{flex:1;width:0;border-left:2px dashed #E5E0D8;margin-top:3px;}',
    '.wcb-img{width:84px;height:64px;border-radius:12px;flex:0 0 84px;display:flex;align-items:center;justify-content:center;font-size:26px;color:#fff;overflow:hidden;position:relative;cursor:pointer;}',
    '.wcb-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}',
    '.wcb-info{flex:1;min-width:0;}',
    '.wcb-nm{font-size:13px;font-weight:800;color:#1F1F1F;font-family:"Shippori Mincho",serif;display:flex;align-items:center;gap:6px;cursor:pointer;}',
    '.wcb-nm span.t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.wcb-bdg{font-size:8.5px;color:#5a4470;background:#ece5f5;border-radius:10px;padding:2px 8px;font-weight:700;white-space:nowrap;flex:0 0 auto;}',
    '.wcb-sb{font-size:10px;color:#6B6B6B;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.wcb-tags{display:flex;gap:5px;margin-top:4px;flex-wrap:wrap;}',
    '.wcb-tag{font-size:8.5px;color:#A8844D;background:#F7F2E6;border-radius:10px;padding:2px 8px;}',
    '.wcb-tag.ai{color:#A06A00;background:#FFF3D8;}',
    '.wcb-stay{flex:0 0 54px;background:#FFF7E6;border:1px solid #EADFC6;border-radius:12px;text-align:center;padding:5px 2px;}',
    '.wcb-stay span{display:block;font-size:8.5px;color:#A8844D;}',
    '.wcb-stay b{display:block;font-size:12px;color:#2a2018;line-height:1.3;}',
    '.wcb-handle{flex:0 0 24px;color:#B8B2A6;font-size:19px;text-align:center;cursor:grab;touch-action:none;user-select:none;padding:8px 0;}',
    '.wcb-addbtn{display:block;width:100%;margin-top:10px;padding:11px 0;border:2px dashed #E6E1D6;border-radius:14px;background:#fff;color:#7a5aa8;font-size:12.5px;font-weight:700;cursor:pointer;font-family:"Shippori Mincho",serif;}'
  ].join('\n');
  document.head.appendChild(css3);

  // ─────────────────────────────────────────
  // 3. 状態（選択中ルート・追加スポット）
  // ─────────────────────────────────────────
  var state = { route:null, added:[] };
  function toast(m){ if (typeof showToast==='function') showToast(m); }
  function esc(s){ return String(s).replace(/"/g,'&quot;'); }

  // プレビュー（カスタマイズ済みルート）用のオーバーレイ
  var prev = document.createElement('div'); prev.id='wcPrev';
  prev.innerHTML = '<div class="wc-hd"><span class="wc-back" id="wcPrevBack">‹</span><span class="wc-tit">カスタマイズ済みルート</span></div><div class="wc-inner" id="wcPrevBody"></div>';
  document.body.appendChild(prev);
  document.getElementById('wcPrevBack').onclick = function(){ prev.style.display='none'; };

  var currentNear = '';
  // Google Placesでお店・スポットの実写真を取得（APIキーがある場合のみ／なければ絵文字のまま）
  var wcPhotoCache = {};
  function resolveCardPhotos(){
    try{
      if (typeof API_KEY==='undefined' || !API_KEY) return;
      if (typeof google==='undefined' || !google.maps || !google.maps.places) return;
      var svc = new google.maps.places.PlacesService(document.createElement('div'));
      document.querySelectorAll('#wcInline .wc-img[data-q]').forEach(function(el){
        if (el.querySelector('img')) return;
        var q = el.getAttribute('data-q');
        function setImg(url){
          if (!url || el.querySelector('img')) return;
          var im = document.createElement('img');
          im.src = url; im.loading = 'lazy';
          im.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
          el.insertBefore(im, el.firstChild);
          var sp = el.querySelector('span:not(.wc-ai):not(.wc-pr)');
          if (sp) sp.style.display = 'none';
        }
        if (wcPhotoCache[q] !== undefined) { setImg(wcPhotoCache[q]); return; }
        wcPhotoCache[q] = null;
        svc.findPlaceFromQuery({query:q, fields:['photos']}, function(res, status){
          if (status === google.maps.places.PlacesServiceStatus.OK && res && res[0] && res[0].photos && res[0].photos.length){
            var u = res[0].photos[0].getUrl({maxWidth:500});
            wcPhotoCache[q] = u; setImg(u);
          }
        });
      });
    }catch(e){}
  }

  var CATS = [
    {key:'gourmet', tit:'グルメ',       sub:'おすすめランチ'},
    {key:'cafe',    tit:'カフェ・スイーツ', sub:'ひと休みに'},
    {key:'sight',   tit:'観光スポット',   sub:'あわせて立ち寄りたい'},
    {key:'exp',     tit:'体験・アクティビティ', sub:'旅を深める'},
    {key:'hotel',   tit:'宿泊施設',      sub:'巡拝の拠点に'}
  ];
  var CAT_LABEL = {gourmet:'ランチ',cafe:'カフェ',sight:'観光',exp:'体験',hotel:'宿泊'};

  function cardHtml(item, cat, idx){
    return '<div class="wc-card">'
      + '<div class="wc-img" data-q="'+esc(item.name+' '+(currentNear||''))+'" style="background:'+item.img.grad+'">'
      +   (item.photoUrl ? '<img src="'+esc(item.photoUrl)+'" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">' : '')
      +   '<span style="filter:drop-shadow(0 2px 6px rgba(0,0,0,.3));'+(item.photoUrl?'display:none;':'')+'">'+item.img.emoji+'</span>'
      +   '<span class="wc-ai">🌿 おすすめ度 '+item.ai+'点</span>'
      + '</div>'
      + '<div class="wc-body">'
      +   '<div class="wc-name" title="'+esc(item.name+'（'+item.genre+'）')+'">'+item.name+'</div>'
      +   '<div class="wc-meta">★<b style="color:#2a2018">'+item.rating.toFixed(1)+'</b>（'+item.reviews+'）・'+item.walk+'</div>'
      +   (item.price ? '<div class="wc-price">'+item.price+'</div>' : '')
      +   '<button class="wc-add" data-cat="'+cat.key+'" data-idx="'+idx+'">＋ ルートに追加</button>'
      + '</div></div>';
  }

  // ─────────────────────────────────────────
  // 4. 検索結果ページ（ルート一覧）の下に提案セクションを組み込む
  // ─────────────────────────────────────────
  function buildInline(){
    var ct = document.getElementById('aiRouteCards');
    if (!ct) return;
    var routes = window._dynamicRoutes || window.AI_ROUTES || [];
    if (!routes.length) return;
    if (!state.route || routes.indexOf(state.route) < 0) { state.route = routes[0]; state.added = []; state.items = null; }
    var d;
    if (window._dynamicRoutes) {
      var dk = dynKey(state.route);
      if (dynCache[dk]) { d = dynCache[dk]; }
      else if (dynCache[dk+':loading']) { d = null; }
      else {
        dynCache[dk+':loading'] = true;
        fetchDynamicNearby(state.route, function(res){
          dynCache[dk] = res || WC_DATA.dyn;
          delete dynCache[dk+':loading'];
          buildInlineKeep();
        });
        d = null;
      }
    } else { d = fetchNearby(state.route); }
    if (!d) {
      var oldL = document.getElementById('wcInline'); if (oldL) oldL.remove();
      var ld = document.createElement('div'); ld.id='wcInline';
      ld.innerHTML = '<div class="wc-sec" style="text-align:center;margin:26px 16px 40px"><div class="wc-sec-tit" style="font-size:15px">🌿 周辺のおすすめを探しています…</div><div class="wc-sec-sub">AIが'+String(state.route.spots[0].name).replace(/[（(].*$/,'')+'の近くのグルメ・カフェ・観光を検索中</div></div>';
      ct.appendChild(ld);
      return;
    }
    currentNear = d.near || String(state.route.spots[0].name).replace(/[（(].*$/,'');

    var old = document.getElementById('wcInline'); if (old) old.remove();
    var box = document.createElement('div'); box.id='wcInline';
    box.style.cssText = 'padding-bottom:96px;';
    var h = '';
    h += '<div id="wcAddedBox"></div>';
    h += '<div class="wc-sec" style="text-align:center;margin-top:18px">'
      + '<div class="wc-sec-tit" style="font-size:15.5px">🌿 この近くもおすすめです 🍃</div>'
      + '<div class="wc-sec-sub">AIが周辺スポットを見つけました（ベース：'+state.route.name+'）</div></div>';
    CATS.forEach(function(cat){
      var items = d[cat.key]||[];
      if (!items.length) return;
      h += '<div class="wc-sec"><div class="wc-sec-h"><div><span class="wc-sec-tit">'+cat.tit+'</span>'
        + ' <span class="wc-sec-sub">'+(cat.sub||'')+'</span></div><span class="wc-all">すべて見る ›</span></div>'
        + '<div class="wc-row">' + items.map(function(it,i){ return cardHtml(it,cat,i); }).join('') + '</div></div>';
    });

    box.innerHTML = h;
    ct.appendChild(box);
    renderAddedList();

    box.querySelectorAll('.wc-add').forEach(function(btn){
      btn.onclick = function(){
        var cat = btn.getAttribute('data-cat'), idx = +btn.getAttribute('data-idx');
        var item = (fetchNearby(state.route)[cat]||[])[idx];
        if (!item) return;
        var key = cat+':'+idx;
        var pos = state.added.findIndex(function(a){ return a.key===key; });
        if (pos>-1) { state.added.splice(pos,1); btn.classList.remove('on'); btn.textContent='＋ ルートに追加'; }
        else { state.added.push({key:key,cat:cat,item:item}); btn.classList.add('on'); btn.textContent='✓ 追加済み'; toast('🌿 「'+item.name+'」をルートに追加しました'); }
        renderAddedList();
      };
    });
    box.querySelectorAll('.wc-all').forEach(function(a){ a.onclick=function(){ toast('「すべて見る」はAPI接続後に対応予定です'); }; });
    // カード画像タップ → スポット詳細ページ
    box.querySelectorAll('.wc-card').forEach(function(cardEl){
      var img = cardEl.querySelector('.wc-img');
      var btn = cardEl.querySelector('.wc-add');
      if (img && btn) img.onclick = function(){ openSpot(btn.getAttribute('data-cat'), +btn.getAttribute('data-idx')); };
      var nameEl = cardEl.querySelector('.wc-name');
      if (nameEl && btn){ nameEl.style.cursor='pointer'; nameEl.onclick = function(){ openSpot(btn.getAttribute('data-cat'), +btn.getAttribute('data-idx')); }; }
    });

    // 画面下固定の「カスタマイズしたルートを見る」ボタン
    var pg = document.getElementById('pgAiRouteList');
    if (pg && !document.getElementById('wcInlineCtaBar')) {
      var bar = document.createElement('div');
      bar.id = 'wcInlineCtaBar'; bar.className = 'wc-cta-wrap';
      bar.innerHTML = '<button class="wc-cta" id="wcInlineCta">カスタマイズしたルートを見る →</button>';
      pg.appendChild(bar);
      document.getElementById('wcInlineCta').onclick = openPreview;
    }
    resolveCardPhotos();
    setTimeout(resolveCardPhotos, 1200); // SDK読み込みが遅れた場合の再試行
  }

  // 滞在時間（分）の目安
  var STAY = {shrine:40, gourmet:60, cafe:30, sight:30, exp:60};
  var CAT_BADGE = {gourmet:'ランチ', cafe:'カフェ・休憩', sight:'観光', exp:'体験', hotel:'宿泊'};

  // 並び順つきのルート項目リストを最新化（神社＋追加スポット）
  function ensureItems(){
    if (!state.route) return;
    var prev = state.items || [];
    var valid = [];
    prev.forEach(function(it){
      if (it.type==='shrine' && state.route.spots.some(function(s){ return s.name===it.spot.name; })) valid.push(it);
      if (it.type==='add' && state.added.some(function(a){ return a.key===it.a.key; })) valid.push(it);
    });
    state.route.spots.forEach(function(s){
      if (!valid.some(function(it){ return it.type==='shrine' && it.spot.name===s.name; })) valid.push({type:'shrine', spot:s});
    });
    state.added.forEach(function(a){
      if (!valid.some(function(it){ return it.type==='add' && it.a.key===a.key; })) valid.push({type:'add', a:a});
    });
    state.items = valid;
  }

  function renderAddedList(){
    var boxEl = document.getElementById('wcAddedBox');
    if (!boxEl || !state.route) return;
    ensureItems();
    // 合計滞在時間（宿泊は別枠）
    var total = 0, hotelCount = 0;
    state.items.forEach(function(it){
      if (it.type==='shrine') total += STAY.shrine;
      else if (it.a.cat==='hotel') hotelCount++;
      else total += (STAY[it.a.cat]||40);
    });
    var totalTxt = '合計滞在 約' + (total>=60 ? Math.floor(total/60)+'時間'+(total%60?total%60+'分':'') : total+'分')
      + (hotelCount ? '＋宿泊'+hotelCount+'泊' : '') + '（移動時間は別）';

    var h = '<div class="wcb-card">'
      + '<div class="wcb-tit">✦ 現在のルート ✦</div>'
      + '<div class="wcb-sub">追加したスポットで、あなただけの巡礼ルートを作りましょう</div>'
      + '<div class="wcb-total">'+totalTxt+'</div>'
      + '<div id="wcbList">';
    state.items.forEach(function(it, i){
      var last = (i === state.items.length-1);
      var num = '<div class="wcb-numcol"><div class="wcb-num">'+(i+1)+'</div>'+(last?'':'<div class="wcb-line"></div>')+'</div>';
      if (it.type==='shrine') {
        var s = it.spot;
        h += '<div class="wcb-row" data-i="'+i+'">'+num
          + '<div class="wcb-img" data-shrinename="'+esc(s.name)+'" style="background:'+G.sight+'">'+(s.photo?'<img src="'+esc(s.photo)+'" loading="lazy">':'⛩')+'</div>'
          + '<div class="wcb-info"><div class="wcb-nm" data-shrinename="'+esc(s.name)+'"><span class="t">'+s.name+'</span><span class="wcb-bdg">必須スポット</span></div>'
          + '<div class="wcb-sb">'+(s.loc||'')+'</div>'
          + '<div class="wcb-tags"><span class="wcb-tag">参拝・観光</span></div></div>'
          + '<div class="wcb-stay"><span>滞在時間</span><b>'+STAY.shrine+'分</b></div>'
          + '<div class="wcb-handle" data-h="'+i+'">≡</div></div>';
      } else {
        var a = it.a, isHotel = a.cat==='hotel';
        h += '<div class="wcb-row" data-i="'+i+'">'+num
          + '<div class="wcb-img" data-ocat="'+a.cat+'" data-okey="'+esc(a.key)+'" style="background:'+a.item.img.grad+'">'
          + (a.item.photoUrl?'<img src="'+esc(a.item.photoUrl)+'" loading="lazy">':a.item.img.emoji)+'</div>'
          + '<div class="wcb-info"><div class="wcb-nm" data-ocat="'+a.cat+'" data-okey="'+esc(a.key)+'"><span class="t">'+a.item.name+'</span><span class="wcb-bdg">'+(CAT_BADGE[a.cat]||'')+'</span></div>'
          + '<div class="wcb-sb">'+(currentNear||'')+'から'+a.item.walk+'</div>'
          + '<div class="wcb-tags"><span class="wcb-tag">'+a.item.genre+'</span><span class="wcb-tag ai">おすすめ度 '+a.item.ai+'点</span></div></div>'
          + (isHotel
             ? '<div class="wcb-stay"><span>宿泊</span><b>1泊</b></div>'
             : '<div class="wcb-stay"><span>滞在時間</span><b>'+(STAY[a.cat]||40)+'分</b></div>')
          + '<div class="wcb-handle" data-h="'+i+'">≡</div></div>';
      }
    });
    h += '</div>'
      + '<button class="wcb-addbtn" id="wcbAdd">＋ スポットを追加</button>'
      + '<div style="text-align:center;font-size:9.5px;color:#b8b2a6;margin-top:7px">≡ を押したまま上下で並び替え ／ 外すときは下のカードの「✓追加済み」をもう一度タップ</div>'
      + '</div>';
    boxEl.innerHTML = h;

    // タップで詳細ページへ
    boxEl.querySelectorAll('[data-shrinename]').forEach(function(el){
      el.onclick = function(){ if (typeof window.openSpotDetail==='function') window.openSpotDetail(el.getAttribute('data-shrinename')); };
    });
    boxEl.querySelectorAll('[data-okey]').forEach(function(el){
      el.onclick = function(){
        var key = el.getAttribute('data-okey');
        var idx = +key.split(':')[1];
        openSpot(el.getAttribute('data-ocat'), idx);
      };
    });
    // 「＋スポットを追加」→ 下の提案セクションへスクロール
    var addBtn = document.getElementById('wcbAdd');
    if (addBtn) addBtn.onclick = function(){
      var sec = document.querySelector('#wcInline .wc-sec:nth-of-type(1)');
      var target = document.querySelectorAll('#wcInline .wc-sec')[1] || sec;
      if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
    };
    // ドラッグで並び替え（ハンドル ≡ を押したまま上下）
    setupDrag();
  }

  function setupDrag(){
    var list = document.getElementById('wcbList');
    if (!list) return;
    list.querySelectorAll('.wcb-handle').forEach(function(handle){
      handle.onpointerdown = function(ev){
        ev.preventDefault();
        var row = handle.closest('.wcb-row');
        var startIdx = +row.getAttribute('data-i');
        var curIdx = startIdx;
        row.classList.add('drag');
        handle.setPointerCapture(ev.pointerId);
        var move = function(e){
          var rows = [].slice.call(list.querySelectorAll('.wcb-row'));
          for (var j=0; j<rows.length; j++){
            if (rows[j]===row) continue;
            var rc = rows[j].getBoundingClientRect();
            if (e.clientY > rc.top && e.clientY < rc.bottom){
              if (e.clientY < rc.top + rc.height/2) list.insertBefore(row, rows[j]);
              else list.insertBefore(row, rows[j].nextSibling);
              break;
            }
          }
        };
        var up = function(e){
          row.classList.remove('drag');
          handle.releasePointerCapture(ev.pointerId);
          document.removeEventListener('pointermove', move);
          document.removeEventListener('pointerup', up);
          // DOMの並びから state.items を再構成
          var order = [].slice.call(list.querySelectorAll('.wcb-row')).map(function(r){ return state.items[+r.getAttribute('data-i')]; });
          state.items = order;
          renderAddedList();
        };
        document.addEventListener('pointermove', move);
        document.addEventListener('pointerup', up);
      };
    });
  }

  // 削除後にボタン状態も同期して再構築（選択ルートは保持）
  function buildInlineKeep(){
    var keepRoute = state.route, keepAdded = state.added, keepItems = state.items;
    buildInline();
    state.route = keepRoute; state.added = keepAdded; state.items = keepItems;
    // ボタンの押下状態を復元
    keepAdded.forEach(function(a){
      var btn = document.querySelector('#wcInline .wc-add[data-cat="'+a.cat+'"][data-idx="'+a.key.split(':')[1]+'"]');
      if (btn) { btn.classList.add('on'); btn.textContent='✓ 追加済み'; }
    });
    renderAddedList();
  }

  // ─────────────────────────────────────────
  // 5. カスタマイズ済みルートのプレビュー
  // ─────────────────────────────────────────
  function buildTimeline(){
    ensureItems();
    return state.items.map(function(it){
      if (it.type==='shrine') return {name:it.spot.name, photo:it.spot.photo, meta:'約'+STAY.shrine+'分滞在', ic:'⛩', grad:G.sight};
      var a = it.a;
      return {name:a.item.name,
        meta:(a.cat==='hotel' ? '宿泊・1泊' : (CAT_LABEL[a.cat]||'')+'・約'+(STAY[a.cat]||40)+'分'),
        ic:a.item.img.emoji, grad:a.item.img.grad, photo:a.item.photoUrl||null};
    });
  }

  function openPreview(){
    if (!state.route) return;
    var r = state.route, tl = buildTimeline();
    var base = String(r.spots[0].name).replace(/[（(].*$/,'');
    var theme = (r.tags && r.tags[0]) ? r.tags[0] : '祈り';
    var title = base + 'とめぐる、<br>' + theme + 'の旅';
    var transIc = r.transport==='徒歩' ? '🚶 徒歩中心' : r.transport==='車' ? '🚗 車中心' : '🚃 電車・バス';
    var hero = r.spots[0].photo || '';
    var h = '<div class="wc-hero">' + (hero ? '<img src="'+esc(hero)+'">' : '<div style="width:100%;height:100%;background:'+G.sight+'"></div>')
      + '<div class="wc-hero-grad"></div>'
      + '<div style="position:absolute;top:14px;left:14px;background:rgba(255,255,255,.9);color:#5a4470;font-size:10px;font-weight:700;padding:4px 12px;border-radius:14px">カスタマイズ済みルート</div>'
      + '<div class="wc-hero-t">'+title+'</div>'
      + '<div class="wc-hero-chips"><span class="wc-chip">'+transIc+'</span><span class="wc-chip">🕐 '+(r.time||'')+'＋α</span><span class="wc-chip">📍 '+tl.length+'スポット</span></div></div>';
    h += '<div class="wc-tl">';
    tl.forEach(function(t,i){
      h += '<div class="wc-tl-i"><div class="wc-tl-n">'+(i+1)+'</div>'
        + '<div class="wc-tl-th" style="background:'+t.grad+'">'+(t.photo?'<img src="'+esc(t.photo)+'" loading="lazy">':t.ic)+'</div>'
        + '<div><div class="wc-tl-nm">'+t.name+'</div><div class="wc-tl-mt">'+t.meta+'</div></div></div>';
      if (i<tl.length-1) h += '<div class="wc-tl-mv">'+(r.transport==='徒歩'?'徒歩':'移動')+' 約10分</div>';
    });
    h += '</div>';
    h += '<div style="display:flex;gap:10px;margin:20px 16px 30px">'
      + '<button class="wc-btn2 wc-save" id="wcSave">♡ ルートを保存</button>'
      + '<button class="wc-btn2 wc-navi" id="wcNavi">✦ このルートでナビを開始 →</button></div>';
    document.getElementById('wcPrevBody').innerHTML = h;
    prev.style.display = 'block'; prev.scrollTop = 0;
    document.getElementById('wcSave').onclick = function(){
      try{
        var saved = JSON.parse(localStorage.getItem('wabi_custom_routes')||'[]');
        saved.push({route:r.id, name:r.name, added:state.added.map(function(a){return a.item.name;}), date:new Date().toISOString().slice(0,10)});
        localStorage.setItem('wabi_custom_routes', JSON.stringify(saved));
      }catch(e){}
      toast('♡ ルートを保存しました');
    };
    document.getElementById('wcNavi').onclick = function(){
      var names = tl.map(function(t){ return String(t.name).replace(/[（(].*$/,'').trim(); });
      var mode = r.transport==='徒歩' ? 'walking' : 'driving';
      var url = 'https://www.google.com/maps/dir/?api=1&origin=' + encodeURIComponent(names[0])
        + '&destination=' + encodeURIComponent(names[names.length-1])
        + (names.length>2 ? '&waypoints=' + encodeURIComponent(names.slice(1,-1).join('|')) : '')
        + '&travelmode=' + mode;
      window.open(url, '_blank');
    };
  }

  // ─────────────────────────────────────────
  // 4.5 検索ルートの神社数が少ないとき、周辺の神社仏閣をGoogleから補充
  //（例：7時間なら6社まで。内蔵データベースに無い神社を自動で追加）
  // ─────────────────────────────────────────
  var supplyCache = {};
  function wantSpotCount(){
    var t = window._aiSelTime || '3時間';
    return t==='2日' ? 8 : t==='7時間' ? 6 : t==='5時間' ? 4 : 3;
  }
  function supplementDynamicRoutes(){
    try{
      var routes = window._dynamicRoutes;
      if (!routes || !routes.length) return;
      var s0 = routes[0].spots && routes[0].spots[0];
      if (!s0 || !s0.lat) return;
      var want = wantSpotCount();
      var maxSpots = 0;
      routes.forEach(function(r){ if (r.spots.length > maxSpots) maxSpots = r.spots.length; });
      if (maxSpots >= want) return;
      if (typeof API_KEY==='undefined' || !API_KEY || typeof google==='undefined' || !google.maps || !google.maps.places) return;
      var ck = s0.name + ':' + want;
      if (supplyCache[ck] === 'loading') return;
      if (Array.isArray(supplyCache[ck])) { applySupplement(routes, supplyCache[ck], want); return; }
      supplyCache[ck] = 'loading';
      var trans = window._aiSelTrans || '電車';
      var radius = trans==='徒歩' ? 2500 : trans==='車' ? 15000 : 8000;
      var svc = new google.maps.places.PlacesService(document.createElement('div'));
      svc.nearbySearch({location:new google.maps.LatLng(s0.lat, s0.lng), radius:radius, keyword:'神社 寺', type:'place_of_worship'}, function(res, status){
        if (status !== google.maps.places.PlacesServiceStatus.OK || !res){ supplyCache[ck] = []; return; }
        var pool = res.filter(function(p){ return (p.user_ratings_total||0) >= 20 && p.geometry && p.geometry.location; })
          .sort(function(a,b){ return (b.user_ratings_total||0)-(a.user_ratings_total||0); })
          .map(function(p){
            return { name:p.name,
              loc:(p.vicinity||'').split(/[、,]/)[0]||'',
              move:'約15分', benefit:'開運・参拝',
              lat:p.geometry.location.lat(), lng:p.geometry.location.lng(),
              photo:(p.photos && p.photos.length) ? p.photos[0].getUrl({maxWidth:500}) : null };
          });
        supplyCache[ck] = pool;
        applySupplement(routes, pool, want);
        // 追加できたので画面を描き直す
        if (typeof window.renderRouteCards === 'function') window.renderRouteCards();
        if (typeof showToast === 'function') showToast('🌿 周辺の神社仏閣をルートに補充しました');
      });
    }catch(e){}
  }
  function applySupplement(routes, pool, want){
    routes.forEach(function(r, ri){
      var have = r.spots.map(function(s){ return s.name; });
      var cand = pool.filter(function(p){ return have.indexOf(p.name) < 0; });
      // ルートごとに始点をずらして変化をつける
      if (cand.length > 1) { var off = ri % cand.length; cand = cand.slice(off).concat(cand.slice(0, off)); }
      var i = 0;
      while (r.spots.length < want && i < cand.length){
        if (r.spots.every(function(s){ return s.name !== cand[i].name; })) r.spots.push(cand[i]);
        i++;
      }
    });
  }

  // ─────────────────────────────────────────
  // 5.5 スポット詳細ページ（カード画像タップで開く）
  // ─────────────────────────────────────────
  var spotPg = document.createElement('div'); spotPg.id='wcSpot';
  spotPg.innerHTML = '<div class="wc-sd-inner" id="wcSpotBody"></div><div class="wc-cta-wrap" style="z-index:266"><button class="wc-cta" id="wcSpotCta">このスポットを追加してルートを更新 →</button></div>';
  document.body.appendChild(spotPg);
  var lb = document.createElement('div'); lb.id='wcLb'; lb.innerHTML='<img>';
  lb.onclick = function(){ lb.style.display='none'; };
  document.body.appendChild(lb);

  var currentSpot = null; // {cat, idx, item}
  var placeCache = {};    // 店名 → Places詳細

  function starTxt(n){ return '★'.repeat(Math.round(n)) + '☆'.repeat(5-Math.round(n)); }

  function openSpot(cat, idx){
    var item = (fetchNearby(state.route)[cat]||[])[idx];
    if (!item) return;
    currentSpot = {cat:cat, idx:idx, item:item};
    renderSpot(item, cat);
    spotPg.style.display='block'; spotPg.scrollTop=0;
    enrichSpot(item, cat); // Placesで写真・営業時間・口コミを取得して差し込み
  }

  function renderSpot(item, cat){
    var d = fetchNearby(state.route);
    var isHotel = cat==='hotel';
    var h = '';
    // ① ヒーロー
    h += '<div class="wc-sd-hero" id="sdHeroBox" style="background:'+item.img.grad+'">'
      + (item.photoUrl ? '<img src="'+esc(item.photoUrl)+'" style="width:100%;height:100%;object-fit:cover">' : '')
      + '<div id="sdHeroEmoji" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:64px;'+(item.photoUrl?'display:none;':'')+'">'+item.img.emoji+'</div>'
      + '<div class="wc-sd-grad"></div>'
      + '<div class="wc-sd-back" id="sdBack">‹</div><div class="wc-sd-heart">♡</div>'
      + '<div class="wc-sd-badge">🌿 おすすめ度 '+item.ai+'点</div>'
      + '<div class="wc-sd-tit">'+item.name+'</div>'
      + '<div class="wc-sd-meta">★ '+item.rating.toFixed(1)+'（'+item.reviews+'件の口コミ）・'+(currentNear||'')+'から'+item.walk+'</div>'
      + '<div class="wc-sd-btns"><button class="wc-sd-add" id="sdAdd">＋ ルートに追加</button><button class="wc-sd-map" id="sdMap">📍 地図で見る</button></div>'
      + '</div>';
    // ② AIおすすめ理由
    h += '<div class="wc-sd-card wc-sd-reason"><div class="wc-sd-h">🌿 AIがおすすめする理由</div>'
      + '<div class="wc-sd-txt">'+item.name+'は、'+(currentNear||'神社')+'から'+item.walk+'。巡礼の途中で立ち寄りやすい'+item.genre+'の人気店です。地元の方にも観光客にも親しまれており、参拝とあわせて訪れるのに最適です。</div>'
      + '<div class="wc-sd-chips"><span class="wc-sd-chip">地元で人気</span><span class="wc-sd-chip">'+item.walk+'</span><span class="wc-sd-chip">'+item.genre+'</span></div></div>';
    // ③ 写真ギャラリー（Placesで後から差し込み）
    h += '<div class="wc-sd-card"><div class="wc-sd-h">📷 写真</div><div class="wc-sd-g" id="sdGallery">'
      + '<div class="ph" style="background:'+item.img.grad+'">'+item.img.emoji+'</div>'
      + '<div class="ph" style="background:'+G.sight+'">📷</div>'
      + '<div class="ph" style="background:'+G.cafe+'">📷</div>'
      + '</div><div id="sdGalleryNote" style="font-size:9.5px;color:#a89a80;margin-top:6px">※写真はAPIキー設定後に自動で本物が表示されます</div></div>';
    // ④ おすすめメニュー（飲食のみ・参考例）
    if (cat==='gourmet' || cat==='cafe') {
      h += '<div class="wc-sd-card"><div class="wc-sd-h">🍽 おすすめメニュー <span style="font-size:9.5px;color:#a89a80;font-weight:400">（参考・変わる場合があります）</span></div><div class="wc-menu">'
        + '<div class="wc-menu-c"><div class="wc-menu-img" style="background:'+item.img.grad+'">'+item.img.emoji+'</div><div class="wc-menu-b"><div class="wc-menu-n">名物・看板メニュー</div><div class="wc-menu-p">〜¥1,500</div><div class="wc-menu-d">お店を代表する一品。まずはこれから。</div></div></div>'
        + '<div class="wc-menu-c"><div class="wc-menu-img" style="background:'+G.cafe+'">🍵</div><div class="wc-menu-b"><div class="wc-menu-n">季節の一品</div><div class="wc-menu-p">〜¥1,000</div><div class="wc-menu-d">季節替わりのおすすめ。</div></div></div>'
        + '</div></div>';
    }
    // ⑤ 店舗情報
    h += '<div class="wc-sd-card"><div class="wc-sd-h">🏠 店舗情報</div><div id="sdInfo">'
      + '<div class="wc-info-row"><span class="wc-info-ic">🕐</span><span class="wc-info-k">営業時間</span><span id="sdHours">取得中…</span></div>'
      + '<div class="wc-info-row"><span class="wc-info-ic">📞</span><span class="wc-info-k">電話番号</span><span id="sdTel">取得中…</span></div>'
      + '<div class="wc-info-row"><span class="wc-info-ic">📍</span><span class="wc-info-k">住所</span><span id="sdAddr">取得中…</span></div>'
      + '</div><button class="wc-sd-map" id="sdMap2" style="width:100%;margin-top:12px;border:1px solid #c9a84c">📍 Googleマップで開く</button></div>';
    // ⑥ 口コミ
    h += '<div class="wc-sd-card"><div class="wc-sd-h">💬 口コミ（Google） <span style="font-size:9.5px;color:#a89a80;font-weight:400" id="sdRevNote">取得中…</span></div><div id="sdRevs"></div></div>';
    // ⑦ この近くの神社（現在のルートの神社）
    if (state.route && state.route.spots) {
      h += '<div class="wc-sd-card"><div class="wc-sd-h">⛩ この近くの神社</div><div class="wc-sd-g">'
        + state.route.spots.map(function(s){
            return '<div class="wc-mini"><div class="wc-mini-img" style="background:'+G.sight+'">'+(s.photo?'<img src="'+esc(s.photo)+'" loading="lazy">':'⛩')+'</div>'
              + '<div class="wc-mini-b"><div class="wc-mini-n">'+s.name+'</div><div class="wc-mini-m">巡拝ルート内</div></div></div>';
          }).join('')
        + '</div></div>';
    }
    // ⑧ この近くの観光スポット
    var sights = (d.sight||[]).filter(function(x){ return x.name!==item.name; });
    if (sights.length) {
      h += '<div class="wc-sd-card"><div class="wc-sd-h">🏞 この近くの観光スポット</div><div class="wc-sd-g">'
        + sights.map(function(x){
            var gi = (d.sight||[]).indexOf(x);
            var added = state.added.some(function(a){ return a.key==='sight:'+gi; });
            return '<div class="wc-mini"><div class="wc-mini-img" style="background:'+x.img.grad+'">'+x.img.emoji+'</div>'
              + '<div class="wc-mini-b"><div class="wc-mini-n">'+x.name+'</div><div class="wc-mini-m">'+x.walk+'</div>'
              + '<button class="wc-mini-add'+(added?' on':'')+'" data-scat="sight" data-sidx="'+gi+'">'+(added?'✓ 追加済み':'＋ 追加')+'</button></div></div>';
          }).join('')
        + '</div></div>';
    }
    // ⑨ この近くのホテル（アフィリエイト導線）
    var hotels = (d.hotel||[]).filter(function(x){ return x.name!==item.name; });
    if (hotels.length) {
      h += '<div class="wc-sd-card"><div class="wc-sd-h">🏨 この近くのホテル</div>'
        + hotels.map(function(x){
            return '<div style="border:1px solid #eee2c8;border-radius:14px;padding:10px 12px;margin-top:8px">'
              + '<div style="display:flex;gap:10px;align-items:center">'
              + '<div style="width:56px;height:56px;border-radius:12px;flex:0 0 56px;display:flex;align-items:center;justify-content:center;font-size:24px;color:#fff;background:'+x.img.grad+'">'+x.img.emoji+'</div>'
              + '<div><div style="font-size:12px;font-weight:700;font-family:\'Shippori Mincho\',serif">'+x.name+'</div>'
              + '<div style="font-size:10px;color:#a89a80;margin-top:2px">★'+x.rating.toFixed(1)+'（'+x.reviews+'）・'+x.walk+'</div>'
              + '<div style="font-size:12px;font-weight:800;color:#a83320;margin-top:2px">'+(x.price||'')+'</div></div></div>'
              + '<div class="wc-hotel2">'
              + '<button class="wc-hbtn rk" data-hname="'+esc(x.name)+'" data-htype="rk">楽天トラベルで見る</button>'
              + '<button class="wc-hbtn jl" data-hname="'+esc(x.name)+'" data-htype="jl">じゃらんで見る</button>'
              + '</div></div>';
          }).join('')
        + '</div>';
    }
    document.getElementById('wcSpotBody').innerHTML = h;

    // ボタン類の配線
    document.getElementById('sdBack').onclick = function(){ spotPg.style.display='none'; };
    function mapOpen(){ window.open('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(item.name+' '+(currentNear||'')),'_blank'); }
    document.getElementById('sdMap').onclick = mapOpen;
    document.getElementById('sdMap2').onclick = mapOpen;
    document.getElementById('sdAdd').onclick = function(){ addCurrentSpot(); };
    document.getElementById('wcSpotCta').onclick = function(){ addCurrentSpot(); spotPg.style.display='none'; };
    // 観光スポットの＋追加
    spotPg.querySelectorAll('.wc-mini-add').forEach(function(btn){
      btn.onclick = function(){
        var scat=btn.getAttribute('data-scat'), sidx=+btn.getAttribute('data-sidx');
        var it=(fetchNearby(state.route)[scat]||[])[sidx];
        if(!it) return;
        var key=scat+':'+sidx;
        if(!state.added.some(function(a){return a.key===key;})){
          state.added.push({key:key,cat:scat,item:it});
          btn.classList.add('on'); btn.textContent='✓ 追加済み';
          toast('🌿 「'+it.name+'」をルートに追加しました');
          buildInlineKeep();
        }
      };
    });
    // 楽天・じゃらん（※アフィリエイトIDは後日ここに組み込み）
    spotPg.querySelectorAll('.wc-hbtn').forEach(function(btn){
      btn.onclick = function(){
        var nm=btn.getAttribute('data-hname'), tp=btn.getAttribute('data-htype');
        var url = tp==='rk'
          ? 'https://search.travel.rakuten.co.jp/ds/hotellist/Japan?f_query='+encodeURIComponent(nm)
          : 'https://www.jalan.net/uw/uwp1300/uww1301.do?keyword='+encodeURIComponent(nm);
        window.open(url,'_blank');
      };
    });
  }

  function addCurrentSpot(){
    if(!currentSpot) return;
    var key=currentSpot.cat+':'+currentSpot.idx;
    if(!state.added.some(function(a){return a.key===key;})){
      state.added.push({key:key,cat:currentSpot.cat,item:currentSpot.item});
      toast('🌿 「'+currentSpot.item.name+'」をルートに追加しました');
      buildInlineKeep();
    } else {
      toast('すでにルートに追加されています');
    }
  }

  // Google Placesで実データ（写真・営業時間・電話・住所・口コミ）を差し込む
  function enrichSpot(item, cat){
    var fallbackRevs = function(){
      var el=document.getElementById('sdRevs'); if(!el) return;
      document.getElementById('sdRevNote').textContent='（APIキー設定後に実際の口コミが表示されます）';
      el.innerHTML=['巡礼の途中に立ち寄りました。雰囲気が良く、また来たいお店です。','参拝後にぴったり。地元の方にも人気なのが頷けます。','場所もわかりやすく、旅の思い出になりました。'].map(function(t,i){
        return '<div class="wc-rev"><div class="wc-rev-h"><span class="wc-rev-av">'+'参拝旅'[i]+'</span>サンプルさん <span class="wc-rev-st">★★★★☆</span></div><div class="wc-rev-t">'+t+'（サンプル表示）</div></div>';
      }).join('');
      var hs=document.getElementById('sdHours'); if(hs)hs.textContent='—（APIキー設定後に表示）';
      var tl=document.getElementById('sdTel'); if(tl)tl.textContent='—';
      var ad=document.getElementById('sdAddr'); if(ad)ad.textContent='—';
    };
    try{
      if (typeof API_KEY==='undefined' || !API_KEY || typeof google==='undefined' || !google.maps || !google.maps.places){ fallbackRevs(); return; }
      var q = item.name+' '+(currentNear||'');
      var svc = new google.maps.places.PlacesService(document.createElement('div'));
      var apply = function(p){
        // 写真
        if (p.photos && p.photos.length){
          var hero=document.getElementById('sdHeroBox');
          if(hero && !hero.querySelector('img')){
            var im=document.createElement('img'); im.src=p.photos[0].getUrl({maxWidth:900});
            im.style.cssText='width:100%;height:100%;object-fit:cover;';
            hero.insertBefore(im, hero.firstChild);
          }
          var he=document.getElementById('sdHeroEmoji'); if(he) he.style.display='none';
          var g=document.getElementById('sdGallery');
          if(g){ g.innerHTML=p.photos.slice(0,6).map(function(ph){ return '<img src="'+ph.getUrl({maxWidth:400})+'" loading="lazy">'; }).join('');
            g.querySelectorAll('img').forEach(function(im2){ im2.onclick=function(){ lb.querySelector('img').src=im2.src.replace('maxwidth=400','maxwidth=1200'); lb.style.display='flex'; }; });
            var note=document.getElementById('sdGalleryNote'); if(note) note.remove();
          }
        }
        // 店舗情報
        var hs=document.getElementById('sdHours');
        if(hs) hs.textContent = (p.opening_hours && p.opening_hours.weekday_text) ? p.opening_hours.weekday_text[0].replace(/^月曜日: /,'月 ')+' ほか' : '—';
        var tl=document.getElementById('sdTel'); if(tl) tl.textContent = p.formatted_phone_number || '—';
        var ad=document.getElementById('sdAddr'); if(ad) ad.textContent = p.formatted_address ? p.formatted_address.replace(/^日本、/,'') : '—';
        // 口コミ
        var el=document.getElementById('sdRevs');
        if(el && p.reviews && p.reviews.length){
          document.getElementById('sdRevNote').textContent='';
          el.innerHTML = p.reviews.slice(0,3).map(function(r){
            var nm=(r.author_name||'匿名').slice(0,10);
            var txt=(r.text||'').slice(0,90)+((r.text||'').length>90?'…':'');
            return '<div class="wc-rev"><div class="wc-rev-h"><span class="wc-rev-av">'+nm.slice(0,1)+'</span>'+nm+'さん <span class="wc-rev-st">'+starTxt(r.rating||4)+'</span></div><div class="wc-rev-t">'+txt+'</div></div>';
          }).join('');
        } else if(el && !el.children.length){ fallbackRevs(); }
      };
      if (placeCache[q]) { apply(placeCache[q]); return; }
      svc.findPlaceFromQuery({query:q, fields:['place_id']}, function(res, status){
        if (status===google.maps.places.PlacesServiceStatus.OK && res && res[0] && res[0].place_id){
          svc.getDetails({placeId:res[0].place_id, fields:['photos','formatted_phone_number','opening_hours','formatted_address','reviews']}, function(p, st2){
            if (st2===google.maps.places.PlacesServiceStatus.OK && p){ placeCache[q]=p; apply(p); }
            else fallbackRevs();
          });
        } else fallbackRevs();
      });
    }catch(e){ fallbackRevs(); }
  }

  // ─────────────────────────────────────────
  // 6. アプリへの組み込み
  // ─────────────────────────────────────────
  // ルート一覧が描画されるたびに、下に提案セクションを付ける
  var origRRC = window.renderRouteCards;
  if (typeof origRRC === 'function') {
    window.renderRouteCards = function(){
      origRRC();
      try { state.route = null; state.added = []; state.items = null; buildInline(); supplementDynamicRoutes(); } catch(e){}
    };
  }
  // 「このルートを選ぶ」＝そのルートをベースにして、おすすめセクションへ移動
  window.selectRoute = function(rid){
    var routes = window._dynamicRoutes || window.AI_ROUTES || [];
    var route = routes.find(function(r){ return r.id===rid; });
    if (!route && window.AI_ROUTES) route = window.AI_ROUTES.find(function(r){ return r.id===rid; });
    if (!route || !route.spots || !route.spots.length) return;
    state.route = route; state.added = []; state.items = null;
    buildInline();
    toast('🌿 「'+route.name+'」をベースにしました。下のおすすめを追加できます');
    var el = document.getElementById('wcInline');
    if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
  };

  // ─────────────────────────────────────────
  // 7. トップ「みんなの最新投稿」を2列フォトグリッドに刷新
  // ─────────────────────────────────────────
  var css4 = document.createElement('style');
  css4.textContent = [
    '.wcp-hd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px;}',
    '.wcp-tit{font-size:16px;font-weight:800;color:#2F2F2F;font-family:"Shippori Mincho",serif;}',
    '.wcp-sub{font-size:11.5px;color:#6B6B6B;margin-top:2px;}',
    '.wcp-more{font-size:12px;color:#7a5aa8;font-weight:700;cursor:pointer;padding-top:3px;white-space:nowrap;}',
    '.wcp-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}',
    '.wcp-card{position:relative;aspect-ratio:3/4;border-radius:16px;overflow:hidden;background:linear-gradient(135deg,#8a9ab0,#4a5a70);cursor:pointer;}',
    '.wcp-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}',
    '.wcp-card.noimg img{display:none;}',
    '.wcp-card.noimg::after{content:"⛩";position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:38px;color:#fff;}',
    '.wcp-grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.62),rgba(0,0,0,0) 55%);}',
    '.wcp-info{position:absolute;left:10px;right:10px;bottom:9px;color:#fff;}',
    '.wcp-userrow{display:flex;align-items:center;gap:7px;}',
    '.wcp-av{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex:0 0 28px;border:1.5px solid rgba(255,255,255,.7);}',
    '.wcp-un{flex:1;font-size:12px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-shadow:0 1px 4px rgba(0,0,0,.5);}',
    '.wcp-like{font-size:17px;cursor:pointer;line-height:1;}',
    '.wcp-like.on{color:#ff5a5a;}',
    '.wcp-tags{display:flex;gap:8px;margin-top:6px;font-size:10.5px;white-space:nowrap;overflow:hidden;text-shadow:0 1px 4px rgba(0,0,0,.5);}',
    '.wcp-postbtn{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;margin-top:14px;padding:12px 0;border:1.5px solid #7a5aa8;border-radius:12px;background:#fff;color:#7a5aa8;font-size:14px;font-weight:700;cursor:pointer;font-family:"Shippori Mincho",serif;}'
  ].join('\n');
  document.head.appendChild(css4);

  // 神社名からWikipediaの実写真を一括取得（投稿カード用）
  function wikiPhotosFor(names, cb){
    try{
      var url='https://ja.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=thumbnail&pithumbsize=600&redirects=1&titles='+encodeURIComponent(names.join('|'));
      fetch(url).then(function(r){ return r.json(); }).then(function(j){
        var map={}, redir={};
        ((j.query||{}).redirects||[]).forEach(function(r){ redir[r.from]=r.to; });
        ((j.query||{}).normalized||[]).forEach(function(r){ redir[r.from]=r.to; });
        var pages=(j.query||{}).pages||{};
        Object.keys(pages).forEach(function(k){ if(pages[k].thumbnail) map[pages[k].title]=pages[k].thumbnail.source; });
        var out={}; names.forEach(function(n){ out[n]=map[redir[n]||n]||null; });
        cb(out);
      }).catch(function(){ cb({}); });
    }catch(e){ cb({}); }
  }

  function redesignCommunity(){
    try{
      var box = document.querySelector('.community-box');
      if (!box || typeof USER_POSTS === 'undefined' || !USER_POSTS.length) return;
      var posts = USER_POSTS.slice(0,6);
      var avColors = ['#a83320','#7a5aa8','#c9a84c','#5b7a9a','#7a9a6a','#b07a7a'];
      var h = '<div class="wcp-hd"><div><div class="wcp-tit">🌿 みんなの最新投稿</div><div class="wcp-sub">参拝の記録をシェアしよう</div></div><div class="wcp-more" id="wcpMore">もっと見る ›</div></div>';
      h += '<div class="wcp-grid">';
      posts.forEach(function(p,i){
        var m = String(p.addr||'').match(/^.{2,3}?[都道府県]/);
        var pref = m ? m[0] : (p.area||'');
        h += '<div class="wcp-card" data-pid="'+p.id+'">'
          + '<img src="'+esc(p.img||'')+'" loading="lazy" onerror="this.parentElement.classList.add(\'noimg\')">'
          + '<div class="wcp-grad"></div>'
          + '<div class="wcp-info">'
          + '<div class="wcp-userrow"><span class="wcp-av" style="background:'+avColors[i%avColors.length]+'">'+(p.avatar||String(p.user||'').slice(0,1))+'</span><span class="wcp-un">'+p.user+'</span><span class="wcp-like">♡</span></div>'
          + '<div class="wcp-tags"><span># '+p.shrine+'</span><span># '+pref+'</span></div>'
          + '</div></div>';
      });
      h += '</div>';
      h += '<button class="wcp-postbtn" id="wcpPost">📷 投稿する</button>';
      box.innerHTML = h;
      var more = document.getElementById('wcpMore');
      if (more) more.onclick = function(){ if (typeof openCommunityAll==='function') openCommunityAll(); };
      var pb = document.getElementById('wcpPost');
      if (pb) pb.onclick = function(){ if (typeof openCommunityPost==='function') openCommunityPost(); };
      box.querySelectorAll('.wcp-card').forEach(function(c){
        c.onclick = function(ev){
          var t = ev.target;
          if (t.classList && t.classList.contains('wcp-like')){
            ev.stopPropagation();
            t.textContent = (t.textContent==='♡') ? '♥' : '♡';
            t.classList.toggle('on');
            return;
          }
          if (typeof openPostDetail==='function') openPostDetail(c.getAttribute('data-pid'));
        };
      });
      // 投稿の神社名で本物の写真に差し替え
      var shrineNames = []; posts.forEach(function(p){ if (p.shrine && shrineNames.indexOf(p.shrine)<0) shrineNames.push(p.shrine); });
      wikiPhotosFor(shrineNames, function(map){
        box.querySelectorAll('.wcp-card').forEach(function(c){
          var pid = c.getAttribute('data-pid');
          if (String(pid).charAt(0)==='u') return; // 自分の投稿は自分の写真のまま
          var post = posts.filter(function(p){ return String(p.id)===String(pid); })[0];
          if (!post) return;
          var u = map[post.shrine];
          if (u){
            var im = c.querySelector('img');
            if (im){ im.src = u; c.classList.remove('noimg'); }
          }
        });
      });
    }catch(e){}
  }
  redesignCommunity();

  // ─────────────────────────────────────────
  // 9. 「この条件で検索する」の結果カード：写真を2×2グリッド（みんなの投稿と同サイズ感）
  // ─────────────────────────────────────────
  var css6 = document.createElement('style');
  css6.textContent = '.wgal{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:.2rem .875rem .7rem;}\n.wgal img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:16px;display:block;}';
  document.head.appendChild(css6);
  function upgradeRankingPhotos(){
    try{
      if (typeof photoCache === 'undefined') return;
      document.querySelectorAll('.rcard').forEach(function(card){
        if (card.querySelector('.wgal')) return;
        var nameEl = card.querySelector('.rname');
        if (!nameEl) return;
        var name = nameEl.textContent.trim();
        var ph = photoCache[name];
        if (!ph || !ph.length) return;
        var wrap = card.querySelector('.pgallery');
        if (!wrap) return;
        var strip = card.querySelector('.pstrip');
        var g = document.createElement('div'); g.className='wgal';
        g.innerHTML = ph.slice(0,4).map(function(u){ return '<img src="'+u+'" loading="lazy">'; }).join('');
        wrap.parentElement.insertBefore(g, wrap);
        wrap.style.display='none';
        if (strip) strip.style.display='none';
      });
    }catch(e){}
  }
  setInterval(upgradeRankingPhotos, 1200);

  // ─────────────────────────────────────────
  // 10. トップ「テーマで巡るベスト10」「季節の行事・ライトアップ」をJSONから表示
  //（管理画面 admin/sections.html で編集 → data/themes.json・events.json をアップで反映）
  // ─────────────────────────────────────────
  // テーマ／季節行事の詳細ビュー（説明文中の画像URLは画像として表示）
  var themePg = document.createElement('div'); themePg.id='wcTheme';
  themePg.style.cssText='position:fixed;inset:0;z-index:262;background:#F8F5EF;display:none;overflow-y:auto;';
  themePg.innerHTML='<div style="max-width:500px;margin:0 auto;padding-bottom:50px" id="wcThemeBody"></div>';
  document.body.appendChild(themePg);
  function openWabiTheme(t, photoUrl){
    var hero = t.hero || photoUrl || '';
    var descHtml = String(t.desc||'').split(/\n/).map(function(line){
      var s = line.trim();
      if (!s) return '';
      if (/^https?:\/\/\S+$/.test(s) && (/\.(png|jpe?g|webp|gif)(\?|$)/i.test(s) || /wikimedia\.org|unsplash\.com|googleusercontent/.test(s))) {
        return '<img src="'+esc(s)+'" loading="lazy" style="width:100%;border-radius:14px;margin:12px 0;display:block">';
      }
      return '<p style="font-size:13.5px;line-height:2;color:#3f382e;margin:10px 0">'+esc(s)+'</p>';
    }).join('');
    var h='<div style="position:relative;width:100%;height:230px;background:'+(hero?('url('+esc(hero)+') center/cover'):'linear-gradient(135deg,#8a9ab0,#4a5a70)')+'">'
      +'<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(15,10,5,.72),rgba(15,10,5,.05) 60%)"></div>'
      +'<div style="position:absolute;top:14px;left:14px;width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.94);display:flex;align-items:center;justify-content:center;font-size:19px;color:#a83320;cursor:pointer;z-index:2" id="wcThemeBack">‹</div>'
      +'<div style="position:absolute;left:18px;right:18px;bottom:38px;color:#fff;font-family:\'Shippori Mincho\',serif;font-size:19px;font-weight:800;text-shadow:0 2px 8px rgba(0,0,0,.4)">'+esc(t.title||'')+'</div>'
      +(t.meta?'<div style="position:absolute;left:18px;bottom:12px"><span style="background:rgba(42,32,24,.6);color:#fff;font-size:11px;padding:4px 11px;border-radius:14px">'+esc(t.meta)+'</span></div>':'')
      +'</div>'
      +'<div style="padding:14px 18px 30px">'+(descHtml||'<p style="font-size:12px;color:#a89a80">詳しい内容は準備中です。</p>')+'</div>';
    document.getElementById('wcThemeBody').innerHTML=h;
    themePg.style.display='block'; themePg.scrollTop=0;
    document.getElementById('wcThemeBack').onclick=function(){ themePg.style.display='none'; };
  }

  function renderTopSection(headText, jsonUrl){
    fetch(jsonUrl, {cache:'no-store'}).then(function(r){ return r.ok ? r.json() : null; }).then(function(items){
      if (!items || !items.length) return;
      items = items.filter(function(t){ return t.status !== 'draft'; });
      if (!items.length) return;
      var head = [...document.querySelectorAll('div,h2,h3,span')].find(function(e){
        return e.tagName!=='SCRIPT' && e.childElementCount===0 && (e.textContent||'').trim().indexOf(headText)===0 && !e.closest('#wcPost,#wcPrev,#wcSpot,#wcTheme');
      });
      if (!head) return;
      var sec = head;
      for (var i=0;i<6 && sec.parentElement;i++){
        sec = sec.parentElement;
        if (sec.querySelector('.route-card') || sec.innerText.length>120) break;
      }
      var row = sec.querySelector('.route-scroll, .route-cards, [class*=scroll]');
      if (!row){
        row = [...sec.querySelectorAll('div')].find(function(d){ return d.children.length>=2 && d.scrollWidth>d.clientWidth+40; });
      }
      if (!row){
        row = document.createElement('div');
        row.style.cssText='display:flex;gap:10px;overflow-x:auto;padding:10px 0 6px;';
        head.parentElement.insertAdjacentElement('afterend', row);
      }
      row.innerHTML = items.map(function(t,i){
        var bg = t.hero ? 'url('+esc(t.hero)+') center/cover' : 'linear-gradient(135deg,#8a9ab0,#4a5a70)';
        return '<div class="route-card" data-wtop="'+i+'" style="flex:0 0 165px;cursor:pointer">'
          + '<div class="route-card-img-wrap"><div class="route-card-img wtop-img" data-shrine-w="'+esc((!t.hero&&t.shrine)?t.shrine:'')+'" style="display:flex;align-items:center;justify-content:center;font-size:30px;background:'+bg+';color:#fff">'+(t.hero?'':'⛩')+'</div></div>'
          + '<div class="route-card-body"><div class="route-card-title">'+esc(t.title||'')+'</div>'
          + '<div class="route-card-desc">'+esc(String(t.desc||'').split(/\n/)[0].slice(0,28))+'</div>'
          + '<div class="route-card-meta">'+esc(t.meta||'')+'</div></div></div>';
      }).join('');
      var wikiMapCache = {};
      row.querySelectorAll('[data-wtop]').forEach(function(c){
        var t = items[+c.getAttribute('data-wtop')];
        c.onclick = function(){
          var img = c.querySelector('.wtop-img');
          var bgu = (img && img.style.background.match(/url\("?([^)"]+)"?\)/)||[])[1];
          openWabiTheme(t, bgu);
        };
      });
      var names = items.filter(function(t){ return !t.hero && t.shrine; }).map(function(t){ return t.shrine; });
      if (names.length) wikiPhotosFor([...new Set(names)], function(map){
        row.querySelectorAll('.wtop-img').forEach(function(el){
          var u = map[el.getAttribute('data-shrine-w')];
          if (u){ el.style.background='url('+u+') center/cover'; el.textContent=''; }
        });
      });
    }).catch(function(){});
  }

  // ─────────────────────────────────────────
  // 11. トップの見た目微調整（おすすめ巡拝ルート2枚ぴったり／ツアー特集を大きく）
  // ─────────────────────────────────────────
  var css7 = document.createElement('style');
  css7.textContent = [
    '.ai-preview-scroll{scroll-snap-type:x mandatory;}',
    '.ai-preview-scroll .apc{scroll-snap-align:start;}',
    '.tour-card{border-radius:14px !important;}',
    '.tour-img{flex:0 0 152px !important;width:152px !important;min-height:112px;}',
    '.tour-body{padding:.85rem .95rem !important;}',
    '.tour-title{font-size:14.5px !important;}',
    '.tour-route{font-size:11.5px !important;}',
    '.tour-price{font-size:13px !important;}'
  ].join('\n');
  document.head.appendChild(css7);

  // おすすめ巡拝ルート：どの画面幅でも「ぴったり2枚」表示（余白を実測して自動調整）
  function fixApcRow(){
    try{
      var sc = document.querySelector('.ai-preview-scroll');
      if (!sc) return;
      var P = parseFloat(getComputedStyle(sc).paddingLeft) || 20;
      sc.style.gap = P + 'px';
      var card = (sc.clientWidth - P - P) / 2; // gap=P・右余白は詰めて2枚ぴったり
      sc.querySelectorAll('.apc').forEach(function(c){ c.style.flex = '0 0 ' + card + 'px'; c.style.width = card + 'px'; });
    }catch(e){}
  }
  fixApcRow();
  setTimeout(fixApcRow, 800);
  window.addEventListener('resize', fixApcRow);

  // ─────────────────────────────────────────
  // 12. 季節の行事・ツアー特集のダミー画像を、実在寺社のWikipedia写真に差し替え
  // ─────────────────────────────────────────
  var CARD_SHRINE = {
    // 季節の行事（タイトルの一部 → 神社名）
    '明治神宮 夏越':'明治神宮', '鞍馬寺 竹伐':'鞍馬寺', '貴船神社':'貴船神社',
    '住吉大社 御田植':'住吉大社', '熱田神宮 月次':'熱田神宮',
    // ツアー特集
    '伊勢神宮':'伊勢神宮内宮', '出雲大社':'出雲大社', '高野山':'金剛峯寺'
  };
  function shrineForText(txt){
    for (var key in CARD_SHRINE){ if (txt.indexOf(key)>=0) return CARD_SHRINE[key]; }
    return null;
  }
  function fixCardImages(){
    try{
      var jobs = [];
      document.querySelectorAll('.season-card').forEach(function(card){
        var t = card.querySelector('.season-title'); var img = card.querySelector('.season-img img');
        if (t && img && !img.getAttribute('data-wabi')){ var s = shrineForText(t.textContent||''); if (s){ jobs.push({img:img, shrine:s}); img.setAttribute('data-wabi','1'); } }
      });
      document.querySelectorAll('.tour-card').forEach(function(card){
        var t = card.querySelector('.tour-title'); var img = card.querySelector('.tour-img img');
        if (t && img && !img.getAttribute('data-wabi')){ var s = shrineForText(t.textContent||''); if (s){ jobs.push({img:img, shrine:s}); img.setAttribute('data-wabi','1'); } }
      });
      if (!jobs.length) return;
      var names = [];
      jobs.forEach(function(j){ if (names.indexOf(j.shrine)<0) names.push(j.shrine); });
      wikiPhotosFor(names, function(map){
        jobs.forEach(function(j){
          var u = map[j.shrine];
          if (u){ j.img.src = u; j.img.style.display=''; }
        });
      });
    }catch(e){}
  }
  fixCardImages();
  setInterval(fixCardImages, 1500);

  // ─────────────────────────────────────────
  // 13. Google地図SDKの自動起動＋おすすめ神社ランキングの写真復活・2枚ぴったり
  // ─────────────────────────────────────────
  window.__wcSDKq = window.__wcSDKq || [];
  function ensureGoogle(cb){
    if (typeof google!=='undefined' && google.maps && google.maps.places){ if(cb)cb(); return; }
    if (typeof API_KEY==='undefined' || !API_KEY) return;
    if (cb) window.__wcSDKq.push(cb);
    if (window.__wcSDKloading) return;
    window.__wcSDKloading = true;
    window.__wcSDKcb = function(){ (window.__wcSDKq||[]).forEach(function(f){ try{f();}catch(e){} }); window.__wcSDKq=[]; };
    var s = document.createElement('script');
    s.src = 'https://maps.googleapis.com/maps/api/js?key='+API_KEY+'&libraries=places&callback=__wcSDKcb';
    s.onerror = function(){ window.__wcSDKloading=false; };
    document.head.appendChild(s);
  }
  ensureGoogle(function(){ if (typeof filter==='function') filter(); }); // 起動時にSDKを用意

  // おすすめ神社ランキング：カードを2枚ぴったり＆写真をPlacesで表示
  function fixRanking(){
    try{
      var cards = document.querySelectorAll('.rcard');
      if (!cards.length) return;
      // 横スクロール → 横2列×縦スクロールのグリッドに（クラスで!important適用）
      var sc = cards[0].parentElement;
      sc.classList.add('wc-rankgrid');
      // 写真の取得（Places）
      ensureGoogle(function(){
        var svc = new google.maps.places.PlacesService(document.createElement('div'));
        cards.forEach(function(c){
          if (c.getAttribute('data-wcphoto')) return;
          var nm = c.querySelector('.rname'); var pg = c.querySelector('.pgallery');
          if (!nm || !pg) return;
          c.setAttribute('data-wcphoto','1');
          var name = nm.textContent.trim();
          svc.findPlaceFromQuery({query:name+' 神社', fields:['photos']}, function(res, st){
            if (st===google.maps.places.PlacesServiceStatus.OK && res && res[0] && res[0].photos && res[0].photos.length){
              var ph = res[0].photos;
              var urls = ph.slice(0,4).map(function(p){ return p.getUrl({maxWidth:500}); });
              var main = urls[0];
              var strip = urls.slice(0,4);
              while (strip.length<4) strip.push(main);
              pg.innerHTML = '<div class="pgallery-main"><img src="'+main+'" loading="lazy"><div class="photo-count">📷 '+urls.length+'枚</div></div>';
              // サムネイルは元からある rcard 直下の .pstrip に入れる（空白の二重化を防ぐ）
              var stripEl = c.querySelector(':scope > .pstrip') || pg.parentElement.querySelector('.pstrip');
              if (stripEl) stripEl.innerHTML = strip.map(function(u){ return '<div class="pstrip-item"><img src="'+u+'" loading="lazy"></div>'; }).join('');
            } else {
              c.removeAttribute('data-wcphoto'); // 取得失敗は次回リトライ
            }
          });
        });
      });
    }catch(e){}
  }
  var cssRank = document.createElement('style');
  cssRank.textContent = [
    // ランキングを横スクロール→横2列×縦スクロールのグリッドに強制（index.html側の!importantに勝つ）
    '.wc-rankgrid{display:grid !important;grid-template-columns:1fr 1fr !important;gap:12px !important;overflow-x:visible !important;overflow-y:visible !important;flex-wrap:wrap !important;scroll-snap-type:none !important;}',
    '.wc-rankgrid>.rcard{flex:none !important;width:auto !important;min-width:0 !important;align-self:start !important;scroll-snap-align:none !important;}',
    // 全カード統一（1位も含め同じ上品な枠＋やわらかい影。順位は左上バッジで表現）
    '.rcard, .rcard.r1{border:1px solid #ece4d3 !important;box-shadow:0 6px 18px -10px rgba(90,70,40,.35) !important;height:auto !important;align-self:stretch !important;background:#fff;}',
    // ヘッダー高を固定して、住所の行数に関わらず画像の開始位置を揃える
    '.rcard .rhd{min-height:130px !important;box-sizing:border-box;}',
    // 写真エリア
    '.rcard .pgallery{height:auto !important;}',
    '.rcard .pgallery-main{aspect-ratio:16/11 !important;height:auto !important;overflow:hidden;position:relative;border-radius:10px;}',
    '.rcard .pgallery-main img{width:100%;height:100%;object-fit:cover;display:block;}',
    '.rcard .pstrip{display:grid !important;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:4px;height:auto !important;}',
    '.rcard .pstrip-item{aspect-ratio:1;overflow:hidden;border-radius:6px;}',
    '.rcard .pstrip-item img{width:100%;height:100%;object-fit:cover;display:block;}',
    // 横スクロールのドット目印
    '.wc-rankdots{display:flex;justify-content:center;gap:6px;margin:10px 0 2px;}',
    '.wc-rankdots i{width:7px;height:7px;border-radius:50%;background:#dcd3bf;transition:.2s;}',
    '.wc-rankdots i.on{background:#a83320;width:18px;border-radius:4px;}'
  ].join('\n');
  document.head.appendChild(cssRank);

  // 横スクロールのドット目印を設置＆連動
  function fixRankDots(){
    try{
      var first = document.querySelector('.rcard');
      if (!first) return;
      var sc = first.parentElement;
      var cards = sc.querySelectorAll('.rcard');
      if (!cards.length) return;
      var pages = Math.ceil(cards.length/2);
      var ex = sc.parentElement.querySelector('.wc-rankdots'); if (ex) ex.remove();
      return; // 縦2列グリッドではスクロール目印は不要
      var dots = sc.parentElement.querySelector('.wc-rankdots');
      if (!dots){
        dots = document.createElement('div'); dots.className='wc-rankdots';
        for (var i=0;i<pages;i++){ dots.innerHTML += '<i'+(i===0?' class="on"':'')+'></i>'; }
        sc.parentElement.insertBefore(dots, sc.nextSibling);
        sc.addEventListener('scroll', function(){
          var per = cards[0].getBoundingClientRect().width + 12;
          var idx = Math.round(sc.scrollLeft/(per*2));
          dots.querySelectorAll('i').forEach(function(d,i){ d.classList.toggle('on', i===idx); });
        });
      }
    }catch(e){}
  }
  var _origFixRanking = fixRanking;
  fixRanking = function(){ _origFixRanking(); fixRankDots(); };

  fixRanking();
  setInterval(fixRanking, 2000);
  window.addEventListener('resize', fixRanking);

  // おすすめ巡拝ルート：横スクロール → 2列グリッド（テーマで巡るベスト10と同じ一覧配置）
  var cssRouteGrid = document.createElement('style');
  cssRouteGrid.textContent = [
    '.ai-preview-scroll{display:grid !important;grid-template-columns:1fr 1fr !important;gap:14px !important;overflow-x:visible !important;padding:0 16px 8px !important;scroll-snap-type:none !important;}',
    '.ai-preview-scroll .apc{flex:none !important;width:auto !important;scroll-snap-align:none !important;}'
  ].join('\n');
  document.head.appendChild(cssRouteGrid);

  // ─────────────────────────────────────────
  // 14. 参拝のお供：楽天アフィリエイト商品（5点）を表示
  // ─────────────────────────────────────────
  var WABI_OSUPPLY = [
    { name:'秩父三十四ヶ所札所めぐり 観音霊場巡礼ルートガイド 改訂版', price:'¥1,848', tag:'巡礼ガイド',
      img:'https://hbb.afl.rakuten.co.jp/hgb/55e62409.82eb9d0a.55e6240a.758d8692/?me_id=1213310&item_id=20543940&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fbook%2Fcabinet%2F5857%2F9784780425857_1_4.jpg%3F_ex%3D240x240&s=240x240&t=picttext',
      link:'https://hb.afl.rakuten.co.jp/ichiba/55e62409.82eb9d0a.55e6240a.758d8692/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F16988967%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==' },
    { name:'御朱印帳 大判 金剛力士像 箔押し 金箔 蛇腹', price:'¥2,090', tag:'御朱印帳',
      img:'https://hbb.afl.rakuten.co.jp/hgb/55e6354a.261418e4.55e6354b.281f8a3b/?me_id=1344822&item_id=10000097&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fnippoh-bb%2Fcabinet%2Fhakuoshi%2Fimgrc0107619189.jpg%3F_ex%3D240x240&s=240x240&t=picttext',
      link:'https://hb.afl.rakuten.co.jp/ichiba/55e6354a.261418e4.55e6354b.281f8a3b/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fnippoh-bb%2F8-001%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==' },
    { name:'御朱印帳 大判 翡翠花吹雪 金襴 京都ちせん', price:'¥2,480', tag:'御朱印帳',
      img:'https://hbb.afl.rakuten.co.jp/hgb/55e637eb.50260a1f.55e637ec.b9335393/?me_id=1356718&item_id=10000067&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fkyoto-chisen%2Fcabinet%2Fcompass1649313958.jpg%3F_ex%3D240x240&s=240x240&t=picttext',
      link:'https://hb.afl.rakuten.co.jp/ichiba/55e637eb.50260a1f.55e637ec.b9335393/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkyoto-chisen%2F10000067%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==' },
    { name:'トラベルポーチ 4in1 コスメポーチ セット 吊り下げ', price:'¥1,630', tag:'旅行グッズ',
      img:'https://hbb.afl.rakuten.co.jp/hgb/55e6427a.c24ca2fa.55e6427b.72a6c9f7/?me_id=1405779&item_id=10000142&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fbestselectmart%2Fcabinet%2Ftrip%2Ftrip_000%2Ftrip-0003_00.jpg%3F_ex%3D240x240&s=240x240&t=picttext',
      link:'https://hb.afl.rakuten.co.jp/ichiba/55e6427a.c24ca2fa.55e6427b.72a6c9f7/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbestselectmart%2Fse-travel-0003%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==' },
    { name:'旅行用圧縮袋 2点セット YKK 収納ポーチ', price:'¥3,490', tag:'旅行グッズ',
      img:'https://hbb.afl.rakuten.co.jp/hgb/55e6442a.17a8cbc9.55e6442b.7e61cac6/?me_id=1379780&item_id=10000075&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fichifujiec%2Fcabinet%2Fnsana018%2Fnk039%2Fnk03920230930%2Fnsana018set2b.jpg%3F_ex%3D240x240&s=240x240&t=picttext',
      link:'https://hb.afl.rakuten.co.jp/ichiba/55e6442a.17a8cbc9.55e6442b.7e61cac6/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fichifujiec%2Fnsana018set%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjEsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==' }
  ];
  var cssOsupply = document.createElement('style');
  cssOsupply.textContent = [
    '#osupplyList .osupply-card{position:relative;}',
    '.wabi-rk-btn{display:block;text-align:center;margin-top:6px;background:#bf0000;color:#fff !important;font-size:11px;font-weight:700;line-height:1;padding:7px 0;border-radius:14px;text-decoration:none;}',
    '.wabi-pr{position:absolute;top:6px;right:6px;background:rgba(42,32,24,.6);color:#fff;font-size:8.5px;padding:2px 7px;border-radius:9px;z-index:2;}'
  ].join('\n');
  document.head.appendChild(cssOsupply);
  function osupplyCardHtml(p){
    return '<div class="osupply-card">'
      + '<span class="wabi-pr">PR</span>'
      + '<a href="'+p.link+'" target="_blank" rel="nofollow sponsored noopener" style="text-decoration:none;color:inherit;display:block">'
      + '<div class="osupply-img"><img src="'+p.img+'" alt="" loading="lazy" onerror="this.style.display=\'none\'"><div class="osupply-img-rank">'+p.tag+'</div></div>'
      + '<div class="osupply-body"><div class="osupply-title">'+p.name+'</div><div class="osupply-price">'+p.price+'</div>'
      + '<span class="wabi-rk-btn">楽天で見る</span></div></a></div>';
  }
  function fixOsupply(){
    try{
      var html = WABI_OSUPPLY.map(osupplyCardHtml).join('');
      var list = document.getElementById('osupplyList');
      if (list && !list.getAttribute('data-wabi')){ list.setAttribute('data-wabi','1'); list.innerHTML = html; }
      var full = document.getElementById('osupplyGridFull');
      if (full && !full.getAttribute('data-wabi')){ full.setAttribute('data-wabi','1'); full.className='osupply-list'; full.innerHTML = html; }
    }catch(e){}
  }
  fixOsupply();
  setInterval(fixOsupply, 2000);

  // ─────────────────────────────────────────
  // 15. ツアー特集：楽天トラベル観光体験アフィリエイト（4件）
  // ─────────────────────────────────────────
  var WABI_TOURS = [
    { name:'嵐電1日フリーきっぷ 御朱印帳付きプラン', area:'京都・嵐電', badge:'御朱印付き', partner:'楽天トラベル',
      shrine:'車折神社', link:'https://a.r10.to/hFISmH' },
    { name:'京都魔界案内ミステリーツアー 陰陽師編', area:'京都・体験', badge:'人気', partner:'楽天トラベル',
      shrine:'晴明神社', link:'https://a.r10.to/hgv8Ka' },
    { name:'奈良 吉野 櫻本坊 修行体験＋お抹茶＋お菓子', area:'奈良・吉野', badge:'世界遺産', partner:'楽天トラベル',
      shrine:'金峯山寺', link:'https://a.r10.to/h5KHp7' },
    { name:'犬鳴山 七宝瀧寺 滝行＋写経体験', area:'大阪・泉佐野', badge:'修験の聖地', partner:'楽天トラベル',
      shrine:'七宝瀧寺', link:'https://a.r10.to/h8XIiv' }
  ];
  function tourCardHtml(t){
    return '<div class="tour-card" style="position:relative">'
      + '<span class="wabi-pr">PR</span>'
      + '<a href="'+t.link+'" target="_blank" rel="nofollow sponsored noopener" style="display:flex;text-decoration:none;color:inherit;width:100%">'
      + '<div class="tour-img" data-tourshrine="'+t.shrine+'"><div class="tour-img-badge">'+t.badge+'</div></div>'
      + '<div class="tour-body"><div><div class="tour-title">'+t.name+'</div><div class="tour-route">'+t.area+'</div></div>'
      + '<div class="tour-bottom"><span class="wabi-rk-btn" style="padding:6px 14px">楽天トラベルで見る</span>'
      + '<span style="font-size:9px;color:#a89a80;margin-left:6px">'+t.partner+'</span></div></div></a></div>';
  }
  function fixTours(){
    try{
      var html = WABI_TOURS.map(tourCardHtml).join('');
      var changed = false;
      var t1 = document.getElementById('tourList');
      if (t1 && !t1.getAttribute('data-wabi')){ t1.setAttribute('data-wabi','1'); t1.innerHTML = html; changed=true; }
      var t2 = document.getElementById('tourListFull');
      if (t2 && !t2.getAttribute('data-wabi')){ t2.setAttribute('data-wabi','1'); t2.innerHTML = html; changed=true; }
      if (changed){
        var shrines = WABI_TOURS.map(function(t){ return t.shrine; });
        wikiPhotosFor(shrines, function(map){
          document.querySelectorAll('.tour-img[data-tourshrine]').forEach(function(el){
            var u = map[el.getAttribute('data-tourshrine')];
            if (u){ el.style.background = 'url('+u+') center/cover'; }
          });
        });
      }
    }catch(e){}
  }
  fixTours();
  setInterval(fixTours, 2000);

  // ─── 神社詳細：メイン画像下の2枚（別アングル写真＋御朱印）を本文幅に合わせて均等配置 ───
  var cssSdDuo = document.createElement('style');
  cssSdDuo.textContent = '#wabiSdDuo{margin-left:auto !important;margin-right:auto !important;max-width:500px !important;}';
  document.head.appendChild(cssSdDuo);

  // ─── 「もっと見る」各ページをツアー特集と同じ横型カードデザインに統一 ───
  // 準備中の項目タップ時のフィードバック
  window.wabiSoon = function(){
    if (typeof showToast==='function') showToast('準備中です'); else alert('準備中です');
  };
  // ツアー特集と同じ tour-card 横型カードを生成する共通関数
  function wabiTourCard(o){
    var badge = o.badge ? '<div class="tour-img-badge">'+o.badge+'</div>' : '';
    var pr    = o.pr ? '<span class="wabi-pr">PR</span>' : '';
    var bg    = o.img ? ' style="background:url('+o.img+') center/cover"' : '';
    if (o.link){
      var partnerL = o.partner ? '<span style="font-size:9px;color:#a89a80;margin-left:6px">'+o.partner+'</span>' : '';
      return '<div class="tour-card" style="position:relative">'+pr
        + '<a href="'+o.link+'" target="_blank" rel="nofollow sponsored noopener" style="display:flex;text-decoration:none;color:inherit;width:100%">'
        + '<div class="tour-img"'+bg+'>'+badge+'</div>'
        + '<div class="tour-body"><div><div class="tour-title">'+o.title+'</div><div class="tour-route">'+o.sub+'</div></div>'
        + '<div class="tour-bottom"><span class="wabi-rk-btn" style="padding:6px 14px">'+(o.btn||'見る')+'</span>'+partnerL+'</div>'
        + '</div></a></div>';
    }
    var partnerR = o.partner ? '<span class="tour-partner">'+o.partner+'</span>' : '';
    var onc = o.onclick ? ' onclick="'+o.onclick+'"' : '';
    return '<div class="tour-card" style="position:relative"'+onc+'>'+pr
      + '<div class="tour-img"'+bg+'>'+badge+'</div>'
      + '<div class="tour-body"><div><div class="tour-title">'+o.title+'</div><div class="tour-route">'+o.sub+'</div></div>'
      + '<div class="tour-bottom">'+(o.metaLeft||'<span></span>')+partnerR+'</div>'
      + '</div></div>';
  }

  // ① 参拝のお供（楽天アフィリエイト・実リンク）
  window.openOsupplyList = function(){
    try{
      var el = document.getElementById('osupplyGridFull');
      if (el){
        el.style.cssText=''; el.className='tour-list'; el.setAttribute('data-wabi','1');
        el.innerHTML = WABI_OSUPPLY.map(function(p){
          return wabiTourCard({ img:p.img, badge:p.tag, title:p.name, sub:p.price, link:p.link, btn:'楽天で見る', partner:'楽天市場', pr:true });
        }).join('');
      }
    }catch(e){}
    if (typeof openOverlay==='function') openOverlay('pgOsupplyList');
  };

  // ② 季節の行事・ライトアップ
  window.openSeasonList = function(){
    try{
      var el = document.getElementById('seasonListFull');
      if (el && typeof SEASONS!=='undefined'){
        el.style.cssText=''; el.className='tour-list';
        el.innerHTML = SEASONS.map(function(s){
          return wabiTourCard({ img:s.img, badge:s.tag, title:s.title, sub:s.area+' ・ '+s.period, partner:'開催情報', onclick:'wabiSoon()' });
        }).join('');
      }
    }catch(e){}
    if (typeof openOverlay==='function') openOverlay('pgSeasonList');
  };

  // ④ 御朱印グッズ
  window.openEcList = function(){
    try{
      var el = document.getElementById('ecGridFull');
      if (el && typeof EC_ITEMS!=='undefined'){
        el.style.cssText=''; el.className='tour-list';
        el.innerHTML = EC_ITEMS.map(function(e){
          return wabiTourCard({ img:e.img, badge:e.tag||'', title:e.title, sub:'御朱印グッズ',
            metaLeft:'<span class="tour-price"><b>¥'+e.price+'</b></span>', onclick:'wabiSoon()' });
        }).join('');
      }
    }catch(e){}
    if (typeof openOverlay==='function') openOverlay('pgEcList');
  };

  // ⑥ 終活・供養のご相談
  window.openShukatsuList = function(){
    try{
      var el = document.getElementById('shukatsuListFull');
      if (el && typeof SHUKATSU!=='undefined'){
        el.style.cssText=''; el.className='tour-list';
        el.innerHTML = SHUKATSU.map(function(s){
          return wabiTourCard({ img:s.img, badge:s.cat, title:s.title, sub:s.cta, partner:'無料資料請求', onclick:'wabiSoon()' });
        }).join('');
      }
    }catch(e){}
    if (typeof openOverlay==='function') openOverlay('pgShukatsuList');
  };

  window.openTourList = function(){
    try{
      var full = document.getElementById('tourListFull');
      if (full){
        full.setAttribute('data-wabi','1');
        full.innerHTML = WABI_TOURS.map(tourCardHtml).join('');
        var shrines = WABI_TOURS.map(function(t){ return t.shrine; });
        wikiPhotosFor(shrines, function(map){
          document.querySelectorAll('#tourListFull .tour-img[data-tourshrine]').forEach(function(el){
            var u = map[el.getAttribute('data-tourshrine')];
            if (u){ el.style.background = 'url('+u+') center/cover'; }
          });
        });
      }
    }catch(e){}
    if (typeof openOverlay==='function') openOverlay('pgTourList');
  };



  renderTopSection('テーマで巡るベスト', 'data/themes.json');
  renderTopSection('季節の行事', 'data/events.json');

  // ─────────────────────────────────────────
  // 8. 新しい投稿画面（Instagram×Threads風）
  // ─────────────────────────────────────────
  var css5 = document.createElement('style');
  css5.textContent = [
    '#wcPost{position:fixed;inset:0;z-index:280;background:#fff;display:none;overflow-y:auto;-webkit-overflow-scrolling:touch;}',
    '.wpo-inner{max-width:500px;margin:0 auto;padding:0 16px 40px;}',
    '.wpo-hd{position:sticky;top:0;z-index:5;background:#fff;display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid #f0ede6;margin:0 -16px;padding-left:16px;padding-right:16px;}',
    '.wpo-back{font-size:22px;color:#2F2F2F;cursor:pointer;line-height:1;}',
    '.wpo-tit{font-size:15px;font-weight:800;color:#2F2F2F;}',
    '.wpo-prev{font-size:13px;color:#7a5aa8;font-weight:700;cursor:pointer;}',
    '.wpo-user{display:flex;align-items:center;gap:10px;padding:16px 0 4px;}',
    '.wpo-av{width:40px;height:40px;border-radius:50%;background:#c9a84c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;}',
    '.wpo-un{font-size:14px;font-weight:700;color:#2F2F2F;}',
    '.wpo-sec{background:#fff;border:1px solid #efe9dd;border-radius:18px;padding:14px;margin-top:14px;box-shadow:0 2px 10px rgba(0,0,0,.03);}',
    '.wpo-label{font-size:13px;font-weight:800;color:#2F2F2F;margin-bottom:10px;}',
    '.wpo-label .req{color:#d7453b;}',
    '.wpo-label .ok{font-size:10px;color:#2e7d4f;background:#e6f4ec;border-radius:10px;padding:2px 8px;margin-left:6px;font-weight:700;}',
    '.wpo-photos{display:flex;gap:10px;overflow-x:auto;}',
    '.wpo-ph{position:relative;width:118px;height:118px;border-radius:14px;overflow:hidden;flex:0 0 118px;}',
    '.wpo-ph img{width:100%;height:100%;object-fit:cover;}',
    '.wpo-ph .x{position:absolute;top:6px;right:6px;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.95);display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.25);}',
    '.wpo-ph .cover{position:absolute;left:6px;bottom:6px;background:rgba(122,90,168,.92);color:#fff;font-size:8.5px;padding:2px 7px;border-radius:8px;}',
    '.wpo-add{width:118px;height:118px;border-radius:14px;border:2px dashed #ddd5c4;background:#fbfaf6;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#8a7a5c;font-size:11px;cursor:pointer;flex:0 0 118px;}',
    '.wpo-add span{font-size:22px;}',
    '.wpo-input{width:100%;border:1.5px solid #e5ddca;border-radius:14px;padding:13px 38px 13px 13px;font-size:16px;color:#2F2F2F;background:#fff;box-sizing:border-box;font-family:inherit;}',
    '.wpo-input:focus{outline:none;border-color:#7a5aa8;}',
    '.wpo-clear{position:absolute;right:12px;top:50%;transform:translateY(-50%);width:20px;height:20px;border-radius:50%;background:#d8d2c4;color:#fff;display:none;align-items:center;justify-content:center;font-size:11px;cursor:pointer;}',
    '.wpo-select{width:100%;border:1.5px solid #e5ddca;border-radius:14px;padding:13px;font-size:16px;color:#2F2F2F;background:#fff;appearance:none;box-sizing:border-box;font-family:inherit;}',
    '.wpo-tags{display:flex;flex-wrap:wrap;gap:8px;}',
    '.wpo-tag{font-size:12px;color:#7a5aa8;background:#f1ecf8;border-radius:14px;padding:6px 12px;cursor:pointer;border:1.5px solid transparent;user-select:none;}',
    '.wpo-tag.off{color:#b3aca0;background:#f5f3ee;text-decoration:line-through;}',
    '.wpo-loc{display:flex;align-items:center;gap:10px;border:1.5px solid #e5ddca;border-radius:14px;padding:12px;}',
    '.wpo-loc-pin{font-size:20px;color:#7a5aa8;}',
    '.wpo-loc-nm{font-size:13.5px;font-weight:800;color:#2F2F2F;}',
    '.wpo-loc-ad{font-size:11px;color:#6B6B6B;margin-top:1px;}',
    '.wpo-ta{width:100%;min-height:120px;border:1.5px solid #e5ddca;border-radius:14px;padding:13px;font-size:16px;color:#2F2F2F;box-sizing:border-box;resize:vertical;font-family:inherit;line-height:1.7;}',
    '.wpo-ta:focus{outline:none;border-color:#7a5aa8;}',
    '.wpo-cnt{text-align:right;font-size:11px;color:#a89a80;margin-top:5px;}',
    '.wpo-submit{display:block;width:100%;height:56px;border:none;border-radius:16px;background:linear-gradient(135deg,#7a5aa8,#5a4470);color:#fff;font-size:16px;font-weight:800;cursor:pointer;margin-top:20px;box-shadow:0 8px 20px -6px rgba(90,68,112,.45);}',
    '.wpo-submit:disabled{background:#d8d2c4;box-shadow:none;}',
    '.wpo-note{font-size:10px;color:#a89a80;margin-top:8px;text-align:center;}'
  ].join('\n');
  document.head.appendChild(css5);

  var PREFS = ['北海道','青森県','岩手県','宮城県','秋田県','山形県','福島県','茨城県','栃木県','群馬県','埼玉県','千葉県','東京都','神奈川県','新潟県','富山県','石川県','福井県','山梨県','長野県','岐阜県','静岡県','愛知県','三重県','滋賀県','京都府','大阪府','兵庫県','奈良県','和歌山県','鳥取県','島根県','岡山県','広島県','山口県','徳島県','香川県','愛媛県','高知県','福岡県','佐賀県','長崎県','熊本県','大分県','宮崎県','鹿児島県','沖縄県'];
  var wpoState = { photos:[], tags:[], loc:null };

  var postPg = document.createElement('div'); postPg.id='wcPost';
  postPg.innerHTML = '<div class="wpo-inner">'
    + '<div class="wpo-hd"><span class="wpo-back" id="wpoBack">‹</span><span class="wpo-tit">新しく投稿</span><span class="wpo-prev" id="wpoPrev">プレビュー</span></div>'
    + '<div class="wpo-user"><div class="wpo-av">参</div><div class="wpo-un">あなた（参拝者さん）</div></div>'
    + '<div class="wpo-sec"><div class="wpo-label">写真を追加 <span class="req">*</span> <span style="font-size:10px;color:#a89a80;font-weight:400">1枚目がトップに表示されます</span></div>'
    +   '<div class="wpo-photos" id="wpoPhotos"><div class="wpo-add" id="wpoAdd"><span>📷</span>写真を追加</div></div>'
    +   '<input type="file" id="wpoFile" accept="image/*" multiple style="display:none"></div>'
    + '<div class="wpo-sec"><div class="wpo-label">神社名 <span class="req">*</span></div>'
    +   '<div style="position:relative"><input class="wpo-input" id="wpoShrine" placeholder="例：善光寺"><span class="wpo-clear" id="wpoClear">✕</span></div></div>'
    + '<div class="wpo-sec"><div class="wpo-label">都道府県 <span class="req">*</span></div>'
    +   '<select class="wpo-select" id="wpoPref"><option value="">選択してください</option>'
    +   PREFS.map(function(p){ return '<option>'+p+'</option>'; }).join('') + '</select></div>'
    + '<div class="wpo-sec" id="wpoLocSec" style="display:none"><div class="wpo-label">位置情報 <span style="font-size:10px;color:#6B6B6B;font-weight:400">（写真から自動検出）</span><span class="ok">✓ 検出完了</span></div>'
    +   '<div class="wpo-loc"><span class="wpo-loc-pin">📍</span><div style="flex:1"><div class="wpo-loc-nm" id="wpoLocNm">—</div><div class="wpo-loc-ad" id="wpoLocAd">—</div></div></div>'
    +   '<div style="font-size:9.5px;color:#a89a80;margin-top:6px">※写真の位置情報（GPS）から推定しました</div></div>'
    + '<div class="wpo-sec"><div class="wpo-label">おすすめハッシュタグ <span class="ok" id="wpoTagBadge" style="display:none">✓ 自動生成</span></div>'
    +   '<div class="wpo-tags" id="wpoTags"><span style="font-size:11px;color:#a89a80">神社名を入れると自動生成されます（タップで付け外し）</span></div></div>'
    + '<div class="wpo-sec"><div class="wpo-label">投稿内容 <span style="font-size:10px;color:#a89a80;font-weight:400">（最大1000文字）</span></div>'
    +   '<textarea class="wpo-ta" id="wpoText" maxlength="1000" placeholder="参拝の感想や、境内のおすすめポイント、ご利益など自由にご記入ください"></textarea>'
    +   '<div class="wpo-cnt"><span id="wpoCnt">0</span> / 1000</div></div>'
    + '<div class="wpo-sec"><div class="wpo-label">公開設定</div>'
    +   '<select class="wpo-select" id="wpoVis"><option value="public">🌏 公開（みんなの最新投稿に表示）</option><option value="private">🔒 自分だけ（記録として保存）</option></select></div>'
    + '<button class="wpo-submit" id="wpoSubmit" disabled>投稿する</button>'
    + '<div class="wpo-note">投稿は今はこの端末に保存されます（会員機能の公開後にみんなへ共有されます）</div>'
    + '</div>';
  document.body.appendChild(postPg);

  function wpoOpen(){
    wpoState = { photos:[], tags:[], loc:null };
    document.getElementById('wpoShrine').value='';
    document.getElementById('wpoPref').value='';
    document.getElementById('wpoText').value='';
    document.getElementById('wpoCnt').textContent='0';
    document.getElementById('wpoLocSec').style.display='none';
    document.getElementById('wpoTags').innerHTML='<span style="font-size:11px;color:#a89a80">神社名を入れると自動生成されます（タップで付け外し）</span>';
    wpoRenderPhotos(); wpoValidate();
    postPg.style.display='block'; postPg.scrollTop=0;
  }
  // 既存の「投稿する」ボタンをこの画面に差し替え
  window.openCommunityPost = wpoOpen;

  document.getElementById('wpoBack').onclick = function(){ postPg.style.display='none'; };
  document.getElementById('wpoAdd').onclick = function(){ document.getElementById('wpoFile').click(); };
  document.getElementById('wpoClear').onclick = function(){ var i=document.getElementById('wpoShrine'); i.value=''; i.dispatchEvent(new Event('input')); };

  function wpoRenderPhotos(){
    var box = document.getElementById('wpoPhotos');
    var h = '';
    wpoState.photos.forEach(function(p,i){
      h += '<div class="wpo-ph"><img src="'+p+'">'+(i===0?'<span class="cover">トップ表示</span>':'')+'<span class="x" data-x="'+i+'">✕</span></div>';
    });
    h += '<div class="wpo-add" id="wpoAdd"><span>📷</span>写真を追加</div>';
    box.innerHTML = h;
    document.getElementById('wpoAdd').onclick = function(){ document.getElementById('wpoFile').click(); };
    box.querySelectorAll('[data-x]').forEach(function(x){
      x.onclick = function(){ wpoState.photos.splice(+x.getAttribute('data-x'),1); wpoRenderPhotos(); wpoValidate(); };
    });
  }

  // 写真を縮小してデータ化（端末保存用）
  function wpoCompress(file, cb){
    var img = new Image();
    var fr = new FileReader();
    fr.onload = function(){ img.src = fr.result; };
    img.onload = function(){
      var max = 900, w = img.width, hgt = img.height;
      if (w > max){ hgt = Math.round(hgt*max/w); w = max; }
      var cv = document.createElement('canvas'); cv.width=w; cv.height=hgt;
      cv.getContext('2d').drawImage(img,0,0,w,hgt);
      cb(cv.toDataURL('image/jpeg',.82));
    };
    fr.readAsDataURL(file);
  }

  // EXIFのGPS情報を読む（あれば）
  function wpoExifGps(file, cb){
    var r = new FileReader();
    r.onload = function(){
      try{
        var v = new DataView(r.result);
        if (v.getUint16(0) !== 0xFFD8){ cb(null); return; }
        var off = 2, len = v.byteLength;
        while (off < len){
          if (v.getUint16(off) === 0xFFE1){
            var exifOff = off+4;
            if (v.getUint32(exifOff) !== 0x45786966){ cb(null); return; }
            var tiff = exifOff+6;
            var little = v.getUint16(tiff) === 0x4949;
            function u16(o){ return v.getUint16(o, little); }
            function u32(o){ return v.getUint32(o, little); }
            var ifd0 = tiff + u32(tiff+4);
            var n = u16(ifd0), gpsIfd = 0;
            for (var i=0;i<n;i++){ var e = ifd0+2+i*12; if (u16(e) === 0x8825) gpsIfd = tiff + u32(e+8); }
            if (!gpsIfd){ cb(null); return; }
            var gn = u16(gpsIfd), lat=null, lng=null, latR='N', lngR='E';
            function rat(o){ return u32(o)/u32(o+4); }
            function dms(valOff){ var o = tiff + u32(valOff+8); return rat(o) + rat(o+8)/60 + rat(o+16)/3600; }
            for (var g=0; g<gn; g++){
              var ge = gpsIfd+2+g*12, tag = u16(ge);
              if (tag===1) latR = String.fromCharCode(v.getUint8(ge+8));
              if (tag===2) lat = dms(ge);
              if (tag===3) lngR = String.fromCharCode(v.getUint8(ge+8));
              if (tag===4) lng = dms(ge);
            }
            if (lat!==null && lng!==null){ cb({lat:(latR==='S'?-lat:lat), lng:(lngR==='W'?-lng:lng)}); return; }
            cb(null); return;
          }
          off += 2 + v.getUint16(off+2);
        }
        cb(null);
      }catch(e){ cb(null); }
    };
    r.readAsArrayBuffer(file.slice(0, 131072));
  }

  // GPS → 最寄りの神社・都道府県をAIが推定して自動入力
  function wpoDetectFromGps(gps){
    try{
      if (typeof API_KEY==='undefined' || !API_KEY || typeof google==='undefined' || !google.maps || !google.maps.places) return;
      var svc = new google.maps.places.PlacesService(document.createElement('div'));
      svc.nearbySearch({location:new google.maps.LatLng(gps.lat,gps.lng), rankBy:google.maps.places.RankBy.DISTANCE, type:'place_of_worship'}, function(res, st){
        if (st!==google.maps.places.PlacesServiceStatus.OK || !res || !res[0]) return;
        var p = res[0];
        var sh = document.getElementById('wpoShrine');
        if (!sh.value){ sh.value = p.name; sh.dispatchEvent(new Event('input')); }
        var vic = p.vicinity || '';
        document.getElementById('wpoLocNm').textContent = p.name;
        document.getElementById('wpoLocAd').textContent = vic;
        document.getElementById('wpoLocSec').style.display = 'block';
        // 都道府県はジオコーダで
        try{
          new google.maps.Geocoder().geocode({location:{lat:gps.lat,lng:gps.lng}}, function(gres, gst){
            if (gst==='OK' && gres && gres[0]){
              var pref = '';
              gres[0].address_components.forEach(function(c){ if (c.types.indexOf('administrative_area_level_1')>-1) pref = c.long_name; });
              if (pref){
                document.getElementById('wpoPref').value = pref;
                document.getElementById('wpoLocAd').textContent = pref + ' ' + vic;
                wpoGenTags(); wpoValidate();
              }
            }
          });
        }catch(e){}
      });
    }catch(e){}
  }

  document.getElementById('wpoFile').onchange = function(){
    var files = [].slice.call(this.files||[]);
    if (!files.length) return;
    files.forEach(function(f, i){
      wpoCompress(f, function(data){ wpoState.photos.push(data); wpoRenderPhotos(); wpoValidate(); });
      if (i===0 && !wpoState.photos.length) wpoExifGps(f, function(gps){ if (gps) wpoDetectFromGps(gps); });
    });
    this.value='';
  };

  // 神社名からハッシュタグを自動生成
  function wpoGenTags(){
    var name = document.getElementById('wpoShrine').value.trim();
    var pref = document.getElementById('wpoPref').value;
    if (!name){ return; }
    var m = new Date().getMonth()+1;
    var season = (m>=3&&m<=4)?'#桜':(m>=5&&m<=6)?'#新緑':(m>=7&&m<=8)?'#夏詣':(m>=9&&m<=11)?'#紅葉':'#初詣';
    var base = ['#'+name];
    if (pref) base.push('#'+pref);
    var isTemple = /寺|院|大師|不動|観音/.test(name);
    base = base.concat(isTemple ? ['#寺院','#御朱印','#仏閣めぐり'] : ['#神社','#御朱印','#パワースポット']);
    base = base.concat(['#開運', season, '#参拝記録', '#わびなび']);
    var keep = {};
    wpoState.tags.forEach(function(t){ keep[t.tag] = t.on; });
    wpoState.tags = base.map(function(t,i){ return {tag:t, on:(t in keep) ? keep[t] : (i<6)}; });
    var badge = document.getElementById('wpoTagBadge'); if (badge) badge.style.display='inline-block';
    wpoRenderTags();
  }
  function wpoRenderTags(){
    var box = document.getElementById('wpoTags');
    box.innerHTML = wpoState.tags.map(function(t,i){
      return '<span class="wpo-tag'+(t.on?'':' off')+'" data-t="'+i+'">'+t.tag+'</span>';
    }).join('');
    box.querySelectorAll('.wpo-tag').forEach(function(el){
      el.onclick = function(){ var t=wpoState.tags[+el.getAttribute('data-t')]; t.on=!t.on; wpoRenderTags(); };
    });
  }
  document.getElementById('wpoShrine').addEventListener('input', function(){
    document.getElementById('wpoClear').style.display = this.value ? 'flex' : 'none';
    wpoGenTags(); wpoValidate();
  });
  document.getElementById('wpoPref').addEventListener('change', function(){ wpoGenTags(); wpoValidate(); });
  document.getElementById('wpoText').addEventListener('input', function(){ document.getElementById('wpoCnt').textContent = this.value.length; });

  function wpoValidate(){
    var ok = wpoState.photos.length>0 && document.getElementById('wpoShrine').value.trim() && document.getElementById('wpoPref').value;
    document.getElementById('wpoSubmit').disabled = !ok;
  }

  // プレビュー（トップに載るカードの見た目）
  document.getElementById('wpoPrev').onclick = function(){
    if (!wpoState.photos.length){ toast('写真を追加するとプレビューできます'); return; }
    var name = document.getElementById('wpoShrine').value.trim()||'神社名';
    var pref = document.getElementById('wpoPref').value||'都道府県';
    var pv = document.createElement('div');
    pv.style.cssText='position:fixed;inset:0;z-index:300;background:rgba(20,14,8,.75);display:flex;align-items:center;justify-content:center;';
    pv.innerHTML='<div style="width:230px"><div class="wcp-card"><img src="'+wpoState.photos[0]+'"><div class="wcp-grad"></div><div class="wcp-info"><div class="wcp-userrow"><span class="wcp-av" style="background:#c9a84c">参</span><span class="wcp-un">あなた</span><span class="wcp-like">♡</span></div><div class="wcp-tags"><span># '+name+'</span><span># '+pref+'</span></div></div></div><div style="text-align:center;color:#fff;font-size:11px;margin-top:10px">トップページでの見え方（タップで閉じる）</div></div>';
    pv.onclick=function(){ pv.remove(); };
    document.body.appendChild(pv);
  };

  // 投稿する
  document.getElementById('wpoSubmit').onclick = function(){
    var name = document.getElementById('wpoShrine').value.trim();
    var pref = document.getElementById('wpoPref').value;
    if (!wpoState.photos.length || !name || !pref) return;
    var post = {
      id:'u'+Date.now(),
      user:'あなた', avatar:'参', date:'たった今',
      shrine:name, addr:pref, area:pref.replace(/[都道府県]$/,''),
      img:wpoState.photos[0],
      text:document.getElementById('wpoText').value.trim(),
      tags:wpoState.tags.filter(function(t){return t.on;}).map(function(t){return t.tag;}),
      visibility:document.getElementById('wpoVis').value,
      likes:0, comments:[]
    };
    try{
      var mine = JSON.parse(localStorage.getItem('wabi_my_posts')||'[]');
      mine.unshift(post);
      if (mine.length>12) mine = mine.slice(0,12); // 容量対策
      localStorage.setItem('wabi_my_posts', JSON.stringify(mine));
    }catch(e){ toast('端末の保存容量が足りないため、写真は保存されない場合があります'); }
    if (post.visibility==='public' && typeof USER_POSTS!=='undefined'){
      USER_POSTS.unshift(post);
      redesignCommunity();
    }
    postPg.style.display='none';
    toast('🌿 投稿しました！トップの「みんなの最新投稿」に表示されています');
    var sec = document.querySelector('.community-box');
    if (sec) sec.scrollIntoView({behavior:'smooth', block:'center'});
  };

  // 端末に保存済みの自分の投稿を起動時に反映
  try{
    var mine0 = JSON.parse(localStorage.getItem('wabi_my_posts')||'[]');
    if (mine0.length && typeof USER_POSTS!=='undefined'){
      mine0.slice().reverse().forEach(function(p){ if (p.visibility==='public') USER_POSTS.unshift(p); });
      redesignCommunity();
    }
  }catch(e){}
})();

// マイページを読み込む
(function(){var s=document.createElement("script");s.src="mypage.js?v="+(window._wv||Date.now());document.body.appendChild(s);})();


/* ══════════════════════════════════════════════════════════════
   わびなび：地図の初期表示範囲を「現在地から車で約20分圏」に
   （2026-07-26 追加 / 従来は日本全体＝ズーム6で開いていた）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiMapScope) return;
  window.__wabiMapScope = true;

  var RADIUS_KM = 10;                               // 車で約20分 ≒ 半径10km
  var FALLBACK  = { lat: 35.6812, lng: 139.7671 };  // 東京駅（位置情報が使えない時）
  var LS_KEY    = 'wabiLastLoc';

  function saveLoc(lat, lng){
    try { localStorage.setItem(LS_KEY, lat + ',' + lng); } catch(e){}
  }
  function loadLoc(){
    try {
      var p  = (localStorage.getItem(LS_KEY) || '').split(',');
      var la = parseFloat(p[0]), ln = parseFloat(p[1]);
      if (isFinite(la) && isFinite(ln)) return { lat: la, lng: ln };
    } catch(e){}
    return null;
  }

  // 半径 km が画面に収まるズーム値を計算（端末の画面幅に自動対応）
  function zoomForRadius(lat, km){
    var cv = document.getElementById('mapCanvas');
    var w  = (cv && cv.clientWidth)  || 390;
    var h  = (cv && cv.clientHeight) || 480;
    var px = Math.min(w, h);
    var mppNeeded = (km * 2000) / px;                          // 直径(m) ÷ 画面(px)
    var mppZero   = 156543.03392 * Math.cos(lat * Math.PI / 180);
    var z = Math.log(mppZero / mppNeeded) / Math.LN2;           // 小数ズーム
    if (!isFinite(z)) z = 11;
    return Math.max(9, Math.min(14, Math.round(z * 10) / 10));
  }

  function setScope(c){
    var m = window.mapInstance;
    if (!m || !m.setZoom) return false;
    try {
      // 小数ズームを許可（端末幅ちょうどに合わせるため）
      try { m.setOptions({ isFractionalZoomEnabled: true }); } catch(e){}
      m.setCenter({ lat: c.lat, lng: c.lng });
      m.setZoom(zoomForRadius(c.lat, RADIUS_KM));
    } catch(e){ return false; }
    return true;
  }

  // 地図生成直後は initMap 側のリサイズ処理で戻されるため、時間差で複数回打つ
  function applyScope(c){
    var tries = 0;
    (function loop(){
      if (setScope(c)) {
        setTimeout(function(){ setScope(c); }, 600);
        setTimeout(function(){ setScope(c); }, 1400);
        return;
      }
      if (++tries < 30) setTimeout(loop, 200);
    })();
  }

  // 表示範囲に合わせてDB神社のピンも広げる（従来は半径3kmのみ）
  function repinAround(lat, lng){
    try {
      if (typeof SHRINES === 'undefined' || typeof placePins !== 'function') return;
      if (typeof haversineDistance !== 'function') return;
      var list = SHRINES.filter(function(s){
        return s.lat && s.lng && haversineDistance(lat, lng, s.lat, s.lng) <= RADIUS_KM;
      });
      if (typeof clearMarkers === 'function') clearMarkers();
      placePins(list);
    } catch(e){}
  }

  // ① 現在地が取得できたとき（従来ズーム14＝半径約3km）
  var _near = window.showShrinesNearLocation;
  if (typeof _near === 'function') {
    window.showShrinesNearLocation = function(lat, lng){
      var r = _near.apply(this, arguments);
      saveLoc(lat, lng);
      repinAround(lat, lng);
      applyScope({ lat: lat, lng: lng });
      return r;
    };
  }

  // ② 現在地が取れなかったとき（従来ズーム6＝日本全体）
  var _all = window.showAllShrinesOnMap;
  if (typeof _all === 'function') {
    window.showAllShrinesOnMap = function(){
      var r = _all.apply(this, arguments);
      var c = (window.myLatLng && window.myLatLng.lat) ? window.myLatLng
            : (loadLoc() || FALLBACK);
      repinAround(c.lat, c.lng);
      applyScope(c);
      return r;
    };
  }
})();


/* ══════════════════════════════════════════════════════════════
   わびなび：神社詳細の「いつか訪れたい」→「お気に入りに登録」
   押すと localStorage('wabiFavorites') に保存／再度押すと解除。
   マイページの「お気に入りの神社仏閣」件数に自動反映される。
   （2026-07-27 追加 / index.html は触らず concierge.js から上書き）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiFav) return;
  window.__wabiFav = true;

  var LS   = 'wabiFavorites';
  var GOLD = '#C9A24A';

  function load(){
    try { var a = JSON.parse(localStorage.getItem(LS) || '[]'); return Array.isArray(a) ? a : []; }
    catch(e){ return []; }
  }
  function save(a){ try { localStorage.setItem(LS, JSON.stringify(a)); } catch(e){} }
  function nameOf(x){ return (x && typeof x === 'object') ? (x.name || '') : String(x || ''); }
  function indexOfName(a, n){
    for (var i = 0; i < a.length; i++) if (nameOf(a[i]) === n) return i;
    return -1;
  }

  var STAR_OFF = '<svg viewBox="0 0 14 14" fill="none"><path d="M7 1.2l1.8 3.7 4.1.6-3 2.9.7 4-3.6-1.9L3.4 12.4l.7-4-3-2.9 4.1-.6z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/></svg>';
  var STAR_ON  = '<svg viewBox="0 0 14 14"><path d="M7 1.2l1.8 3.7 4.1.6-3 2.9.7 4-3.6-1.9L3.4 12.4l.7-4-3-2.9 4.1-.6z" fill="currentColor"/></svg>';

  function favBtn(){
    return document.querySelector('#pgShrineDetail button.sd-act-btn[onclick^="sdBookmark"]')
        || document.querySelector('button.sd-act-btn[onclick^="sdBookmark"]');
  }

  // ボタンの見た目を現在の登録状態に合わせる
  function paint(){
    var b = favBtn(); if (!b) return;
    var s  = window.currentSdShrine;
    var on = !!(s && s.name && indexOfName(load(), s.name) >= 0);
    b.innerHTML = (on ? STAR_ON : STAR_OFF) + (on ? 'お気に入り登録済み' : 'お気に入りに登録');
    b.style.background  = on ? GOLD  : '#fff';
    b.style.color       = on ? '#fff' : '';
    b.style.borderColor = GOLD;
  }
  window.__wabiFavPaint = paint;

  // ボタン本体（index.html の onclick="sdBookmark()" から呼ばれる）
  window.sdBookmark = function(){
    var s = window.currentSdShrine;
    if (!s || !s.name) {
      if (typeof showToast === 'function') showToast('神社情報を取得できませんでした');
      return;
    }
    var a = load(), i = indexOfName(a, s.name);
    if (i >= 0) {
      a.splice(i, 1); save(a); paint();
      if (typeof showToast === 'function') showToast('お気に入りを解除しました');
    } else {
      a.push({
        name: s.name, addr: s.addr || '', area: s.area || '',
        lat: s.lat || null, lng: s.lng || null, ts: Date.now()
      });
      save(a); paint();
      if (typeof showToast === 'function') showToast('★「' + s.name + '」をお気に入りに登録しました');
    }
  };

  // 詳細ページを開くたびにボタン表示を更新
  function hook(fnName){
    var orig = window[fnName];
    if (typeof orig !== 'function') return;
    window[fnName] = function(){
      var r = orig.apply(this, arguments);
      setTimeout(paint, 0);
      setTimeout(paint, 300);
      return r;
    };
  }
  // 神社詳細の最下部「AI御朱印巡りルートに追加」ボタンを隠す
  var hideCss = document.createElement('style');
  hideCss.textContent = '#pgShrineDetail button[onclick^="sdAddToAiRoute"]{display:none !important;}';
  document.head.appendChild(hideCss);
  function hideAiBtn(){
    var b = document.querySelector('#pgShrineDetail button[onclick^="sdAddToAiRoute"]');
    if (b) { b.style.display = 'none'; if (b.parentElement) b.parentElement.style.display = 'none'; }
  }

  // populate / open のたびに、お気に入りボタンの再描画とAIボタン非表示を行う
  ['populateShrineDetail', 'openShrineDetail'].forEach(function(fnName){
    var orig = window[fnName];
    if (typeof orig !== 'function') return;
    window[fnName] = function(){
      var r = orig.apply(this, arguments);
      setTimeout(function(){ paint(); hideAiBtn(); }, 0);
      setTimeout(function(){ paint(); hideAiBtn(); }, 300);
      return r;
    };
  });

  setTimeout(function(){ paint(); hideAiBtn(); }, 1200);
})();


/* ══════════════════════════════════════════════════════════════
   わびなび：おすすめ神社ランキングを常にベスト10表示にする
   10位のカードの下に「11位〜◯位を見る」を置き、
   同じ2列カードデザインの別ページで続きを表示する。
   （2026-07-27 追加 / index.html は触らず concierge.js から上書き）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiRankTop10) return;
  window.__wabiRankTop10 = true;

  var TOP = 10;       // トップページに出す件数
  var MAX = 30;       // ランキング全体の件数（1位〜30位）
  var rest = [];      // 11位以降のカードHTML
  var restLabel = '';

  // index.html 側の filter() は10件で切ってしまうため、30件まで出すよう差し替える
  var _origFilter = window.filter;
  window.filter = function(){
    try {
      var areaSel = document.getElementById('areaSel');
      var sortSel = document.getElementById('sortSel');
      if (!areaSel || !sortSel || typeof SHRINES === 'undefined' || typeof renderCard !== 'function') {
        return _origFilter && _origFilter.apply(this, arguments);
      }
      var area = areaSel.value, sort = sortSel.value;
      if (area === 'nearby') { if (typeof searchNearby === 'function') searchNearby(); return; }

      var f = SHRINES.slice();
      if (typeof currentType !== 'undefined' && currentType) f = f.filter(function(s){ return (s.type || 'shrine') === currentType; });
      if (area !== 'all') f = f.filter(function(s){ return s.area === area; });
      if (typeof currentTag !== 'undefined' && currentTag !== 'all') f = f.filter(function(s){ return s.tags && s.tags.indexOf(currentTag) >= 0; });
      if (sort === 'visited') f = f.filter(function(s){ return s.visited; });
      if (sort === 'rating') f.sort(function(a, b){ return b.rating - a.rating; });
      if (sort === 'rank')   f.sort(function(a, b){ return a.rank - b.rank; });

      var lbl = areaSel.options[areaSel.selectedIndex].text;
      var top = f.slice(0, MAX);
      var shown = Math.min(top.length, TOP);
      document.getElementById('resCount').textContent = lbl + ' ' + shown + '件';
      document.getElementById('rmeta').innerHTML = lbl + ' <span>' + shown + '件</span> のおすすめ神社';
      document.getElementById('list').innerHTML = top.length
        ? top.map(function(s, i){ return renderCard(s, i + 1); }).join('')
        : '<div style="text-align:center;color:#aaa;padding:2rem 0;font-size:13px">このエリアの神社はまだありません</div>';
    } catch(e) {
      if (_origFilter) _origFilter.apply(this, arguments);
    }
  };

  var css = document.createElement('style');
  css.textContent = [
    '.wabi-more-rank{grid-column:1/-1;margin-top:4px;display:flex;align-items:center;justify-content:center;gap:6px;',
      'padding:13px 12px;border:1px solid #e6dcc6;border-radius:14px;background:#fffdf8;cursor:pointer;',
      "font-family:'Noto Serif JP',serif;font-size:12.5px;font-weight:600;color:#8a6d3b;letter-spacing:.04em;}",
    '.wabi-more-rank:active{transform:scale(.985)}',
    '#wabiRankMore{position:fixed;inset:0;z-index:300;background:#faf8f4;display:none;overflow-y:auto;-webkit-overflow-scrolling:touch;}',
    '#wabiRankMore .wrm-hd{position:sticky;top:0;z-index:5;background:#a83320;color:#fff;display:flex;align-items:center;gap:10px;padding:14px 16px;}',
    "#wabiRankMore .wrm-hd .b{font-size:20px;cursor:pointer;line-height:1;opacity:.85}",
    "#wabiRankMore .wrm-hd .t{font-family:'Shippori Mincho',serif;font-size:15px;font-weight:800;letter-spacing:.1em}",
    '#wabiRankMore .wrm-in{max-width:500px;margin:0 auto;padding:14px 16px 40px;}',
    "#wabiRankMore .wrm-meta{font-size:11px;color:#888;margin-bottom:.875rem;font-family:'Noto Serif JP',serif;}",
    '#wabiRankMore .wrm-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;align-items:start;}'
  ].join('');
  document.head.appendChild(css);

  var pg = document.createElement('div');
  pg.id = 'wabiRankMore';
  pg.innerHTML = '<div class="wrm-hd"><span class="b">‹</span><span class="t">おすすめ神社ランキング</span></div>'
               + '<div class="wrm-in"><div class="wrm-meta" id="wrmMeta"></div><div class="wrm-grid" id="wrmGrid"></div></div>';
  document.body.appendChild(pg);
  pg.querySelector('.b').onclick = function(){
    pg.style.display = 'none';
    if (typeof updateFabVisibility === 'function') updateFabVisibility();
  };

  // 別ページのカードにも写真を読み込む（トップと同じPlaces取得）
  function fillPhotos(root){
    try {
      if (!window.google || !google.maps || !google.maps.places) return;
      var svc = new google.maps.places.PlacesService(document.createElement('div'));
      root.querySelectorAll('.rcard').forEach(function(c){
        if (c.getAttribute('data-wcphoto')) return;
        var nm = c.querySelector('.rname'), gal = c.querySelector('.pgallery');
        if (!nm || !gal) return;
        c.setAttribute('data-wcphoto', '1');
        svc.findPlaceFromQuery({ query: nm.textContent.trim() + ' 神社', fields: ['photos'] }, function(res, stt){
          if (stt === google.maps.places.PlacesServiceStatus.OK && res && res[0] && res[0].photos && res[0].photos.length) {
            var urls = res[0].photos.slice(0, 4).map(function(p){ return p.getUrl({ maxWidth: 500 }); });
            var strip = urls.slice(0, 4);
            while (strip.length < 4) strip.push(urls[0]);
            gal.innerHTML = '<div class="pgallery-main"><img src="' + urls[0] + '" loading="lazy"><div class="photo-count">📷 ' + urls.length + '枚</div></div>';
            var se = c.querySelector('.pstrip');
            if (se) se.innerHTML = strip.map(function(u){ return '<div class="pstrip-item"><img src="' + u + '" loading="lazy"></div>'; }).join('');
          } else {
            c.removeAttribute('data-wcphoto');
          }
        });
      });
    } catch(e){}
  }

  window.wabiOpenRankMore = function(){
    document.getElementById('wrmMeta').textContent = restLabel;
    var grid = document.getElementById('wrmGrid');
    grid.innerHTML = rest.join('');
    grid.querySelectorAll('.rcard').forEach(function(c){ c.removeAttribute('data-wcphoto'); });
    pg.style.display = 'block';
    pg.scrollTop = 0;
    var fab = document.getElementById('fabMap');
    if (fab) fab.style.display = 'none';
    fillPhotos(grid);
    setTimeout(function(){ fillPhotos(grid); }, 1200);
  };

  var list = document.getElementById('list');
  var mo = null;

  function doTrim(){
    if (!list) return;
    var old = list.querySelector('.wabi-more-rank');

    var cards = [];
    for (var i = 0; i < list.children.length; i++) {
      if (list.children[i].className && String(list.children[i].className).indexOf('rcard') >= 0) cards.push(list.children[i]);
    }
    // すでに10件に絞り込み済み（＝リンクも設置済み）なら何もしない
    if (cards.length <= TOP && old && rest.length) return;
    if (old) old.parentNode.removeChild(old);
    if (cards.length <= TOP) { rest = []; return; }

    rest = [];
    for (var j = TOP; j < cards.length; j++) {
      if (j < MAX) rest.push(cards[j].outerHTML);   // 11位〜30位だけ別ページへ
      cards[j].parentNode.removeChild(cards[j]);
    }
    restLabel = (TOP + 1) + '位〜' + (TOP + rest.length) + '位 のおすすめ神社';

    var more = document.createElement('div');
    more.className = 'wabi-more-rank';
    more.innerHTML = (TOP + 1) + '位〜' + (TOP + rest.length) + '位を見る　›';
    more.onclick = window.wabiOpenRankMore;
    list.appendChild(more);

    // 件数表示もベスト10に合わせる
    try {
      var rc = document.getElementById('resCount');
      var rm = document.getElementById('rmeta');
      if (rc) rc.textContent = rc.textContent.replace(/\d+件/, TOP + '件');
      if (rm) rm.innerHTML = rm.innerHTML.replace(/\d+件/, TOP + '件');
    } catch(e){}
  }

  function trim(){
    if (mo) mo.disconnect();
    try { doTrim(); } catch(e){}
    if (mo && list) mo.observe(list, { childList: true });
  }

  if (list && window.MutationObserver) {
    mo = new MutationObserver(trim);
    mo.observe(list, { childList: true });
  }
  // 差し替えたfilterで一度描き直す（初期表示は10件で切られているため）
  function refresh(){ try { if (typeof window.filter === 'function') window.filter(); } catch(e){} }
  setTimeout(refresh, 200);
  setTimeout(refresh, 1200);
  setTimeout(trim, 300);
  setTimeout(trim, 1500);
})();


/* ══════════════════════════════════════════════════════════════
   わびなび：おすすめ巡拝ルートの「記事ページ」
   1記事＝1ルート。カードをタップするとそのルートだけを表示する。
   （2026-07-27 追加 / index.html・routes.js は触らず concierge.js から上書き）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiRoutePage) return;
  window.__wabiRoutePage = true;

  // ── ルートごとの追記データ（実在の店舗・宿のみ掲載）──────────
  var EXTRA = {
    r1: {
      lead:'東国の神々に導かれる、<br>開運と浄化の旅へ',
      whoFor:['新しいことを始めたい人','心をリセットして前に進みたい人','仕事運・勝負運を上げたい人','人間関係を円滑にしたい人','強力なパワーを授かりたい人'],
      trivia:'東国三社は、江戸時代に「お伊勢参りの禊参り」として広く親しまれました。三社を巡って授かる「東国三社守」は、三角柱に各社の御神紋をおさめる形で知られています。',
      area:'鹿島神宮',
      eats:[
        {cat:'カフェ', name:'和茶房うの', note:'香取神宮の御神水で淹れるコーヒー', loc:'千葉県香取市'},
        {cat:'川魚', name:'戸村川魚店', note:'佐原の川魚店が営むうなぎ', loc:'千葉県香取市'},
        {cat:'甘味', name:'わらび餅 岩立本店', note:'小江戸・佐原の名物わらび餅', loc:'千葉県香取市'},
        {cat:'カフェ', name:'珈琲玉澤', note:'佐原の町並みに佇む珈琲店', loc:'千葉県香取市'},
        {cat:'寿司', name:'鮨 治ろうや', note:'鹿島灘の地魚を握る鮨処', loc:'茨城県鹿嶋市'},
        {cat:'地ビール', name:'パラダイスビール', note:'鹿島神宮の御神水で仕込む鹿嶋の地ビール', loc:'茨城県鹿嶋市'}
      ],
      stays:[
        {cat:'ホテル', name:'佐原商家町ホテル NIPPONIA', note:'佐原の商家を生かした分散型ホテル', loc:'千葉県香取市'},
        {cat:'宿', name:'和風の宿 ホステルコエド佐原', note:'小江戸・佐原の町家の宿', loc:'千葉県香取市'},
        {cat:'旅館', name:'旅館 一蘭荘', note:'佐原に残る小さな旅館', loc:'千葉県香取市'},
        {cat:'ホテル', name:'はまなすの湯 たびのホテル鹿島', note:'温泉に浸かれる鹿島の宿', loc:'茨城県神栖市'},
        {cat:'ホテル', name:'ホテルルートイン鹿嶋', note:'鹿島神宮めぐりの拠点に', loc:'茨城県鹿嶋市'},
        {cat:'宿', name:'かすみの浦 和み', note:'水郷・潮来の一日一組の宿', loc:'茨城県潮来市'}
      ]
    },
    r2: {
      lead:'親子の神をたずねる、<br>山陰の福めぐり',
      whoFor:['良縁を望む人','商売を営む人','人とのご縁を大切にしたい人','人生の節目に願を立てたい人','片参りで終わらせたくない人'],
      trivia:'出雲大社だけを参拝して美保神社を訪れないことは、古くから「片参り」と呼ばれてきました。大国主大神と御子神・事代主神の両方をお参りして、はじめて満願とされます。',
      area:'出雲大社',
      eats:[
        {cat:'そば', name:'平和そば本店', note:'出雲大社ちかくの割子そば', loc:'島根県出雲市'},
        {cat:'そば', name:'羽根屋 本店', note:'出雲を代表する老舗そば処', loc:'島根県出雲市'},
        {cat:'カフェ', name:'koharu', note:'出雲大社ちかくの小さなカフェ', loc:'島根県出雲市'},
        {cat:'和食', name:'しまね和牛と米と出汁', note:'島根の食材を味わう和食', loc:'島根県出雲市'},
        {cat:'そば', name:'出雲そば 荒木屋', note:'出雲大社ちかくの老舗割子そば', loc:'島根県出雲市'},
        {cat:'和食', name:'味処まつや', note:'美保関ちかくの食事処', loc:'島根県松江市'}
      ],
      stays:[
        {cat:'ホテル', name:'NIPPONIA 出雲大社 門前町', note:'門前町の町家を生かした宿', loc:'島根県出雲市'},
        {cat:'旅館', name:'界 出雲', note:'日本海を望む温泉旅館', loc:'島根県出雲市'},
        {cat:'旅館', name:'いにしえの宿 佳雲', note:'出雲大社まで徒歩8分／天然温泉', loc:'島根県出雲市'},
        {cat:'旅館', name:'湯宿 草菴', note:'出雲の静かな温泉宿', loc:'島根県出雲市'},
        {cat:'旅館', name:'お宿 月夜のうさぎ', note:'縁結びの町の和モダン宿', loc:'島根県出雲市'},
        {cat:'旅館', name:'旅館 美保館', note:'美保神社ちかく／本館は国登録有形文化財', loc:'島根県松江市'}
      ]
    },
    r3: {
      lead:'禊から内宮へ、<br>一生に一度の正式順路',
      whoFor:['一生に一度のお参りをしたい人','正しい作法で巡りたい人','心身を清めたい人','日々の感謝を伝えたい人','神宮の歴史にふれたい人'],
      trivia:'「お伊勢参らば朝熊をかけよ、朝熊かけねば片参り」。伊勢音頭に唄われたこの一節が、外宮・内宮のあとに朝熊岳金剛證寺を訪ねる習わしを今に伝えています。',
      area:'伊勢神宮 内宮',
      eats:[
        {cat:'甘味', name:'赤福 本店', note:'おはらい町／1707年創業の伊勢名物', loc:'三重県伊勢市'},
        {cat:'伊勢うどん', name:'ふくすけ', note:'おかげ横丁／手打ち伊勢うどんが名物', loc:'三重県伊勢市'},
        {cat:'甘味', name:'五十鈴勢語庵', note:'伊勢の塩ようかん', loc:'三重県伊勢市'},
        {cat:'伊勢うどん', name:'めん処 政成', note:'伊勢うどんと煮込みうどんの専門店', loc:'三重県伊勢市'},
        {cat:'カフェ', name:'BonTin cafe 禊', note:'二見ちかくの海辺のカフェ', loc:'三重県伊勢市'},
        {cat:'甘味', name:'茶房山中', note:'伊勢のひとやすみ処', loc:'三重県伊勢市'}
      ],
      stays:[
        {cat:'旅館', name:'麻吉旅館', note:'古市街道に残る江戸期からの旅館', loc:'三重県伊勢市'},
        {cat:'旅館', name:'日の出旅館', note:'伊勢市駅ちかくの木造旅館', loc:'三重県伊勢市'},
        {cat:'旅館', name:'星出館', note:'昭和初期の建物が残る宿', loc:'三重県伊勢市'},
        {cat:'旅館', name:'大石屋', note:'二見浦ちかくの旅館', loc:'三重県伊勢市'},
        {cat:'宿泊施設', name:'神宮会館', note:'内宮まで徒歩5分／早朝の参拝案内あり', loc:'三重県伊勢市'},
        {cat:'旅館', name:'いにしえの宿 伊久', note:'内宮まで徒歩15分／全室露天風呂付', loc:'三重県伊勢市'}
      ]
    },
    r4: {
      lead:'甦りの地へ、<br>山と海をわたる祈りの道',
      whoFor:['人生を仕切り直したい人','自然の力にふれたい人','世界遺産の道を歩きたい人','心身を癒したい人','静かに自分と向き合いたい人'],
      trivia:'熊野は古くから「甦りの地」と呼ばれ、身分を問わず人々が参詣したことから「蟻の熊野詣」と称されました。三山を結ぶ熊野古道は世界遺産に登録されています。',
      area:'熊野本宮大社',
      eats:[
        {cat:'ラーメン', name:'麺屋みつあし', note:'本宮ちかくの人気麺処', loc:'和歌山県田辺市'},
        {cat:'カフェ', name:'bond', note:'熊野本宮の小さなカフェ', loc:'和歌山県田辺市'},
        {cat:'海鮮', name:'鮪十屋', note:'那智勝浦の生まぐろ丼', loc:'和歌山県那智勝浦町'},
        {cat:'和食', name:'八咫庵', note:'熊野本宮大社ちかくの食事処', loc:'和歌山県田辺市'},
        {cat:'寿司', name:'宮ずし', note:'熊野の地魚を握る寿司処', loc:'和歌山県田辺市'},
        {cat:'海鮮', name:'桂城', note:'那智勝浦の生まぐろ料理', loc:'和歌山県那智勝浦町'}
      ],
      stays:[
        {cat:'宿', name:'熊野古道の宿 霧の郷たかはら', note:'熊野古道 中辺路の高原に建つ宿', loc:'和歌山県田辺市'},
        {cat:'民宿', name:'民宿 瀧よし', note:'湯の峰温泉のかけ流し', loc:'和歌山県田辺市'},
        {cat:'旅館', name:'あづまや', note:'日本最古の湯とされる湯の峰温泉', loc:'和歌山県田辺市'},
        {cat:'宿', name:'WhyKumano Hostel & Cafe Bar', note:'那智勝浦のゲストハウス', loc:'和歌山県那智勝浦町'},
        {cat:'宿', name:'熊野古道の宿 GuesthouseMUI', note:'熊野古道歩きの拠点に', loc:'和歌山県田辺市'},
        {cat:'宿', name:'ペンションあしたの森', note:'熊野の森に囲まれた宿', loc:'和歌山県田辺市'}
      ]
    },
    r5: {
      lead:'諏訪湖をめぐる、<br>四社まいりの旅',
      whoFor:['ものごとを成し遂げたい人','自然信仰にふれたい人','四社すべてを巡りたい人','温泉もあわせて楽しみたい人','家族の安泰を願う人'],
      trivia:'諏訪大社には本殿がなく、山や樹木そのものを御神体とする古い信仰の形が残ります。四社すべてを参拝する「四社まいり」の習わしが今も受け継がれています。',
      area:'諏訪大社 上社本宮',
      eats:[
        {cat:'うなぎ', name:'うなぎ 林屋', note:'1893年創業／諏訪のうなぎの名店', loc:'長野県下諏訪町'},
        {cat:'和菓子', name:'新鶴本店', note:'明治6年創業／秋宮前の塩羊羹', loc:'長野県下諏訪町'},
        {cat:'食堂', name:'本田食堂', note:'下諏訪で親しまれる食堂', loc:'長野県下諏訪町'},
        {cat:'そば', name:'そば処とみや', note:'諏訪の手打ちそば', loc:'長野県諏訪市'},
        {cat:'和食', name:'宇迦', note:'諏訪の旬を味わう和食', loc:'長野県諏訪市'},
        {cat:'川魚', name:'丸共 清水屋川魚店', note:'諏訪湖の川魚とうなぎ', loc:'長野県岡谷市'}
      ],
      stays:[
        {cat:'旅館', name:'ぬのはん', note:'上諏訪温泉／諏訪湖畔の創作会席の宿', loc:'長野県諏訪市'},
        {cat:'旅館', name:'上諏訪温泉しんゆ', note:'諏訪湖を望む上諏訪温泉の宿', loc:'長野県諏訪市'},
        {cat:'旅館', name:'上諏訪温泉 浜の湯', note:'諏訪湖畔の露天風呂', loc:'長野県諏訪市'},
        {cat:'旅館', name:'萃sui-諏訪湖', note:'諏訪湖畔の小さな宿', loc:'長野県諏訪市'},
        {cat:'旅館', name:'下諏訪温泉 聴泉閣かめや', note:'秋宮ちかくの老舗旅館', loc:'長野県下諏訪町'},
        {cat:'旅館', name:'ホテル鷺乃湯', note:'上諏訪温泉の湖畔宿', loc:'長野県諏訪市'}
      ]
    },
    r6: {
      lead:'杉並木の奥へ、<br>天岩戸の神々をたずねて',
      whoFor:['静かな森を歩きたい人','神話の舞台を訪ねたい人','蕎麦を味わいたい人','宿坊に泊まってみたい人','心を整えたい人'],
      trivia:'戸隠は天岩戸神話ゆかりの地で、投げられた岩戸が現在の戸隠山になったと伝えられます。奥社の参道には樹齢400年を超える杉並木が続きます。',
      area:'戸隠神社',
      eats:[
        {cat:'そば', name:'蕎麦処 うずら家', note:'戸隠を代表する行列のそば処', loc:'長野県長野市戸隠'},
        {cat:'そば', name:'蕎麦 二葉屋 葉隠', note:'中社ちかくの人気そば処', loc:'長野県長野市戸隠'},
        {cat:'そば', name:'戸隠･手打ちそば つる家', note:'奥社参道ちかくの手打ちそば', loc:'長野県長野市戸隠'},
        {cat:'和食', name:'山帰来 つた弥', note:'戸隠の山菜を味わう', loc:'長野県長野市戸隠'},
        {cat:'カフェ', name:'き楽珈琲', note:'戸隠の自家焙煎珈琲', loc:'長野県長野市戸隠'},
        {cat:'そば', name:'信州戸隠そばの実', note:'日本蕎麦百名店に選ばれた戸隠そば', loc:'長野県長野市戸隠'}
      ],
      stays:[
        {cat:'宿坊', name:'戸隠 旧福寿院 武井旅館', note:'戸隠神社の宿坊', loc:'長野県長野市戸隠'},
        {cat:'宿坊', name:'戸隠神社 宿坊 山本館', note:'中社ちかくの宿坊', loc:'長野県長野市戸隠'},
        {cat:'宿坊', name:'戸隠神社宿坊 旧延命院 御宿 諏訪', note:'戸隠神社の宿坊', loc:'長野県長野市戸隠'},
        {cat:'旅館', name:'越志旅館', note:'戸隠の老舗旅館', loc:'長野県長野市戸隠'},
        {cat:'宿', name:'宿屋 白金家', note:'戸隠のちいさな宿', loc:'長野県長野市戸隠'},
        {cat:'宿', name:'山宿 戸隠小舎', note:'戸隠高原の山宿', loc:'長野県長野市戸隠'}
      ]
    },
    r7: {
      lead:'山の気に満ちた、<br>秩父の三社を結ぶ道',
      whoFor:['気持ちを引き締めたい人','山のパワーを感じたい人','ご当地グルメも楽しみたい人','関東で本格的な巡拝をしたい人','狼信仰にふれたい人'],
      trivia:'秩父神社・宝登山神社・三峯神社をあわせて「秩父三社」と呼びます。三峯神社は標高約1,100mの山中に鎮座し、狼を神使とする信仰で知られます。',
      area:'秩父神社',
      eats:[
        {cat:'豚みそ丼', name:'豚みそ丼本舗 野さか', note:'秩父名物の豚みそ丼', loc:'埼玉県秩父市'},
        {cat:'かき氷', name:'阿左美冷蔵 寶登山道店', note:'明治23年創業／宝登山神社の参道で天然氷', loc:'埼玉県長瀞町'},
        {cat:'食堂', name:'秩父パリー食堂', note:'昭和2年築／国の登録有形文化財の食堂', loc:'埼玉県秩父市'},
        {cat:'そば', name:'そば工房 そば福', note:'秩父の手打ちそば', loc:'埼玉県秩父市'},
        {cat:'カフェ', name:'cafe ura_hoto', note:'長瀞のちいさなカフェ', loc:'埼玉県長瀞町'},
        {cat:'甘味', name:'茶夢', note:'長瀞の甘味処', loc:'埼玉県長瀞町'}
      ],
      stays:[
        {cat:'ホテル', name:'NIPPONIA 秩父 門前町', note:'秩父神社の門前町に泊まる', loc:'埼玉県秩父市'},
        {cat:'旅館', name:'須崎旅館', note:'秩父・小鹿野町の旅館', loc:'埼玉県小鹿野町'},
        {cat:'宿', name:'二百年の農家屋敷 宮本家', note:'築二百年の農家屋敷の宿', loc:'埼玉県小鹿野町'},
        {cat:'宿', name:'秩父別邸 木叢', note:'秩父の一棟貸しの宿', loc:'埼玉県秩父市'},
        {cat:'旅館', name:'秩父温泉 ゆの宿 和どう', note:'秩父七湯のひとつ和銅鉱泉', loc:'埼玉県秩父市'},
        {cat:'ホテル', name:'ホテルルートインGrand秩父', note:'秩父駅ちかくの拠点宿', loc:'埼玉県秩父市'}
      ]
    },
    r8: {
      lead:'都をまもる四神と、<br>中央の社をむすぶ',
      whoFor:['京都をじっくり巡りたい人','厄除け・方除を願う人','歴史や由緒にふれたい人','電車で無理なく回りたい人','京料理も楽しみたい人'],
      trivia:'京都五社めぐりは、平安京を四方から守護する四神——北の玄武（上賀茂神社）、西の白虎（松尾大社）、南の朱雀（城南宮）、東の青龍（八坂神社）——に、中央の平安神宮を加えた巡拝です。',
      area:'八坂神社',
      eats:[
        {cat:'うなぎ', name:'炭火鰻 翠川 祗園八坂', note:'八坂神社ちかくの炭火鰻', loc:'京都府京都市東山区'},
        {cat:'京料理', name:'祇園 もりわき', note:'祇園の割烹', loc:'京都府京都市東山区'},
        {cat:'甘味', name:'甘味処 乃あん', note:'祇園の和カフェ', loc:'京都府京都市東山区'},
        {cat:'和菓子', name:'神馬堂', note:'明治5年創業／上賀茂神社門前のやきもち', loc:'京都府京都市北区'},
        {cat:'和菓子', name:'葵家やきもち総本舗 上賀茂本店', note:'上賀茂神社 鳥居前のやきもち', loc:'京都府京都市北区'},
        {cat:'和食', name:'魚末', note:'東山の魚料理', loc:'京都府京都市東山区'}
      ],
      stays:[
        {cat:'旅館', name:'柚子屋旅館', note:'八坂神社前の京旅館', loc:'京都府京都市東山区'},
        {cat:'旅館', name:'SOWAKA', note:'祇園・八坂の元料亭を生かした宿', loc:'京都府京都市東山区'},
        {cat:'ホテル', name:'THE JUNEI HOTEL Kyoto', note:'京の設えでもてなす小規模ホテル', loc:'京都府京都市'},
        {cat:'旅館', name:'十四春旅館', note:'東山の老舗旅館', loc:'京都府京都市東山区'},
        {cat:'旅館', name:'京の宿 祇園佐の', note:'祇園の町家宿', loc:'京都府京都市東山区'},
        {cat:'宿', name:'京小宿 八坂 ゆとね', note:'八坂ちかくの一棟貸し', loc:'京都府京都市東山区'}
      ]
    },
    r9: {
      lead:'富士の北麓、<br>ふたつの浅間をたずねる',
      whoFor:['金運を上げたい人','富士山の力を感じたい人','短時間で巡りたい人','世界文化遺産を訪ねたい人','仕事の転機を迎えた人'],
      trivia:'北口本宮冨士浅間神社は吉田口登山道の起点で、富士山世界文化遺産の構成資産のひとつです。新屋山神社の奥宮は、金運のお社として広く知られています。',
      area:'北口本宮冨士浅間神社',
      eats:[
        {cat:'吉田のうどん', name:'麺許皆伝', note:'富士吉田を代表するうどん店', loc:'山梨県富士吉田市'},
        {cat:'吉田のうどん', name:'ふもとや', note:'ごぼうのきんぴらが名物', loc:'山梨県富士吉田市'},
        {cat:'カフェ', name:'Fuuto Coffee&Bakeshop', note:'富士吉田の自家焙煎とパン', loc:'山梨県富士吉田市'},
        {cat:'すき焼き', name:'ふじ乃屋', note:'富士吉田のすき焼き・しゃぶしゃぶ', loc:'山梨県富士吉田市'},
        {cat:'カフェ', name:'Harukiya Coffee Roastery', note:'本町通りの焙煎所', loc:'山梨県富士吉田市'},
        {cat:'カフェ', name:'The Pleasure Garden Cafe', note:'富士山を望むカフェ', loc:'山梨県富士吉田市'}
      ],
      stays:[
        {cat:'ホテル', name:'富士山ステーションホテル', note:'富士山駅から徒歩2分', loc:'山梨県富士吉田市'},
        {cat:'ホテル', name:'ハイランドリゾート ホテル&スパ', note:'ふじやま温泉に隣接', loc:'山梨県富士吉田市'},
        {cat:'ホテル', name:'Megu Fuji Plus+', note:'富士吉田の眺望のよい宿', loc:'山梨県富士吉田市'},
        {cat:'旅館', name:'富士河口湖温泉郷 湖南荘', note:'河口湖畔の温泉宿', loc:'山梨県富士河口湖町'},
        {cat:'宿', name:'ホステル富士山・結', note:'富士吉田の町なかの宿', loc:'山梨県富士吉田市'},
        {cat:'ホテル', name:'BLANC FUJI', note:'富士山を望む小さな宿', loc:'山梨県富士吉田市'}
      ]
    },
    r10: {
      lead:'男体・女体、<br>ふたつの峰にのぼる',
      whoFor:['夫婦・カップルで訪れたい人','山歩きを楽しみたい人','縁結びを願う人','関東平野の眺めを見たい人','温泉もあわせて楽しみたい人'],
      trivia:'筑波山は男体山に伊弉諾尊、女体山に伊弉冉尊をお祀りし、ふたつの峰そのものが御神体です。『万葉集』にも詠まれ、「西の富士、東の筑波」と並び称されました。',
      area:'筑波山神社',
      eats:[
        {cat:'そば', name:'筑膳', note:'築100年の古民家／手打ち蕎麦と旬の山の幸', loc:'茨城県つくば市'},
        {cat:'うどん', name:'あんだ堂', note:'4代続く製麺工場が営むうどん・そば', loc:'茨城県つくば市'},
        {cat:'カフェ', name:'877Stand 筑波山山頂店', note:'筑波山山頂の眺望カフェ', loc:'茨城県つくば市'},
        {cat:'和食', name:'麦とろ まる信食堂', note:'筑波山ふもとの麦とろ', loc:'茨城県つくば市'},
        {cat:'和食', name:'とんとこ豚', note:'つくばの豚料理', loc:'茨城県つくば市'},
        {cat:'和食', name:'彩食工房ひるくらいむ', note:'つくばの創作和食', loc:'茨城県つくば市'}
      ],
      stays:[
        {cat:'ホテル', name:'ホテル一望', note:'筑波山中腹／関東平野を見晴らす宿', loc:'茨城県つくば市'},
        {cat:'宿', name:'古民家宿 旧小林邸ひととき', note:'筑波山ふもとの古民家宿', loc:'茨城県つくば市'},
        {cat:'温泉', name:'つくば温泉 喜楽里 別邸', note:'つくばの日帰り温泉と宿', loc:'茨城県つくば市'},
        {cat:'ホテル', name:'ホテル ベストランド', note:'つくば駅ちかくの拠点宿', loc:'茨城県つくば市'},
        {cat:'ホテル', name:'BEB5土浦 by 星野リゾート', note:'霞ヶ浦ちかくのカジュアルホテル', loc:'茨城県土浦市'},
        {cat:'グランピング', name:'筑波山ゲルグランピング', note:'筑波山を望むグランピング', loc:'茨城県石岡市'}
      ]
    }
  };
  window.WABI_ROUTE_EXTRA = EXTRA;

  // ── スタイル ─────────────────────────────────────────────
  var C = { bg:'#FAF8F4', main:'#6E4BA8', gold:'#C8A14A', text:'#2D2D2D', sub:'#6F6F6F', card:'#FFF' };
  var st = document.createElement('style');
  st.textContent = [
    "#wabiRoutePg{position:fixed;inset:0;z-index:310;background:"+C.bg+";display:none;overflow-y:auto;-webkit-overflow-scrolling:touch;font-family:'Shippori Mincho','Noto Serif JP',serif;color:"+C.text+";}",
    '#wabiRoutePg .wrp-in{max-width:500px;margin:0 auto;padding-bottom:48px;}',
    '#wabiRoutePg .wrp-hero{position:relative;width:100%;aspect-ratio:3/2;min-height:240px;background:#3a3025;background-size:cover;background-position:center center;background-repeat:no-repeat;}',
    '#wabiRoutePg .wrp-hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.35) 0%,rgba(0,0,0,0) 38%,rgba(0,0,0,.62) 100%);}',
    '#wabiRoutePg .wrp-top{position:absolute;top:14px;left:16px;right:16px;display:flex;align-items:center;justify-content:space-between;z-index:2;}',
    '#wabiRoutePg .wrp-ic{width:34px;height:34px;border-radius:50%;background:rgba(0,0,0,.34);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;color:#fff;font-size:17px;cursor:pointer;}',
    '#wabiRoutePg .wrp-ics{display:flex;gap:8px;}',
    '#wabiRoutePg .wrp-hcap{position:absolute;left:16px;right:16px;bottom:52px;z-index:2;}',
    '#wabiRoutePg .wrp-label{display:inline-block;background:'+C.main+';color:#fff;font-size:11px;font-weight:600;letter-spacing:.06em;padding:4px 11px;border-radius:12px;margin-bottom:9px;}',
    '#wabiRoutePg .wrp-title{color:#fff;font-size:24px;font-weight:700;line-height:1.3;text-shadow:0 2px 10px rgba(0,0,0,.4);}',
    '#wabiRoutePg .wrp-sub{color:rgba(255,255,255,.9);font-size:14px;font-weight:500;margin-top:6px;text-shadow:0 2px 8px rgba(0,0,0,.4);}',
    '#wabiRoutePg .wrp-body{padding:0 16px;}',
    '#wabiRoutePg .wrp-sec{margin-top:24px;}',
    '#wabiRoutePg .wrp-time{margin-top:-26px;position:relative;z-index:3;background:'+C.card+';border-radius:20px;box-shadow:0 8px 24px rgba(0,0,0,.06);padding:16px 18px;display:flex;align-items:center;gap:10px;}',
    '#wabiRoutePg .wrp-time .lb{font-size:13px;color:'+C.sub+';font-weight:500;flex:1;}',
    '#wabiRoutePg .wrp-time .vl{font-size:19px;font-weight:400;color:'+C.text+';}',
    '#wabiRoutePg .wrp-eyebrow{font-size:12px;font-weight:600;color:'+C.main+';letter-spacing:.06em;margin-bottom:8px;}',
    "#wabiRoutePg .wrp-h2{font-family:'Shippori Mincho','Noto Serif JP',serif;font-size:22px;font-weight:700;line-height:1.45;margin-bottom:14px;}",
    '#wabiRoutePg .wrp-p{font-size:15px;font-weight:400;line-height:1.7;color:'+C.text+';margin-bottom:14px;}',
    '#wabiRoutePg .wrp-h3{display:flex;align-items:center;gap:7px;font-size:18px;font-weight:700;margin-bottom:12px;}',
    '#wabiRoutePg .wrp-h3 .em{font-size:16px;}',
    '#wabiRoutePg .wrp-who{background:#F3F0FA;border-radius:20px;padding:18px 18px 16px;}',
    '#wabiRoutePg .wrp-who .it{display:flex;align-items:flex-start;gap:9px;font-size:14px;line-height:1.6;margin-top:11px;}',
    '#wabiRoutePg .wrp-who .it:first-of-type{margin-top:0;}',
    '#wabiRoutePg .wrp-ck{flex:0 0 18px;width:18px;height:18px;border-radius:50%;background:'+C.main+';color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;margin-top:2px;}',
    '#wabiRoutePg .wrp-spot{display:flex;gap:12px;background:'+C.card+';border-radius:20px;box-shadow:0 8px 24px rgba(0,0,0,.06);padding:12px;margin-bottom:12px;}',
    '#wabiRoutePg .wrp-spot .ph{position:relative;flex:0 0 96px;width:96px;height:96px;border-radius:14px;background:#e9e3d8 center/cover;overflow:hidden;}',
    '#wabiRoutePg .wrp-spot .no{position:absolute;top:6px;left:6px;width:22px;height:22px;border-radius:50%;background:'+C.main+';color:#fff;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;}',
    '#wabiRoutePg .wrp-spot .nm{font-size:16px;font-weight:700;line-height:1.35;}',
    '#wabiRoutePg .wrp-spot .bn{display:inline-block;font-size:12px;font-weight:600;color:'+C.gold+';margin:3px 0 5px;}',
    '#wabiRoutePg .wrp-spot .tx{font-size:13px;font-weight:400;line-height:1.65;color:'+C.sub+';}',
    '#wabiRoutePg .wrp-tri{background:#F6F3FC;border:1px solid #E2D9F2;border-radius:20px;padding:16px 18px;}',
    '#wabiRoutePg .wrp-tri .tt{display:flex;align-items:center;gap:7px;font-size:14px;font-weight:700;margin-bottom:9px;}',
    '#wabiRoutePg .wrp-tri .tx{font-size:13px;line-height:1.75;color:#4A4458;}',
    '#wabiRoutePg .wrp-cta{width:100%;background:'+C.main+';color:#fff;border:none;border-radius:16px;padding:16px;font-size:15px;font-weight:700;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;font-family:inherit;box-shadow:0 8px 24px rgba(110,75,168,.28);}',
    '#wabiRoutePg .wrp-cta:active{transform:scale(.99);}',
    "#wabiRoutePg .wrp-cta2{width:100%;margin-top:12px;height:56px;border-radius:28px;background:#5E3A8A;color:#fff;border:none;font-family:'Shippori Mincho',serif;font-size:16px;font-weight:700;letter-spacing:.06em;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 4px 14px rgba(94,58,138,.3);}",
    "#wabiRoutePg .wrp-cta2:active{transform:scale(.99);}",
    '#wabiRoutePg .wrp-scroll{display:flex;gap:12px;overflow-x:auto;padding-bottom:6px;margin:0 -16px;padding-left:16px;padding-right:16px;-webkit-overflow-scrolling:touch;}',
    '#wabiRoutePg .wrp-scroll::-webkit-scrollbar{display:none;}',
    '#wabiRoutePg .wpc{flex:0 0 152px;width:152px;background:'+C.card+';border-radius:20px;box-shadow:0 8px 24px rgba(0,0,0,.06);overflow:hidden;cursor:pointer;text-decoration:none;color:inherit;display:block;}',
    '#wabiRoutePg .wpc .im{height:92px;display:flex;align-items:center;justify-content:center;font-size:26px;background-size:cover;background-position:center;}',
    '#wabiRoutePg .wpc .bd{padding:10px 11px 12px;}',
    '#wabiRoutePg .wpc .ct{font-size:11px;font-weight:600;color:'+C.sub+';}',
    '#wabiRoutePg .wpc .nm{font-size:13px;font-weight:700;line-height:1.4;margin:3px 0 5px;}',
    '#wabiRoutePg .wpc .nt{font-size:11px;font-weight:400;line-height:1.5;color:'+C.sub+';}',
    '#wabiRoutePg .wpc .lc{font-size:11px;color:'+C.gold+';font-weight:600;margin-top:6px;}',
    '#wabiRoutePg .wpc.more .im{background:#EFEAF8;color:'+C.main+';}',
    '#wabiRoutePg .wrp-spot{cursor:pointer;align-items:center;}',
    '#wabiRoutePg .wrp-spot:active{transform:scale(.995);}',
    '#wabiRoutePg .wrp-spot .ar{flex:0 0 14px;color:#bbb;font-size:20px;line-height:1;}',
    '#wabiRoutePg .wpc{position:relative;display:flex;flex-direction:column;}',
    '#wabiRoutePg .wpc .im,#wabiRoutePg .wpc .bd{cursor:pointer;}',
    '#wabiRoutePg .wpc .bd{flex:1;}',
    '#wabiRoutePg .wpc .rt{font-size:11px;font-weight:600;color:'+C.gold+';margin-bottom:4px;}',
    '#wabiRoutePg .wpc .rt span{color:#9a9a9a;font-weight:400;}',
    "#wabiRoutePg .wpc-add{margin:0 11px 12px;padding:8px 0;border-radius:12px;border:1px solid "+C.main+";background:#fff;color:"+C.main+";font-family:inherit;font-size:11.5px;font-weight:700;cursor:pointer;}",
    "#wabiRoutePg .wpc-add.on{background:"+C.main+";color:#fff;}",
    '#wabiRoutePg .wrp-added{margin-bottom:10px;}',
    '#wabiRoutePg .wrp-added .tt{font-size:12px;font-weight:700;color:'+C.sub+';margin-bottom:7px;}',
    "#wabiRoutePg .wrp-added .chip{display:inline-block;background:#EFEAF8;color:"+C.main+";font-size:12px;font-weight:600;padding:5px 11px;border-radius:12px;margin:0 6px 6px 0;}",
    "#wabiRoutePg .wrp-h3 .wk{margin-left:auto;font-size:10.5px;font-weight:600;color:"+C.main+";background:#EFEAF8;padding:3px 9px;border-radius:10px;}",
    '#wabiRoutePg .wrp-note{font-size:11px;color:#9a9a9a;line-height:1.6;margin-top:10px;}'
  ].join('');
  document.head.appendChild(st);

  var pg = document.createElement('div');
  pg.id = 'wabiRoutePg';
  pg.innerHTML = '<div class="wrp-in" id="wrpIn"></div>';
  document.body.appendChild(pg);

  function esc(s){ return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function gmap(q){ return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q); }
  function transIcon(t){ return t === '徒歩' ? '🚶' : t === '電車' ? '🚃' : t === 'バス' ? '🚌' : '🚗'; }
  function catIcon(c){
    if (/うどん|そば|麺/.test(c)) return '🍜';
    if (/うなぎ|かつ|和食|京料理|食堂/.test(c)) return '🍱';
    if (/甘味|茶屋|カフェ/.test(c)) return '🍡';
    if (/ビール|酒/.test(c)) return '🍺';
    if (/宿坊/.test(c)) return '🏯';
    if (/旅館/.test(c)) return '♨️';
    return '🏨';
  }
  var TINT = ['#FBF3E7','#F3F0FA','#EEF4F0','#FAF0F0','#F1F1F7','#F7F2EA'];

  function spotCard(s, i){
    var ph = s.photo ? ' style="background-image:url(\'' + esc(s.photo) + '\')"' : '';
    var tx = (s.deity ? esc(s.deity) + 'をお祀りするお社。' : '') + (s.benefit ? esc(s.benefit) + 'のご利益で知られます。' : '');
    return '<div class="wrp-spot" data-spot="' + i + '">'
      + '<div class="ph"' + ph + '><div class="no">' + (i + 1) + '</div></div>'
      + '<div style="flex:1;min-width:0">'
        + '<div class="nm">' + esc(s.name) + '</div>'
        + (s.benefit ? '<div class="bn">' + esc(s.benefit) + '</div>' : '')
        + '<div class="tx">' + tx + '</div>'
      + '</div><div class="ar">›</div></div>';
  }

  // ── ルートに追加したスポットの保存 ──────────────────────
  var LS_ADD = 'wabiRouteExtras';
  function loadAdd(){
    try { var o = JSON.parse(localStorage.getItem(LS_ADD) || '{}'); return (o && typeof o === 'object') ? o : {}; }
    catch(e){ return {}; }
  }
  function saveAdd(o){ try { localStorage.setItem(LS_ADD, JSON.stringify(o)); } catch(e){} }
  function addedList(rid){ var o = loadAdd(); return o[rid] || []; }
  function isAdded(rid, name){ return addedList(rid).some(function(p){ return p.name === name; }); }
  function toggleAdd(rid, p){
    var o = loadAdd(), a = o[rid] || [];
    var i = -1; a.forEach(function(x, k){ if (x.name === p.name) i = k; });
    if (i >= 0) a.splice(i, 1); else a.push({ name: p.name, loc: p.loc || '' });
    o[rid] = a; saveAdd(o);
    return i < 0;
  }

  function placeCard(p, i){
    var q = p.name + ' ' + (p.loc || '');
    return '<div class="wpc" data-q="' + esc(q) + '" data-name="' + esc(p.name) + '" data-loc="' + esc(p.loc || '') + '">'
      + '<div class="im" data-gmap="' + esc(q) + '" style="background-color:' + TINT[i % TINT.length] + '">' + catIcon(p.cat) + '</div>'
      + '<div class="bd" data-gmap="' + esc(q) + '"><div class="ct">' + esc(p.cat) + '</div>'
      + '<div class="nm">' + esc(p.name) + '</div>'
      + '<div class="rt"></div>'
      + '<div class="nt">' + esc(p.note) + '</div>'
      + '<div class="lc">' + esc(p.loc) + '</div></div>'
      + '<button class="wpc-add" type="button">＋ ルートに追加</button></div>';
  }

  // ── 毎週更新：週番号でリストを回転させ、その週の分を表示する ──
  var SHOW = 3;   // 1週あたりに出す件数
  function weekIndex(){
    // 1970-01-05(月)を起点にした通し週番号
    return Math.floor((Date.now() - 4 * 864e5) / (7 * 864e5));
  }
  function weeklyPick(arr){
    if (!arr || !arr.length) return [];
    var w = weekIndex(), n = arr.length;
    var k = ((w % n) + n) % n;
    return arr.slice(k).concat(arr.slice(0, k)).slice(0, SHOW);
  }

  function scrollSec(icon, title, items, minRating){
    items = weeklyPick(items);
    if (!items.length) return '';
    var h = '<div class="wrp-sec"><div class="wrp-h3"><span class="em">' + icon + '</span>' + title
          + '<span class="wk">毎週更新</span></div>'
          + '<div class="wrp-scroll"' + (minRating ? ' data-min="' + minRating + '"' : '') + '>';
    h += items.map(placeCard).join('');
    h += '</div></div>';
    return h;
  }

  // Google Placesから写真と評価を取得し、★4.0未満のスポットは非表示にする
  function fillPlacePhotos(root, rid){
    var cards = root.querySelectorAll('.wpc[data-q]');
    if (!window.google || !google.maps || !google.maps.places) {
      cards.forEach(function(c){ c.style.display = ''; });   // 取得できない環境では全件表示
      return;
    }
    var svc = new google.maps.places.PlacesService(document.createElement('div'));
    cards.forEach(function(card){
      if (card.getAttribute('data-done')) return;
      card.setAttribute('data-done', '1');
      svc.findPlaceFromQuery({ query: card.getAttribute('data-q'), fields: ['photos', 'rating', 'user_ratings_total'] }, function(res, stt){
        var ok = (stt === google.maps.places.PlacesServiceStatus.OK && res && res[0]);
        var rating = ok && res[0].rating ? res[0].rating : 0;
        var sc = card.parentNode;
        var min = sc && sc.getAttribute ? parseFloat(sc.getAttribute('data-min') || '0') : 0;
        // 評価が取得できて、基準を下回るスポットは表示しない
        if (min && rating && rating < min) { card.style.display = 'none'; hideEmptySections(root); return; }
        card.style.display = '';
        if (!ok) { hideEmptySections(root); return; }
        if (res[0].photos && res[0].photos.length) {
          var im = card.querySelector('.im');
          if (im) { im.style.backgroundImage = 'url(' + res[0].photos[0].getUrl({ maxWidth: 400 }) + ')'; im.textContent = ''; }
        }
        var rt = card.querySelector('.rt');
        if (rt) rt.innerHTML = '★ ' + rating.toFixed(1) + (res[0].user_ratings_total ? ' <span>(' + res[0].user_ratings_total.toLocaleString() + ')</span>' : '');
        hideEmptySections(root);
      });
    });
  }

  // 中身が全部消えたセクションは見出しごと隠す
  function hideEmptySections(root){
    root.querySelectorAll('.wrp-scroll').forEach(function(sc){
      var vis = [].filter.call(sc.querySelectorAll('.wpc'), function(c){ return c.style.display !== 'none'; }).length;
      var sec = sc.closest('.wrp-sec');
      if (sec) sec.style.display = vis ? '' : 'none';
    });
  }

  // Googleマップのルートを組み立てる（追加スポットも経由地に含める）
  function buildRouteUrl(r){
    var names = (r.spots || []).map(function(s){ return String(s.name).replace(/[（(].*$/, '').trim(); });
    var extras = addedList(r.id).map(function(p){ return p.name + ' ' + (p.loc || ''); });
    var all = names.concat(extras);
    if (!all.length) return null;
    if (all.length === 1) return gmap(all[0]);
    var mode = r.transport === '徒歩' ? 'walking' : 'driving';
    var u = 'https://www.google.com/maps/dir/?api=1'
          + '&origin=' + encodeURIComponent(all[0])
          + '&destination=' + encodeURIComponent(all[all.length - 1])
          + '&travelmode=' + mode;
    var way = all.slice(1, -1);
    if (way.length) u += '&waypoints=' + way.slice(0, 9).map(encodeURIComponent).join('%7C');
    return u;
  }

  // 神社カード → 既存の神社詳細ページを開く
  function openSpotDetail(s){
    var t = null;
    try {
      if (typeof SHRINES !== 'undefined') {
        t = SHRINES.filter(function(x){ return x.name === s.name; })[0]
         || SHRINES.filter(function(x){ return s.name.indexOf(x.name) >= 0 || x.name.indexOf(s.name) >= 0; })[0];
      }
    } catch(e){}
    if (!t) {
      t = { rank: 0, name: s.name, deity: s.deity || '—', addr: s.addr || '',
            map: gmap(s.name), area: '', rating: 0, rev: 0, visited: false,
            tags: ['goshuin'], lat: s.lat || null, lng: s.lng || null };
    }
    closePage();
    if (typeof openShrineDetail === 'function') openShrineDetail(t);
  }

  function render(r){
    var x = EXTRA[r.id] || {};
    var totalMove = String(r.totalMove || '').replace(/^総移動時間\s*/, '') || r.time || '';
    var sub = String(r.cardDesc || '').replace(/<br\s*\/?>/g, ' ');
    var area = x.area || (r.spots && r.spots[0] ? r.spots[0].name : r.name);

    var hero = (r.spots && r.spots[0] && r.spots[0].photo) ? r.spots[0].photo : r.cardImg;

    var h = '';
    // ① ヒーロー（1社目の実写を使う）
    h += '<div class="wrp-hero" style="background-image:url(\'' + esc(hero) + '\')">'
       +   '<div class="wrp-top"><div class="wrp-ic" id="wrpBack">‹</div></div>'
       +   '<div class="wrp-hcap"><span class="wrp-label">おすすめ巡礼ルート</span>'
       +     '<div class="wrp-title">' + esc(r.name) + '</div>'
       +     '<div class="wrp-sub">' + esc(sub) + '</div></div>'
       + '</div>';

    h += '<div class="wrp-body">';

    // ② 総移動時間の目安
    h += '<div class="wrp-time"><span style="font-size:16px">🕐</span>'
       +   '<span class="lb">総移動時間の目安</span>'
       +   '<span class="vl">' + esc(totalMove) + '</span>'
       +   '<span style="font-size:16px">' + transIcon(r.transport) + '</span></div>';

    // ③ このルートについて
    h += '<div class="wrp-sec"><div class="wrp-eyebrow">このルートについて</div>'
       +   '<div class="wrp-h2">' + (x.lead || esc(r.name)) + '</div>';
    String(r.desc || '').split('。').filter(function(t){ return t.trim(); }).forEach(function(t, i, a){
      h += '<div class="wrp-p">' + esc(t.trim()) + (i === a.length - 1 && !/[。！？]$/.test(t) ? '。' : '。') + '</div>';
    });
    h += '</div>';

    // ④ こんな人におすすめ
    if (x.whoFor && x.whoFor.length) {
      h += '<div class="wrp-sec"><div class="wrp-who"><div class="wrp-h3" style="margin-bottom:14px"><span class="em">⛩</span>こんな人におすすめ</div>';
      x.whoFor.forEach(function(w){ h += '<div class="it"><span class="wrp-ck">✓</span><span>' + esc(w) + '</span></div>'; });
      h += '</div></div>';
    }

    // ⑤ めぐる神社
    h += '<div class="wrp-sec"><div class="wrp-h3" style="color:' + C.main + ';border-bottom:1px solid #E4DCF2;padding-bottom:8px">めぐる神社</div>';
    (r.spots || []).forEach(function(s, i){ h += spotCard(s, i); });
    h += '</div>';

    // ⑥ 知っておきたい豆知識
    if (x.trivia) {
      h += '<div class="wrp-sec"><div class="wrp-tri"><div class="tt"><span>💡</span>知っておきたい豆知識</div>'
         +   '<div class="tx">' + esc(x.trivia) + '</div></div></div>';
    }

    // ⑦⑧ 周辺スポット・宿泊施設
    h += scrollSec('📍', 'この近くのおすすめスポット', x.eats || [], 4);
    h += scrollSec('🛏', 'この近くのおすすめ宿泊施設', x.stays || [], 4);

    // ⑨ ページ最下部：このルートを作成
    h += '<div class="wrp-sec"><div class="wrp-added" id="wrpAdded"></div>'
       +   '<button class="wrp-cta2" id="wrpSelect">このルートを作成 →</button></div>';

    h += '<div class="wrp-note">※ 掲載している店舗・宿泊施設はすべて実在の施設です。Google の評価が★4.0以上のスポットのみ表示しています。営業時間・定休日・料金は変わることがあるため、お出かけ前に公式情報をご確認ください。</div>';
    h += '</div>';

    document.getElementById('wrpIn').innerHTML = h;

    var inEl = document.getElementById('wrpIn');
    document.getElementById('wrpBack').onclick = closePage;

    // 神社カード → 神社詳細ページ
    inEl.querySelectorAll('.wrp-spot').forEach(function(el){
      el.onclick = function(){ openSpotDetail((r.spots || [])[+el.getAttribute('data-spot')]); };
    });

    // 追加済みスポットの表示更新
    function paintAdded(){
      var a = addedList(r.id);
      var box = document.getElementById('wrpAdded');
      if (box) {
        box.innerHTML = a.length
          ? '<div class="tt">ルートに追加したスポット</div>' + a.map(function(p){ return '<span class="chip">' + esc(p.name) + '</span>'; }).join('')
          : '';
      }
      inEl.querySelectorAll('.wpc').forEach(function(c){
        var on = isAdded(r.id, c.getAttribute('data-name'));
        var b = c.querySelector('.wpc-add');
        if (b) { b.textContent = on ? '✓ 追加済み' : '＋ ルートに追加'; b.className = 'wpc-add' + (on ? ' on' : ''); }
      });
    }

    // スポットカード：本体タップでGoogleマップ、ボタンでルートに追加
    inEl.querySelectorAll('.wpc').forEach(function(c){
      c.querySelectorAll('[data-gmap]').forEach(function(t){
        t.onclick = function(){ window.open(gmap(t.getAttribute('data-gmap')), '_blank', 'noopener'); };
      });
      var btn = c.querySelector('.wpc-add');
      if (btn) btn.onclick = function(ev){
        ev.stopPropagation();
        var on = toggleAdd(r.id, { name: c.getAttribute('data-name'), loc: c.getAttribute('data-loc') });
        paintAdded();
        if (typeof showToast === 'function') showToast(on ? 'ルートに追加しました' : 'ルートから外しました');
      };
    });

    // ページ最下部：このルートを作成 → Googleマップで表示
    document.getElementById('wrpSelect').onclick = function(){
      var u = buildRouteUrl(r);
      if (u) window.open(u, '_blank', 'noopener');
      else if (typeof showToast === 'function') showToast('ルートを組み立てられませんでした');
    };

    paintAdded();
    fillPlacePhotos(inEl, r.id);
    setTimeout(function(){ fillPlacePhotos(inEl, r.id); paintAdded(); }, 1500);
  }

  function closePage(){
    pg.style.display = 'none';
    if (typeof updateFabVisibility === 'function') updateFabVisibility();
  }

  // ── ルートカードのタップ先を「1記事1ルート」に差し替え ──────
  window.wabiOpenRoute = function(rid){
    var routes = window.AI_ROUTES || [];
    var r = null;
    for (var i = 0; i < routes.length; i++) if (routes[i].id === rid) r = routes[i];
    if (!r) { if (typeof showToast === 'function') showToast('ルート情報を取得できませんでした'); return; }
    render(r);
    pg.style.display = 'block';
    pg.scrollTop = 0;
    var fab = document.getElementById('fabMap');
    if (fab) fab.style.display = 'none';
  };
})();


/* ══════════════════════════════════════════════════════════════
   わびなび：巡礼レベル ＆ EXPシステム
   ・レベル計算／EXP付与関数／履歴／管理用のEXP値変更に対応
   ・データはすべて localStorage。将来Supabaseへ移すときは
     store()/persist() の2か所を差し替えれば済む構造にしてある。
   （2026-07-27 追加 / index.html は触らず concierge.js から上書き）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.WabiExp) return;

  var C = { purple:'#6E4BA8', gold:'#C9A24A', text:'#2D2D2D', mute:'#7A7A7A', bg:'#F8F6F2', card:'#FFF' };

  // ── ① レベル計算 ───────────────────────────────────────────
  // 指定のアンカーを必ず通る、なめらかな右肩上がりカーブ
  // 必要EXP（累計） = A * exp(b*u + c*u^2)  ／ u = ln(L-1)
  // 指定のめやす（Lv2:100, Lv3:250, Lv5:700, Lv10:2500, Lv20:9000,
  // Lv30:20000, Lv50:60000, Lv100:250000）に最小二乗で合わせた、なめらかな曲線。
  // 1レベルごとの必要EXPが常に増えていく（途中で軽くならない）。
  var LV_A = 4.614750, LV_B = 1.237153, LV_C = 0.101172;
  var MAXLV = 100;

  function totalForLevel(L){
    if (L <= 1) return 0;
    if (L > MAXLV) L = MAXLV;
    var u = Math.log(L - 1);
    return Math.round(Math.exp(LV_A + LV_B * u + LV_C * u * u) / 10) * 10;
  }
  function levelOf(exp){
    var L = 1;
    for (var i = 2; i <= MAXLV; i++){ if (exp >= totalForLevel(i)) L = i; else break; }
    return L;
  }
  function progressOf(exp){
    var L = levelOf(exp);
    if (L >= MAXLV) return { level: MAXLV, cur: 0, need: 0, toNext: 0, pct: 100, total: exp };
    var base = totalForLevel(L), next = totalForLevel(L + 1);
    return {
      level: L, cur: exp - base, need: next - base, toNext: next - exp,
      pct: Math.max(0, Math.min(100, Math.round((exp - base) / (next - base) * 100))),
      total: exp
    };
  }

  // ── ② EXP取得ルール（管理側から値を変更できる） ─────────────
  var GROUPS = {
    daily:     '毎日・閲覧',
    post:      '投稿',
    visit:     '神社巡り',
    community: 'コミュニティ',
    affiliate: '予約・お買い物',
    invite:    '友達紹介'
  };
  var DEFAULT_RULES = {
    login:            { exp:5,    label:'ログイン',                 group:'daily',     icon:'⛩',  limit:1  },
    view_top:         { exp:2,    label:'トップページ閲覧',           group:'daily',     icon:'🏠', limit:1  },
    ai_route:         { exp:15,   label:'AIルート検索',              group:'daily',     icon:'✦',  limit:3  },
    read_article:     { exp:5,    label:'記事を読む',                group:'daily',     icon:'📖', limit:5  },
    read_article_end: { exp:5,    label:'記事を最後まで読む',          group:'daily',     icon:'📗', limit:5  },
    view_spot:        { exp:3,    label:'おすすめスポットを見る',      group:'daily',     icon:'📍', limit:10 },
    view_shrine:      { exp:3,    label:'神社詳細を見る',             group:'daily',     icon:'⛩',  limit:10 },
    bookmark:         { exp:8,    label:'お気に入りに保存',            group:'daily',     icon:'★'            },
    save_route:       { exp:15,   label:'ルート保存',                group:'daily',     icon:'🗺'           },
    post_photo:       { exp:50,   label:'神社仏閣の写真投稿',          group:'post',      icon:'📷'           },
    post_goshuin:     { exp:80,   label:'御朱印の写真投稿',            group:'post',      icon:'🖌'           },
    got_like:         { exp:3,    label:'投稿にいいねされる',          group:'post',      icon:'♡'            },
    got_comment:      { exp:5,    label:'コメントされる',             group:'post',      icon:'💬'           },
    do_comment:       { exp:5,    label:'自分がコメントする',          group:'post',      icon:'✎'            },
    post_popular:     { exp:100,  label:'投稿が人気になる（100いいね）', group:'post',    icon:'🔥'           },
    visit_record:     { exp:80,   label:'参拝記録を追加',             group:'visit',     icon:'🙏'           },
    goshuin_record:   { exp:100,  label:'御朱印を登録',               group:'visit',     icon:'📕'           },
    route_complete:   { exp:150,  label:'AIルートで巡拝完了',          group:'visit',     icon:'🏁'           },
    new_pref:         { exp:100,  label:'初めての都道府県を訪れる',     group:'visit',     icon:'🗾'           },
    all_pref:         { exp:3000, label:'全国都道府県 巡礼コンプリート', group:'visit',    icon:'👑'           },
    follow:           { exp:10,   label:'ユーザーをフォロー',          group:'community', icon:'＋', limit:10 },
    gain_follower:    { exp:15,   label:'フォロワー獲得',             group:'community', icon:'👥'           },
    profile_100:      { exp:100,  label:'プロフィール設定100%',        group:'community', icon:'✓', once:true },
    buy_rakuten:      { exp:20,   label:'楽天で商品購入',             group:'affiliate', icon:'🛍', note:'成果確定後' },
    book_rakuten:     { exp:80,   label:'楽天トラベルで予約',          group:'affiliate', icon:'♨️', note:'成果確定後' },
    book_tour:        { exp:120,  label:'ツアー予約',                group:'affiliate', icon:'🚌', note:'成果確定後' },
    referral_buy:     { exp:30,   label:'紹介リンクから購入',          group:'affiliate', icon:'🔗', note:'成果確定後' },
    invite_sender:    { exp:300,  label:'友達を紹介した',             group:'invite',    icon:'🎁', note:'紹介成立時' },
    invite_receiver:  { exp:100,  label:'紹介されて登録した',          group:'invite',    icon:'🎉', note:'紹介成立時' }
  };

  // ── ③ 保存（将来Supabaseに差し替える場所はここだけ）─────────
  var LS_STATE = 'wabiExpState';
  var LS_RULES = 'wabiExpRules';   // 管理画面からの上書き値

  function store(){
    try {
      var o = JSON.parse(localStorage.getItem(LS_STATE) || '{}');
      if (!o || typeof o !== 'object') o = {};
      o.total   = o.total   || 0;
      o.history = o.history || [];
      o.daily   = o.daily   || {};
      o.once    = o.once    || {};
      o.invites = o.invites || 0;
      return o;
    } catch(e){ return { total:0, history:[], daily:{}, once:{}, invites:0 }; }
  }
  function persist(o){ try { localStorage.setItem(LS_STATE, JSON.stringify(o)); } catch(e){} }

  function rules(){
    var r = {}, k;
    for (k in DEFAULT_RULES) r[k] = JSON.parse(JSON.stringify(DEFAULT_RULES[k]));
    try {
      var ov = JSON.parse(localStorage.getItem(LS_RULES) || '{}');
      for (k in ov){
        if (!r[k]) r[k] = { label:k, group:'daily', icon:'✦' };
        if (typeof ov[k] === 'number') r[k].exp = ov[k];
        else for (var f in ov[k]) r[k][f] = ov[k][f];
      }
    } catch(e){}
    return r;
  }
  function today(){
    var d = new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  // ── ④ EXP付与（すべてここを通す）─────────────────────────
  function addExp(key, opts){
    opts = opts || {};
    var R = rules(), rule = R[key];
    if (!rule) return null;
    var st = store(), day = today();

    if (rule.once && st.once[key]) return null;
    if (rule.limit){
      st.daily[day] = st.daily[day] || {};
      if ((st.daily[day][key] || 0) >= rule.limit) return null;
      st.daily[day][key] = (st.daily[day][key] || 0) + 1;
      // 古い日付は7日分だけ残す
      var days = Object.keys(st.daily).sort();
      while (days.length > 7) { delete st.daily[days.shift()]; }
    }
    if (rule.once) st.once[key] = 1;

    var gained = (typeof opts.exp === 'number') ? opts.exp : rule.exp;
    var before = progressOf(st.total);
    st.total += gained;
    var after = progressOf(st.total);

    st.history.unshift({ t: Date.now(), k: key, e: gained, l: rule.label, i: rule.icon || '✦' });
    if (st.history.length > 200) st.history.length = 200;
    persist(st);

    if (opts.silent !== true && typeof showToast === 'function') showToast('＋' + gained + ' EXP　' + rule.label);
    if (after.level > before.level && typeof showToast === 'function'){
      setTimeout(function(){ showToast('🎉 巡礼レベル ' + after.level + ' になりました'); }, 1200);
    }
    refreshMypageExp();
    return { gained: gained, total: st.total, level: after.level, levelUp: after.level > before.level };
  }

  // ── 公開API ───────────────────────────────────────────────
  window.WabiExp = {
    add: addExp,
    total: function(){ return store().total; },
    level: function(){ return levelOf(store().total); },
    progress: function(){ return progressOf(store().total); },
    history: function(n){ return store().history.slice(0, n || 50); },
    rules: rules,
    groups: GROUPS,
    totalForLevel: totalForLevel,
    // 管理画面用：EXP値の変更／新しいイベントの追加
    setExp: function(key, exp){
      var ov = {}; try { ov = JSON.parse(localStorage.getItem(LS_RULES) || '{}'); } catch(e){}
      ov[key] = ov[key] || {}; ov[key].exp = exp;
      localStorage.setItem(LS_RULES, JSON.stringify(ov)); return rules()[key];
    },
    addRule: function(key, def){
      var ov = {}; try { ov = JSON.parse(localStorage.getItem(LS_RULES) || '{}'); } catch(e){}
      ov[key] = def; localStorage.setItem(LS_RULES, JSON.stringify(ov)); return rules()[key];
    },
    invites: function(){ return store().invites; },
    addInvite: function(){ var st = store(); st.invites++; persist(st); addExp('invite_sender'); return st.invites; },
    reset: function(){ localStorage.removeItem(LS_STATE); refreshMypageExp(); }
  };

  // ── ⑤ 自動付与（既存の機能にひっかける）────────────────────
  function hookFn(name, key){
    var orig = window[name];
    if (typeof orig !== 'function') return;
    window[name] = function(){
      var r = orig.apply(this, arguments);
      try { addExp(key, { silent:true }); } catch(e){}
      return r;
    };
  }
  setTimeout(function(){
    addExp('login',    { silent:true });
    addExp('view_top', { silent:true });
    hookFn('openShrineDetail', 'view_shrine');
    hookFn('generateRoute',    'ai_route');
    hookFn('saveRoute',        'save_route');
    hookFn('saveVisit',        'visit_record');
    hookFn('sdVisited',        'visit_record');
    // お気に入り登録（登録時のみ）
    var _bm = window.sdBookmark;
    if (typeof _bm === 'function'){
      window.sdBookmark = function(){
        var beforeN = 0;
        try { beforeN = JSON.parse(localStorage.getItem('wabiFavorites') || '[]').length; } catch(e){}
        var r = _bm.apply(this, arguments);
        try {
          var afterN = JSON.parse(localStorage.getItem('wabiFavorites') || '[]').length;
          if (afterN > beforeN) addExp('bookmark', { silent:true });
        } catch(e){}
        return r;
      };
    }
    // おすすめスポットのタップ
    document.addEventListener('click', function(ev){
      var t = ev.target;
      while (t && t !== document.body){
        if (t.classList && t.classList.contains('wpc')) { addExp('view_spot', { silent:true }); return; }
        t = t.parentElement;
      }
    }, true);
    // このルートを作成
    document.addEventListener('click', function(ev){
      if (ev.target && ev.target.id === 'wrpSelect') addExp('save_route', { silent:true });
    }, true);
  }, 1500);

  // 「PILGRIM LEVEL」の表記を「巡礼レベル」に
  function fixLevelLabel(){
    document.querySelectorAll('div,span,p').forEach(function(el){
      if (el.children.length === 0 && /PILGRIM LEVEL/.test(el.textContent)){
        el.textContent = el.textContent.replace('PILGRIM LEVEL', '巡礼レベル');
        el.style.letterSpacing = '.12em';
      }
    });
  }
  setTimeout(fixLevelLabel, 1200);
  setTimeout(fixLevelLabel, 3000);

  // ── ⑥ 画面まわり ──────────────────────────────────────────
  var css = document.createElement('style');
  css.textContent = [
    // マイページのレベル欄
    '.mp-exp-head{font-family:\'Shippori Mincho\',serif;font-size:13px;font-weight:700;color:' + C.text + ';letter-spacing:.12em;margin-bottom:9px;}',
    '.mp-exp-links{display:flex;gap:10px;margin-top:12px;}',
    '.mp-exp-links a{flex:1;text-align:center;padding:10px 6px;border-radius:14px;border:1px solid #e6dcc6;background:#fff;',
      'font-family:\'Noto Serif JP\',serif;font-size:12px;font-weight:700;color:' + C.purple + ';cursor:pointer;text-decoration:none;}',
    '.mp-exp-links a.gold{border-color:' + C.gold + ';color:#8a6d3b;background:#fffdf7;}',
    // 共通ページ
    '.wx-pg{position:fixed;inset:0;z-index:320;background:' + C.bg + ';display:none;overflow-y:auto;-webkit-overflow-scrolling:touch;',
      'font-family:\'Shippori Mincho\',\'Noto Serif JP\',serif;color:' + C.text + ';}',
    '.wx-hd{position:sticky;top:0;z-index:5;background:' + C.bg + ';display:flex;align-items:center;gap:10px;padding:16px;border-bottom:1px solid #ece4d3;}',
    '.wx-hd .b{font-size:22px;cursor:pointer;line-height:1;color:' + C.text + ';}',
    '.wx-hd .t{font-size:15px;font-weight:800;letter-spacing:.1em;}',
    '.wx-in{max-width:500px;margin:0 auto;padding:18px 16px 48px;}',
    '.wx-sec{margin-bottom:26px;}',
    '.wx-h{font-size:16px;font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:7px;}',
    '.wx-p{font-size:13.5px;line-height:1.85;color:#4a4a4a;font-family:\'Noto Serif JP\',serif;}',
    '.wx-card{background:' + C.card + ';border-radius:20px;box-shadow:0 8px 24px rgba(0,0,0,.06);padding:18px;}',
    // レベルカード
    '.wx-lvcard{background:linear-gradient(135deg,#fff,#fbf7ef);border:1px solid #ece4d3;border-radius:20px;padding:18px;box-shadow:0 8px 24px rgba(0,0,0,.06);}',
    '.wx-lvtop{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:9px;}',
    '.wx-lv{font-size:22px;font-weight:700;color:' + C.purple + ';}',
    '.wx-next{font-size:12px;color:' + C.mute + ';font-family:\'Noto Serif JP\',serif;}',
    '.wx-next b{color:' + C.gold + ';}',
    '.wx-bar{height:8px;border-radius:6px;background:#e9e2d7;overflow:hidden;}',
    '.wx-fill{height:100%;border-radius:6px;background:linear-gradient(90deg,' + C.purple + ',' + C.gold + ');width:0;transition:width 1.1s cubic-bezier(.22,.61,.36,1);}',
    '.wx-tot{font-size:11.5px;color:' + C.mute + ';margin-top:8px;font-family:\'Noto Serif JP\',serif;}',
    // EXP一覧カード
    '.wx-gname{font-size:12px;font-weight:700;color:' + C.purple + ';letter-spacing:.08em;margin:16px 0 9px;}',
    '.wx-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;}',
    '.wx-item{background:' + C.card + ';border-radius:16px;box-shadow:0 4px 14px rgba(0,0,0,.05);padding:12px 12px 11px;}',
    '.wx-item .ic{font-size:17px;}',
    '.wx-item .lb{font-size:12px;font-weight:600;line-height:1.45;margin:5px 0 4px;font-family:\'Noto Serif JP\',serif;}',
    '.wx-item .ex{font-size:14px;font-weight:700;color:' + C.gold + ';}',
    '.wx-item .nt{font-size:10px;color:#a09a90;margin-top:3px;font-family:\'Noto Serif JP\',serif;}',
    // 履歴
    '.wx-hrow{display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1px solid #f0ebe1;}',
    '.wx-hrow:last-child{border-bottom:none;}',
    '.wx-hrow .ic{width:30px;height:30px;border-radius:50%;background:#f4efe4;display:flex;align-items:center;justify-content:center;font-size:14px;flex:0 0 30px;}',
    '.wx-hrow .lb{flex:1;font-size:13px;font-family:\'Noto Serif JP\',serif;}',
    '.wx-hrow .ex{font-size:13px;font-weight:700;color:' + C.gold + ';}',
    '.wx-day{font-size:11.5px;color:' + C.mute + ';font-weight:700;margin:14px 0 4px;font-family:\'Noto Serif JP\',serif;}',
    '.wx-empty{font-size:12.5px;color:#a8a29a;text-align:center;padding:18px 0;font-family:\'Noto Serif JP\',serif;}',
    // 紹介ページ（2026-07-27 リデザイン）
    "#wxInvite{background:#F8F6F2;}",
    "#wxInvite .wx-hd{justify-content:flex-start;position:relative;border-bottom:none;padding:18px 24px 6px;}",
    "#wxInvite .wx-hd .t{position:absolute;left:0;right:0;text-align:center;font-size:20px;font-weight:700;color:#222;letter-spacing:.06em;pointer-events:none;}",
    "#wxInvite .wx-hd .b{position:relative;z-index:2;color:#222;}",
    "#wxInvite .wx-in{padding:10px 24px 56px;}",
    "#wxInvite .iv-sec{margin-top:32px;}",
    "#wxInvite .iv-lbl{font-size:13px;font-weight:700;color:#222;letter-spacing:.06em;margin-bottom:12px;}",
    "#wxInvite .iv-card{background:#fff;border-radius:24px;box-shadow:0 10px 30px rgba(0,0,0,.08);padding:36px 24px 30px;text-align:center;",
      "opacity:0;transform:translateY(10px);animation:ivIn .5s cubic-bezier(.22,.61,.36,1) forwards;}",
    "@keyframes ivIn{to{opacity:1;transform:none;}}",
    "#wxInvite .iv-d1{animation-delay:.05s;} #wxInvite .iv-d2{animation-delay:.14s;} #wxInvite .iv-d3{animation-delay:.22s;}",
    "#wxInvite .iv-h{font-size:18px;font-weight:700;color:#222;letter-spacing:.04em;}",
    "#wxInvite .iv-exp{font-size:54px;font-weight:800;color:#7B58C6;line-height:1.15;margin:14px 0 2px;letter-spacing:-.01em;}",
    "#wxInvite .iv-exp small{font-size:22px;font-weight:700;margin-left:4px;}",
    "#wxInvite .iv-cap{font-size:13.5px;color:#666;font-family:'Noto Serif JP',serif;}",
    "#wxInvite .iv-line{height:1px;background:#EFEAE0;margin:26px 8px 22px;}",
    "#wxInvite .iv-sub{font-size:13.5px;color:#666;font-family:'Noto Serif JP',serif;}",
    "#wxInvite .iv-exp2{font-size:38px;font-weight:800;color:#C8A04D;line-height:1.2;margin:6px 0 12px;}",
    "#wxInvite .iv-exp2 small{font-size:17px;font-weight:700;margin-left:3px;}",
    "#wxInvite .iv-note{font-size:12.5px;color:#666;line-height:1.8;font-family:'Noto Serif JP',serif;}",
    "#wxInvite .iv-linebtn{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;height:56px;border:none;",
      "border-radius:16px;background:#06C755;color:#fff;font-family:'Shippori Mincho',serif;font-size:16px;font-weight:700;",
      "letter-spacing:.04em;cursor:pointer;box-shadow:0 8px 22px rgba(6,199,85,.26);transition:transform .12s;}",
    "#wxInvite .iv-linebtn:active{transform:scale(.95);}",
    "#wxInvite .iv-linebtn svg{width:24px;height:24px;}",
    "#wxInvite .iv-or{display:flex;align-items:center;gap:14px;margin:26px 0 0;color:#9a948a;font-size:12px;letter-spacing:.1em;}",
    "#wxInvite .iv-or::before,#wxInvite .iv-or::after{content:'';flex:1;height:1px;background:#E7E1D6;}",
    "#wxInvite .iv-urlrow{display:flex;gap:10px;align-items:stretch;}",
    "#wxInvite .iv-url{flex:1;min-width:0;height:48px;padding:0 14px;border:1px solid #E7E1D6;border-radius:14px;background:#fff;",
      "font-family:'Noto Serif JP',serif;font-size:12.5px;color:#444;box-sizing:border-box;}",
    "#wxInvite .iv-copy{flex:0 0 auto;height:48px;padding:0 18px;border:1px solid #7B58C6;border-radius:14px;background:#fff;",
      "color:#7B58C6;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;transition:transform .12s;}",
    "#wxInvite .iv-copy:active{transform:scale(.95);}",
    "#wxInvite .iv-qr{background:#fff;border-radius:24px;box-shadow:0 10px 30px rgba(0,0,0,.08);padding:28px 24px 22px;text-align:center;}",
    "#wxInvite .iv-qr img{width:190px;height:190px;display:block;margin:0 auto 16px;}",
    "#wxInvite .iv-steps{background:#fff;border-radius:24px;box-shadow:0 10px 30px rgba(0,0,0,.08);padding:22px 24px;}",
    "#wxInvite .iv-step{display:flex;align-items:center;gap:13px;padding:11px 0;}",
    "#wxInvite .iv-step + .iv-step{border-top:1px solid #F2EEE5;}",
    "#wxInvite .iv-no{flex:0 0 24px;width:24px;height:24px;border-radius:50%;background:#F1ECFA;color:#7B58C6;",
      "font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;}",
    "#wxInvite .iv-step span{font-size:14px;color:#222;font-family:'Noto Serif JP',serif;}",
    "#wxInvite .iv-done{font-size:12.5px;color:#666;text-align:center;margin-top:14px;font-family:'Noto Serif JP',serif;}",
    "#wxInvite .iv-fine{font-size:11px;color:#9a948a;text-align:center;margin-top:24px;line-height:1.7;font-family:'Noto Serif JP',serif;}",
    "#wxInvite .iv-kpi{display:grid;grid-template-columns:1fr 1fr;gap:12px;}",
    "#wxInvite .iv-kpi > div{background:#fff;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,.08);padding:18px;text-align:center;}",
    "#wxInvite .iv-kpi .l{font-size:12px;color:#666;font-family:'Noto Serif JP',serif;}",
    "#wxInvite .iv-kpi .v{font-size:26px;font-weight:800;color:#7B58C6;margin-top:5px;}",
    '.wx-note{font-size:11px;color:#a09a90;line-height:1.7;margin-top:12px;font-family:\'Noto Serif JP\',serif;}'
  ].join('');
  document.head.appendChild(css);

  function mkPage(id, title){
    var el = document.createElement('div');
    el.className = 'wx-pg'; el.id = id;
    el.innerHTML = '<div class="wx-hd"><span class="b">‹</span><span class="t">' + title + '</span></div><div class="wx-in"></div>';
    document.body.appendChild(el);
    el.querySelector('.b').onclick = function(){ el.style.display = 'none'; };
    return el;
  }
  var guidePg  = mkPage('wxGuide',  'EXPについて');
  var invitePg = mkPage('wxInvite', '友達を紹介');

  function esc2(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  // ── EXPガイドページ ───────────────────────────────────────
  function renderGuide(){
    var pr = progressOf(store().total), R = rules(), st = store();
    var h = '';

    h += '<div class="wx-sec"><div class="wx-lvcard">'
       +   '<div class="wx-lvtop"><span class="wx-lv">LV.' + pr.level + '</span>'
       +     '<span class="wx-next">' + (pr.level >= MAXLV ? '最高位に到達しました' : 'あと <b>' + pr.toNext + '</b> EXP で Lv.' + (pr.level + 1)) + '</span></div>'
       +   '<div class="wx-bar"><div class="wx-fill" id="wxFill"></div></div>'
       +   '<div class="wx-tot">累計 ' + pr.total.toLocaleString() + ' EXP　／　次のレベルまで ' + pr.need.toLocaleString() + ' EXP</div>'
       + '</div></div>';

    h += '<div class="wx-sec"><div class="wx-h">巡礼レベルとは？</div><div class="wx-card"><div class="wx-p">'
       +   '神社やお寺を巡ったり、参拝の記録や御朱印を投稿したりすると経験値（EXP）が貯まります。<br>'
       +   'EXPが一定に達すると巡礼レベルが上がります。急ぐものではありません。'
       +   'ご自身の歩みが少しずつ形になっていく——そんな道しるべとしてお使いください。'
       + '</div></div></div>';

    h += '<div class="wx-sec"><div class="wx-h">EXPの獲得方法</div>';
    for (var g in GROUPS){
      var items = [];
      for (var k in R) if (R[k].group === g) items.push(R[k]);
      if (!items.length) continue;
      h += '<div class="wx-gname">' + GROUPS[g] + '</div><div class="wx-grid">';
      items.forEach(function(it){
        h += '<div class="wx-item"><div class="ic">' + (it.icon || '✦') + '</div>'
           +   '<div class="lb">' + esc2(it.label) + '</div>'
           +   '<div class="ex">＋' + it.exp + ' EXP</div>'
           +   (it.note ? '<div class="nt">' + esc2(it.note) + '</div>'
                        : (it.limit ? '<div class="nt">1日' + it.limit + '回まで</div>'
                                    : (it.once ? '<div class="nt">初回のみ</div>' : '')))
           + '</div>';
      });
      h += '</div>';
    }
    h += '</div>';

    h += '<div class="wx-sec"><div class="wx-h">レベルが上がると？</div><div class="wx-card"><div class="wx-p">'
       +   '現在準備中です。<br>'
       +   'レベルが高い巡拝者には、今後 限定イベントや限定御朱印、特別企画など'
       +   'さまざまな特典をご用意する予定です。<br>ぜひ今のうちから経験値を集めてください。'
       + '</div></div></div>';

    // EXP履歴
    h += '<div class="wx-sec"><div class="wx-h">EXP履歴</div><div class="wx-card" style="padding:6px 16px">';
    var hist = st.history.slice(0, 40);
    if (!hist.length){
      h += '<div class="wx-empty">まだEXPの記録がありません</div>';
    } else {
      var lastDay = '';
      hist.forEach(function(x){
        var d = new Date(x.t);
        var key = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
        var lbl = (key === (new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate())) ? '今日' : key;
        if (lbl !== lastDay){ h += '<div class="wx-day">' + lbl + '</div>'; lastDay = lbl; }
        h += '<div class="wx-hrow"><div class="ic">' + (x.i || '✦') + '</div>'
           +   '<div class="lb">' + esc2(x.l || x.k) + '</div>'
           +   '<div class="ex">＋' + x.e + '</div></div>';
      });
    }
    h += '</div></div>';

    guidePg.querySelector('.wx-in').innerHTML = h;
    setTimeout(function(){ var f = document.getElementById('wxFill'); if (f) f.style.width = pr.pct + '%'; }, 120);
  }

  // ── 友達紹介ページ（UIのみ・LINE連携は後日）────────────────
  function inviteUrl(){
    var code = 'WABI' + String(Math.abs(hashCode(navigator.userAgent + '|' + (localStorage.getItem('wabiInviteSeed') || setSeed()))) % 1000000).padStart(6, '0');
    return 'https://wabinavi.jp/?invite=' + code;
  }
  function setSeed(){ var s = String(Date.now()); try { localStorage.setItem('wabiInviteSeed', s); } catch(e){} return s; }
  function hashCode(s){ var h = 0; for (var i = 0; i < s.length; i++){ h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; } return h; }

  var LINE_ICON = '<svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M12 2C6.48 2 2 5.78 2 10.43c0 4.18 3.49 7.69 8.21 8.36.32.07.75.21.86.49.1.25.06.64.03.89l-.14.84c-.04.25-.19.97.85.53 1.04-.44 5.6-3.3 7.64-5.65 1.41-1.55 2.08-3.12 2.08-4.93C21.83 5.78 17.35 2 12 2zM8.31 12.98H6.43c-.22 0-.41-.18-.41-.41V9.04c0-.22.18-.41.41-.41h.16c.22 0 .41.18.41.41v3.12h1.31c.22 0 .41.18.41.41v.16c0 .05-.19.25-.41.25zm1.6-.41c0 .22-.18.41-.41.41h-.16c-.22 0-.41-.18-.41-.41V9.04c0-.22.18-.41.41-.41h.16c.22 0 .41.18.41.41v3.53zm4.05 0c0 .18-.11.33-.28.38-.4.01-.8.02-.13.02-.13 0-.25-.07-.32-.16l-1.61-2.19v1.95c0 .22-.18.41-.41.41h-.16c-.22 0-.41-.18-.41-.41V9.04c0-.18.11-.33.28-.38.04-.1.08-.2.13-.2.13 0 .25.07.32.16l1.61 2.19V9.04c0-.22.18-.41.41-.41h.16c.22 0 .41.18.41.41v3.53zm3.15-2.53c.22 0 .41.18.41.41v.16c0 .22-.18.41-.41.41h-1.31v.84h1.31c.22 0 .41.18.41.41v.16c0 .22-.18.41-.41.41h-1.88c-.22 0-.41-.18-.41-.41V9.04c0-.22.18-.41.41-.41h1.88c.22 0 .41.18.41.41v.16c0 .22-.18.41-.41.41h-1.31v.84h1.31z"/></svg>';

  function renderInvite(){
    var st = store(), url = inviteUrl();
    var R = rules();
    var expMe = (R.invite_sender && R.invite_sender.exp) || 300;
    var expYou = (R.invite_receiver && R.invite_receiver.exp) || 100;
    var earned = st.invites * expMe;

    var h = '';

    // ② 紹介カード
    h += '<div class="iv-card iv-d1">'
       +   '<div class="iv-h">一緒に巡拝を楽しもう</div>'
       +   '<div class="iv-exp">＋' + expMe + '<small>EXP</small></div>'
       +   '<div class="iv-cap">あなたに授与されます</div>'
       +   '<div class="iv-line"></div>'
       +   '<div class="iv-sub">紹介された方にも</div>'
       +   '<div class="iv-exp2">＋' + expYou + '<small>EXP</small></div>'
       +   '<div class="iv-note">紹介された方も、無料会員登録の完了で<br>経験値を獲得できます。</div>'
       + '</div>';

    // ③ LINEボタン
    h += '<div class="iv-sec"><button class="iv-linebtn" id="ivLine">' + LINE_ICON + 'LINEで友達に送る</button>'
       +   '<div class="iv-or">または</div></div>';

    // ④ 紹介URL
    h += '<div class="iv-sec"><div class="iv-lbl">紹介URL</div>'
       +   '<div class="iv-urlrow"><input class="iv-url" id="ivUrl" readonly value="' + esc2(url) + '">'
       +   '<button class="iv-copy" id="ivCopy">コピー</button></div></div>';

    // ⑤ QRコード
    h += '<div class="iv-sec"><div class="iv-lbl">QRコード</div><div class="iv-qr">'
       +   '<img id="ivQr" alt="紹介用QRコード" src="https://api.qrserver.com/v1/create-qr-code/?size=380x380&margin=6&data='
       +     encodeURIComponent(url) + '">'
       +   '<div class="iv-cap" id="ivQrNote">友達に読み取ってもらうだけでOK</div>'
       + '</div></div>';

    // ⑥ 紹介成立条件
    h += '<div class="iv-sec"><div class="iv-lbl">紹介成立の条件</div><div class="iv-steps">'
       +   '<div class="iv-step"><span class="iv-no">1</span><span>お友達がLINEで登録</span></div>'
       +   '<div class="iv-step"><span class="iv-no">2</span><span>無料会員登録が完了</span></div>'
       +   '<div class="iv-step"><span class="iv-no">3</span><span>はじめてログイン</span></div>'
       +   '<div class="iv-done">3つすべて完了すると紹介成立です</div>'
       + '</div></div>';

    // 実績
    h += '<div class="iv-sec"><div class="iv-kpi">'
       +   '<div><div class="l">紹介した人数</div><div class="v">' + st.invites + '<span style="font-size:13px">人</span></div></div>'
       +   '<div><div class="l">紹介で得たEXP</div><div class="v">' + earned + '</div></div>'
       + '</div></div>';

    h += '<div class="iv-fine">※ 紹介成立後に経験値が付与されます。<br>'
       +   'LINEでの会員登録機能は現在準備中です。</div>';

    invitePg.querySelector('.wx-in').innerHTML = h;

    document.getElementById('ivLine').onclick = function(){
      var text = 'わびなびで一緒に神社めぐりしませんか？\n' + url;
      window.open('https://line.me/R/msg/text/?' + encodeURIComponent(text), '_blank', 'noopener');
    };
    document.getElementById('ivCopy').onclick = function(){
      var inp = document.getElementById('ivUrl');
      try { inp.select(); inp.setSelectionRange(0, 99999); document.execCommand('copy'); } catch(e){}
      if (navigator.clipboard) navigator.clipboard.writeText(url).catch(function(){});
      if (typeof showToast === 'function') showToast('コピーしました');
    };
    var qr = document.getElementById('ivQr');
    qr.onerror = function(){
      qr.style.display = 'none';
      document.getElementById('ivQrNote').textContent = 'QRコードを読み込めませんでした。上の紹介URLをお使いください。';
    };
  }

  window.wabiOpenExpGuide = function(){ renderGuide(); guidePg.style.display = 'block'; guidePg.scrollTop = 0; };
  window.wabiOpenInvite   = function(){ renderInvite(); invitePg.style.display = 'block'; invitePg.scrollTop = 0; };

  // ── ⑦ マイページのレベル欄を差し替える ──────────────────────
  function paintMypageExp(){
    var box = document.querySelector('#wcMypage .mp-exp');
    if (!box) return;
    var pr = progressOf(store().total);
    box.innerHTML =
        '<div class="mp-exp-head">巡礼レベル</div>'
      + '<div class="mp-exp-top"><span class="mp-lv">LV.<b>' + pr.level + '</b></span>'
      +   '<span class="mp-exp-next">' + (pr.level >= MAXLV ? '最高位に到達しました'
            : 'あと <b>' + pr.toNext + '</b> EXP で Lv.' + (pr.level + 1)) + '</span></div>'
      + '<div class="mp-exp-bar"><div class="mp-exp-fill" id="mpExpFill"></div></div>'
      + '<div class="mp-exp-links"><a id="wxGuideLink">EXPについて ›</a>'
      +   '<a class="gold" id="wxInviteLink">友達を紹介 ›</a></div>';
    document.getElementById('wxGuideLink').onclick  = function(){ window.wabiOpenExpGuide(); };
    document.getElementById('wxInviteLink').onclick = function(){ window.wabiOpenInvite(); };
    // mypage.js 側があとからバーを書き換えるので、時間差で上書きする
    [0, 250, 700].forEach(function(ms){
      setTimeout(function(){
        var f = document.getElementById('mpExpFill');
        if (f) f.style.width = pr.pct + '%';
      }, ms);
    });
  }
  function refreshMypageExp(){ try { paintMypageExp(); } catch(e){} }

  var _openMp = window.openWabiMypage;
  function bindMypage(){
    if (typeof window.openWabiMypage !== 'function' || window.openWabiMypage.__wx) return;
    var orig = window.openWabiMypage;
    var wrapped = function(){
      var r = orig.apply(this, arguments);
      setTimeout(paintMypageExp, 0);
      setTimeout(paintMypageExp, 200);
      setTimeout(fixLevelLabel, 250);
      return r;
    };
    wrapped.__wx = true;
    window.openWabiMypage = wrapped;
  }
  bindMypage();
  var tries = 0;
  var iv = setInterval(function(){ bindMypage(); if (++tries > 40 || (window.openWabiMypage && window.openWabiMypage.__wx)) clearInterval(iv); }, 300);
})();


/* ══════════════════════════════════════════════════════════════
   わびなび：ヘッダー右上を「ログイン」に変更
   タップすると ログイン ／ 新規登録 を選べるメニューを表示。
   新規登録はLINEで登録する導線（チャネルID登録後に本稼働）。
   （2026-07-27 追加 / index.html は触らず concierge.js から上書き）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiLoginBtn) return;
  window.__wabiLoginBtn = true;

  // ── LINEログインの設定（チャネル発行後にここへ入れる）──────
  // チャネルIDは公開情報（OAuthのclient_id相当）。チャネルシークレットは絶対にここに置かない。
  var LINE_CFG = {
    channelId: '2010884035',                        // LINEログイン チャネルID
    liffId: '2010884035-qTXvJFEi',                   // LIFF ID
    redirectUri: location.origin + location.pathname,
    scope: 'profile openid'
  };
  try {
    LINE_CFG.channelId = localStorage.getItem('wabiLineChannelId') || LINE_CFG.channelId;
    LINE_CFG.liffId    = localStorage.getItem('wabiLiffId') || LINE_CFG.liffId;
  } catch(e){}

  var LS_USER = 'wabiUser';
  function getUser(){
    try { var u = JSON.parse(localStorage.getItem(LS_USER) || 'null'); return (u && u.id) ? u : null; }
    catch(e){ return null; }
  }
  function setUser(u){
    try { u ? localStorage.setItem(LS_USER, JSON.stringify(u)) : localStorage.removeItem(LS_USER); } catch(e){}
    paintButton();
  }

  // LIFF SDK を必要になったときだけ読み込む
  function loadLiff(){
    return new Promise(function(res, rej){
      if (window.liff) { res(window.liff); return; }
      var s = document.createElement('script');
      s.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
      s.onload = function(){ res(window.liff); };
      s.onerror = rej;
      document.head.appendChild(s);
    });
  }

  window.WabiLine = {
    config: LINE_CFG,
    user: getUser,
    setChannelId: function(id){
      LINE_CFG.channelId = id || '';
      try { localStorage.setItem('wabiLineChannelId', LINE_CFG.channelId); } catch(e){}
      return LINE_CFG.channelId;
    },
    setLiffId: function(id){
      LINE_CFG.liffId = id || '';
      try { localStorage.setItem('wabiLiffId', LINE_CFG.liffId); } catch(e){}
      if (typeof showToast === 'function') showToast('LIFF IDを設定しました');
      return LINE_CFG.liffId;
    },
    logout: function(){
      setUser(null);
      try { if (window.liff && liff.isLoggedIn && liff.isLoggedIn()) liff.logout(); } catch(e){}
      if (typeof showToast === 'function') showToast('ログアウトしました');
    },
    // サーバーを用意できたとき用（認証コードを受け取る従来フロー）
    authorizeUrl: function(){
      if (!LINE_CFG.channelId) return null;
      var state = 'wabi' + Date.now();
      try { sessionStorage.setItem('wabiLineState', state); } catch(e){}
      return 'https://access.line.me/oauth2/v2.1/authorize?response_type=code'
        + '&client_id=' + encodeURIComponent(LINE_CFG.channelId)
        + '&redirect_uri=' + encodeURIComponent(LINE_CFG.redirectUri)
        + '&state=' + state
        + '&scope=' + encodeURIComponent(LINE_CFG.scope)
        + '&bot_prompt=aggressive';
    },
    // LIFFでログイン（サーバー不要）
    start: function(){
      if (!LINE_CFG.liffId){
        if (typeof showToast === 'function') showToast('LINE登録は現在準備中です（LIFF ID未設定）');
        return false;
      }
      if (typeof showToast === 'function') showToast('LINEに接続しています…');
      loadLiff().then(function(liff){
        return liff.init({ liffId: LINE_CFG.liffId }).then(function(){
          // redirectUri は指定しない。指定するとクエリ文字列付きURLになり、
          // コールバックURLの完全一致に外れて 400 Bad Request になるため。
          if (!liff.isLoggedIn()) { liff.login(); return null; }
          return liff.getProfile();
        });
      }).then(function(p){
        if (!p) return;
        setUser({ id: p.userId, name: p.displayName || '巡礼者', pic: p.pictureUrl || '' });
        var sp = document.getElementById('wxSignup'); if (sp) sp.style.display = 'none';
        if (typeof showToast === 'function') showToast('ようこそ、' + (p.displayName || '巡礼者') + 'さん');
        if (window.WabiExp) window.WabiExp.add('login', { silent:true });
      }).catch(function(e){
        if (typeof showToast === 'function') showToast('LINEに接続できませんでした');
        console.warn('[WabiLine]', e);
      });
      return true;
    },
    // すでにLINEでログイン済みなら黙って情報を取り直す
    restore: function(){
      if (!LINE_CFG.liffId || getUser()) return;
      loadLiff().then(function(liff){
        return liff.init({ liffId: LINE_CFG.liffId }).then(function(){
          if (!liff.isLoggedIn()) return null;
          return liff.getProfile();
        });
      }).then(function(p){
        if (p) setUser({ id: p.userId, name: p.displayName || '巡礼者', pic: p.pictureUrl || '' });
      }).catch(function(){});
    }
  };

  // ── スタイル ─────────────────────────────────────────────
  var css = document.createElement('style');
  css.textContent = [
    '.wl-wrap{position:relative;display:flex;align-items:center;}',
    ".wl-btn{display:flex;align-items:center;gap:7px;background:#5D3A7A;color:#fff;border:none;border-radius:999px;",
      "padding:10px 18px;font-family:'Shippori Mincho',serif;font-size:14px;font-weight:700;letter-spacing:.06em;",
      "cursor:pointer;white-space:nowrap;transition:opacity .15s;}",
    '.wl-btn:active{opacity:.85;}',
    '.wl-btn svg{width:16px;height:16px;}',
    '.wl-menu{position:absolute;top:calc(100% + 12px);right:0;min-width:190px;background:#fff;border:1px solid #ece4d3;',
      'border-radius:6px;box-shadow:0 10px 30px rgba(0,0,0,.13);display:none;z-index:120;overflow:hidden;}',
    '.wl-menu.on{display:block;}',
    '.wl-menu::before{content:"";position:absolute;top:-8px;right:26px;width:14px;height:14px;background:#fff;',
      'border-left:1px solid #ece4d3;border-top:1px solid #ece4d3;transform:rotate(45deg);}',
    ".wl-menu a{display:block;padding:16px 20px;font-family:'Shippori Mincho',serif;font-size:15px;color:#2a2a2a;",
      'cursor:pointer;text-decoration:none;background:#fff;position:relative;z-index:1;}',
    '.wl-menu a:active{background:#faf7f1;}',
    '.wl-menu .sep{height:1px;background:#ece4d3;margin:0 20px;position:relative;z-index:1;}',
    // 新規登録ページ
    ".wl-pg{position:fixed;inset:0;z-index:330;background:#F8F6F2;display:none;overflow-y:auto;-webkit-overflow-scrolling:touch;font-family:'Shippori Mincho','Noto Serif JP',serif;color:#2D2D2D;}",
    '.wl-hd{position:sticky;top:0;background:#F8F6F2;display:flex;align-items:center;gap:10px;padding:16px;border-bottom:1px solid #ece4d3;}',
    '.wl-hd .b{font-size:22px;cursor:pointer;line-height:1;}',
    '.wl-hd .t{font-size:15px;font-weight:800;letter-spacing:.1em;}',
    '.wl-in{max-width:500px;margin:0 auto;padding:26px 20px 48px;}',
    '.wl-lead{font-size:20px;font-weight:700;line-height:1.5;margin-bottom:10px;}',
    ".wl-sub{font-size:13px;line-height:1.85;color:#6F6F6F;font-family:'Noto Serif JP',serif;margin-bottom:26px;}",
    '.wl-line{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;padding:17px;border:none;border-radius:16px;',
      'background:#06C755;color:#fff;font-family:inherit;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 8px 22px rgba(6,199,85,.28);}',
    '.wl-mail{display:block;width:100%;margin-top:12px;padding:16px;border:1px solid #e6dcc6;border-radius:16px;background:#fff;',
      'font-family:inherit;font-size:14px;font-weight:700;color:#6E4BA8;cursor:pointer;text-align:center;}',
    '.wl-benefit{background:#fff;border-radius:20px;box-shadow:0 8px 24px rgba(0,0,0,.06);padding:20px;margin-top:26px;}',
    '.wl-benefit .h{font-size:14px;font-weight:700;margin-bottom:12px;}',
    ".wl-benefit li{list-style:none;font-size:13.5px;line-height:1.7;color:#4a4a4a;font-family:'Noto Serif JP',serif;",
      'display:flex;gap:9px;margin-top:9px;}',
    '.wl-benefit li span.c{color:#C9A24A;font-weight:700;}',
    ".wl-foot{font-size:11.5px;color:#a09a90;line-height:1.75;margin-top:22px;font-family:'Noto Serif JP',serif;text-align:center;}",
    ".wl-login-link{display:block;text-align:center;margin-top:18px;font-size:13px;color:#6E4BA8;font-weight:700;cursor:pointer;}"
  ].join('');
  document.head.appendChild(css);

  // ── 新規登録ページ ────────────────────────────────────────
  var pg = document.createElement('div');
  pg.className = 'wl-pg'; pg.id = 'wxSignup';
  pg.innerHTML =
      '<div class="wl-hd"><span class="b">‹</span><span class="t">新規登録</span></div>'
    + '<div class="wl-in">'
    +   '<div class="wl-lead">LINEではじめる<br>あなただけの巡礼帳</div>'
    +   '<div class="wl-sub">LINEアカウントで登録すると、参拝の記録・御朱印・巡礼レベルがすべて保存され、'
    +     '機種変更をしても引き継げます。パスワードを覚える必要はありません。</div>'
    +   '<button class="wl-line" id="wlLineBtn"><span style="font-weight:800;letter-spacing:.05em">LINE</span>LINEで新規登録</button>'
    +   '<button class="wl-mail" id="wlMailBtn">メールアドレスで登録する</button>'
    +   '<div class="wl-benefit"><div class="h">会員になると</div><ul>'
    +     '<li><span class="c">◆</span><span>参拝記録・御朱印を<b>クラウド保存</b></span></li>'
    +     '<li><span class="c">◆</span><span>AI巡拝ルートが<b>無制限</b>に</span></li>'
    +     '<li><span class="c">◆</span><span>お気に入りの神社仏閣を<b>複数端末</b>で共有</span></li>'
    +     '<li><span class="c">◆</span><span>参拝や投稿で<b>巡礼レベル</b>が上がる</span></li>'
    +     '<li><span class="c">◆</span><span>限定・特別御朱印の<b>お知らせ</b></span></li>'
    +   '</ul></div>'
    +   '<a class="wl-login-link" id="wlToLogin">すでにアカウントをお持ちの方はログイン ›</a>'
    +   '<div class="wl-foot">登録することで利用規約とプライバシーポリシーに<br>同意したものとみなされます。</div>'
    + '</div>';
  document.body.appendChild(pg);
  pg.querySelector('.b').onclick = function(){ pg.style.display = 'none'; };

  function openLogin(){
    pg.style.display = 'none';
    try {
      if (typeof openRegister === 'function') openRegister();
      else document.getElementById('pgRegister').style.display = 'flex';
      // ログインモードに切り替える
      setTimeout(function(){
        var hd = document.querySelector('#pgRegister .reg-hd-tit');
        if (hd && hd.textContent.indexOf('ログイン') !== 0 && typeof regToggleMode === 'function') regToggleMode();
      }, 30);
    } catch(e){}
  }
  window.wabiOpenSignup = function(){ pg.style.display = 'block'; pg.scrollTop = 0; };
  window.wabiOpenLogin  = openLogin;

  document.getElementById('wlLineBtn').onclick = function(){ window.WabiLine.start(); };
  document.getElementById('wlMailBtn').onclick = function(){
    pg.style.display = 'none';
    if (typeof openRegister === 'function') openRegister();
  };
  document.getElementById('wlToLogin').onclick = openLogin;

  // ── ヘッダーのボタンを差し替える ────────────────────────────
  function buildButton(){
    var acts = document.querySelector('.site-hd-actions');
    if (!acts || acts.querySelector('.wl-wrap')) return;
    var btns = acts.querySelectorAll('.site-hd-btn');
    if (btns.length < 2) return;
    var target = btns[btns.length - 1];   // 右端（メニュー／マイページ）

    var wrap = document.createElement('div');
    wrap.className = 'wl-wrap';
    wrap.innerHTML =
        '<button class="wl-btn" id="wlBtn">'
      +   '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6.5" r="3.2" stroke="currentColor" stroke-width="1.6"/>'
      +   '<path d="M3.5 17c0-3.6 13-3.6 13 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
      +   'ログイン</button>'
      + '<div class="wl-menu" id="wlMenu">'
      +   '<a id="wlMenuLogin">ログイン</a><div class="sep"></div><a id="wlMenuSignup">新規登録</a>'
      + '</div>';
    target.parentNode.replaceChild(wrap, target);

    var menu = document.getElementById('wlMenu');
    document.getElementById('wlBtn').onclick = function(ev){
      ev.stopPropagation();
      menu.classList.toggle('on');
    };
    document.addEventListener('click', function(){ menu.classList.remove('on'); });
    paintButton();
  }

  // ログイン状態に合わせてボタンとメニューを描き分ける
  function paintButton(){
    var btn = document.getElementById('wlBtn'), menu = document.getElementById('wlMenu');
    if (!btn || !menu) return;
    var u = getUser();
    var person = '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6.5" r="3.2" stroke="currentColor" stroke-width="1.6"/>'
               + '<path d="M3.5 17c0-3.6 13-3.6 13 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
    if (u){
      btn.innerHTML = (u.pic ? '<img src="' + u.pic + '" style="width:20px;height:20px;border-radius:50%;object-fit:cover">' : person)
                    + (u.name.length > 6 ? u.name.slice(0, 6) + '…' : u.name);
      menu.innerHTML = '<a id="wlMenuMypage">マイページ</a><div class="sep"></div><a id="wlMenuLogout">ログアウト</a>';
      document.getElementById('wlMenuMypage').onclick = function(){
        menu.classList.remove('on');
        if (typeof openWabiMypage === 'function') openWabiMypage();
      };
      document.getElementById('wlMenuLogout').onclick = function(){
        menu.classList.remove('on'); window.WabiLine.logout();
      };
    } else {
      btn.innerHTML = person + 'ログイン';
      menu.innerHTML = '<a id="wlMenuLogin">ログイン</a><div class="sep"></div><a id="wlMenuSignup">新規登録</a>';
      document.getElementById('wlMenuLogin').onclick  = function(){ menu.classList.remove('on'); openLogin(); };
      document.getElementById('wlMenuSignup').onclick = function(){ menu.classList.remove('on'); window.wabiOpenSignup(); };
    }
  }

  buildButton();
  var n = 0;
  var iv = setInterval(function(){ buildButton(); if (++n > 30) clearInterval(iv); }, 400);
  setTimeout(function(){ try { window.WabiLine.restore(); } catch(e){} }, 2000);

  // 既存の会員ページ（#pgRegister）の「LINEで登録・ログイン」を実際に動かす
  function hookRegister(){
    var orig = window.regWithProvider;
    if (typeof orig !== 'function' || orig.__wl) return;
    var wrapped = function(provider){
      if (provider === 'LINE'){
        var pr = document.getElementById('pgRegister');
        if (pr) pr.style.display = 'none';
        window.WabiLine.start();
        return;
      }
      return orig.apply(this, arguments);
    };
    wrapped.__wl = true;
    window.regWithProvider = wrapped;
  }
  hookRegister();
  var m = 0;
  var iv2 = setInterval(function(){ hookRegister(); if (++m > 30) clearInterval(iv2); }, 400);
})();


/* ══════════════════════════════════════════════════════════════
   わびなび：マイページのプロフィール写真・カバー写真を変更できるようにする
   タップ → シートから「写真を選ぶ／LINEの写真に戻す／削除」
   選んだ画像は端末内で縮小して localStorage に保存する。
   （2026-07-27 追加 / index.html は触らず concierge.js から上書き）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiPhoto) return;
  window.__wabiPhoto = true;

  var LS_AV = 'wabiAvatar', LS_CV = 'wabiCover';
  function get(k){ try { return localStorage.getItem(k) || ''; } catch(e){ return ''; } }
  function set(k, v){ try { v ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch(e){} }

  var css = document.createElement('style');
  css.textContent = [
    // 「変更できます」と分かるカメラバッジ
    '#wcMypage .mp-av{position:relative;cursor:pointer;}',
    '#wcMypage .mp-hero{cursor:pointer;}',
    '.wp-cam{position:absolute;right:-2px;bottom:-2px;width:26px;height:26px;border-radius:50%;background:#fff;',
      'border:1px solid #e6dcc6;display:flex;align-items:center;justify-content:center;font-size:12px;',
      'box-shadow:0 2px 8px rgba(0,0,0,.18);z-index:3;}',
    '.wp-cam-cover{position:absolute;right:14px;bottom:14px;width:34px;height:34px;border-radius:50%;',
      'background:rgba(0,0,0,.45);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;',
      'font-size:15px;color:#fff;z-index:3;cursor:pointer;}',
    // 選択シート
    '.wp-mask{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:400;display:none;}',
    '.wp-mask.on{display:block;}',
    ".wp-sheet{position:fixed;left:0;right:0;bottom:0;z-index:401;background:#fff;border-radius:22px 22px 0 0;",
      "padding:10px 16px calc(18px + env(safe-area-inset-bottom));max-width:500px;margin:0 auto;",
      "font-family:'Shippori Mincho','Noto Serif JP',serif;transform:translateY(100%);transition:transform .22s cubic-bezier(.22,.61,.36,1);}",
    '.wp-sheet.on{transform:translateY(0);}',
    '.wp-sheet .bar{width:38px;height:4px;border-radius:2px;background:#e2dbcd;margin:6px auto 14px;}',
    '.wp-sheet .ttl{font-size:14px;font-weight:700;text-align:center;margin-bottom:10px;color:#2D2D2D;}',
    '.wp-sheet button{display:block;width:100%;padding:16px;border:none;background:transparent;border-top:1px solid #f0ebe1;',
      "font-family:inherit;font-size:15px;color:#2D2D2D;cursor:pointer;}",
    '.wp-sheet button.warn{color:#b23a2c;}',
    '.wp-sheet button.cancel{margin-top:8px;border-top:none;background:#f6f2ea;border-radius:14px;font-weight:700;}',
    '.wp-namebox{padding:4px 0 14px;}',
    ".wp-namebox input{width:100%;box-sizing:border-box;padding:14px;border:1px solid #e6dcc6;border-radius:14px;"
      +"font-family:'Shippori Mincho',serif;font-size:16px;color:#2D2D2D;background:#fff;outline:none;}",
    '.wp-namebox input:focus{border-color:#5D3A7A;}',
    '#wcMypage .mp-name .wp-pen{font-size:12px;opacity:.65;margin-left:7px;vertical-align:middle;}'
  ].join('');
  document.head.appendChild(css);

  var mask = document.createElement('div'); mask.className = 'wp-mask';
  var sheet = document.createElement('div'); sheet.className = 'wp-sheet';
  document.body.appendChild(mask); document.body.appendChild(sheet);
  mask.onclick = closeSheet;
  function closeSheet(){ mask.classList.remove('on'); sheet.classList.remove('on'); }
  function openSheet(title, items){
    sheet.innerHTML = '<div class="bar"></div><div class="ttl">' + title + '</div>'
      + items.map(function(it, i){ return '<button data-i="' + i + '" class="' + (it.cls || '') + '">' + it.label + '</button>'; }).join('')
      + '<button class="cancel" data-i="-1">キャンセル</button>';
    sheet.querySelectorAll('button').forEach(function(b){
      b.onclick = function(){
        var i = +b.getAttribute('data-i');
        closeSheet();
        if (i >= 0 && items[i].run) setTimeout(items[i].run, 120);
      };
    });
    mask.classList.add('on');
    requestAnimationFrame(function(){ sheet.classList.add('on'); });
  }

  // ファイル選択 → 縮小 → dataURL
  var input = document.createElement('input');
  input.type = 'file'; input.accept = 'image/*'; input.style.display = 'none';
  document.body.appendChild(input);

  function pickImage(maxW, maxH, cb){
    input.value = '';
    input.onchange = function(){
      var f = input.files && input.files[0];
      if (!f) return;
      if (!/^image\//.test(f.type)) { if (typeof showToast === 'function') showToast('画像ファイルを選んでください'); return; }
      var fr = new FileReader();
      fr.onload = function(){
        var img = new Image();
        img.onload = function(){
          var cw = maxW, ch = maxH;
          var cv = document.createElement('canvas');
          cv.width = cw; cv.height = ch;
          var ctx = cv.getContext('2d');
          // 中央でトリミング（cover）
          var s = Math.max(cw / img.width, ch / img.height);
          var dw = img.width * s, dh = img.height * s;
          ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
          try { cb(cv.toDataURL('image/jpeg', 0.82)); }
          catch(e){ if (typeof showToast === 'function') showToast('画像を保存できませんでした'); }
        };
        img.onerror = function(){ if (typeof showToast === 'function') showToast('画像を読み込めませんでした'); };
        img.src = fr.result;
      };
      fr.readAsDataURL(f);
    };
    input.click();
  }

  function lineUser(){ try { return (window.WabiLine && WabiLine.user && WabiLine.user()) || null; } catch(e){ return null; } }

  function saveImg(key, dataUrl){
    try {
      set(key, dataUrl);
      apply();
      if (typeof showToast === 'function') showToast('写真を変更しました');
    } catch(e){
      if (typeof showToast === 'function') showToast('保存できませんでした（容量が不足しています）');
    }
  }

  // ── 名前の編集 ──────────────────────────────────────────
  var LS_NM = 'wabiName';
  function openNameSheet(cur, hasLine){
    sheet.innerHTML = '<div class="bar"></div><div class="ttl">表示名を変更</div>'
      + '<div class="wp-namebox"><input id="wpName" maxlength="20" placeholder="お名前（20文字まで）" value="' + String(cur || '').replace(/"/g, '&quot;') + '"></div>'
      + '<button data-a="save">保存する</button>'
      + (hasLine ? '<button data-a="line">LINEの名前に戻す</button>' : '')
      + '<button class="cancel" data-a="cancel">キャンセル</button>';
    sheet.querySelectorAll('button').forEach(function(b){
      b.onclick = function(){
        var a = b.getAttribute('data-a');
        var v = (document.getElementById('wpName') || {}).value || '';
        closeSheet();
        setTimeout(function(){
          if (a === 'save'){
            v = v.trim();
            if (!v) { if (typeof showToast === 'function') showToast('お名前を入力してください'); return; }
            set(LS_NM, v); apply();
            if (typeof showToast === 'function') showToast('表示名を変更しました');
          } else if (a === 'line'){
            set(LS_NM, ''); apply();
            if (typeof showToast === 'function') showToast('LINEの名前に戻しました');
          }
        }, 120);
      };
    });
    mask.classList.add('on');
    requestAnimationFrame(function(){ sheet.classList.add('on'); });
    setTimeout(function(){ var i = document.getElementById('wpName'); if (i) i.focus(); }, 320);
  }

  // 保存済みの写真をマイページに反映する
  function apply(){
    var av = document.querySelector('#wcMypage .mp-av');
    var cv = document.getElementById('mpCover');
    var nmEl = document.querySelector('#wcMypage .mp-name');
    var myAv = get(LS_AV), myCv = get(LS_CV), u = lineUser();

    if (av){
      var src = myAv || (u && u.pic) || '';
      if (src) av.innerHTML = '<img src="' + src + '" style="width:100%;height:100%;object-fit:cover;border-radius:50%">';
      if (!av.querySelector('.wp-cam')){
        var b = document.createElement('div'); b.className = 'wp-cam'; b.textContent = '📷';
        av.appendChild(b);
      }
      av.onclick = function(ev){
        ev.stopPropagation();
        var items = [{ label:'写真を選ぶ', run: function(){ pickImage(400, 400, function(d){ saveImg(LS_AV, d); }); } }];
        if (u && u.pic) items.push({ label:'LINEの写真に戻す', run: function(){ set(LS_AV, ''); apply(); } });
        if (myAv) items.push({ label:'写真を削除', cls:'warn', run: function(){ set(LS_AV, ''); apply(); } });
        openSheet('プロフィール写真', items);
      };
    }

    if (cv){
      if (myCv) cv.style.background = '#3a3025 url(' + myCv + ') center/cover';
      if (!cv.querySelector('.wp-cam-cover')){
        var b2 = document.createElement('div'); b2.className = 'wp-cam-cover'; b2.textContent = '📷';
        cv.appendChild(b2);
        b2.onclick = function(ev){ ev.stopPropagation(); openCover(); };
      }
      cv.onclick = openCover;
    }
    function openCover(){
      var items = [{ label:'写真を選ぶ', run: function(){ pickImage(1200, 700, function(d){ saveImg(LS_CV, d); }); } }];
      if (get(LS_CV)) items.push({ label:'元の写真に戻す', cls:'warn', run: function(){ set(LS_CV, ''); if (typeof openWabiMypage === 'function') openWabiMypage(); } });
      openSheet('カバー写真', items);
    }

    // 名前（タップで変更）
    if (nmEl){
      var myNm = get(LS_NM);
      var shown = myNm || (u && u.name) || nmEl.textContent.replace(/\s*✎\s*$/, '');
      nmEl.innerHTML = esc3(shown) + '<span class="wp-pen">✎</span>';
      nmEl.style.cursor = 'pointer';
      nmEl.onclick = function(ev){
        ev.stopPropagation();
        openNameSheet(shown, !!(u && u.name));
      };
    }
  }
  function esc3(t){ return String(t == null ? '' : t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  window.wabiApplyProfilePhotos = apply;

  // マイページを開くたびに反映（mypage.js が毎回作り直すため）
  function bind(){
    if (typeof window.openWabiMypage !== 'function' || window.openWabiMypage.__wp) return;
    var orig = window.openWabiMypage;
    var wrapped = function(){
      var r = orig.apply(this, arguments);
      setTimeout(apply, 0); setTimeout(apply, 250); setTimeout(apply, 900);
      return r;
    };
    wrapped.__wp = true;
    window.openWabiMypage = wrapped;
  }
  bind();
  var n = 0;
  var iv = setInterval(function(){ bind(); if (++n > 40) clearInterval(iv); }, 300);
})();


/* ══════════════════════════════════════════════════════════════
   わびなび：Supabase同期（機種変更しても引き継げるようにする）
   ・LINEでログインしている間だけ動く
   ・保存するのは EXP／お気に入り／写真／ルート追加スポット
   ・URLとanonキーを設定するまでは何もしない（今までどおり端末内保存）
     設定：WabiSync.setup('https://xxxx.supabase.co', 'anonキー')
   （2026-07-27 追加 / index.html は触らず concierge.js から上書き）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.WabiSync) return;

  var TABLE = 'wabi_profiles';
  // 同期する localStorage のキー
  var KEYS = ['wabiExpState', 'wabiFavorites', 'wabiAvatar', 'wabiCover', 'wabiRouteExtras', 'wabiExpRules', 'wabiName'];

  // Supabaseの接続先。どちらも公開前提の値（publishableキーはanonキーの後継）。
  // ※ secretキー（sb_secret_...）は絶対にここへ置かないこと。
  var CFG = {
    url: 'https://rqkqjrzhvhsogwhtfbqh.supabase.co',
    key: 'sb_publishable_cqf_45micn3pe7PtMq1seQ_2UEAxlCv'
  };
  function normUrl(u){
    return String(u || '').trim().replace(/\/+$/, '').replace(/\/rest\/v1$/, '');
  }
  try {
    CFG.url = normUrl(localStorage.getItem('wabiSbUrl') || CFG.url);
    CFG.key = (localStorage.getItem('wabiSbKey') || CFG.key).trim();
  } catch(e){}

  function lineId(){
    try {
      var u = window.WabiLine && WabiLine.user && WabiLine.user();
      return (u && u.id) ? u.id : '';
    } catch(e){ return ''; }
  }
  function enabled(){ return !!(CFG.url && CFG.key && lineId()); }

  // 旧anonキー（eyJ...）と新publishableキー（sb_publishable_...）の両方に対応
  function headers(extra, withAuth){
    var h = { 'apikey': CFG.key, 'Content-Type': 'application/json' };
    if (withAuth !== false) h['Authorization'] = 'Bearer ' + CFG.key;
    for (var k in (extra || {})) h[k] = extra[k];
    return h;
  }
  // 401のときは Authorization を外してもう一度だけ試す
  function call(url, opts, extra){
    opts = opts || {};
    opts.headers = headers(extra, true);
    return fetch(url, opts).then(function(r){
      if (r.status !== 401 && r.status !== 403) return r;
      var o2 = { method: opts.method, body: opts.body, headers: headers(extra, false) };
      return fetch(url, o2);
    });
  }

  function snapshot(){
    var o = {};
    KEYS.forEach(function(k){
      try { var v = localStorage.getItem(k); if (v != null) o[k] = v; } catch(e){}
    });
    return o;
  }
  function restore(data){
    if (!data || typeof data !== 'object') return 0;
    var n = 0;
    KEYS.forEach(function(k){
      if (typeof data[k] === 'string'){
        try { localStorage.setItem(k, data[k]); n++; } catch(e){}
      }
    });
    return n;
  }
  function localStamp(){
    try { return +(localStorage.getItem('wabiSyncAt') || 0); } catch(e){ return 0; }
  }
  function touch(){
    try { localStorage.setItem('wabiSyncAt', String(Date.now())); } catch(e){}
  }

  function rpc(fn, args){
    var url = CFG.url + '/rest/v1/rpc/' + fn;
    return call(url, { method: 'POST', body: JSON.stringify(args) });
  }

  function pull(){
    if (!enabled()) return Promise.resolve(null);
    // テーブルを直接読まず、自分の行だけを返す関数を呼ぶ
    return rpc('wabi_get', { p_line_id: lineId() })
      .then(function(r){ return r.ok ? r.json() : null; })
      .then(function(rows){
        if (!rows || !rows.length) return null;
        var row = rows[0];
        var remote = row.updated_at ? Date.parse(row.updated_at) : 0;
        // サーバー側が新しいときだけ端末に取り込む
        if (remote > localStamp()){
          var n = restore(row.data);
          touch();
          repaint();
          return { restored: n, at: remote };
        }
        return { restored: 0, at: remote };
      })
      .catch(function(){ return null; });
  }

  function push(){
    if (!enabled()) return Promise.resolve(false);
    return rpc('wabi_put', { p_line_id: lineId(), p_data: snapshot() })
      .then(function(r){
        if (r.ok) { touch(); return true; }
        return false;
      }).catch(function(){ return false; });
  }

  // 画面の再描画（EXPバー・写真・お気に入り件数）
  function repaint(){
    try { if (window.WabiExp) { /* 値はlocalStorage直読みなので描き直すだけでよい */ } } catch(e){}
    try { if (typeof wabiApplyProfilePhotos === 'function') wabiApplyProfilePhotos(); } catch(e){}
    try {
      var mp = document.getElementById('wcMypage');
      if (mp && mp.style.display === 'block' && typeof openWabiMypage === 'function') openWabiMypage();
    } catch(e){}
  }

  // 変更をまとめて送る（連続操作で叩きすぎないように）
  var timer = null;
  function schedulePush(){
    if (!enabled()) return;
    clearTimeout(timer);
    timer = setTimeout(function(){ push(); }, 2500);
  }

  // localStorage への書き込みを検知して自動保存
  var _set = localStorage.setItem.bind(localStorage);
  var _rm  = localStorage.removeItem.bind(localStorage);
  localStorage.setItem = function(k, v){
    var r = _set(k, v);
    if (KEYS.indexOf(k) >= 0) schedulePush();
    return r;
  };
  localStorage.removeItem = function(k){
    var r = _rm(k);
    if (KEYS.indexOf(k) >= 0) schedulePush();
    return r;
  };

  window.WabiSync = {
    config: CFG,
    table: TABLE,
    keys: KEYS,
    enabled: enabled,
    setup: function(url, key){
      CFG.url = normUrl(url);
      CFG.key = (key || '').trim();
      try {
        localStorage.setItem('wabiSbUrl', CFG.url);
        localStorage.setItem('wabiSbKey', CFG.key);
      } catch(e){}
      if (typeof showToast === 'function') showToast('Supabaseの接続先を設定しました');
      return pull().then(function(){ return push(); });
    },
    pull: pull,
    push: push,
    status: function(){
      return { hasUrl: !!CFG.url, hasKey: !!CFG.key, loggedIn: !!lineId(), enabled: enabled(), lastSync: localStamp() };
    },
    // 接続確認（テーブルが見えるかどうかだけを試す）
    test: function(){
      if (!CFG.url || !CFG.key) return Promise.resolve({ ok:false, reason:'URLかキーが未設定です' });
      return rpc('wabi_get', { p_line_id: lineId() || 'CONNECTION_TEST' }).then(function(r){
        return r.text().then(function(t){ return { ok: r.ok, status: r.status, body: t.slice(0, 200) }; });
      }).catch(function(e){ return { ok:false, reason: String(e && e.message || e) }; });
    }
  };

  // ログイン済みなら起動時に取り込む
  setTimeout(function(){ if (enabled()) pull(); }, 3500);
  // 画面を離れるときに取りこぼしを送る
  window.addEventListener('pagehide', function(){ if (enabled()) push(); });
})();


/* ══════════════════════════════════════════════════════════════
   わびなび：ログイン画面と新規登録画面の作り直し
   ・ログイン画面（#pgRegister）… LINEでログイン／Googleでログイン／新規登録はこちら
   ・新規登録画面（#wxSignup）  … 「わびなびアカウントを作成」＋LINE／Googleのみ
   （2026-07-27 / index.html は触らず concierge.js から上書き）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiRegSkin) return;
  window.__wabiRegSkin = true;

  var GOOGLE_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">'
    + '<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>'
    + '<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>'
    + '<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>'
    + '<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>';
  var LINE_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" aria-hidden="true"><path d="M12 2C6.48 2 2 5.78 2 10.43c0 4.18 3.49 7.69 8.21 8.36.32.07.75.21.86.49.1.25.06.64.03.89l-.14.84c-.04.25-.19.97.85.53 1.04-.44 5.6-3.3 7.64-5.65 1.41-1.55 2.08-3.12 2.08-4.93C21.83 5.78 17.35 2 12 2zM8.31 12.98H6.43c-.22 0-.41-.18-.41-.41V9.04c0-.22.18-.41.41-.41h.16c.22 0 .41.18.41.41v3.12h1.31c.22 0 .41.18.41.41v.16c0 .05-.19.25-.41.25zm1.6-.41c0 .22-.18.41-.41.41h-.16c-.22 0-.41-.18-.41-.41V9.04c0-.22.18-.41.41-.41h.16c.22 0 .41.18.41.41v3.53zm4.05 0c0 .18-.11.33-.28.38-.4.01-.8.02-.13.02-.13 0-.25-.07-.32-.16l-1.61-2.19v1.95c0 .22-.18.41-.41.41h-.16c-.22 0-.41-.18-.41-.41V9.04c0-.18.11-.33.28-.38.04-.1.08-.2.13-.2.13 0 .25.07.32.16l1.61 2.19V9.04c0-.22.18-.41.41-.41h.16c.22 0 .41.18.41.41v3.53zm3.15-2.53c.22 0 .41.18.41.41v.16c0 .22-.18.41-.41.41h-1.31v.84h1.31c.22 0 .41.18.41.41v.16c0 .22-.18.41-.41.41h-1.88c-.22 0-.41-.18-.41-.41V9.04c0-.22.18-.41.41-.41h1.88c.22 0 .41.18.41.41v.16c0 .22-.18.41-.41.41h-1.31v.84h1.31z"/></svg>';

  // Googleログインはまだ未設定（Supabaseの認証にGoogleを連携したら有効化する）
  window.WabiGoogle = {
    ready: false,
    start: function(){
      if (typeof showToast === 'function') showToast('Googleでのログインは現在準備中です');
      return false;
    }
  };

  var css = document.createElement('style');
  css.textContent = [
    // ── ログイン画面（背景を少し薄く／会員になるとを白に）──
    '#pgRegister.reg-bg{background:linear-gradient(180deg,#5b3722 0%,#4a3170 42%,#463067 100%) !important;}',
    '#pgRegister .reg-btn{height:54px;padding:0 16px;border-radius:14px;font-family:\'Shippori Mincho\',serif;font-size:15px;font-weight:700;letter-spacing:.04em;}',
    '#pgRegister .reg-divider{display:none !important;}',
    '#pgRegister .reg-btn-mail{display:none !important;}',
    '#pgRegister .reg-benefits{background:#fff !important;border:1px solid #ece4d3 !important;border-radius:20px !important;',
      'box-shadow:0 10px 30px rgba(0,0,0,.14);padding:20px 22px !important;}',
    '#pgRegister .reg-benefits *{color:#2D2D2D !important;}',
    '#pgRegister .reg-benefits b{color:#5D3A7A !important;}',
    '#pgRegister .reg-benefits-tit{font-family:\'Shippori Mincho\',serif;font-weight:700 !important;}',
    // 新規登録はこちら（メール登録の位置に置く）
    '.reg-signup-link{display:block;width:100%;height:54px;line-height:54px;text-align:center;border-radius:14px;',
      'background:rgba(255,255,255,.10);border:1px solid rgba(201,168,76,.55);color:#fff;cursor:pointer;',
      'font-family:\'Shippori Mincho\',serif;font-size:15px;font-weight:700;letter-spacing:.04em;margin-bottom:10px;}',
    '.reg-signup-link:active{transform:scale(.98);}',
    // ── 新規登録画面 ──
    '#wxSignup{background:#FBFAF7 !important;}',
    '#wxSignup .wl-hd{background:#FBFAF7;border-bottom:none;}',
    '#wxSignup .wl-in{padding:6px 24px 56px;}',
    '#wxSignup .su-ttl{font-family:\'Shippori Mincho\',serif;font-size:24px;font-weight:700;color:#222;',
      'letter-spacing:.04em;margin:14px 0 10px;}',
    '#wxSignup .su-lead{font-size:13px;line-height:1.9;color:#666;font-family:\'Noto Serif JP\',serif;margin-bottom:30px;}',
    // クラシル風：白い丸型ボタン＋左にブランドアイコン
    '#wxSignup .su-btn{position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:62px;',
      'border-radius:999px;background:#fff;border:1px solid #DFDCD6;cursor:pointer;color:#4a4a4a;',
      'font-family:\'Shippori Mincho\',serif;font-size:17px;font-weight:700;letter-spacing:.06em;',
      'margin-bottom:14px;transition:transform .12s,box-shadow .2s;box-shadow:0 2px 8px rgba(0,0,0,.03);}',
    '#wxSignup .su-btn:active{transform:scale(.97);}',
    '#wxSignup .su-btn .ic{position:absolute;left:22px;top:50%;transform:translateY(-50%);display:flex;align-items:center;}',
    '#wxSignup .su-btn .lineic{width:28px;height:28px;border-radius:7px;background:#06C755;display:flex;align-items:center;justify-content:center;}',
    '#wxSignup .su-benefit{background:#fff;border-radius:24px;box-shadow:0 10px 30px rgba(0,0,0,.08);padding:22px 24px;margin-top:32px;}',
    '#wxSignup .su-benefit .h{font-family:\'Shippori Mincho\',serif;font-size:15px;font-weight:700;color:#222;margin-bottom:14px;}',
    '#wxSignup .su-benefit li{list-style:none;display:flex;gap:10px;font-size:13.5px;line-height:1.75;color:#444;',
      'font-family:\'Noto Serif JP\',serif;margin-top:10px;}',
    '#wxSignup .su-benefit li .c{color:#C8A04D;font-weight:700;}',
    '#wxSignup .su-benefit li b{color:#5D3A7A;}',
    '#wxSignup .su-login{display:block;text-align:center;margin-top:22px;font-size:13px;color:#5D3A7A;font-weight:700;cursor:pointer;}',
    '#wxSignup .su-fine{font-size:11px;color:#9a948a;text-align:center;line-height:1.8;margin-top:20px;font-family:\'Noto Serif JP\',serif;}'
  ].join('');
  document.head.appendChild(css);

  // ── 新規登録画面を作り直す ────────────────────────────────
  function buildSignup(){
    var pg = document.getElementById('wxSignup');
    if (!pg) return;
    var box = pg.querySelector('.wl-in');
    if (!box || box.getAttribute('data-su')) return;
    box.setAttribute('data-su', '1');
    box.innerHTML =
        '<div class="su-ttl">わびなびアカウントを作成</div>'
      + '<div class="su-lead">参拝の記録・御朱印・巡礼レベルを保存できます。<br>'
      +   'パスワードを覚える必要はありません。</div>'
      + '<button class="su-btn" id="suLine"><span class="ic"><span class="lineic">' + LINE_ICON + '</span></span>LINEで登録</button>'
      + '<button class="su-btn" id="suGoogle"><span class="ic">' + GOOGLE_ICON + '</span>Googleで登録</button>'
      + '<div class="su-benefit"><div class="h">会員になると</div><ul>'
      +   '<li><span class="c">◆</span><span>参拝記録・御朱印を<b>クラウド保存</b></span></li>'
      +   '<li><span class="c">◆</span><span>AI巡拝ルートが<b>無制限</b>に</span></li>'
      +   '<li><span class="c">◆</span><span>お気に入りを<b>複数端末</b>で共有</span></li>'
      +   '<li><span class="c">◆</span><span>参拝や投稿で<b>巡礼レベル</b>が上がる</span></li>'
      +   '<li><span class="c">◆</span><span>限定・特別御朱印の<b>お知らせ</b></span></li>'
      + '</ul></div>'
      + '<a class="su-login" id="suLogin">すでにアカウントをお持ちの方はログイン ›</a>'
      + '<div class="su-fine">登録することで利用規約とプライバシーポリシーに<br>同意したものとみなされます。</div>';

    document.getElementById('suLine').onclick   = function(){ window.WabiLine.start(); };
    document.getElementById('suGoogle').onclick = function(){ window.WabiGoogle.start(); };
    document.getElementById('suLogin').onclick  = function(){
      pg.style.display = 'none';
      if (typeof window.wabiOpenLogin === 'function') window.wabiOpenLogin();
    };
  }

  // ── ログイン画面の文言とボタンを差し替える ─────────────────
  function fixLogin(){
    var pr = document.getElementById('pgRegister');
    if (!pr) return;
    var line = pr.querySelector('.reg-btn-line');
    var goog = pr.querySelector('.reg-btn-google');
    if (line && line.getAttribute('data-wl') !== '1'){
      line.setAttribute('data-wl', '1');
      line.innerHTML = LINE_ICON + 'LINEでログイン';
      line.setAttribute('onclick', '');
      line.onclick = function(){ pr.style.display = 'none'; window.WabiLine.start(); };
    }
    if (goog && goog.getAttribute('data-wl') !== '1'){
      goog.setAttribute('data-wl', '1');
      goog.innerHTML = GOOGLE_ICON + 'Googleでログイン';
      goog.setAttribute('onclick', '');
      goog.onclick = function(){ window.WabiGoogle.start(); };
    }
    // メール登録の位置に「新規登録はこちら」を置く
    var mail = pr.querySelector('.reg-btn-mail');
    if (mail && !pr.querySelector('.reg-signup-link')){
      var a = document.createElement('div');
      a.className = 'reg-signup-link';
      a.textContent = '新規登録はこちら';
      a.onclick = function(){
        pr.style.display = 'none';
        if (typeof window.wabiOpenSignup === 'function') window.wabiOpenSignup();
      };
      mail.parentNode.insertBefore(a, mail);
    }
    // 下の切り替えリンクは重複するので隠す
    var tg = pr.querySelector('.reg-toggle');
    if (tg) tg.style.display = 'none';
  }

  buildSignup();
  fixLogin();
  var n = 0;
  var iv = setInterval(function(){ buildSignup(); fixLogin(); if (++n > 40) clearInterval(iv); }, 400);
})();


/* ══════════════════════════════════════════════════════════════
   わびなび：マイページ調整
   ・表示名をヘッダー（ログインボタン）にも反映
   ・アバターに写真があるときはカメラマークを隠す
   ・6枚のカードを横長（4:3）に。参拝した神社と御朱印の位置を入れ替え
   ・カードの背景画像を差し替え
   （2026-07-27 / index.html は触らず concierge.js から上書き）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiMypage2) return;
  window.__wabiMypage2 = true;

  var IMG = {
    '参拝した神社':        'mp-sanpai.jpg',
    '御朱印':              'mp-goshuin.jpg',
    'お気に入りの神社仏閣': 'mp-post.jpg',
    '投稿した記録':        'mp-favorite.jpg',
    'フォロー':            'mp-follow.jpg',
    'フォロワー':          'mp-follower.jpg'
  };
  // 表示順（参拝した神社と御朱印を入れ替え）
  var ORDER = ['御朱印', '参拝した神社', 'お気に入りの神社仏閣', '投稿した記録', 'フォロー', 'フォロワー'];

  var css = document.createElement('style');
  css.textContent = [
    // 横長（4:3）／すべての行を同じ高さに揃える
    '#wcMypage .mp-stat{aspect-ratio:4/3 !important;height:auto !important;min-height:0 !important;}',
    '#wcMypage .mp-stats{align-items:stretch !important;grid-auto-rows:1fr !important;}',
    // ラベルが2行になっても箱が伸びないようにする
    '#wcMypage .mp-stat-l{overflow:hidden;}',
    // 写真があるときはカメラマークを隠す
    '#wcMypage .mp-av.has-photo .wp-cam{display:none !important;}'
  ].join('');
  document.head.appendChild(css);

  function labelOf(el){
    var l = el.querySelector('.mp-stat-l');
    return l ? l.textContent.trim() : '';
  }

  function fixCards(){
    var wrap = document.querySelector('#wcMypage .mp-stats');
    if (!wrap) return;
    var cards = [].slice.call(wrap.querySelectorAll('.mp-stat'));
    if (!cards.length) return;

    // 背景画像を差し替え（data-bg を外して mypage.js 側の上書きを止める）
    cards.forEach(function(c){
      var lb = labelOf(c);
      var f = IMG[lb];
      if (!f) return;
      c.removeAttribute('data-bg');
      c.style.background = '#3a3025 url(' + f + ') center/cover';
    });

    // 並び替え
    if (wrap.getAttribute('data-ordered') !== '1'){
      var byLabel = {};
      cards.forEach(function(c){ byLabel[labelOf(c)] = c; });
      var ok = ORDER.every(function(k){ return byLabel[k]; });
      if (ok){
        ORDER.forEach(function(k){ wrap.appendChild(byLabel[k]); });
        wrap.setAttribute('data-ordered', '1');
      }
    }
  }

  // アバターに写真があるかどうかでカメラマークを出し分け
  function fixAvatarBadge(){
    var av = document.querySelector('#wcMypage .mp-av');
    if (!av) return;
    var hasImg = !!av.querySelector('img');
    if (hasImg) av.classList.add('has-photo');
    else av.classList.remove('has-photo');
  }

  // 表示名をヘッダーのログインボタンにも反映
  function syncHeaderName(){
    try {
      var btn = document.getElementById('wlBtn');
      if (!btn) return;
      var u = (window.WabiLine && WabiLine.user && WabiLine.user()) || null;
      if (!u) return;                      // 未ログインなら「ログイン」のまま
      var my = '';
      try { my = localStorage.getItem('wabiName') || ''; } catch(e){}
      var nm = my || u.name || '巡礼者';
      var pic = '';
      try { pic = localStorage.getItem('wabiAvatar') || u.pic || ''; } catch(e){}
      var ic = pic
        ? '<img src="' + pic + '" style="width:20px;height:20px;border-radius:50%;object-fit:cover">'
        : '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="6.5" r="3.2" stroke="currentColor" stroke-width="1.6"/>'
          + '<path d="M3.5 17c0-3.6 13-3.6 13 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
      btn.innerHTML = ic + (nm.length > 6 ? nm.slice(0, 6) + '…' : nm);
    } catch(e){}
  }
  window.wabiSyncHeaderName = syncHeaderName;

  function run(){ fixCards(); fixAvatarBadge(); syncHeaderName(); }

  // マイページを開くたび／写真や名前を変えたときに反映
  function bind(){
    if (typeof window.openWabiMypage !== 'function' || window.openWabiMypage.__mp2) return;
    var orig = window.openWabiMypage;
    var wrapped = function(){
      var r = orig.apply(this, arguments);
      [0, 200, 600, 1400].forEach(function(ms){ setTimeout(run, ms); });
      return r;
    };
    wrapped.__mp2 = true;
    window.openWabiMypage = wrapped;
  }
  bind();
  var n = 0;
  var iv = setInterval(function(){ bind(); if (++n > 40) clearInterval(iv); }, 300);

  // 写真・名前の保存を検知して即反映
  var _set = localStorage.setItem.bind(localStorage);
  localStorage.setItem = function(k, v){
    var r = _set(k, v);
    if (k === 'wabiName' || k === 'wabiAvatar') setTimeout(run, 60);
    return r;
  };
  var _rm = localStorage.removeItem.bind(localStorage);
  localStorage.removeItem = function(k){
    var r = _rm(k);
    if (k === 'wabiName' || k === 'wabiAvatar') setTimeout(run, 60);
    return r;
  };

  setTimeout(syncHeaderName, 2500);
  setTimeout(syncHeaderName, 5000);
})();


/* ══════════════════════════════════════════════════════════════
   わびなび：ヘッダーまわりの整理
   ・ログインボタンを小さく
   ・使っていない検索ボタンを削除
   ・「APIキー設定済み」の帯を利用者から見えないように
   （2026-07-27 / index.html は触らず concierge.js から上書き）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiHdTidy) return;
  window.__wabiHdTidy = true;

  var css = document.createElement('style');
  css.textContent = [
    // ログインボタンを一回り小さく
    ".wl-btn{padding:8px 14px !important;font-size:12.5px !important;gap:6px !important;}",
    ".wl-btn svg{width:14px !important;height:14px !important;}",
    ".wl-btn img{width:17px !important;height:17px !important;}",
    ".wl-menu{min-width:170px;}",
    ".wl-menu a{padding:14px 18px;font-size:14px;}",
    // 検索ボタンを非表示
    ".site-hd-actions .site-hd-btn{display:none !important;}",
    // APIキーの帯は管理用なので隠す
    "#apiBanner,#apiAppliedBar{display:none !important;}"
  ].join('');
  document.head.appendChild(css);

  // 管理用：必要なときだけ表示できるようにしておく
  window.wabiShowApiBar = function(){
    var st = document.createElement('style');
    st.textContent = '#apiBanner,#apiAppliedBar{display:flex !important;}';
    document.head.appendChild(st);
    if (typeof showToast === 'function') showToast('APIキーの設定欄を表示しました');
  };

  // index.html 側があとから style.display を直接いじるので、そのつど閉じ直す
  function hideApi(){
    ['apiBanner', 'apiAppliedBar'].forEach(function(id){
      var el = document.getElementById(id);
      if (el && el.style.display !== 'none' && !window.__wabiApiShown) el.style.display = 'none';
    });
  }
  hideApi();
  setInterval(hideApi, 1500);
})();


/* ══════════════════════════════════════════════════════════════
   わびなび：下部メニューを4つに ／ 名前のちらつき解消 ／ 御朱印ランキングの高さ揃え
   （2026-07-27 / index.html は触らず concierge.js から上書き）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiNav4) return;
  window.__wabiNav4 = true;

  var css = document.createElement('style');
  css.textContent = [
    // 既存のフッターナビと金色のマップボタンを隠す
    '.fnav{display:none !important;}',
    '#fabMap,.fab-map{display:none !important;}',
    // 新しい下部メニュー（どのページでも出る）
    '#wabiNav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:500px;',
      'background:rgba(255,255,255,.97);backdrop-filter:blur(8px);border-top:1px solid #f0e8d8;',
      'display:grid;grid-template-columns:repeat(4,1fr);z-index:400;',
      'padding:6px 0 max(6px,env(safe-area-inset-bottom));box-shadow:0 -2px 12px rgba(0,0,0,.05);}',
    '#wabiNav .wn{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:4px 0;color:#b9b0a2;}',
    '#wabiNav .wn:active{opacity:.6;}',
    '#wabiNav .wn.on{color:#a83320;}',
    '#wabiNav .wn svg{width:21px;height:21px;}',
    "#wabiNav .wn span{font-size:9.5px;letter-spacing:.04em;font-family:'Noto Serif JP',serif;font-weight:600;}",
    // 下部メニューに隠れないように下余白
    'body{padding-bottom:0;}'
  ].join('');
  document.head.appendChild(css);

  var IC = {
    home:  '<svg viewBox="0 0 22 22" fill="none"><path d="M3 10l8-6.5 8 6.5v8.5a1 1 0 0 1-1 1h-4v-6H8v6H4a1 1 0 0 1-1-1V10z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    map:   '<svg viewBox="0 0 22 22" fill="none"><path d="M11 19s6-6.1 6-10.2A6 6 0 0 0 5 8.8C5 12.9 11 19 11 19z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="11" cy="9" r="2.2" stroke="currentColor" stroke-width="1.5"/></svg>',
    posts: '<svg viewBox="0 0 22 22" fill="none"><circle cx="8" cy="7.5" r="2.6" stroke="currentColor" stroke-width="1.5"/><circle cx="15" cy="8.5" r="2.1" stroke="currentColor" stroke-width="1.4"/><path d="M3.5 17c0-2.9 9-2.9 9 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13.5 15.6c.4-1.6 5-1.6 5 .9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
    my:    '<svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="7.5" r="3.4" stroke="currentColor" stroke-width="1.6"/><path d="M4 18.5c0-4 14-4 14 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>'
  };

  // 開いているオーバーレイをすべて閉じる
  function closeAll(){
    ['pgShrineDetail','pgMap','pgRegister','pgAiRoute','pgAiResult','pgAreaSearch','pgPostDetail',
     'pgTourList','pgSeasonList','pgEcList','pgOsupplyList','pgShukatsuList','pgArticleList',
     'wabiRoutePg','wabiRankMore','wxGuide','wxInvite','wxSignup','wcMypage','wcPost'].forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    var mp = document.getElementById('wcMypage');
    if (mp) mp.classList.remove('show');
  }

  var nav = document.createElement('div');
  nav.id = 'wabiNav';
  nav.innerHTML =
      '<div class="wn on" data-k="home">'  + IC.home  + '<span>ホーム</span></div>'
    + '<div class="wn" data-k="map">'      + IC.map   + '<span>マップ</span></div>'
    + '<div class="wn" data-k="posts">'    + IC.posts + '<span>みんなの投稿</span></div>'
    + '<div class="wn" data-k="my">'       + IC.my    + '<span>マイページ</span></div>';
  document.body.appendChild(nav);

  function mark(k){
    nav.querySelectorAll('.wn').forEach(function(el){
      el.classList.toggle('on', el.getAttribute('data-k') === k);
    });
  }

  nav.querySelectorAll('.wn').forEach(function(el){
    el.onclick = function(){
      var k = el.getAttribute('data-k');
      mark(k);
      if (k === 'home'){
        closeAll();
        if (typeof go === 'function') go('pgHome');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (k === 'map'){
        closeAll();
        if (typeof openMapFromFab === 'function') openMapFromFab();
        else if (typeof searchNearby === 'function') searchNearby();
      } else if (k === 'posts'){
        closeAll();
        if (typeof openCommunityAll === 'function') openCommunityAll();
        else if (typeof showToast === 'function') showToast('みんなの投稿ページは現在準備中です');
      } else if (k === 'my'){
        closeAll();
        if (typeof openWabiMypage === 'function') openWabiMypage();
      }
    };
  });

  // ── 名前のちらつきを解消（LINEの名前→設定名の切り替わりを見せない）──
  function myName(){
    try { return localStorage.getItem('wabiName') || ''; } catch(e){ return ''; }
  }
  var fixing = false;
  function fixBtn(){
    if (fixing) return;
    var btn = document.getElementById('wlBtn');
    if (!btn) return;
    var nm = myName();
    if (!nm) return;
    var u = null;
    try { u = window.WabiLine && WabiLine.user && WabiLine.user(); } catch(e){}
    if (!u) return;
    var shown = nm.length > 6 ? nm.slice(0, 6) + '…' : nm;
    if (btn.textContent.trim() === shown) return;
    fixing = true;
    try { if (typeof wabiSyncHeaderName === 'function') wabiSyncHeaderName(); } catch(e){}
    fixing = false;
  }
  // ボタンが作られた／書き換わった瞬間に直す
  if (window.MutationObserver){
    var mo = new MutationObserver(function(){ fixBtn(); });
    var acts = document.querySelector('.site-hd-actions');
    if (acts) mo.observe(acts, { childList: true, subtree: true, characterData: true });
  }
  fixBtn();
  var t = 0;
  var iv = setInterval(function(){ fixBtn(); if (++t > 40) clearInterval(iv); }, 120);
})();


/* ── 御朱印タグのランキングで高さが崩れるのを直す ───────────── */
(function(){
  if (window.__wabiGoshuinFix) return;
  window.__wabiGoshuinFix = true;
  var css = document.createElement('style');
  css.textContent = [
    // 行の高さを揃える
    '#list.wc-rankgrid{grid-auto-rows:1fr !important;align-items:stretch !important;}',
    '#wrmGrid{grid-auto-rows:1fr !important;align-items:stretch !important;}',
    // 御朱印の写真・募集中プレースホルダを同じ高さに
    '.rcard img[style*="height: 340px"],.rcard img[style*="height:340px"]{height:190px !important;}',
    '#list .rcard [style*="height: 340px"],#list .rcard [style*="height:340px"]{height:190px !important;}',
    '#list .rcard,#wrmGrid .rcard{display:flex;flex-direction:column;}',
    '#list .rcard .rftr,#wrmGrid .rcard .rftr{margin-top:auto;}'
  ].join('');
  document.head.appendChild(css);

  // インラインで 340px 指定されている要素を実測で詰める
  function trim(){
    document.querySelectorAll('#list .rcard img, #wrmGrid .rcard img').forEach(function(im){
      if (im.style && /340px/.test(im.style.height)) im.style.height = '190px';
    });
    document.querySelectorAll('#list .rcard div, #wrmGrid .rcard div').forEach(function(d){
      if (d.style && /340px/.test(d.style.height)) d.style.height = '190px';
      if (d.style && /340px/.test(d.style.minHeight)) d.style.minHeight = '190px';
    });
  }
  setInterval(trim, 900);
})();
