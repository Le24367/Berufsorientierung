// -------------------- DATEN --------------------
const teamData = [
  {
    name:"Christian Deutsch",
    geboren:"Lüdinghausen",
    seit:"4,5 Jahre",
    landwirtschaft:"Nur im privaten Bereich",
    weg:"Online Bewerbung",
    taetigkeit:"Teamleiter in der IT",
    ausbildung:"Staatlich geprüfter Betriebswirt mit Schwerpunkt Wirtschaftsinformatik",
    weiterbildung:"ITIL",
    alltag:"Führung des Teams, Organisieren von Projektthemen, Prüfung von Fehlern im System, Entscheidungsvorbereitungen",
    freude:"Arbeiten mit Menschen",
    spannend:"Entwicklung im Bereich SAP COE",
    begriffe:["Hierarchisch","Kollegial","Zukunftssicher"]
  },
  {
    name:"Julian Rotte",
    geboren:"Ibbenbüren",
    seit:"Seit 2022",
    landwirtschaft:"Nein",
    weg:"Empfehlung durch Lehrer",
    taetigkeit:"Schnittstellen SAP",
    ausbildung:"Fachabitur Informationstechnischer Assistent, Fachinformatiker Systemintegration",
    weiterbildung:"Nein",
    alltag:"Unterschiedlich, Migration neues Schnittstellentool, Jira Board, Tickets, Planung des Tages, Fehler beheben",
    freude:"Wenn man das Produkt der Arbeit sieht, Schnittstelle gebaut und funktioniert, und das Team",
    spannend:"Schnittstellen IT Security",
    begriffe:["Vielfältigkeit","Gemeinschaftlich"]
  },
  {
    name:"Lukas Voeller",
    geboren:"Senden",
    seit:"Seit Juli 2021",
    landwirtschaft:"Jäger",
    weg:"Internet",
    taetigkeit:"Softwareentwickler E-Commerce",
    ausbildung:"Medieninformatik Bachelor",
    weiterbildung:"Shopware zertifiziert",
    alltag:"Rechner an, Programmieren",
    freude:"Entwicklung neuer Features",
    spannend:"Zusammenspiel der einzelnen Bereiche",
    begriffe:["Landwirtschaft","Gemeinsam stark"]
  },
  {
    name:"Georg Sennekamp",
    geboren:"Münster",
    seit:"Seit 1.4.2012",
    landwirtschaft:"Nein",
    weg:"Beworben",
    taetigkeit:"Mitarbeiter im Workplace Management, Support und Bereitstellung von Softwarekomponenten",
    ausbildung:"Datenverarbeitungskaufmann",
    weiterbildung:"Ja",
    alltag:"Anwender-Support rund um Hard- und Software",
    freude:"Lösen von technischen Problemen",
    spannend:"Futterproduktion",
    begriffe:["Grün","Moderne Arbeitsumgebung","Work-Life-Balance"]
  },
  {
    name:"Christoph Roer-Link",
    geboren:"Nordrhein-Westfalen", // geändert!
    seit:"Seit 2000",
    landwirtschaft:"Ja, mutterseits eigener Hof",
    weg:"Beworben zur Ausbildung",
    taetigkeit:"Teilbereichsleiter Digitales Produktmanagement",
    ausbildung:"Großer Außenhandelskaufmann, Diplom-Betriebswirt",
    weiterbildung:"Nein",
    alltag:"Planen, Koordinieren, Besprechen",
    freude:"Mit dem Team arbeiten, Probleme lösen, Erfolge feiern",
    spannend:"Alles, IT, digitale Prozesse",
    begriffe:["Bodenständig","Innovativ","Raiffeisen-Familie"]
  }
];

