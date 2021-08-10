import Navigation from './Navigation';
import { useToggle } from '@/hooks/useToggle';

export default function Hamburger() {
  const [status, toogleStatus] = useToggle(true);

  const cls = ['hamburger'];

  if (status) {
    cls.push('open');
  }

  return (
    <>
      <div>
        <button
          className={cls.join(' ')}
          onClick={() => {
            toogleStatus();
          }}
        ></button>
        <span className="hamburger-t"></span>
        <span className="hamburger-c"></span>
        <span className="hamburger-b"></span>
      </div>
      <Navigation status={status} />
    </>
  );
}
