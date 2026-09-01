// ══════════════════════════════════════════════════════════
// わびなび おすすめ巡拝ルート データ（10ルート）
// このファイルを書き換えてGitHubに上げ直せば、
// index.html を触らずにルートを変更できます。
// ══════════════════════════════════════════════════════════
(function(){
  var IMG = [
    'https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=520&q=80&auto=format&fit=crop', // 0 水上の鳥居
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=520&q=80&auto=format&fit=crop', // 1 青い海
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=520&q=80&auto=format&fit=crop', // 2 門前町の夕景
    'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=520&q=80&auto=format&fit=crop', // 3 滝
    'https://images.unsplash.com/photo-1503640538573-148065ba4904?w=520&q=80&auto=format&fit=crop', // 4 日本庭園と池
    'https://images.unsplash.com/photo-1440581572325-0bea30075d9d?w=520&q=80&auto=format&fit=crop', // 5 杉の森
    'https://images.unsplash.com/photo-1476231682828-37e571bc172f?w=520&q=80&auto=format&fit=crop', // 6 山林
    'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=520&q=80&auto=format&fit=crop', // 7 千本鳥居
    'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=520&q=80&auto=format&fit=crop', // 8 富士山と五重塔
    'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=520&q=80&auto=format&fit=crop'  // 9 山と湖の紅葉
  ];

  var R = [
    {
      id:'r1', name:'東国三社巡り', emoji:'⛩',
      transport:'車', time:'約4時間', totalMove:'総移動時間 約45分',
      desc:'国譲り神話で活躍した武神タケミカヅチとフツヌシ、そして道案内の神クナドを巡る「東国三社参り」。江戸っ子が「お伊勢参りのみそぎ参り」と呼んだ由緒ある巡拝です。三社を巡って集める「東国三社守」も人気。強い決断力と勝負運を授かる、人生の転機にこそ訪れたい旅です',
      tags:['関東最強の開運','東国三社守'],
      cardDesc:'武神を祀る関東最強の三社。<br>江戸から続く開運参り',
      cardTag:'開運', cardImg: IMG[0],
      spots:[
        {name:'鹿島神宮',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Kashima-jingu_haiden-1.JPG/960px-Kashima-jingu_haiden-1.JPG',deity:'武甕槌大神',addr:'茨城県鹿嶋市宮中2306-1',loc:'茨城県鹿嶋市',move:'出発地から約10分',benefit:'勝負運・決断力',lat:35.9688,lng:140.6315},
        {name:'香取神宮',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Katori-jingu_haiden_shomen.JPG/960px-Katori-jingu_haiden_shomen.JPG',deity:'経津主大神',addr:'千葉県香取市香取1697-1',loc:'千葉県香取市',move:'約20分',benefit:'勝運・交通安全',lat:35.8857,lng:140.5288},
        {name:'息栖神社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ikisu-jinja_haiden.JPG/960px-Ikisu-jinja_haiden.JPG',deity:'久那戸神',addr:'茨城県神栖市息栖2882',loc:'茨城県神栖市',move:'約20分',benefit:'厄除招福・交通守護',lat:35.8858,lng:140.6251}
      ]
    },
    {
      id:'r2', name:'えびす・だいこく両参り', emoji:'🎣',
      transport:'車', time:'約5時間', totalMove:'総移動時間 約1時間30分',
      desc:'国造りを成しとげた大国主大神（だいこく様）と、その御子神・事代主神（えびす様）。出雲大社と美保神社の両方をお参りする「えびすだいこく両参り」は、片方だけでは「片参り」と言われる山陰の古き習わしです。縁結びと商売繁盛、親子の神様から二重の福を授かります',
      tags:['縁結び','商売繁盛'],
      cardDesc:'出雲の大国さまとえびす様、<br>親子の神を巡る山陰の旅',
      cardTag:'縁結び', cardImg: IMG[1],
      spots:[
        {name:'出雲大社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Haiden_of_Izumo-taisha-1.JPG/960px-Haiden_of_Izumo-taisha-1.JPG',deity:'大国主大神',addr:'島根県出雲市大社町杵築東195',loc:'島根県出雲市',move:'出発地から約25分',benefit:'縁結び・福徳開運',lat:35.3998,lng:132.6852},
        {name:'美保神社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Miho-jinja_haiden.jpg/960px-Miho-jinja_haiden.jpg',deity:'事代主神・三穂津姫命',addr:'島根県松江市美保関町美保関608',loc:'島根県松江市',move:'約1時間30分',benefit:'商売繁盛・海上安全',lat:35.5622,lng:133.3067}
      ]
    },
    {
      id:'r3', name:'お伊勢参り', emoji:'☀️',
      transport:'バス', time:'約7時間', totalMove:'総移動時間 約1時間10分',
      desc:'「一生に一度はお伊勢参り」。まず二見浦の夫婦岩で心身を清め、豊受大御神の外宮から天照大御神の内宮へ——江戸時代の旅人が守った正式順路をたどります。締めくくりは神宮の鬼門を守る朝熊岳金剛證寺。「お伊勢参らば朝熊をかけよ」と伊勢音頭に唄われた満願の地です',
      tags:['正式順路','一生に一度'],
      cardDesc:'禊から内宮へ、正式順路で<br>巡る一生に一度のお参り',
      cardTag:'正式順路', cardImg: IMG[2],
      spots:[
        {name:'二見興玉神社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Futamiokitama_jinja_Haiden.jpg/960px-Futamiokitama_jinja_Haiden.jpg',deity:'猿田彦大神',addr:'三重県伊勢市二見町江575',loc:'三重県伊勢市',move:'出発地から約15分',benefit:'禊・夫婦円満',lat:34.5083,lng:136.7888},
        {name:'伊勢神宮 外宮（豊受大神宮）',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Geku_003.jpg/960px-Geku_003.jpg',deity:'豊受大御神',addr:'三重県伊勢市豊川町279',loc:'三重県伊勢市',move:'約20分',benefit:'衣食住・産業守護',lat:34.4874,lng:136.7037},
        {name:'猿田彦神社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Ise_Sarutahiko_Shrine.jpg/960px-Ise_Sarutahiko_Shrine.jpg',deity:'猿田彦大神',addr:'三重県伊勢市宇治浦田2-1-10',loc:'三重県伊勢市',move:'約10分',benefit:'みちひらき',lat:34.4674,lng:136.7202},
        {name:'伊勢神宮 内宮（皇大神宮）',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Naiku_04.jpg/960px-Naiku_04.jpg',deity:'天照大御神',addr:'三重県伊勢市宇治館町1',loc:'三重県伊勢市',move:'約5分',benefit:'開運・国家安泰',lat:34.4569,lng:136.7230},
        {name:'朝熊岳金剛證寺',photo:'https://upload.wikimedia.org/wikipedia/commons/1/1b/Kongoshoji%28Mie%29_08.JPG',deity:'虚空蔵菩薩（本尊）',addr:'三重県伊勢市朝熊町岳548',loc:'三重県伊勢市',move:'約20分',benefit:'厄除け・福徳',lat:34.4575,lng:136.7854}
      ]
    },
    {
      id:'r4', name:'熊野三山', emoji:'🦅',
      transport:'車', time:'約7時間', totalMove:'総移動時間 約2時間',
      desc:'蘇りの聖地・熊野。平安の昔、上皇から庶民まで「蟻の熊野詣」と呼ばれるほど人々が列をなした祈りの道の終着点が熊野三山です。導きの神・八咫烏に見守られながら本宮・速玉・那智の三大社を巡れば、過去を浄めて新しい自分に生まれ変わると伝わります。那智の大滝の轟音もぜひ体感を',
      tags:['よみがえりの聖地','世界遺産'],
      cardDesc:'よみがえりの聖地・熊野。<br>八咫烏が導く再生の旅',
      cardTag:'世界遺産', cardImg: IMG[3],
      spots:[
        {name:'熊野本宮大社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Inside_the_Kumano_Hongu_Taisha.jpg/960px-Inside_the_Kumano_Hongu_Taisha.jpg',deity:'家都美御子大神',addr:'和歌山県田辺市本宮町本宮1110',loc:'和歌山県田辺市',move:'出発地から約30分',benefit:'よみがえり・開運',lat:33.8404,lng:135.7736},
        {name:'熊野速玉大社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Kumanohayatama-taisha12s5s4200.jpg/960px-Kumanohayatama-taisha12s5s4200.jpg',deity:'熊野速玉大神・熊野夫須美大神',addr:'和歌山県新宮市新宮1',loc:'和歌山県新宮市',move:'約45分',benefit:'現世安穏・夫婦円満',lat:33.7323,lng:135.9837},
        {name:'熊野那智大社',photo:'https://upload.wikimedia.org/wikipedia/commons/9/9c/Shrine_Kumano_nachi01.jpg',deity:'熊野夫須美大神',addr:'和歌山県東牟婁郡那智勝浦町那智山1',loc:'和歌山県那智勝浦町',move:'約40分',benefit:'諸願成就・縁結び',lat:33.6684,lng:135.8904}
      ]
    },
    {
      id:'r5', name:'諏訪大社 四社巡り', emoji:'🌲',
      transport:'車', time:'約4時間', totalMove:'総移動時間 約45分',
      desc:'諏訪湖をはさんで鎮まる上社と下社、あわせて四つのお宮をすべて参る「四社まいり」。御祭神は国譲り神話に登場する建御名方神です。七年目ごとの御柱祭で知られる日本最古級の古社で、社殿の四隅に立つ御柱に守られた境内は凛とした気に満ちています。四社で記念品がいただける授与も人気です',
      tags:['御柱','四社まいり'],
      cardDesc:'諏訪湖を囲む四つのお宮を<br>一日で参る「四社まいり」',
      cardTag:'御柱', cardImg: IMG[4],
      spots:[
        {name:'諏訪大社 上社本宮',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Suwa-taisha%2C_Kamisha_Honmiya%2C_haiden-1.jpg/960px-Suwa-taisha%2C_Kamisha_Honmiya%2C_haiden-1.jpg',deity:'建御名方神',addr:'長野県諏訪市中洲宮山1',loc:'長野県諏訪市',move:'出発地から約15分',benefit:'勝負運・開運',lat:35.9985,lng:138.1190},
        {name:'諏訪大社 上社前宮',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Suwa-taisha%2C_Kamisha_Maemiya%2C_haisho.jpg/960px-Suwa-taisha%2C_Kamisha_Maemiya%2C_haisho.jpg',deity:'八坂刀売神',addr:'長野県茅野市宮川2030',loc:'長野県茅野市',move:'約5分',benefit:'生命力・水の恵み',lat:35.9911,lng:138.1334},
        {name:'諏訪大社 下社秋宮',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Suwa-taisha%2C_Shimosha_Akimiya%2C_heihaiden.jpg/960px-Suwa-taisha%2C_Shimosha_Akimiya%2C_heihaiden.jpg',deity:'建御名方神・八坂刀売神',addr:'長野県諏訪郡下諏訪町5828',loc:'長野県下諏訪町',move:'約20分',benefit:'家内安全・縁結び',lat:36.0749,lng:138.0903},
        {name:'諏訪大社 下社春宮',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/%E8%AB%8F%E8%A8%AA%E5%A4%A7%E7%A4%BE%E4%B8%8B%E7%A4%BE%E6%98%A5%E5%AE%AE_-_panoramio.jpg/960px-%E8%AB%8F%E8%A8%AA%E5%A4%A7%E7%A4%BE%E4%B8%8B%E7%A4%BE%E6%98%A5%E5%AE%AE_-_panoramio.jpg',deity:'建御名方神・八坂刀売神',addr:'長野県諏訪郡下諏訪町193',loc:'長野県下諏訪町',move:'約5分',benefit:'子授け・安産',lat:36.0818,lng:138.0819}
      ]
    },
    {
      id:'r6', name:'戸隠神社 五社巡り', emoji:'⛰',
      transport:'車', time:'約6時間', totalMove:'総移動時間 約2時間',
      desc:'天照大御神が隠れた天岩戸が飛来して山になった——そんな神話を持つ戸隠山の麓、五社を順に参る巡拝です。天岩戸を開いた力の神、舞を舞った芸能の神など、岩戸開き神話の神々が勢ぞろい。クライマックスは樹齢400年超の杉並木が続く約2kmの奥社参道。歩き切った先に開運の気が待っています',
      tags:['天岩戸神話','杉並木'],
      cardDesc:'天岩戸神話の五社を麓から<br>奥社へ。杉並木の神域歩き',
      cardTag:'杉並木', cardImg: IMG[5],
      spots:[
        {name:'戸隠神社 宝光社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/%E6%88%B8%E9%9A%A0%E7%A5%9E%E7%A4%BE%E5%AE%9D%E5%85%89%E7%A4%BE_%E7%A4%BE%E6%AE%BF.jpg/960px-%E6%88%B8%E9%9A%A0%E7%A5%9E%E7%A4%BE%E5%AE%9D%E5%85%89%E7%A4%BE_%E7%A4%BE%E6%AE%BF.jpg',deity:'天表春命',addr:'長野県長野市戸隠2110',loc:'長野県長野市',move:'出発地から約50分',benefit:'女性守護・技芸上達',lat:36.7324,lng:138.0759},
        {name:'戸隠神社 火之御子社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/%E6%88%B8%E9%9A%A0%E7%A5%9E%E7%A4%BE%E7%81%AB%E4%B9%8B%E5%BE%A1%E5%AD%90%E7%A4%BE_%E7%A4%BE%E6%AE%BF.jpg/960px-%E6%88%B8%E9%9A%A0%E7%A5%9E%E7%A4%BE%E7%81%AB%E4%B9%8B%E5%BE%A1%E5%AD%90%E7%A4%BE_%E7%A4%BE%E6%AE%BF.jpg',deity:'天鈿女命',addr:'長野県長野市戸隠2410',loc:'長野県長野市',move:'約3分',benefit:'舞楽芸能・縁結び',lat:36.7372,lng:138.0797},
        {name:'戸隠神社 中社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/%E6%88%B8%E9%9A%A0%E7%A5%9E%E7%A4%BE%E4%B8%AD%E7%A4%BE_%E7%A4%BE%E6%AE%BF.jpg/960px-%E6%88%B8%E9%9A%A0%E7%A5%9E%E7%A4%BE%E4%B8%AD%E7%A4%BE_%E7%A4%BE%E6%AE%BF.jpg',deity:'天八意思兼命',addr:'長野県長野市戸隠3506',loc:'長野県長野市',move:'約5分',benefit:'学業成就・商売繁盛',lat:36.7425,lng:138.0850},
        {name:'戸隠神社 九頭龍社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/%E6%88%B8%E9%9A%A0%E7%A5%9E%E7%A4%BE_%E4%B9%9D%E9%A0%AD%E9%BE%8D%E7%A4%BE.jpg/960px-%E6%88%B8%E9%9A%A0%E7%A5%9E%E7%A4%BE_%E4%B9%9D%E9%A0%AD%E9%BE%8D%E7%A4%BE.jpg',deity:'九頭龍大神',addr:'長野県長野市戸隠（奥社参道内）',loc:'長野県長野市',move:'車約10分＋徒歩約40分',benefit:'水の恵み・縁結び',lat:36.7654,lng:138.0622},
        {name:'戸隠神社 奥社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/%E6%88%B8%E9%9A%A0%E7%A5%9E%E7%A4%BE%E5%A5%A5%E7%A4%BE.jpg/960px-%E6%88%B8%E9%9A%A0%E7%A5%9E%E7%A4%BE%E5%A5%A5%E7%A4%BE.jpg',deity:'天手力雄命',addr:'長野県長野市戸隠3690',loc:'長野県長野市',move:'徒歩約2分',benefit:'開運・心願成就',lat:36.7657,lng:138.0625}
      ]
    },
    {
      id:'r7', name:'秩父三社巡り', emoji:'🐺',
      transport:'車', time:'約7時間', totalMove:'総移動時間 約1時間50分',
      desc:'学問と開運の秩父神社、日本武尊を山火事から救った神犬伝説が残る宝登山神社、そして標高1,100mの雲上に鎮まる関東屈指のパワースポット・三峯神社。オオカミを神様のお使いとする珍しい信仰が今も息づく秩父の山々を巡り、心身を研ぎ澄ます一日です',
      tags:['オオカミ信仰','関東屈指の気'],
      cardDesc:'オオカミ信仰が息づく<br>秩父の霊気に触れる三社',
      cardTag:'霊気', cardImg: IMG[6],
      spots:[
        {name:'秩父神社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Chichibu-jinja_ac_%284%29.jpg/960px-Chichibu-jinja_ac_%284%29.jpg',deity:'八意思兼命・知知夫彦命',addr:'埼玉県秩父市番場町1-3',loc:'埼玉県秩父市',move:'出発地から約5分',benefit:'学業成就・開運',lat:35.9976,lng:139.0842},
        {name:'宝登山神社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Hodosan_Shrine_%28Mt._Treasure-climb_Shrine%29_-_%E5%AE%9D%E7%99%BB%E5%B1%B1%E7%A5%9E%E7%A4%BE_-_panoramio_%2813%29.jpg/960px-Hodosan_Shrine_%28Mt._Treasure-climb_Shrine%29_-_%E5%AE%9D%E7%99%BB%E5%B1%B1%E7%A5%9E%E7%A4%BE_-_panoramio_%2813%29.jpg',deity:'神日本磐余彦尊・大山祗神・火産霊神',addr:'埼玉県秩父郡長瀞町長瀞1828',loc:'埼玉県長瀞町',move:'約25分',benefit:'火防・金運',lat:36.0933,lng:139.1031},
        {name:'三峯神社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Mitsumine-jinja%2C_Haiden.jpg/960px-Mitsumine-jinja%2C_Haiden.jpg',deity:'伊弉諾尊・伊弉册尊',addr:'埼玉県秩父市三峰298-1',loc:'埼玉県秩父市',move:'約1時間20分',benefit:'厄除け・心願成就',lat:35.9257,lng:138.9298}
      ]
    },
    {
      id:'r8', name:'京都 五社巡り', emoji:'🏮',
      transport:'電車', time:'約7時間', totalMove:'総移動時間 約2時間40分',
      desc:'平安京は、四方を聖なる獣が守る「四神相応」の地に築かれました。北の玄武・上賀茂神社、西の白虎・松尾大社、南の朱雀・城南宮、東の青龍・八坂神社、そして中央の平安神宮。千年の都を守り続ける結界を一日で巡る「京都五社めぐり」です。専用色紙に御朱印を集める楽しみも',
      tags:['四神相応','専用色紙あり'],
      cardDesc:'平安京を守る四神の社と<br>平安神宮。千年の都の結界',
      cardTag:'色紙巡拝', cardImg: IMG[7],
      spots:[
        {name:'上賀茂神社（北・玄武）',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Kamo-wakeikazuchi-jinja18n4272.jpg/960px-Kamo-wakeikazuchi-jinja18n4272.jpg',deity:'賀茂別雷大神',addr:'京都市北区上賀茂本山339',loc:'京都市北区',move:'出発地から約40分',benefit:'厄除け・雷除け',lat:35.0605,lng:135.7523},
        {name:'松尾大社（西・白虎）',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Matsunoo-taisha_honden-1.JPG/960px-Matsunoo-taisha_honden-1.JPG',deity:'大山咋神・市杵島姫命',addr:'京都市西京区嵐山宮町3',loc:'京都市西京区',move:'約40分',benefit:'醸造守護・開運',lat:35.0002,lng:135.6853},
        {name:'城南宮（南・朱雀）',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Jonangu_shrine.jpg/960px-Jonangu_shrine.jpg',deity:'国常立尊・八千矛神・息長帯日売尊',addr:'京都市伏見区中島鳥羽離宮町7',loc:'京都市伏見区',move:'約35分',benefit:'方除け・旅行安全',lat:34.9506,lng:135.7470},
        {name:'八坂神社（東・青龍）',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/JP-Kyoto-yasaka.JPG/960px-JP-Kyoto-yasaka.JPG',deity:'素戔嗚尊',addr:'京都市東山区祇園町北側625',loc:'京都市東山区',move:'約30分',benefit:'厄除け・美容',lat:35.0036,lng:135.7783},
        {name:'平安神宮（中央）',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Heian-jingu%2C_keidai-1.jpg/960px-Heian-jingu%2C_keidai-1.jpg',deity:'桓武天皇・孝明天皇',addr:'京都市左京区岡崎西天王町97',loc:'京都市左京区',move:'約15分',benefit:'開運招福・縁結び',lat:35.0161,lng:135.7829}
      ]
    },
    {
      id:'r9', name:'富士山麓両参り', emoji:'🗻',
      transport:'車', time:'約2時間30分', totalMove:'総移動時間 約15分',
      desc:'富士山の噴火を鎮めるため約1,900年前に創建されたと伝わる北口本宮冨士浅間神社。富士講の登拝門の先には、美の女神・木花開耶姫命が鎮まります。あわせて参るのは、日本三大金運神社に数えられる新屋山神社。霊峰のご神気と金運、両方をいただく実りの多い両参りです',
      tags:['金運日本一','富士のご神気'],
      cardDesc:'霊峰のご神気と日本三大<br>金運神社を短時間で両参り',
      cardTag:'金運', cardImg: IMG[8],
      spots:[
        {name:'北口本宮冨士浅間神社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Kitaguchi_Hongu_Fuji_Sengen_jinja_Torii.jpg/960px-Kitaguchi_Hongu_Fuji_Sengen_jinja_Torii.jpg',deity:'木花開耶姫命・彦火瓊瓊杵尊・大山祗神',addr:'山梨県富士吉田市上吉田5558',loc:'山梨県富士吉田市',move:'出発地から約5分',benefit:'開運・安産・火防',lat:35.4710,lng:138.7926},
        {name:'新屋山神社',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Arayayamashrine.jpg/960px-Arayayamashrine.jpg',deity:'大山祗大神',addr:'山梨県富士吉田市新屋1230',loc:'山梨県富士吉田市',move:'約10分',benefit:'金運・商売繁盛',lat:35.4668,lng:138.7973}
      ]
    },
    {
      id:'r10', name:'筑波山神社 両参り', emoji:'💞',
      transport:'徒歩', time:'約4時間30分', totalMove:'総移動時間 約1時間45分',
      desc:'「西の富士、東の筑波」と並び称される霊峰筑波山は、山そのものがご神体。男体山にはイザナギ、女体山にはイザナミ、夫婦二柱の神様が鎮まります。麓の拝殿からそれぞれの山頂御本殿へ登拝する両参りは、万葉の昔から続く縁結び・夫婦円満の祈りの道。山頂からの関東平野の大パノラマもご褒美です',
      tags:['縁結び','登拝'],
      cardDesc:'男体山と女体山、二柱の<br>御本殿を参る縁結び登拝',
      cardTag:'縁結び', cardImg: IMG[9],
      spots:[
        {name:'筑波山神社（拝殿）',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Tsukubasan-jinja_haiden.JPG/960px-Tsukubasan-jinja_haiden.JPG',deity:'筑波男大神・筑波女大神',addr:'茨城県つくば市筑波1',loc:'茨城県つくば市',move:'出発地からバス約40分',benefit:'縁結び・夫婦和合',lat:36.2131,lng:140.1013},
        {name:'筑波山神社 男体山御本殿',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Tsukubasan-jinja_nantaisan-honden.JPG/960px-Tsukubasan-jinja_nantaisan-honden.JPG',deity:'伊弉諾尊',addr:'茨城県つくば市（男体山山頂）',loc:'茨城県つくば市',move:'ケーブルカー約8分＋徒歩約15分',benefit:'開運・国土安寧',lat:36.2258,lng:140.0984},
        {name:'筑波山神社 女体山御本殿',photo:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Tsukubasan-jinja_nyotaisan-honden.JPG/960px-Tsukubasan-jinja_nyotaisan-honden.JPG',deity:'伊弉册尊',addr:'茨城県つくば市（女体山山頂）',loc:'茨城県つくば市',move:'徒歩約40分',benefit:'縁結び・良縁成就',lat:36.2255,lng:140.1066}
      ]
    }
  ];

  // ── ① アプリ本体のルートデータを10ルートに差し替え ──
  window.AI_ROUTES = R;

  // 神社名 → 写真 の対応表（写真が空欄のとき用の仮画像）
  var PHOTO_BY_NAME = {};
  R.forEach(function(r){
    r.spots.forEach(function(s){ PHOTO_BY_NAME[s.name] = s.photo || r.cardImg; });
  });

  // 空のままの写真に仮画像を入れる（APIキーがあれば後から本物の写真で上書きされます）
  function fillEmptyPhotos(){
    document.querySelectorAll('img[data-shrine]').forEach(function(img){
      var empty = !img.getAttribute('src');
      if (!empty) return;
      var name = img.getAttribute('data-shrine');
      if (PHOTO_BY_NAME[name]) img.src = PHOTO_BY_NAME[name];
    });
  }

  // ── ② 固定ルート表示の改良（社数カット防止・交通手段表示・写真埋め） ──
  var origRender = window.renderRouteCards;
  if (typeof origRender === 'function') {
    window.renderRouteCards = function(){
      if (!window._aiQuery && !window._dynamicRoutes) { window._dynamicRoutes = R; }
      origRender();
      if (window._dynamicRoutes === R) {
        R.forEach(function(r){
          var img = document.getElementById('aiRouteImg_' + r.id);
          if (!img) return;
          var card = img.closest('.ai-rcard');
          if (!card) return;
          var chip = card.querySelector('.ai-rcard-hero-chip');
          if (chip) {
            var ic = r.transport === '徒歩' ? '🚶' : r.transport === '車' ? '🚗' : r.transport === 'バス' ? '🚌' : '🚃';
            chip.textContent = ic + ' ' + r.transport;
          }
        });
      }
      fillEmptyPhotos();
    };
  }

  // ── ③ 神社写真タップで詳細ページが「手前に」正しい情報で開くようにする ──
  var SPOT_BY_NAME = {};
  R.forEach(function(r){ r.spots.forEach(function(s){ SPOT_BY_NAME[s.name] = s; }); });
  var origOpenSpot = window.openSpotDetail;
  if (typeof origOpenSpot === 'function') {
    window.openSpotDetail = function(name){
      var found = null;
      if (typeof SHRINES !== 'undefined') {
        found = SHRINES.find(function(s){ return s.name === name || s.name.indexOf(name) >= 0 || name.indexOf(s.name) >= 0; });
      }
      var mine = SPOT_BY_NAME[name];
      if (!found && mine && typeof openShrineDetail === 'function') {
        // アプリのデータベースに無い神社は、ルートデータの情報（主祭神・住所）で表示
        openShrineDetail({
          name: name,
          deity: mine.deity || '御祭神',
          addr: mine.addr || (mine.loc || ''),
          map: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(name),
          area: '', rating: 0, rev: 0, visited: false,
          tags: [], badges: []
        });
      } else {
        origOpenSpot(name);
      }
      var sd = document.getElementById('pgShrineDetail');
      if (sd) sd.style.zIndex = '300'; // ルート一覧(110)より手前に
    };
  }

  // ── ④ カードをタップしたら、ローディング画面なしで即ルート一覧へ ──
  window.wabiOpenRoute = function(rid){
    window._aiQuery = null;
    window._dynamicRoutes = R;
    var pg = document.getElementById('pgAiRouteList');
    if (pg) pg.classList.add('show');
    if (typeof window.renderRouteCards === 'function') window.renderRouteCards();
    setTimeout(function(){
      var img = document.getElementById('aiRouteImg_' + rid);
      if (img) {
        var card = img.closest('.ai-rcard');
        if (card) card.scrollIntoView({behavior:'auto', block:'start'});
      }
    }, 100);
  };

  // ── ⑤ トップの「おすすめ巡拝ルート」カードを10件に作り替え ──
  var scroll = document.querySelector('.ai-preview-scroll');
  if (scroll) {
    var h = '';
    R.forEach(function(r){
      h += '<div class="apc" onclick="wabiOpenRoute(\'' + r.id + '\')">' +
        '<img class="apc-img" src="' + r.cardImg + '" alt="' + r.name + '" loading="lazy">' +
        '<div class="apc-body">' +
          '<div class="apc-name">' + r.emoji + ' ' + r.name + '</div>' +
          '<div class="apc-desc">' + r.cardDesc + '</div>' +
          '<div class="apc-tags">' +
            '<span class="apc-tag">⏱ ' + r.time + '</span>' +
            '<span class="apc-tag red">⛩ ' + r.spots.length + '社</span>' +
            '<span class="apc-tag gold">✦ ' + r.cardTag + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    });
    scroll.innerHTML = h;
  }

  // ── ⑥ 「3つのルートを比較して…」の文言を修正 ──
  var sub = document.querySelector('.ai-list-sub');
  if (sub) sub.textContent = '10のルートを比較して、あなたにぴったりの巡拝を選べます';

  // ── ⑦ 神社名を入力しないと「AIがおすすめルートを作成」を押せないようにする ──
  var heroInput = document.getElementById('heroSearchInput');
  var heroBtn = document.querySelector('.hero-search-cta');
  if (heroInput && heroBtn) {
    var syncHeroBtn = function(){
      var ok = heroInput.value.trim().length > 0;
      heroBtn.disabled = !ok;
      heroBtn.style.opacity = ok ? '' : '0.45';
      heroBtn.style.cursor = ok ? '' : 'not-allowed';
    };
    heroInput.addEventListener('input', syncHeroBtn);
    syncHeroBtn();
  }

  // ── ⑧ 「このルートを選ぶ」→ Googleマップで経路を開く ──
  window.selectRoute = function(rid){
    var routes = window._dynamicRoutes || window.AI_ROUTES;
    var route = routes.find(function(r){ return r.id === rid; });
    if (!route) route = window.AI_ROUTES.find(function(r){ return r.id === rid; });
    if (!route || !route.spots || !route.spots.length) return;
    // カッコ書きを除いた神社名で経路を組み立てる
    var names = route.spots.map(function(s){ return String(s.name).replace(/[（(].*$/, '').trim(); });
    var url;
    if (names.length === 1) {
      url = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(names[0]);
    } else {
      var mode = route.transport === '徒歩' ? 'walking'
               : (route.transport === '電車' || route.transport === 'バス') && names.length === 2 ? 'transit'
               : 'driving'; // 経由地ありは乗換案内非対応のため車モードで開く
      url = 'https://www.google.com/maps/dir/?api=1'
          + '&origin=' + encodeURIComponent(names[0])
          + '&destination=' + encodeURIComponent(names[names.length - 1])
          + (names.length > 2 ? '&waypoints=' + encodeURIComponent(names.slice(1, -1).join('|')) : '')
          + '&travelmode=' + mode;
    }
    window.open(url, '_blank');
  };

  // ── ⑨ ランキングカードは写真・御朱印どこを押しても詳細ページへ ──
  document.addEventListener('click', function(ev){
    var card = ev.target.closest ? ev.target.closest('.rcard') : null;
    if (!card) return;
    var el = ev.target;
    while (el && el !== card) {
      // 独自の動きを持つ要素（住所リンク・御朱印登録ボタンなど）はそのまま生かす
      if (el.tagName === 'A' || el.tagName === 'BUTTON' || (el.getAttribute && el.getAttribute('onclick'))) return;
      el = el.parentElement;
    }
    var rn = card.querySelector('.rname');
    if (rn) rn.click();
  });

  // ── ⑩ 詳細ページのトップ画像を少し縦長（4:3）にする ──
  var wabiCss = document.createElement('style');
  wabiCss.textContent = '.sd-hero{flex:0 0 auto !important;min-height:calc(min(100vw, 500px) * 0.75) !important;aspect-ratio:4 / 3 !important;}\n.sd-hero img{width:100%;height:100%;object-fit:cover;}'
    // iPhoneで入力欄タップ時に画面が拡大されるのを防ぐ（文字16px未満だとiOSが自動ズームするため）
    + '\ninput, textarea, select{font-size:16px !important;}';
  document.head.appendChild(wabiCss);

  // ── ⑫ 公開用APIキー（訪問者全員が神社の写真を見られるようにする）──
  // 下の '' の中にGoogleのAPIキーを貼り付けてください。
  // ※必ずGoogle Cloud側で「HTTPリファラー制限: https://marunavi.github.io/*」を設定してから貼ること
  var WABI_PUBLIC_API_KEY = 'AIzaSyBhItwVQYblQTxo92oWeXuskQW-JYipgCk';
  if (WABI_PUBLIC_API_KEY) {
    try {
      localStorage.setItem('gplaces_key', WABI_PUBLIC_API_KEY);
      API_KEY = WABI_PUBLIC_API_KEY;
      if (typeof showAppliedBar === 'function') showAppliedBar();
      if (typeof filter === 'function') filter();
    } catch(e){}
  }

  // ── ⑪ 詳細ページ：トップ画像の下に「別アングル写真＋御朱印」を2枚並べる ──
  function wabiAltPhoto(name){
    var trim = String(name).replace(/[（(].*$/,'').trim();
    return (window.sdCurrentPhotos && window.sdCurrentPhotos[1])
        || PHOTO_BY_NAME[name] || PHOTO_BY_NAME[trim]
        || (window.sdCurrentPhotos && window.sdCurrentPhotos[0]) || '';
  }
  var origPopulate = window.populateShrineDetail;
  if (typeof origPopulate === 'function') {
    window.populateShrineDetail = function(s){
      origPopulate(s);
      try {
        var hero = document.getElementById('sdHero');
        if (!hero) return;
        var old = document.getElementById('wabiSdDuo');
        if (old) old.remove();
        var duo = document.createElement('div');
        duo.id = 'wabiSdDuo';
        duo.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:10px 16px 4px;';
        var anchor = document.getElementById('sdThumbs') || hero;
        anchor.insertAdjacentElement('afterend', duo);
        // ① 神社の別アングル写真
        var alt = wabiAltPhoto(s.name);
        var c1 = document.createElement('div');
        if (alt) {
          var liIdx = window.sdCurrentPhotos ? window.sdCurrentPhotos.indexOf(alt) : -1;
          c1.innerHTML = '<img src="' + alt + '" loading="lazy" style="width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:10px;display:block' + (liIdx > -1 ? ';cursor:pointer' : '') + '"' + (liIdx > -1 ? ' onclick="openLightbox(' + liIdx + ')"' : '') + '>';
        } else { c1.style.display = 'none'; }
        duo.appendChild(c1);
        // ② 御朱印（あれば表示、なければ募集中）
        var c2 = document.createElement('div');
        duo.appendChild(c2);
        var name = s.name;
        if (typeof resolveGoshuin === 'function') resolveGoshuin(name);
        var tries = 0;
        (function poll(){
          if (!document.getElementById('wabiSdDuo')) return;
          var v = (typeof goshuinFileCache !== 'undefined') ? goshuinFileCache[name] : undefined;
          if (typeof v === 'string' && v !== '__loading') {
            c2.innerHTML = '<div style="position:relative;background:#fff;border:1px solid #c9a84c;border-radius:10px;overflow:hidden">'
              + '<img src="' + v + '" loading="lazy" style="width:100%;aspect-ratio:1/1;object-fit:contain;display:block;background:#fff">'
              + '<span style="position:absolute;top:6px;left:6px;background:#a83320;color:#fff;font-size:10px;padding:2px 10px;border-radius:12px;font-family:\'Shippori Mincho\',serif">御朱印</span></div>';
            return;
          }
          if (v === false || tries > 16) {
            c2.innerHTML = (typeof goshuinPH === 'function') ? goshuinPH(name) : '';
            var im = c2.querySelector('img'); if (im) im.style.aspectRatio = '1/1';
            return;
          }
          tries++; setTimeout(poll, 250);
        })();
      } catch(e){}
    };
  }
})();

/* ══════════════════════════════════════════════════════════════
   ナビの出発地を「ルートの1番目の社」に固定する
   （2026-09-01 / concierge.js は触らず、この小さいファイルから上書き）

   ★何が起きていたか★
   これまでナビのURLは、出発地を神社の「名前（文字列）」で渡していた。
   Googleマップは名前から場所を特定できなかったとき、
   **黙って出発地を利用者の現在地に置き換える**。
   これが「最初に指定した神社からではなく、今いる場所から案内される」原因。

   ★直し方★
   出発地・経由地・目的地を、可能なかぎり「緯度,経度」で渡す。
   数字なので取り違えようがなく、現在地に化けることもない。
   座標が分からない地点だけ、これまでどおり名前で渡す。
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiNavFix) return;
  window.__wabiNavFix = true;

  function clean(s){ return String(s || '').replace(/[（(].*$/, '').trim(); }

  // 画面に出ている可能性のあるルートを全部集める
  function allRoutes(){
    var out = [];
    try { if (Array.isArray(window._dynamicRoutes)) out = out.concat(window._dynamicRoutes); } catch(e){}
    try { if (Array.isArray(window.AI_ROUTES))      out = out.concat(window.AI_ROUTES); } catch(e){}
    return out;
  }

  // いま画面に出ているルート（1番目の社の名前から突き止める）
  var currentRoute = null;
  function setCurrentRoute(firstName){
    var n = clean(firstName), rs = allRoutes();
    currentRoute = null;
    for (var i = 0; i < rs.length; i++){
      var sp = rs[i] && rs[i].spots && rs[i].spots[0];
      if (sp && clean(sp.name) === n) { currentRoute = rs[i]; return; }
    }
  }

  // 名前から座標を探す
  //   ① いま開いているルート → 他のルート  ② 全国の座標表 SHRINE_COORDS
  // いずれも**完全一致だけ**。見つかれば「緯度,経度」を返す。
  function coordOf(name){
    var n = clean(name);
    if (!n) return null;
    var i, j;

    // ① ルートのデータ（Placesで取った正確な座標が入っている）
    //
    // ★ここも完全一致だけにする★
    //   以前は部分一致も採っていたため、「伊勢神宮（内宮）」を探しているのに
    //   別のルートの「伊勢神宮 外宮」を掴んで、出発地が入れ替わってしまっていた。
    //   さらに、いま開いているルートを最優先で見る。
    var rs = allRoutes();
    if (currentRoute && currentRoute.spots) rs = [currentRoute].concat(rs);
    for (i = 0; i < rs.length; i++){
      var spots = (rs[i] && rs[i].spots) || [];
      for (j = 0; j < spots.length; j++){
        var sp = spots[j];
        if (!sp) continue;
        if (typeof sp.lat !== 'number' || typeof sp.lng !== 'number') continue;
        if (clean(sp.name) === n) return sp.lat + ',' + sp.lng;
      }
    }

    // ② 全国の座標表（index.html の SHRINE_COORDS）
    //
    // ★以前は部分一致も採っていたが、これが事故のもとだった★
    //   例：「大神宮」→「東京大神宮」（東京）を掴んでしまい、
    //   伊勢のルートが関東まで伸びる、ということが起きる。
    //   なので**完全一致だけ**にする。
    try {
      if (typeof SHRINE_COORDS !== 'undefined' && SHRINE_COORDS){
        var keys = Object.keys(SHRINE_COORDS), k, c;
        for (i = 0; i < keys.length; i++){
          k = clean(keys[i]);
          if (k && k === n) { c = SHRINE_COORDS[keys[i]]; return c.lat + ',' + c.lng; }
        }
      }
    } catch(e){}

    return null;
  }

  // 2地点の距離（km）
  function distKm(a, b){
    if (!a || !b) return 0;
    var p = a.split(','), q = b.split(',');
    var la1 = +p[0], ln1 = +p[1], la2 = +q[0], ln2 = +q[1];
    if (!isFinite(la1) || !isFinite(la2)) return 0;
    var R = 6371, dLa = (la2-la1)*Math.PI/180, dLn = (ln2-ln1)*Math.PI/180;
    var x = Math.sin(dLa/2)*Math.sin(dLa/2)
          + Math.cos(la1*Math.PI/180)*Math.cos(la2*Math.PI/180)*Math.sin(dLn/2)*Math.sin(dLn/2);
    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
  }

  // 1番目の社から遠すぎる地点は、拾い間違いとみなして捨てる
  var MAX_KM = 120;
  function sane(base, pt){
    if (!base || !pt) return true;
    if (!/^[-\d.]+,[-\d.]+$/.test(pt) || !/^[-\d.]+,[-\d.]+$/.test(base)) return true;
    return distKm(base, pt) <= MAX_KM;
  }

  // 住所を「都道府県＋市区町村」までに切り詰める（例：三重県伊勢市）
  function trimArea(v){
    var t = String(v || '').replace(/^日本[、,]?\s*/, '').replace(/〒[\d-]+\s*/, '').trim();
    var m = t.match(/^(.{2,3}[都道府県].{1,6}?[市区町村郡])/);
    if (m) return m[1];
    m = t.match(/^(.{2,3}[都道府県])/);
    if (m) return m[1];
    return t.replace(/\d.*$/, '').trim();
  }

  // 出発地の「地域」を取り出す（例：三重県伊勢市）。
  // 座標が分からない店などに付けて、遠くの同名店を掴まないようにする。
  function areaOf(firstName){
    var n = clean(firstName), rs = allRoutes(), i, j;
    for (i = 0; i < rs.length; i++){
      var spots = (rs[i] && rs[i].spots) || [];
      for (j = 0; j < spots.length; j++){
        if (spots[j] && clean(spots[j].name) === n) {
          var v = spots[j].loc || spots[j].addr || '';
          if (v) return trimArea(v);
        }
      }
    }
    try {
      if (typeof SHRINES !== 'undefined' && SHRINES){
        for (i = 0; i < SHRINES.length; i++){
          if (clean(SHRINES[i].name) === n && SHRINES[i].addr) return trimArea(SHRINES[i].addr);
        }
      }
    } catch(e){}
    return '';
  }

  // 座標が分からないときの「せめてもの手当て」。
  // 名前だけだと、Googleが同じ名前の別のお寺を掴んでしまう。
  // 住所が分かるならくっつけて、場所を絞り込む。
  function nameWithPlace(name){
    var n = clean(name);
    try {
      if (typeof SHRINES !== 'undefined' && SHRINES){
        // ★完全一致だけ★（部分一致だと別の県の同名社の住所が付いてしまう）
        for (var i = 0; i < SHRINES.length; i++){
          if (clean(SHRINES[i] && SHRINES[i].name) === n && SHRINES[i].addr)
            return n + ' ' + SHRINES[i].addr;
        }
      }
    } catch(e){}
    return n;
  }

  // 1番目の社の名前から、そのルートの交通手段を割り出す
  function transportOf(firstName){
    var n = clean(firstName), rs = allRoutes();
    for (var i = 0; i < rs.length; i++){
      var sp = rs[i] && rs[i].spots && rs[i].spots[0];
      if (sp && clean(sp.name) === n) return rs[i].transport || '';
    }
    return '';
  }
  function travelMode(t){
    if (t === '徒歩') return 'walking';
    if (t === '電車' || t === 'バス') return 'transit';
    return 'driving';
  }

  // 地点の並びからGoogleマップのURLを組み立てる
  function buildUrl(points, transport){
    var p = (points || []).filter(Boolean);
    if (!p.length) return null;
    if (p.length === 1) {
      return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(p[0]);
    }
    var u = 'https://www.google.com/maps/dir/?api=1'
          + '&origin=' + encodeURIComponent(p[0])
          + '&destination=' + encodeURIComponent(p[p.length - 1])
          + '&travelmode=' + travelMode(transport);
    var way = p.slice(1, -1).slice(0, 9);          // Googleの経由地は最大9つ
    if (way.length) u += '&waypoints=' + way.map(encodeURIComponent).join('%7C');
    return u;
  }

  // 名前の並び → Googleに渡す地点の並び
  //   ・座標が分かればそれを使う
  //   ・1番目から遠すぎる座標は捨てる（拾い間違いよけ）
  //   ・座標が無いものは「名前＋地域」にして、遠くの同名店を掴まないようにする
  function resolvePoints(names){
    setCurrentRoute(names[0]);
    var base = coordOf(names[0]) || '';
    var area = areaOf(names[0]);
    return names.map(function(nm, i){
      var c = coordOf(nm);
      if (c && (i === 0 || sane(base, c))) return c;
      var withPlace = nameWithPlace(nm);
      if (withPlace !== clean(nm)) return withPlace;      // 住所が付いた
      return area ? (clean(nm) + ' ' + area) : clean(nm); // 地域名を足す
    });
  }
  window.resolvePointsPublic = resolvePoints;

  // ── ① カスタマイズ済みルートの「このルートでナビを開始」 ──
  function bindNavi(){
    var btn = document.getElementById('wcNavi');
    if (!btn) return;
    btn.setAttribute('data-wapx', '1');     // concierge.js 側の上書きを止める
    btn.onclick = function(){
      var names = [].map.call(
        document.querySelectorAll('#wcPrevBody .wc-tl-nm'),
        function(n){ return String(n.textContent).trim(); }
      ).filter(Boolean);
      if (!names.length) return;
      var pts = resolvePoints(names);
      var url = buildUrl(pts, transportOf(names[0]));
      if (url) window.open(url, '_blank');
    };
  }

  // ── ② ルート詳細ページの「このルートを作成」 ──
  function bindSelect(){
    var btn = document.getElementById('wrpSelect');
    if (!btn) return;
    btn.onclick = function(){
      var names = [].map.call(
        document.querySelectorAll('#wabiRoutePg .wrp-spot .wrp-spot-nm, #wabiRoutePg .wrp-spot-nm'),
        function(n){ return String(n.textContent).trim(); }
      ).filter(Boolean);
      if (!names.length) {
        // 画面から拾えないときは、開いているルートのデータから組み立てる
        var rs = allRoutes();
        for (var i = 0; i < rs.length; i++){
          if (rs[i] && rs[i].spots && rs[i].spots.length) { names = rs[i].spots.map(function(s){ return s.name; }); break; }
        }
      }
      if (!names.length) return;
      var pts = resolvePoints(names);
      var url = buildUrl(pts, transportOf(names[0]));
      if (url) window.open(url, '_blank', 'noopener');
    };
  }

  // 他の処理からも使えるように公開する（保存したルートの画面が使う）
  window.coordOfPublic = coordOf;
  window.navUrlPublic  = buildUrl;
  window.nameWithPlacePublic = nameWithPlace;

  // プレビューは開くたびに中身が作り直されるので、短い間隔で貼り直す
  function apply(){ try { bindNavi(); bindSelect(); } catch(e){} }
  apply();
  setInterval(apply, 150);
})();

/* ══════════════════════════════════════════════════════════════
   下部メニュー（ホーム／マップ／みんなの投稿／マイページ）が
   AIルートの画面で効かなくなる問題の修正
   （2026-09-01）

   ★何が起きていたか★
   下部メニューを押すと concierge.js の closeAll() が走り、
   開いている画面を閉じてからホームやマップへ移動する。
   ところがその「閉じる対象の一覧」に
     ・pgAiRouteList（ルート提案ページ）
     ・pgAiLoading（作成中の画面）
     ・pgRouteMap ／ wcPrev ／ wcSpot ／ wcTheme
   が入っていなかった。
   そのためページが前面に残り続け、**押しても何も起きないように見えていた**。

   ★もうひとつの落とし穴★
   closeAll() は style.display='none' を直接書き込む。
   これらの画面は class="show" で表示する作りなので、
   一度 display:none を書かれると class を付け直しても開かなくなる。
   そこで、閉じるときは class を外し、display は空に戻す。
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiNavClose) return;
  window.__wabiNavClose = true;

  // class="show" で開く画面（.ai-ov）
  var SHOW_PAGES = ['pgAiRouteList', 'pgAiLoading', 'pgRouteMap'];
  // style.display で開く画面
  var DISP_PAGES = ['wcPrev', 'wcSpot', 'wcTheme', 'wabiRoutePg'];

  function closeAiPages(){
    SHOW_PAGES.forEach(function(id){
      var el = document.getElementById(id);
      if (!el) return;
      el.classList.remove('show');
      el.style.display = '';          // 直接書かれた none を消す（また開けるように）
    });
    DISP_PAGES.forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }
  window.wabiCloseAiPages = closeAiPages;

  // 下部メニューが押された瞬間に、concierge.js 側の処理より先に閉じる
  document.addEventListener('click', function(ev){
    try {
      var t = ev.target;
      if (!t || !t.closest) return;
      if (!t.closest('#wabiNav .wn')) return;
      closeAiPages();
    } catch(e){}
  }, true);   // true＝先に走らせる

  // 過去に display:none を書き込まれて開かなくなっている場合の復旧
  setInterval(function(){
    try {
      SHOW_PAGES.forEach(function(id){
        var el = document.getElementById(id);
        // 「開く指示（show）は出ているのに、直接 none が書かれている」状態を直す
        if (el && el.classList.contains('show') && el.style.display === 'none') el.style.display = '';
      });
    } catch(e){}
  }, 300);
})();

/* ══════════════════════════════════════════════════════════════
   マイページに「保存したルート」を追加する
   （2026-09-01 / index.html・concierge.js は触らずここから追加）

   ★これまでの状態★
   ・カスタマイズ済みルート画面の「♡ ルートを保存」
       → 端末の中には記録していたが、**見る画面がどこにも無かった**
   ・AI結果画面の「ルートを保存」
       → 中身が空で、メッセージを出すだけだった

   ここで、保存の中身をきちんと作り、マイページから一覧・ナビ・削除
   ができるようにする。保存先はこの端末の中だけ（localStorage）。
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiSavedRoutes) return;
  window.__wabiSavedRoutes = true;

  var KEY     = 'wabi_saved_routes';   // 新しい保存先
  var OLD_KEY = 'wabi_custom_routes';  // 以前の「♡ ルートを保存」の記録

  function esc(s){
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
  function today(){
    var d = new Date();
    return d.getFullYear() + '.' + ('0'+(d.getMonth()+1)).slice(-2) + '.' + ('0'+d.getDate()).slice(-2);
  }
  function load(){
    var out = [];
    try { var a = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(a)) out = a; } catch(e){}
    // 以前の形式の記録も、見えるように取り込む（一度だけ）
    try {
      var old = JSON.parse(localStorage.getItem(OLD_KEY) || '[]');
      if (Array.isArray(old) && old.length){
        old.forEach(function(o){
          if (!o || !o.name) return;
          if (out.some(function(x){ return x.name === o.name && x.date === (o.date || ''); })) return;
          out.push({ name:o.name, spots:[], added:o.added || [], transport:'', date:(o.date||'').replace(/-/g,'.') });
        });
        localStorage.setItem(KEY, JSON.stringify(out));
        localStorage.removeItem(OLD_KEY);
      }
    } catch(e){}
    return out;
  }
  function save(list){
    try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50))); return true; }
    catch(e){ return false; }
  }
  function add(entry){
    var list = load();
    // 同じ内容が続けて入らないようにする
    var sig = entry.name + '|' + (entry.spots||[]).map(function(s){ return s.name; }).join(',');
    list = list.filter(function(x){
      return (x.name + '|' + (x.spots||[]).map(function(s){ return s.name; }).join(',')) !== sig;
    });
    list.unshift(entry);
    return save(list);
  }
  function toast(m){
    if (typeof showToast === 'function') showToast(m);
    else if (window.WABI_TOAST) window.WABI_TOAST(m);
  }

  // ── 保存する ────────────────────────────────────────────────
  // ① AI結果画面の「ルートを保存」（もともと中身が空だった）
  window.saveRoute = function(){
    try {
      var r = window.currentAiRoute;
      if (!r || !r.stops || !r.stops.length) { toast('保存できるルートがありません'); return; }
      var name = '';
      var t = document.getElementById('aiResultTitle');
      if (t) name = t.textContent.trim();
      if (!name) name = r.stops[0].name + ' からの巡礼';
      var ok = add({
        name: name,
        spots: r.stops.map(function(s){ return { name:s.name, lat:s.lat, lng:s.lng }; }),
        added: [], transport: '', date: today()
      });
      toast(ok ? '♡ マイページに保存しました' : '保存できませんでした（空き容量をご確認ください）');
    } catch(e){ toast('保存できませんでした'); }
  };

  // ② カスタマイズ済みルート画面の「♡ ルートを保存」
  //    画面に並んでいる順番のまま、座標つきで保存し直す
  function bindSave(){
    var btn = document.getElementById('wcSave');
    if (!btn || btn.getAttribute('data-wsv') === '1') return;
    btn.setAttribute('data-wsv', '1');
    btn.onclick = function(){
      try {
        var rows = [].map.call(document.querySelectorAll('#wcPrevBody .wc-tl-nm'),
                               function(n){ return String(n.textContent).trim(); }).filter(Boolean);
        if (!rows.length) { toast('保存できるルートがありません'); return; }
        var title = '';
        var h = document.querySelector('#wcPrevBody .wc-hero-t');
        if (h) title = h.textContent.replace(/\s+/g, ' ').trim();
        if (!title) title = rows[0] + ' からの巡礼';
        var spots = rows.map(function(nm){
          var c = (typeof window.coordOfPublic === 'function') ? window.coordOfPublic(nm) : null;
          var p = c ? c.split(',') : null;
          return p ? { name:nm, lat:+p[0], lng:+p[1] } : { name:nm };
        });
        var ok = add({ name:title, spots:spots, added:[],
                       transport:(window.WABI_ROUTE_TRANSPORT || ''), date:today() });
        toast(ok ? '♡ マイページに保存しました' : '保存できませんでした');
      } catch(e){ toast('保存できませんでした'); }
    };
  }

  // ── 一覧の画面 ──────────────────────────────────────────────
  var css = document.createElement('style');
  css.textContent = [
    '#wabiSaved{position:fixed;inset:0;z-index:2050;background:#FAF8F4;display:none;overflow-y:auto;}',
    '#wabiSaved .sv-hd{position:sticky;top:0;z-index:2;background:rgba(250,248,244,.96);backdrop-filter:blur(8px);',
      'display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid #efe9dd;}',
    '#wabiSaved .sv-hd .b{font-size:22px;width:30px;cursor:pointer;color:#a83320;line-height:1;}',
    '#wabiSaved .sv-hd .t{flex:1;text-align:center;font-size:15px;font-weight:800;letter-spacing:.1em;}',
    '#wabiSaved .sv-in{max-width:500px;margin:0 auto;padding:18px 16px 110px;}',
    '#wabiSaved .sv-h{font-size:19px;font-weight:700;}',
    '#wabiSaved .sv-cnt{font-size:30px;font-weight:800;color:#5D3A7A;margin:2px 0 18px;}',
    '#wabiSaved .sv-cnt small{font-size:14px;margin-left:3px;color:#6F6F6F;}',
    '#wabiSaved .sv-card{background:#fff;border-radius:20px;box-shadow:0 8px 24px rgba(0,0,0,.06);',
      'padding:16px;margin-bottom:14px;}',
    '#wabiSaved .sv-nm{font-size:15px;font-weight:700;line-height:1.5;font-family:"Shippori Mincho",serif;}',
    '#wabiSaved .sv-dt{font-size:11px;color:#b8b2a6;margin-top:4px;}',
    '#wabiSaved .sv-sp{font-size:12.5px;color:#6b6355;line-height:1.9;margin-top:10px;}',
    '#wabiSaved .sv-btns{display:flex;gap:8px;margin-top:14px;}',
    '#wabiSaved .sv-b{flex:1;padding:11px 0;border-radius:12px;border:none;font-size:13px;font-weight:700;',
      'font-family:inherit;cursor:pointer;}',
    '#wabiSaved .sv-go{background:linear-gradient(135deg,#7a5aa8,#5a4470);color:#fff;}',
    '#wabiSaved .sv-del{background:#fff;border:1px solid #e0b0a8;color:#a83320;flex:0 0 92px;}',
    '#wabiSaved .sv-empty{text-align:center;color:#b8b2a6;font-size:13px;line-height:2;padding:50px 10px;}'
  ].join('');
  document.head.appendChild(css);

  var page = document.createElement('div');
  page.id = 'wabiSaved';
  page.innerHTML = '<div class="sv-hd"><div class="b" id="svBack">‹</div>'
    + '<div class="t">保存したルート</div><div style="width:30px"></div></div>'
    + '<div class="sv-in" id="svIn"></div>';
  document.body.appendChild(page);
  page.querySelector('#svBack').onclick = function(){ page.style.display = 'none'; };

  function render(){
    var list = load();
    var h = '<div class="sv-h">保存したルート</div>'
          + '<div class="sv-cnt">' + list.length + '<small>件</small></div>';
    if (!list.length){
      h += '<div class="sv-empty">まだ保存したルートがありません。<br>'
         + 'ルートの画面で「♡ ルートを保存」を押すと<br>ここに並びます。</div>';
    } else {
      h += list.map(function(r, i){
        var names = (r.spots || []).map(function(s){ return s.name; });
        if (!names.length && r.added && r.added.length) names = r.added.slice();
        return '<div class="sv-card">'
          + '<div class="sv-nm">' + esc(r.name) + '</div>'
          + '<div class="sv-dt">' + esc(r.date || '') + '</div>'
          + (names.length ? '<div class="sv-sp">' + names.map(function(n, j){
              return (j+1) + '. ' + esc(n); }).join('<br>') + '</div>' : '')
          + '<div class="sv-btns">'
          + '<button class="sv-b sv-go" data-go="' + i + '">ナビを開始 →</button>'
          + '<button class="sv-b sv-del" data-del="' + i + '">削除</button>'
          + '</div></div>';
      }).join('');
    }
    document.getElementById('svIn').innerHTML = h;

    document.querySelectorAll('#wabiSaved [data-go]').forEach(function(b){
      b.onclick = function(){
        var r = load()[+b.getAttribute('data-go')];
        if (!r) return;
        var pts = (r.spots || []).map(function(s){
          if (typeof s.lat === 'number' && typeof s.lng === 'number') return s.lat + ',' + s.lng;
          var c = (typeof window.coordOfPublic === 'function') ? window.coordOfPublic(s.name) : null;
          if (c) return c;
          return (typeof window.nameWithPlacePublic === 'function') ? window.nameWithPlacePublic(s.name) : s.name;
        });
        if (!pts.length) { toast('この記録には行き先が入っていません'); return; }
        var url = (typeof window.navUrlPublic === 'function') ? window.navUrlPublic(pts, r.transport) : null;
        if (url) window.open(url, '_blank');
      };
    });
    document.querySelectorAll('#wabiSaved [data-del]').forEach(function(b){
      b.onclick = function(){
        if (!confirm('この保存を削除しますか？')) return;
        var list = load();
        list.splice(+b.getAttribute('data-del'), 1);
        save(list); render();
      };
    });
  }

  function open(){ render(); page.style.display = 'block'; page.scrollTop = 0; }
  window.wabiOpenSavedRoutes = open;

  // ── マイページにカードを1枚足す ──────────────────────────────
  function addCard(){
    var wrap = document.querySelector('#wcMypage .mp-stats');
    if (!wrap || wrap.querySelector('[data-saved-routes]')) return;
    var base = wrap.querySelector('.mp-stat');
    if (!base) return;
    var card = base.cloneNode(true);
    card.setAttribute('data-saved-routes', '1');
    card.removeAttribute('data-bg');
    card.style.background = '#3a3025 url(mp-sanpai.jpg) center/cover';
    var l = card.querySelector('.mp-stat-l');   if (l) l.textContent = '保存したルート';
    var v = card.querySelector('.mp-stat-v');
    if (v){ v.removeAttribute('data-count'); v.innerHTML = load().length + '<small>件</small>'; }
    card.onclick = function(ev){ ev.stopPropagation(); open(); };
    wrap.appendChild(card);
  }

  function tick(){
    try {
      bindSave();
      addCard();
      var c = document.querySelector('#wcMypage .mp-stats [data-saved-routes] .mp-stat-v');
      if (c) c.innerHTML = load().length + '<small>件</small>';
    } catch(e){}
  }
  tick();
  setInterval(tick, 500);
})();

/* ══════════════════════════════════════════════════════════════
   ・「♡ ルートを保存」を押したら、ハートを赤くして保存済みを示す
   ・ルート確認ページの下の余白を詰める
   （2026-09-01）
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiSaveHeart) return;
  window.__wabiSaveHeart = true;

  var css = document.createElement('style');
  css.textContent = [
    // 保存済みのときのハート
    '#wcSave.wabi-saved{background:#fff !important;border:1.5px solid #d9534f !important;color:#d9534f !important;}',
    '#wcSave.wabi-saved .wabi-heart{color:#d9534f;}',
    '#wcSave .wabi-heart{margin-right:4px;}',
    // 押した瞬間の小さな鼓動
    '@keyframes wabiPop{0%{transform:scale(1)}40%{transform:scale(1.28)}100%{transform:scale(1)}}',
    '#wcSave.wabi-just .wabi-heart{display:inline-block;animation:wabiPop .42s ease;}',
    // ── ルート確認ページの下の余白を詰める ──
    //   下部メニュー（約60px）に隠れない分だけ残せば十分。96pxは空きすぎだった。
    '#wcPrev .wc-inner{padding-bottom:calc(var(--wabi-nav-h,60px) + 14px) !important;}',
    '#wcPrev .wc-inner > div:last-child{margin-bottom:14px !important;}'
  ].join('');
  document.head.appendChild(css);

  function savedList(){
    try { var a = JSON.parse(localStorage.getItem('wabi_saved_routes') || '[]'); return Array.isArray(a) ? a : []; }
    catch(e){ return []; }
  }
  // いま表示しているルートが保存済みか
  function isSaved(){
    try {
      var rows = [].map.call(document.querySelectorAll('#wcPrevBody .wc-tl-nm'),
                             function(n){ return String(n.textContent).trim(); }).filter(Boolean);
      if (!rows.length) return false;
      var sig = rows.join(',');
      return savedList().some(function(r){
        return (r.spots || []).map(function(s){ return s.name; }).join(',') === sig;
      });
    } catch(e){ return false; }
  }

  function paint(btn, justNow){
    if (!btn) return;
    var on = isSaved();
    btn.classList.toggle('wabi-saved', on);
    btn.innerHTML = '<span class="wabi-heart">' + (on ? '♥' : '♡') + '</span>'
                  + (on ? 'ルート保存済み' : 'ルートを保存');
    if (justNow) {
      btn.classList.add('wabi-just');
      setTimeout(function(){ btn.classList.remove('wabi-just'); }, 460);
    }
  }

  function bind(){
    var btn = document.getElementById('wcSave');
    if (!btn) return;
    // 保存処理が先に入るのを待つ（順番が入れ替わると保存が効かなくなるため）
    if (btn.getAttribute('data-wsv') !== '1') return;
    if (btn.getAttribute('data-whb') !== '1'){
      btn.setAttribute('data-whb', '1');
      var prev = btn.onclick;                       // 先に入っている保存処理
      btn.onclick = function(ev){
        if (typeof prev === 'function') { try { prev.call(btn, ev); } catch(e){} }
        setTimeout(function(){ paint(btn, true); }, 60);
      };
      paint(btn, false);
    } else {
      // 別のルートを開き直したときのために、状態だけ合わせ続ける
      var want = isSaved();
      if (btn.classList.contains('wabi-saved') !== want) paint(btn, false);
    }
  }
  setInterval(function(){ try { bind(); } catch(e){} }, 250);
  bind();
})();

/* ══════════════════════════════════════════════════════════════
   所要時間の見積もりを実際に近づける
   （2026-09-01）

   ★何が起きていたか★
   「7時間」を選んだのに、Googleマップで開くと移動だけで9時間になる。
   見積もりの計算に2つの甘さがあった。

   ① 距離を**直線距離**で測っていた
      実際の道のりは直線の 1.2〜1.4倍ある。山あいならもっと。
   ② 速度が現実離れしていた
      電車を時速25kmの一定としていたが、実際は
      駅までの徒歩・待ち時間・乗り換えが乗る。地方路線ならなおさら。

   その結果、入りきらない数の寺社を「7時間で回れます」と出していた。

   ★直し方★
   ・道のり ＝ 直線距離 × 交通手段ごとの係数
   ・速度は距離帯で変える（近距離は遅く、長距離は速く）
   ・乗降や駐車の手間を1区間ごとに足す
   ・そのうえで**選んだ時間に収まるところまでスポットを削る**
   ・画面に出す時間も、計算し直した値に差し替える
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiTimeFix) return;
  window.__wabiTimeFix = true;

  // 交通手段ごとの現実的な見積もり
  //   detour : 直線距離を道のりに直す係数
  //   speed  : 道のり(km) → 時速(km/h)
  //   over   : 1区間ごとの手間（分）。駐車、駅までの徒歩、待ち、乗り換え
  //   min    : 1区間の最低所要（分）
  var MODE = {
    '徒歩': { detour:1.25, speed:function(){ return 4.5; },                 over:0,  min:3 },
    '車':   { detour:1.35, speed:function(km){ return km<5?22:km<20?32:km<50?45:55; }, over:6,  min:5 },
    'バス': { detour:1.35, speed:function(km){ return km<10?13:18; },        over:15, min:10 },
    '電車': { detour:1.25, speed:function(km){ return km<10?14:km<40?20:28; }, over:20, min:12 }
  };
  function modeOf(t){ return MODE[t] || MODE['電車']; }

  function legMin(km, transport){
    var m = modeOf(transport);
    var road = km * m.detour;
    var mins = road / m.speed(road) * 60 + m.over;
    return Math.max(m.min, mins);
  }
  window.wabiLegMin = legMin;

  function dist(a, b){
    if (typeof shrineDistKm === 'function') return shrineDistKm(a, b);
    return 0;
  }
  function hm(min){
    var t = Math.round(min);
    var h = Math.floor(t/60), m = Math.round((t%60)/5)*5;
    if (m === 60){ h++; m = 0; }
    if (h && m) return '約' + h + '時間' + m + '分';
    if (h)      return '約' + h + '時間';
    return '約' + Math.max(5, m) + '分';
  }
  function legLabel(min){
    var m = Math.round(min);
    if (m >= 60){ var h = Math.floor(m/60), mm = Math.round((m%60)/5)*5;
                  return mm ? ('約'+h+'時間'+mm+'分') : ('約'+h+'時間'); }
    return '約' + (m < 20 ? m : Math.round(m/5)*5) + '分';
  }

  // ルート1本を、選んだ時間に収まるように整え直す
  function retime(r, budgetMin, visitMin, transport){
    if (!r || !r.spots || r.spots.length < 2) return r;
    var spots = r.spots, keep = [spots[0]], used = visitMin, i, d, leg;
    for (i = 1; i < spots.length; i++){
      var a = keep[keep.length-1], b = spots[i];
      if (typeof a.lat !== 'number' || typeof b.lat !== 'number'){ keep.push(b); continue; }
      d = dist({lat:a.lat,lng:a.lng}, {lat:b.lat,lng:b.lng});
      leg = legMin(d, transport);
      // 2社目までは必ず入れる（1社だけの「ルート」にはしない）
      if (keep.length >= 2 && used + leg + visitMin > budgetMin) break;
      used += leg + visitMin;
      b.move = legLabel(leg);
      keep.push(b);
    }
    r.spots = keep;

    // 表示する時間を計算し直す
    var moveMin = 0;
    for (i = 1; i < keep.length; i++){
      var p = keep[i-1], q = keep[i];
      if (typeof p.lat !== 'number' || typeof q.lat !== 'number') continue;
      moveMin += legMin(dist({lat:p.lat,lng:p.lng}, {lat:q.lat,lng:q.lng}), transport);
    }
    r.time      = hm(moveMin + keep.length * visitMin);
    r.totalMove = '総移動時間 ' + hm(moveMin);
    r._moveMin  = Math.round(moveMin);
    r._stayMin  = keep.length * visitMin;
    return r;
  }

  // ★あとから足されるスポットにも効かせる★
  //   concierge.js には「スポット数が少ないと周辺の寺社を補充する」処理があり、
  //   せっかく削ったぶんを戻してしまう。定期的に見張って、はみ出したら削り直す。
  //   （すでに収まっていれば何も変わらないので、無駄な書き換えは起きない）
  function retimeAll(){
    try {
      var routes = window._dynamicRoutes;
      if (!routes || !routes.length) return;
      // ★手書きの10ルート（このファイルの上のほうで定義しているもの）は触らない★
      //   あちらは所要時間も人が書いたもの。AIが組んだルートだけを対象にする。
      if (!window._aiSelTime) return;
      var b = (typeof aiBudgetFor === 'function') ? aiBudgetFor(window._aiSelTime) : null;
      if (!b) return;
      routes.forEach(function(r){
        if (!r || !r._wabiDyn) return;
        retime(r, b.budgetMin, b.visitMin, r.transport || window._aiSelTrans || '電車');
      });
    } catch(e){}
  }
  window.wabiRetimeAll = retimeAll;
  setInterval(retimeAll, 800);

  // index.html の buildDynamicRoutes を包んで、返ってきたルートを整え直す
  var orig = window.buildDynamicRoutes;
  if (typeof orig === 'function'){
    window.buildDynamicRoutes = function(base, baseCoord, candidates, selTime, selTrans, budget){
      var routes = orig.apply(this, arguments);
      try {
        var b = budget || (typeof aiBudgetFor === 'function' ? aiBudgetFor(selTime) : null);
        if (!b || !routes || !routes.length) return routes;
        routes.forEach(function(r){
          r._wabiDyn = true;                       // AIが組んだルートの目印
          retime(r, b.budgetMin, b.visitMin, r.transport || selTrans);
        });
      } catch(e){}
      return routes;
    };
  }
})();
