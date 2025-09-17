const express = require('express');
const helmet = require('helmet');
const { connectDB } = require('./config/db');
const noteRoutes = require('./routes/note.routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(helmet());
app.use(express.json());

app.use('/api/notes', noteRoutes);

// health
app.get('/health', (_, res) => res.json({ status: 'ok' }));

//ready
app.get('/ready', (req, res) => {
  const state = require('mongoose').connection.readyState;
  if (state === 1) {
    return res.status(200).json({ mongoState: state });
  }
  return res.status(503).json({ mongoState: state });
});

// global error handler (must be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
connectDB(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  })
  .catch(err => {
    console.warn('DB connect failed (ok for demo):', err.message);
    app.listen(PORT, () => console.log(`Listening on ${PORT} (db disconnected)`));
  });

module.exports = app;
