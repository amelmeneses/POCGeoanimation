import './styles.css';
import { startApp } from './app';

startApp().catch((err) => {
  console.error('App failed to start:', err);
});
