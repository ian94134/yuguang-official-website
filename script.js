const modal=document.querySelector('#signup-modal');
const form=document.querySelector('#signup-form');
const courseSelect=document.querySelector('#course-select');
const selectedCourse=document.querySelector('#selected-course');
const accountType=document.querySelector('#account-type');
const courseDetail=document.querySelector('#course-detail');

const courses={
  eye:{name:'精油眼部舒壓',kind:'香氣照護・身體放鬆',visual:'visual-eye',icon:'☼',english:'A GENTLE PAUSE',intro:'長時間使用電腦、滑手機或閱讀，容易讓雙眼感到疲勞。課程從日常用眼習慣開始，透過簡單的眼部放鬆練習、精油芳香體驗與講師示範，帶你安排一段屬於自己的休息時光。',schedule:[['相識暖身','10 分鐘'],['卸妝與清潔體驗','15 分鐘'],['認識日常放鬆用油','15 分鐘'],['眼部放鬆練習、按摩示範與熱敷','25 分鐘'],['生活分享與交流','25 分鐘']],related:['neck','sleep','scalp']},
  neck:{name:'精油肩頸舒壓',kind:'香氣照護・身體放鬆',visual:'visual-neck',icon:'❋',english:'SOFTEN YOUR SHOULDERS',intro:'久坐、工作與長時間使用手機，常讓肩頸累積緊繃感。課程結合精油嗅吸體驗、日常放鬆用油介紹及肩頸按摩示範，練習把一段簡單的舒壓時間帶回生活。',schedule:[['相識暖身','10 分鐘'],['五色精油嗅吸體驗','15 分鐘'],['肩頸放鬆用油分享','20 分鐘'],['肩頸按摩與塗抹示範','20 分鐘'],['生活分享與交流','25 分鐘']],related:['scalp','eye','sleep']},
  scalp:{name:'精油頭皮 SPA',kind:'香氣照護・身體放鬆',visual:'visual-head',icon:'✺',english:'A LITTLE BREATHING ROOM',intro:'透過芳香體驗與簡單易學的頭皮按摩手法，認識日常頭部保養與放鬆方式。跟著講師一起練習，為自己留一段安靜、舒服的時間。',schedule:[['相識暖身','10 分鐘'],['認識頭部放鬆方式','15 分鐘'],['頭皮放鬆用油分享','10 分鐘'],['頭皮按摩手法練習','30 分鐘'],['生活分享與交流','25 分鐘']],related:['neck','sleep','eye']},
  sleep:{name:'精油如何幫助睡眠',kind:'香氣生活・日常練習',visual:'visual-sleep',icon:'☾',english:'LET YOURSELF REST',intro:'夜晚仍思緒紛飛時，為自己準備舒服的休息環境。課程介紹睡前常見精油香氣與日常芳香技巧，從嗅吸體驗到舒眠配方調製，找到適合自己的睡前放鬆儀式。',schedule:[['相識暖身','10 分鐘'],['精油嗅吸體驗','10 分鐘'],['睡眠用油與香氣介紹','25 分鐘'],['舒眠精油調配體驗','20 分鐘'],['生活分享與交流','25 分鐘']],related:['eye','scalp','balm']},
  balm:{name:'精油萬用膏',kind:'香氣手作・日常練習',visual:'visual-balm',icon:'✿',english:'MADE BY YOUR HANDS',intro:'認識精油與基底材料，跟著步驟親手完成一份精油萬用膏。從材料介紹、調配到製作，體驗把芳香手作帶進日常生活。',schedule:[['相識暖身','10 分鐘'],['認識精油與手作材料','15 分鐘'],['精油萬用膏手作','25 分鐘'],['精油嗅吸體驗','15 分鐘'],['生活分享與交流','25 分鐘']],related:['sleep','neck','eye']}
};

function openModal(course=''){
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');
  document.querySelector('.success-state').hidden=true;
  document.querySelector('.login-state').hidden=true;
  form.hidden=false;
  courseSelect.value=course||'';
  selectedCourse.textContent=course||'請選擇課程';
  document.querySelector('#modal-title').textContent='預約一場溫柔的相遇';
  accountType.value='student';
  document.body.style.overflow='hidden';
}

function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}

