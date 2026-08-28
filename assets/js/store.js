/* ============================================================
   わびなび CMS — データストア
   記事は LocalStorage に保存。公開時に articles.json を書き出す。
   ============================================================ */
window.WabiStore = (function () {
  'use strict';
  var LS_ARTICLES = 'wabinavi_articles';
  var LS_AUTH = 'wabinavi_auth';

  // ══════════════════════════════════════════════════════════
  // パスワードの扱い
  //
  // ★以前はここに平文でパスワードが書かれていた★
  //   このリポジトリは公開設定なので、誰でも読める状態だった。
  //   平文をやめ、admin/auth.json に置いた「ハッシュ」と照合する方式にした。
  //
  // ハッシュには PBKDF2（SHA-256・60万回）を使う。
  // auth.json 自体も公開されるが、そこから元のパスワードを逆算するのは
  // 総当たりしかなく、60万回の計算が1回の試行ごとに必要になるため非常に遅い。
  //
  // ただし総当たりが「不可能」になるわけではない。
  // 短い単語や誕生日のようなパスワードは破られる。
  // **必ず長くてバラバラな文字列を使うこと。**
  //
  // パスワードの変更は admin/password.html から行う（この場所は触らなくてよい）。
  // ══════════════════════════════════════════════════════════
  var AUTH_URL = 'auth.json';   // admin/ から見た相対パス
  var authConfig = null;        // {salt, hash, iterations} を読み込んだもの

  function loadAuthConfig() {
    if (authConfig) return Promise.resolve(authConfig);
    return fetch(AUTH_URL + '?t=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (j && j.salt && j.hash) { authConfig = j; return j; }
        return null;
      })
      .catch(function () { return null; });
  }

  function toHex(buf) {
    return Array.prototype.map.call(new Uint8Array(buf), function (b) {
      return ('0' + b.toString(16)).slice(-2);
    }).join('');
  }

  // パスワード＋塩 → ハッシュ（16進文字列）
  function hashPassword(password, saltHex, iterations) {
    var enc = new TextEncoder();
    var salt = new Uint8Array((saltHex.match(/../g) || []).map(function (h) {
      return parseInt(h, 16);
    }));
    return crypto.subtle
      .importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits'])
      .then(function (key) {
        return crypto.subtle.deriveBits(
          { name: 'PBKDF2', salt: salt, iterations: iterations, hash: 'SHA-256' },
          key, 256
        );
      })
      .then(toHex);
  }

  // 新しいパスワードから、保存用の設定を作る（password.html が使う）
  function makeAuthConfig(password) {
    var salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    var saltHex = toHex(salt.buffer);
    var iterations = 600000;   // OWASP推奨（PBKDF2-SHA256）
    return hashPassword(password, saltHex, iterations).then(function (hash) {
      return { salt: saltHex, hash: hash, iterations: iterations, updatedAt: new Date().toISOString() };
    });
  }

  // タイミング差から中身を推測されないよう、長さを揃えて1文字ずつ比べる
  function safeEqual(a, b) {
    if (a.length !== b.length) return false;
    var diff = 0;
    for (var i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
  }

  function uid() {
    return 'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  }

  function getArticles() {
    try { return JSON.parse(localStorage.getItem(LS_ARTICLES) || '[]'); }
    catch (e) { return []; }
  }
  function saveArticles(list) {
    localStorage.setItem(LS_ARTICLES, JSON.stringify(list));
  }
  function getArticle(id) {
    return getArticles().find(function (a) { return a.id === id; }) || null;
  }
  function upsert(article) {
    var list = getArticles();
    if (!article.id) { article.id = uid(); article.createdAt = Date.now(); }
    article.updatedAt = Date.now();
    var idx = list.findIndex(function (a) { return a.id === article.id; });
    if (idx >= 0) list[idx] = article; else list.unshift(article);
    saveArticles(list);
    return article;
  }
  function remove(id) {
    saveArticles(getArticles().filter(function (a) { return a.id !== id; }));
  }
  function duplicate(id) {
    var src = getArticle(id);
    if (!src) return null;
    var copy = JSON.parse(JSON.stringify(src));
    copy.id = null;
    copy.title = (copy.title || '') + '（複製）';
    copy.slug = (copy.slug || 'article') + '-copy';
    copy.status = 'draft';
    return upsert(copy);
  }

  // 初回ロード時、JSONがあればLocalStorageへ取り込み（初期データ）
  function seedFromJson(jsonUrl) {
    return fetch(jsonUrl, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (arr) {
        if (Array.isArray(arr) && arr.length && getArticles().length === 0) {
          arr.forEach(function (a) { if (!a.id) a.id = uid(); });
          saveArticles(arr);
        }
        return getArticles();
      })
      .catch(function () { return getArticles(); });
  }

  // 公開用JSONを書き出し（公開記事のみ）
  function exportJson() {
    var published = getArticles().filter(function (a) { return a.status === 'published'; });
    // 公開に不要な内部フィールドを除去
    var clean = published.map(function (a) {
      var c = JSON.parse(JSON.stringify(a));
      delete c.id; delete c.createdAt; delete c.updatedAt;
      return c;
    });
    var blob = new Blob([JSON.stringify(clean, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var aEl = document.createElement('a');
    aEl.href = url; aEl.download = 'articles.json';
    document.body.appendChild(aEl); aEl.click();
    document.body.removeChild(aEl);
    URL.revokeObjectURL(url);
    return clean.length;
  }

  // 認証（ハッシュ照合のため非同期。true/false を Promise で返す）
  function login(pw) {
    return loadAuthConfig().then(function (cfg) {
      if (!cfg) return 'unset';          // まだパスワードが設定されていない
      return hashPassword(pw, cfg.salt, cfg.iterations || 250000).then(function (h) {
        if (safeEqual(h, cfg.hash)) { sessionStorage.setItem(LS_AUTH, '1'); return true; }
        return false;
      });
    });
  }

  // パスワードが未設定か（初回セットアップ用）
  function needsSetup() {
    return loadAuthConfig().then(function (cfg) { return !cfg; });
  }
  function isAuthed() { return sessionStorage.getItem(LS_AUTH) === '1'; }
  function logout() { sessionStorage.removeItem(LS_AUTH); }
  function requireAuth() { if (!isAuthed()) location.href = 'login.html'; }

  return {
    getArticles: getArticles, getArticle: getArticle, upsert: upsert,
    remove: remove, duplicate: duplicate, seedFromJson: seedFromJson,
    exportJson: exportJson, login: login, isAuthed: isAuthed,
    logout: logout, requireAuth: requireAuth, uid: uid,
    needsSetup: needsSetup, makeAuthConfig: makeAuthConfig
  };
})();
