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
