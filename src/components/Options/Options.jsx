import css from './Options.module.css';

function Options({ onUpdate, onReset, totalFeedback }) {
  return (
    <div className={css.options}>
      <button onClick={() => onUpdate('good')}>Good</button>
      <button onClick={() => onUpdate('neutral')}>Neutral</button>
      <button onClick={() => onUpdate('bad')}>Bad</button>
      {totalFeedback > 0 && <button onClick={() => onReset()}>Reset</button>}
    </div>
  );
}

export default Options;
