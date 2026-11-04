/* 準備清單：勾選狀態只存在這台裝置（localStorage），清除瀏覽資料就會重置 */
(function(){
  document.querySelectorAll('.check[data-store]').forEach(function(box){
    var key='gogokinawa-'+box.dataset.store;
    var inputs=[].slice.call(box.querySelectorAll('input[type=checkbox]'));
    var counter=document.querySelector('[data-count="'+box.dataset.store+'"]');
    var saved=[];
    try{saved=JSON.parse(localStorage.getItem(key)||'[]');}catch(e){}
    inputs.forEach(function(cb,i){cb.checked=saved.indexOf(i)>=0;});
    function update(){
      var on=[];
      inputs.forEach(function(cb,i){if(cb.checked) on.push(i);});
      if(counter) counter.textContent='已完成 '+on.length+' / '+inputs.length;
      try{localStorage.setItem(key,JSON.stringify(on));}catch(e){}
    }
    inputs.forEach(function(cb){cb.addEventListener('change',update);});
    update();
  });

  /* 複製按鈕 */
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    btn.addEventListener('click',function(e){
      e.preventDefault();
      var src=document.getElementById(btn.dataset.copy);
      if(!src) return;
      var text=src.innerText.trim(), old=btn.textContent;
      function done(){btn.textContent='已複製';setTimeout(function(){btn.textContent=old;},1500);}
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(done,function(){});
      }
    });
  });
})();

/* App 下載按鈕：iPhone 只顯示 App Store、Android 只顯示 Google Play，並直接開啟商店 App */
(function(){
  var ua=navigator.userAgent||'';
  var ios=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  var android=/Android/.test(ua);
  var root=document.documentElement;
  if(ios){
    root.classList.add('is-ios');
    document.querySelectorAll('a[data-ios]').forEach(function(a){
      a.href='itms-apps://apps.apple.com/app/id'+a.dataset.ios; a.removeAttribute('target');
    });
  }else if(android){
    root.classList.add('is-android');
    document.querySelectorAll('a[data-play]').forEach(function(a){
      a.href='market://details?id='+a.dataset.play; a.removeAttribute('target');
    });
  }
})();