function renderCourseDetail(slug,{push=true,scroll=true}={}){
  const course=courses[slug];
  if(!course)return showCourseList({push:false,scroll});
  if(push)history.pushState({course:slug},'',`#course/${slug}`);
  document.querySelector('.section-heading').hidden=true;
  document.querySelector('.class-filter').hidden=true;
  document.querySelector('.course-grid').hidden=true;
  document.querySelector('.course-footnote').hidden=true;
  courseDetail.hidden=false;
  const recommendations=course.related.map(id=>{
    const item=courses[id];
    return `<button class="related-course" type="button" data-course-detail="${id}"><span class="related-icon ${item.visual}">${item.icon}</span><span><small>${item.kind}</small><b>${item.name}</b></span><span class="related-arrow">↗</span></button>`;
  }).join('');
  const schedule=course.schedule.map(([step,time])=>`<li><span>${step}</span><b>${time}</b></li>`).join('');
  courseDetail.innerHTML=`
    <button class="detail-back" type="button" data-back-classes>← 回到課程列表</button>
    <div class="detail-hero">
      <div class="detail-copy">
        <p class="eyebrow"><span>✳</span> ${course.kind}　/　90 分鐘體驗</p>
        <h2>${course.name}</h2>
        <p class="detail-english">${course.english}</p>
        <p class="detail-intro">${course.intro}</p>
        <div class="detail-tags"><span>適合 18 歲以上</span><span>男女皆可</span><span>初學友善</span></div>
        <button class="button button-dark detail-signup" type="button" data-register-course="${course.name}">報名這堂課 <span>↗</span></button>
      </div>
      <div class="detail-art ${course.visual}"><span>${course.icon}</span><small>${course.english}</small><i>YU GUANG · TAKE YOUR TIME</i></div>
    </div>
    <div class="detail-content">
      <div class="brochure-main">
        <p class="eyebrow"><span>✳</span> COURSE BROCHURE</p>
        <h3>簡章資訊</h3>
        <p class="brochure-intro">${course.intro}</p>
        <h4>90 分鐘體驗流程</h4>
        <ol class="schedule-list">${schedule}</ol>
        <p class="detail-disclaimer">課程涉及精油嗅吸或肌膚接觸；若對香氣或相關材料有顧慮，請於報名前先與瑀光確認。</p>
      </div>
      <aside class="brochure-facts">
        <p class="eyebrow">CLASS DETAILS</p>
        <dl><div><dt>課程時間</dt><dd>90 分鐘</dd></div><div><dt>適合對象</dt><dd>18 歲以上・男女皆可</dd></div><div><dt>授課講師</dt><dd>陳沛瑄</dd></div><div><dt>開課日期</dt><dd>場次另行公告</dd></div><div><dt>上課地點</dt><dd>請洽瑀光確認</dd></div><div><dt>課程費用</dt><dd>簡章未載明，請洽詢</dd></div></dl>
        <button class="button button-dark facts-signup" type="button" data-register-course="${course.name}">報名課程 <span>↗</span></button>
        <p class="facts-note">報名需先建立瑀光會員；正式場次與付款資訊將於後台啟用後提供。</p>
      </aside>
    </div>
    <div class="related-section"><div><p class="eyebrow"><span>✳</span> KEEP EXPLORING</p><h3>相關課程推薦</h3></div><div class="related-list">${recommendations}</div></div>`;
  courseDetail.querySelectorAll('[data-course-detail]').forEach(button=>button.addEventListener('click',()=>renderCourseDetail(button.dataset.courseDetail)));
  courseDetail.querySelector('[data-back-classes]').addEventListener('click',()=>showCourseList({push:true,scroll:true}));
  courseDetail.querySelectorAll('[data-register-course]').forEach(button=>button.addEventListener('click',()=>openModal(button.dataset.registerCourse)));
  if(scroll)document.querySelector('#classes').scrollIntoView({behavior:'smooth',block:'start'});
}

function showCourseList({push=true,scroll=true}={}){
  if(push)history.pushState({course:null},'','#classes');
  courseDetail.hidden=true;courseDetail.innerHTML='';
  document.querySelector('.section-heading').hidden=false;
  document.querySelector('.class-filter').hidden=false;
  document.querySelector('.course-grid').hidden=false;
  document.querySelector('.course-footnote').hidden=false;
  if(scroll)document.querySelector('#classes').scrollIntoView({behavior:'smooth',block:'start'});
}

function syncCourseRoute(){
  const match=location.hash.match(/^#course\/([a-z-]+)$/);
  if(match&&courses[match[1]])renderCourseDetail(match[1],{push:false,scroll:false});
  else showCourseList({push:false,scroll:false});
}

document.querySelectorAll('[data-course-detail]').forEach(button=>button.addEventListener('click',()=>renderCourseDetail(button.dataset.courseDetail)));
document.querySelectorAll('[data-join-member]').forEach(button=>button.addEventListener('click',()=>{openModal();accountType.value='oil-member';}));
document.querySelectorAll('[data-open-account]').forEach(button=>button.addEventListener('click',()=>{
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');form.hidden=true;
  document.querySelector('.success-state').hidden=true;document.querySelector('.login-state').hidden=false;
  document.querySelector('#modal-title').textContent='';document.body.style.overflow='hidden';
}));
document.querySelector('.modal-close').addEventListener('click',closeModal);
document.querySelector('.success-state .modal-done').addEventListener('click',closeModal);
document.querySelector('.login-state .modal-done').addEventListener('click',()=>openModal());
modal.addEventListener('click',event=>{if(event.target===modal)closeModal()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&modal.classList.contains('open'))closeModal()});
courseSelect.addEventListener('change',()=>selectedCourse.textContent=courseSelect.value||'請選擇課程');
form.addEventListener('submit',event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  if(accountType.value==='visitor'){
    accountType.setCustomValidity('課程報名請選擇「上課學員」或「精油會員」。');
    accountType.reportValidity();accountType.setCustomValidity('');return;
  }
  form.hidden=true;document.querySelector('.success-state').hidden=false;
});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(item=>item.classList.toggle('active',item===button));
  document.querySelectorAll('.course-card').forEach(card=>card.classList.toggle('is-hidden',button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter));
}));
document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('.main-nav').classList.toggle('open'));
document.querySelectorAll('.main-nav a').forEach(link=>link.addEventListener('click',()=>document.querySelector('.main-nav').classList.remove('open')));
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const target=document.querySelector(link.getAttribute('href'));
  if(target){
    event.preventDefault();
    if(link.getAttribute('href')==='#classes'&&location.hash.startsWith('#course/'))showCourseList({push:false,scroll:false});
    target.scrollIntoView({behavior:'smooth'});history.replaceState(null,'',link.getAttribute('href'));
  }
}));
window.addEventListener('popstate',syncCourseRoute);
syncCourseRoute();
