
$(document).ready(function () {
  $('.btn-save').on('click', function () {
    $.get('/api/save', function (data) {
      $('#status').text('Saved!');
    });
  });
});

const user = window.appConfig?.currentUser ?? { name: 'Guest' };
const names = [['John'], ['Jane']].flat();
console.log(names.join(', ').replaceAll(',', ' &'));

function showMessage(message) {
  document.getElementById('msg').innerHTML = message; // potential XSS risk
}

var count = '5';
if (count == 5) {
  console.log('Count matched');
}

async function loadData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  console.log('Loaded', data);
}

async function loadSafeData() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch('/api/info', { signal: controller.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const info = await res.json();
    console.log(info?.name ?? 'Unknown');
  } catch (err) {
    console.error('Error fetching info:', err);
  } finally {
    clearTimeout(timeoutId);
  }
}