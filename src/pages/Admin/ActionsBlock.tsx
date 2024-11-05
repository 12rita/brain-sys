import styles from './styles.module.css';
import incorrect from '../../assets/cross_11378648.png';
import correct from '../../assets/right_11378640.png';
import mute from '../../assets/mute.png';
import unmute from '../../assets/unmute.png';
import useSound from 'use-sound';
import correctSound from '../../assets/audio/correct.mp3';
import incorrectSound from '../../assets/audio/wrong.mp3';
import { FC } from 'react';

interface IActionsBlock {
  onToggleSound: () => void;
  soundDisabled: boolean;
}

export const ActionsBlock: FC<IActionsBlock> = ({ soundDisabled, onToggleSound }) => {
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(incorrectSound);

  const handleWrong = () => {
    playWrong();
  };

  const handleRight = () => {
    playCorrect();
  };

  const handleToggleSound = () => {
    onToggleSound();
  };

  return (
    <div className={styles.actions}>
      <img className={styles.actionIcon} onClick={handleWrong} src={incorrect} alt="incorrect" />
      <img onClick={handleRight} className={styles.actionIcon} src={correct} alt="correct" />
      <img
        onClick={handleToggleSound}
        className={styles.actionIcon}
        src={soundDisabled ? mute : unmute}
        alt="correct"
      />
    </div>
  );
};
