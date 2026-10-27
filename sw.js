/*
 * Service worker: deixa o app funcionando sem internet.
 * Estratégia "rede primeiro": quando há conexão, a paciente sempre recebe a versão
 * mais recente (inclusive edições do config.js); sem conexão, usa a cópia salva.
 * Ao adicionar, renomear ou remover arquivos do app, atualize ARQUIVOS e a versão do CACHE.
 */
var CACHE = 'assoalho-em-dia-v2';
var ARQUIVOS = [
  './',
  './index.html',
  './config.js',
  './css/estilo.css',
  './js/nucleo.js',
  './js/armazenamento.js',
  './js/sinais.js',
  './js/telas.js',
  './js/treino.js',
  './js/app.js',
  './manifest.webmanifest',
  './img/icone.svg',
  './img/icone-192.png',
  './img/icone-512.png',
  './img/apple-touch-icon.png'
];
var FONTES = /^https:\/\/fonts\.(googleapis|gstatic)\.com$/;

function guardar(req, resp) {
  var copia = resp.clone();
  caches.open(CACHE).then(function (c) { c.put(req, copia); });
  return resp;
}

// Fontes do Google: guarda a primeira cópia e reutiliza.
function fonteDoCache(req) {
  return caches.match(req).then(function (salvo) {
    return salvo || fetch(req).then(function (resp) { return guardar(req, resp); });
  });
}

function copiaSalva(req) {
  return caches.match(req, { ignoreSearch: true }).then(function (salvo) {
    return salvo || caches.match('./index.html');
  });
}

function redePrimeiro(req) {
  return fetch(req)
    .then(function (resp) { return resp.ok ? guardar(req, resp) : resp; })
    .catch(function () { return copiaSalva(req); });
}

self.addEventListener('install', function (ev) {
  ev.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(ARQUIVOS); }));
  self.skipWaiting();
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(caches.keys().then(function (chaves) {
    return Promise.all(chaves.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener('fetch', function (ev) {
  var req = ev.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (FONTES.test(url.origin)) ev.respondWith(fonteDoCache(req));
  else if (url.origin === self.location.origin) ev.respondWith(redePrimeiro(req));
});