let diaryData = [
  {tag:"Tag 1",inhalt:"Vorstellung Team, Planung Interviews, Grundlagen HTML"},
  {tag:"Tag 2",inhalt:"Grundlagen CSS, JavaScript, Angular"},
  {tag:"Tag 3",inhalt:"Meeting Vorstellung Outlook, Daily junges Gemüse"},
  {tag:"Tag 4",inhalt:"Abbau Schulungsraum, Meeting Austausch Cloud&Compute, Meeting junges Gemüse"},
  {tag:"Tag 5",inhalt:"Anpassungen an Scoreboard (Eilmedungsseite)"},
  {tag:"Tag 6",inhalt:"Selbständiges Arbeiten an Präsentation für Berufsorientierung"},
];

// -------------------- DOM --------------------
const overview = document.getElementById('overview');
const diary = document.getElementById('diary');
const popupBg = document.getElementById('popup-background');
const detailCard = document.getElementById('detail-card');
const cardContent = document.getElementById('card-content');
const closeBtn = document.getElementById('close-card');
const editBtn = document.getElementById('edit-card');
const editForm = document.getElementById('edit-form');
const form = document.getElementById('form');
const cancelEdit = document.getElementById('cancel-edit');
const addEntryBtn = document.getElementById('add-entry');

let currentType = null; // "team" | "diary"
let currentIndex = null;

// -------------------- RENDER --------------------
function renderTeam(){
  overview.innerHTML = '';
  teamData.forEach((p,i)=>{
    const c = document.createElement('div');
    c.className = 'card';
    c.innerHTML = `<h2>${p.name}</h2>`;
    c.addEventListener('click', ()=> openDetail('team', i));
    overview.appendChild(c);
  });
}

function renderDiary(){
  diary.innerHTML = '';
  diaryData.forEach((d,i)=>{
    const e = document.createElement('div');
    e.className = 'diary-entry';
    e.innerHTML = `<div class="meta"><strong>${d.tag}</strong> — ${d.inhalt}</div><div class="edit-entry" title="Öffnen / bearbeiten">✎</div>`;
    e.querySelector('.edit-entry').addEventListener('click', (ev)=>{
      ev.stopPropagation();
      openDetail('diary', i);
    });
    e.addEventListener('click', ()=> openDetail('diary', i));
    diary.appendChild(e);
  });
}

// -------------------- DETAIL / POPUP --------------------
function openDetail(type, index){
  currentType = type;
  currentIndex = index;
  let html = '';
  if(type === 'team'){
    const p = teamData[index];
    html = `
      <h2>${p.name}</h2>
      <div class="section"><h3>Geburtsort</h3><p>${p.geboren}</p>
        <iframe class="map-iframe" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(p.geboren)}&output=embed" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="section"><h3>Seit wann bei AGRAVIS</h3><p>${p.seit}</p></div>
      <div class="section"><h3>Bezug zu Landwirtschaft</h3><p>${p.landwirtschaft}</p></div>
      <div class="section"><h3>Wie zur AGRAVIS gekommen</h3><p>${p.weg}</p></div>
      <div class="section"><h3>Tätigkeit</h3><p>${p.taetigkeit}</p></div>
      <div class="section"><h3>Ausbildung / Studium</h3><p>${p.ausbildung}</p></div>
      <div class="section"><h3>Weiterbildungen</h3><p>${p.weiterbildung}</p></div>
      <div class="section"><h3>Beruflicher Alltag</h3><p>${p.alltag}</p></div>
      <div class="section"><h3>Was bereitet Freude</h3><p>${p.freude}</p></div>
      <div class="section"><h3>Besonders spannend</h3><p>${p.spannend}</p></div>
      <div class="section"><h3>AGRAVIS in 3 Begriffen</h3>
        <div class="chips">${p.begriffe.map(x=>`<span class="chip">${x}</span>`).join('')}</div>
      </div>
    `;
  } else {
    const d = diaryData[index];
    html = `<h2>${d.tag}</h2><div class="section"><p>${d.inhalt}</p></div>`;
  }
  cardContent.innerHTML = html;
  popupBg.classList.add('active');
  detailCard.classList.add('active');
  detailCard.focus && detailCard.focus();
}

