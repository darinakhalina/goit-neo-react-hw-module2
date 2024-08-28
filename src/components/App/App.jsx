import { useState, useEffect } from 'react';
import Description from '../Description/Description';
import Options from '../Options/Options';
import Feedback from '../Feedback/Feedback';
import css from './App.module.css';
import Notification from '../Notification/Notification';

const descriptionData = {
  title: 'Sip Happens Café',
  text: 'Please leave your feedback about our service by selecting one of the options below.',
};

const notificationData = {
  text: 'No feedback yet.',
};

const defaultFeedback = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const localStorageKey = 'feedback';

function App() {
  const [feedback, setFeedback] = useState(() => {
    const localStorageItem = globalThis.localStorage.getItem(localStorageKey);
    return localStorageItem ? JSON.parse(localStorageItem) : defaultFeedback;
  });
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

  const updateFeedback = feedbackType => {
    setFeedback(prevState => ({
      ...prevState,
      [feedbackType]: prevState[feedbackType] + 1,
    }));
  };

  const resetFeedback = () => {
    setFeedback(defaultFeedback);
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(feedback));
  }, [feedback]);

  return (
    <div className={css.app}>
      <Description title={descriptionData.title} text={descriptionData.text} />
      <Options onUpdate={updateFeedback} onReset={resetFeedback} totalFeedback={totalFeedback} />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification text={notificationData.text} />
      )}
    </div>
  );
}

export default App;
