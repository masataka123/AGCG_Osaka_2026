---
---
(function(){
  const images = {{ site.header_images | jsonify | default: '[]' }};
  if (!images.length) return;

  const interval = {{ site.rotate_interval_ms | default: 8000 }};
  const header = document.getElementById('header_wrap');
  let i = Math.floor(Date.now() / interval) % images.length; // 時刻に応じて開始位置

  function set(idx){
    header.style.backgroundImage =
      "linear-gradient(rgba(0,0,0,{{ site.overlay_opacity | default: 0.35 }}), rgba(0,0,0,{{ site.overlay_opacity | default: 0.35 }})), url('"
      + images[idx] + "')";
  }

  set(i);
  setInterval(()=>{ i = (i + 1) % images.length; set(i); }, interval);
})();