// -------------------- EDIT / ADD --------------------
function openEditForm(){
  if(currentType === null) return;
  let html = '';
  if(currentType === 'team'){
    const p = teamData[currentIndex];
    html += `<label>Name</label><input name="name" value="${escapeHtmlAttr(p.name)}">`;
    html += `<label>Geburtsort</label><input name="geboren" value="${escapeHtmlAttr(p.geboren)}">`;
    html += `<label>Seit</label><input name="seit" value="${escapeHtmlAttr(p.seit)}">`;
    html += `<label>Bezug zu Landwirtschaft</label><input name="landwirtschaft" value="${escapeHtmlAttr(p.landwirtschaft)}">`;
    html += `<label>Wie gekommen</label><input name="weg" value="${escapeHtmlAttr(p.weg)}">`;
    html += `<label>Tätigkeit</label><input name="taetigkeit" value="${escapeHtmlAttr(p.taetigkeit)}">`;
    html += `<label>Ausbildung</label><input name="ausbildung" value="${escapeHtmlAttr(p.ausbildung)}">`;
    html += `<label>Weiterbildungen</label><input name="weiterbildung" value="${escapeHtmlAttr(p.weiterbildung)}">`;
    html += `<label>Beruflicher Alltag</label><textarea name="alltag">${escapeHtml(p.alltag)}</textarea>`;
    html += `<label>Freude</label><input name="freude" value="${escapeHtmlAttr(p.freude)}">`;
    html += `<label>Spannend</label><input name="spannend" value="${escapeHtmlAttr(p.spannend)}">`;
    html += `<label>3 Begriffe (Komma getrennt)</label><input name="begriffe" value="${escapeHtmlAttr(p.begriffe.join(', '))}">`;
  } else {
    const d = diaryData[currentIndex];
    html += `<label>Tag</label><input name="tag" value="${escapeHtmlAttr(d.tag)}">`;
    html += `<label>Inhalt</label><textarea name="inhalt">${escapeHtml(d.inhalt)}</textarea>`;
  }
  form.innerHTML = html;
  editForm.classList.add('active');
  document.querySelector('#edit-form .form-container input, #edit-form .form-container textarea')?.focus();
}

function addNewEntry(){
  diaryData.push({tag:`Tag ${diaryData.length+1}`, inhalt:''});
  currentType = 'diary';
  currentIndex = diaryData.length - 1;
  openEditForm();
}

// -------------------- HELPERS --------------------
function escapeHtml(str){
  if(!str && str !== 0) return '';
  return String(str).replace(/[&<>"']/g, (m)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}
function escapeHtmlAttr(s){
  return escapeHtml(s).replace(/"/g,'&quot;');
}

// -------------------- EVENTS --------------------
editBtn.addEventListener('click', openEditForm);
closeBtn.addEventListener('click', ()=>{
  detailCard.classList.remove('active');
  popupBg.classList.remove('active');
});
popupBg.addEventListener('click', ()=>{
  detailCard.classList.remove('active');
  popupBg.classList.remove('active');
});
cancelEdit.addEventListener('click', ()=> editForm.classList.remove('active'));
addEntryBtn.addEventListener('click', addNewEntry);

form.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  const data = {};
  form.querySelectorAll('input,textarea').forEach(inp=>{
    data[inp.name] = inp.value;
  });
  if(currentType === 'team'){
    const target = teamData[currentIndex];
    Object.keys(data).forEach(k=>{
      if(k === 'begriffe')
        target[k] = data[k].split(',').map(s=>s.trim()).filter(Boolean);
      else
        target[k] = data[k];
    });
  } else if(currentType === 'diary'){
    diaryData[currentIndex] = {
      tag: data.tag || `Tag ${currentIndex+1}`,
      inhalt: data.inhalt || ''
    };
  }
  editForm.classList.remove('active');
  renderTeam();
  renderDiary();
  openDetail(currentType, currentIndex);
});

// keyboard escape close
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    if(editForm.classList.contains('active'))
      editForm.classList.remove('active');
    else {
      detailCard.classList.remove('active');
      popupBg.classList.remove('active');
    }
  }
});

// -------------------- INIT --------------------
renderTeam();
renderDiary();
