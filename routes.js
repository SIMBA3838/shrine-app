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
    if (!wrap) return;
    var exist = wrap.querySelector('[data-saved-routes]');
    if (exist){
      // ★必ず一番下に置く★
      //   concierge.js 側が既存6枚を並べ替えるので、放っておくと先頭に来てしまう。
      //   最後の1枚でなければ、末尾へ移し直す。
      if (wrap.lastElementChild !== exist) wrap.appendChild(exist);
      return;
    }
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


/* ══════════════════════════════════════════════════════════════
   ホーム画面のアイコンが潰れて見える問題の修正
   （2026-09-01）

   ★何が起きていたか★
   これまでのアイコン画像は、**角が丸く切り取られた（＝角が透明な）PNG**だった。
   ところが iOS のホーム画面アイコンは透明を扱えず、
     ① 透明な角を**黒**で塗りつぶす
     ② そのうえで iOS 自身が角丸のマスクをかける
   という順で処理する。
   結果、自前の角丸と iOS の角丸のあいだに黒い隙間ができ、
   丸いはずのアイコンが潰れて汚く見えていた。

   ★直し方★
   角まで背景で埋めた**透明なしの正方形**に差し替える。
   角を丸くするのは iOS に任せる。これが Apple の推奨のやり方。
   ══════════════════════════════════════════════════════════════ */
(function(){
  if (window.__wabiIconFix) return;
  window.__wabiIconFix = true;

  var ICON = 'data:image/png;base64,' + [
    'iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAABgFBMVEX01ZzjwYjYtH3NqHPHnma7mHS2jV+ph3Oje12Ydm2TbVmLaWOFYE95WFNzUE1tTFZn',
    'RlBjQUheQFJbPE5ZOVJWOVBZOUNWNFNUM1JTMlJVNExWNDxRM01QM0VTMVJSMVBSMFFSL1FRMFBRL1BPMFBPL09RLk9QLlBQLk9QLk5PLk5QLU9PLU9PLU5O',
    'LU5OLE5PLkxPLE1OLE1OLExOK0xQL0dQLzpNLk5MLU1MLExKLExNK0xLK0tMLkZKK0lLLEBLLDpMKktLKUpKKklJKklIKkhIKUlHKUdJKEhHKEhHKEdHJ0hG',
    'KEdGJ0dGJkZHKENFJ0NFJkRGJENHKTxHJjxIJzNEJkNEJURDJUNDJUBCJjhDJENDJEJCJEJCJD0/JDpDI0JCI0JCI0FBI0FBIzw/IzxDIkJBIkFBIkBBIUFA',
    'Ij9AIUBAIT9AIEA/ID9AIj4/IT0/ID5BITpBITI+IT0+IDw9ID09ITc+Hz49Hzw+HzQ8Hjs7HjQ8HDM5HDI2FyraSL8tAABWSUlEQVR42n19CVsa2fc0alxZ',
    'FARUFmEEIpIfhiFhk00QAYlsstmgJIgJDjiAICL7V3/rXMxMZv7zvB2jzRarT9epU+fe2x3ejlS6M99sNtvq6qpUKtVoNDv4wgsyKW34LpPNd/+xydizsp8b',
    'vZH9lP393H9tCoVMpfj7gUIlk6n+9RapTKN3egIBrdvttlgsfD4/m816PCaTSaczGFy8nf9EvbPLQO8bjg4ODjRarUZzpNnf29/f29nd3dHs7e7u7Wl0R3ua',
    'fRygTnOg2ddq9zVH799rNdp9fOLIcmgyWY4MBwc6ow7fHRbdkcn16ZPrk8HkdH3y+DwWPHD5XC632+U+w86R5dOZz+f5dOwJn+EFCwP9QfufmAn0f6He2dVb',
    'jiwWg0ZzsKfBH0QeAHc1wIrvtNHBsIMDZOztaQ6Ojg4085fxiyxul+nYZDAcGHQHOpPDcIT942OX2eB0HFh8HqfFcuQAZpfJ4zk+8ziB0uXzOVzHBpfnxInd',
    'WOQi5AZozX9gDhLof6Fel0oVbMMjxf/dbOxL8faSWv3XC0QgnG76a1PZbCr2V/XzVdXPv3ievtg/T++z2SzsF3ltXnqEH16v7e2bzaL5D8xBnv5fqBWr6+v0',
    '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',
    ''].join('');

  function apply(){
    try {
      // 既存のホーム画面用アイコンの指定を消す
      var olds = document.querySelectorAll('link[rel="apple-touch-icon"], link[rel="apple-touch-icon-precomposed"]');
      [].forEach.call(olds, function(el){
        if (el.getAttribute('data-wabi-icon') === '1') return;
        el.parentNode && el.parentNode.removeChild(el);
      });
      if (document.querySelector('link[data-wabi-icon="1"]')) return;

      // 角まで塗りつぶした正方形を指定し直す
      [180, 152, 167, 120].forEach(function(sz){
        var l = document.createElement('link');
        l.rel = 'apple-touch-icon';
        l.setAttribute('sizes', sz + 'x' + sz);
        l.href = ICON;
        l.setAttribute('data-wabi-icon', '1');
        document.head.appendChild(l);
      });
      // Android・PWA用にも同じものを指定しておく
      var big = document.createElement('link');
      big.rel = 'icon'; big.type = 'image/png';
      big.setAttribute('sizes', '192x192');
      big.href = ICON; big.setAttribute('data-wabi-icon', '1');
      document.head.appendChild(big);
    } catch(e){}
  }
  apply();
  // index.html 側があとから書き足す場合に備えて、数回だけ見張る
  var n = 0;
  var iv = setInterval(function(){ apply(); if (++n > 10) clearInterval(iv); }, 700);
})();
