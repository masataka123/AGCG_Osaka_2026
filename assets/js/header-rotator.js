---
---
(function(){
  // baseurl を安全に付与（ユーザーページ/プロジェクトページ両対応）
  const base = '{{ "" | relative_url }}';
  const images = ({{ site.header_images | jsonify | default: '[]' }}).map(p => base + p);
  if (!images.length) return;

  const interval = {{ site.rotate_interval_ms | default: 8000 }};
  const overlay = {{ site.overlay_opacity | default: 0.35 }};
  const header = document.getElementById('header_wrap');
  if (!header) return;

  function setBg(idx){
    header.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,"+overlay+"), rgba(0,0,0,"+overlay+")), url('"+ images[idx] +"')";
  }

  // 時刻ベースで開始位置をずらす（更新直後も被りにくい）
  let i = Math.floor(Date.now() / interval) % images.length;
  setBg(i);
  setInterval(function(){ i = (i + 1) % images.length; setBg(i); }, interval);
})();
