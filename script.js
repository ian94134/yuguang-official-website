const modal=document.querySelector('#signup-modal');
const form=document.querySelector('#signup-form');
const courseSelect=document.querySelector('#course-select');
const selectedCourse=document.querySelector('#selected-course');
const accountType=document.querySelector('#account-type');
const courseDetail=document.querySelector('#course-detail');

const categoryInfo={
  body:{label:'身體舒壓・香氣照護',caption:'BODY & BREATH',icon:'✳',summary:'以身體放鬆與香氣照護為主題，課程內容依正式簡章公告。'},
  daily:{label:'日常香氣・休息練習',caption:'REST AT YOUR PACE',icon:'☾',summary:'從睡眠與香氣開始，探索適合自己的日常照顧節奏；詳情依正式簡章公告。'},
  craft:{label:'香氣手作・日常練習',caption:'SCENT & MAKING',icon:'✿',summary:'以香氣材料與手作體驗為主題，將一點喜歡帶回生活；活動方式與材料依正式簡章公告。'},
  skin:{label:'肌膚照護・日常保養',caption:'GENTLE CARE',icon:'☼',summary:'以臉部與肌膚日常照護為主題，內容與適用對象依正式簡章公告。'},
  family:{label:'親子芳香・家庭照護',caption:'CARE TOGETHER',icon:'♡',summary:'以親子陪伴與家庭日常照護為主題，內容與適合年齡依正式簡章公告。'},
  senior:{label:'熟齡照護・芳香陪伴',caption:'A LITTLE CARE',icon:'⌂',summary:'以熟齡生活照護為主題，課程內容與適合對象依正式簡章公告。'}
};
const makeCourse=(id,name,category,photo,summary,extra={})=>({id,name,category,photo:`assets/course-photos/${photo}`,visual:`visual-${category}`,icon:categoryInfo[category].icon,kind:categoryInfo[category].label,english:categoryInfo[category].caption,summary,intro:`${summary}歡迎先洽詢瑀光，確認課程內容、適合對象與開課資訊。`,...extra});
const courseCatalog=[
  makeCourse('eye-essential','精油眼部紓壓','body','eye.webp','從日常用眼習慣開始，為自己留一段眼部放鬆與香氣體驗的時間。',{intro:'長時間使用電腦、滑手機或閱讀，容易讓雙眼感到疲勞。課程從日常用眼習慣開始，透過簡單的眼部放鬆練習、精油芳香體驗與講師示範，帶你安排一段屬於自己的休息時光。',duration:'90 分鐘',audience:'18 歲以上・男女皆可',instructor:'陳沛瑄',schedule:[['相識暖身','10 分鐘'],['卸妝與清潔體驗','15 分鐘'],['認識日常放鬆用油','15 分鐘'],['眼部放鬆練習、按摩示範與熱敷','25 分鐘'],['生活分享與交流','25 分鐘']]}),
  makeCourse('neck-essential','精油肩頸紓壓','body','neck.webp','結合精油香氣與肩頸放鬆主題，練習為日常留白。',{intro:'久坐、工作與長時間使用手機，常讓肩頸累積緊繃感。課程結合精油嗅吸體驗、日常放鬆用油介紹及肩頸按摩示範，練習把一段簡單的舒壓時間帶回生活。',duration:'90 分鐘',audience:'18 歲以上・男女皆可',instructor:'陳沛瑄',schedule:[['相識暖身','10 分鐘'],['五色精油嗅吸體驗','15 分鐘'],['肩頸放鬆用油分享','20 分鐘'],['肩頸按摩與塗抹示範','20 分鐘'],['生活分享與交流','25 分鐘']]}),
  makeCourse('head-relax','頭部紓壓','body','head.webp','以頭部與頭皮放鬆為主題，認識日常保養與舒緩練習。',{intro:'透過芳香體驗與簡單易學的頭皮按摩手法，認識日常頭部保養與放鬆方式。跟著講師一起練習，為自己留一段安靜、舒服的時間。',duration:'90 分鐘',audience:'18 歲以上・男女皆可',instructor:'陳沛瑄',schedule:[['相識暖身','10 分鐘'],['認識頭部放鬆方式','15 分鐘'],['頭皮放鬆用油分享','10 分鐘'],['頭皮按摩手法練習','30 分鐘'],['生活分享與交流','25 分鐘']]}),
  makeCourse('sleep','睡眠','daily','sleep.webp','從睡前生活與香氣開始，探索適合自己的休息節奏。',{intro:'夜晚仍思緒紛飛時，為自己準備舒服的休息環境。課程介紹睡前常見精油香氣與日常芳香技巧，從嗅吸體驗到舒眠配方調製，找到適合自己的睡前放鬆儀式。',duration:'90 分鐘',audience:'18 歲以上・男女皆可',instructor:'陳沛瑄',schedule:[['相識暖身','10 分鐘'],['精油嗅吸體驗','10 分鐘'],['睡眠用油與香氣介紹','25 分鐘'],['舒眠精油調配體驗','20 分鐘'],['生活分享與交流','25 分鐘']]}),
  makeCourse('balm','精油萬用膏','craft','balm.webp','以精油與基底材料為主題，體驗日常香氣手作。',{intro:'認識精油與基底材料，跟著步驟親手完成一份精油萬用膏。從材料介紹、調配到製作，體驗把芳香手作帶進日常生活。',duration:'90 分鐘',audience:'18 歲以上・男女皆可',instructor:'陳沛瑄',schedule:[['相識暖身','10 分鐘'],['認識精油與手作材料','15 分鐘'],['精油萬用膏手作','25 分鐘'],['精油嗅吸體驗','15 分鐘'],['生活分享與交流','25 分鐘']]}),
  makeCourse('lip-balm','精油護唇膏','craft','lip-balm.webp','從材料與香氣認識開始，探索護唇膏手作主題。'),
  makeCourse('lucky-oil','開運精油製作','craft','lucky-oils.webp','以開運精油調配為主題，感受香氣與個人日常的連結。'),
  makeCourse('face-lift','臉部緊緻拉提','skin','face-lift.webp','以臉部日常保養與放鬆為主題，課程內容依正式簡章公告。'),
  makeCourse('custom-scent','專屬香氛調配','craft','custom-fragrance.webp','從香氣探索出發，認識專屬香氛調配主題。'),
  makeCourse('sugar-scrub','精油去角質糖霜','craft','sugar-scrub.webp','以精油與糖霜手作為主題，材料與活動方式依正式簡章公告。'),
  makeCourse('bath-bomb','精油泡澡球','craft','bath-bomb.webp','以香氣與泡澡球手作為主題，細節依正式簡章公告。'),
  makeCourse('eye-relief','眼壓舒緩','body','eye.webp','以眼部休息與日常舒緩為主題，課程內容依正式簡章公告。'),
  makeCourse('neck-relax','肩頸紓壓','body','neck.webp','以肩頸放鬆與日常照顧為主題，課程內容依正式簡章公告。'),
  makeCourse('diffuser-lamp','精油擴香竹燈','craft','diffuser-lamp.webp','認識擴香竹燈與香氣佈置，為生活留一處溫柔光景。'),
  makeCourse('child-emotions','孩童情緒','family','child-emotions.webp','以孩童情緒陪伴為主題，課程內容與適合年齡依正式簡章公告。'),
  makeCourse('mosquito-spray','夏日防蚊蟲噴霧','family','mosquito.webp','以夏日居家與戶外芳香照護為主題，材料與使用資訊依正式簡章公告。'),
  makeCourse('parent-massage','親子按摩','family','parent-massage.webp','以親子陪伴與按摩體驗為主題，內容與適合年齡依正式簡章公告。'),
  makeCourse('child-aroma','兒童芳香居家照護','family','child-aroma.webp','以兒童居家芳香照護為主題，內容與適合年齡依正式簡章公告。'),
  makeCourse('child-growth','小孩長高','family','child-growth.webp','以兒童成長與日常照護為主題，課程內容與適合年齡依正式簡章公告。'),
  makeCourse('atopic-skin','精油如何舒緩異位性皮膚炎','skin','atopic-skin.webp','以異位性皮膚炎與日常肌膚照護為主題，課程內容與材料資訊依正式簡章公告。'),
  makeCourse('dementia','失智','senior','dementia.webp','以失智照護與陪伴為主題，課程內容與適合對象依正式簡章公告。'),
  makeCourse('digestive-care','腸胃道保養','senior','digestive.webp','以腸胃道日常保養為主題，課程內容依正式簡章公告。'),
  makeCourse('joint-care','關節舒活保養','senior','joint-care.webp','以關節日常照護為主題，課程內容依正式簡章公告。'),
  makeCourse('essential-skincare','精油護膚','skin','skincare.webp','以精油與肌膚日常照護為主題，內容與材料資訊依正式簡章公告。')
];
const courses=Object.fromEntries(courseCatalog.map(course=>[course.id,course]));
const courseGrid=document.querySelector('.course-grid');
function renderCourseCards(){
  courseGrid.querySelectorAll('.course-card').forEach(card=>card.remove());
  const invite=courseGrid.querySelector('.course-invite');
  const cards=courseCatalog.map((course,index)=>{
    const card=document.createElement('article');
    card.className='course-card';card.dataset.category=course.category;
    card.innerHTML=`<div class="course-visual ${course.visual}"><img class="course-photo" src="${course.photo}" alt="${course.name}課程情境照" loading="lazy"><span class="course-number">${String(index+1).padStart(2,'0')} / YU GUANG</span><span class="visual-caption">${course.english}</span></div><div class="course-info"><div class="course-tags"><span>${course.kind.split('・')[0]}</span><span>課程資訊洽詢</span></div><h3>${course.name}</h3><p>${course.summary}</p><div class="course-meta"><span>◷ ${course.duration||'依簡章公告'}</span><span>${course.instructor?`講師 ${course.instructor}`:'場次另行公告'}</span></div><button class="course-cta" type="button" data-course-detail="${course.id}">查看課程資訊 <span>↗</span></button></div>`;
    return card;
  });
  cards.forEach(card=>courseGrid.insertBefore(card,invite));
}
renderCourseCards();
courseSelect.innerHTML='<option value="">請選擇課程</option>'+courseCatalog.map(course=>`<option value="${course.name}">${course.name}</option>`).join('');

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
  const related=courseCatalog.filter(item=>item.id!==slug&&item.category===course.category).slice(0,3);
  if(related.length<3){courseCatalog.filter(item=>item.id!==slug&&!related.some(match=>match.id===item.id)).slice(0,3-related.length).forEach(item=>related.push(item));}
  const recommendations=related.map(item=>{
    return `<button class="related-course" type="button" data-course-detail="${item.id}"><span class="related-icon ${item.visual}">${item.icon}</span><span><small>${item.kind}</small><b>${item.name}</b></span><span class="related-arrow">↗</span></button>`;
  }).join('');
  const schedule=course.schedule?.map(([step,time])=>`<li><span>${step}</span><b>${time}</b></li>`).join('');
  const scheduleSection=course.schedule?`<h4>${course.duration}體驗流程</h4><ol class="schedule-list">${schedule}</ol>`:`<h4>課程資訊</h4><p class="brochure-intro">課程內容、活動時間、適合對象與材料資訊，將依正式簡章公告。歡迎先洽詢瑀光，確認適合自己的場次。</p>`;
  const detailTags=course.audience?`<span>${course.audience}</span><span>初學友善</span>`:'<span>適合對象依簡章公告</span><span>場次另行公告</span>';
  courseDetail.innerHTML=`
    <button class="detail-back" type="button" data-back-classes>← 回到課程列表</button>
    <div class="detail-hero">
      <div class="detail-copy">
        <p class="eyebrow"><span>✳</span> ${course.kind}　/　${course.duration||'課程主題'}</p>
        <h2>${course.name}</h2>
        <p class="detail-english">${course.english}</p>
        <p class="detail-intro">${course.intro}</p>
        <div class="detail-tags">${detailTags}</div>
        <button class="button button-dark detail-signup" type="button" data-register-course="${course.name}">報名這堂課 <span>↗</span></button>
      </div>
      <div class="detail-art ${course.visual}"><img class="detail-photo" src="${course.photo}" alt="${course.name}課程情境照"><span aria-hidden="true">${course.icon}</span><small>${course.english}</small><i>YU GUANG · TAKE YOUR TIME</i></div>
    </div>
    <div class="detail-content">
      <div class="brochure-main">
        <p class="eyebrow"><span>✳</span> COURSE BROCHURE</p>
        <h3>簡章資訊</h3>
        <p class="brochure-intro">${course.intro}</p>
        ${scheduleSection}
        <p class="detail-disclaimer">課程涉及精油嗅吸或肌膚接觸；若對香氣或相關材料有顧慮，請於報名前先與瑀光確認。</p>
      </div>
      <aside class="brochure-facts">
        <p class="eyebrow">CLASS DETAILS</p>
        <dl><div><dt>課程時間</dt><dd>${course.duration||'依簡章公告'}</dd></div><div><dt>適合對象</dt><dd>${course.audience||'請洽瑀光確認'}</dd></div><div><dt>授課講師</dt><dd>${course.instructor||'依場次公告'}</dd></div><div><dt>開課日期</dt><dd>場次另行公告</dd></div><div><dt>上課地點</dt><dd>請洽瑀光確認</dd></div><div><dt>課程費用</dt><dd>依正式簡章公告</dd></div></dl>
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
document.querySelector('[data-join-member]').addEventListener('click',()=>{openModal();accountType.value='oil-member';});
document.querySelectorAll('[data-open-account]').forEach(button=>button.addEventListener('click',()=>{
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');form.hidden=true;
  document.querySelector('.success-state').hidden=true;document.querySelector('.login-state').hidden=false;
  document.querySelector('#modal-title').textContent='';document.body.style.overflow='hidden';
}));
document.querySelector('.modal-close').addEventListener('click',closeModal);
document.querySelector('.modal-done').addEventListener('click',closeModal);
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
